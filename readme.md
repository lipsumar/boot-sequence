# boot-sequence

> A Node module to create cool boot sequences.

This is an alpha version, it is **not yet available on NPM**.

## Examples

```javascript
var bootSeq = require('boot-sequence');
bootSeq.initConfig({
	blockDelay: 1000,
	stepDelay: 500
});

bootSeq.add('This is a block');
bootSeq.add('A block can contain', ' many', ' steps');
bootSeq.add('A built-in "playable":', {CharByChar:'.....'});
bootSeq.add('When a step is an array, it will play frame by frame: ', [
	'|',
	'/',
	'-',
	'\\'
]);

// don't forget to start the sequence
bootSeq.start();
```

You can also specify your own functions, async or not:

```javascript
bootSeq.add('System time: ', function(){
	return new Date();
});
bootSeq.add('A random wikipedia page: ', function(done){
	var req = require('request');
	req('https://en.wikipedia.org/w/api.php?action=query&generator=random&format=json', function(err, resp, body){
		body = JSON.parse(body);
		done(body.query.pages[Object.keys(body.query.pages)[0]].title);
	});
});
```

See more example in `example.js`