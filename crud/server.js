require('./model/db');
const express = require('express');
const path=require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const app=express();
var server = require('http').createServer(app);

var io = require('socket.io').listen(server);
users=[];
connections=[];
server.listen(process.env.PORT || 3000);

const controller= require('./controller/control');



app.set('views',path.join(__dirname,'/views/'));
app.engine('hbs',exphbs({extname:'hbs',defaultLayout:'mainlayout',layoutsDir:__dirname+'/views/layout'}));
app.set('view engine','hbs'); 

app.use(bodyparser.urlencoded({
    extended:true
}));
app.use(bodyparser.json());

app.use(controller);
///////
io.sockets.on('connection',function(socket){
    connections.push(socket);
    console.log('Connected: %s sockets connected',connections.length);

    //Disconnect
    socket.on('disconnect',function(data){
        users.splice(users.indexOf(socket.username),1);
        connections.splice(connections.indexOf(socket),1);
        console.log('Disconnected:%s sockets connected',connections.length);
    });
});
//////




