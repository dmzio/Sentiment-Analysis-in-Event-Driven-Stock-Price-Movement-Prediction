
import Datepicker from 'vuejs-datepicker';
import NewsGrid from './news-grid';


import {urlPrefix, isEmpty, urlFor} from './helper';

console.log(urlPrefix);
console.log(isEmpty(urlPrefix));
console.log(urlFor('/hello'));

// bootstrap the app
const app = new Vue({
  el: '#app',
  components: {
    Datepicker,
    NewsGrid
  },
  data: {
    searchQuery: '',
    // note that we have to define gridColumns here, not inside $http callback
    // otherwise, the sortOrders in grid-component will have undefined keys
    gridColumns: ['date', 'ticker', 'title', 'predict', 'correct'],
    gridData: []
  },
  methods: {
    updateSince(since) {
      console.log('since', since)
    },
    updateEnd(end) {
      console.log('end', end)
    }
  },
  mounted() {
    var self = this;
    this.$http.post('./fetch_news', {since: null, end: null}).then(res => {
      self.gridData = res.data;
    })
  }
})