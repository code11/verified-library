var _ = require("lodash");

var _state = {
	internal: {
		accessToken: null,
		domain: null
	},
	params:{},
	remoteEntities:{
		// Only here for documentation purposes to see the keys, same for above
		descriptor: null,
		envelope  : null,
		template  : null,
		doc       : null,
		user      : null
	}
};

const methods = {
	get() {
		return _state;
	},
	set(newState) {
		_state = _.merge({}, newState);
		console.log("State has been set", _state);
	},
	merge(mergeObj) {
		_state = _.merge({}, _state, mergeObj)
		console.log("State has been merged", _state);
	}
};

module.exports = methods
