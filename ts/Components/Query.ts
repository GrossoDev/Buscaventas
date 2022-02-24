Vue.component('query', {
    template: '#query-template',
    props: {
      id: {
        type: Number,
        required: true
      },
      title: {
        type: String,
        required: true
      }
    },
    computed: {
      query: function() {
        return vue.queries.find(e => e.id == this.id);
      },
      min_price: function() {
        let min;
  
        for (let resultIdx in this.query.results) {
          let result = this.query.results[resultIdx];
  
          if (min == undefined || result.price < min) {
            min = result.price;
          }
        }
  
        return min;
      },
      seller_count: function() {
        return this.get_sellers().length;
      },
      thumbnail: function() {
        let result = this.query.results[0];
  
        if (result) return result.thumbnail;
  
        return null;
      } 
    },
    methods: {
      remove_query: function() {
        vue.queries = vue.queries.filter(e => e.id != this.id);
      },
      filter_query: function() {
        vue.ui_filteringQuery = this.query;
      },
      get_sellers: function() {
        return vue.get_sellers(this.query);
      }
    }
  });