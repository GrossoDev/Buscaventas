class SearchResult {
    public id: string;
    public title: string;
    public sellerId: string;
    public price: number;
    public link: string;
    public thumbnail: string;
    public isNew: boolean;

    constructor(id: string, title: string, sellerId: string, price: number, link: string, thumbnail: string, isNew: boolean) {
        this.id = id;
        this.title = title;
        this.sellerId = sellerId;
        this.price = price;
        this.link = link;
        this.thumbnail = thumbnail;
        this.isNew = isNew;
    }
}
