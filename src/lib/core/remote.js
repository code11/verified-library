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
		headers = {}
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

		return axios({
			url: `${ configs.apiBase }${ url }`,
			method: method,
			headers: headers,
			data: _body,
			params: params
		})
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
