var callForData = VeLib.core.helpers._call

import {
	configs
} from "./configs"

class Actions {
	constructor() {}
	getCompanyInfo( regNumber ) {
		return callForData( "GET",
			`${ configs.get().bisnodeUrl }
		${ configs.get().companySuffix }?regNumber=${ regNumber }`
		)
	}

	getPersonInfo( ssn ) {
		return callForData( "GET",
			`${ configs.get().bisnodeUrl }
		${ configs.get().personSuffix }?personNumber=${ ssn }`
		)
	}
}

module.exports = new Actions()
