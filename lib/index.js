var config = {},
	sequence = [],
	Player = require('./Player');

var API = {
	initConfig: function(options){
		config = options;
	},
	add: function(){
		var block = [].slice.call(arguments, 0);
		sequence.push(block);
	},
	start: function(){
		var player = new Player(sequence, config);
		player.start();
	}
};


module.exports = API;