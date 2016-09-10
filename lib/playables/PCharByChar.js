function PlayableCharByChar(str){
	this.chars = str.split('');
	this.out = '';
	this.charIndex = 0;
	this.frameDelay = 100;
}

PlayableCharByChar.prototype.frame = function() {
	return this.out + this.chars[this.charIndex];
};

PlayableCharByChar.prototype.next = function() {
	this.out+= this.chars[this.charIndex];
	this.charIndex++;
	return typeof this.chars[this.charIndex] !== 'undefined';
};

module.exports = PlayableCharByChar;