var call = VeLib.core.helpers._call
const qs = require("query-string")

class Actions {
	constructor() {
		this.baseUrl = `/api/honcho/flows/${ this.flowId }/sessions`
	}
	init(){
		// Some flow id here ?? maybe?
	}
	openIframe(autoStartToken) {
		return new Promise((resolve, reject) => {

			console.log("Starting iframe with autoStartToken", autoStartToken)

			frm = document.createElement("iframe")

			frm.setAttribute("src",
				"bankid:///?autostarttoken=#{autoStartToken}&redirect=null")

			frm.setAttribute("width", 0)

			frm.setAttribute("height", 0)

			frm.setAttribute("id", "i" + Math.random())

			frm.setAttribute("style", "border:0px;")

			frm.onload = () => {
				resolve()
				console.log("BankId Iframe Loaded")
			}
			frm.onerror = (err) => reject(err)

			document.body.appendChild(frm)
		})
	}
	createSignSession(dUid, recipientId, personalNumber){
		if (!dUid || !recipientId || !personalNumber) throw new Error({msg: "One or more missing parameters"})
		var params = { personalNumber: personalNumber }
		return call("GET",`${ dUid }/signatories/#{signatoryId}/sign-session`, {}, params)
	}
}

module.exports = new Actions()
