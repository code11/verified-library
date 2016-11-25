import { Observable } from 'rxjs/Rx'
import _ from "lodash"
import { Template } from "./Template"

var state = VeLib.core.state
var call = VeLib.core.helpers._call

class Helpers {
	constructor(){}
	createEnvelopeContext(){
		// This should also include a poller maybe, with rxJS retry
		return new Promise((resolve, reject) => { resolve({"status":"Created envelope context"}) })
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
		for (templateInterface in arrayOfInterfaces) {
			remoteObject[templateInterface.info.descriptors] = remoteObject[templateInterface.info.descriptors] || []
			remoteObject[templateInterface.info.descriptors].push({ data: templateInterface.getData() })
		}
	}

}

let helpers = new Helpers()
export default helpers
