var state = VeLib.core.state;

class Actions {
	constructor(){
		// this.baseUrl = "???SOME BASE URL ?"
		//
		this.state = state
		console.log("big state is", this.state)

	}
	createFromDescriptor(){
		return new Promise((resolve, reject) => {
			// THis is available here for calls state.get()
			resolve("http://testurl.com")
		})
	}
}

module.exports = new Actions()
