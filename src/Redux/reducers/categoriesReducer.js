const initialState = {
  start: false,
  success: false,
  categories: [],
  fail: false,
  errorMassage: "",
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CATEGORIES_START":
      return {
        ...state,
        start: true,
      };
    case "FETCH_CATEGORIES_SUCCESS":
      return {
        ...state,
        start: false,
        success: true,
        categories: action.payload,
      };
    case "FETCH_CATEGORIES_FAIL":
      return {
        ...state,
        start: false,
        fail: true,
        errorMassage: action.payload,
      };
  }

  if (action.type === "ADD_CATEGORY") {
    return {
      ...state,
      categories: [...state.categories, action.payload],
    };
  }

  if (action.type === "DELETE_CATEGORY") {
    const filteredCategories = state.categories.filter(
      (item) => item.id !== action.payload
    );
    return {
      ...state,
      categories: filteredCategories,
    };
  }
  if (action.type === "EDIT_CATEGORY") {
    const filteredCategories = state.categories.filter(
      (item) => item.id != action.payload
    );
    return {
      ...state,
      categories: [...filteredCategories, action.payload],
    };
  }

  return state;
};

export default categoriesReducer;
