var callForData = VeLib.core.helpers._call
var state = VeLib.core.state

import {
	Observable
} from 'rxjs/Observable'



import 'rxjs/add/observable/of'
import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/observable/interval'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/retry'


import {
	configs
} from "./configs"

const pollIterationCount = 9

class Actions {
	constructor() {}
	getCompanyAuthorities(regNumber) {
		return new Promise(function(resolve, reject) {
			Observable.interval(1000)
			.flatMap(() => Observable.fromPromise(callForData("GET",
				`${ configs.get().idrightsUrl }${ regNumber }`
			)))
			.retry(pollIterationCount)
			.subscribe(
				function (data){
					if (!Object.keys(data).length){
						let _err = {
							msg: `data errors  - not found` ,
							context: "Fetching id-rights entities",
							fatal: false,
							code: 3000
						}
						reject(_err)
						state.addError(_err)
					}
					else resolve(data)
				},
				function (err){
					let _err = {
						msg: `server errors  - max iterations reached - ${ err.msg }` ,
						context: "Fetching id-rights entities",
						fatal: true,
						code: 3001
					}
					reject(_err)
					state.addError(_err)
				}
			)
		})
	}
}

module.exports = new Actions()
