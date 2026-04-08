const nested = [[1 ,2], [3 ,4],[5 ,6]];
const res=nested.reduce((prev, arr) =>{
    return prev.concat(arr)
},[])

console.log(res)