var coreConfigs = VeLib.core.configs

export class Configs {
	get(){
		return {
			companySuffix: '/company',
			personSuffix: '/person',
			bisnodeUrl : `${ coreConfigs.domain }${ coreConfigs.apiBase }/bisnode`
		}
	}
}

export let configs = new Configs()
