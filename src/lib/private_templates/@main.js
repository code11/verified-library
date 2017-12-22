import actions from "./actions"

class PrivateTemplates {
	constructor( ) { this.actions = actions }
}

var privateTemplates = new PrivateTemplates( )

Object.setPrototypeOf( privateTemplates, actions )

module.exports = privateTemplates
