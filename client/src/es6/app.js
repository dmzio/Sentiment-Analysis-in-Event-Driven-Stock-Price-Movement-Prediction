
import Datepicker from 'vuejs-datepicker';
import NewsGrid from './news-grid';


import {urlPrefix, isEmpty, urlFor} from './helper';


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
    gridColumns: ['date', 'company', 'title', 'predict', 'day-on-day'],
    gridData: [],
    since: new Date((new Date()).getTime() - (60*60*24*3*1000)),  // one week ago
    end: new Date()
  },
  methods: {
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
        if (Array.isArray(res.data)) {
          self.gridData = res.data;
        } else {
          alert(res.data)
        }
      })
    }
  },
  mounted() {
    this.fetch(null, null)
  }
})