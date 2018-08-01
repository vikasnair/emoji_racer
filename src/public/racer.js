const socket = io();

const moveDiv = (data) => {
	console.log('goes here!');
	let div = null;

	if (data.div == 1) {
		div = document.getElementsByClassName('racer player1')[0];
	} else {
		div = document.getElementsByClassName('racer player2')[0];
	}

	div.style.position = 'relative';
	div.style.left = data.left;
};

const addActions = () => {
	const playerOneDiv = document.getElementsByClassName('racer player1')[0];
	const playerTwoDiv = document.getElementsByClassName('racer player2')[0];
	const playerOneButtonDiv = document.getElementsByClassName('player1Btn')[0];
	const playerTwoButtonDiv = document.getElementsByClassName('player2Btn')[0];

	playerOneButtonDiv.addEventListener('click', () => {
		const data = { div : 1, left : playerOneDiv.style.left };
		socket.emit('move', data);
	});

	playerTwoButtonDiv.addEventListener('click', () => {
		const data = { div : 2, left : playerTwoDiv.style.left };
		socket.emit('move', data);
	});
};

document.addEventListener('DOMContentLoaded', () => { 
	addActions();
});

socket.on('moveDiv', (data) => {
	console.log('here!');
	moveDiv(data);
});