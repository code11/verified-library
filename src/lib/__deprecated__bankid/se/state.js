class State {
	constructor(initialState){
		this.state = initialState || {}
	}
	get(){
		return { "test": "test "}
	}
}

export let state = new State()
