var state = VeLib.core.state
var configs = VeLib.core.configs
var callForData = VeLib.core.helpers._call

import {
	RequestHelpers
} from "./requests"
import {
	PollerHelpers
} from "./pollers"

export let EnvelopeHelpers = {
	createEnvelopeContext: remoteReadyDocuments => {
		var endpoint = `${ configs.get().createEnvelopePrefix }/${ state.get().params.descriptor_id }/envelopes`
		return RequestHelpers.callAndReturnLocation( "POST", `${ endpoint }`, remoteReadyDocuments )
			.then( location => {
				let envelopeId = location.split( `${ configs.envelopesAppendix }/` )[ 1 ]
				var mergeObj = {
					params: {
						envelope_id: envelopeId
					}
				}
				state.merge( mergeObj )
			} )
			.then( () => PollerHelpers.pollForStatus("token") )
			.then( (token) => state.merge({ internal: { accessToken: token }}))
			.then( () => PollerHelpers.pollForCreation())
			.then( envelope => {
				var mergeObj = {
					remoteEntities: {
						envelope: envelope
					}
				}
				state.merge( mergeObj )
				return new Promise( ( resolve, reject ) => {
					console.info("Envelope context created")
					resolve( envelope )
				} )
			} )
	},

	publishEnvelope: (token) => {
		let url = `${ configs.get().envelopesUrl }/${ state.get().params.envelope_id }${ configs.get().publishAppendix}`
		return RequestHelpers.callAndReturnLocation( "PUT", `${ url }`, {
			published: true
		} , null , token)
	},

	shouldCreateContext: () => {
		if ( state.get().params.envelope_id ) return false
		else return true
	},


	buildSignUrl: ( signToken ) => {
		return new Promise( ( resolve, reject ) => {
			let signDomain = configs.get().domain || ""
			let url =
				`${ signDomain }/#/sign/envelopes/${ state.get().remoteEntities.envelope.id }?access_token=${ signToken }`
			resolve( url )
		} )
	},


	getAvailableSigningMethods() {
		return this.findMostSuitableRole()
		.then( role => {
			console.info("Got signing method for the most suitable role found")
			return role.action.methods
		})
	},

	findMostSuitableRole() {
		return new Promise( ( resolve, reject ) => {
			let roles = state.get().remoteEntities.descriptor.roles

			if ( !roles ) reject( {
				message: "No roles found in descriptor, cannot get a signer from them"
			} )

			let foundSigners = roles.filter( role => role.action.type === 'review' || role.action.type === 'sign' )

			if ( !foundSigners.length || foundSigners.length != 1 )
				reject( {
					message: "No signer or reviewer found in descriptor roles, or there is more than 1"
				} )
			else resolve( foundSigners[ 0 ] )

		} )
	},

	addRecipient( config ) {
		return this.findMostSuitableRole()
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

}
