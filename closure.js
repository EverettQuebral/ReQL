const array = [1, 2, 6, 5, 8];

// for (var i=0; i < array.length; i++){
//   setTimeout(function(i_local){
//     return function(){
//       console.log('The index is ', i_local);
//     }
//   }(i), 3000);
// }


for (let i=0; i<array.length; i++){
  setTimeout(function(){
    console.log('Index ' + i);
  }, 3000);
}