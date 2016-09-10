var makePlayable = require('./makePlayable');
function Player(sequence, opts){
	this.sequenceIndex = 0;
	this.sequence = sequence;
	this.opts = opts;
}

Player.prototype.start = function(callback) {
	this.hideSystemCursor();
	var next = (function(){
		var block = this.nextBlock();
		if(block){
			var blockDelay = (this.sequenceIndex === 1 ? 0 : this.opts.blockDelay);
			setTimeout(this.playBlock.bind(this, block, next), blockDelay);
		}else{
			this.showSystemCursor();
			callback && callback();
		}
	}).bind(this);

	next();
}

Player.prototype.playBlock = function(block, callback) {
	var steps = block.map(makePlayable);
	var sI = 0;
	this.stepPrefix = '';

	var next = (function(){
		var step = steps[sI];
		sI++;
		if(step){
			var stepDelay = (steps.length === 1 || sI === 1) ? 0 : this.opts.stepDelay;
			setTimeout(this.playStep.bind(this, step, next), stepDelay);
		}else{
			process.stdout.write('\n');
			callback && callback();
		}

	}).bind(this);
	next();
};

Player.prototype.playStep = function(step, callback) {

	var displayFrame = (function(frame){
		process.stdout.write(this.stepPrefix+frame+'\r');
		if(step.next()){
			setTimeout(nextFrame, step.frameDelay);
		}else{
			this.stepPrefix+=frame;
			callback && callback();
		}
	}).bind(this);

	var nextFrame = (function(){
		if(step.async){
			step.frame(displayFrame);
		}else{
			displayFrame(step.frame());
		}

	}).bind(this);
	nextFrame();

};

Player.prototype.nextBlock = function() {
	var nextBlock = this.sequence[this.sequenceIndex];
	this.sequenceIndex++;
	return nextBlock;
};

Player.prototype.hideSystemCursor = function() {
	process.stdout.write('\x1B[?25l'); // hide system cursor
};
Player.prototype.showSystemCursor = function() {
	process.stdout.write('\x1B[?25h'); // show system cursor
};

module.exports = Player;
