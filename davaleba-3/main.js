
const nested = [[1,2], [3,4], [5,6]];


const res = nested.reduce((prev,cur) => {
    return prev(cur);

},[]);



console.log(res);