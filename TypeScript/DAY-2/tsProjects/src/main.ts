// // // js code
// // let a;
// // a = 15;
// // a = "add"

// // // console.log(a * 2);

// // // ts code
// // let b: number;
// // b = 16;
// // // b = "bela"
// // console.log(b * 2);



const cities: string[] =["რუსთავი", "ბათუმი", "თბილისი", "გორი", "ქუთაისი"];
const temperatures: number[] =[15, 20, 45, -8, 22];

function addWeatherData(
    cityList:string[],
    tempList:number[],
    cityName:string,
    tempValue:number
):void{
    cityList.push(cityName);
    tempList.push(tempValue);
}
function countFreezingCities(temperatures: number[]): number {
    let freezingCount=0;
    for(let i=0; i<temperatures.length; i++) {
        if(temperatures[i]<0) {
            freezingCount++;
        }
    }
    return freezingCount;
}
function printWeatherSummary(cityList:string[],tempList:number[]):void {
    for (let i=0; i<cityList.length; i++){
        console.log(`${cityList[i]}:${tempList[i]} გრადუსი`);
    }
}
addWeatherData (cities,temperatures,"ბაკურიანი", -5);
const  freezing=countFreezingCities(temperatures);
console.log(`ცივი ქალაქების  რაოდენობა: ${freezing}`);
printWeatherSummary(cities,temperatures);














