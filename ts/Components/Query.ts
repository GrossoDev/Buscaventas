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
      },
      query: {
        type: Object,
        requires: true
      }
    },
    computed: {
      loaded: function() {
        return this.query.loaded;
      },
      results: function() {
        let query = this.query;
        let filter = query.filter;

        return query.results.filter(result =>  QueryFilter.checkResult(filter, result));
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
        let result = this.results[0];
  
        if (result) return result.thumbnail;
  
        return "";
      } 
    },
    methods: {
      remove_query: function() {
        vue.queries = vue.queries.filter(e => e.id != this.id);

        vue.calculate_matching_sellers();
      },
      filter_query: function() {
        vue.filteringQuery = this.query;
      },
      get_sellers: function() {
        return this.results.reduce((sellers: string[], result: SearchResult) => {
          if (!sellers.includes(result.sellerId)) {
            sellers.push(result.sellerId);
          }
  
          return sellers;
        }, []);
      }
    }
  });