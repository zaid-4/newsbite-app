const initialState = {
  newsList: [],
  prefrences: {},
  newsDetail: {},
  pagination: {
    currentPage: 1,
    itemsPerPage: 15,
    lastPage: 1,
  },
  categories: [],
  sources: [],
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
    case "SET_PAGINATION":
      return {
        ...state,
        pagination: action.payload,
      };
    default:
      return state;
  }
};

export default newsReducer;
