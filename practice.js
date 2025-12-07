// var a=5,b=6
// //let also works same as var
// let ans=a+b
// console.log(a+b)
// console.log(ans)

// const name="Pratik"  //we can either use '' or "" for string
// console.log(name)
// console.log(typeof name)        //typeof : It'll help to get type of data we have stored in that variable


// ///////////////////////// ARRAY ////////////////////
// //we can store any type of data ,even mixed data in array

// let array=['A','B','C',1,2,3];
// console.log(array);
// array.push(4);
// console.log(array)      //data can be accessed as like c or py or java array[]


//if else conditions and loops are same like c



//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Object @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// const person={
//     name:"Pratik",
//     age:10,
//     sem:3,
//     hobbies:['singing','dancing','eating']
// };

// console.log(person)
// console.log(person.name)
// console.log(person.age)
// console.log(person.hobbies)
// console.log(person.hobbies[1])




//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ FUNCTION @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// const ages=[10,20,30,25,15]
// const result=ages.filter(checkAge)                      //filter will send each age one by one in that checkAge function

// console.log(result)
// function checkAge(ages){
//     //if (ages==20) return ages
//     //return ages==18

//     return ages>=20                                 //unlike c ,it'll return array if the input data is array. even though the output is just 1, it'll still send that output in the form of array
// }




//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Taking input from user @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

var prompt= require('prompt-sync')();
let nam=prompt("ENter the name :")
console.log(nam)