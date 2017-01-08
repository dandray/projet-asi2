var CONFIG = JSON.parse(process.env.CONFIG);
var fs = require('fs');
var path = require("path");
var SlidModel = require("./../models/slid.model.js");

module.exports = this;

//Liste les slides
//@return JSON
this.list = function(request,response) {
	fs.readdir(CONFIG.contentDirectory, (err, files) => {
		if (err) {
			response.end(err);
		}

		var slides = {};
		var i = 0;

		var metaFiles = [];
		for (var j in files) {
			if (path.extname(files[j])===".json") {
				metaFiles.push(files[j])
			}
		}

		metaFiles.forEach(function(file) {
		    if (path.extname(file)===".json") {
		    	SlidModel.read(path.basename(file,'.meta.json'), function(err,data) {
		    		if (err) {
		    			response.end(err.toString());
		    		}
		    		slides[path.basename(file,'.meta.json')] = data;
		    		i++;
					if (i===metaFiles.length) {
			    		response.end(JSON.stringify(slides));
			    	}
		    	});
		    }
		});
	});
}

//Crée une slide
//@param slid
this.create = function(request,response) {
	var metadata = {
		id: request.file.originalname,
		type: request.file.mimetype,
		title: request.file.originalname.split('.')[0],
		fileName: request.file.originalname
	}
	var slid = new SlidModel(metadata);
	slid.setData(request.file.buffer);
	SlidModel.create(slid, function(err) {
		if (err) {
			response.end(err);
		}
		response.end('ok');
	});
}

//Lit une slid
//@param id
this.read = function(request,response) {
	var expl = request.url.split('?');
	var id = request.params.slidId;
	var json = (expl.length>0 && expl[1] === 'json=true');
	SlidModel.read(id,function(err,data) {
		if (err) {
			response.end(err);
		}

		if (json) {
			response.end(JSON.stringify(data));
		}
		else {
			response.end(data.getData());
		}
	});
}