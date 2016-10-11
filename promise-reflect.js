'use strict'

//Credit to Benjamin Gruenbaum on the following StackOverflow post
//for the logic in this function
//http://stackoverflow.com/a/31424853/3164844
module.exports =  function(promise) {
  return promise
      .then(data => {
        return {data: data, status: "resolved"}
      })
      .catch(error => {
        return {error: error, status: "rejected"}
      });
}

