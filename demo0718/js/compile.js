function Compile(el, vm) {
	this.$el = this.isElementNode(el) ? el : document.querySelector(el);
	this.$vm = vm;
	if (this.$el) {
		this.$fragment = this.node2fragment(this.$el);
		this.init();
		this.$el.appendChild(this.$fragment);
	}
}
Compile.prototype = {
	init: function() {
		this.compileElement(this.$fragment);
	},
	node2fragment: function(el) {
		var fragment = document.createDocumentFragment(),
			child;
		while(child = el.firstChild) {
			fragment.appendChild(child);
		}
		return fragment;
	},
	compileElement: function(el) {
		var _this = this,
			childNodes = el.childNodes;
		[].slice.call(childNodes).forEach(function(node) {
			var text = node.textContent;
			var reg = /\{\{(.*)\}\}/;
			if (_this.isElementNode(node)) {
				_this.compile(node);
			} else if(_this.isTextNode(node) && reg.test(text)) {
				console.log(RegExp.$1);
				_this.compileText(node, RegExp.$1);
			}
			if (node.childNodes && node.childNodes.length) {
				_this.compileElement(node);
			}
		})
	},
	compile: function(node) {
		var _this = this;
		var attrs = node.attributes;
		var name = '';
		[].slice.call(attrs).forEach(function(attr) {
			if (attr.name == 'v-model') {
				name = attr.nodeValue;
				node.addEventListener('input', function(e) {
					_this.$vm[name] = e.target.value;
				})
				node.value = _this.$vm[name];
				node.removeAttribute(attr);
			}
		})
		new Watcher(this.$vm, node, name, 'input');
	},
	compileText: function(node, exp) {
		// compileUtil.text(node, this.$vm, exp);
		// node.nodeValue = this.$vm[exp];
		new Watcher(this.$vm, node, exp, 'text');
	},
	isElementNode: function(node) {
        return node.nodeType == 1;
    },
    isTextNode: function(node) {
    	return node.nodeType == 3;
    }
};