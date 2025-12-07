const express= require('express');
const app=express();                        //house created for server

//These all will be endpoints ie orders (/ , home ,contacts,)

app.get('/',function(req,res){
    res.send("Welcome to my hotel... ARE you all fine? ");
})

app.get('/home',function(req,res){
    res.send("Welcome to my hotel... How can i help you? ");
})
app.get('/contacts/yourContact',function(req,res){
    var person={
        name:'Pratik',
        contact:9041249847,
        location:'Nepal'
    };
    res.send(person);                               //this will be displayed in json format
})

//app.listen(3000)  ;                      //room number of server.ie port number to work in

app.listen(3000,()=>{console.log("Server is listening on port 3000")});