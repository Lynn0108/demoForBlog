function Compile(el, vm) {
	this.$el = this.isElementNode(el) ? el : document.querySelector(el);
	this.$vm = vm;
	if (this.$el) {
		this.$fragment = this.node2fragment(this.$el);
		this.init();
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
			var reg = /\{\{(.*)\}\}/g;
			/*if (_this.isElementNode(node)) {
				_this.compile(node);
			} else */if(_this.isTextNode(node) && reg.test(text)) {
				console.log(RegExp.$1);
				_this.compileText(node, RegExp.$1);
			}
			if (node.childNodes && node.childNodes.length) {
				_this.compileElement(node);
			}
		})
	},
	compile: function() {

	},
	compileText: function(node, exp) {
		compileUtil.text(node, this.$vm, exp);
	},
	isElementNode: function(node) {
        return node.nodeType == 1;
    },
    isTextNode: function(node) {
    	return node.nodeType == 3;
    }
};
var compileUtil = {
    text: function(node, vm, exp) {
        this.bind(node, vm, exp, 'text');
    },
 	bind: function(node, vm, exp, dir) {
        var updaterFn = updater[dir + 'Updater'];
        // 第一次初始化视图
        updaterFn && updaterFn(node, vm[exp]);
        // 实例化订阅者，此操作会在对应的属性消息订阅器中添加了该订阅者watcher
        new Watcher(vm, exp, function(value, oldValue) {
            // 一旦属性值有变化，会收到通知执行此更新函数，更新视图
            updaterFn && updaterFn(node, value, oldValue);
        });
    }
};

// 更新函数
var updater = {
    textUpdater: function(node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    }
    // ...省略
};