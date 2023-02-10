import axios from "axios";
import { toast } from "react-hot-toast";
import { API } from "../backend";
import jwt_decode from "jwt-decode";

export const login = (email, password) => {
  return axios
    .post(`${API}/user/login`, { email, password })
    .then((res) => {
      console.log(res.data);

      if (res.data.success) {
        localStorage.setItem("token", JSON.stringify(res.data.data.token));
        localStorage.setItem("role", res.data.data.user.role);
        toast.success(res.data.message);
      }
      return res.data.success;
    })
    .catch((err) => {
      //   console.log(err.response.data);
      toast.error(err.response.data.message);
    });
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("token")) {
    return jwt_decode(JSON.parse(localStorage.getItem("token")));
  } else {
    return false;
  }
};

export const checkRole = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("role")) {
    return localStorage.getItem("role");
  } else {
    return false;
  }
};

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    return true;
  }
};

export const resetPassword = (id, token, password) => {
  return axios
    .put(`${API}/user/reset-password/${id}/${token}`, {
      password,
    })
    .then((res) => {
      console.log(res.data);
      if (res.data.success) {
        toast.success(res.data.message);
      }
      return res.data.success;
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.response.data.message);
    });
};

export const getNotifications = () => {
  return axios
    .get(`${API}/user/notifications`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      if (res.data.success) {
        return res.data.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
