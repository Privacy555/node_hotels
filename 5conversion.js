//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ CONVERSION OF OBJECT TO JSON AND JSON TO OBJECT TO JSON @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
/*

const jsonString='{"name": "John", "age": 30}';
const equivalentObject=JSON.parse(jsonString);          //JSON string to object
console.log(equivalentObject);

*/


const jsonObject={name: "John", age: 30};
const equivalentJSONString=JSON.stringify(jsonObject);          //JSON string to object
console.log(equivalentJSONString);