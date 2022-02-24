"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Query = /** @class */ (function () {
    function Query(id, title, results, thumbnail, minPrice) {
        this.id = id;
        this.title = title;
        this.results = results;
        this.thumbnail = thumbnail;
        this.min_price = minPrice;
    }
    return Query;
}());
var Search = /** @class */ (function () {
    function Search() {
    }
    Search.query = function (query, maxResults) {
        // Split request into promises
        var requests = maxResults / Search.PAGING;
        var promises = [];
        // Make a promise for each range of requests
        for (var request = 0, offset = 0; request < requests && offset <= Search.LIMIT; request++, offset = request * Search.PAGING) {
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
    Search.PAGING = 50; // The amount of results per request
    Search.LIMIT = 1000; // The maximum amount amount of results
    return Search;
}());
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
var currentId = 0;
var vue = new Vue({
    el: '#app',
    data: {
        ui_searchQuery: null,
        ui_filteringQuery: null,
        queries: [],
        max_results: 300
    },
    computed: {
        matching_sellers: function () {
            var matches = [];
            var sellers = [];
            var queries = vue.queries;
            // First, take the sellers from the first query, and 
            // only leave the sellers that appear in all other queries.
            if (queries.length == 0)
                return 0;
            else
                matches = vue.get_sellers(queries[0]);
            var _loop_1 = function (queryIdx) {
                var query = queries[queryIdx];
                var sellers_1 = vue.get_sellers(query);
                matches = matches.filter(function (e) { return sellers_1.includes(e); });
            };
            for (var queryIdx in queries) {
                _loop_1(queryIdx);
            }
            // Then, create a seller object for all the matches.
            for (var matchIdx in matches) {
                var seller = {
                    id: matches[matchIdx],
                    find_result: function (query) {
                        var _this = this;
                        var results = vue.sort_results_byPrice(query);
                        return results.filter(function (e) { return e.sellerId == _this.id; })[0];
                    },
                    find_totalPrice: function () {
                        var _this = this;
                        var sum = 0;
                        for (var queryIdx in queries) {
                            var query = queries[queryIdx];
                            var results = vue.sort_results_byPrice(query);
                            results = results.filter(function (e) { return e.sellerId == _this.id; });
                            sum += results[0].price;
                        }
                        return sum;
                    }
                };
                sellers.push(seller);
            }
            return sellers.sort(function (a, b) { return a.find_totalPrice() - b.find_totalPrice(); });
        }
    },
    methods: {
        ui_search: function (searchQuery) {
            var _this = this;
            Search.query(searchQuery, this.max_results).then(function (results) {
                _this.queries.push(new Query(currentId++, searchQuery, results, null, 0));
            });
        },
        sort_results_byPrice: function (query) {
            var results = __spreadArray([], query.results, true);
            return results.sort(function (a, b) { return a.price - b.price; });
        },
        get_sellers: function (query) {
            var sellers = [];
            var results = query.results;
            for (var resultIdx in results) {
                var result = results[resultIdx];
                if (!sellers.includes(result.sellerId)) {
                    sellers.push(result.sellerId);
                }
            }
            return sellers;
        }
    }
});
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
        query: function () {
            var _this = this;
            return vue.queries.find(function (e) { return e.id == _this.id; });
        },
        min_price: function () {
            var min;
            for (var resultIdx in this.query.results) {
                var result = this.query.results[resultIdx];
                if (min == undefined || result.price < min) {
                    min = result.price;
                }
            }
            return min;
        },
        seller_count: function () {
            return this.get_sellers().length;
        },
        thumbnail: function () {
            var result = this.query.results[0];
            if (result)
                return result.thumbnail;
            return null;
        }
    },
    methods: {
        remove_query: function () {
            var _this = this;
            vue.queries = vue.queries.filter(function (e) { return e.id != _this.id; });
        },
        filter_query: function () {
            vue.ui_filteringQuery = this.query;
        },
        get_sellers: function () {
            return vue.get_sellers(this.query);
        }
    }
});
Vue.component('result', {
    template: '#result-template',
    props: {
        id: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        sellerId: {
            type: Number,
            required: false
        },
        thumbnail: {
            type: String,
            required: false
        },
        price: {
            type: Number,
            required: true
        }
    },
    methods: {
        remove_result: function () {
            var _this = this;
            var results = vue.ui_filteringQuery.results;
            vue.ui_filteringQuery.results = results.filter(function (e) { return e.id != _this.id; });
        }
    }
});
