import configs from './configs'
import state from './state'
import helpers from './helpers'
import parsers from "./parsers"
import identity from "./identity"

const defaultOwnerRole = {
	label: 'roles',
	name: 'owner'
}

class Actions {
	constructor( ) {}
	init({ descriptor_id, initialState }) {

		if ( initialState )
			state.merge( {}, initialState )

		const qParams = parsers.getQueryParams({ descriptor_id });

		state.merge({ params: qParams });

		return identity
			.set( qParams )
			.then(( ) => helpers.getRemoteEntitiesPromise( ).then(( remoteEntities ) => {
				state.merge({ remoteEntities });
				return state.get( )
			}).catch(( error ) => {
				console.error( error )
				throw error
			}))
	}

	// TODO refactor this so it filters out roles i'm not interested in...only
	// looking for descriptor template roles

	getMyRoles( ) {
		if ( state.get( ).remoteEntities.user && state.get( ).remoteEntities.user.roles )
			return state.get( ).remoteEntities.user.roles
		else {
			console.warn( "No role found in token, assumed i'm the owner" )
			return [ defaultOwnerRole ]
		}
	}
}
let actions = new Actions( )
export default actions
