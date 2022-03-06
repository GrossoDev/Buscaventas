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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Query = /** @class */ (function () {
    function Query(title, results) {
        if (results === void 0) { results = []; }
        this.loaded = false;
        this.filter = new QueryFilter();
        this.id = Query.currentId++;
        this.title = title;
        this.results = results;
    }
    Query.currentId = 0;
    return Query;
}());
var QueryFilter = /** @class */ (function () {
    function QueryFilter() {
        this.contains = "";
        this.doesntContain = "";
        this.includeNew = true;
        this.includeUsed = true;
    }
    QueryFilter.checkResult = function (filter, result) {
        return QueryFilter.checkCondition(result.isNew, filter.includeNew, filter.includeUsed)
            && (filter.contains.length ? QueryFilter.checkContainsAny(result.title, filter.contains) : true)
            && (filter.doesntContain.length ? !QueryFilter.checkContainsAny(result.title, filter.doesntContain) : true);
    };
    QueryFilter.checkContainsAny = function (resultTitle, wordsToInclude) {
        for (var _i = 0, _a = wordsToInclude.split(" "); _i < _a.length; _i++) {
            var word = _a[_i];
            if (resultTitle.toLowerCase().includes(word.toLowerCase()))
                return true;
        }
        return false;
    };
    QueryFilter.checkCondition = function (resultIsNew, includeNew, includeUsed) {
        return includeNew ? (resultIsNew || includeUsed)
            : includeUsed ? !resultIsNew : false;
    };
    return QueryFilter;
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
var Seller = /** @class */ (function () {
    function Seller(id) {
        this.id = id;
    }
    Seller.prototype.find_result = function (query) {
        var _this = this;
        var results = vue.sort_results_byPrice(query.results);
        return results.filter(function (e) { return e.sellerId == _this.id; })[0];
    };
    Seller.prototype.find_totalPrice = function (queries) {
        var _this = this;
        return queries.reduce(function (sum, query) {
            var results = vue.sort_results_byPrice(query.results);
            results = results.filter(function (e) { return e.sellerId == _this.id; });
            if (results[0])
                return sum + results[0].price;
            else
                return sum;
        }, 0);
    };
    return Seller;
}());
// @ts-nocheck
// No type checking because it's impossible to combine with Vue's reactiveness.
// However, types are still declared as hints.
var vue = new Vue({
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
        search: function () {
            var searchQuery = this.searchQuery.toUpperCase().trim();
            this.searchError = "";
            if (!searchQuery) {
                this.searchError = "EmptyQuery";
                return;
            }
            else if (this.queries.find(function (query) { return query.title == searchQuery; })) {
                this.searchError = "Repeated";
                return;
            }
            var query = new Query(searchQuery);
            this.queries.push(query);
            Search.query(searchQuery, this.max_results).then(function (results) {
                query.results = results;
                query.loaded = true;
                vue.calculate_matching_sellers();
            });
        },
        calculate_matching_sellers: function () {
            var matches = [];
            var sellers = [];
            var queries = vue.$refs.queries;
            // First, take the sellers from the first query, and 
            // only leave the sellers that appear in all other queries.
            if (!queries.length || queries.length == 1)
                vue.matching_sellers;
            else
                matches = queries[0].get_sellers();
            queries.forEach(function (query) {
                var sellers = query.get_sellers();
                matches = matches.filter(function (e) { return sellers.includes(e); });
            });
            // Then, create a seller object for all the matches.
            matches.forEach(function (match) { return sellers.push(new Seller(match)); });
            vue.matching_sellers = sellers.sort(function (a, b) { return a.find_totalPrice(queries) - b.find_totalPrice(queries); });
        },
        sort_results_byPrice: function (results) {
            var results = __spreadArray([], results, true);
            return results.sort(function (a, b) { return a.price - b.price; });
        }
    }
});
// @ts-nocheck
// No type checking because it's impossible to combine with Vue's reactiveness.
// However, types are still declared as hints.
Vue.component('filterquery-modal', {
    template: '#filterquery-modal-template',
    data: function () {
        return {
            filter: new QueryFilter()
        };
    },
    props: {
        originalQuery: {
            type: Object,
            required: true
        }
    },
    watch: {
        originalQuery: function (newQuery, oldQuery) {
            this.filter = __assign({}, newQuery.filter);
        }
    },
    computed: {
        results: function () {
            return this.originalQuery.results;
        },
        filteredResults: function () {
            var filter = this.filter;
            return vue.sort_results_byPrice(this.results.filter(function (result) { return QueryFilter.checkResult(filter, result); }));
        }
    },
    methods: {
        applyFilter: function () {
            this.originalQuery.filter = __assign({}, this.filter);
            vue.calculate_matching_sellers();
        }
    }
});
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
        loaded: function () {
            return this.query.loaded;
        },
        results: function () {
            var query = this.query;
            var filter = query.filter;
            return query.results.filter(function (result) { return QueryFilter.checkResult(filter, result); });
        },
        min_price: function () {
            if (!this.query.results.length)
                return 0;
            return this.query.results.reduce(function (a, b) { return Math.min(a, b.price); }, Infinity);
        },
        seller_count: function () {
            return this.get_sellers().length;
        },
        thumbnail: function () {
            var result = this.results[0];
            if (result)
                return result.thumbnail;
            return "";
        }
    },
    methods: {
        remove_query: function () {
            var _this = this;
            vue.queries = vue.queries.filter(function (e) { return e.id != _this.id; });
            vue.calculate_matching_sellers();
        },
        filter_query: function () {
            vue.filteringQuery = this.query;
        },
        get_sellers: function () {
            return this.results.reduce(function (sellers, result) {
                if (!sellers.includes(result.sellerId)) {
                    sellers.push(result.sellerId);
                }
                return sellers;
            }, []);
        }
    }
});
// @ts-nocheck
// No type checking because it's impossible to combine with Vue's reactiveness.
// However, types are still declared as hints.
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
            var results = vue.filteringQuery.results;
            vue.filteringQuery.results = results.filter(function (e) { return e.id != _this.id; });
        }
    }
});
