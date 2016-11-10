// URL PARSER
!function(t){"use strict";function r(t){var r={path:!0,query:!0,hash:!0};return t?(/^[a-z]+:/.test(t)&&(r.protocol=!0,r.host=!0,/[-a-z0-9]+(\.[-a-z0-9])*:\d+/i.test(t)&&(r.port=!0),/\/\/(.*?)(?::(.*?))?@/.test(t)&&(r.user=!0,r.pass=!0)),r):r}function e(t,e,o){var u,f,l,y=h?"file://"+(process.platform.match(/^win/i)?"/":"")+p("fs").realpathSync("."):document.location.href;e||(e=y),h?u=p("url").parse(e):(u=document.createElement("a"),u.href=e);var d=r(e);l=e.match(/\/\/(.*?)(?::(.*?))?@/)||[];for(f in a)t[f]=d[f]?u[a[f]]||"":"";if(t.protocol=t.protocol.replace(/:$/,""),t.query=t.query.replace(/^\?/,""),t.hash=s(t.hash.replace(/^#/,"")),t.user=s(l[1]||""),t.pass=s(l[2]||""),t.port=c[t.protocol]==t.port||0==t.port?"":t.port,!d.protocol&&/[^\/#?]/.test(e.charAt(0))&&(t.path=e.split("?")[0].split("#")[0]),!d.protocol&&o){var g=new n(y.match(/(.*\/)/)[0]),m=g.path.split("/"),v=t.path.split("/"),q=["protocol","user","pass","host","port"],w=q.length;for(m.pop(),f=0;w>f;f++)t[q[f]]=g[q[f]];for(;".."===v[0];)m.pop(),v.shift();t.path=("/"!==e.charAt(0)?m.join("/"):"")+"/"+v.join("/")}t.path=t.path.replace(/^\/{2,}/,"/"),t.paths(("/"===t.path.charAt(0)?t.path.slice(1):t.path).split("/")),t.query=new i(t.query)}function o(t){return encodeURIComponent(t).replace(/'/g,"%27")}function s(t){return t=t.replace(/\+/g," "),t=t.replace(/%([ef][0-9a-f])%([89ab][0-9a-f])%([89ab][0-9a-f])/gi,function(t,r,e,o){var s=parseInt(r,16)-224,i=parseInt(e,16)-128;if(0===s&&32>i)return t;var n=parseInt(o,16)-128,h=(s<<12)+(i<<6)+n;return h>65535?t:String.fromCharCode(h)}),t=t.replace(/%([cd][0-9a-f])%([89ab][0-9a-f])/gi,function(t,r,e){var o=parseInt(r,16)-192;if(2>o)return t;var s=parseInt(e,16)-128;return String.fromCharCode((o<<6)+s)}),t.replace(/%([0-7][0-9a-f])/gi,function(t,r){return String.fromCharCode(parseInt(r,16))})}function i(t){for(var r,e=/([^=&]+)(=([^&]*))?/g;r=e.exec(t);){var o=decodeURIComponent(r[1].replace(/\+/g," ")),i=r[3]?s(r[3]):"";void 0!==this[o]&&null!==this[o]?(this[o]instanceof Array||(this[o]=[this[o]]),this[o].push(i)):this[o]=i}}function n(t,r){e(this,t,!r)}var h="undefined"==typeof window&&"undefined"!=typeof global&&"function"==typeof require,p=h?t.require:null,a={protocol:"protocol",host:"hostname",port:"port",path:"pathname",query:"search",hash:"hash"},c={ftp:21,gopher:70,http:80,https:443,ws:80,wss:443};i.prototype.toString=function(){var t,r,e="",s=o;for(t in this)if(!(this[t]instanceof Function||null===this[t]))if(this[t]instanceof Array){var i=this[t].length;if(i)for(r=0;i>r;r++)e+=e?"&":"",e+=s(t)+"="+s(this[t][r]);else e+=(e?"&":"")+s(t)+"="}else e+=e?"&":"",e+=s(t)+"="+s(this[t]);return e},n.prototype.clearQuery=function(){for(var t in this.query)this.query[t]instanceof Function||delete this.query[t];return this},n.prototype.queryLength=function(){var t,r=0;for(t in this)this[t]instanceof Function||r++;return r},n.prototype.isEmptyQuery=function(){return 0===this.queryLength()},n.prototype.paths=function(t){var r,e="",i=0;if(t&&t.length&&t+""!==t){for(this.isAbsolute()&&(e="/"),r=t.length;r>i;i++)t[i]=!i&&t[i].match(/^\w:$/)?t[i]:o(t[i]);this.path=e+t.join("/")}for(t=("/"===this.path.charAt(0)?this.path.slice(1):this.path).split("/"),i=0,r=t.length;r>i;i++)t[i]=s(t[i]);return t},n.prototype.encode=o,n.prototype.decode=s,n.prototype.isAbsolute=function(){return this.protocol||"/"===this.path.charAt(0)},n.prototype.toString=function(){return(this.protocol&&this.protocol+"://")+(this.user&&o(this.user)+(this.pass&&":"+o(this.pass))+"@")+(this.host&&this.host)+(this.port&&":"+this.port)+(this.path&&this.path)+(this.query.toString()&&"?"+this.query)+(this.hash&&"#"+o(this.hash))},t[t.exports?"exports":"Url"]=n}("undefined"!=typeof module&&module.exports?module:window);


var VeLib = {
	defaults: {
		apiBase        : '/api-v2',
		descriptorUrl  : '/envelope-descriptors/'
	},
	state: {
		busy: true,
		params: {
			definition_id: null, //58244bd7069a89001226e102
			data_endpoint: null, // /envelopes/58249226c934690014cef799/documents/58249227c934690014cef79b/templates
		},
		// This in the future should dictate what calls are made and how
		preset: ''
	}
}

VeLib.helpers = {
	getParamsAsObjects() {
		var url = new Url();
		return url.query
	},
	outputMissingKeys: function (urlData){
		Object.keys(urlData).map((key) => {
			if (!urlData[key]) console.warn("Value for key ''" + key + "' is missing")
		})
	},
	fetchDefinition: function (){
		return fetch(VeLib.defaults.apiBase + VeLib.defaults.descriptorUrl + VeLib.state.params.definition_id, {
			method: 'GET',
			headers: new Headers({
				"Authorization": VeLib.state.accessToken
			})
		}).then(function(response) {
			return response.json().then(function(json) { return json })
		})
	},
	fetchTemplateData: function (){
		return fetch(VeLib.defaults.apiBase + VeLib.state.params.data_endpoint, {
			method: 'GET',
			headers: new Headers({
				"Authorization": VeLib.state.accessToken
			})
		}).then(function(response) {
			return response.json().then(function(json) { return json[0].userData })
		})
	}
}

VeLib.validate = (schema, data) => { console.log(" i should say what is going on right ?") }

VeLib.init = () => {
	VeLib.state['params']   = VeLib.helpers.getParamsAsObjects();
	VeLib.state.accessToken = "JWT "+ VeLib.state['params']['access_token']

	VeLib.ready = new Promise(function(resolve,reject){
			Promise.all([
				VeLib.helpers.fetchDefinition().then((definition) => VeLib.state.descriptor = definition), 	//.then(() => console.log(VeLib.state.descriptor))
				VeLib.helpers.fetchTemplateData().then((userData) => VeLib.state.userData = userData)		//.then(() => console.log(VeLib.state.userData))
			]).then(() => {
				VeLib.state.busy = false
				resolve()
			})
	})
}

//________________________________________________________________________ MAIN
// VeLib.init()
// VeLib.ready.then(() => {
// 	console.log("ready state is", VeLib.state )
// })
