// get all controllers
import {index} from './controllers/index';

export default function(app) {

	/*** Index */

    // Add AMT.parseInfo for each GET request, not for ajax call
	app.get('/', index);

}