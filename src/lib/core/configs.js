export class Configs {

	constructor(domain){

		// Not used for now in 1.0.0.. could come in the future
		this.domain            =  this.domain || this.getDomain()
		// -----------------------------------------------
		this.apiBase           = "/api"
		// -----------------------------------------------

		this.documentsAppendix   = '/documents'
		this.templatesAppendix   = '/templates'
		this.userDataAppendix    = '/user-data'
		this.envelopesAppendix   = '/envelopes'
		this.descriptorsAppendix = '/envelope-descriptors'
		// For public templates use only
		this.publishAppendix     = '/publish-status'
		this.jobsAppendix        = '/jobs'
		this.recipientsAppendix  = '/recipients'

	}

	// Not used for now in 1.0.0.. could come in the future
	setDomain(domain){ this.domain = domain }
	getDomain() { return this.domain || "" }

	get(){
		return {
			descriptorUrl        : `${ this.domain }/envelope-descriptors`,
			envelopesUrl         : `${ this.domain }/envelopes`,
			userinfoUrl          : `${ this.domain }/auth/userinfo`,
			createEnvelopePrefix : `${ this.domain }/envelope-descriptors`,
			flowInfoUrl          : `${ this.domain }/flows`,
			domain               : this.domain,
			apiBase              : this.apiBase,
			documentsAppendix    : this.documentsAppendix,
			templatesAppendix    : this.templatesAppendix,
			userDataAppendix     : this.userDataAppendix,
			publishAppendix      : this.publishAppendix,
			jobsAppendix         : this.jobsAppendix,
			recipientsAppendix   : this.recipientsAppendix
			// Used for public only
		}
	}
}

let configs = new Configs()
export default configs
