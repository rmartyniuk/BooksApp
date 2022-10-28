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
    //referencja do szablonu dla listy książek
    templateBook: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML)
  };

  //referencja do kontenera w DOMie gdzie ma się znaleźć wygenerowany z szablonu kod
  const bookList = document.querySelector(select.containerOf.bookList);

  //referencja do danych z książkami
  const booksData = dataSource.books;

  function render() {

    for (const book of booksData) {

      /* generowanie szablonu na podstawie danych z pliku data */
      const generatedHTML = templates.templateBook({
        id: book.id,
        name: book.name,
        price: book.price,
        rating: book.rating,
        image: book.image,
        details: book.details.adults,
        nonFiction: book.details.nonFiction,
      });

      /* utworzenie elementu za pomocą metody utils... */
      const elem = utils.createDOMFromHTML(generatedHTML);

      /* dodanie książek do menu */
      bookList.appendChild(elem);
    }
  }
  render();

  //1. Dodaj pustą tablicę
  const favouriteBooks = [];

  //2. Dodaj funkcję initActions
  function initActions() {

    //...3. przygotuj w niej referencję do listy wszystkich elementów .book__image
    const images = document.querySelectorAll('.book__image');

    // 4. Przejdź po każdym elemencie tej listy
    for (const imgLink of images) {

      //5. Dla każdego z nich dodaj nasłuchiwacz, który po wykryciu uruchomi funkcję, która...
      imgLink.addEventListener('dblclick', function (event) {
        

        //6. ...zatrzyma domyślne zachowanie przeglądarki (preventDefault),
        event.preventDefault();

        //7. doda do klikniętego elementu klasę favorite,
        imgLink.classList.toggle('favorite');

        //8. pobierze z jego data-id identyfikator książki,
        const dataId = imgLink.getAttribute('data-id');

        //9. i doda ten identyfikator do favoriteBooks.
        favouriteBooks.push(dataId);
      });
    }
  }
  initActions();

}
