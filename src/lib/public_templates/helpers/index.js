import _ from "lodash/object"
import { EnvelopeHelpers } from "./envelope"
import { PollerHelpers } from "./pollers"
import { TemplateHelpers } from "./template"
import { AttachmentsHelpers } from "./attachments"

let helpers = _.merge({}, EnvelopeHelpers, TemplateHelpers, PollerHelpers, AttachmentsHelpers)

export default helpers
