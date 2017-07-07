const qs = require("query-string");
import { entityMap } from "./namings"

import { configs } from "./configs";
import { state } from "./state";
import axios from "axios";

class Helpers {
	constructor(){}
	getQueryParams() { return qs.parse(location.search)}

	_call(method, url, _body, _params, headers={}){
		headers["x-namespace"] = state.get().internal.companyUid;

		if (!_body) {
			_body = null
		} else {
			if(!headers["content-type"])
				headers["content-type"] = 'application/json';
			_body = JSON.stringify(_body)
		}

		if(!headers["accept"])
			headers["accept"] = "application/json";

		var token, params = "?";
		if (_params) { params += qs.stringify(params)} else params = ""

		if((token=state.get().internal.accessToken)) {
			headers.authorization = "JWT " + token;
		}

		return axios({
			url: "/api" + url + params,
			method: method,
			headers: headers,
			data: _body
		}).then((response) => response.data)
	}

	setToken(qParams){
		return new Promise((resolve, reject) => {
			var data = {
				accessToken: qParams.access_token
			};
			if (qParams.c) {
				data.companyUid="/companies/"+qParams.c;
			}
			if (!data.accessToken) {
				console.warn("Missing access_token parameter, will try to use the localstorage one, if any.");
				try {
					data.accessToken = localStorage.getItem("accessToken");
				} catch(e){}
			}

			if (!data.accessToken) {
				console.warn("Missing access_token parameter, will try to use the cookie stored one, if any.");
			}

			state.merge({ internal: data });
			resolve(qParams.access_token);
		})
	}

	getRemoteEntitiesPromise() {
		var entityPromises = [];
		var params = state.get().params;

		var documentUid = params.document_uid;
		if (documentUid) {
			var envelopeUid = documentUid.match(/^(\/envelopes\/[^/]+)\//)[1];

			return this._call("GET",  envelopeUid )
				.then((envelope) => {
					var document = envelope.documents.find(doc => doc.uid === documentUid);
					if(!document)
						throw {code: 404, message: "Document not found"};
					return {
						envelope: envelope,
						descriptor: envelope.descriptor,
						document: document,
						template: document.template
					}
				})
		} else if (params['descriptor_id']) {
			this._call("GET", `/envelope-descriptors/${ params.descriptor_id }`)
				.then((descriptor) => {
					return {
						descriptor: descriptor
					}
				})
		}

		if (params['document_id']) {
			entityPromises[entityMap.document_id] = this._call.bind(null, "GET",
				`${ configs.get().envelopesUrl }/
				${ params.envelope_id }
				${ configs.get().documentsAppendix }/
				${ params.document_id }`
			)
		}

		if (params['template_id']) {
			entityPromises[entityMap.template_id] = this._call.bind(null, "GET",
				`${ configs.get().envelopesUrl }/
				${ params.envelope_id }
				${ configs.get().documentsAppendix }/
				${ params.document_id }
				${ configs.get().templatesAppendix }/
				${ params.template_id }`
			)
		}
		//if (params['access_token']) {
		entityPromises[entityMap.access_token] = this._call.bind(null, "GET",
			`${ configs.get().userinfoUrl }`
		)
		//}
		return entityPromises
	}

	putTemplateData(data) {
		var templateUid = state.get().remoteEntities.template.uid;
		//TODO: SET contentType to reflect user's permissions
		return this._call("POST",`${templateUid}/user-data`, data)
	}
}

let helpers = new Helpers()
export default helpers
