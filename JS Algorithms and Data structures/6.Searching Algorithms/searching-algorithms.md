<!-- # **Searching Algorithms** -->

### _AUTHOR : ABDUR RAHMAN_

---

[Click here for session video of Searching Algorithms](https://drive.google.com/file/d/1RC3jTNdBvcVa3LJzhK09PCW91ViSMAN2/view?usp=sharing)

# Linear Search

### **Usecase:**

### Find a certain element in array.

<br/>

### **Definition:**

### Linear search is very simple search algorithm. In this type of search, a sequential search is made over all items one by one. Every item is checked and if a match is found then that particular item is returned, otherwise the search continues till the end of the data collection.

<br/>

### **Time Complexity:**

### O(N)

<br/>

### **Problem:**

### Let's say we want to find the element `33` from `[10, 14, 19, 26, 27, 31, 33, 35, 42, 44]` , the linear search algorithm flow would be as follows:

<br/>

<p align="center">
    <img src="./linear-search.gif" alt="Linear Search Flow" />
</p>

<br/>

### **Implementation (JavaScript):**

```js
function linearSearch(arr, el) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === el) return i;
  }
  return -1;
}

const result = linearSearch([10, 14, 19, 26, 27, 31, 33, 35, 42, 44], 303);
```

<br/>
<br/>

# Binary Search

### **Definition:**

### The Binary Search algorithm works by dividing the search space into halves, and based on the value of the middle element, it eliminates half of the search space.

<br/>

### We maintain two pointers left and right that are going to define the current search space. Initially, the search space is the entire list. We find the middle value using the two pointers and compare it to the search target. If the middle value is equal to the target value, we've found the target. If the middle value is greater than the target, then it means the target value cannot lie in the right half of the search space. Because the list is sorted, all the values that come after the middle value must be greater than the middle value and even greater than the target, so we can remove the entire right half, narrowing down the search space to the left half. If the middle value is smaller than the target, then we can discard the entire left half and search for the target value in the right half. We repeat this process until the target value is found, or our search space is exhausted.

<br/>

### **Time Complexity:**

### O(logN)

<br/>

### **Problem:**

### Let's say we want to find the element `37` from `[1, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59]` , the binary search algorithm flow would be as follows:

<br/>

<p align="center">
    <img src="./binary-search.gif" alt="Binary Search Flow" />
</p>

<br/>

### **Iterative Implementation (JavaScript):**

```js
let binarySearch = function (arr, target) {
  let start = 0;
  let end = arr.length - 1;

  // Base Condition (When target element not found in array)
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    // If target is equal to the element at mid,
    // return the mid
    if (target === arr[mid]) return mid;
    // If target is greater than element at mid,
    // search in the right half of mid
    else if (target > arr[mid]) start = mid + 1;
    // If target is smaller than element at mid,
    // search in the left half of mid
    else end = mid - 1;
  }

  return -1;
};

const result = binarySearch(
  [1, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59],
  37
);
```

<br/>

### **Recursive Implementation (JavaScript):**

```js
let binarySearch = function (arr, target) {
  function recursiveBinary(arr, target, start, end) {
    let mid = Math.floor((start + end) / 2);

    // Base Condition (When target element not found in array)
    if (start > end) return -1;

    // If target is equal to the element at mid,
    // return the mid
    if (arr[mid] === target) return mid;
    // If target is greater than element at mid,
    // search in the right half of mid
    else if (target > arr[mid])
      return recursiveBinary(arr, target, mid + 1, end);
    // If target is smaller than element at mid,
    // search in the left half of mid
    else return recursiveBinary(arr, target, start, mid - 1);
  }

  return recursiveBinary(arr, target, 0, arr.length);
};

const result = binarySearch(
  [1, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59],
  37
);
```

<br/>

<br/>

# Naive Search

### **Usecase:**

### Search for occurence of substring in a string.

<br/>

### **Definition:**

### Naive search is the most basic and simple algorithm to perform a sub-string search in a main-string. In this, we loop through each character of the main-string and check if it matches the first character of the sub-string. If it matches, we create another nested loop in which we search if the subsequent sub-string characters match with the subsequent main-string characters to verify it's occurence.

<br/>

### **Time Complexity:**

### O(M\*N) where M is the length of the sub-string and N is the length of the main-string

<br/>

### **Problem:**

### Find index of sub-string `abc` in main-string `xyzabc`:

<br/>

### **Implementation (JavaScript):**

```js
function naiveStringSearch(str, target) {
  const strLen = str.length - 1;
  const targetLen = target.length - 1;

  for (let i = 0; i <= strLen; i++) {
    for (let j = 0; j <= targetLen; j++) {
      // If target character mismatches, break j loop
      if (str[i + j] !== target[j]) break;

      // If loop not broken till the final target character,
      // then it means the occurence is found.
      if (j === targetLen) return i;
    }
  }

  return -1;
}

let result = naiveStringSearch("xyzabc", "abc");
```

<br/>

### **Drawback of Naive Search algorithm:**

### Naive search is inefficient in some cases where the main-string has repeating prefix pieces of the sub-string. This is because when it has found a position, it does not use it again to find the other position. It goes back to the starting point and looks for the pattern over again. And so, it does not use the information from the previous shift again. The below case is an example.

<br/>

```js
mainstring: "AAAAAAAAAAAAB";
substring: "AAAAAAB";
```

<br/>

### This inefficiency can be overcome by using [Knuck Morris Pratt (KMP) string matching algorithm](https://youtu.be/V5-7GzOfADQ "Youtube"). It is the same as Naive Search algorithm, but it performs better in the above mentioned cases.

<br/>

---

<br/>
<p align="center">
<strong>AUTHOR :</strong> Abdur Rahman
</p>
<br/>

---

<br/>
