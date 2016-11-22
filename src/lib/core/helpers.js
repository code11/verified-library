const qs = require("query-string");
import { entityMap } from "./namings"

import { configs } from "./configs";
import { state } from "./state";

class Helpers {
	constructor(){}
	getQueryParams() { return qs.parse(location.search)}

	_call(method, url, _body, _params){
		if (!_body) { _body = null } else { _body = JSON.stringify(_body) }
		var params = "?"
		if (_params) { params += qs.stringify(params)} else params = ""

		return fetch(url + params , {
			method: method,
			headers: new Headers({
				"Authorization": "JWT " + state.get().internal.accessToken,
				"Content-Type" : "application/json"
			}),
			body: _body
		}).then(function(response) {
			if (Number(response.status) > 399 ){
				throw new Error({msg: "Error", status: status, response: response})
			}
			else return response.json()
			.then((json) => json)
			.catch(() => response.text)
		})
	}

	setToken(qParams){
		return new Promise((resolve, reject) => {
			if (qParams.access_token){
				state.merge({ internal: {accessToken: qParams.access_token }})
				resolve(qParams.access_token);
			} else reject("no token found in query params");
		})
	}

	getRemoteEntitiesPromise() {
		console.log(configs, "At this stage....")
		var entityPromises = {}
		var params = state.get().params;

		if (params['descriptor_id']) {
			entityPromises[entityMap.descriptor_id] = this._call.bind(null , "GET",
			`${ configs.get().descriptorUrl }/
			${ params.descriptor_id }`
			)
		}

		if (params['envelope_id']) {
			entityPromises[entityMap.envelope_id] = this._call.bind(null, "GET",
				`${ configs.get().envelopesUrl }/
				${ params.envelope_id }`
			)
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
		if (params['access_token']) {
			entityPromises[entityMap.access_token] = this._call.bind(null, "GET",
				`${ configs.get().userinfoUrl }`
			)
		}
		return entityPromises
	}
}

let helpers = new Helpers()
export default helpers
