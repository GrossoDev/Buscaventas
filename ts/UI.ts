// @ts-nocheck
// No type checking because it's impossible to combine with Vue's reactiveness.
// However, types are still declared as hints.

let vue = new Vue({
  el: '#app',
  data: {
    searchQuery: null,
    filteringQuery: new Query("Error"),
    searchError: "",
    queries: [],
    matching_sellers: [],
    max_results: 300
  },
  methods: {
    search: function() {
      let searchQuery = this.searchQuery.toUpperCase().trim();
      this.searchError = "";

      if (!searchQuery) {
        this.searchError = "EmptyQuery";
        return;
      } else if (this.queries.find((query: Query) => query.title == searchQuery)) {
        this.searchError = "Repeated";
        return;
      } 

      let query = new Query(searchQuery);
      this.queries.push(query);

      Search.query(searchQuery, this.max_results).then(results => {
        query.results = results;
        query.loaded = true;

        vue.calculate_matching_sellers();
      });
    },
    calculate_matching_sellers: () => {
      let matches: string[] = [];
      let sellers: Seller[] = [];
      let queries = vue.$refs.queries;
      
      // First, take the sellers from the first query, and 
      // only leave the sellers that appear in all other queries.
      if (!queries.length || queries.length == 1) vue.matching_sellers;
      else matches = queries[0].get_sellers();
      
      queries.forEach(query => {
        let sellers = query.get_sellers();

        matches = matches.filter(e => sellers.includes(e));
      });

      // Then, create a seller object for all the matches.
      matches.forEach(match => sellers.push(new Seller(match)));

      vue.matching_sellers = sellers.sort((a, b) => a.find_totalPrice(queries) - b.find_totalPrice(queries));
    },
    sort_results_byPrice: function(results: SearchResult[]) {
      let results = [...results];
      
      return results.sort((a, b) => a.price - b.price);
    }
  }
});