var fs = require("fs");

function SlidModel(slidModel){
	this.type;
	this.id;
	this.title;
	this.filename; //stocké dans CONFIG.contentDirectory
	var data;
}

SlidModel.create = function(slid, callback){
	fs.writeFile(slid.filename, slid.data, callback){
		
	}

	var metadata = {
		slid.type = type,
		slid.id = id,
		slid.title = title,
		slid.filename = filename
	}

}

SlidModel.read = function(id, callback){

}

SlidModel.update = function(slid, callback){

}

SlidModel.delete = function(id, callback){

}	



