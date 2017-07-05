const state = VeLib.core.state

// -----------------------------------------------

export let RequestHelpers = {
	callAndReturnLocation( method, url, _body, _params, overwriteToken) {
		if ( !_body ) {
			_body = null
		} else {
			_body = JSON.stringify( _body )
		}

		const tkn = overwriteToken || state.get().internal.accessToken;
		const cUid = state.get().internal.companyUid

		const headers = {
			"Content-Type": "application/json"
		}

		if (cUid) headers['x-namespace'] = cUid
		if (tkn) headers.authorization = "JWT "+tkn;

		var params = "?";
		if ( _params ) {
			params += qs.stringify( params )
		} else params = ""

		return fetch( url + params, {
			method: method,
			headers: new Headers(headers),
			credentials: 'same-origin',
			body: _body
		} ).then( response => {
			if ( Number( response.status ) > 399 && response.headers && response.headers.location ) {
				throw new Error( {
					msg: "Error",
					status: status,
					response: response
				} )
			} else return response.headers.get( 'location' )
		} )
	}
}
