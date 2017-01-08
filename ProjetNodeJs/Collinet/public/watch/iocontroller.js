var socket = io.connect();

socket.on('connection', function(data) {
	socket.emit('data_comm', socket.io.engine.id);
});


socket.on('currentSlidEvent', function(data) {
	var content = document.getElementById('pres_content');
	content.innerHTML = JSON.stringify(data);
});