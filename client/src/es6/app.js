
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
    gridData: [],
    since: null,
    end: null
  },
  methods: {
    updateSince(since) {
      console.log('since', since)
      this.since = since;
    },
    updateEnd(end) {
      console.log('end', end)
      this.end = end;
    },
    toDateString(date) {
      if (date) {
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        return `${year}${('0'+month).slice(-2)}${('0'+day).slice(-2)}`
      }
      return date;
    },
    fetch() {
      let self = this;
      this.$http.post('./fetch_news',{since: this.toDateString(this.since), end: this.toDateString(this.end)})
      .then(res => {
        self.gridData = res.data;
      })
    }
  },
  mounted() {
    this.fetch(null, null)
  }
})