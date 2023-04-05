import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import ProposalsPage from "./pages/proposal/ProposalsPage";
import NavigationBar from "./components/layout/navigation_bar/NavigationBar";
import NewSubscriberPage from "./pages/proposal/NewSubscriberPage";
import NewCarPage from "./pages/NewCarPage";
import AddDriversPage from "./pages/AddDriversPage";
import ChooseInsurancePlanPage from "./pages/ChooseInsurancePlanPage";
import ConfirmProposalPage from "./pages/proposal/ConfirmProposalPage";
import PaymentPage from "./pages/PaymentPage";
import GenerateReportPage from "./pages/GenerateReportPage";
import LoginPage from "./pages/LoginPage";
import { useEffect, useState } from "react";
import { myAuthorities } from "./services/AuthenticationService";
import UnauthorizedPage from "./pages/UnauthorizedPage";

function App() {
  const [authorities, setAuthorities] = useState([]);
  const location = useLocation();

  useEffect(() => {
    myAuthorities().then(response => {
      if(response != null) {
        setAuthorities(response);
      }
    });
  }, [location]);

  const hasAuthority = (authority) => {
    if (authorities.includes(authority))
      return true;
    else
      return false;
  };

  return (
    <div className="App">
      <NavigationBar listOfAuthorities={authorities} />
      <Routes>
        <Route path="/" element={hasAuthority("AGENT") ? <ProposalsPage /> : <UnauthorizedPage />} />
        <Route
          path="/add-proposal-subscriber/:proposalId"
          element={hasAuthority("AGENT") ? <NewSubscriberPage /> : <UnauthorizedPage />}
        />
        <Route
          path="/add-proposal-newcar/:proposalId"
          element={hasAuthority("AGENT") ? <NewCarPage /> : <UnauthorizedPage />}
        />
        <Route
          path="/add-proposal-drivers/:proposalId"
          element={hasAuthority("AGENT") ? <AddDriversPage /> : <UnauthorizedPage />}
        />
        <Route
          path="/choose-insurance-plan/:proposalId"
          element={hasAuthority("AGENT") ? <ChooseInsurancePlanPage /> : <UnauthorizedPage />}
        />
        <Route
          path="/confirm-proposal/:proposalId"
          element={hasAuthority("AGENT") ? <ConfirmProposalPage /> : <UnauthorizedPage />}
        />
        <Route
          path="/pay-proposal/:proposalId"
          element={hasAuthority("AGENT") ? <PaymentPage /> : <UnauthorizedPage />}
        />
        <Route
          path="/generate-report/:proposalId"
          element={hasAuthority("AGENT") ? <GenerateReportPage /> : <UnauthorizedPage />}
        />
        <Route
          path="/login"
          element={<LoginPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
