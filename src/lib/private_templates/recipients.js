const callRaw = VeLib.core.remote.callRaw
const configs = VeLib.core.configs
const state = VeLib.core.state

const expose = {
	addRecipient: ( recipient ) => {
		let url = `${ configs.envelopesAppendix }/${ state.get().remoteEntities.envelope.id }${configs.recipientsAppendix}`

		return callRaw( {
				method: "POST",
				url: url,
				body: recipient
			} )
			.then( response => response.headers.location )
	},
	putRecipient: ( recipient ) => {
		let url =
			`${ configs.envelopesAppendix }/${ state.get().remoteEntities.envelope.id }${configs.recipientsAppendix}/${ recipient.id }`

		return callRaw( {
			method: "PUT",
			url: url,
			body: recipient
		} )
	},

	saveRecipient: ( recipient ) => {
		if ( recipient.id ) return expose.putRecipient( recipient )
		else return expose.addRecipient( recipient )
	},

	saveRecipients: ( recArray ) => {
		let promArray = []
		recArray.forEach( rec => promArray.push( expose.saveRecipient( rec ) ) )
		return Promise.all( promArray )
	},

	removeRecipient: ( recipient ) => {
		let url =
			`${ configs.envelopesAppendix }/${ state.get().remoteEntities.envelope.id }${configs.recipientsAppendix}/${ recipient.id}`

		return callRaw( {
			method: "DELETE",
			url: url
		} )
	}
}

export default expose
