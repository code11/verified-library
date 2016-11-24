/// Template is a helper class which provides an interface to send data
/// per that specific template to the api. This is exposed to the user
var _call = VeLib.core.helpers._call

class Template {
	constructor(info){
		// Info is some info fetched from the descriptor
		// regarding it's rules, names and so on so the user can send that data
		// to the specific template by seeing which one it is if there are more than one

		this.info = { info }
	}
	getInfo(){ return this.info }
	putData(data){
		return new Promise((resolve, reject) => {
			// This returns a promise that the user should call whenever he fees like submitting on this
			// specific template
		})
	}
}

module.export = new Template()
