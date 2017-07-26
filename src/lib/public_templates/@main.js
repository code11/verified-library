import actions from "./actions"
import helpers from "./helpers"
var state = VeLib.core.state

class PublicTemplate {
	constructor( ) {
		this.actions = actions
	}

	init( ) {
		return {needsContextCreation: helpers.shouldCreateContext( )}
	}
}

var publicTemplate = new PublicTemplate( )

Object.setPrototypeOf( publicTemplate, actions )

module.exports = publicTemplate
