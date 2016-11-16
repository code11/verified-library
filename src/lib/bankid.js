var configs = require("./configs");
var bankIdConfigs = configs.bankId;

var methods = {
	openOnElement(el) {
		return new Promise((resolve, reject) => {
			if (!el) {
				reject("This function needs a DOM element to be passed as params so an i-frame can be opened")
			} else {
				var iframeSrc = `${ bankIdConfigs.fullUrl }`;
				elem.innerHtml = `<iframe src=${ iframeSrc }></iframe>`;
				resolve(elem.innerHtml)
			}
		})
	}
}

module.exports = methods
