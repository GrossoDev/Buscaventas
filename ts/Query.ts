class Query { 
    public id: number;
    public title: string;
    public results: SearchResult[];
    public thumbnail: string;
    public min_price: number;
    
    constructor(id: number, title: string, results: SearchResult[], thumbnail: string, minPrice: number) {
        this.id = id;
        this.title = title;
        this.results = results;
        this.thumbnail = thumbnail;
        this.min_price = minPrice;
    }
}