// var fs=require('fs');                           //kinda declaration of modules we gonna use here
// var os=require('os');

// var user= os.userInfo();                    //userInfo() gives information(in form of object) about our desktop's homedir,username ,uid ,gid,shell
// console.log(user);

// fs.appendFile('fsFile.txt',"Hi "+user.username+" " ,()=>{console.log("This callback function must also be passed.")});





//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ lodash @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


var _= require('lodash');
var data=[1,2,3,2,3,1,5,'a','b','a'];
var filter=_.uniq(data);                //it just stores unique elements i.e set
console.log(filter);          
console.log(_.isString('Pratik'))  ;