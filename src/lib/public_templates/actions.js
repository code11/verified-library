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

	submitFormData(){
		return new Promise((resolve, reject) => {

			let remoteTemplates  = helpers.templateInterfaceToRemote()
			const envelopeExists = !helpers.shouldCreateContext()

			var action = null

			if (envelopeExists) { action =  helpers.submitRawUserdata }
			else action = helpers.createEnvelopeContext

			resolve(action(remoteTemplates))

		})
	}
	publish(){
		return helpers.publishEnvelope()
		.then(() => helpers.pollForStatus() )
		.then((signUrl) => helpers.buildSignUrl(signUrl))
	}

	getTemplateInterface(){ console.log("template Interface as array is", helpers); return helpers.getTemplateObjectsArrayInterface() }
	getAvailableSigningMethods(){ return helpers.getAvailableSigningMethods() }

}

module.exports = new Actions()
