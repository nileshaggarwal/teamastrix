import axios from "axios";
import { toast } from "react-hot-toast";
import { API } from "../backend";

export const createTeam = (name, description, members, leader) => {
  return axios
    .post(
      `${API}/team/create`,
      { name, description, members, leader },
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
      toast.error(err.response.data.message);
    });
};

export const getTeams = () => {
  return axios
    .get(`${API}/team/get`)
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

export const addMembers = (members, id) => {
  return axios
    .post(
      `${API}/team/add-members/${id}`,
      { members },
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
      toast.error(err.response.data.message);
    });
};

export const changeStatus = (id, status) => {
  return axios
    .put(
      `${API}/team/change-status/${id}`,
      { status },
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
      toast.error(err.response.data.message);
    });
};

export const getTeam = (id) => {
  return axios
    .get(`${API}/team/get/${id}`)
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

export const assignLeader = (id, leader) => {
  return axios
    .post(`${API}/team/assign-leader/${id}/${leader}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      if (res.data.success) {
        toast.success(res.data.message);
      }
      return res.data.success;
    })
    .catch((err) => {
      toast.error(err.response.data.message);
    });
};

export const getTeamById = (id) => {
  return axios
    .get(`${API}/team/get/${id}`)
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

export const updateTeam = (id, name, description, members) => {
  return axios
    .put(
      `${API}/team/update/${id}`,
      { name, description, members },
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
      toast.error(err.response.data.message);
    });
};
