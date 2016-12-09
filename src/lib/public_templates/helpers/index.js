import _ from "lodash/object"
import { EnvelopeHelpers } from "./envelope"
import { PollerHelpers } from "./pollers"
import { TemplateHelpers } from "./template"

let helpers = _.merge({}, EnvelopeHelpers, TemplateHelpers, PollerHelpers)

console.log("all helpers is", helpers)
export default helpers
