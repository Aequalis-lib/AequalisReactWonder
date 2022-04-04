
# Introduction to lodash

  Lodash is a JavaScript utility library  used for helping developers manipulate complex data structures. Lodash provides a variety of functions for manipulating arrays, objects, strings, and numbers.

- ##### Why you should use Lodash

   when I handle nested array or objects. By using functions supported by Lodash, you can chain the Lodash functions so you can perform complicated array or objects manipulations easily. This can lead your code to have more modularity with less code when you need to deal with a complex data structure.

##### Installation

In a browser:

```javascript
<script src="lodash.js"></script>
```

Using npm:

```javascript
npm i -g npm
npm i --save lodash
```

### Array some topics

- #### Chunk

  Creates an array of elements split into groups the length of size. If array can't be split evenly, the final chunk will be the remaining elements.
  
  ```javascript
    _.chunk(array, [size=1])
  ```

  example:

  ```javascript
    _.chunk(['a', 'b', 'c', 'd'], 2);
    // => [['a', 'b'], ['c', 'd']]
 
    _.chunk(['a', 'b', 'c', 'd'], 3);
    // => [['a', 'b', 'c'], ['d']]
  ```

- #### Compact

  Creates an array with all falsey values removed. The values false, null, 0, "", undefined, and NaN are falsey.

  ```javascript
   _.compact(array)
  ```

  example:

  ```javascript
    _.compact([0, 1, false, 2, '', 3]);
    // => [1, 2, 3]
  ```

- #### Difference

  Creates an array of array values not included in the other given arrays using SameValueZero for equality comparisons. The order and references of result values are determined by the first array.

  ```javascript
   _.difference(array, [values])
  ```

  example:

  ```javascript
    _.difference([2, 1], [2, 3]);
    // => [1]
  ```

- #### DifferenceBy

This method is like _.difference except that it accepts iteratee which is invoked for each element of array and values to generate the criterion by which they're compared. The order and references of result values are determined by the first array. The iteratee is invoked with one argument:
`(value).

  ```javascript
   _.difference(array, [values])
  ```

  example:

  ```javascript
    _.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
    // => [1.2]
 
    _.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
    // => [{ 'x': 2 }]
  ```

- #### DifferenceWith

This method is like _.difference except that it accepts comparator which is invoked to compare elements of array to values. The order and references of result values are determined by the first array.

  ```javascript
   _.differenceWith(array, [values], [comparator])
  ```

  example:

  ```javascript
    var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
 
    _.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual);
    // => [{ 'x': 2, 'y': 1 }]
  ```

- #### Drop

Creates a slice of array with n elements dropped from the beginning.

  ```javascript
   _.drop(array, [n=1])
  ```

  example:

  ```javascript
    _.drop([1, 2, 3]);
    // => [2, 3]
 
    _.drop([1, 2, 3], 2);
    // => [3]
 
    _.drop([1, 2, 3], 5);
    // => []
 
    _.drop([1, 2, 3], 0);
    // => [1, 2, 3]
  ```

- #### DropRight

Creates a slice of array with n elements dropped from the end.

  ```javascript
   _.dropRight(array, [n=1])
  ```

  example:

  ```javascript
    _.dropRight([1, 2, 3]);
    // => [1, 2]
 
    _.dropRight([1, 2, 3], 2);
    // => [1]
 
    _.dropRight([1, 2, 3], 5);
    // => []
 
    _.dropRight([1, 2, 3], 0);
    // => [1, 2, 3]
  ```

- #### DropWhile

Creates a slice of array excluding elements dropped from the beginning. Elements are dropped until predicate returns falsey. The predicate is invoked with three arguments: (value, index, array).

  ```javascript
   _.dropWhile(array, [predicate=_.identity])
  ```

  example:

  ```javascript
var users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': true }
];
 
_.dropWhile(users, { 'user': 'barney', 'active': false });
// => objects for ['fred', 'pebbles']
 
