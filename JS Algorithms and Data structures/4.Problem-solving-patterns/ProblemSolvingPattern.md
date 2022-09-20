# Problem Solving Pattern

### **AUTHOR : GANDHI RAJENDRAN**

---

[Click here for session video of problem solving pattern part 1](https://drive.google.com/file/d/1uZ8bfcQNnjt8R8wM2DmEFkSaz5i2N2kz/view?usp=sharing)

[Click here for session video of problem solving pattern part 2](https://drive.google.com/file/d/1mwsWoa6gr2uKyQpeIUl_7y7Ox3RdEDYp/view?usp=sharing)

### Pattern

`An algorithmic pattern is a method, strategy, or technique of solving a problem.`

### Some Common Patterns

- Frequency Counter
- Multiple Pointers
- Sliding Window
- Divide and Conquer

### 1. Frequency Counter

`The Frequency Counter pattern uses an object or set to collect values and the frequency of those values. This pattern is often used with an array or a string , and allows you to avoid nested loops (quadratic time complexity O(n²) `

Example:

[1,2,3,1] // {1:2, 2:1, 3:1}

### Example Problem:

- Write a function called sameSquared which accepts two arrays
- The function should return true if every value in the first array has its corresponding value squared in the second array
- The frequency of the values must be the same

### Method 1 : Naive

> ### Time Complexity - N^2

```js
function sameSquared(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    let correctIndex = arr2.indexOf(arr1[i] ** 2);
    if (correctIndex === -1) {
      return false;
    }
    arr2.splice(correctIndex, 1);
  }

  return true;
}

sameSquared([1, 2, 3], [4, 1, 9]);
// Output : true

sameSquared([1, 2, 3], [1, 9]);
// Output : false
```

### Method 2 : Refactor

> ### Time Complexity - O(n)

```js
function sameSquared(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  let frequencyCounter1 = {};
  let frequencyCounter2 = {};
  for (let val of arr1) {
    frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1;
  }
  for (let val of arr2) {
    frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1;
  }
  for (let key in frequencyCounter1) {
    if (!(key ** 2 in frequencyCounter2)) {
      return false;
    }
    if (frequencyCounter2[key ** 2] !== frequencyCounter1[key]) {
      return false;
    }
    return true;
  }
}

sameSquared([1, 2, 3], [4, 1, 9]);
// Output : true

sameSquared([1, 2, 3], [1, 9]);
// Output : false
```

### Anagram

`An Anagram word, phrase, or name formed by rearranging the letters of another, such as cinema, formed from iceman.`

Example

("cat", "act") // true

("cat", "acy") // false

### Example Problem:

> Create a function where you compare two strings and check if they are anagrams of each other.

```js
function validAnagram(first, second) {
  if (first.length !== second.length) {
    return false;
  }
  const lookup = {};

  for (let i = 0; i < first.length; i++) {
    let letter = first[i];
    // if letter exists, increment, otherwise set to 1
    lookup[letter] ? (lookup[letter] += 1) : (lookup[letter] = 1);
  }

  for (let i = 0; i < second.length; i++) {
    let letter = second[i]; // can't find letter or letter is zero then it's not an anagram

    if (!lookup[letter]) {
      return false;
    } else {
      lookup[letter] == 1;
    }
  }

  return true;
}

validAnagram("cat", "act");
//Output true

validAnagram("cat", "acy");
//Output false
```

### Multiple Pointers

- `create two values, or pointers, that each corresponds to an index in an array and moving these pointers towards the beginning, end, or middle of the array based on a provided condition.`
- `Very efficient for solving problems with minimal space complexity as well`

### Example Problem:

Write a function called `sumzero` which accepts a `sorted array` of integers. The function should find the first pair where the sum is 0. Return an array that includes both values that sum to zero or undefiend if a pair does not exist

### Method 1 : Naive

> ### Time Complexity - O(N^2)

```js
function sumZero(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === 0) {
        return [arr[i], arr[j]];
      }
    }
  }
}

sumZero([1, 2, -2]);
// Output  [-2, 2]

sumZero([-4, -2, 0, 2, 4]);
// Output  [-4, 4]
```

### Method 2 : Refactor

> ### Time Complexity - O(N)

```js
function sumZero(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    let sum = arr[left] + arr[right];
    if (sum == 0) {
      return [arr[left], arr[right]];
    } else if (sum > 0) {
      right--;
    } else {
      left++;
    }
  }
}

sumZero([1, 2, -2]);
// Output  [-2, 2]

sumZero([-4, -2, 0, 2, 4]);
// Output  [-4, 4]
```

### Sliding Window

- `This pattern involves creating a window which can either be an array or number from one position to another`

- `Depending on a certain condition, the window either increases or closes (and a new window is created)`
- `Very useful for keeping track of a subset of data in an array/string etc.`

### Example Problem:

Write a function called maxSubArraySum which accepts an array of integers and a number called n. The function should calculate the maximum sum of n consecutive elements in the array.

### Method 1 : Naive - Brute Force Approach

> ### Time Complexity - O(N^2)

```js
function maxSubArraySum(arr, num) {
  if (num > arr.length) {
    return null;
  }
  var max = -Infinity;
  for (let i = 0; i < arr.length - num + 1; i++) {
    temp = 0;
    for (let j = 0; j < num; j++) {
      temp += arr[i + j];
    }
    if (temp > max) {
      max = temp;
    }
  }
  return max;
}

maxSubArraySum([4, 2, 1, 6], 1);
// Output 6
maxSubArraySum([4, 2, 1, 6], 2);
// Output 7
```

### Method 2 : Refactor

> ### Time Complexity - O(N)

```js
function maxSubArraySum(arr, num) {
  let maxSum = 0;
  let tempSum = 0;
  if (arr.length < num) return null;
  for (let i = 0; i < num; i++) {
    maxSum += arr[i];
  }
  tempSum = maxSum;
  for (let i = num; i < arr.length; i++) {
    tempSum = tempSum - arr[i - num] + arr[i];
    maxSum = Math.max(maxSum, tempSum);
  }
  return maxSum;
}

maxSubArraySum([4, 2, 1, 6], 1);
// Output 6
maxSubArraySum([4, 2, 1, 6], 2);
// Output 7
```

### Divide and Conquer

- `This pattern involves dividing a data set into smaller chunks and then repeating a process with a subset of data.`

- `This pattern can tremendously decrease time complexity`

Example : Binary Search

### Example Problem:

Given a `sorted array` of integers, write a function called search, that accepts a value and returns the index where the value passed to the function is located. If the value is not found, return -1

search ([1,2,3,4,5,6],4) // 3

search([1,2,3,4,5,6], 6) // 5

search ([1,2,3,4,5,6],11) // -1

### Method 1 : Naive

> ### Time Complexity - O(N) Linear Search

```js
function search(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      return i;
    }
  }

  return -1;
}

search([1, 2, 3, 4, 5, 6], 4);
// Output 3
search([1, 2, 3, 4, 5, 6], 11);
// Output -1
```

### Method 2 : Refactor

> ### Time Complexity - Log(N) Binary Search

```js
function search(array, val) {
  let min = 0;

  let max = array.length - 1;

  while (min <= max) {
    let middle = Math.floor((min + max) / 2);
    let currentElement = array[middle];

    if (array[middle] < val) {
      min = middle + 1;
    } else if (array[middle] > val) {
      max = middle - 1;
    } else {
      return middle;
    }
  }
  return -1;
}

search([1, 2, 3, 4, 5, 6], 4);
// Output 3
search([1, 2, 3, 4, 5, 6], 11);
// Output -1
```
