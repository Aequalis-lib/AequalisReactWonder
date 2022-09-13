// example 1

function sum(arr) {
  let total = 0; // one declaration
  for (let i = 0; i < arr.length; i++) {
    // another declaration
    total += arr[i];
  }
  return total;
}

// here 2 declarations are made
// O(1)

// example 2

function double(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(2 * arr[i]);
  }
  return newArr;
}

// here n numbers are stored inside an array
// O(n) space
