// @ts-nocheck
// No type checking because it's impossible to combine with Vue's reactiveness.
// However, types are still declared as hints.

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
      loaded: function() {
        return this.query.loaded;
      },
      min_price: function(): number {
        if (!this.query.results.length) return 0;

        return this.query.results.reduce(
          (a: number, b: SearchResult) => Math.min(a, b.price), Infinity);
      },
      seller_count: function(): number {
        return this.get_sellers().length;
      },
      thumbnail: function(): string {
        let result = this.query.results[0];
  
        if (result) return result.thumbnail;
  
        return "";
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