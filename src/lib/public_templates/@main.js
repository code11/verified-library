import actions from "./actions"


class PublicTemplate {
	constructor(){
		this.actions = actions
	}
	init(){
		return {
			forwarded: helpers.shouldCreateContext()
		}
	}
}


var publicTemplate = new PublicTemplate()

Object.setPrototypeOf(publicTemplate, actions)

module.exports = publicTemplate
