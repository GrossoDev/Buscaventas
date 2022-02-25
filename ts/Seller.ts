class Seller {
    id: string;

    find_result(query: Query) {
      let results: SearchResult[] = vue.sort_results_byPrice(query);
        console.log(query);
      return results.filter(e => e.sellerId == this.id)[0];
    }

    find_totalPrice(queries: Query[]) {
      let sum = 0;

      for (let query of queries) {
        let results = vue.sort_results_byPrice(query);
        results = results.filter(e => e.sellerId == this.id)

        if (results[0]) sum += results[0].price;
      }

      return sum;
    }

    constructor(id: string) {
        this.id = id;
    }
}