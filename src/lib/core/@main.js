import actions  from './actions'
import helpers  from './helpers'

// imports with {} means singleton instances/they have state

import { configs }  from './configs'
import { state } from './state'
const VeLib = {
	actions: actions,
	configs: configs,
	helpers: helpers,
	state  : state
}

var veLibDef = define("VeLib", () => VeLib)

module.exports = VeLib
