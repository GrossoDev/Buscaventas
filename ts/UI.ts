let vue = new Vue({
  el: '#app',
  data: {
    ui_searchQuery: null,
    ui_filteringQuery: new Query("Error"),
    searchError: "",
    queries: [],
    max_results: 300
  },
  computed: {
    matching_sellers: () => {
      let matches: string[] = [];
      let sellers: Seller[] = [];
      let queries = vue.queries;
      
      // First, take the sellers from the first query, and 
      // only leave the sellers that appear in all other queries.
      if (queries.length == 0) return 0;
      else matches = vue.get_sellers(queries[0]);
      
      queries.forEach(query => {
        let sellers = vue.get_sellers(query);

        matches = matches.filter(e => sellers.includes(e));
      });

      // Then, create a seller object for all the matches.
      matches.forEach(match => sellers.push(new Seller(match)));

      return sellers.sort((a, b) => a.find_totalPrice(queries) - b.find_totalPrice(queries));
    }
  },
  methods: {
    ui_search: function(searchQuery: string) {
      if (!searchQuery) {
        this.searchError = "EmptyQuery";
        return;
      } else if (this.queries.find((query: Query) => query.title == searchQuery)) {
        this.searchError = "Repeated";
        return;
      } 

      this.searchError = "";

      let query = new Query(searchQuery);
      this.queries.push(query);

      Search.query(searchQuery, this.max_results).then(results => {
        query.results = results;
        query.loaded = true;
      });
    },
    sort_results_byPrice: function(query: Query) {
      let results = [...query.results];
      
      return results.sort((a, b) => a.price - b.price);
    },
    get_sellers: function(query: Query) {
      return query.results.reduce((sellers: string[], result: SearchResult) => {
        if (!sellers.includes(result.sellerId)) {
          sellers.push(result.sellerId);
        }

        return sellers;
      }, []);
    }
  }
});