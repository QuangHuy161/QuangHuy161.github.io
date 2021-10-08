//SEARCH


function BTsearch(Arr, x, f) {
    let start = 0,
        end = Arr.length - 1;
    while (start <= end) {
        mid = start + Math.floor((end - start) / 2);
        if (Arr[mid][f] == x) return mid;

        if (Arr[mid][f] < x)
            start = mid + 1;
        else
            end = mid - 1;
    }
    return -1;
}