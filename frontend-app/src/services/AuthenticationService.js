import axios from "axios";

export const login = async (loginInfo) => {
  let o = await axios
    .post(`http://localhost:8080/car-insurance/auth/login`, loginInfo)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      alert(error.response.data);
      return null;
    });

  return o;
};

export const myAuthorities = async (loginInfo) => {
  let accessToken = localStorage.getItem("accessToken");

  let headers = {
    Authorization: "Bearer " + accessToken,
  };

  let o = await axios
    .get(`http://localhost:8080/car-insurance/auth/myAuthorities`, { headers })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      alert(error.response.data);
      return null;
    });

  return o;
};
