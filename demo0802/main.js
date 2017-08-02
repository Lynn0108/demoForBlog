var main = {

	setMarginBottom: function () {

	}
}


var imgDivArr = document.querySelectorAll('.imgDiv');
var len = imgDivArr.length;
var imgDivH = [];
var imgDivOt = [];
for (var i = 0; i < len; i++) {
	imgDivH[i] = imgDivArr[i].offsetHeight;
	imgDivOt[i] = imgDivArr[i].offsetTop;
}
var ctxH = document.querySelector('.content').offsetHeight;
var marginB = ctxH - imgDivH[len - 1] + 40 ;
imgDivArr[len - 1].style.marginBottom = marginB + 'px';

var nav = document.querySelector('.nav');
nav.addEventListener('click', function(event) {
	var e = event || window.event;
	var target = e.target || e.srcElement;
	// console.log(e);
	if (target.nodeName.toLowerCase() === 'li') {
		this.querySelector('.active').className = '';
		target.className = 'active';
	}
	var index = getIndex(target);
	contentRoll(index);
})

function getIndex(ele) {
	//IE is simplest and fastest 
	if(ele.sourceIndex){ 
		return ele.sourceIndex - ele.parentNode.sourceIndex - 1; 
	} 
	//other browsers 
	var i = 0; 
	while(ele = ele.previousElementSibling){ 
		i++; 
	} 
	return i; 
}

function contentRoll(index) {

}

var ctx = document.querySelector('.content');
ctx.addEventListener('scroll', function() {
	console.log(this.scrollTop);
	for (var i = 0; i < len; i++) {
		if (this.scrollTop < imgDivH[i] + imgDivOt[i] - 40) {
			nav.querySelector('.active').className = '';
			nav.querySelectorAll('li')[i].className = 'active';
			break;
		}
	}
})