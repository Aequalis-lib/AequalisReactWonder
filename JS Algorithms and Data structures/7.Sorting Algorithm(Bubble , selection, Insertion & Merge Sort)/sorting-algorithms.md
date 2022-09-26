<!-- # **Searching Algorithms** -->

# Bubble Sort

### _AUTHOR : ABDUR RAHMAN_

---

[Click here for session video of Bubble and selection sort](https://drive.google.com/file/d/1EC1wOr4DUgEmUM5rZCDPgmNqmMQIP0fh/view?usp=sharing)

[Click here for session video of Insertion and Merge sort](https://drive.google.com/file/d/1i4Ytq8penAqcYhRkhnpq7V7nPKBuq5ht/view?usp=sharing)

### **Usecase:**

### Sort an array.

<br/>

### **Definition:**

### Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in the wrong order. This algorithm is not suitable for large data sets as its average and worst-case time complexity is quite high.

<br/>

### **Time Complexity:**

### O(N<sup>2</sup> )

<br/>

### **Problem:**

### Let's say we want to sort the array `[10, 1, 26, 19, 34, 3, 50, 31, 17, 44]` in ascending order.

<br/>

### **Classic Implementation (JavaScript):**

```js
function bubbleSort(arr) {
  for (let outer = 0; outer < arr.length; outer++) {
    for (let inner = 0; inner < arr.length - 1 - outer; inner++) {
      // compare if current value is greater than next value
      if (arr[inner] > arr[inner + 1]) {
        // if greater, swap the value
        [arr[inner], arr[inner + 1]] = [arr[inner + 1], arr[inner]];
      }
    }
  }
  return arr;
}

const sortedArr = bubbleSort([10, 1, 26, 19, 34, 3, 50, 31, 17, 44]);
```

<br/>

### To sort in descending, just change the swap condition

```js
function bubbleSort(arr) {
  for (let outer = 0; outer < arr.length; outer++) {
    for (let inner = 0; inner < arr.length - 1 - outer; inner++) {
      // compare if current value is lesser than next value
      if (arr[inner] < arr[inner + 1]) {
        // if lesser, swap the value
        [arr[inner], arr[inner + 1]] = [arr[inner + 1], arr[inner]];
      }
    }
  }
  return arr;
}

const sortedArr = bubbleSort([10, 1, 26, 19, 34, 3, 50, 31, 17, 44]);
```

<br/>

### **Optimized Implementation (JavaScript):** (Reduces complexity to O(N) in best case)

```js
function bubbleSort(arr) {
  for (let outer = 0; outer < arr.length; outer++) {
    let swappedOnce = false;
    for (let inner = 0; inner < arr.length - 1 - outer; inner++) {
      // compare if current value is greater than next value
      if (arr[inner] > arr[inner + 1]) {
        // if greater, swap the value
        [arr[inner], arr[inner + 1]] = [arr[inner + 1], arr[inner]];
        swappedOnce = true;
      }
    }
    if (!swappedOnce) break;
  }
  return arr;
}

const sortedArr = bubbleSort([10, 1, 26, 19, 34, 3, 50, 31, 17, 44]);
```

<br/>

# Selection Sort

### **Usecase:**

### Sort an array.

<br/>

### **Definition:**

### The selection sort algorithm sorts an array by repeatedly finding the minimum element (considering ascending order) from the unsorted part and putting it at the beginning.

<br/>

### **Time Complexity:**

### O(N<sup>2</sup> )

<br/>

### **Problem:**

### Let's say we want to sort the array `[10, 1, 26, 19, 34, 3, 50, 31, 17, 44]` in ascending order.

<br/>

### **Implementation (JavaScript):**

```js
function selectionSort(arr) {
  for (let outer = 0; outer < arr.length; outer++) {
    let minIndex = outer;
    for (let inner = outer; inner < arr.length; inner++) {
      if (arr[inner] < arr[minIndex]) {
        minIndex = inner;
      }
    }
    [arr[outer], arr[minIndex]] = [arr[minIndex], arr[outer]];
  }
  return arr;
}

const sortedArr = selectionSort([10, 1, 26, 19, 34, 3, 50, 31, 17, 44]);
```

<br/>

### To sort in descending, just change the swap condition

```js
function selectionSort(arr) {
  for (let outer = 0; outer < arr.length; outer++) {
    let maxIndex = outer;
    for (let inner = outer; inner < arr.length; inner++) {
      if (arr[inner] > arr[maxIndex]) {
        maxIndex = inner;
      }
    }
    [arr[outer], arr[maxIndex]] = [arr[maxIndex], arr[outer]];
  }
  return arr;
}

const sortedArr = selectionSort([10, 1, 26, 19, 34, 3, 50, 31, 17, 44]);
```

<br/>

# Insertion Sort

### **Usecase:**

### Sort an array.

<br/>

### **Definition:**

### Insertion sort is a simple sorting algorithm that works similar to the way you sort playing cards in your hands. The array is virtually split into a sorted and an unsorted part. Values from the unsorted part are picked and placed at the correct position in the sorted part.

<br/>

### **Time Complexity:**

### O(N<sup>2</sup> )

<br/>

### **Problem:**

### Let's say we want to sort the array `[10, 1, 26, 19, 34, 3, 50, 31, 17, 44]` in ascending order.

<br/>

### **Implementation (JavaScript):**

```js
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    while (j >= 0 && key < arr[j]) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
  return arr;
}

const sortedArr = insertionSort([10, 1, 26, 19, 34, 3, 50, 31, 17, 44]);
```

<br/>

### To sort in descending, just change the insert condition

```js
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    while (j >= 0 && key > arr[j]) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
  return arr;
}

const sortedArr = insertionSort([10, 1, 26, 19, 34, 3, 50, 31, 17, 44]);
```

<br/>

# Merge Sort

### **Usecase:**

### Sort an array.

<br/>

### **Definition:**

### The Merge Sort algorithm is a sorting algorithm that is based on the Divide and Conquer paradigm. In this algorithm, the array is initially divided into two equal halves and then they are combined in a sorted manner.

### Merge Sort Working Process:

### Think of it as a recursive algorithm continuously splits the array in half until it cannot be further divided. This means that if the array becomes empty or has only one element left, the dividing will stop, i.e. it is the base case to stop the recursion. If the array has multiple elements, split the array into halves and recursively invoke the merge sort on each of the halves. Finally, when both halves are sorted, the merge operation is applied. Merge operation is the process of taking two smaller sorted arrays and combining them to eventually make a larger one.

<br/>

### **Time Complexity:**

### O(N logN)

<br/>

### **Problem:**

### Let's say we want to sort the array `[10, 1, 26, 19, 34, 3, 50, 31, 17, 44]` in ascending order.

<br/>

### **Implementation (JavaScript):**

```js
// merges two sorted arrays
function merge(arr1, arr2) {
  let i = 0,
    j = 0;
  let mergedArr = [];

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      mergedArr.push(arr1[i]);
      i++;
    } else {
      mergedArr.push(arr2[j]);
      j++;
    }
  }

  while (i < arr1.length) {
    mergedArr.push(arr1[i]);
    i++;
  }

  while (j < arr2.length) {
    mergedArr.push(arr2[j]);
    j++;
  }

  return mergedArr;
}

function mergeSort(arr) {
  // base condition
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

const sortedArr = mergeSort([10, 1, 26, 19, 34, 3, 50, 31, 17, 44]);
```

<br/>

### To sort in descending, just change the sort condition

```js
// merges two sorted arrays
function merge(arr1, arr2) {
  let i = 0,
    j = 0;
  let mergedArr = [];

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] > arr2[j]) {
      mergedArr.push(arr1[i]);
      i++;
    } else {
      mergedArr.push(arr2[j]);
      j++;
    }
  }

  while (i < arr1.length) {
    mergedArr.push(arr1[i]);
    i++;
  }

  while (j < arr2.length) {
    mergedArr.push(arr2[j]);
    j++;
  }

  return mergedArr;
}

function mergeSort(arr) {
  // base condition
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

const sortedArr = mergezSort([10, 1, 26, 19, 34, 3, 50, 31, 17, 44]);
```

<br/>

---

<br/>
<p align="center">
<strong>AUTHOR :</strong> Abdur Rahman
</p>
<br/>

---

<br/>
