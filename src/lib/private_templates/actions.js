const call = VeLib.core.remote.callForData
let configs = VeLib.core.configs.get( )

class Actions {
	constructor( ) {}

	putTemplateData( data ) {
		var templateUid = state.get( ).remoteEntities.template.uid;
		//TODO: SET contentType to reflect user's permissions
		return call({ method: "POST", url: `${ templateUid }${ configs.userDataAppendix }` })
	}

	getTemplateData( ) {
		var t = state.get( ).remoteEntities.template

		if ( t && t.userData )
			return Promise.resolve( t.userData )
		else
			return Promise.resolve({ })
	}
}
let actions = new Actions( )
export default actions
