var callForData = VeLib.core.helpers._call
var state = VeLib.core.state

import {
	Observable
} from 'rxjs/Observable'



import 'rxjs/add/observable/of'
import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/operator/delay'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/retryWhen'
import 'rxjs/add/operator/scan'


import {
	configs
} from "./configs"

import errorList from "./errors.js"

const pollIterationCount = 9
const pollIntervalMs = 1000

class Actions {
	constructor() {}
	getCompanyAuthorities(regNumber) {
		return new Promise(function(resolve, reject) {
			Observable.of("")
			.delay(pollIntervalMs)
			.flatMap(() => Observable.fromPromise(callForData("GET", `${ configs.get().idrightsUrl }${ regNumber }`)))
			// Retry only if it doesn't throw a straight 404
			.retryWhen((errors) => {
				return errors.scan(function(errorCount, err) {
					if (err.response.status == 404 || err.response.status == 500){
						throw errorList.notFound(err.msg);
					}
					else if(errorCount >= pollIterationCount) {
						throw errorList.maxIterations(err.msg);
					}
					return errorCount + 1;
				}, 0);
			})
			.subscribe(
				// If contains data data key we resolve
				function (data){
					if (!Object.keys(data).length){
						reject(errorList.emptyData())
						state.addError(errorList.emptyData())
					}
					else resolve(data)
				},
				// We catch previously baked error in retryWhen and reject promise, and we add to state

				function (bakedError){
					reject(bakedError)
					state.addError(bakedError)
				}
			)
		})
	}
}

module.exports = new Actions()
