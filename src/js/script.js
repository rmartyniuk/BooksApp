{
  ('use strict');

  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
      images: '.book__image',
      filters: '.filters'
    },
  };

  const templates = {
    //referencja do szablonu dla listy książek
    templateBook: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML)
  };

  class BooksList {
    constructor() {
      const thisBooksList = this;

      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.render();
      thisBooksList.initActions();
    }

    initData() {
      const thisBooksList = this;

      thisBooksList.data = dataSource.books;
      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];
    }

    getElements() {
      const thisBooksList = this;

      //referencja do kontenera w DOMie gdzie ma się znaleźć wygenerowany z szablonu kod
      thisBooksList.bookList = document.querySelector(select.containerOf.bookList);
    }

    render() {
      const thisBooksList = this;
      console.log('thisBooksList', thisBooksList);

      for (let book of thisBooksList.data) {
        const ratingBgc = thisBooksList.determineRatingBgc(book.rating);
        const ratingWidth = book.rating * 10;

        /* generowanie szablonu na podstawie danych z pliku data */
        const generatedHTML = templates.templateBook({
          id: book.id,
          name: book.name,
          price: book.price,
          rating: book.rating,
          image: book.image,
          details: book.details.adults,
          nonFiction: book.details.nonFiction,
          ratingBgc: ratingBgc,
          ratingWidth: ratingWidth,
        });

        /* utworzenie elementu za pomocą metody utils... */
        const elem = utils.createDOMFromHTML(generatedHTML);

        /* dodanie książek do menu */
        thisBooksList.bookList.appendChild(elem);
      }
    }

    initActions() {
      const thisBooksList = this;

      //Dodaj nasłuchiwacz, który oczekuje na element kliknięty (event.target), zwracając uwagę na swojego rodzica(offsetParent)
      thisBooksList.bookList.addEventListener('dblclick', function (event) {
        event.preventDefault();
        const image = event.target.offsetParent;

        //pobierz z data-id identyfikator książki,
        const bookId = image.getAttribute('data-id');

        //Dodaj identyfikator do tablicy i sprawdź czy jest, jeśli jest to...
        if (!thisBooksList.favoriteBooks.includes(bookId)) {
          thisBooksList.favoriteBooks.push(bookId);

          //...to dodatkowo dodaj do klikniętego elementu klasę favorite,
          image.classList.add('favorite');

        } else {
          //pobierz index
          const indexOfBook = thisBooksList.favoriteBooks.indexOf(bookId);

          //usuń id x1
          thisBooksList.favoriteBooks.splice(indexOfBook, 1);

          //usuń klasę favorite
          image.classList.remove('favorite');
        }
      });

      const filters = document.querySelector(select.containerOf.filters);

      filters.addEventListener('click', function (callback) {
        const clickedElement = callback.target;

        if (
          clickedElement.tagName == 'INPUT' &&
          clickedElement.type == 'checkbox' &&
          clickedElement.name == 'filter'
        ) {
          console.log('clickedElement', clickedElement);

          if (clickedElement.checked) {
            thisBooksList.filters.push(clickedElement.value);
          } else {
            const indexOfValue = thisBooksList.filters.indexOf(
              clickedElement.value
            );
            thisBooksList.filters.splice(indexOfValue, 1);
          }
        }

        thisBooksList.filterBooks();
      });

    }

    filterBooks() {
      const thisBooksList = this;

      for (let book of thisBooksList.data) {
        let shouldBeHidden = false;
        const filterOfHiddenBooks = document.querySelector(select.containerOf.images + '[data-id = "' + book.id + '"]');


        for (const filter of thisBooksList.filters) {
          if (!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }

        if (shouldBeHidden) {
          filterOfHiddenBooks.classList.add('hidden');
        } else {
          filterOfHiddenBooks.classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating) {
      let background = '';

      if (rating < 6) {
        background = 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8) {
        background = 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
      } else if (rating > 8 && rating <= 9) {
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9) {
        background = 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
      }
      return background;

    }
  }

  new BooksList();

}