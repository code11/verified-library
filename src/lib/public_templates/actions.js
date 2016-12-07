import helpers from "./helpers";

class Actions {
	constructor(){}

	init(){
		return new Promise( (resolve, reject) => {
			resolve({
				needsContextCreation: helpers.shouldCreateContext()
			})
		})
	}

	submit(){
		return new Promise((resolve, reject) => {
			let remoteTemplates = helpers.templateInterfaceToRemote()

			return helpers.createEnvelopeContext(remoteTemplates)
			.then(envelope => helpers.publishEnvelope() )
			.then(() => helpers.pollForStatus() )
			.then( signToken => console.log("Got signToken", signToken ) )
		})
	}
	getTemplateInterface(){ console.log("template Interface as array is", helpers); return helpers.getTemplateObjectsArrayInterface() }
}

module.exports = new Actions()
