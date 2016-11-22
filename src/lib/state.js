const _ = require("lodash");

export class State {
	constructor(initialState){
		// Only here for documentation purposes to see the keys, same for above
		this.state    = initialState || {}
		this.internal = { accessToken: null }
		this.params   = {}

		this.remoteEntities = {
			descriptor: null,
			envelope  : null,
			template  : null,
			doc       : null,
			user      : null
		}
	}
	get() {
		return this.state
	}
	set(newState) {
		this.state = _.merge({}, newState);
	}
	merge(mergeObj) {
		this.state = _.merge({}, this.state, mergeObj)
	}
}

export let state = new State()
