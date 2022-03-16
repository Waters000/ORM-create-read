const router = require('express').Router();
const Book = require('../../models/Book');

// TODO: Get route pulls all data from api/books.  API comes from first index.js....second path comes from index.js in routes.
router.get('/', (req, res) => {
  // TODO: Find all is sequalize method inherited from Models, SELECT * FROM Books
  Book.findAll().then((bookData) => {
    res.json(bookData);
  });
});

// TODO: Adds a path to API/BOOKS/Paperbacks to get all paperbacks with order, WHERE boolean is true for paperback
router.get('/paperbacks', (req, res) => {
  Book.findAll({
    // TODO: Order by title ascending
    order: ['title'],
    // TODO: WHERE, selector where column is true boolean field.
    where: {
      is_paperback: true
    },
    attributes: {
      // TODO: Return all books, dont return the columsn to show on page.
      exclude: ['is_paperback', 'edition']
    }
  }).then((bookData) => {
    res.json(bookData);
  });
});

// TODO: GET individual book by book_id
router.get('/:id', (req, res) => {
  // TODO: Finding by the primary key via ID.
  Book.findByPk(req.params.id).then((bookData) => {
    res.json(bookData);
  });
});

// CREATE a book
router.post('/', (req, res) => {
  Book.create(req.body)
    .then((newBook) => {
      res.json(newBook);
    })
    .catch((err) => {
      res.json(err);
    });
});

// CREATE multiple books
router.post('/seed', (req, res) => {
  Book.bulkCreate([
    {
      title: 'Make It Stick: The Science of Successful Learning',
      author: 'Peter Brown',
      isbn: '978-0674729018',
      pages: 336,
      edition: 1,
      is_paperback: false
    },
    {
      title: 'Essential Scrum: A Practical Guide to the Most Popular Agile Process',
      author: 'Kenneth Rubin',
      isbn: '978-0137043293',
      pages: 500,
      edition: 1,
      is_paperback: true
    },
    {
      title: "White Fragility: Why It's So Hard for White People to Talk About Racism",
      author: 'Robin DiAngelo',
      isbn: '978-0807047415',
      pages: 192,
      edition: 2,
      is_paperback: true
    },
    {
      title: 'The Pragmatic Programmer: Your Journey To Mastery',
      author: 'David Thomas',
      isbn: '978-0135957059',
      pages: 352,
      edition: 2,
      is_paperback: false
    },
    {
      title: 'The Art of Computer Programming, Vol. 1: Fundamental Algorithms',
      author: 'Donald Knuth',
      isbn: '978-0201896831',
      pages: 672,
      edition: 3,
      is_paperback: false
    },
    {
      title: 'Algorithms of Oppression: How Search Engines Reinforce Racism',
      author: 'Safiya Umoja Noble',
      isbn: '978-1479837243',
      pages: 256,
      edition: 1,
      is_paperback: true
    }
  ])
    .then(() => {
      res.send('Database seeded!');
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
