'use strict'

let promiseReflect = require('../promise-reflect');

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
  reject("reject-one");
});
let p6 = new Promise((resolve, reject) => {
  reject("reject-two");
});

let promisesArray = [p1, p2, p3, p4, p5, p6]

Promise.all(promisesArray.map(promiseReflect))
    .then(values => {
      let resolved = values.filter(value => value.status === 'resolved');
      let rejected = values.filter(value => value.status === 'rejected');
      console.log(`Values: ${JSON.stringify(values)}`);
      console.log(`Resolved: ${JSON.stringify(resolved)}`);
      console.log(`Rejected: ${JSON.stringify(rejected)}`);
    })
    .catch(reason => {
      console.log(`Shouldn't get here as all promises resolve when put through promise-reflect`);
    });

// Output
// Values: [{"data":"one","status":"resolved"},{"data":"two","status":"resolved"},{"data":"three","status":"resolved"},{"data":"four","status":"resolved"},{"error":"reject-one","status":"rejected"},{"error":"reject-two","status":"rejected"}]
// Resolved: [{"data":"one","status":"resolved"},{"data":"two","status":"resolved"},{"data":"three","status":"resolved"},{"data":"four","status":"resolved"}]
// Rejected: [{"error":"reject-one","status":"rejected"},{"error":"reject-two","status":"rejected"}]