/// Template is a helper class which provides an interface to send data
/// per that specific template to the api. This is exposed to the user
import helpers from "./helpers"

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

	// @ remote
	addRecipient( config ) {
		console.log(" Helpers is", helpers)
		return helpers.findMostSuitableRole()
		.then( role => {

			if ( config.action ) { console.warn( "Action is set manually " ) }

			let recipient = {
				familyName: config.familyName,
				givenName: config.givenName,
				email: config.email,
				language: config.language || 'en',

				role: {
					name  : role.roleName,
					action: config.action || "sign",
					label : "Public template client"
				},
				order: 1,
				signingMethod: config.signingMethod
			}
			return recipient
		})
		.then( recipient => {
			return callForData( "POST",
				`${ configs.get().envelopesUrl }/${ state.get().remoteEntities.envelope.id}${ configs.get().recipientsAppendix }`,
				recipient )
		})
	}

	submitRawUserdata( remoteTemplate ) {
		//TODO WIP, make this work please
		// console.log "WIP"
	}

}

module.exports = {
	Template: Template
}
