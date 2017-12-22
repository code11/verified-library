var coreConfigs = VeLib.core.configs

export class Configs {
	get(){
		return {
			companySuffix: '/company',
			personSuffix: '/person',
			norwayCompanySuffix: '/norway-company',
			bisnodeUrl : '/bisnode'
		}
	}
}

export let configs = new Configs()
