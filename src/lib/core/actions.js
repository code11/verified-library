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
			return helpers.getRemoteEntitiesPromise()
				.then((remoteEntities)=>{
					state.merge({ remoteEntities: remoteEntities });
					return state.get();
				})
				.catch((error) => {
					console.error(error);
					throw error
				});

			// // This should solve only the remote entites calls
			// return new Promise((resolve, reject) => {
			// 	var entityPromises = helpers.getRemoteEntitiesPromise()
			// 	var remoteEntities = {}
			// 	var totalCallsToBeDone = Object.keys(entityPromises).length
			//
			// 	Object.keys(entityPromises).forEach((key) => {
			// 		entityPromises[key]().then((data) => {
			// 			remoteEntities[key] = data
			//
			// 			totalCallsToBeDone--;
			// 			if (totalCallsToBeDone === 0){
			// 				state.merge({ remoteEntities: remoteEntities });
			// 				resolve(state.get());
			// 			}
			// 		})
			// 		.catch((error) => {
			// 			let err = {
			// 				msg: `resource retrieval fail - ${ key }` ,
			// 				context: "Fetching params entities",
			// 				fatal: true,
			// 				code: 1000
			// 			}
			//
			// 			if (key === 'user' ) { err.code = 1001 }
			// 			state.addError(err)
			// 			console.error("FATAL:" + err.msg + " at " +err.context)
			// 			reject(err)
			// 		})
			// 	})
			// })
		})
	}

	//TODO These are for private only and they will need to be cleaned or put somewhere else i think
	putTemplateData(data){
		return helpers.putTemplateData(data)
	}

	getTemplateData(){
		var t = state.get().remoteEntities.template
		return Promise.resolve(t && t.userData || {})
	}
}

let actions = new Actions()
export default actions
