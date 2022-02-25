class Query { 
    id: number;
    title: string;
    results: SearchResult[];
    
    constructor(id: number, title: string, results: SearchResult[]) {
        this.id = id;
        this.title = title;
        this.results = results;
    }
}