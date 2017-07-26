function MVVM(options) {
	var _this = this;
	var data = this._data = options.data;
	observe(data);
	Object.keys(data).forEach(function(prop) {
		_this._proxy(prop);
	})
	this.$compile = new Compile(options.el || document.body, this);
}

MVVM.prototype = {
	_proxy: function(prop) {
		var _this = this;
		Object.defineProperty(_this, prop, {
			configurable: true,
			enumerable: true,
			get: function() {
				return _this._data[prop];
			},
			set: function(val) {
				_this._data[prop] = val;
			}
		})
	}
}