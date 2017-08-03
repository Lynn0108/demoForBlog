var main = {
	ctx: document.querySelector('.content'),
	nav: document.querySelector('.nav'),
	imgDivArr: [],
	len: 0,
	imgDivH: [],
	imgDivOt: [],

	init: function() {
		var _this = this;
		this.getDivH();
		this.setMarginBottom();
		this.ctx.addEventListener('scroll', function() {
			// console.log(this.scrollTop);
			_this.activeLi();
			
		})
		this.nav.addEventListener('click', function(event) {
			var e = event || window.event;
			var target = e.target || e.srcElement;
			if (target.nodeName.toLowerCase() === 'li') {
				/*this.querySelector('.active').className = '';
				target.className = 'active';*/
				_this.clickToRoll(target);
			}
			
		})
	}, 
	clickToRoll: function(target) {
		var index = _this.getIndex(target);
		_this.contentRoll(index);
	},
	activeLi: function() {
		for (var i = 0; i < _this.len; i++) {
			if (this.ctx.scrollTop <= _this.imgDivH[i] + _this.imgDivOt[i] - 40) {
				console.log(i);
				_this.nav.querySelector('.active').className = '';
				_this.nav.querySelectorAll('li')[i].className = 'active';
				break;
			}
		}
	},
	getDivH: function() {
		this.imgDivArr = document.querySelectorAll('.imgDiv');
		this.len = this.imgDivArr.length;
		this.imgDivH = [];
		this.imgDivOt = [];
		for (var i = 0; i < this.len; i++) {
			this.imgDivH[i] = this.imgDivArr[i].offsetHeight;
			this.imgDivOt[i] = this.imgDivArr[i].offsetTop;
		}
	},
	setMarginBottom: function () {
		var ctxH = this.ctx.offsetHeight;
		var marginB = ctxH - this.imgDivH[this.len - 1] + 40 ;
		this.imgDivArr[this.len - 1].style.marginBottom = marginB + 'px';
	},
	getIndex: function (ele) {
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
	},
	contentRoll: function (i) {
		if (i > 0) {
			this.ctx.scrollTop = this.imgDivH[i-1] + this.imgDivOt[i-1];
		} else {
			this.ctx.scrollTop = 0;
		}
		
	}

}
main.init();