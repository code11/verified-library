var coreConfigs = VeLib.core.configs

console.log("core configs are", coreConfigs)

export class Configs {
	get(){
		return {
			companySuffix: '/company',
			bisnodeUrl : `${ coreConfigs.domain }${ coreConfigs.apiBase }/bisnode`,
		}
	}
}

export let configs = new Configs()
