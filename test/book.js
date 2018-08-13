//DEPENDENCIES
const mongoose    = require('mongoose');
const Book        = require('../controllers/models/book');

//DEV DEPENDENCIES
const chai        = require('chai');
const should      = chai.should();
const chaiHttp    = require('chai-http');
const server      = require('../server');

chai.use(chaiHttp);

describe('Books', () => {
  beforeEach(done => {
    Book.remove()
      .then(res => {
        done();
      })
      .catch(err => {
        done();
      });
  });

  describe('/GET book', () => {
    it('it should GET all the books', done => {
      chai.request(server)
        .get('/book')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        })
    })
  })

  describe('/POST book', () => {
    it('it should not POST a book without pages field', done => {
      const book = {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        year: 1954
      }

      chai.request(server)
        .post('/book')
        .send(book)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('pages');
          res.body.errors.pages.should.have.property('kind').eql('required');
          done();
        })
    })

    it('it should POST a book ', done => {
      const book = {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        year: 1954,
        pages: 1170
      }

      chai.request(server)
        .post('/book')
        .send(book)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Book successfully added!')
          res.body.book.should.have.property('title');
          res.body.book.should.have.property('author');
          res.body.book.should.have.property('pages');
          res.body.book.should.have.property('year');
          done();
        })
    })
  })

  describe('/GET/:id book', () => {
    it('it should GET a book by the given id', done => {
      const book = new Book({
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        year: 1954,
        pages: 1170
      })

      book.save()
        .then(book => {
          chai.request(server)
            .get('/book/' + book._id)
            .send(book)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('title');
              res.body.should.have.property('author');
              res.body.should.have.property('pages');
              res.body.should.have.property('year');
              res.body.should.have.property('createdAt');
              res.body.should.have.property('_id').eql(book.id);
              done();
            })
        })
        .catch(err => {
          console.log(err);
          done();
        })
    })
  })

  describe('/PUT/:id book', () => {
    it('it should UPDATE a book given the id and all fields', done => {
      const book = new Book({
          title: "The Chronicles of Narnia",
          author: "C.S. Lewis",
          year: 1948,
          pages: 778
        })

      book.save()
        .then(book => {
          chai.request(server)
            .put('/book/' + book._id)
            .send({
              title: "The Chronicles of Narnia",
              author: "C.S. Lewis",
              year: 1950,
              pages: 778
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message').eql('Book updated!');
              res.body.book.should.have.property('year').eql(1950);
              done();
            })
        })
        .catch(err => {
          console.log(err);
          done();
        })
    })

    it('it should UPDATE a book given and id and just the updated field', done => {
      const book = new Book({
          title: "The Chronicles of Narnia",
          author: "C.S. Lewis",
          year: 1948,
          pages: 778
        })

      book.save()
        .then(book => {
          chai.request(server)
            .put('/book/' + book._id)
            .send({
              year: 1955,
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message').eql('Book updated!');
              res.body.book.should.have.property('year').eql(1955);
              res.body.book.should.have.property('title').eql('The Chronicles of Narnia');
              res.body.book.should.have.property('author').eql('C.S. Lewis');
              res.body.book.should.have.property('pages').eql(778);
              done();
            })
        })
        .catch(err => {
          console.log(err);
          done();
        })
    })
  })

  describe('/DELETE/:id book', () => {
    it('it should DELETE a book given the id', done => {
      const book = new Book({
        title: "The Chronicles of Narnia",
        author: "C.S. Lewis",
        year: 1948,
        pages: 778
      })

      book.save()
        .then(book => {
          chai.request(server)
            .delete('/book/' + book._id)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message').eql('Book successfully deleted!');
              res.body.result.should.have.property('ok').eql(1);
              res.body.result.should.have.property('n').eql(1);
              done();
            })
        })
        .catch(err => {
          console.log(err);
        })
    })
  })
});
