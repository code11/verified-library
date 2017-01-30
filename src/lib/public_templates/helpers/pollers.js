import { Observable } from 'rxjs/Observable'

import 'rxjs/add/observable/of'
import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/operator/delay'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/retry'


var state       = VeLib.core.state
var configs     = VeLib.core.configs
var callForData = VeLib.core.helpers._call

// -----------------------------------------------

export let PollerHelpers = {
	pollForCreation() {
		return new Promise( ( resolve, reject ) => {
			let getEnvelopeUrl = `${ configs.get().envelopesUrl }/${ state.get().params.envelope_id}`

			Observable.of( "" )
				.delay( 1000 )
				.flatMap( () => Observable.fromPromise( callForData( 'GET', `${ getEnvelopeUrl }` ) ) )
				.retry()
				.subscribe( x => resolve( x ) )
		} )
	},

	pollForStatus(property) {
		// Todo .. fix this part and make it work
		let error = null
		let flowUid = state.get().remoteEntities.descriptor.flow.id
		if ( !flowUid ) {
			error = {
				msg: "FATAL: Flow uid not found , not possible to poll for changes "
			}
		}
		return new Promise( ( resolve, reject ) => {
			if ( error ) {
				reject( error )
			}

			let getFlowUrl =
				`${ configs.get().apiBaseAndDomain }${ flowUid }${ configs.get().jobsAppendix}/${ state.get().params.envelope_id }`

			Observable.of( "" )
				.delay( 1000 )
				.flatMap( () => Observable.fromPromise( callForData( "GET", getFlowUrl ) ) )
				.map( data => {
					if ( data[property] ) return data
					else return Rx.Observable.throw( new Error( {
						msg: "No matching property found yet, attemptying to retry"
					} ) )
				} )
				.retry()
				.subscribe( data => resolve( data[property] ) )
		} )
	}
}
