var helpers = require("./helpers");
var state = require("./state");
var configs = require("./configs");

var methods =  {
	init: (domain) => {

		// TODO SET DOMAIN after setting up please....
		// if (domain && domain.length){ configs.setDomain(domain) }

		var qParams = helpers.getQueryParams();
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
				})
			})
		})
	},
	putTemplateData: (data) => {
		var params = state.get().params
		return helpers._call("POST",
			`${ configs.envelopesUrl }/
			${ params.envelope_id }
			${ configs.documentsAppendix }/
			${ params.document_id }
			${ configs.templatesAppendix }/
			${ params.template_id }
			${ configs.userDataAppendix }`
		, data)
	},
	getTemplateData: () => {
		var t = state.get().remoteEntities.template
		if (t) {
			return new Promise((resolve, reject) => {
				if (t.hasOwnProperty('userData')) { resolve(t.userData) }
				else resolve({})
			})
		}
		else return helpers._call("GET",
			`${ configs.envelopesUrl }/
			${ params.envelope_id }
			${ configs.documentsAppendix }/
			${ params.document_id }
			${ configs.templatesAppendix }/
			${ params.template_id }`
		).then((t) => t.userData || {})
	}
}

module.exports = methods
