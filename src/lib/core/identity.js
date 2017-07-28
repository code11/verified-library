const _ = require( "lodash/object" )
import state from './state'

class Identity {
	constructor( ) {}

	set({ access_token, c }) {

		let data = _.merge({}, { accessToken: access_token })
		if (c) data.companyUid = "/companies/" + c

		return new Promise(( resolve, reject ) => {

			if ( !data.accessToken ) {
				console.warn( "Missing access_token parameter, will try to use the localstorage one, if any." );

				try {
					data.accessToken = localStorage.getItem( "accessToken" );
				} catch ( e ) {}
			}

			if ( !data.accessToken ) {
				console.warn( "Missing access_token parameter, will try to use the cookie stored one, if any." );
			}

			state.merge({ internal: data });

			resolve(data);
		})
	}

}

let identity = new Identity( )
export default identity
