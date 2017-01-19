var callForData = VeLib.core.helpers._call

import {
	configs
} from "./configs"

// TODO Change this reg number here to whatever the endpoint is
class Actions {
	constructor() {}
	getCompanyInfo( regNumber ) {
		return callForData( "GET",
			`${ configs.get().idrightsUrl }${ regNumber }`
		)
	}
}

module.exports = new Actions()
