console.log("Завдання 2")
const data = [12, 5, 8, 20, 15, 7];

//сума через класичний метод
function sum(array) {
  let total = 0;
  for (let i = 0; i < array.length; i++) {
    total += array[i];
  }
  return total;
}
console.log(sum(data));

// сума через метод reduce
function sumReduce(array){
    return array.reduce((acc, current)=>acc + current,0);
}
console.log(sumReduce(data));

//середнє значення через класичний метод
function average(array){
    let total=0;
    for(let i=0; i < array.length; i++){
      total+=array[i]/array.length;
    }
    return total.toFixed(2);
}
console.log(average(data));

// середнє значення через метод reduce
function averageReduce(array){
const total = array.reduce((acc, current) => acc + current, 0);
  return (total / array.length).toFixed(2);}
console.log(averageReduce(data));

//мінімальне значення
function min(array){
    let minValue=array[0];
    for(let i=1; i<array.length; i++){
        if (array[i] < minValue) {
      minValue = array[i];
    }
  }
  return minValue;
}
console.log(min(data));

// максимальне значення
function max(array){
    let maxValue=array[0];
    for(let i=1; i < array.length; i++){
        if (array[i]>maxValue){
            maxValue=array[i];
        }
    }
    return maxValue;
}
console.log(max(data));

console.log("Завдання 3");
function calculateMonthlyPayment(sum, annualRate, months) {
const r=annualRate/100/12;
const payment=sum*((r*Math.pow(1+r,months)/(Math.pow(1+r,months)-1)));
return Number(payment.toFixed(2));
}
const result=calculateMonthlyPayment(6000, 12, 24);
console.log(result);

console.log("Завдання 4");
function processArray(array, proccesor){
    const result=[];
    for (let i = 0; i < array.length; i++) {
        result.push(proccesor(array[i]));
    }
    return result;
}
const numbers = [1, 2, 3, 4, 5];
function double(num){
    return num*2;
}
const doubledNumbers=processArray(numbers,double);
console.log(doubledNumbers);
const plusFive=processArray(numbers, num => num+5);
console.log(plusFive);


console.log("Завдання 5");
function sumDigits(number){
    if (number===0) return 0;
    return (number % 10) + sumDigits(Math.floor(number / 10));
}
console.log(sumDigits(12345));

function countDigits(number){
    if (number < 10) return 1;
    return 1 + countDigits(Math.floor(number / 10));
}
console.log(countDigits(12345));

function factorialRecursive(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorialRecursive(n - 1);
}
console.log(factorialRecursive(5));

// Факторіал через цикл
function factorialIterative(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

console.log(factorialIterative(5));