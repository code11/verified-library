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
		this.customPublicInfo = {}
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

	// Mainly sed for setting a document's name and tags
	setCustom( customFields  ){
		this.customPublicInfo = Object.assign(this.info, customFields )
	}

	getCustom() { return this.customPublicInfo }

	// @ remote

	submitRawUserdata(noCommit) {

		let thisHash = this.getInfo().hash
		let thisData = this.getData()
		console.log("this hash is", thisHash, "data is", thisData)

		let documents = state.get().remoteEntities.envelope.documents.filter((doc) => {
			return doc.descriptor.hash === thisHash
		})

		// TODO: throw error on no match

		let templateUid = documents[0].template.uid
		let callDetails = {
			method: "POST",
			url: `${ templateUid }${ configs.userDataAppendix }`,
			body: thisData
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
