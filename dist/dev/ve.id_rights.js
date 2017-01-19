(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["id_rights"] = factory();
	else
		root["VeLib"] = root["VeLib"] || {}, root["VeLib"]["id_rights"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _actions = __webpack_require__(249);
	
	var _actions2 = _interopRequireDefault(_actions);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var IDrights = function IDrights() {
		_classCallCheck(this, IDrights);
	
		this.actions = _actions2.default;
	};
	
	var idrights = new IDrights();
	
	Object.setPrototypeOf(idrights, _actions2.default);
	
	module.exports = idrights;

/***/ },

/***/ 249:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _configs = __webpack_require__(250);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var callForData = VeLib.core.helpers._call;
	
	// TODO Change this reg number here to whatever the endpoint is
	var Actions = function () {
		function Actions() {
			_classCallCheck(this, Actions);
		}
	
		_createClass(Actions, [{
			key: "getCompanyAuthorities",
			value: function getCompanyAuthorities(regNumber) {
				return callForData("GET", "" + _configs.configs.get().idrightsUrl + regNumber);
			}
		}]);
	
		return Actions;
	}();
	
	module.exports = new Actions();

/***/ },

/***/ 250:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var coreConfigs = VeLib.core.configs;
	
	var Configs = exports.Configs = function () {
		function Configs() {
			_classCallCheck(this, Configs);
		}
	
		_createClass(Configs, [{
			key: "get",
			value: function get() {
				return {
					// TODO need to update this after i know the url
					// companySuffix: '/company',
					idrightsUrl: "" + coreConfigs.domain + coreConfigs.apiBase + "/id-rights/public/signing-procuration/"
				};
			}
		}]);
	
		return Configs;
	}();
	
	var configs = exports.configs = new Configs();

/***/ }

/******/ })
});
;
//# sourceMappingURL=ve.id_rights.js.map