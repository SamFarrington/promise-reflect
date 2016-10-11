# promise-reflect

## Description
A simple function that forces a promise to resolve, returning an object that indicates the actual promise status and the underlying object returned from the original promise.


````javascript
//If underlying promise resolves
{
  "data": {
     //Object returned by underlying promise
  },
  "status":"resolved"
}

//If underlying promise rejects
{
  "error": {
     //Object returned by underlying promise
  },
  "status":"rejected"
}
````

## Inspiration
The reason for this functionallity to to augment [Promise.all(...)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
) to allow for some promises to reject without losing the data returned from those that succeeded.

See the following StackOverflow post:
http://stackoverflow.com/questions/31424561/wait-until-all-es6-promises-complete-even-rejected-promises

## Example Usage
const promiseReflect = require('promise-reflect');

let p1 = new Promise((resolve, reject) => { 
  setTimeout(resolve, 1000, "one"); 
}); 
let p2 = new Promise((resolve, reject) => { 
  setTimeout(resolve, 2000, "two"); 
});
let p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, "three");
});
let p4 = new Promise((resolve, reject) => {
  setTimeout(resolve, 4000, "four");
});
let p5 = new Promise((resolve, reject) => {
  reject("reject");
});

let promisesArray = [p1,p2,p3,p4,p5]

Promise.all(promisesArray.map(promiseReflect).then(values => { 
  let resolved = values.filter(value => value.status ==='resolved');
  let rejected = values.filter(value => value.status ==='rejected');
  console.log(`Values: ${JSON.stringify(values)});

}). reason => {
  console.log(reason)
});



##Credit
The logic in this package is heavily based upon the question response by Benjamin Gruenbaum seen here:
http://stackoverflow.com/a/31424853/3164844
