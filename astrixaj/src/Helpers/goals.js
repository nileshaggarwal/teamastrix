import axios from "axios";
import { toast } from "react-hot-toast";
import { API } from "../backend";

export const createObjective = (data) => {
  return axios
    .post(`${API}/goal/create-objective`, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      if (res.data.success) {
        toast.success(res.data.message);
      }
      return res.data;
    })
    .catch((err) => {
      toast.error(err.response.data.message);
    });
};

export const createKeyResults = (data, id) => {
  console.log(data, id, "data, id");
  return axios
    .post(`${API}/goal/create-key-result/${id}`, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      if (res.data.success) {
        toast.success(res.data.message);
      }
      return res.data;
    })
    .catch((err) => {
      toast.error(err.response.data.message);
    });
};

export const getAllGoals = () => {
  return axios
    .get(`${API}/goal/getAll`)
    .then((res) => {
      console.log(res.data);
      if (res.data.success) {
        return res.data.data;
      }
    })
    .catch((err) => {
      toast.error(err.response.data.message);
    });
};
export const getOkrsByUserId = () => {
  return axios
    .get(`${API}/goal/key-results/user`, {
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
      toast.error(err.response.data.message);
    });
};

export const updateOkrProgress = (id, value) => {
  return axios
    .put(
      `${API}/goal/update-progress/${id}`,
      { value },
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
      return res.data;
    });
};
export const getOkrsByTeamId = (id) => {
  return axios
    .get(`${API}/goal/key-results/team/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
    .then((res) => {
      if (res.data.success) {
        return res.data.data;
      }
    })
    .catch((err) => {
      toast.error(err.response.data.message);
    });
};

export const createSubmileStone = (data, id) => {
  return axios
    .put(`${API}/goal/update-milestone/${id}`, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      if (res.data.success) {
        toast.success(res.data.message);
      }
      return res.data;
    })
    .catch((err) => {
      toast.error(err.response.data.message);
    });
};