_.dropWhile(users, ['active', false]);
// => objects for ['pebbles']
  ```

- #### First --> head & last

  - Gets the first element of array.
  - Gets the last element of array.

  ```javascript
   _.head(array)
   
   _.last(array)
  ```

  example:

  ```javascript
    _.head([1, 2, 3]);
    // => 1
    _.last([1, 2, 3]);
    // => 3
  ```

- #### indexOf & lastIndexOf

  - Gets the index at which the first occurrence of value is found in array using SameValueZero for equality comparisons. If fromIndex is negative, it's used as the offset from the end of array.
  - This method is like _.indexOf except that it iterates over elements of array from right to left.

  ```javascript
   _.indexOf(array, value, [fromIndex=0])

   _.lastIndexOf(array, value, [fromIndex=array.length-1])
  ```

  example:

  ```javascript
    _.indexOf([1, 2, 3, 4], 3);
    // => 2
   _.lastIndexOf([4, 3, 1, 2], 1);
    // => 2
  ```

- #### nth

Gets the element at index n of array. If n is negative, the nth element from the end is returned.

  ```javascript
  _.nth(array, [n=0])
  ```

  example:

  ```javascript
    var array = ['a', 'b', 'c', 'd'];
 
    _.nth(array, 1);
    // => 'b'
 
    _.nth(array, -2);
    // => 'c';
  ```

- #### reverse

Reverses array so that the first element becomes the last, the second element becomes the second to last, and so on.

  ```javascript
  _.reverse(array)
  ```

  example:

  ```javascript
    var array = [1, 2, 3];
 
    _.reverse(array);
    // => [3, 2, 1]
 
  ```

- #### slice

Creates a slice of array from start up to, but not including, end.

  ```javascript
  _.slice(array, [start=0], [end=array.length])
  ```

  example:

  ```javascript
    let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    let c1 = _.slice(nums, 2, 6);
    console.log(c1);

    let c2 = _.slice(nums, 0, 8);
    console.log(c2);
  ```

- #### uniq

Creates a duplicate-free version of an array, using SameValueZero for equality comparisons, in which only the first occurrence of each element is kept. The order of result values is determined by the order they occur in the array.

  ```javascript
  _.uniq(array)
  ```

  example:

  ```javascript
    _.uniq([2, 1, 2]);
    // => [2, 1]
  ```

- #### uniqBy

This method is like _.uniq except that it accepts iteratee which is invoked for each element in array to generate the criterion by which uniqueness is computed. The order of result values is determined by the order they occur in the array.

  ```javascript
  _.uniqBy(array, [iteratee=_.identity])
  ```

  example:

  ```javascript
    _.uniqBy([2.1, 1.2, 2.3], Math.floor);
    // => [2.1, 1.2]
 
    _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
    // => [{ 'x': 1 }, { 'x': 2 }]
  ```

- #### uniqWith

This method is like _.uniq except that it accepts comparator which is invoked to compare elements of array. The order of result values is determined by the order they occur in the array.The comparator is invoked with two arguments: (arrVal, othVal).

  ```javascript
  _.uniqWith(array, [comparator])
  ```

  example:

  ```javascript
    var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }];
 
    _.uniqWith(objects, _.isEqual);
    // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
  ```

### Collection some topics

- #### countBy

Creates an object composed of keys generated from the results of running each element of collection thru iteratee. The corresponding value of each key is the number of times the key was returned by iteratee. The iteratee is invoked with one argument: (value).
  
  ```javascript
   _.countBy(collection, [iteratee=_.identity])
  ```

  example:

  ```javascript
    _.countBy([6.1, 4.2, 6.3], Math.floor);
    // => { '4': 1, '6': 2 }
 
    _.countBy(['one', 'two', 'three'],'length');
    // => { '3': 2, '5': 1 }
  ```

- #### each -> forEach

Iterates over elements of collection and invokes iteratee for each element. The iteratee is invoked with three arguments: (value, index|key, collection). Iteratee functions may exit iteration early by explicitly returning false.
  
  ```javascript
  _.forEach(collection, [iteratee=_.identity])
  ```

  example:

  ```javascript
    _.forEach([1, 2], function(value) {
    console.log(value);
    });
    // => Logs `1` then `2`.
 
    _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
    console.log(key);
    });
    // => Logs 'a' then 'b'
  ```

- #### eachRight -> forEachRight

This method is like _.forEach except that it iterates over elements of collection from right to left.
  
  ```javascript
  _.forEachRight(collection, [iteratee=_.identity])
  ```

  example:

  ```javascript
    _.forEachRight([1, 2], function(value) {
    console.log(value);
    });
    // => Logs `2` then `1`.
  ```

- #### filter

Iterates over elements of collection, returning an array of all elements predicate returns truthy for. The predicate is invoked with three arguments: (value, index|key, collection).
  
  ```javascript
  _.filter(collection, [predicate=_.identity])
  ```

  example:

  ```javascript
var users = [
  { 'user': 'barney', 'age': 36, 'active': true },
  { 'user': 'fred',   'age': 40, 'active': false }
];
 
