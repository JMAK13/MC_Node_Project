// Node Modules
var express = require('express'),
server = require('http').Server(express),
app = express(),
net = require('net'),
io = require('socket.io')(server);

// Setup Serving Custom Assets
app.use(express.static('public'));

// Express + Http Server for Socket.io
server.listen(80);

// Array of Messages
var mess = [];

// Options
app.set('view engine', 'ejs');

// Socket Server
var server = net.createServer(function (c) {

    console.log('Java Client CONNECTED to Node Server');
    c.on('data', function (data) {
    var data1 = data.toString('utf-8');
    
    mess.push(data1);
    io.emit('update', data1);
    });
    
    c.on('end', function () {
        console.log('Node Server -> DISCONNECTED');
    });
});

// Web Server - Root Directory Router
app.get('/', function(req, res) {
    res.render(__dirname+'/public/views/index', {mess: mess, size: mess.size});
});

// Java Server Listener
server.listen(9800, function () {
    console.log('Node Server -> listening on port:9800');
});

// Web Server Listener
app.listen(81, function(req, res) {
    console.log("Web server -> listening on port:81");
});