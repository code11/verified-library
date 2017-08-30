import configs from './configs'
import state from './state'
import helpers from './helpers'
import parsers from "./parsers"
import identity from "./identity"
import remote from "./remote"

const defaultOwnerRole = {
	label: 'roles',
	name: '/roles/owner'
}

class Actions {
	constructor() {}
	init( { descriptor_id, initialState } ) {

		if ( initialState )
			state.merge( {}, initialState )

		const qParams = parsers.getQueryParams( { descriptor_id } );

		state.merge( { params: qParams } );

		return identity
			.set( qParams )
			.then( () => helpers.getRemoteEntitiesPromise()
				.then( ( remoteEntities ) => {
					state.merge( { remoteEntities } );
					return state.get()
				} )
				.catch( ( error ) => {
					console.error( error )
					throw error
				} ) )
	}

	// TODO refactor this so it filters out roles i'm not interested in...only looking for descriptor template roles

	getMyRoles() {

		let roles = [ defaultOwnerRole ]
		let tokenRoles = null

		if ( state.get()
			.remoteEntities.user && state.get()
			.remoteEntities.user.roles ) {
			tokenRoles = state
				.get()
				.remoteEntities
				.user
				.roles
			tokenRoles = tokenRoles.filter( ( role ) => ( role.label === 'roles' || role.label === 'descriptors' ) )
		}

		if ( tokenRoles && tokenRoles.length ) {
			roles = tokenRoles
		}

		return roles
	}

	runFlowTask( { taskName , body } ) {
		if ( taskName ) taskName = '/' + taskName

		let { envelope_id } = state.get().remoteEntities.envelope.id

		return remote.callForData( {
				method: "POST",
				url: `${ configs.get( ).envelopesAppendix }/${ envelope_id }${ configs.get().jobsAppendix }${ taskName }`,
				body: body
			})
	}

}
let actions = new Actions()
export default actions
