const domain = "",
	  apiBase = "/api-v2",
	  apiBaseAuth = "/api"

var config = {
	descriptorUrl    : `${ domain }${ apiBase }/envelope-descriptors`,
	envelopesUrl     : `${ domain }${ apiBase }/envelopes`,
	userinfoUrl		 : `${ domain }${ apiBaseAuth }/auth/userinfo`,
	documentsAppendix: '/documents',
	templatesAppendix: '/templates',
	userDataAppendix : '/user-data',
	bankId: {
		"baseUrl": "http://nothingfornow.com"
	}
	// definition_id: null, //58244bd7069a89001226e102
	// data_endpoint: null, // /envelopes/58249226c934690014cef799/documents/58249227c934690014cef79b/templates
}

module.exports = config
