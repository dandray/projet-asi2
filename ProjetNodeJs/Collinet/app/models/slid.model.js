var CONFIG = JSON.parse(process.env.CONFIG);
var utils = require("./../utils/utils.js");
var fs = require("fs");
var path = require("path");

var SlidModel = function(slidModel) {
	if (typeof slidModel === 'undefined') {
		this.type = '';
		this.id = '';
		this.title = '';
		this.fileName = '';
	}
	else {
		this.type = slidModel.type;
		this.id = slidModel.id;
		this.title = slidModel.title;
		this.fileName = slidModel.fileName;
	}

	var data;
	this.getData = function () {
	  return this.data;
	}
	this.setData = function (data) {
	  this.data = data;
	}
}

//Crée une slide
//@param SlidModel
SlidModel.create = function(slid, callback) {
	fs.writeFile(path.join(CONFIG.contentDirectory, slid.fileName), slid.getData(), 'binary', function(err,response) {
		if(err) {
			callback(err); 
		}
		var metadata = {
					type: slid.type,
					id: slid.id,
					title: slid.title,
					fileName: slid.fileName
					};
		fs.writeFile(path.join(CONFIG.contentDirectory, slid.id+".meta.json"), JSON.stringify(metadata), "utf8", function(err,response) { if(err) { callback(err); } callback()});
	});
}

//Lit une slide
//@param id
//@return SlidModel
SlidModel.read = function(id, callback) {
	SlidModel.readMetadata(id, function(err,metadata) {
		if (err) {
			callback(err);
		}
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

//Lit les métadonnées d'une slide
//@param id
//@return Object
SlidModel.readMetadata = function(id,callback) {
	fs.readFile(path.join(CONFIG.contentDirectory, id+".meta.json"),'utf8', function(err,data) {
		if (err) {
			callback(err);
		}
		callback(null,JSON.parse(data));
	});
}

SlidModel.update = function(slid, callback) {
	var metadata = {
					type: slid.type,
					id: slid.id,
					title: slid.title,
					fileName: slid.fileName
					};
	fs.writeFile(path.join(CONFIG.contentDirectory, slid.id+".meta.json"), JSON.stringify(metadata), "utf8", function(err,response) { if(err) { callback(err); } callback(); });
	if (slid.getData() !== null && slid.getData().length>0) {
		fs.writeFile(path.join(CONFIG.contentDirectory, slid.fileName), slid.getData(), 'binary', function(err,response) { if(err) { callback(err); } callback(); });
	}
}

SlidModel.delete = function(id, callback) {
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