_.filter(users, function(o) { return !o.active; });
// => objects for ['fred']
 
_.filter(users, { 'age': 36, 'active': true });
// => objects for ['barney']
 
_.filter(users, ['active', false]);
// => objects for ['fred']
 
_.filter(users, 'active');
// => objects for ['barney']
  ```

- #### find

Iterates over elements of collection, returning the first element predicate returns truthy for. The predicate is invoked with three arguments: (value, index|key, collection).
  
  ```javascript
  _.find(collection, [predicate=_.identity], [fromIndex=0])
  ```

  example:

  ```javascript
var users = [
  { 'user': 'barney',  'age': 36, 'active': true },
  { 'user': 'fred',    'age': 40, 'active': false },
  { 'user': 'pebbles', 'age': 1,  'active': true }
];
 
_.find(users, function(o) { return o.age < 40; });
// => object for 'barney'
 
_.find(users, { 'age': 1, 'active': true });
// => object for 'pebbles'
 
_.find(users, ['active', false]);
// => object for 'fred'

_.find(users, 'active');
// => object for 'barney'
  ```

- #### groupBy

Creates an object composed of keys generated from the results of running each element of collection thru iteratee. The order of grouped values is determined by the order they occur in collection. The corresponding value of each key is an array of elements responsible for generating the key. The iteratee is invoked with one argument: (value).
  
  ```javascript
_.groupBy(collection, [iteratee=_.identity])
  ```

  example:

  ```javascript
_.groupBy([6.1, 4.2, 6.3], Math.floor);
// => { '4': [4.2], '6': [6.1, 6.3] }
 
// The `_.property` iteratee shorthand.
_.groupBy(['one', 'two', 'three'], 'length');
// => { '3': ['one', 'two'], '5': ['three'] }
  ```

- #### map

Creates an array of values by running each element in collection thru iteratee. The iteratee is invoked with three arguments:
(value, index|key, collection).

  ```javascript
    _.map(collection, [iteratee=_.identity])
  ```

  example:

  ```javascript
var users = [
  { 'user': 'barney',"id": 1 },
  { 'user': 'fred' ,"id": 2}
];
 
_.map(users, 'user');
// => ['barney', 'fred']

function square(n) {
  return n * n;
}
 
_.map([4, 8], square);
// => [16, 64]
  ```

- #### orderBy

This method is like _.sortBy except that it allows specifying the sort orders of the iteratees to sort by. If orders is unspecified, all values are sorted in ascending order. Otherwise, specify an order of "desc" for descending or "asc" for ascending sort order of corresponding values.

  ```javascript
    _.orderBy(collection, [iteratees=[_.identity]], [orders])
  ```

  example:

  ```javascript
var users = [
  { 'user': 'fred',   'age': 48 },
  { 'user': 'barney', 'age': 34 },
  { 'user': 'fred',   'age': 40 },
  { 'user': 'barney', 'age': 36 }
];

// Sort by `user` in ascending order and by `age` in descending order.
_.orderBy(users, ['user', 'age'], ['asc', 'desc']);
// => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
  ```

- #### shuffle

Creates an array of shuffled values, using a version of the Fisher-Yates shuffle.

  ```javascript
   _.shuffle(collection)
  ```

  example:

  ```javascript
_.shuffle([1, 2, 3, 4]);
// => [4, 1, 3, 2]

let words = ['sky', 'wood', 'forest', 'falcon',
    'pear', 'ocean', 'universe'];

console.log(_.shuffle(words));
console.log(_.shuffle(words));
  ```

- #### size

Gets the size of collection by returning its length for array-like values or the number of own enumerable string keyed properties for objects.

  ```javascript
   _.size(collection)
  ```

  example:

  ```javascript
_.size([1, 2, 3]);
// => 3
 
_.size({ 'a': 1, 'b': 2 });
// => 2
 
_.size('pebbles');
// => 7
  ```

- #### sortBy

Creates an array of elements, sorted in ascending order by the results of running each element in a collection thru each iteratee. This method performs a stable sort, that is, it preserves the original sort order of equal elements. The iteratees are invoked with one argument: (value).

  ```javascript
   _.sortBy(collection, [iteratees=[_.identity]])
  ```

  example:

  ```javascript
var users = [
  { 'user': 'fred',   'age': 48 },
  { 'user': 'barney', 'age': 36 },
  { 'user': 'fred',   'age': 40 },
  { 'user': 'barney', 'age': 34 }
];
 
