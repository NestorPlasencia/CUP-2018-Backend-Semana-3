// book.controller.js
// Este modulo es el controlador de nuestra aplicación
var Book = require('../models/book.model.js');

// Crea y guarda un libro en la BD
function create(req, res) {

    if(!req.body.libro) {
        res.status(400).send({message: "La libro no puede estar sin nombre"});
    }

    var book = new Book(
        {
            libro: req.body.libro, 
            autor: req.body.autor || "no author",
            fecha: req.body.fecha || "no fecha",
            nro_paginas: req.body.nro_paginas || "no nro_paginas",
            fecha_entrega: req.body.fecha_entrega || "no fecha_entrega",
        }
    );

    book.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Ha ocurrido un error al guardar el libro."});
        } else {
            res.send(data);
        }
    });
};

// Encuentra y retorna todas los libros de la base de datos
function findAll(req, res) {
    Book.find(function(err, books){
        if(err) {
            res.status(500).send({message: "Ha ocurrido un error al obtener los libros"});
        } else {
            res.send(books);
        }
    });
};

// Encuentra un libro con el bookId
function findOne(req, res) {
    Book.findById(req.params.bookId, function(err, data) {
        if(err) {
            res.status(500).send({message: "no se ha podido obtener el libro con id " + req.params.bookId});
        } else {
            res.send(data);
        }
    });
};

// Actualiza un libro identificado con el bookId en el request
function update(req, res) {
    Book.findById(req.params.bookId, function(err, book) {

        if(err) {
            res.status(500).send({message: "No se pudo encontrar un libro con id " + req.params.bookId});
        }

        console.log(req);

        if (req.body.libro )         {book.libro           = req.body.libro } 
        if (req.body.autor )         {book.autor           = req.body.autor }        
        if (req.body.fecha )         {book.fecha           = req.body.fecha }         
        if (req.body.nro_paginas )   {book.nro_paginas     = req.body.nro_paginas  }  
        if (req.body.fecha_entrega ) {book.fecha_entrega   = req.body.fecha_entrega  }
        
        book.save(function(err, data){
            if(err) {
                res.status(500).send({message: "No se pudo actualizar el libro con id " + req.params.bookId});
            } else {
                res.send(data);
            }
        });
    });
};

// Elimina un libro con el ID bookId especificado en el request
function deleteNote(req, res) {
    Book.remove({_id: req.params.bookId}, function(err, data) {
        if(err) {
            res.status(500).send({message: "No se puede eliminar el libro con id " + req.params.bookId});
        } else {
            res.send({message: "El libro ha sido eliminada exitosamente"})
        }
    });
};

// Exportamos todas nuestras funciones para que puedan ser usadas
module.exports = {
    create,
    findAll,
    findOne,
    update,
    deleteNote
};