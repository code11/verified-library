const qs      = require("query-string");
const state   = require("./state");
const configs = require("./configs");
const namings = require("./namings").entityMap;

const methods = {
	getQueryParams() { return qs.parse(location.search)},
	_call(method, url, _body){
		if (!_body) { _body = null } else { _body = JSON.stringify(_body) }
		return fetch(url, {
			method: method,
			headers: new Headers({
				"Authorization": "JWT " + state.get().internal.accessToken,
				"Content-Type": "application/json"
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
	},
	setToken(qParams){
		return new Promise((resolve, reject) => {
			if (qParams.access_token){
				state.merge({ internal: {accessToken: qParams.access_token }})
				resolve(qParams.access_token);
			} else reject("no token found in query params");
		})
	},
	getRemoteEntitiesPromise() {
		var entityPromises = {}
		var params = state.get().params;

		if (params['descriptor_id']) {
			entityPromises[namings.descriptor_id] = this._call.bind(null , "GET",
			`${ configs.descriptorUrl }/
			${ params.descriptor_id }`
			)
		}

		if (params['envelope_id']) {
			entityPromises[namings.envelope_id] = this._call.bind(null, "GET",
				`${ configs.envelopesUrl }/
				${ params.envelope_id }`
			)
		}

		if (params['document_id']) {
			entityPromises[namings.document_id] = this._call.bind(null, "GET",
				`${ configs.envelopesUrl }/
				${ params.envelope_id }
				${ configs.documentsAppendix }/
				${ params.document_id }`
			)
		}

		if (params['template_id']) {
			entityPromises[namings.template_id] = this._call.bind(null, "GET",
				`${ configs.envelopesUrl }/
				${ params.envelope_id }
				${ configs.documentsAppendix }/
				${ params.document_id }
				${ configs.templatesAppendix }/
				${ params.template_id }`
			)
		}
		if (params['access_token']) {
			entityPromises[namings.access_token] = this._call.bind(null, "GET",
				`${ configs.userinfoUrl }`
			)
		}
		// This should return an array of calls that have to be made, along with their corresponding state key
		return entityPromises
	}
}

module.exports = methods
