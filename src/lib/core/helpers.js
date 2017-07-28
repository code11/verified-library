import configs from "./configs";
import state from "./state";
import axios from "axios";
import remote from "./remote"

class Helpers {
	constructor( ) {}

	getRemoteEntitiesPromise( ) {

		let { document_uid, descriptor_id } = state.get( ).params;

		return remote.callForData({ method: "GET", url: `${ configs.get( ).userinfoUrl }` }).then(( user ) => {
			if ( document_uid ) {
				var envelopeUid = document_uid.match( /^(\/envelopes\/[^/]+)\// )[ 1 ];

				return remote.callForData({ method: "GET", url: envelopeUid }).then(( envelope ) => {
					var document = envelope.documents.find( doc => doc.uid === document_uid );
					if ( !document )
						throw { code: 404, message: "Document not found" };

					let descriptor = envelope.descriptor,
						template = document.template

					return remote.callForData({ method: "GET", url: `${ template.uid }${ configs.get( ).userDataAppendix }` }).then(( userData ) => {
						template.userData = userData
						return { envelope, descriptor, document, template, user }
					}).catch((err) => {
						console.warn("Template data get failed")
						return { envelope, descriptor, document, template, user}
					})
				})
			} else if ( descriptor_id ) {
				return remote.callForData({ method: "GET", url: `/envelope-descriptors/${ descriptor_id }` }).then(( descriptor ) => {
					return { descriptor: descriptor, user: user }
				})
			}

		})
	}
}

let helpers = new Helpers( )
export default helpers
