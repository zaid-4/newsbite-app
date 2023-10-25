const initialState = {
  newsList: [],
  newsDetail: {},
  pagination: {
    currentPage: 1,
    itemsPerPage: 15,
    lastPage: 1,
  },
  categories: [],
  sources: [],
  authors: [],
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_NEWS":
      return {
        ...state,
        newsList: action.payload,
      };
    case "GET_NEWS_DETAIL":
      return {
        ...state,
        newsDetail: action.payload,
      };
    case "GET_NEWS_META":
      return {
        ...state,
        categories: action.payload.categories,
        sources: action.payload.sources,
        authors: action.payload.authors,
      };
    case "SET_PAGINATION":
      return {
        ...state,
        pagination: action.payload,
      };
    case "RESET_NEWS_STATE":
      return initialState;
    default:
      return state;
  }
};

export default newsReducer;
