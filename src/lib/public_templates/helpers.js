import { Observable } from 'rxjs/Rx'
import _ from "lodash"
import { Template } from "./Template"

var state = VeLib.core.state
var configs = VeLib.core.configs

class Helpers {
	constructor(){}

	// THis one here is for location headers parse....
	_call(method, url, _body, _params){
		if (!_body) { _body = null } else { _body = JSON.stringify(_body) }
		var params = "?"
		if (_params) { params += qs.stringify(params)} else params = ""

		return fetch(url + params , {
			method: method,
			headers: new Headers({
				"Authorization": "JWT " + state.get().internal.accessToken,
				"Content-Type" : "application/json"
			}),
			body: _body
		}).then(function(response) {
			if (Number(response.status) > 399 && response.headers && response.headers.location){
				throw new Error({msg: "Error", status: status, response: response})
			}
			else return response.headers.get('location')
		})
	}

	createEnvelopeContext(remoteReadyDocuments){
		var endpoint = `${ configs.get().createEnvelopePrefix }/${ state.get().params.descriptor_id }/envelopes`
		return this._call("POST", `${ endpoint }`, remoteReadyDocuments)
		.then((location) => {
			let envelopeId = location.split(`${ configs.envelopesAppendix }/`)[1]
			var mergeObj = {
				params: {
					envelope_id: envelopeId
				}
			}
			state.merge(mergeObj)
			console.log(state.get(), "new state");

		})
	}

	storeEnvelopeContext(){

	}

	getTemplateObjectsArrayInterface(){
		return new Promise((resolve, reject) => {
			let descriptorDocuments = null
			// Making sure that property exists
			try { descriptorDocuments = state.get().remoteEntities.descriptor.documents }
			catch (exception) {
				let error = {
					msg: "No documents found in descriptor or descriptor entity is missing",
					err: exception
				}
				throw(error) && reject(error)
			}
			// making sure descriptor has at least one doc of type template
			let templatesDescriptors = []
			templatesDescriptors = descriptorDocuments.filter((docDescription) => {
				return (docDescription.type === 'template')
			})

			if (!templatesDescriptors.length) {
				let error = {
					msg: "No template type descriptor found "
				}
				throw(error) && reject(error)
			}
			// Creating a set of all descriptors for found templates
			let arrayOfInterfaces = []

			templatesDescriptors.forEach((templateDescriptor) => {
				_.times(templateDescriptor.numMax, () => {
					arrayOfInterfaces.push(new Template(templateDescriptor))
				})
			})

			state.merge({ templates: arrayOfInterfaces })
			// Caution dragons AHEAD!!! Interface of templates should provide state mutating changes without
			// calling state.merge or state set....:), on behalf of the user

			resolve(state.get().templates)
		})
	}
	templateInterfaceToRemote(){
		let remoteObject      = {}
		let arrayOfInterfaces = state.get().templates
		for (let templateInterface of arrayOfInterfaces) {
			remoteObject[templateInterface.getInfo().descriptor] = remoteObject[templateInterface.getInfo().descriptor] || []
			remoteObject[templateInterface.getInfo().descriptor].push({ data: templateInterface.getData() })
		}
		return { "documents": remoteObject }
	}

}

let helpers = new Helpers()
export default helpers
