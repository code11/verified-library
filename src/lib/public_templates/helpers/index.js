import _ from "lodash"
import { EnvelopeHelpers } from "./envelope"
import { PollerHelpers } from "./pollers"
import { RequestHelpers } from "./requests"
import { TemplateHelpers } from "./template"

let helpers = _.merge({}, EnvelopeHelpers, TemplateHelpers, PollerHelpers)

console.log("all helpers is", helpers)
export default helpers
