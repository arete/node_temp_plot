/**
 * Module dependencies.
 */


var express = require('express')
  , os = require('os')
  , routes = require('./routes')
  , config = require('./config')

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {layout:false, pretty:true});
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

var sp = require("serialport");
var SerialPort = sp.SerialPort;

var serialPort = new SerialPort(config.serialport, {
    parser : sp.parsers.readline("\n")
});

// Routes

app.get('/', routes.index);

var io=require('socket.io').listen(app);
app.listen(3000);

var all_d=[];
serialPort.on("data", function (data) {
	var ts=(new Date()).getTime();
        var temp =[];
	temp[0]= data.toString();
        temp.unshift(ts);
	all_d.push(temp);
	io.sockets.emit('newdata', temp);
        console.log(data.toString());
});

io.sockets.on('connection', function(socket) {
	if(all_d.length>0) {
		socket.emit('history', all_d);
	}
});
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
