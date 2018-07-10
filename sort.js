var array = [9, 4, 5, 7, 3, 8, 2];

function swap(array, i, j){
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

function bubbleSortBasic(array){
    for (var i = 0; i < array.length; i++ ){
        for (var j = 1; j < array.length; j++ ){
            if ( array[j - 1] > array[j]){
                swap(array, j - 1, j);
            }
        }
    }
    return array;
}

console.log(bubbleSortBasic(array));

function bubbleSort(array){
    var swapped;
    do {
        swapped = false;
        for (var i = 0; i < array.length; i++){
            if (array[i] && array[i + 1] && array[i] > array[i + 1]){
                swap(array, i, i + 1);
                swapped = true;
            }
        }
    } while (swapped);
    return array;
}
console.log(bubbleSort(array));