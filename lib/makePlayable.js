var PlayableString = require('./playables/PString'),
	PlayableFrames = require('./playables/PFrames'),
	PlayableFunction = require('./playables/PFunction'),
	PlayableCharByChar = require('./playables/PCharByChar');

var Playables = {
	'PFunction': PlayableFunction
};

module.exports = function makePlayable(obj){
	var playable = null;

	if(typeof obj === 'string'){
		playable = new PlayableString(obj);
	}else if(typeof obj === 'object' && obj instanceof Array){
		playable = new PlayableFrames(obj);
	}else if(typeof obj === 'function'){
		playable = new PlayableFunction(obj);
	}else{
		var objKeys = Object.keys(obj);
		if(objKeys.length === 1){
			var playbleName = objKeys[0],
				playableArgs = obj[playbleName];

			switch(playbleName){
				case 'CharByChar':
					playable = new PlayableCharByChar(playableArgs);
					break;
				default:
					throw new Error('could not find a playable object for: '+objKeys[0]);
			}

		}else{

			if(typeof obj.Playable === 'string'){

				playable = new Playables[obj.Playable](obj.obj, obj.opts);

			}else{
				throw new Error('can not make playable: '+(typeof obj));
			}


		}

	}

	if(playable){
		playable.frameDelay = typeof playable.frameDelay === 'number' ? playable.frameDelay : 0;
	}
	return playable;
}