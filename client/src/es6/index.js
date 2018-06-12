
import Datepicker from 'vuejs-datepicker';

// register the grid component
Vue.component('demo-grid', {
  template: '#grid-template',
  delimiters: ["${","}"],  // component-level customized delimiters
  props: {
    data: Array,
    columns: Array,
    filterKey: String
  },
  data: function () {
    var sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders
    }
  },
  computed: {
    filteredData: function () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var data = this.data
      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    }
  }
})

// bootstrap the demo
export const demo = new Vue({
  el: '#demo',
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