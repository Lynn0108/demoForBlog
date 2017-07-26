function Watcher(vm, node, exp, nodeType) {
    this.node = node;
    this.vm = vm;
    this.exp = exp;
    this.nodeType = nodeType;
    this.update();
}
Watcher.prototype = {
    update: function() {
        this.value = this.get(); 
        if (this.nodeType == 'text') {
            this.node.nodeValue = this.value;
        }
        if (this.nodeType == 'input') {
            this.node.value = this.value;
        }
    },
    get: function() {
        Dep.target = this;    // 将当前订阅者指向自己
        var value = this.vm[this.exp];    // 触发getter，添加自己到属性订阅器中
        Dep.target = null;    // 添加完毕，重置
        return value;
    }
};