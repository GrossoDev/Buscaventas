let currentId = 0;

let vue = new Vue({
  el: '#app',
  data: {
    ui_searchQuery: null,
    ui_filteringQuery: null,
    queries: [],
    max_results: 300
  },
  computed: {
    matching_sellers: () => {
      let matches = [];
      let sellers = [];
      let queries = vue.queries;
      
      // First, take the sellers from the first query, and 
      // only leave the sellers that appear in all other queries.
      if (queries.length == 0) return 0;
      else matches = vue.get_sellers(queries[0]);
      
      for (let queryIdx in queries) {
        let query = queries[queryIdx];
        let sellers = vue.get_sellers(query);

        matches = matches.filter(e => sellers.includes(e));
      }

      // Then, create a seller object for all the matches.
      for (let matchIdx in matches) {
        let seller = {
          id: matches[matchIdx],
          find_result: function(query) {
            let results = vue.sort_results_byPrice(query);

            return results.filter(e => e.sellerId == this.id)[0];
          },
          find_totalPrice: function() {
            let sum = 0;

            for (let queryIdx in queries) {
              let query = queries[queryIdx];
              let results = vue.sort_results_byPrice(query);
              results = results.filter(e => e.sellerId == this.id)

              sum += results[0].price;
            }

            return sum;
          }
        }

        sellers.push(seller);
      }

      return sellers.sort((a, b) => a.find_totalPrice() - b.find_totalPrice());
    }
  },
  methods: {
    ui_search: function(searchQuery) {
      Search.query(searchQuery, this.max_results).then(results => {
        this.queries.push(new Query(currentId++, searchQuery, results, null, 0));
      });
    },
    sort_results_byPrice: function(query) {
      let results = [...query.results];
      
      return results.sort((a, b) => a.price - b.price);
    },
    get_sellers: function(query) {
      let sellers = [];
      let results = query.results

      for (let resultIdx in results) {
        let result = results[resultIdx];

        if (!sellers.includes(result.sellerId)) {
          sellers.push(result.sellerId);
        }
      }

      return sellers;
    }
  }
});