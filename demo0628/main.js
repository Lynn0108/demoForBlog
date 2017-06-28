(function () {
	var test1 = document.getElementById('test1').children[0],
		test2 = document.getElementById('test2').children[0],
		test3 = document.getElementById('test3').children[0],
		test4 = document.getElementById('test4');
	document.getElementById('widthAuto').onclick = function () {
		test1.setAttribute('class', 'widthAuto1');
		test2.setAttribute('class', 'widthAuto1');
		test3.setAttribute('class', 'widthAuto1');
		test3.children[0].setAttribute('class', 'widthAuto1');
		test3.children[1].setAttribute('class', 'widthAuto1');
		test4.setAttribute('class', 'widthAuto2');
	}
	document.getElementById('heightAuto').onclick = function () {
		test1.setAttribute('class', 'heightAuto1');
		test1.setAttribute('class', 'heightAuto1');
		test2.setAttribute('class', 'heightAuto1');
		test3.setAttribute('class', 'heightAuto1');
		test3.children[0].setAttribute('class', 'heightAuto1');
		test3.children[1].setAttribute('class', 'heightAuto1');
		test4.setAttribute('class', 'heightAuto2');
	}
	document.getElementById('back').onclick = function () {
		test1.setAttribute('class', '');
		test1.setAttribute('class', '');
		test2.setAttribute('class', '');
		test3.setAttribute('class', '');
		test3.children[0].setAttribute('class', '');
		test3.children[1].setAttribute('class', '');
		test4.setAttribute('class', '');
	}
})()