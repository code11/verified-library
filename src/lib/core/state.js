const _ = require("lodash/object");

export class State {
	constructor(initialState){
		// Only here for documentation purposes to see the keys, same for above
		this.state    = initialState || {}
		this.internal = {
			accessToken: null
		}

		this.params   = {}
		this.errors = []
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
	addError(error) {
		this.state.errors = _.merge({}, this.state.errors, error)
	}
}

export let state = new State()
