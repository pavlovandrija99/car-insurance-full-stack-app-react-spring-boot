import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { ProposalContextProvider } from "./context/proposal-context";
import { DriversContextProvider } from "./context/drivers-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ProposalContextProvider>
    <DriversContextProvider>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </DriversContextProvider>
  </ProposalContextProvider>
);
