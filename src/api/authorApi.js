//This file is mocking a web API by hitting hard coded data.
const	authors =	[
  {
    id: 'cory-house',
    firstName: 'Cory',
    lastName: 'House'
  },
  {
    id: 'scott-allen',
    firstName: 'Scott',
    lastName: 'Allen'
  },
  {
    id: 'dan-wahlin',
    firstName: 'Dan',
    lastName: 'Wahlin'
  }
];

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (author) => {
  return author.firstName.toLowerCase() + '-' + author.lastName.toLowerCase();
};

class AuthorApi {
  static getAllAuthors() {
    return new Promise(function(resolve, reject) {
      resolve(Object.assign([], authors));
    });
  }

  static getAuthorById(id) {
    const author = authors.find(author => id == id);
    return Object.assign({}, author);
  }

  static saveAuthor(author) {
    if (author.id) {
      const existingAuthorIndex = authors.findIndex(a => a.id == author.id);
      authors.splice(existingAuthorIndex, 1, author);
    } else {
      //Just simulating creation here.
      //The server would generate ids for new authors in a real app.
      //Cloning so copy returned is passed by value rather than by reference.
      author.id = generateId(author);
      authors.push(author);
    }

    return Object.assign({}, author);
  }

  static deleteAuthor(authorId) {
    const indexOfAuthorToDelete = authors.findIndex(author => { author.authorId == authorId; } );
    return new Promise(function(resolve, reject) {
      authors.splice(indexOfAuthorToDelete, 1);
      resolve();
    });
  }
}

export default AuthorApi;
