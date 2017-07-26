import actions from "./actions"
import helpers from "./helpers"
var state = VeLib.core.state

class PublicTemplate {
	constructor( ) {
		this.actions = actions
	}

	init( options ) {
		state.merge({ publicTemplateOptions: options })
		return {needsContextCreation: helpers.shouldCreateContext( )}
	}
}

var publicTemplate = new PublicTemplate( )

Object.setPrototypeOf( publicTemplate, actions )

module.exports = publicTemplate
