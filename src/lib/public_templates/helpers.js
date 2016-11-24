var call = VeLib.core.helpers._call
import { Observable } from 'rxjs/Rx'


class Helpers {
	constructor(){}
	createEnvelopeContext(){
		return new Promise((resolve, reject) => { resolve({"status":"Created envelope context"}) })
	}
}

module.export = new Helpers()
