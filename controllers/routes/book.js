//DEPENDENCIES
const mongoose    = require('mongoose');
const router      = require('express').Router()

//SCHEMA
const Book        = require('../models/book');

const getBooks = (req, res) => {
  Book.find({})
    .then(books => {
      res.json(books);
    })
    .catch(err => {
      res.send(err);
    });
}

const postBook = (req, res) => {
  const newBook = new Book(req.body);

  newBook.save()
    .then(book => {
      res.json({message: "Book successfully added!", book});
    })
    .catch(err => {
      res.send(err);
    });
}

const getBook = (req, res) => {
  Book.findById(req.params.id)
    .then(book => {
      res.json(book);
    })
    .catch(err => {
      res.send(err);
    });
}

const deleteBook = (req, res) => {
  Book.remove({_id : req.params.id})
    .then(result => {
      res.json({ message: "Book successfully deleted!", result})
    })
    .catch(err => {
      res.send(err);
    });
}

const updateBook = (req, res) => {
  Book.findById({_id: req.params.id})
    .then(book => {
      Object.assign(book, req.body).save()
        .then(book => {
          res.json({ message: 'Book updated!', book});
        })
        .catch(err => {
          res.send(err);
        });
    })
    .catch(err => {
      res.send(err);
    });
}

//Able to test routes individually as functions
//BOOK
router.get('/', getBooks)
      .post('/', postBook);
router.get('/:id', getBook)
      .delete('/:id', deleteBook)
      .put('/:id', updateBook);

module.exports = router
