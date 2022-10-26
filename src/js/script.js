{

  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
    },
  };

  const templates = {
    templateBook: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML)
  };

  const bookList = document.querySelector(select.containerOf.bookList);
  console.log(bookList);

  const booksData = dataSource.books;

  function render() {
    for (let book of booksData) {

      /* generate HTML based on template */
      const generatedHTML = templates.templateBook({
        id: book.id,
        name: book.name,
        price: book.price,
        rating: book.rating,
        image: book.image,
      });

      /* create element using utils.createElementFromHTML */
      const elem = utils.createDOMFromHTML(generatedHTML);

      /* add book to menu[?] */
      bookList.appendChild(elem);
    }
  }
  render();


}
