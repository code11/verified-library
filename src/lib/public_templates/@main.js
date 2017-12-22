import actions from "./actions"
import helpers from "./helpers"
const state = VeLib.core.state

class PublicTemplate {
	constructor( ) {
		this.actions = actions
	}
}

var publicTemplate = new PublicTemplate( )

Object.setPrototypeOf( publicTemplate, actions )

module.exports = publicTemplate