_.sortBy(users, [function(o) { return o.user; }]);
// => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 
_.sortBy(users, ['user', 'age']);
// => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
  ```

### function some topics

- #### times

Invokes the iteratee n times, returning an array of the results of each invocation. The iteratee is invoked with one argument; (index).
  
  ```javascript
  _.times(n, [iteratee=_.identity]))
  ```

  example:

  ```javascript
  _.times(4, ()=> "test");
  or
_.times(4, () => {
    console.log("logesh");
    return "logesh"
})
  ```

- #### delay

Invokes func after wait milliseconds. Any additional arguments are provided to func when it's invoked.

  ```javascript
  _.delay(func, wait, [args])
  ```

  example:

  ```javascript
_.delay(function(text) {
  console.log(text);
}, 1000, 'later');
  ```

### lang some topics

- #### clone

Creates a shallow clone of value.

  ```javascript
  _.clone(value)
  ```

  example:

  ```javascript
var objects = [{ 'a': 1 }, { 'b': 2 }];
 
var shallow = _.clone(objects);
console.log(shallow[0] === objects[0]);
console.log(shallow);
// => true
  ```

- ####  greater than & greater than or equal

Checks if value is greater than other.
Checks if value is greater than or equal to other.

  ```javascript
  _.gt(value, other)

  _.gte(value, other)
  ```

  example:

  ```javascript
  //greater than
_.gt(3, 1);
// => true
 
_.gt(3, 3);
// => false
 
_.gt(1, 3);
// => false

// greater than or equal
_.gte(3, 1);
// => true
 
_.gte(3, 3);
// => true
 
_.gte(1, 3);
// => false
  ```

- ####  less than & less than or equal

Checks if value is less than other.
Checks if value is less than or equal to other.

  ```javascript
  _.lt(value, other)

  _.lte(value, other)
  ```

  example:

  ```javascript
  //less than
_.lt(1, 3);
// => true
 
_.lt(3, 3);
// => false
 
_.lt(3, 1);
// => false

// less than or equal
_.lte(1, 3);
// => true
 
_.lte(3, 3);
// => true
 
_.lte(3, 1);
// => false
  ```

- ####  isArray, isNumber, isString & isObject
  - Checks if value is classified as an Array object.
  - Checks if value is classified as a Number primitive or object.
  - Checks if value is classified as a String primitive or object.
  - Checks if value is the language type of Object. (e.g. arrays, functions, objects, regexes, new Number(0), and new String(''))

  ```javascript
    _.isArray(value)
    _.isNumber(value)
    _.isString(value)
    _.isObject(value)
  ```

  example:

  ```javascript
    let vals = [1,'good', [1, 2], {name: 'logesh', age: 23}];

    vals.forEach( (e) => {

    if (_.isNumber(e)) {
        console.log(`${e} is a number`);
    }

    if (_.isString(e)) {
        console.log(JSON.stringify(e) + ' is a string');
    }

    if (_.isArray(e)) {
        console.log(JSON.stringify(e) + ' is an array');
    }

    if (_.isObject(e)) {
        console.log(JSON.stringify(e) + ' is an object');
    }

});
  ```

- #### toArray, toInteger, toNumber, toString
  - Converts value to an array.
  - Converts value to an integer.
  - Converts value to a number.
  - Converts value to a string. An empty string is returned for null and undefined values. The sign of -0 is preserved.

```javascript
_.toArray(value)
_.toInteger(value)
_.toNumber(value)
_.toString(value)
```

  example:

```javascript  
    _.toArray({ 'a': 1, 'b': 2 });
    // => [1, 2]
    _.toArray('abc');
    // => ['a', 'b', 'c'] 

    _.toInteger(3.2);
    // => 3
    _.toInteger('3.2');
    // => 3

    _.toNumber(3.2);
    // => 3.2
    _.toNumber('3.2');
    // => 3.2

    _.toString(null);
    // => ''
    _.toString([1, 2, 3]);
    // => '1,2,3'
```

- #### isEqual

Performs a deep comparison between two values to determine if they are equivalent.

  ```javascript
  _.isEqual(value, other)
  ```

  example:

  ```javascript
var object = { 'a': 1 };
var other = { 'a': 1 };
 
