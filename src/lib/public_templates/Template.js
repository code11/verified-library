/// Template is a helper class which provides an interface to send data
/// per that specific template to the api. This is exposed to the user

var _call = VeLib.core.helpers._call

class Template {
	constructor(info){
		this.data = {}
		this.info = info
	}
	getInfo(){ return this.info }
	getData(){ return this.data }
	setData(data){ this.data = data }
}

module.exports = { Template: Template }
