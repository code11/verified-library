var callForData = VeLib.core.remote.callForData

import {
	configs
} from "./configs"

class Actions {
	constructor() {}

	getCompanyInfo( regNumber ) {
		return callForData( {
			method: "GET",
			url: `${ configs.get().bisnodeUrl }${ configs.get().companySuffix }?regNumber=${ regNumber }`
		} )
	}

	getPersonInfo( ssn ) {
		return callForData( {
			method: "GET",
			url: `${ configs.get().bisnodeUrl }${ configs.get().personSuffix }?personNumber=${ ssn }`
		} )
	}

	getNorwayCompany( regNumber ) {
		return callForData( {
			method: "GET",
			url: `${ configs.get().bisnodeUrl }${ configs.get().norwayCompanySuffix }?regNumber=${ regNumber }`
		} )
	}
}

module.exports = new Actions()
