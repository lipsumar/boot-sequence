function PlayableFunction(func, opts){
	this.func = func;
	this.opts = opts || {};
	this.funcContext = {};
	if(this.func.length === 1){
		this.async = true;
	}
	if(this.opts.frameDelay){
		this.frameDelay = this.opts.frameDelay;
	}

}

PlayableFunction.prototype.frame = function(done) {
	if(this.async){
		this.func.call(this.funcContext, done);
	}else{
		return this.func.call(this.funcContext);
	}

};

PlayableFunction.prototype.next = function() {
	return this.opts.next ? this.opts.next.call(this.funcContext) : false;
};

module.exports = PlayableFunction;