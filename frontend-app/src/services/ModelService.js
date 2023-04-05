import axios from "axios";

export const getAllModels = async (brandId, modelId) => {
  let accessToken = localStorage.getItem("accessToken");

  let headers = {
    Authorization: "Bearer " + accessToken,
  };

  let o = await axios
    .get(`http://localhost:8080/car-insurance/models?brand=${brandId}&model=${modelId}`, { headers })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });

  return o;
};

/*export const getModelsByBrand = async (brandId) => {
  let o = await axios
    .get(`http://localhost:8080/car-insurance/models?brand=${brandId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });

  return o;
};

export const getYearsByModel = async (modelId) => {
  let o = await axios
    .get(`http://localhost:8080/car-insurance/models?brand=&model=${modelId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });

  return o;
};*/
