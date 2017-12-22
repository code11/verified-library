import actions  from './actions'
import helpers  from './helpers'
import state from './state'
import configs  from './configs'
import remote from "./remote"

const VeLib = { actions, configs, helpers, state , remote }

Object.setPrototypeOf(VeLib, actions)

module.exports = VeLib
