module.exports = this;
var SlidModel = require("./../models/slid.model.js");
var fs = require('fs');
var path = require('path');
var CONFIG = JSON.parse(process.env.CONFIG);

this.listen = function(httpServer) {
	var map = {};
	var io = require('socket.io')(httpServer);
	var slidIndex = '';
	var presId = '';
	var prevData = '';

	var map = {};
    var slides = '';
    var indexSlide = '';
    var presId = '';
    var slideCourante = '';

	io.on('connection', function(socket) {
		socket.emit('connection');
		socket.on('data_comm', function(data) {
			console.log('received event data_comm with data : '+data);
			map[data] = socket;
			if (prevData !== '') {
				socket.emit('currentSlidEvent',prevData);
			}
		});
		socket.on('slidEvent', function(data) {
			console.log('received event slidEvent');
			var command = data.CMD;
			var id = (command === 'START' ? data.PRES_ID : presId);
			var slidId;

			fs.readFile(path.join(CONFIG.presentationDirectory, id+".pres.json"), function(err,data) {
	    		var slids = JSON.parse(data.toString()).slidArray;

	    		if (presId !== id) {
	    			indexSlide = '';
	   				presId = id;
	    		}

	    		if (command === 'START') {
					indexSlide = 0;
				}

				if (command === 'END') {
					indexSlide = slids.length-1;
				}

				if (command === 'BEGIN') {
					indexSlide = 0;
				}

				if (command === 'PREV') {
					if (indexSlide !== '') {
						if (indexSlide !== 0) {
							indexSlide--;
						}
					}
					else {
						indexSlide = 0;
					}
				}

				if (command === 'NEXT') {
					if (indexSlide !== '') {
						if (indexSlide < slids.length-1) {
							indexSlide++;
						}
					}
					else {
						indexSlide = 0;
					}
				}

				if (command === 'START' || command === 'END' || command === 'BEGIN' || command === 'PREV' || command === 'NEXT') {
					if (err) {
						console.log(err);
					}
					else {
						var data = slids[indexSlide];
						data.src = "/slid/" + id;
						for (var key in map) {
							if (map.hasOwnProperty(key)) {
								prevData = data;
								map[key].emit('currentSlidEvent',data);
							}
						}
					}
				}
	    	});
		});
	});
}