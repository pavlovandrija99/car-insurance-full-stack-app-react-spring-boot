import axios from "axios";

export const getAllDriversByJmbg = async (jmbg, page) => {
  let accessToken = localStorage.getItem("accessToken");

  let headers = {
    Authorization: "Bearer " + accessToken,
  };

  let o = await axios
    .get(`http://localhost:8080/car-insurance/drivers?jmbg=${jmbg}&page=${page}`, { headers })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });

  return o;
};
