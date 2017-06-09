var assert = function(condition, msg) {
	if(condition)
		console.log(msg + ' passed successfully');
	else
		throw new Error('Test Failed: ' + msg);
};

var assertEquals = function(a, b, msg) {
	assert(a == b, msg);
};

var run_tests = function() {

	var passes = [], failures = [];

	init();

	tests.forEach(function(test) {
		try {
			passes.push(test())
		} catch (e) {
			failures.push(e.message);
		}
	});

	if(failures.length) {
		console.log('The following tests failed:');
		failures.forEach(function(failure) {
			console.log(failure);
		})
	} else {
		console.log('All tests passed!');
	}

	console.log('Tests run: ' + (passes.length + failures.length) + ', Tests passed: ' + passes.length + ', Tests failed: ' + failures.length);
};

var addRowBtn, addColumnBtn, removeRowBtn, removeColumnBtn, startStopBtn;

init = function() {
	addRowBtn = document.querySelector('#add-row');
	addColumnBtn = document.querySelector('#add-column');
	removeRowBtn = document.querySelector('#remove-row');
	removeColumnBtn = document.querySelector('#remove-column');

	startStopBtn = document.querySelector('#start-stop');
};

var tests = [];

test0001 = function() {
	addRowBtn.click();
	addRowBtn.click();
	assertEquals(document.querySelectorAll('.cell').length, 3, 'add row');
	assertEquals(document.querySelectorAll('.row').length, 3, 'add row');

	addColumnBtn.click();
	addColumnBtn.click();
	addColumnBtn.click();
	assertEquals(document.querySelectorAll('.cell').length, 12, 'add column');
	assertEquals(document.querySelectorAll('.row').length, 3, 'add row');

	removeRowBtn.click();
	removeRowBtn.click();
	assertEquals(document.querySelectorAll('.cell').length, 4, 'remove row');
	assertEquals(document.querySelectorAll('.row').length, 1, 'remove row');

	removeColumnBtn.click();
	removeColumnBtn.click();
	removeColumnBtn.click();
	assertEquals(document.querySelectorAll('.cell').length, 1, 'remove column');
	assertEquals(document.querySelectorAll('.row').length, 1, 'remove row');

	return true;
};

tests.push(test0001);

test0002 = function() {
	addRowBtn.click();
	addRowBtn.click();

	addColumnBtn.click();
	addColumnBtn.click();
	addColumnBtn.click();

	var cells = document.querySelectorAll('.cell');

	assertEquals(cells[0].textContent, 1, 'first cell init');
	assertEquals(cells[1].textContent, 0, 'second cell init');

	cells[0].click();
	cells[0].click();

	assertEquals(cells[0].textContent, 0, 'first cell click');

	cells[0].click();
	cells[1].click();

	assertEquals(cells[1].textContent, 1, 'second cell click');

	removeRowBtn.click();
	removeRowBtn.click();

	removeColumnBtn.click();
	removeColumnBtn.click();
	removeColumnBtn.click();

	return true;
};

tests.push(test0002);

test0002 = function() {
	addRowBtn.click();
	addRowBtn.click();

	addColumnBtn.click();
	addColumnBtn.click();
	addColumnBtn.click();

	//Reset cell one to zero, so no sound occurs during testing
	var cells = document.querySelectorAll('.cell');
	cells[0].click();
	cells[0].click();

	assert(!isRunning, 'not running');

	startStopBtn.click();

	assert(isRunning, 'running');

	var badButtons = [].slice.call(document.querySelectorAll('button,input')).filter(function(el) {
		return el != startStopBtn && el.getAttribute('disabled') != 'disabled';
	});

	startStopBtn.click();

	assert(!isRunning, 'not running');

	assertEquals(badButtons.length, 0, 'buttons disabled');

	badButtons = [].slice.call(document.querySelectorAll('button,input')).filter(function(el) {
		return el != startStopBtn && el.getAttribute('disabled') == 'disabled';
	});

	assertEquals(badButtons.length, 0, 'buttons re-enabled');

	cells[0].click();

	removeRowBtn.click();
	removeRowBtn.click();

	removeColumnBtn.click();
	removeColumnBtn.click();
	removeColumnBtn.click();

	return true;
};

tests.push(test0002);

var asyncPasses = [], asyncFailures = [];

var run_async_tests = function() {

	init();

	var testDiv = document.createElement('div');

	testDiv.addEventListener('done', function() {
		if(asyncFailures.length) {
			console.log('The following tests failed:');
			asyncFailures.forEach(function(failure) {
				console.log(failure);
			})
		} else {
			console.log('All tests passed!');
		}

		console.log('Tests run: ' + (asyncPasses.length + asyncFailures.length) + ', Tests passed: ' + asyncPasses.length + ', Tests failed: ' + asyncFailures.length);
	});

	asyncTestsIndex = 0;
	run_async_tests_on_div(testDiv);
};

run_async_tests_on_div = function(testDiv) {

	var test = asyncTests[asyncTestsIndex];

	if(test) {
		var eventType = 'done_' + Math.random();

		testDiv.addEventListener(eventType, function() {
			asyncTestsIndex++;
			run_async_tests_on_div(testDiv);
		});

		test(testDiv, eventType);

	} else {
		testDiv.dispatchEvent(new Event('done'));
	}
}

asyncTests = [];
asyncTestsIndex = 0;

asyncTest0001 = function(testDiv, eventType) {
	addRowBtn.click();
	addRowBtn.click();

	addColumnBtn.click();
	addColumnBtn.click();
	addColumnBtn.click();

	var cells = document.querySelectorAll('.cell');
	cells[0].click();
	cells[0].click();

	assert(!isRunning, 'not running');

	startStopBtn.click();

	assert(isRunning, 'running');

	setTimeout(function() {
		assert(isRunning, 'running');

		var cells = document.querySelectorAll('.cell');
		assertEquals(cells[3].getAttribute('style'), 'background-color:blue', 'cell background color');

		startStopBtn.click();

		assert(!isRunning, 'not running');

		cells[0].click();

		removeRowBtn.click();
		removeRowBtn.click();

		removeColumnBtn.click();
		removeColumnBtn.click();
		removeColumnBtn.click();

		testDiv.dispatchEvent(new Event(eventType));
	}, 2000);
};

asyncTests.push(asyncTest0001);

asyncTest0002 = function(testDiv, eventType) {
	addRowBtn.click();
	addRowBtn.click();

	addColumnBtn.click();
	addColumnBtn.click();
	addColumnBtn.click();

	var cells = document.querySelectorAll('.cell');
	cells[0].click();
	cells[0].click();

	document.getElementById('bpm').value = '60'

	assert(!isRunning, 'not running');

	startStopBtn.click();

	assert(isRunning, 'running');

	setTimeout(function() {
		assert(isRunning, 'running');

		var cells = document.querySelectorAll('.cell');
		assertEquals(cells[1].getAttribute('style'), 'background-color:blue', 'cell background color');

		startStopBtn.click();

		assert(!isRunning, 'not running');

		cells[0].click();

		removeRowBtn.click();
		removeRowBtn.click();

		removeColumnBtn.click();
		removeColumnBtn.click();
		removeColumnBtn.click();

		testDiv.dispatchEvent(new Event(eventType));
	}, 2000);
};

asyncTests.push(asyncTest0002);





