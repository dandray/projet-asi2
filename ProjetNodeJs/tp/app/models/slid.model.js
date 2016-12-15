var CONFIG = JSON.parse(process.env.CONFIG);
var utils = require("./../utils/utils.js");
var fs = require("fs");
var path = require("path");

function SlidModel(slidModel){
	this.type;
	this.id;
	this.title;
	this.fileName; //stocké dans CONFIG.contentDirectory
	var data;
	this.getData= function(){
		return data;
	}
	this.setData = function(data){
		this.data = data;
	}
}


//Création
SlidModel.create = function(slid, callback){
	fs.writeFile(path.join(CONFIG.presentationDirectory, slid.fileName), slid.getData(), 'binary', function(err, response){
		if(err) {
			callback(err); 
		}
		var metadata = {
					type: slid.type,
					id: slid.id,
					title: slid.title,
					fileName: slid.fileName
		};

		fs.writeFile(path.join(CONFIG.presentationDirectory, slid.id+".meta.json"), JSON.stringify(metadata), "utf8", function(err,response) { if(err) { callback(err); } callback()});
	});
}

//Lecture
SlidModel.read = function(id, callback){
	fs.readFile(path.join(CONFIG.contentDirectory, id+".meta.json"),'utf8', function(err,data) {
		if (err) {
			callback(err);
		}
		var metadata = JSON.parse(data);
		fs.readFile(path.join(CONFIG.contentDirectory, metadata.fileName), function(err,data) {
			if (err) {
				callback(err);
			}
			var slid = new SlidModel ({
				type: metadata.type,
				id: id,
				title: metadata.title,
				fileName: metadata.fileName
			});
			slid.setData(data);

			callback(null,slid);	
		});
	});	
}

//Mise à jour
SlidModel.update = function(slid, callback){
	var metadata = {
					type: slid.type,
					id: slid.id,
					title: slid.title,
					fileName: slid.fileName
	};
	fs.writeFile(path.join(CONFIG.contentDirectory, slid.id+".meta.json"), JSON.stringify(metadata), "utf8", function(err,response) { if(err) { callback(err); }});

	if (slid.data !== null && slid.data.length>0) {
		fs.writeFile(path.join(CONFIG.contentDirectory, slid.fileName), slid.data, 'binary', function(err,response) { if(err) { callback(err); }});
	}
}

//Suppression
SlidModel.delete = function(id, callback){
	fs.readFile(path.join(CONFIG.contentDirectory, id+".meta.json"),'utf8', function(err,data) {
		if (err) {
			callback(err);
		}
		var metadata = JSON.parse(data);
		fs.unlink(path.join(CONFIG.contentDirectory, metadata.fileName),function(err,response) { if(err) { callback(err); }});
		fs.unlink(path.join(CONFIG.contentDirectory, id+".meta.json"),function(err,response) { if(err) { callback(err); }});
	});
}	

module.exports = SlidModel;

