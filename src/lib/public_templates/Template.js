/// Template is a helper class which provides an interface to send data
/// per that specific template to the api. This is exposed to the user
import helpers from "./helpers"
const call = VeLib.core.remote.callForData
let configs = VeLib.core.configs.get( )
const state = VeLib.core.state

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

	submitRawUserdata(noCommit) {

		let thisHash = this.getInfo().hash
		console.log("this hash is", thisHash)

		let documents = state.get().remoteEntities.envelope.documents.filter((doc) => {
			return doc.descriptor.hash === thisHash
		})

		console.log("identified uid", documents[0].template.uid)

		let callDetails = {
			method: "POST",
			url: `${ templateUid }${ configs.userDataAppendix }`,
			body: data
		}
		if (noCommit) {
			callDetails.params = {
				noCommit: true
			}
		}

		return call(callDetails)

	}

}

module.exports = {
	Template: Template
}
