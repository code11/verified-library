export class Configs {

	constructor(domain){
		this.domain            =  this.domain || this.getDomain()
		// -----------------------------------------------
		this.apiBase           = "/api-v2",
		this.apiBaseAuth       = "/api"
		// -----------------------------------------------

		this.documentsAppendix = '/documents',
		this.templatesAppendix = '/templates',
		this.userDataAppendix  = '/user-data'
		this.envelopesAppendix =  '/envelopes',
		this.descriptorsAppendix = '/envelope-descriptors'

	}
	setDomain(domain){ this.domain = domain }
	getDomain() { return this.domain || "" }

	get(){
		return {
			descriptorUrl        : `${ this.domain }${ this.apiBase }/envelope-descriptors`,
			envelopesUrl         : `${ this.domain }${ this.apiBase }/envelopes`,
			userinfoUrl          : `${ this.domain }${ this.apiBaseAuth }/auth/userinfo`,
			createEnvelopePrefix : `${ this.domain }${ this.apiBase }/envelope-descriptors`,
			domain               : this.domain,
			apiBase              : this.apiBase,
			apiBaseAuth          : this.apiBaseAuth,
			documentsAppendix    : this.documentsAppendix,
			templatesAppendix    : this.templatesAppendix,
			userDataAppendix     : this.userDataAppendix
		}
	}
}

export let configs = new Configs()
