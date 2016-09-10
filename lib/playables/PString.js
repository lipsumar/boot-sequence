function PlayableString(str){
	this.str = str;
}

PlayableString.prototype.frame = function() {
	return this.str;
};

PlayableString.prototype.next = function() {
	return false;
};

module.exports = PlayableString;