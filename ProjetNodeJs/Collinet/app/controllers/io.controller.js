module.exports = this;
var SlidModel = require("./../models/slid.model.js");
var io = require('socket.io');
var fs = require('fs');
var path = require('path');
var CONFIG = JSON.parse(process.env.CONFIG);

this.listen = function(server) {
	var socketMap = {};
	var ioServer = io(server);
	var slidIndex = '';
	var presId = '';
	var prevData = '';
	ioServer.on('connection', function(socket) {
		socket.emit('connection');
		socket.on('data_comm', function(data) {
			console.log('received event data_comm with data : '+data);
			socketMap[data] = socket;
			if (prevData !== '') {
				socket.emit('currentSlidEvent',prevData);
			}
		});
		socket.on('slidEvent', function(data) {
			console.log('received event slidEvent');
			var cmd = data.CMD;
			var id = (cmd === 'START' ? data.PRES_ID : presId);
			var slidId;

			fs.readFile(path.join(CONFIG.presentationDirectory, id+".pres.json"), function(err,data) {
	    		var slids = JSON.parse(data.toString()).slidArray;

	    		if (presId !== id) {
	    			slidIndex = '';
	   				presId = id;
	    		}

	    		if (cmd === 'START') {
					slidIndex = 0;
				}

				if (cmd === 'END') {
					slidIndex = slids.length-1;
				}

				if (cmd === 'BEGIN') {
					slidIndex = 0;
				}

				if (cmd === 'PREV') {
					if (slidIndex !== '') {
						if (slidIndex !== 0) {
							slidIndex--;
						}
					}
					else {
						slidIndex = 0;
					}
				}

				if (cmd === 'NEXT') {
					if (slidIndex !== '') {
						if (slidIndex < slids.length-1) {
							slidIndex++;
						}
					}
					else {
						slidIndex = 0;
					}
				}

				if (cmd === 'START' || cmd === 'END' || cmd === 'BEGIN' || cmd === 'PREV' || cmd === 'NEXT') {
					if (err) {
						console.log(err);
					}
					else {
						var data = slids[slidIndex];
						data.src = "/slid/" + id;
						for (var key in socketMap) {
							if (socketMap.hasOwnProperty(key)) {
								prevData = data;
								socketMap[key].emit('currentSlidEvent',data);
							}
						}
					}
				}
	    	});
		});
	});
}