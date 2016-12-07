var state   = VeLib.core.state
var configs = VeLib.core.configs

import { RequestHelpers } from "./requests"
import { PollerHelpers } from "./pollers"

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
			.then( () => PollerHelpers.pollForCreation() )
			.then( envelope => {
				var mergeObj = {
					remoteEntities: {
						envelope: envelope
					}
				}
				state.merge( mergeObj )
				return envelope
			} )
	},

	publishEnvelope: () => {
		let url = `${ configs.get().envelopesUrl }/${ state.get().params.envelope_id }/${ configs.get().publishAppendix}`
		return RequestHelpers.callAndReturnLocation( "PUT", `${ url }`, {
			published: true
		} )
	}
}
