import axios from "axios";

export const getAllAddressesByZip = async (zipId) => {
  let accessToken = localStorage.getItem("accessToken");

  let headers = {
    Authorization: "Bearer " + accessToken,
  };

  let o = await axios
    .get(`http://localhost:8080/car-insurance/addresses/zip/${zipId}`, { headers })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });

  return o;
};
