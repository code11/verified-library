ajv = require("ajv");

const methods = {
	validate(role, schema){
		return new Promise((resolve, reject) => {
			ajv = new ajv();
			ajv.validate
			console.log("validate based on AJV")
		})
	}
}

module.exports = methods
