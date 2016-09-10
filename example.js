var bootSeq = require('./lib');
bootSeq.initConfig({
	blockDelay: 1000,
	stepDelay: 500
});
bootSeq.add('A simple block');
bootSeq.add('Another block', ' and a step', ' and another step');
bootSeq.add('Loading stuff', {CharByChar:'.....'});
bootSeq.add('Loading stuff', '.', '.', '.', '.', '.');
bootSeq.add('Easy spinners: ', [
	'|',
	'/',
	'-',
	'\\'
]);
bootSeq.add('Real stuff: ', function(){
	return new Date();
}, '.', '.', '.');
bootSeq.add('Async real stuff: ', function(done){
	var req = require('request');
	req('https://en.wikipedia.org/w/api.php?action=query&generator=random&format=json', function(err, resp, body){
		body = JSON.parse(body);
		done(body.query.pages[Object.keys(body.query.pages)[0]].title);
	});
}, '.', '.', '.');


bootSeq.add('Async real stuff with style: ', {
	Playable: 'PFunction',
	obj: function(done){
		var that = this;
		if(typeof this.done === 'undefined'){
			this.done = false;
			var req = require('request');
			req('https://en.wikipedia.org/w/api.php?action=query&generator=random&format=json', function(err, resp, body){
				if(err) throw err;
				that.done = true;
				body = JSON.parse(body);
				that.output = body.query.pages[Object.keys(body.query.pages)[0]].title;
			});
			done('...');
		}else{
			if(this.done){
				done(this.output);
			}else{
				done('...');
			}
		}

	},
	opts: {
		next: function(){
			return !this.done;
		},
		frameDelay: 1
	}

});


bootSeq.start();