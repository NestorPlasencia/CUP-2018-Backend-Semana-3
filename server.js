var express = require('express');
var bodyParser = require('body-parser');

// Creamos nuestra app de express
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static("public"));

// importamos la configuracion de nuestra BD
var mongoose = require('mongoose');
var dbConfig = require('./config/database.config.js');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
	useMongoClient: true
});

mongoose.connection.on('error', function() {
    console.log('No se ha podido conectar a la BD, saliendo ...');
    process.exit();
});
mongoose.connection.once('open', function() {
    console.log("Conectado exitosamente a la BD!");
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public" + "index.html");
});

var book = require('./app/controllers/book.controller');

app.post('/books', book.create);

app.get('/books', book.findAll);

app.get('/books/:bookId', book.findOne);

app.put('/books/:bookId', book.update);

app.delete('/books/:bookId', book.deleteNote);

app.listen(3000, function() {
  console.log("El servidor web esta corriendo en el puerto 3000...!");
});