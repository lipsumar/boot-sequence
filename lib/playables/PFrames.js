function PlayableFrames(frames){
	this.frames = frames;
	this.frameIndex = 0;
	this.frameDelay = 100;
}

PlayableFrames.prototype.frame = function() {
	return this.frames[this.frameIndex];
};

PlayableFrames.prototype.next = function() {
	this.frameIndex++;
	return typeof this.frames[this.frameIndex] !== 'undefined';
};

module.exports = PlayableFrames;