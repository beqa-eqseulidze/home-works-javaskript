const first=[1,2,4,0]
const second=[1,2,[4,0]]
function array_Clone(array){
    return array.slice(0)
    
}
console.log("clone 1 :", array_Clone(first))
console.log("clone 2 :", array_Clone(second))
