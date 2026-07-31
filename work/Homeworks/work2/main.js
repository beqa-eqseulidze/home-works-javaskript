const arr1 = [1, 2, 4, 0]
const arr2 = [1, 2, [4, 0,]]
function arrClone(arr) {
    return structuredClone(arr)
}
const clone = arrClone(arr1)
const clone2 = arrClone(arr2)
clone2.push(2)
clone2[2].push(2)
console.log('original', arr2)
console.log('cloned', clone2)