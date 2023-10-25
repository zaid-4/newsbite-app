import {
  GET_ALL_NEWS,
  GET_NEWS_DETAIL,
  SET_LOADING,
  SET_PAGINATION,
  GET_NEWS_META,
} from "../actionTypes";
import axios from "axios";
import configData from "../../../Config.json";

const API_URL = configData.SERVER_URL;

export const GET_NEWS_DETAIL_URL = `${API_URL}/news`;
export const GET_NEWS_META_URL = `${API_URL}/news-meta`;

export const getAllNews = (params, isAuthorized) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      const res = await axios
        .get(`${API_URL}/${isAuthorized ? "news" : "all-news"}`, {
          params: params,
        })
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

export const getNewsDetail = (id, isAuthorized) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      const res = await axios
        .get(`${API_URL}/${isAuthorized ? "news" : "all-news"}/${id}`)
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

export const getNewsMeta = (values, isAuthorized) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      const res = await axios
        .get(`${API_URL}/${isAuthorized ? "news-meta" : "all-news-meta"}`, {
          params: values,
        })
        .then((res) => res.data);
      if (res) {
        await dispatch({ type: GET_NEWS_META, payload: res });
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
