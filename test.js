var _ = require('lodash');

var str = "abcdedfghijklmnop"


// reverse a string
console.log(_.toString(
                _.reverse(
                      _.toArray(str)
                )
            ).replace(/\,/g, '')
          );


_.map(_.toArray(str), x => {
  console.log(x)
}); 


// reverse a string manually
var str1 = "this is a very good example of a string"
// convert to array first
var strArray = _.toArray(str1)

// use stack
var strStack = []
strArray.map(x => {
  strStack.push(x)
})
console.log(strStack)

// reverse the stack
var strReverseStack = [];
strStack.reverse()
console.log(strArray.reverse())

var x = {
  a : 1,
  b : 2,
  c : 3
}

_.map(x, (k, v) => {
  console.log('Key ', k)
  console.log('value ', v)
})

var k = {
  a : {
    a : 1,
    b : 2,
    c : 3
  },
  b : {
    a : 4,
    b : 5,
    c : 6
  }
}

var i = {
  a : {
    d : 10,
    e : 20,
    f : 30
  }
}

_.flatMap(k, (x, y) => {
  console.log(y, x)
})

[1,2,3].map(x => {
  console.log(x + 1)
})


