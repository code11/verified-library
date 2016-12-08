/// Template is a helper class which provides an interface to send data
/// per that specific template to the api. This is exposed to the user

var callForData = VeLib.core.helpers._call
var configs     = VeLib.core.configs
var state       = VeLib.core.state

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

	// @ local
	getAvailableSigningMethods() {
		return new Promise( ( resolve, reject ) => {
			let roles = this.getInfo().roles
			if ( !roles ) reject( {
				message: "No roles found in descriptor, cannot get a signer from them"
			} )

			let foundSigners = roles.filter( role => role.action.type === 'review' || role.action.type === 'sign' )

			if ( !foundSigners.length || foundSigners.length != 1 )
				reject( {
					message: "No signer or reviewer found in descriptor roles, or there is more than 1"
				} )

			resolve( foundSigners[ 0 ].action.methods )
		} )

	}

	// @ remote
	addRecipient( config ) {
		if ( config.action ) {
			console.log( "Action is set manually " )
		}

		let recipient = {
			familyName: config.familyName,
			givenName: config.givenName,
			email: config.email,
			language: config.language || 'en',

			role: {
				name: "Public template client",
				action: config.action || "sign",
				label: "Public template client"
			},
			order: 1,
			signingMethod: config.method
		}

		return callForData( "POST",
			`${ configs.get().envelopesUrl }/${ state.get().remoteEntities.envelope.id}/${ configs.get().recipientsAppendix }`,
			recipient )
	}

	submitRawUserdata( remoteTemplate ) {
		//TODO WIP, make this work please
		// console.log "WIP"
	}

}

module.exports = {
	Template: Template
}
