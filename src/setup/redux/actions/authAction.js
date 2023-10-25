import {
  LOGIN,
  SET_LOADING,
  LOGOUT,
  UPDATE_USER_PROFILE,
  RESET_NEWS_STATE,
} from "../actionTypes";
import axios from "axios";
import configData from "../../../Config.json";
import { toast } from "react-toastify";

const API_URL = configData.SERVER_URL;
export const LOGIN_URL = `${API_URL}/login`;
export const LOGOUT_URL = `${API_URL}/logout`;
export const REGISTER_URL = `${API_URL}/register`;
export const UPDATE_USER_PROFILE_URL = `${API_URL}/update-profile`;
export const UPDATE_USER_PREFRENCES_URL = `${API_URL}/user-prefrences`;

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
      const error = await e.response.data.message;
      toast.error("Error! Invalid email or password");
      toast.error(`Error! ${error}`);
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
        await toast.success("Registration Completed Successfully!");
        return true;
      }
    } catch (e) {
      const error = await e.response.data.message;
      toast.error(`Error! ${error}`);
      dispatch({ type: SET_LOADING, payload: false });
      return false;
    }
  };
};

export const updateUserProfile = (values) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      const res = await axios
        .put(`${UPDATE_USER_PROFILE_URL}`, values)
        .then((res) => res.data);
      if (res) {
        await dispatch({ type: UPDATE_USER_PROFILE, payload: res });
        await dispatch({ type: SET_LOADING, payload: false });
        await toast.success("Success! Profile Updated.");
        return true;
      }
    } catch (e) {
      const error = await e.response.data.message;
      toast.error(`Error! ${error}`);
      dispatch({ type: SET_LOADING, payload: false });
      return false;
    }
  };
};

export const updateUserPrefrences = (values) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      const res = await axios
        .put(`${UPDATE_USER_PREFRENCES_URL}`, values)
        .then((res) => res.data);
      if (res) {
        await dispatch({ type: UPDATE_USER_PROFILE, payload: res });
        await dispatch({ type: SET_LOADING, payload: false });
        await toast.success("Success! News Prefrences updated");
        return true;
      }
    } catch (e) {
      const error = await e.response.data.message;
      toast.error(`Error! ${error}`);
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
        await dispatch({ type: RESET_NEWS_STATE, payload: true });
        await dispatch({ type: SET_LOADING, payload: false });
        return true;
      }
    } catch (e) {
      const error = await e.response.data.message;
      toast.error(`Error! ${error}`);
      dispatch({ type: SET_LOADING, payload: false });
      return false;
    }
  };
};
