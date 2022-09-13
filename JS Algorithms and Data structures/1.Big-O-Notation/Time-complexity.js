// how can we find which method is better
//  1. faster.
//  2. less memory-intensive.
//  3. More-readable.

//example 1
function addUpto(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}
console.log(addUpto(10));

// let t1 = performance.now();
// addUpto(1000000000);
// let t2 = performance.now();
// console.log(`Time Elapsed : ${(t2 - t1) / 1000} seconds.`);

// //example 2
function addUpto2(n) {
  return (n * (n + 1)) / 2;
}
console.log(addUpto2(10));

// let time1 = performance.now();
// addUpto2(1000000000);
// let time2 = performance.now();
// console.log(`Time Elapsed : ${(time2 - time1) / 1000} seconds.`);
