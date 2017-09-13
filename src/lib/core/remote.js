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
		disableToken,
		credentials = 'same-origin'
	}) {
		if ( state.get( ).internal.companyUid )
			headers["x-namespace"] = state.get( ).internal.companyUid;

		if ( !headers["content-type"] && body )
			headers["content-type"] = 'application/json';

		if (!headers["accept"])
			headers["accept"] = "application/json";

		var token = null;

		if (( token = state.get( ).internal.accessToken ) && !disableToken) {
			headers.authorization = "JWT " + token;
		}

		if ( overwriteToken ) {
			headers.authorization = "JWT " + token;
		}
		if (!credentials) {}

		return axios({
			url: `${ configs.apiBase }${ url }`,
			method: method || "GET",
			headers: headers,
			data: body,
			withCredentials: credentials,
			params: params
		})
	}
}

let remote = new Remote( )

let expose = {
	callAndReturnLocation: ({ method, url, body, params, overwriteToken }) => {

		return remote._call({
			method: method,
			url: url,
			body: body,
			params: params,
			credentials: false
		})
		.then(response => response.headers['location'])

	},
	callForData: ( opts ) => {
		console.info("calling for data , with options", opts)
		return remote._call( opts ).then( ( response ) => response.data )
	},
	callRaw: ( opts ) => {
		return remote._call( opts )
	}
}

export default expose
