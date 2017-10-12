import helpers from "./helpers";
const state = VeLib.core.state

class Actions {
	constructor() {
		this.pollForProperty = helpers.pollForStatus
		this.buildSignUrl = helpers.buildSignUrl
	}

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

		let shouldCreateContext = helpers.shouldCreateContext()
		console.log("should create context is", shouldCreateContext)

		if ( shouldCreateContext ) {
			return helpers.createEnvelopeContext(helpers.templateInterfaceToRemote(), noCommit)
		} else {
			return state.get()
			.templates[ 0 ]
			.submitRawUserdata(noCommit)
		}

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
