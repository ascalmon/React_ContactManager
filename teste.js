function isBigEnough(value) {
  return value >= 130;
}
var array = [12,5,8,130,44];
var filtered = array.filter(isBigEnough);
console.log(filtered);
console.log(array);
console.log(...filtered);

// var numbers = [1, 4, 9];
// var roots = numbers.map(Math.sqrt);
// console.log(roots);
// console.log(numbers);
//
// var numbers = [1, 4, 9];
// var doubles = numbers.map(function(num) {
//   return num * 2;
// });
// console.log(doubles);
// console.log(numbers);
