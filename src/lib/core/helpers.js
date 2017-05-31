const qs = require("query-string");
import { entityMap } from "./namings"

import { configs } from "./configs";
import { state } from "./state";
import axios from "axios";

class Helpers {
	constructor(){}
	getQueryParams() { return qs.parse(location.search)}

	_call(method, url, _body, _params){
		if (!_body) { _body = null } else { _body = JSON.stringify(_body) }
		var token, params = "?"
		if (_params) { params += qs.stringify(params)} else params = ""

		var headers = {
			"Content-Type" : "application/json",
			"x-namespace": state.get().internal.companyUid,
		};

		if((token=state.get().internal.accessToken)) {
			headers.authorization = "JWT " + token;
		}

		return axios({
			url: url + params,
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
			if (!qParams.access_token){
				console.warn("Missing access_token parameter, will try to use the locally stored one, if any.");
			}
			state.merge({ internal: data });
			resolve(qParams.access_token);
		})
	}

	getRemoteEntitiesPromise() {
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
