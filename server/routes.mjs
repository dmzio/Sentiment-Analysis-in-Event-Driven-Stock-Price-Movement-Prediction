// get all controllers
import {index} from './controllers/index';
import {fetchNews} from './controllers/news';

export default function(app) {

  /*** Index */
  app.get('/', index);


  /*** News */
  app.post('/fetch_news', fetchNews)

}

