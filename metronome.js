
var isRunning;

var cellSounds = {
	'0': null,
	'1': new Audio("Click1.wav"),
	'2': new Audio("Click2.wav")
}

var onStart = function(e) {
	[].slice.call(document.querySelectorAll('button,input')).forEach(function(el) {
		if(el != e.target)
			el.setAttribute('disabled','disabled');
	});
	isRunning = true;
	e.target.textContent = 'Stop';

	var cells = [];
	[].slice.call(document.getElementsByClassName('row')).forEach(function(row) {
		[].slice.call(row.querySelectorAll('.cell')).forEach(function(cell) {
			cells.push(cell);
		});
	});

	tick(cells, 0, Math.max(60*1000/document.getElementById('bpm').value));
};

var onStop = function(e) {
	[].slice.call(document.querySelectorAll('button,input')).forEach(function(el) {
		el.removeAttribute('disabled');
	});
	isRunning = false;
	e.target.textContent = 'Start';
};

var tick = function(cells, index, millis) {
	if(!isRunning)
		return;

	var cell = cells[index];
	cell.setAttribute('style', 'background-color:blue');

	var audio = cellSounds[cell.textContent];

	if(audio)
		audio.play();
	setTimeout(function() {
		cell.removeAttribute('style');
		tick(cells, (index + 1) % cells.length, millis);
	}, millis);
};

var onToggleBtnClicked = function(e) {
	isRunning? onStop(e) : onStart(e);
};

var onAddColumnBtnClicked = function(e) {
	if(isRunning)
		return;

	[].slice.call(document.querySelectorAll('.row')).forEach(function(row) {
		var cells = [].slice.call(row.querySelectorAll('.cell'));
		if(cells.length)
			cells.pop().insertAdjacentElement('afterend', createCell());
		else
			row.insertAdjacentElement('afterbegin', createCell());
	})
};

var onRemoveColumnBtnClicked = function(e) {
	if(isRunning)
		return;

	[].slice.call(document.querySelectorAll('.row')).forEach(function(row) {
		var cells = [].slice.call(row.querySelectorAll('.cell'))
		var cell = cells.pop();
		if(cells.length)
			cell.parentElement.removeChild(cell);
	});
};

var onAddRowBtnClicked = function(e) {
	if(isRunning)
		return;

	var div = document.createElement('div');
	div.setAttribute('class', 'row');

	var rows = document.querySelectorAll('.row');
	if(!rows.length)
		throw new Error('Error: zero rows. Please refresh page.');
	var row = rows[rows.length - 1];

	[].slice.call(row.querySelectorAll('.cell')).forEach(function() {
		div.appendChild(createCell());
	});

	row.insertAdjacentElement('afterend', div);
};

var onRemoveRowBtnClicked = function(e) {
	var rows = [].slice.call(document.querySelectorAll('.row'));
	var row = rows.pop();
	if(rows.length)
		row.parentElement.removeChild(row);
};

var onCellClicked = function(e) {
	e.target.textContent = (parseInt(e.target.textContent, 10) + 1 ) % Object.keys(cellSounds).length;
};

var createCell = function(value) {
	var cell = document.createElement('button');
	cell.setAttribute('class', 'cell');
	cell.setAttribute('onClick', 'onCellClicked(arguments[0])');
	cell.textContent = value || 0;
	return cell;
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

