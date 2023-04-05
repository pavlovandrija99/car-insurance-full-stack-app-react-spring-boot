import axios from "axios";

export const getAllSubscribers = async () => {
  let accessToken = localStorage.getItem("accessToken");

  let headers = {
    Authorization: "Bearer " + accessToken,
  };

  let o = await axios
    .get(`http://localhost:8080/car-insurance/subscribers`, { headers })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });

  return o;
};

export const getSubscribersByJmbg = async (jmbg, page) => {
  let accessToken = localStorage.getItem("accessToken");

  let headers = {
    Authorization: "Bearer " + accessToken,
  };

  let o = await axios
    .get(`http://localhost:8080/car-insurance/subscribers?jmbg=${jmbg}&page=${page}`, { headers })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });

  return o;
};

export const addSubscriberToProposal = async (subscriberId, proposalId) => {
  let accessToken = localStorage.getItem("accessToken");

  let headers = {
    Authorization: "Bearer " + accessToken,
  };

  let o = await axios
    .patch(`http://localhost:8080/car-insurance/proposals/${proposalId}/subscribers/${subscriberId}`, {}, { headers })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });

  return o;
};
