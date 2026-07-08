const cities: string[] = ["tbilisi", "qutaisi", "batumi", "rustavi", "paris", "new york"];
const temperatures: number[] = [35, -5, 40, -2, 30, 22];

//==============================================================================================================

function addWeatherData(
    cityList: string[],
    tempList: number[],
    cityName: string,
    tempValue: number):void{
    cityList.push(cityName);
    tempList.push(tempValue);
}

addWeatherData(cities,temperatures,"telavi",-5);

//==================================================================================================================

function countFreezingCities(tempList: number[]): number{
    let count:number = 0;
    for (let i=0; i < tempList.length; i++) {
        if (tempList[i] < 0) {
            count++;
        }
    }
    return count;
}

console.log("Freez city: " + countFreezingCities(temperatures));

//=============================================================================================================


function printWeatherSummary(cityList: string[], tempList: number[]): void {
    for (let i = 0; i < cityList.length; i++) {
        console.log(cityList[i] + " = " + tempList[i] + " gradusi");
    }
}
printWeatherSummary(cities, temperatures);