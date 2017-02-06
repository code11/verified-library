import _ from "lodash/util"
import {
	Template
} from "../Template"

var state       = VeLib.core.state

// -----------------------------------------------
export let TemplateHelpers = {
	getTemplateObjectsArrayInterface() {
		return new Promise( ( resolve, reject ) => {
			let descriptorDocuments = null
				// Making sure that property exists
			try {
				descriptorDocuments = state.get().remoteEntities.descriptor.documents
			} catch ( exception ) {
				let error = {
					msg: "No documents found in descriptor or descriptor entity is missing",
					err: exception,
					context: "Descriptor retrieval in public template",
					fatal: true
				}
				state.addError(error)
				console.error("Fatal: " + error.msg + " at " + error.context)
				reject( error )
			}
			// making sure descriptor has at least one doc of type template
			let templatesDescriptors = []
			templatesDescriptors = descriptorDocuments.filter( ( docDescription ) => {
				return ( docDescription.type === 'template' )
			} )

			if ( !templatesDescriptors.length ) {
				let error = {
					msg: "No template type descriptor found "
				}
				throw ( error ) && reject( error )
			}
			// Creating a set of all descriptors for found templates
			let arrayOfInterfaces = []

			templatesDescriptors.forEach( ( templateDescriptor ) => {
				_.times( templateDescriptor.numMax, () => {
					arrayOfInterfaces.push( new Template( templateDescriptor ) )
				} )
			} )

			state.merge( {
					templates: arrayOfInterfaces
				} )
				// Caution dragons AHEAD!!! Interface of templates should provide state mutating changes without
				// calling state.merge or state set....:), on behalf of the user
			resolve( state.get().templates )
			console.info("Managed to provide template interface")
		} )
	},

	templateInterfaceToRemote() {
		console.info("Template interface to remote 1");
		let remoteObject = {}
		let arrayOfInterfaces = state.get().templates
		var templateInterface = null
		console.info("Template interface to remote 2 with array of interfaces", arrayOfInterfaces)

		for ( var i = 0; i < arrayOfInterfaces.length; i++) {
			templateInterface = arrayOfInterfaces[i];
			remoteObject[ templateInterface.getInfo().hash ] = remoteObject[ templateInterface.getInfo().hash ] ||
				[]
			remoteObject[ templateInterface.getInfo().hash ].push( {
				data: templateInterface.getData()
			} )
		}

		console.info("Template interface to remote 3")

		return {
			"documents": remoteObject
		}
	}

}
