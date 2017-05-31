import { configs } from './configs';
import { state } from './state';
import helpers from './helpers';

class Actions {
	constructor(){}

	init(domain, descriptor_id){
		domain && domain.length && configs.setDomain(domain)
		var qParams = helpers.getQueryParams();
		if(descriptor_id && !qParams.descriptor_id)
			qParams.descriptor_id = descriptor_id;

		state.merge({ params: qParams });

		return helpers.setToken(qParams)
		.then(() => {
			// This should solve only the remote entites calls
			return new Promise((resolve, reject) => {
				var entityPromises = helpers.getRemoteEntitiesPromise()
				var remoteEntities = {}
				var totalCallsToBeDone = Object.keys(entityPromises).length

				Object.keys(entityPromises).forEach((key) => {
					entityPromises[key]().then((data) => {
						remoteEntities[key] = data

						totalCallsToBeDone--;
						if (totalCallsToBeDone === 0){
							state.merge({ remoteEntities: remoteEntities });
							resolve(state.get());
						}
					})
					.catch((error) => {
						let err = {
							msg: `resource retrieval fail - ${ key }` ,
							context: "Fetching params entities",
							fatal: true,
							code: 1000
						}

						if (key === 'user' ) { err.code = 1001 }
						state.addError(err)
						console.error("FATAL:" + err.msg + " at " +err.context)
						state.addError(err);
						reject(err)
					})
				})
			})
		})
	}

	//TODO These are for private only and they will need to be cleaned or put somewhere else i think
	putTemplateData(data){
		var params = state.get().params
		return helpers._call("POST",
			`${ configs.get().envelopesUrl }/
			${ params.envelope_id }
			${ configs.get().documentsAppendix }/
			${ params.document_id }
			${ configs.get().templatesAppendix }/
			${ params.template_id }
			${ configs.get().userDataAppendix }`
		, data)
	}

	getTemplateData(){
		var t = state.get().remoteEntities.template
		if (t) {
			return new Promise((resolve, reject) => {
				if (t.hasOwnProperty('userData')) { resolve(t.userData) }
				else resolve({})
			})
		}
		else return helpers._call("GET",
			`${ configs.get().envelopesUrl }/
			${ params.envelope_id }
			${ configs.get().documentsAppendix }/
			${ params.document_id }
			${ configs.get().templatesAppendix }/
			${ params.template_id }`
		).then((t) => t.userData || {})
	}
}

let actions = new Actions()
export default actions
