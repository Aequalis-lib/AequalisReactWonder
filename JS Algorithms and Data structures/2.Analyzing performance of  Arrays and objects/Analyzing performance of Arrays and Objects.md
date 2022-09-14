# __Analyzing Performance Of Arrays & Objects__

### __AUTHOR : R.GOWTHAM__
---
## __Objects__

* An Object is a collection of Key , Value Pairs  
* Key, Value Pairs also combined to known as __`Properties`__

## __Properties__

* Properties are the values associated with a JavaScript object.

* A JavaScript object is a collection of __unordered properties__.

* Properties can usually be changed, added, and deleted, but some are read only.
```javascript
    const person = {
        firstName:"Jackie", // property 1
        lastName:"Chan"     // property 2
    }
```
## __Objects-Big-O__

* Big-O calculation is for the __`Time Complexity`__.


* We can calculate Big-O for Objects based upon their inbuild  Methods.

  * Accessing Object Properties
  * Searching Object Properties
  * Insertion of Object Properties
  * Removal of Object Properties
---

>## __Access__

* Using a given key , finding the corresponding value
```js
   console.log(person.firstName)
```
### __`Big-O Calculation`__

* Here we using the __`Single key`__ to access the object property.

* It is __quite quick__.
* This method __doesn't depends__ upon the __other properties__ in the objects.

* Hence we can say the Big-O is  __` O(1) `__
>  __O(1)__ - __`Constant Time Complexity`__
* which means the time __remains constant for various inputs__
---
>## __Search__

* We can search object by it's __both__ __`Keys & Values`__

 ```js

 person.hasOwnProperty("firstName") 

 Object.values(person).includes("Chan") 

 // Both returns true 

 ```

### __`Big-O Calculation`__

>__Search__ by __`Key`__

* Searching for __Key__ can be __very fast__ and be __`O(1)`__.
* Because we searching by __`Single Key`__.

>__Search__ by __`Value`__
* Searching by __Value__ will be __iterate all values__ in object and __then finds the match__.
* And it depends on the __`All Object Values`__.
* Hence the the Big-O will be __`O(n)`__

>  __O(n)__ - __`Linear Time Complexity`__

* which means the time __changes Linear to the various inputs__
---
>## __Insertion__

* We can __`add`__ new property to the object, by Specifying the __`Property Name`__

```js
  person.movie = "CZ12" // adding property
```

### __`Big-O Calculation`__

* Here we are using __`Single Key`__ to add new property.
* Hence the Big-O is __`O(1)`__.

---
>## __Removal__

* We can __`remove`__ a property from the object, by Specifying the __`Property Name`__

```js
  delete person.movie  // deleting property
```

### __`Big-O Calculation`__

* Here we are using __`Single Key`__ to delete a property.
* Hence the Big-O is __`O(1)`__.
---
>## __Other Object Methods__ 
    1. Object.keys() - returns all keys.
    2. Object.Values() - returns all values.
    3. Object.entries() - returns all properties.

### __`Big-O Calculation`__
* The above mentioned three methods are all __depends upon__  __`All the Object Values`__ 

* Hence the Big-O is __`O(n)`__ for all three.
---
## __Arrays__

* An array is an __ordered collection of values__.
* This is __main difference__ when  __compared to Objects__.

```js
    let integers = [1,2,3,4,5,6,7]
```
* __JavaScript__ automatically __index an array__ staring by __`0`__
* It is important to maintain the __index__ while performing an operation.
---
### __Big-O-Calculation__ 
    
* __`Inserting & Removing`__ an __element__ at the __end of array__ will __"not affect the index"__ .
 Hence the __Big-O__ of __`Array.push()`__ & __`Array.pop()`__ methods is __`O(1)`__.
       
* __`Inserting & Removing`__ an __element__ at the __beginning of array__ will __"affect the index"__ .__JS__ will've to __"re-assign index to each element"__.
 Hence the __Big-O__ of __`Array.shift()`__ & __`Array.unshift()`__ methods is __`O(n)`__.
       
---
>### __Searching Methods__

```js
Array.find(findFunction)
```
      

* This method __returns the first match__ in an array.
* The __matching element__ can be the __last one in array__.
* So, it has to __iterate all__ the elements.
* Hence the __`Big-O`__ is __`O(n)`__
```js
Array.includes()
```            
      

* This method __returns the index of first match__ in an array.
* The __matching element__ can be the __last one in array__.
* So, it has to __iterate all__ the elements.
* Hence the __`Big-O`__ is __`O(n)`__
---
>### __Common Methods & Time Complexities__

|  __METHOD__ | __BIG-O__ |__REASON__|
| :---------: | :-------: |:--------:|
| Array.concat( ) | `O(n)`| Depends on all elements |
| Array.splice( ) | `O(n)` |Depends  on all index|
| Array.slice( ) | `O(n)` |Depends on all index|
| Array.filter( ) | `O(n)` |Depends on all elements|
| Array.forEach( ) | `O(n)` |Depends on all elements|
| Array.map( ) | `O(n)` |Depends on all elements|
| Array.reduce( ) | `O(n)` |Depends on all elements|
| Array.reverse( ) | `O(n)` |Depends on all index|
| Array.sort( ) | `O(n)` |Depends on all elements|



![Big-O-Notation](https://miro.medium.com/max/700/1*yiyfZodqXNwMouC0-B0Wlg.png)

> ### __Use of .forEach() & .filter()__
```js
function callbackFor(v) {
  return function(err) { /* something with v */ };
}
for(var i = 0; i < length; i++) {
  var variable = variables[i];
  otherVariable.doSomething(callbackFor(variable));
}
```
* The above mentioned function will be __O(n^2)__ `(i.e)` __Quadratic Time Complexity__.
* To avoid this we have to use __.forEach() & .filter()__ methods.

>## __Conclusion__

* __`Objects are fast`__ 

