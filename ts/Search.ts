class Search {
    static readonly URL = "https://api.mercadolibre.com/sites/MLA/search?q=";
    static readonly LIMIT = 1000;

    static query(query: string, maxResults: number) : Promise<SearchResult[]> {
        // Split calls into requests by maxResults/LIMIT
        let requests: number = maxResults/Search.LIMIT;
        let promises: Promise<any>[] = [];

        // Make a call for each range of requests
        for (let request = 0; request < requests; request++) {
            let offset = request * Search.LIMIT;
            let url = `${Search.URL}${query}&offset=${offset}`;

            promises.push(Promise.resolve($.ajax(url)
                .then((response) => Search.parseResults(response.results)))
            );
        }

        // Combine promises and values into a single promise
        let combinedResultsPromise = Promise.all(promises).then((values) => {
            return values.flat();
        });

        return combinedResultsPromise;
    }

    private static parseResults(results: any[]): SearchResult[] {
        return results.reduce((arr, result) => {
                arr.push(new SearchResult(
                    result.id,
                    result.title,
                    result.seller.id,
                    Math.ceil(result.price),
                    result.permalink,
                    result.thumbnail.replace("http://", "https://"),
                    result.condition == "new"
                ))

                return arr;
            }, []);
    }
}

Search.query("Cargador", 300).then((result) => console.log(result));