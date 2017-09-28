const call = VeLib.core.remote.callForData
let configs = VeLib.core.configs.get( )
const state = VeLib.core.state

import recipientActions from "./recipients.js"

class Actions {
	constructor( ) {
		this.saveRecipients = recipientActions.saveRecipients
		this.saveRecipient = recipientActions.saveRecipient
		this.removeRecipient = recipientActions.removeRecipient

	}

	putTemplateData( data, noCommit ) {
		var templateUid = state.get( ).remoteEntities.template.uid;
		//TODO: SET contentType to reflect user's permissions
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

	getTemplateData( ) {
		var t = state.get( ).remoteEntities.template

		if ( t && t.userData )
			return Promise.resolve( t.userData )
		else
			return Promise.resolve({ })
	}

}
let actions = new Actions( )
export default actions