_.isEqual(object, other);
// => true
  ```

### Math some topics

- #### add, subtract, multiply, divide  

  ```javascript
  _.add(number, number)
  _.subtract(number, number)
  _.multiply(multiplier, multiplicand)
  _.divide(dividend, divisor)
  ```

example:

```javascript
_.add(6, 4);
// => 10
_.subtract(6, 4);
// => 2
_.multiply(6, 4);
// => 24
_.divide(12, 4);
// => 3
```

- #### sum  

Computes the sum of the values in array.

```javascript
_.sum(array)
```

example:

```javascript
_.sum([4, 2, 8, 6]);
// => 20
```

- #### round  

Computes number rounded to precision.

```javascript
_.round(number, [precision=0])
```

example:

```javascript
_.round(4.006);
// => 4
 
_.round(4.006, 2);
// => 4.01
```

- #### max & min  

Computes the maximum value of array. If array is empty or falsey, undefined is returned.

Computes the minimum value of array. If array is empty or falsey, undefined is returned.

```javascript
_.max(array)
_.min(array)
```

example:

```javascript
_.max([4, 2, 8, 6]);
// => 8
 
_.min([4, 2, 8, 6]);
// => 2
```

- #### inRange  

Checks if n is between start and up to, but not including, end. If end is not specified, it's set to start with start then set to 0. If start is greater than end the params are swapped to support negative ranges.

```javascript
_.inRange(number, [start=0], end)
```

example:

```javascript
_.inRange(4, 8);
// => true
 
_.inRange(1.2, 2);
// => true

_.inRange(5.2, 4);
// => false
```

- #### random  

Checks if n is between start and up to, but not including, end. If end is not specified, it's set to start with start then set to 0. If start is greater than end the params are swapped to support negative ranges.

```javascript
_.inRange(number, [start=0], end)
```

example:

```javascript
_.random(1000, 10000);
// => 2946

_.random(10, 100);
// =>18

_.random(1.2, 5.2);
// =>2.4029343441336755
```

### Object some topics

- #### at

Creates an array of values corresponding to paths of object.

```javascript
  _.at(object, [paths])
```

example:

```javascript
let users = [
  { id: 1, name: 'logesh', about: { 'age': 23, 'colours': ['red', 'green'] } },
  { id: 2, name: 'dhanraj', about: { 'age': 22, 'colours': ['blue'] } },
];
let name = _.at(users[1], 'name');
console.log(name);

let colour = _.at(users[0], 'about.colours[0]');
console.log(colour);
```

- #### keys

Creates an array of the own enumerable property names of object.

```javascript
  _.keys(object)
```

example:

```javascript
let user =  { id: 1, name: 'logesh', about: { 'age': 23, 'colours': ['red', 'green'] } }

_.keys(users[0]);
//=> ["id", "name", "about"]
```

- #### values

Creates an array of the own enumerable string keyed property values of object.

```javascript
  _.values(object)
```

example:

```javascript
let user =  { id: 1, name: 'logesh', about: { 'age': 23, 'colours': ['red', 'green'] } }

_.values(user);
```

- #### toPairs

Creates an array of own enumerable string keyed-value pairs for object which can be consumed by _.fromPairs. If object is a map or set, its entries are return

```javascript
 _.toPairs(object)
```

example:

```javascript
 let user =  { id: 1, name: 'logesh' }

_.toPairs(user);
//=> [["id", 1], ["name", "logesh"]]
```

- #### set & get

Sets the value at path of object. If a portion of path doesn't exist, it's created. Arrays are created for missing index properties while objects are created for all other missing properties. Use _.setWith to customize path creation.

Gets the value at path of object. If the resolved value is undefined, the defaultValue is returned in its place.

```javascript
 _.set(object, path, value)

 _.get(object, path, [defaultValue])
```

example:

```javascript
 let user =  { id: 1, name: 'logesh',age: 12 }

_.set(user, "age", 23);
//=> {id: 1, name: "logesh", age: 23}

_.get(data, "name"));

//=>logesh
_.get(data);
//=> {id: 1, name: "logesh", age: 23}
```

- #### omit

Creates an object composed of the own and inherited enumerable property paths of object that are not omitted.

```javascript
_.omit(object, [paths])
```

example:

```javascript
 let user =  { id: 1, name: 'logesh',age: 12 }

 _.omit(user, 'age');
//=> {id: 1, name: "logesh"}
  ```

- #### pick

Creates an object composed of the picked object properties.

```javascript
_.pick(object, [paths])
```

example:

```javascript
 let user =  { id: 1, name: 'logesh',age: 12 }

 _.pick(user, 'age','name');
//=> {age: 12, name: "logesh"}
```
