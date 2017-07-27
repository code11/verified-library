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

		if ( envelopeExists ) {
			action = privateTemplate.putTemplateData
		}

		return new Promise( ( resolve, reject ) => {

			let remoteTemplates = helpers.templateInterfaceToRemote()


			// This should be linked to the core putTemplateData actions
			if ( envelopeExists ) {
				action = privateTemplate.putTemplateData
			} else
				action = helpers.createEnvelopeContext

			return resolve( action( remoteTemplates ) )

		} )
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
