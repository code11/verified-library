var _ = require("underscore");

var _state = {
	internal: {
		accessToken: null,
		descriptor_id: null
	},
	params:{},
	remoteEntities:{
		// Only here for documentation purposes to see the keys, same for above
		descriptor: null,
		envelope  : null,
		template  : null,
		doc       : null
	}
};

const methods = {
	get() {
		return _state;
	},
	set(newState) {
		_state = _.extendOwn({}, newState);
		console.log("State has been set", _state);
	},
	merge(mergeObj) {
		_state = _.extendOwn(_state, mergeObj)
		console.log("State has been merged", _state);
	}
};

module.exports = methods
