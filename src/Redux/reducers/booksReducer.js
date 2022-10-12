const initialState = {
  start: false,
  success: false,
  books: [],
  fail: false,
  errorMassage: "",
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_BOOKS_START":
      return {
        ...state,
        start: true,
      };
    case "FETCH_BOOKS_SUCCESS":
      return {
        ...state,
        start: false,
        success: true,
        books: action.payload,
      };

    case "FETCH_BOOKS_FAIL":
      return {
        ...state,
        start: false,
        fail: true,
        errorMassage: action.payload,
      };

    case "ADD_BOOK":
      return {
        ...state,
        books: [...state.books, action.payload],
      };

    case "DELETE_BOOK":
      const filteredBooks = state.books.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        books: filteredBooks,
      };

    case "EDIT_BOOK":
      //1. İşlem güncellenecek kitabın eski halini çıkartma.
      const filteredBooksEdit = state.books.filter(
        (item) => item.id != action.payload.id
      );

      //2. işlem güncel halini getirme.
      return {
        ...state,
        books: [...filteredBooksEdit, action.payload],
      };
    default:
      return state;
  }
};

export default booksReducer;
