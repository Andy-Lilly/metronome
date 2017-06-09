
var isRunning, audio = new Audio("Click1.wav");

var onStart = function(e) {
	[].slice.call(document.querySelectorAll('input')).forEach(function(input) {
		input.setAttribute('disabled','disabled');
	});
	isRunning = true;
	e.target.textContent = 'Stop';

	var inputs = [];
	[].slice.call(document.getElementsByClassName('row')).forEach(function(row) {
		[].slice.call(row.querySelectorAll('input')).forEach(function(input) {
			inputs.push(input);
		});
	});

	tick(inputs, 0, Math.max(60*1000/document.getElementById('bpm').value));
};

var onStop = function(e) {
	[].slice.call(document.querySelectorAll('input')).forEach(function(input) {
		input.removeAttribute('disabled');
	});
	isRunning = false;
	e.target.textContent = 'Start';
};

var tick = function(inputs, index, millis) {
	if(!isRunning)
		return;
	var input = inputs[index];
	input.setAttribute('style', 'background-color:blue');
	if(parseInt(input.value, 10))
		audio.play();
	setTimeout(function() {
		input.removeAttribute('style');
		tick(inputs, (index + 1) % inputs.length, millis);
	}, millis);
};

var onToggleBtnClicked = function(e) {
	isRunning? onStop(e) : onStart(e);
};

var onAddBtnClicked = function(e) {
	if(isRunning)
		return;

	[].slice.call(document.querySelectorAll('.row')).forEach(function(row) {
		var input = document.createElement('input');
		input.setAttribute('type', 'number');
		input.setAttribute('value', '1');

		var inputs = [].slice.call(row.querySelectorAll('input'));
		if(inputs.length)
			inputs.pop().insertAdjacentElement('afterend',input);
		else
			row.insertAdjacentElement('afterbegin', input);
	})
};

var onRemoveBtnClicked = function(e) {
	if(isRunning)
		return;

	[].slice.call(document.querySelectorAll('.row')).forEach(function(row) {
		var inputs = [].slice.call(row.querySelectorAll('input'))
		var input = inputs.pop();
		if(inputs.length)
			input.parentElement.removeChild(input);
	});
};

var onRowAddBtnClicked = function(e) {
	if(isRunning)
		return;

	var div = document.createElement('div');
	div.setAttribute('class', 'row');

	var rows = document.querySelectorAll('.row');
	if(rows.length) {
		var row = rows[rows.length - 1];

		var inputs = [].slice.call(row.querySelectorAll('input'));
		inputs.forEach(function() {
			var input = document.createElement('input');
			input.setAttribute('type', 'number');
			input.setAttribute('value', '1');

			div.appendChild(input);
		});

		row.insertAdjacentElement('afterend', div);
	} else {
		for(var i = 0; i < 4; i++) {
			var input = document.createElement('input');
			input.setAttribute('type', 'number');
			input.setAttribute('value', '1');

			div.appendChild(input);
		}

		var removeBtn = document.createElement('button');
		removeBtn.textContent = 'x';
		removeBtn.setAttribute('id', 'remove-btn');
		removeBtn.setAttribute('class', 'inline-btn');
		removeBtn.setAttribute('onclick', 'onRemoveBtnClicked(arguments[0])');

		div.appendChild(removeBtn);

		var addBtn = document.createElement('button');
		addBtn.textContent = '+';
		addBtn.setAttribute('id', 'add-btn');
		addBtn.setAttribute('class', 'inline-btn');
		addBtn.setAttribute('onclick', 'onAddBtnClicked(arguments[0])');

		div.appendChild(addBtn);

		document.getElementById('bpm').insertAdjacentElement('afterend', div);
	}
};

var onRowRemoveBtnClicked = function(e) {
	var rows = [].slice.call(document.querySelectorAll('.row'));
	var row = rows.pop();
	if(rows.length)
		row.parentElement.removeChild(row);
};

var exportToCSV = function() {
	//TODO
};

var importFromCSV = function() {
	//TODO
};

var chooseSounds = function() {
	//TODO
};

