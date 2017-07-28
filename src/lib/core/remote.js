import state from "./state";
import axios from "axios";

const qs = require( "query-string" )
import configs from "./configs"

class Remote {
	constructor( ) {}

	_call({
		method,
		url,
		body,
		params = {},
		headers = {},
		overwriteToken,
		credentials = true
	}) {
		if ( state.get( ).internal.companyUid )
			headers["x-namespace"] = state.get( ).internal.companyUid;

		if ( !headers["content-type"] && body )
			headers["content-type"] = 'application/json';

		if (!headers["accept"])
			headers["accept"] = "application/json";

		var token,
			params = "?";

		if (( token = state.get( ).internal.accessToken )) {
			headers.authorization = "JWT " + token;
		}

		if ( overwriteToken ) {
			headers.authorization = "JWT " + token;
		}
		if (!credentials) {}

		return axios({
			url: `${ configs.apiBase }${ url }`,
			method: method,
			headers: headers,
			data: body,
			withCredentials: credentials,
			params: params
		})
	}

	callAndReturnLocation({ method, url, body, params, overwriteToken }) {

		return _this.call({
			method: method,
			url: url,
			body: body,
			params: params,
			credentials: false
		})
		.then(response => response.headers.get( 'location' ))

	}

	callForData( opts ) {
		return this._call( opts ).then( ( response ) => response.data )
	}

	call( opts ) {
		return this._call( opts )
	}

}

let remote = new Remote( )
export default remote
