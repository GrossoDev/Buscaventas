// @ts-nocheck
// No type checking because it's impossible to combine with Vue's reactiveness.
// However, types are still declared as hints.

Vue.component('filterquery-modal', {
    template: '#filterquery-modal-template',
    data: function() { return {
        filter: new QueryFilter()
    }},
    props: {
        originalQuery: {
            type: Object,
            required: true
        }
    },
    watch: {
        originalQuery: function(newQuery, oldQuery) {
            this.filter = {...newQuery.filter};
        }
    },
    computed: {
        results: function() {
            return this.originalQuery.results;
        },
        filteredResults: function() {
            let filter = this.filter;

            return vue.sort_results_byPrice(
                this.results.filter(result => QueryFilter.checkResult(filter, result))
            );
        }
    },
    methods: {
        applyFilter() {
            this.originalQuery.filter = {...this.filter};

            vue.calculate_matching_sellers();
        }
    }
});