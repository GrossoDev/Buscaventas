class QueryFilter {
    contains: string = "";
    doesntContain: string = "";
    includeNew: boolean = true;
    includeUsed: boolean = true;

    static checkResult(filter: QueryFilter, result: SearchResult): boolean {
        return QueryFilter.checkCondition(result.isNew, filter.includeNew, filter.includeUsed)
            && (filter.contains.length ? QueryFilter.checkContainsAny(result.title, filter.contains) : true)
            && (filter.doesntContain.length ? !QueryFilter.checkContainsAny(result.title, filter.doesntContain) : true);
    }

    static checkContainsAny(resultTitle: string, wordsToInclude: string): boolean {
        for (let word of wordsToInclude.split(" ")) {
            if (resultTitle.toLowerCase().includes(word.toLowerCase())) return true;
        }

        return false;
    }

    static checkCondition(resultIsNew: boolean, includeNew: boolean, includeUsed: boolean): boolean {
        return includeNew ? (resultIsNew || includeUsed)
        : includeUsed ? !resultIsNew : false;
    }
}