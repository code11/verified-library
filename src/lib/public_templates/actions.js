var state = VeLib.core.state;
import helpers from "./helpers";

class Actions {
	constructor(){
		// this.baseUrl = "???SOME BASE URL ? IF needed ?"
		//
		this.state = state
		console.log("big state is", this.state)

	}
	init(){
		return helpers.createEnvelopeContext().then(() => {
			return []
		})
		// Should give you a template interface to work on userData and so on ??
		// Make a call to create Envelope Context
	}
	submit(){
		// import descriptorId from somewhere and possibly role ?
		return new Promise((resolve, reject) => {
			// @ Should take in role and descriptorId, should provide back data structures which
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

		})
	}
}

module.exports = new Actions()
