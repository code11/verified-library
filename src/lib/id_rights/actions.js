var callForData = VeLib.core.helpers._call

import {
	Observable
} from 'rxjs/Observable'

import 'rxjs/add/observable/of'
import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/operator/delay'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/retry'


import {
	configs
} from "./configs"

// TODO Change this reg number here to whatever the endpoint is
class Actions {
	constructor() {}
	getCompanyAuthorities(regNumber) {
		return new Promise(function(resolve, reject) {
			Observable.of("")
			.delay(1000)
			.flatMap(() => Observable.fromPromise(callForData("GET",
				`${ configs.get().idrightsUrl }${ regNumber }`
			)))
			.retry()
			.subscribe(data => resolve(data))
		})
	}
}

module.exports = new Actions()
