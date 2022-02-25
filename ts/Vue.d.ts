declare class Vue {
    id: string;
    queries: Query[];
    ui_filteringQuery: Query;

    get_sellers(query: Query);
    sort_results_byPrice(query: Query): SearchResult[];

    constructor({ el, data, computed, methods }: { el: string; data: any; computed: any; methods: any; });

    static component(template: string, options: any);
}