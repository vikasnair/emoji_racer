const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

// view engine setup

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// sockets

io.on('connection', (socket) => {
	console.log(`${socket.id} has connected.`);

	socket.on('move', data => {
		if (!data.left) {
			data.left = '10px';
		} else {
			data.left = (Number(data.left.split('px')[0]) + 10) + 'px';
		}
		console.log('hi');

		socket.emit('moveDiv', data);
		socket.broadcast.emit('moveDiv', data);
	});
});

server.listen(3000);