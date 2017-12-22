import {
	Observable
} from 'rxjs/Observable'

import 'rxjs/add/observable/of'
import 'rxjs/add/observable/throw'
import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/operator/delay'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/retry'


var state = VeLib.core.state
var configs = VeLib.core.configs
var callForData = VeLib.core.remote.callForData

// -----------------------------------------------
const retryCount = 10
const delayMs = 1000

export let PollerHelpers = {
	pollForCreation() {
		return new Promise( ( resolve, reject ) => {
			let getEnvelopeUrl = `${ configs.get().envelopesUrl }/${ state.get().params.envelope_id}`

			Observable.of("")
				.delay(delayMs)
				.flatMap( () => Observable.fromPromise( callForData({
					method: 'GET',
					url: `${ getEnvelopeUrl }`
				}) ) )
				.retry( retryCount )
				.subscribe(
					( envelope ) => resolve( envelope ),
					( err ) => {
						let _err = {
							msg: `server errors - max iterations reached - ${ err.msg }`,
							context: "Fetching POST-ed envelope failed",
							fatal: true,
							code: 2000
						}
						reject( _err )
						state.addError( _err )
					}
				)
		} )
	},

	pollForStatus( property ) {
		// Todo .. fix this part and make it work
		let error = null
		let flowUid = state.get().remoteEntities.descriptor.flow.id
		if ( !flowUid ) {
			error = {
				msg: `descriptor errors - flow uid missing`,
				context: "Settling flow uid for polling",
				fatal: true,
				code: 2001
			}
		}

		return new Promise( ( resolve, reject ) => {
			if ( error ) {
				reject( error )
			}

			let envelopeId = null

			if ( state.get().params.envelope_id) { envelopeId = state.get().params.envelope_id }
			else { envelopeId = state.get().remoteEntities.envelope.id }

			let getFlowUrl =
				`${ flowUid }${ configs.get().jobsAppendix}/${ envelopeId }`

			Observable.of("")
				.delay(delayMs)
				.flatMap( () => Observable.fromPromise( callForData({
					method: "GET",
					url: getFlowUrl
				}) ) )
				.flatMap( data => {
					if ( data[ property ] ) return Observable.of(data)
					else {
						throw({"msg":"server errors - max iterations reached"})
					}
				} )
				.retry( retryCount )
				.subscribe(
					(data) => { resolve( data[ property ] ) },
					(err) => {
						err.context = `Polling for property called ${ property }`
						err.fatal =  true
						err.code = 2002
						state.addError(err)
						reject(err)
					}
				)
		} )
	}
}
