import {
  GET_ALL_NEWS,
  GET_NEWS_DETAIL,
  SET_LOADING,
  SET_PAGINATION,
  GET_CATEGORIES_AND_SOURCES,
} from "../actionTypes";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";
export const GET_NEWS_URL = `${API_URL}/news`;
export const GET_NEWS_DETAIL_URL = `${API_URL}/news`;
export const GET_CATEGORIES_AND_SOURCES_URL = `${API_URL}/news/categories-sources`;

// Action creators

export const getAllNews = (params) => {
  console.log(params);
  return async (dispatch) => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      const res = await axios
        .get(`${GET_NEWS_URL}?page=${params.current_page}`, params)
        .then((res) => res.data);
      if (res) {
        const paginationData = {
          currentPage: res.current_page,
          lastPage: res.last_page,
          itemsPerPage: 15,
        };
        await dispatch({ type: GET_ALL_NEWS, payload: res.data });
        await dispatch({ type: SET_PAGINATION, payload: paginationData });
        await dispatch({ type: SET_LOADING, payload: false });
        return true;
      }
    } catch (e) {
      const error = await e.message;
      console.log("Request Error", error);
      dispatch({ type: SET_LOADING, payload: false });
      return false;
    }
  };
};

export const getNewsDetail = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      const res = await axios
        .get(`${GET_NEWS_DETAIL_URL}/${id}`)
        .then((res) => res.data);
      if (res) {
        await dispatch({ type: GET_NEWS_DETAIL, payload: res.news });
        await dispatch({ type: SET_LOADING, payload: false });
        return true;
      }
    } catch (e) {
      const error = await e.message;
      console.log("Request Error", error);
      dispatch({ type: SET_LOADING, payload: false });
      return false;
    }
  };
};

export const getAllCategoriesAndSources = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      const res = await axios.get(GET_NEWS_DETAIL_URL).then((res) => res.data);
      if (res) {
        await dispatch({ type: GET_CATEGORIES_AND_SOURCES, payload: res });
        await dispatch({ type: SET_LOADING, payload: false });
        return true;
      }
    } catch (e) {
      const error = await e.message;
      console.log("Request Error", error);
      dispatch({ type: SET_LOADING, payload: false });
      return false;
    }
  };
};
