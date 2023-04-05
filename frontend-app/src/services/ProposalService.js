import axios from "axios";

export const getAllProposals = async (page) => {
  let accessToken = localStorage.getItem("accessToken");

  let headers = {
    Authorization: "Bearer " + accessToken,
  };

  let o = await axios
    .get(`http://localhost:8080/car-insurance/proposals/page/${page}`, { headers })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });

  return o;
};

export const getProposalById = async (proposalId) => {
  let accessToken = localStorage.getItem("accessToken");

  let headers = {
    Authorization: "Bearer " + accessToken,
  };

  let o = await axios
    .get(`http://localhost:8080/car-insurance/proposals/${proposalId}`, { headers })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });

  return o;
};

export const initializeProposal = async () => {
  let accessToken = localStorage.getItem("accessToken");

  let headers = {
    Authorization: "Bearer " + accessToken,
  };

  let o = await axios
    .post("http://localhost:8080/car-insurance/proposals/", {}, { headers })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });

  return o;
};

export const createNewSubscriberAndAddToProposal = async (proposalId, data) => {
  let accessToken = localStorage.getItem("accessToken");

  let headers = {
    Authorization: "Bearer " + accessToken,
  };

  let o = await axios
    .patch(`http://localhost:8080/car-insurance/proposals/${proposalId}/create-and-add-subscriber`, data, { headers })
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

export const addCarWithLicenceNumToProposal = async (car, licenceNum, proposalId) => {
  let accessToken = localStorage.getItem("accessToken");

  let headers = {
    Authorization: "Bearer " + accessToken,
  };

  let o = await axios
    .patch(
      `http://localhost:8080/car-insurance/proposals/${proposalId}/add-car-to-proposal`,
      {
        car: car,
        licenceNum: licenceNum,
      },
      { headers }
    )
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

export const addDriversToProposal = async (proposalId, drivers) => {
  let accessToken = localStorage.getItem("accessToken");

  let headers = {
    Authorization: "Bearer " + accessToken,
  };

  let o = await axios
    .patch(`http://localhost:8080/car-insurance/proposals/${proposalId}/add-drivers-to-proposal`, drivers, { headers })
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

export const addInsurancePlanToProposal = async (proposalId, insurancePlan) => {
  let accessToken = localStorage.getItem("accessToken");

  let headers = {
    Authorization: "Bearer " + accessToken,
  };

  let o = await axios
    .patch(`http://localhost:8080/car-insurance/proposals/add-plan-to-proposal/${proposalId}`, insurancePlan, {
      headers,
    })
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

export const confirmProposal = async (proposalId) => {
  let accessToken = localStorage.getItem("accessToken");

  let headers = {
    Authorization: "Bearer " + accessToken,
  };

  let o = await axios
    .patch(`http://localhost:8080/car-insurance/proposals/${proposalId}/confirm-proposal`, {}, { headers })
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

export const payProposal = async (proposalId, paymentObject) => {
  let accessToken = localStorage.getItem("accessToken");

  let headers = {
    Authorization: "Bearer " + accessToken,
  };

  let o = await axios
    .patch(`http://localhost:8080/car-insurance/proposals/pay-proposal/${proposalId}`, paymentObject, { headers })
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

export const generateReport = async (proposalId) => {
  let accessToken = localStorage.getItem("accessToken");

  let headers = {
    Authorization: "Bearer " + accessToken,
  };

  let o = await axios
    .post(`http://localhost:8080/car-insurance/proposals/generate-report/${proposalId}`, {}, { headers })
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
