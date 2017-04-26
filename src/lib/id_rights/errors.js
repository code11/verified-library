module.exports = {
	notFound: ( serverMessage = "" ) => {
		return {
			msg      : `company not found`,
			context  : "Fetching id-rights entities",
			serverMsg: serverMessage,
			fatal    : true,
			code     : "7fbf51fc-cfa7-40df-9cdf-5b48e790231e"
		}
	},
	maxIterations: ( serverMessage = "" ) => {
		return {
			msg      : `max iterations reached`,
			context  : "Fetching id-rights entities",
			serverMsg: serverMessage,
			fatal    : true,
			code     : "1f02b648-532b-4a27-b7ad-c8498460dbd9"

		}
	},
	emptyData: ( serverMessage = "" ) => {
		return {
			msg      : `server returned empty data`,
			context  : "Fetching id-rights entities",
			serverMsg: serverMessage,
			fatal    : true,
			code     : "a5c29c55-f64c-4838-ba1d-c119862c4fe3"
		}
	}
}
