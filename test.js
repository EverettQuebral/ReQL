// var _ = require('lodash');

// var str = "abcdedfghijklmnop"


// // reverse a string
// console.log(_.toString(
//                 _.reverse(
//                       _.toArray(str)
//                 )
//             ).replace(/\,/g, '')
//           );


// _.map(_.toArray(str), x => {
//   console.log(x)
// }); 


// // reverse a string manually
// var str1 = "this is a very good example of a string"
// // convert to array first
// var strArray = _.toArray(str1)

// // use stack
// var strStack = []
// strArray.map(x => {
//   strStack.push(x)
// })
// console.log(strStack)

// // reverse the stack
// var strReverseStack = [];
// strStack.reverse()
// console.log(strArray.reverse())

// var x = {
//   a : 1,
//   b : 2,
//   c : 3
// }

// _.map(x, (k, v) => {
//   console.log('Key ', k)
//   console.log('value ', v)
// })

// var k = {
//   a : {
//     a : 1,
//     b : 2,
//     c : 3
//   },
//   b : {
//     a : 4,
//     b : 5,
//     c : 6
//   }
// }

// var i = {
//   a : {
//     d : 10,
//     e : 20,
//     f : 30
//   }
// }

// _.flatMap(k, (x, y) => {
//   console.log(y, x)
// })

// [1,2,3].map(x => {
//   console.log(x + 1)
// })


function LinkedList(){
  this.head = null;
  this.tail = null;
}

function Node(value, next, prev) {
  this.value = value;
  this.next = next;
  this.prev = prev;
}

LinkedList.prototype.addToHead = function(value){
  const newNode = new Node(value, this.head, null);
  if (this.head) {
    this.head.prev = newNode;
  }
  else {
    this.tail = newNode;
  }
  this.head = newNode;
}

LinkedList.prototype.addToTail = function(value){
  const newNode = new Node(value, null, this.tail);
  if (this.tail){
    this.tail.next = newNode;
  }
  else {
    this.head = newNode;
  }
  this.tail = newNode;
}

LinkedList.prototype.removeHead = function(){
  // the list doesn't have a head
  if (!this.head) return null;

  // get the value of the head
  let value = this.head.value;

  // move the pointer of the head to the next node
  this.head = this.head.next;

  if (this.head) { 
    this.head.prev = null;
  }
  else {
    this.tail = null;
  }
  return value;
}

LinkedList.prototype.removeTail = function(){
  // the list doesn't have tail
  if (!this.tail) return null;

  // get the value of the tail
  let value = this.tail.value;

  // move the pointer of the tail to the previous node
  this.tail = this.tail.prev;

  if (this.tail) {
    this.tail.next = null;
  }
  else {
    this.head = null;
  }
  return value;
}

LinkedList.prototype.search = function(value){
  // start with the head
  let currentNode = this.head;
  while (currentNode ){
    if (currentNode.value === value) return currentNode;
    currentNode = currentNode.next;
  }

  // couldn't find anything
  return null;
}

const list = new LinkedList();
list.addToHead(100);
list.addToHead(200);
list.addToHead(300);
list.addToTail(50);
console.log(list);
console.log(list.head.next.value);
console.log(list.search(300));

