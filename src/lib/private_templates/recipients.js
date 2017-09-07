const callRaw = VeLib.core.remote.callRaw
const configs = VeLib.core.configs

const interface = {
	addRecipient: ( recipient ) => {
		url = `${ configs.envelopesAppendix }/${ state.get().remoteEntities.envelope.id }${configs.recipientsAppendix}`

		return callRaw( {
				method: "POST",
				url: url,
				body: recipient
			} )
			.then( response => response.headers.location )
	},
	putRecipient: ( recipient ) => {
		url =
			`${ configs.envelopesAppendix }/${ state.get().remoteEntities.envelope.id }${configs.recipientsAppendix}/${ recipient.id }`

		return callRaw( {
			method: "PUT",
			url: url,
			body: recipient
		} )
	},

	saveRecipient: ( recipient ) => {
		if ( recipient.id ) return interface.putRecipient( recipient )
		else return interface.addRecipient( recipient )
	},

	saveRecipients: ( recArray ) => {
		let promArray = []
		recArray.forEach( rec => promArray.push( interface.saveRecipient( rec ) ) )
		return Promise.all( promArray )
	},

	removeRecipient: ( recipient ) => {
		url =
			`${ configs.envelopesAppendix }/${ state.get().remoteEntities.envelope.id }${configs.recipientsAppendix}/${ recipient.id}`

		return callRaw( {
			method: "DELETE",
			url: url
		} )
	}
}

export default interface
