import helpers from "./helpers";

class Actions {
	constructor(){
		// this.baseUrl = "???SOME BASE URL ? IF needed ?"


	}
	submit(){
		return new Promise((resolve, reject) => {
			let remoteTemplates = helpers.templateInterfaceToRemote()

			return helpers.createEnvelopeContext(remoteTemplates)
			.then(envelope => helpers.publishEnvelope() )
			.then(() => helpers.pollForStatus() )
			.then( signToken => console.log("Got signToken", signToken ) )

			// After publishing..i must poll for status then go for that url redirect return
		})


		// import descriptorId from somewhere and possibly role ?
		// .. This should also mutate templateUserData and transform it into a good structure before
		// submitting, you have to transform that state someway somehow :)


		// return helpers.createEnvelopeContext(role, descriptorId, templates).then((url) => {
			// return url
		// })
			// allows FE user to post thta data

			// This is available here for calls state.get()
			// This thing should poll for state until the envelope says it's published
			// /workflows/:workflowId/jobs/:jobId ?? Also need to see where and how to put this

			// Observable.defer(() => _this.$http.get('/error'))
			//    .retry(3)
			//    .subscribe(
			//       (x) => console.log('Next: ' + x),
			//       (err) => console.log('Error: ' + err),
			//       () => console.log('Completed'));
	}
	getTemplateInterface(){ console.log("template Interface as array is", helpers); return helpers.getTemplateObjectsArrayInterface() }
}

module.exports = new Actions()
