import actions from "./actions"

class Bisnode {
	constructor(){ this.actions = actions }
}

var bisnode = new Bisnode()

Object.setPrototypeOf(bisnode, actions)

module.exports = bisnode
