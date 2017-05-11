export function dateOrToday(query) {
    if (query && query.month && query.year) {
        return query;
    }
    return {
        month: (new Date()).getMonth() + 1,
        year: (new Date()).getFullYear()
    };
}

export function parseDate(input) {
  var parts = input.split('-');
  // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
}
