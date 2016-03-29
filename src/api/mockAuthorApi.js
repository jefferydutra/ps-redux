// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
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

// Using setTimeout to simulate the delay of an AJAX call.
// This configures the amount of delay.
const delay = 1000;

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (author) => {
  return author.firstName.toLowerCase() + '-' + author.lastName.toLowerCase();
};

class AuthorApi {
  static getAllAuthors() {
    return new Promise(function(resolve, reject) {
      setTimeout(() => {
        resolve(Object.assign([], authors));
      }, delay);
    });
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

    return new Promise(function(resolve, reject) {
      setTimeout(() => {
        resolve(Object.assign({}, author));
      }, delay);
    });
  }

  static deleteAuthor(authorId) {
    const indexOfAuthorToDelete = authors.findIndex(author => { author.authorId == authorId; } );
    return new Promise(function(resolve, reject) {
      authors.splice(indexOfAuthorToDelete, 1);
      setTimeout(() => {
        resolve();
      }, delay);
    });
  }
}

export default AuthorApi;