import helpers from "./helpers";
const state = VeLib.core.state
const privateTemplate = VeLib.private_templates

class Actions {
	constructor() {}

	init() {
		return Promise.resolve( {
			needsContextCreation: helpers.shouldCreateContext()
		} )
	}

	getTemplateInterface() {
		return helpers.getTemplateObjectsArrayInterface()
	}

	submitFormData() {

		const envelopeExists = !helpers.shouldCreateContext

		let action = null
		let actionObject = null

		if ( envelopeExists ) {
			action = privateTemplate.putTemplateData
			actionObject =
				state.get()
				.templates[ 0 ].data || {}

		} else {
			action = helpers.createEnvelopeContext
			actionObject = helpers.templateInterfaceToRemote()
		}

		return action( actionObject )

	}

	publish() {
		return helpers.publishEnvelope()
			.then( () => helpers.pollForStatus( "signToken" ) )
			.then( ( signToken ) => helpers.buildSignUrl( signToken ) )
	}

	getAvailableSigningMethods() {
		return helpers.getAvailableSigningMethods()
	}
	addRecipient( data ) {
		return helpers.addRecipient( data )
	}
}

module.exports = new Actions()
