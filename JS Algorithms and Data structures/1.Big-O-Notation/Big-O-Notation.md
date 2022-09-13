# Big O Notation

[Click here for Big-O-Notation session video](https://drive.google.com/file/d/1LJRAkAYpATLprMGbp9q-pVut2_yXJBYF/view?usp=sharing)

[click here to view the examples with graph](https://rithmschool.github.io/function-timer-demo/)

### what is Big O Notation

- Big O Notation is a way to measure an algorithm's efficiency.
- It measures the time it takes to run your function as the input grows. Or in other words, how well does the function scale.
- There are two parts to measuring efficiency
  - time complexity
  - space complexity.

### why we need to now Big O Notation

- imagine we have multiple implementation methods of a same function, how can we determine which is the best. With big o notation we can find which is best.

## Time complexity

### Example 1 :

```javascript
//  A simple function
function addUpto(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}
```

#### It contains

- n addition
- n assignments
- n comparisons
- Depending upon the value of n, n operations will be carried out in this function
- number of operations is(eventualy) bounded by the multiple of n, so 5n + 2
- if the input grows the runtime of the operation will also grows

### Example 2 :

```javascript
//  A simple function
function addUpto(n) {
  return (n * (n + 1)) / 2;
}
```

#### It contains

- Always 3 operations O(1)
- 1 multiplication
- 1 division
- 1 division
- Even the input grows the runtime of the operation will only vary a little.

### Example 3 :

```javascript
//  A simple function
function printAllPairs(n) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      console.log(i, j);
    }
  }
}
```

#### It contains

- this function contains a loop inside a loop,so O(n^2)
- n number of operations inside n numbers of operations
- As input grows runtime will grow exponenitally.

## Space Complexity

- As the n grows, the size of the input will also grow
- the term auxiliary space complexity refers to space required by the algorithm, not including space taken up by the inputs.

### Example 1

```javascript
// A simple function
function sum(arr) {
  let total = 0; // one declaration
  for (let i = 0; i < arr.length; i++) {
    // one declaration
    total += arr[i];
  }
  return total;
}
```

- here 2 declarations are made
- O(1)

### Example 2

```javascript
// A simple function
function double(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(2 * arr[i]);
  }
  return newArr;
}
```

- here n numbers are stored inside an array
- O(n) space

### space complexity in js

- Most primitives (boolean, numbers, undefined, null) are constant space
- Strings require O(n) space (where n is the string length)
- Reference tyes are generally O(n), where n is the length (for arrays) or the number of keys (for objects).

## Big O Definition

we say than an algorithm is O(f(n)) if the number of simple operations the computer has to do is eventually less than a constant times f(n), as n increases

1. f(n) could be linear (f(n)= n)
2. f(n) could be constant (f(n)= 1)
3. f(n) could be quadratic (f(n)= n^2)
4. f(n) could be something entirely different.

## Big O Shorthand

(run time is constant if)

1. Arithmetic operations are constant
2. variable assignment is constant
3. Accessing elements in an array (by index) or object (by key) is constant

#### In a loop, the complexity is the length of the loop times the complexity of whatever happens inside of the loop.

## Logarithms

#### what a log?

A logarithm is the power to which a number must be raised in order to get some other number. for example, the base ten logarithm of 100 is 2, because ten raised to the power of two is 100,

- log 100 = 2. -> 10^2 = 100
- log(3)8 = 3. -> 2^3 = 8
