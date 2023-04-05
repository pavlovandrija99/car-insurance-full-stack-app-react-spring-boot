import { useEffect, useState, useContext } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  getAllProposals,
  initializeProposal,
} from "../../services/ProposalService";

import Pagination from "../../components/layout/navigation_bar/Pagination";
import DriversContext from "../../context/drivers-context";
import ProposalContext from "../../context/proposal-context";

function ProposalsPage() {
  const [proposals, setProposals] = useState({
    objects: [],
  });

  const navigate = useNavigate();

  const proposalContext = useContext(ProposalContext);
  const driversContext = useContext(DriversContext);

  useEffect(() => {
    getAllProposals(0).then((response) => {
      if (response != null) {
        setProposals(response);
      }
    });
  }, []);

  const addProposalHandler = function (event) {
    event.preventDefault();

    proposalContext.setProposal({});

    driversContext.setAddedDrivers([]);
    driversContext.setDriver({});
    driversContext.setIsCompletelyNewDriver(false);
    driversContext.setIsAddNewDriverBtnClicked(false);
    driversContext.setIsSubscriberAddedAsDriver(false);
    driversContext.setPassedDriverIsSubscriber(false);
    driversContext.setIsAddSubscriberAsDriverBtnVisible(true);

    initializeProposal().then((response) => {
      if (response != null) {
        navigate("/add-proposal-subscriber/" + response.id);
      }
    });
  };

  const continueAddingProposal = (proposal) => {

    if (proposalContext.proposal.id !== proposal.id) {
      proposalContext.setProposal({});
      driversContext.setAddedDrivers([]);
      driversContext.setDriver({});
      driversContext.setIsCompletelyNewDriver(false);
      driversContext.setIsAddNewDriverBtnClicked(false);
      driversContext.setIsSubscriberAddedAsDriver(false);
      driversContext.setPassedDriverIsSubscriber(false);
      driversContext.setIsAddSubscriberAsDriverBtnVisible(true);
    }

    if (proposal.proposalStatus === "INITIALIZED")
      navigate("/add-proposal-subscriber/" + proposal.id);
    if (proposal.proposalStatus === "SUBSCRIBER_ADDED")
      navigate("/add-proposal-newcar/" + proposal.id);
    if (proposal.proposalStatus === "CAR_ADDED")
      navigate("/add-proposal-drivers/" + proposal.id);
    if (proposal.proposalStatus === "DRIVERS_ADDED")
      navigate("/choose-insurance-plan/" + proposal.id);
    if (proposal.proposalStatus === "INSURANCE_PLAN_ADDED")
      navigate("/confirm-proposal/" + proposal.id);
  };

  const previousPage = () => {
    if (proposals.hasPrevious) {
      getAllProposals(proposals.sliceNumber - 1).then((response) => {
        if (response != null) {
          setProposals(response);
        }
      });
    }
  };

  const nextPage = () => {
    if (proposals.hasNext) {
      getAllProposals(proposals.sliceNumber + 1).then((response) => {
        if (response != null) {
          setProposals(response);
        }
      });
    }
  };

  console.log("proposal context on proposals page:");
  console.log(proposalContext);

  console.log("drivers context on proposals page:");
  console.log(driversContext);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="h5">
              <b>Id</b>
            </th>
            <th className="h5">
              <b>Date</b>
            </th>
            <th className="h5">
              <b>Status</b>
            </th>
            <th className="h5">
              <b>Valid</b>
            </th>
            <th className="h5">
              <b>Licence number</b>
            </th>
            <th className="h5">
              <b>Amount</b>
            </th>
          </tr>
        </thead>
        <tbody>
          {proposals.objects.map((proposal) => {
            return (
              <tr key={`tr-${proposal.id}`}>
                <td key={`td-id-${proposal.id}`} className="h6">
                  {proposal.id}
                </td>
                <td key={`td-date-${proposal.id}`} className="h6">
                  {proposal.creationDate != null ? proposal.creationDate : null}
                </td>
                <td key={`td-status-${proposal.id}`} className="h6">
                  {proposal.proposalStatus}
                </td>
                <td key={`td-valid-${proposal.id}`} className="h6">
                  {proposal.isValid != null
                    ? proposal.isValid.toString()
                    : null}
                </td>
                <td key={`td-licence-${proposal.id}`} className="h6">
                  {proposal.licenceNum != null ? proposal.licenceNum : null}
                </td>
                <td key={`td-amount-${proposal.id}`} className="h6">
                  {proposal.amount != null ? proposal.amount : null}
                </td>
                {proposal.proposalStatus === "CONFIRMED" ||
                proposal.proposalStatus === "PAID" ? (
                  <td>
                    <Button variant="success" size="sm" onClick={() => navigate("/generate-report/" + proposal.id)}>
                      Download PDF
                    </Button>
                  </td>
                ) : (
                  <td>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => continueAddingProposal(proposal)}
                    >
                      Continue
                    </Button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>

      <div className="d-flex flex-row justify-content-between">
        <Pagination previousPage={previousPage} nextPage={nextPage} />
        <div className="d-flex justify-content-end me-5">
          <Button variant="dark" size="lg" onClick={addProposalHandler}>
            Create Proposal
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProposalsPage;
