import helpers from "./helpers";
var state = VeLib.core.state

class Actions {
	constructor( ) {}

	init( options ) {
		state.merge({ publicTemplateOptions: options })

		return new Promise(( resolve, reject ) => {
			resolve({needsContextCreation: helpers.shouldCreateContext( )})
		})
	}

	submitFormData( ) {
		return new Promise(( resolve, reject ) => {

			let remoteTemplates = helpers.templateInterfaceToRemote( )
			const envelopeExists = !helpers.shouldCreateContext( )

			var action = null

			// This should be linked to the core putTemplateData actions
			if ( envelopeExists ) {
				action = helpers.submitRawUserdata
			} else
				action = helpers.createEnvelopeContext

			return resolve(action( remoteTemplates ))

		})
	}
	publish( ) {
		return helpers.publishEnvelope( ).then(( ) => helpers.pollForStatus( "signToken" )).then(( signToken ) => helpers.buildSignUrl( signToken ))
	}
	getMyRole( ) {
		return helpers.getMyRole( )
	}
	getTemplateInterface( ) {
		return helpers.getTemplateObjectsArrayInterface( )
	}
	getAvailableSigningMethods( ) {
		return helpers.getAvailableSigningMethods( )
	}
	addRecipient( data ) {
		return helpers.addRecipient( data )
	}
}

module.exports = new Actions( )
