'use strict'

// ACCEPT ARGUMENTS FROM THE COMMAND LINE
console.log(("Node.js, accept arguments from the command line").toUpperCase());
var params = process.argv.slice(2);
console.log(params);

var num1 = parseInt(params[0]);
var num2 = parseInt(params[1]);

console.log(("Create calculator with params").toUpperCase());
var argv = `
Suma:     ${num1+num2}
Resta: 	  ${num1-num2}
Multipli: ${num1*num2}
Division: ${num1/num2}
`;
console.log(argv);

//Output to the command line using Node.js
/*
    %s format a variable as a string
    %d format a variable as a number
    %i format a variable as its integer part only
    %o format a variable as an object
*/
var integer = 5;
var decimal = 3.4;
var string = "hello"; 
console.log("Integer is %i, and decimal is %d, and string is %s",integer,decimal,string)


//Clear the console
console.clear();

const x = 1
const y = 2
const z = 3
console.count(
  'The value of x is ' + x + 
  ' and has been checked .. how many times?'
)
console.count(
  'The value of x is ' + x + 
  ' and has been checked .. how many times?'
)
console.count(
  'The value of y is ' + y + 
  ' and has been checked .. how many times?'
)

//Counting elements
//console.count();

//Ejemplo
const oranges = ['orange', 'orange']
const apples = ['just one apple']
oranges.forEach(fruit => {
  console.count(fruit)
})
apples.forEach(fruit => {
  console.count(fruit)
})