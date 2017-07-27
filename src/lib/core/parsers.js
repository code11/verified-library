const qs = require( "query-string" )
const _ = require( "lodash/object" )

class Parsers {
	constructor( ) {}

	getQueryParams( additionalParamObjectVales ) {
		return _.merge( {} , qs.parse( location.search ) , additionalParamObjectVales )
	}
}

let parsers = new Parsers( )
export default parsers
