var coreConfigs = VeLib.core.configs

export class Configs {
	get(){
		return {
			// TODO need to update this after i know the url
			// companySuffix: '/company',
			idrightsUrl : `${ coreConfigs.domain }${ coreConfigs.apiBase }/signing-procuration/`,
		}
	}
}

export let configs = new Configs()
