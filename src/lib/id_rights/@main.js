import actions from "./actions"

class IDrights {
	constructor(){ this.actions = actions }
}

var idrights = new IDrights()

Object.setPrototypeOf(idrights, actions)

module.exports = idrights
