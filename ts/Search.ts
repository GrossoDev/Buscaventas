class Search {
    static readonly URL = "https://api.mercadolibre.com/sites/MLA/search?q=";
    static readonly PAGING = 50;    // The amount of results per request
    static readonly LIMIT = 1000;   // The maximum amount amount of results

    static query(query: string, maxResults: number) : Promise<SearchResult[]> {
        // Split request into promises
        let requests: number = maxResults / Search.PAGING;
        let promises: Promise<any>[] = [];

        // Make a promise for each range of requests
        for (let request = 0, offset = 0;
             request < requests && offset <= Search.LIMIT;
             request++, offset = request * Search.PAGING) {
            let url = `${Search.URL}${query.toLowerCase()}&offset=${offset}`;   // Make the query lower case for easier caching

            promises.push(Promise.resolve($.ajax(url)
                .then(response => Search.parseResults(response.results)))
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