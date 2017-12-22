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
				// Calling state.merge or state set....:), on behalf of the user

			resolve( state.get().templates )
			console.info("Managed to provide template interface")
		} )
	},

	buildDocumentsDescription() {
		console.info("Template interface to remote 1");
		let documents = []
		let templateInterfaces = state.get().templates
		var templateInterface = null
		
		console.info("Template interface to remote 2 with array of interfaces", templateInterfaces)

		for ( var i = 0; i < templateInterfaces.length; i++) {
			templateInterface = templateInterfaces[i];

			documents.push(
				Object.assign({},
					{
						descriptor: {
							hash: templateInterface.getInfo().hash
						},
						data: templateInterface.getData()
					},
					templateInterface.getCustom()
				)
			)

			console.info("Get custom returned", templateInterface.getCustom())
		}

		console.info("Template interface to remote 3", templateInterfaces, documents)

		return { documents }
	}
}
