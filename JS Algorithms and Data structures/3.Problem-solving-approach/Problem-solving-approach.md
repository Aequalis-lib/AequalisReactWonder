## Approach to solve the problem

### **AUTHOR : GANDHI RAJENDRAN**

---

[Click here for session video of problem solving approach](https://drive.google.com/file/d/15JHTcp01H_I02Tybz2hwmWSd8_EbNKva/view?usp=sharing)

### What is an Algorithm?

A `process` or `set of steps` to accomplish a certain task.

### Steps for Problem solving

1. Understand the Problem
2. Explore Concrete Examples
3. Break It Down
4. Solve/Simplify
5. Look Back and Refactor

### Understand the problem

1. Can I restate the problem in my own words?
2. What are the inputs that go into the problem?
3. What are the outputs that should come from the solution to the problem?
4. Can the outputs that determined from the inputs? In other words, do I have enough information to solve the problem? (You may not be able to answer question unntil you set about solving the problem. That's okay; It's still worth considering the questions at early stage.)
5. How should I label the important pieces of data that are a part of the problem?

#### Example : Write a function which takes two numbers and return their sum.

> 1. Can I restate the problem in my own words?

- Sum of two numbers

> 2. What are the inputs that go into the problem?

- Integer
- Float
- what about the string for large numbers

> 3.  What are the outputs that should come from the solution to the problem?

- Integer?
- Float?
- String?

> 4. Can the outputs that determined from the inputs? In other words, do I have enough information to solve the problem?

- If the input has one value instead of two. function returns `NaN, null or undefined`. We have to set the dafault value to params to avoid those erros.

```js
// Method 1:
const add = (num1, num2) => {
  console.log(num1 + num2);
};

add(1);
// Output : NaN

// Method 2:
const add = (num1, num2 = 0) => {
  console.log(num1 + num2);
};

add(1);
// Output : 1
add(1, 2);
// Output : 3
```

> 5.  How should I label the important pieces of data that are a part of the problem?

- Meaningful name/label for better understanding.

```js
// add function name
// num1 and num2 params name
const add = (num1, num2) => {
  return num1 + num2;
};
```

### Explore Examples:

`It understand the problem better.`

- Start with Simple Examples
- Progress to more Complex Examples
- Explore Examples with Empty Inputs
- Explore Examples with Invalid Inputs

### Problem:

#### `Write a function which takes in a string and returns count of each character in the string.`

> 1.  Understand the Problem

- Calculate the count of each character in the string

> 2. Explore Concrete Examples

```js
Example 1:
charCount("Hello");
Output : {H: 1, e: 1, l: 2, o: 1}

Example 2:
charCount("Hello hi");
Output : {`H: 1`, e: 1, l: 2, o: 1, " ": 1,`h: 1`, i: 1}
-Lowercase.
Output : {`h: 2`, e: 1, l: 2, o: 1, " ": 1, i: 1} convert to lowercase
```

> 3. Break It Down

1. make object to return at end
2. Loop over string, for each character
3. If the char is letter/number and is a key in object, add the count to one.
4. If the char is letter/number not in object, add it to object and the set value to one.
   e

   > 4. Solve/Simplify

- Solve and Simplify the problem

  > 5.  Look Back and Refactor

  - Refactor the code

### Method 1: For Loop

```js
const charCount = (str) => {
  // make object to return at end
  let obj = {};
  // Loop over string, for each character
  for (let i = 0; i < str.length; i++) {
    // let char = str[i];
    // To convert all charc to lowerCase
    let char = str[i].toLowerCase();
    // If the char is letter/number and is a key in object, add the count to one.
    if (obj[char] > 0) {
      obj[char]++;
    }
    // If the char is letter/number not in object, add it to object and the set value to one.
    else {
      obj[char] = 1;
    }
  }
  //   If character is something else space,symbols don't do anything
  // return object at end
  return obj;
};

charCount("Hello");
// Output {H: 1, e: 1, l: 2, o: 1}

charCount("Hello hi");
// Output {H: 1, e: 1, l: 2, o: 1, " ": 1,h: 1, i: 1}
// Output {h: 2, e: 1, l: 2, o: 1, " ": 1, i: 1} convert all char to lowercase
```

### Refactor Questions:

- Can you check the result?
- Can you derive the result differently?
- Can you undersatnd it at a glance?
- Can you use the result or method for some other problem?
- Can you improve the performance of your solution?
- Can you think of other ways to refactor?
- How have other people solved this problem?

### Method 2: Using Regex

`Purpose of using regex to avoid spacing and special characters.`

```js
const charCount = (str) => {
  let obj = {};
  for (var char of str) {
    char = char.toLowerCase();
    if (/[a-z0-9]/.test(char)) {
      obj[char] = ++obj[char] || 1;
    }
  }
  return obj;
};

charCount("Hello hi");
// output {h: 2, e: 1, l: 2, o: 1, i: 1}
```

### Method 3: Using charCode

> Better performance than other methods.

```js
const isAlphaNumeric = (char) => {
  let code = char.charCodeAt(0);
  if (
    !(code > 47 && code < 58) && //numeric (0-9)
    !(code > 64 && code < 91) && //Upper alpha (A-Z)
    !(code > 96 && code < 123) //Lower alpha (A-Z)
  ) {
    return false;
  }
  return true;
};

const charCount = (str) => {
  let obj = {};
  for (var char of str) {
    if (isAlphaNumeric(char)) {
      char = char.toLowerCase();
      obj[char] = ++obj[char] || 1;
    }
  }
  return obj;
};

charCount("Hello");
//Output {h: 1, e: 1, l: 2, o: 1}
charCount("Hello hi");
//output {h: 2, e: 1, l: 2, o: 1, i: 1}
```

### Performance Comparison between Regex vs charCode:

![Performance Comparison between Regex vs charCode](./Images/Screenshot%20from%202022-09-15%2011-52-37.png)
