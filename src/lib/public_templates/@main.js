import actions from "./actions"

class PublicTemplate {
	constructor(){
		this.actions = actions
	}
}

var publicTemplate = new PublicTemplate()
Object.setPrototypeOf(publicTemplate, actions)
module.exports = publicTemplate
