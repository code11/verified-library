/// Template is a helper class which provides an interface to send data
/// per that specific template to the api. This is exposed to the user
import helpers from "./helpers"

class Template {
	constructor( info ) {
		this.data = {}
		this.info = info
	}

	getInfo() {
		return this.info
	}

	getData() {
		return this.data
	}

	setData( data ) {
		this.data = data
	}

	// @ remote

	submitRawUserdata( remoteTemplate ) {
		//TODO WIP, make this work please
		// console.log "WIP"
	}

}

module.exports = {
	Template: Template
}
