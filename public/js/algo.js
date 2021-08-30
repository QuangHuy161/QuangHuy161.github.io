function partition(arr, low, high) {
    let temp;
    let pivot = arr[high]['hec-key'];

    let i = (low - 1);
    for (let j = low; j <= high - 1; j++) {

        if (arr[j]['hec-key'] <= pivot) {
            i++;

            // swap arr[i] and arr[j]
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }

    temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    return i + 1;
}

function partition1(arr, low, high) {
    let temp;
    let pivot = arr[high]['hc-key'];

    let i = (low - 1);
    for (let j = low; j <= high - 1; j++) {

        if (arr[j]['hc-key'] <= pivot) {
            i++;

            // swap arr[i] and arr[j]
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }

    temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    return i + 1;
}

function qSort(arr, low, high) {
    if (low < high) {

        let pi = partition(arr, low, high);

        qSort(arr, low, pi - 1);
        qSort(arr, pi + 1, high);
    }
}

function qSort1(arr, low, high) {
    if (low < high) {

        let pi = partition1(arr, low, high);

        qSort1(arr, low, pi - 1);
        qSort1(arr, pi + 1, high);
    }
}

//SEARCH
Bsearch = (arr, x) => {
    let start = 0,
        end = arr.length - 1;
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);

        if (arr[mid]['hec-key'] === x) return mid;

        else if (arr[mid]['hec-key'] < x)
            start = mid + 1;
        else
            end = mid - 1;
    }
    return -1;
}