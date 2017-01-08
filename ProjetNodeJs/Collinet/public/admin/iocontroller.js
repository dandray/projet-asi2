var socket = io.connect();

socket.on('connection', function(data) {
	socket.emit('data_comm', socket.io.engine.id);
});

function emitSlidEvent(cmd,pres_id) {
	if (cmd === 'START') {
		socket.emit('slidEvent',{CMD: cmd, PRES_ID: pres_id});
	}
	else {
		socket.emit('slidEvent',{CMD: cmd});
	}
}