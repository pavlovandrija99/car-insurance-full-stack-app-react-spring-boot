import axios from "axios";

export const getAllCars = async (brandId, modelId, year, page) => {
  let accessToken = localStorage.getItem("accessToken");

  let headers = {
    Authorization: "Bearer " + accessToken,
  };

  let o = await axios
    .get(`http://localhost:8080/car-insurance/cars?brandId=${brandId}&modelId=${modelId}&year=${year}&page=${page}`, {
      headers,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });

  return o;
};
