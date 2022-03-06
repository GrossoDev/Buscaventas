class Query { 
    id: number;
    title: string;
    results: SearchResult[];
    loaded: boolean = false;
    filter: QueryFilter = new QueryFilter();

    private static currentId: number = 0;

    constructor(title: string, results: SearchResult[] = []) {
        this.id = Query.currentId++;
        this.title = title;
        this.results = results;
    }
}