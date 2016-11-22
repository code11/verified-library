import actions from "./actions"
import { state } from "./state"

class Se {
	constructor(){
		this.actions = actions
		this.state = state
	}
	init(){ console.log("bankid SE init"); }
}

module.exports = new Se()
