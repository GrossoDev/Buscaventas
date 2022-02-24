"use strict";
var Search = /** @class */ (function () {
    function Search() {
    }
    Search.query = function (query, maxResults) {
        // Split calls into requests by maxResults/LIMIT
        var requests = maxResults / Search.LIMIT;
        var promises = [];
        // Make a call for each range of requests
        for (var request = 0; request < requests; request++) {
            var offset = request * Search.LIMIT;
            var url = "".concat(Search.URL).concat(query, "&offset=").concat(offset);
            promises.push(Promise.resolve($.ajax(url)
                .then(function (response) { return Search.parseResults(response.results); })));
        }
        // Combine promises and values into a single promise
        var combinedResultsPromise = Promise.all(promises).then(function (values) {
            return values.flat();
        });
        return combinedResultsPromise;
    };
    Search.parseResults = function (results) {
        return results.reduce(function (arr, result) {
            arr.push(new SearchResult(result.id, result.title, result.seller.id, Math.ceil(result.price), result.permalink, result.thumbnail.replace("http://", "https://"), result.condition == "new"));
            return arr;
        }, []);
    };
    Search.URL = "https://api.mercadolibre.com/sites/MLA/search?q=";
    Search.LIMIT = 1000;
    return Search;
}());
Search.query("Cargador", 300).then(function (result) { return console.log(result); });
var SearchResult = /** @class */ (function () {
    function SearchResult(id, title, sellerId, price, link, thumbnail, isNew) {
        this.id = id;
        this.title = title;
        this.sellerId = sellerId;
        this.price = price;
        this.link = link;
        this.thumbnail = thumbnail;
        this.isNew = isNew;
    }
    return SearchResult;
}());
