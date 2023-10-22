import {
  LOGIN,
  SET_LOADING,
  LOGOUT,
  UPDATE_USER_PROFILE,
} from "../actionTypes";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";
export const LOGIN_URL = `${API_URL}/login`;
export const LOGOUT_URL = `${API_URL}/logout`;
export const REGISTER_URL = `${API_URL}/register`;
export const UPDATE_USER_PROFILE_URL = `${API_URL}/users`;

// Action creators

export const login = (values) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      const res = await axios.post(LOGIN_URL, values).then((res) => res.data);
      if (res) {
        await dispatch({ type: LOGIN, payload: res });
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

export const register = (values) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      const res = await axios
        .post(REGISTER_URL, values)
        .then((res) => res.data);
      if (res) {
        await dispatch({ type: LOGIN, payload: res });
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

export const updateUserProfile = (id, values) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      const res = await axios
        .put(`${UPDATE_USER_PROFILE_URL}/${id}`, values)
        .then((res) => res.data);
      if (res) {
        await dispatch({ type: UPDATE_USER_PROFILE, payload: res });
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

export const logout = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      const res = await axios.post(LOGOUT_URL).then((res) => res.data);
      if (res.success) {
        await dispatch({ type: LOGOUT, payload: true });
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
