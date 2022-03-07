class QueryFilter {
    contains: string = "";
    doesntContain: string = "";
    includeNew: boolean = true;
    includeUsed: boolean = true;
    minPrice: number = 0;
    maxPrice: number = 0;

    static checkResult(filter: QueryFilter, result: SearchResult): boolean {
        return QueryFilter.checkCondition(result.isNew, filter.includeNew, filter.includeUsed)
            && (filter.contains.length ? QueryFilter.checkContainsAll(result.title, filter.contains) : true)
            && (filter.doesntContain.length ? !QueryFilter.checkContainsAny(result.title, filter.doesntContain) : true)
            && QueryFilter.checkPriceRange(result.price, filter.minPrice, filter.maxPrice);
    }

    static checkPriceRange(price: number, minPrice: number, maxPrice: number): boolean {
        return price >= minPrice && (maxPrice ? price <= maxPrice : true);
    }

    static checkContainsAll(resultTitle: string, wordsToInclude: string): boolean {
        for (let word of wordsToInclude.toLowerCase().split(" ")) {
            if (!resultTitle.toLowerCase().includes(word)) return false;
        }

        return true;
    }

    static checkContainsAny(resultTitle: string, wordsToInclude: string): boolean {
        for (let word of wordsToInclude.toLowerCase().split(" ")) {
            if (resultTitle.toLowerCase().includes(word)) return true;
        }

        return false;
    }

    static checkCondition(resultIsNew: boolean, includeNew: boolean, includeUsed: boolean): boolean {
        return includeNew ? (resultIsNew || includeUsed)
            : includeUsed ? !resultIsNew : false;
    }
}