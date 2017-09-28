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
	// FILES
	getTemplateInterface() {
		return helpers.getTemplateObjectsArrayInterface()
	}
	// NOT USED I THINK1
	uploadFile({name, file}) {
		return helpers.uploadFile({ name, file })
	}

	getUploadUrl({name}){
		return helpers.getUploadUrl({name})
	}
	removeFile(uid){
		return helpers.removeFile(uid)
	}
	getAllFiles(){
		return helpers.getAllFiles()
	}

	submitFormData(noCommit) {

		let shouldCreateContext = helpers.shouldCreateContext
		console.log("should create context is", shouldCreateContext)
		let action = null
		let actionObject = null

		// If there is already an envelope id, we
		// push the setData from the template object into
		// POST on templates/userData with or without the final flag?

		if ( shouldCreateContext ) {
			action = helpers.createEnvelopeContext
			actionObject = helpers.templateInterfaceToRemote()
		} else {
			action = privateTemplate.putTemplateData
			actionObject =
				state.get()
				.templates[ 0 ].data || {}
		}

		return action( actionObject, noCommit )

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
