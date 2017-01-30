var state = VeLib.core.state

// -----------------------------------------------

export let RequestHelpers = {
	callAndReturnLocation( method, url, _body, _params, overwriteToken) {
		if ( !_body ) {
			_body = null
		} else {
			_body = JSON.stringify( _body )
		}

		var tkn = overwriteToken
		if (overwriteToken) { tkn = "JWT " + overwriteToken }

		var params = "?"
		if ( _params ) {
			params += qs.stringify( params )
		} else params = ""

		return fetch( url + params, {
			method: method,
			headers: new Headers( {
				"Authorization": tkn || ("JWT " + state.get().internal.accessToken),
				"Content-Type": "application/json"
			} ),
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
