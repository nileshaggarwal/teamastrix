import axios from "axios";
import { toast } from "react-hot-toast";
import { API } from "../backend";
import jwt_decode from "jwt-decode";

export const addEmployee = (name, email, department, designation) => {
  return axios
    .post(
      `${API}/user/add`,
      { name, email, department, designation },
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    )
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

export const getEmployees = () => {
  return axios
    .get(`${API}/user/get/all`)
    .then((res) => {
      if (res.data.success) {
        return res.data.data;
      }
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.response.data.message);
    });
};
