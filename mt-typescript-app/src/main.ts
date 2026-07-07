import './style.css'

// let a;
// a = 15;
// a = 'dd';

// let b: number
// b = 16;

// const myNumbers = [];
// myNumbers.push(12);
// console.log(myNumbers);
// myNumbers.push('ayo');
// console.log(myNumbers);

// const myNumbers1: number[] = [];
// myNumbers1.push(12);
// console.log(myNumbers1);
// myNumbers1.push('ayo');
// console.log(myNumbers1);

// function sayHello(name: string) {
//   console.log(`Hello ${name}`);
// }

// sayHello('Saba')

// console.log('HAYA')



const cityNames: string[] = ["რუსთავი", "თბილისი", "გუდაური", "ოზურგეთი", "სამტრედია", "ყაზბეგი"];
const tempNumbers: number[] = [38, 33, -10, 28, 25, -5];

function addWeatherData(cities: string[], temperatures: number[], city: string, tempQuantity: number
): void {
  cities.push(city);
  temperatures.push(tempQuantity);
}

function countFreezingCities(temperatures: number[]): number {
  let count = 0;
  for (let i = 0; i < temperatures.length; i++) {
    if (temperatures[i] < 0) {
      count++;
    }
  }
  return count;
}

function printWeatherSummary(cities: string[], temperatures: number[]): void {
  for (let i = 0; i < cities.length; i++) {
    console.log(`${cities[i]}: ${temperatures[i]}°C`);
  }
}

printWeatherSummary(cityNames, tempNumbers);
const freezingCities = countFreezingCities(tempNumbers);
console.log(`ყინავს ${freezingCities} ქალაქში`);