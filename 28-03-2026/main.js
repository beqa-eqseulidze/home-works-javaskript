const arr1 = [1, 2, 3, [5, 6]];

function cloneArray(array) {
  return array.map((item) => {
    if (Array.isArray(item)) {
      return item.slice(0);
    }
    return item;
  });
}

// const copyArr1 = cloneArray(arr1);
const copyArr1 = structuredClone(arr1);

copyArr1.push(9);
copyArr1[3].push(8);
console.log("origin", arr1);
console.log("copy", copyArr1);


const obj={
    name:'beqa',
    age:40,
    phone:{
        pone1:455555,
        pone2:6678912,
    }
    // greeting:function(){console.log('hello')}
}



const cloneObj=structuredClone(obj);
cloneObj.phone.pone1=11111;

console.log('original: ', obj)
console.log('cloned: ', cloneObj)
