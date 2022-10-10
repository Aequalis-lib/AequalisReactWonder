## Quick sort

### _AUTHOR : SANTHOSH_

---

[Click here for session video of Quick sort](https://drive.google.com/file/d/1Nt-_IthWcWog3dOx6Lj9czE_5QOQSEAz/view?usp=sharing)

[Click here for session video of Radix sort](https://drive.google.com/file/d/1VudVYZwyf4E2ZxGIFxBoAv0brCxAEq1w/view?usp=sharing)

### Why Quick sort ?

To sort array with the elemants of more than 100000.

### Quick sort example

### Sorting an array using quick sort [100,-3,2,4,6,9,1,2,5,3,23].

```js
Example - [100, -3, 2, 4, 6, 9, 1, 2, 5, 3, 23];

function pivot(arr, start = 0, end = arr.length - 1) {
  const swap = (arr, idx1, idx2) => {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  };

  // We are assuming the pivot is always the first element
  let pivot = arr[start];
  let swapIdx = start;

  for (let i = start + 1; i <= end; i++) {
    if (pivot > arr[i]) {
      swapIdx++;
      swap(arr, swapIdx, i);
    }
  }

  // Swap the pivot from the start the swapPoint
  swap(arr, start, swapIdx);
  return swapIdx;
}

function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    let pivotIndex = pivot(arr, left, right); //3
    //left
    quickSort(arr, left, pivotIndex - 1);
    //right
    quickSort(arr, pivotIndex + 1, right);
  }
  return arr;
}

quickSort([100, -3, 2, 4, 6, 9, 1, 2, 5, 3, 23]);

RESULT = [-3, 1, 2, 2, 3, 4, 5, 6, 9, 23, 100];
```

## Complexity

### Best case :

O(nlog(n))

### Worst case :

O(n2)

<!--*******************************************-->

## Radix sort

### Why Radix sort ?

To sort an array without comparing its element values.

### Radix sort example

### Sorting an array using radix sort [23,345,5467,12,2345,9852] .

```js
function getDigit(num, i) {
  return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
}

function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function mostDigits(nums) {
  let maxDigits = 0;
  for (let i = 0; i < nums.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(nums[i]));
  }
  return maxDigits;
}

function radixSort(nums) {
  let maxDigitCount = mostDigits(nums);
  for (let k = 0; k < maxDigitCount; k++) {
    let digitBuckets = Array.from({ length: 10 }, () => []);
    for (let i = 0; i < nums.length; i++) {
      let digit = getDigit(nums[i], k);
      digitBuckets[digit].push(nums[i]);
    }
    nums = [].concat(...digitBuckets);
  }
  return nums;
}

radixSort([23, 345, 5467, 12, 2345, 9852]);
```

## Complexity

### Best case :

O(nk)
n - length of array.
k - no. of digits(average).

### Worst case :

O(nk)
