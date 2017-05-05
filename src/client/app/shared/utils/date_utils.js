export function dateOrToday(query) {
    if (query && query.month && query.year) {
        return query;
    }
    return {
        month: (new Date()).getMonth() + 1,
        year: (new Date()).getFullYear()
    };
}
