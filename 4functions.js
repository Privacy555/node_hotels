// function fun(a,b){
//     return a+b
// }

// var fun=function(a,b){                                                   //another way to write function in js
//     return a+b
// }


// var fun= (a,b) => {return a+b}                                           // another way to write function in js or even no need to write return

// ans=fun(9,9)
// console.log(ans);

// (function(){
//     console.log("This function is no need to be called, runs automatically");
// })();


//@@@@@@@@@@@@@@@@@@@@@@@@@@@ CALLBACK FUNCTION @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



function add(a,b,callback){
    console.log(a,b);
    callback();
}

const callback=()=>{
    console.log("Callback function called by add");
}

add(10,20,callback)