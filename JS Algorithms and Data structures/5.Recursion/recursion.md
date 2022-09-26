# Recursion

### _AUTHOR : YESUDOSS Y_

---

[Click here for session video of recursion](https://drive.google.com/file/d/1fczfhAQTet-lZeS6zw0OtnWhvfySjwFo/view?usp=sharing)

`Recursion is a process of calling itself. A function that calls itself is called a recursive function. `

```js
function recurse() {
  // function code
  recurse();
  // function code
}

recurse();
```

`A recursive function must have a condition to stop calling itself. Otherwise, the function is called indefinitely.`

```js
function recurse() {
  if (condition) {
    return;
  } else {
    //other conditions
    recurse();
  }
}

recurse();
```

## Objectives

- define how recursion can be used
- understand basecase and differentinput
- visualize callstack to better debug
- helper method recursion and pure recursion

## why we need to know this

- It is everywhere
- better problem solving in DOM traversal algorithms and object traversal

- sometimes cleaner and alternative to iteration

## call stack

- Almost all programming languages has built in data structure that manages what happens when function are invoked
- JS has a data structure called call stack
- any time function invoked, it is placed on top of the call stack
- when JS sees the return keyword (or) when the function is end, the compiler will remove (pop)

## how it works

- invoke the same function with diffent input until you reach your `base case`

```js
function sumRange(num) {
  if (num === 1) return 1;
  return num + sumRange(num - 1);
}
sumrange(3);
// ans 6
// returnn 3 + sumRange(2)
// return 2 + sumRange(1)
// return 1
```

## Common pitfalls

- no base case
- forgetting to return (or) returning the wrong thing
- stack overflow

## Helper method recursion

```js
function CollectOddValues(arr) {
  let result = [];

  function helper(helperInput) {
    if (helperInput.length === 0) {
      return;
    }
    if (helperInput[0] % 2 !== 0) {
      result.push(helperInput[0]);
    }
    helper(helperInput.slice(1));
  }

  helper(arr);
  return result;
}

collectOddValues([1, 2, 3, 4, 5, 6, 7, 8, 9]);
```

## pure recursion

```js
function CollectOddValues(arr) {
  let newArr = [];
  if (arr.length === 0) {
    return newArr;
  }
  if (arr[0] % 2 !== 0) {
    newArr.push(arr[0]);
  }
  let myArr = newArr.concat(CollectOddValues(arr.slice(1)));

  console.log(myArr);
}

CollectOddValues([1, 2, 3, 4, 5]);

//[1].concat(CollectOddValues(2,3,4,5))
//[].concat(CollectOddValues(3,4,5))
//[3].concat(CollectOddValues(4,5))
//[].concat(CollectOddValues(5))
//[5].concat(CollectOddValues())
```
