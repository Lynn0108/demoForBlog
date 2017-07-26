function observe(data) {
	if (!data || typeof data !== 'object') {
		return ;	
	}
	return new Observer(data);
}

function Observer(data) {
	// this.data = data;
	// this.dep = new Dep();
	this.walk(data);
}
Observer.prototype = {
	walk: function(data) {
		var _this = this;
		Object.keys(data).forEach(function(prop){
			_this.defineReactive(data, prop, data[prop]);
		})
	},
	defineReactive: function(data, prop, val) {
		var dep = new Dep();
		observe(val);
		Object.defineProperty(data, prop, {
			configurable: true,
			enumerable: true,
			get: function() {
				if (Dep.target) {
                    // dep.depend();
                    dep.addSub(Dep.target);
                }
				return val;
			},
			set: function(newVal) {
				if (newVal !== val) {
					console.log(prop + '属性值变化：' + val + ' > ' + newVal);
					val = newVal;
					dep.notify();
				}
			}
		})
	}
}

function Dep() {
	this.subs = [];
}
Dep.prototype = {
	addSub: function(sub) {
		this.subs.push(sub);
	},
	depend: function() {
        Dep.target.addDep(this);
    },
	notify: function() {
		this.subs.forEach(function(sub){
			sub.update();
		})
	}
}
Dep.target = null;