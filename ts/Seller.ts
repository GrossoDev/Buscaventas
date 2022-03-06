class Seller {
    id: string;

    find_result(query: Query) {
      let results: SearchResult[] = vue.sort_results_byPrice(query.results);

      return results.filter(e => e.sellerId == this.id)[0];
    }

    find_totalPrice(queries: Query[]) {
      return queries.reduce((sum, query) => {
        let results = vue.sort_results_byPrice(query.results);
        results = results.filter(e => e.sellerId == this.id)

        if (results[0]) return sum + results[0].price;
        else return sum;
      }, 0);
    }

    constructor(id: string) {
        this.id = id;
    }
}