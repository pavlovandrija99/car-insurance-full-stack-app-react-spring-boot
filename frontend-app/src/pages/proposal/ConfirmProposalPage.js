import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Table } from "react-bootstrap";
import {
  getProposalById,
  confirmProposal,
} from "../../services/ProposalService";
import { InfinitySpin } from "react-loader-spinner";
import Button from "react-bootstrap/Button";
import { Stepper } from "../../utils/Components";
import DriversContext from "../../context/drivers-context";
import ProposalContext from "../../context/proposal-context";

import "./ConfirmProposal.css";

function ConfirmProposalPage() {
  const navigate = useNavigate();

  const { proposalId } = useParams();

  const [proposal, setProposal] = useState(null);

  const proposalContext = useContext(ProposalContext);
  const driversContext = useContext(DriversContext);

  useEffect(() => {
    getProposalById(proposalId).then((response) => {
      if (response !== null) {
        setProposal(response);
        proposalContext.setProposal(response);
      }
    });
  }, [proposalId]);

  const confirmProposalHandler = () => {

    if (proposalContext.proposal.car != null
      && proposalContext.proposal.drivers != null
      && proposalContext.proposal.insurancePlan != null
      && proposalContext.proposal.subscriber != null) {
        confirmProposal(proposalId).then((response) => {
          if (response != null) {
            alert(`Proposal with ID ${proposalId} confirmed!`);
            setProposal(response);
            proposalContext.setProposal({});
            driversContext.setAddedDrivers([]);
            driversContext.setDriver({});
            driversContext.setIsCompletelyNewDriver(false);
            driversContext.setIsAddNewDriverBtnClicked(false);
            driversContext.setIsSubscriberAddedAsDriver(false);
            driversContext.setPassedDriverIsSubscriber(false);
            driversContext.setIsAddSubscriberAsDriverBtnVisible(true);

            navigate(`/pay-proposal/${proposalId}`);
          }
        });
      } else {
        alert(`PROPOSAL MUST HAVE ADDED SUBSCRIBER, CAR, DRIVERS AND INSURANCE PLAN IN ORDER TO BE CONFIRMED!!!`);
        window.scrollTo(0,0);
      }
  };

  console.log(`proposal from db:`);
  console.log(proposal);

  console.log(`proposal context on confirm proposal page`);
  console.log(proposalContext);

  console.log("drivers context on confirm proposal page");
  console.log(driversContext);

  return (
    <div className="container mb-5">
      <Stepper step5 proposalId={proposalId} />
      <Card className="text-center" border="success" style={{ margin: "20px" }}>
        <Card.Header>
          <h1>Proposal info</h1>
        </Card.Header>
        <Card.Body>
          {!proposal ? (
            <InfinitySpin
              height="200"
              width="200"
              radius="20"
              color="green"
              ariaLabel="loading"
              wrapperStyle
              wrapperClass
            />
          ) : (
            <>
              <h3>General:</h3>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID:</th>
                    <th>Creation Date:</th>
                    <th>Status:</th>
                    <th>Amount:</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{proposal.id}</td>
                    <td>{proposal.creationDate}h</td>
                    <td>{proposal.proposalStatus}</td>
                    <td>{proposal.amount} €</td>
                  </tr>
                </tbody>
              </Table>

              <h3>Subscriber:</h3>
              {proposal.subscriber ?
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID:</th>
                      <th>Full Name</th>
                      <th>JMBG</th>
                      <th>Date of Birth:</th>
                      <th>Address:</th>
                      <th>Contact:</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{proposal.subscriber.id}</td>
                      <td>
                        {proposal.subscriber.person.firstName}{" "}
                        {proposal.subscriber.person.lastName}
                      </td>
                      <td>{proposal.subscriber.person.jmbg}</td>
                      <td>{proposal.subscriber.person.birth}</td>
                      <td>
                        {proposal.subscriber.person.address.street}{" "}
                        {proposal.subscriber.person.address.streetNumber}
                      </td>
                      <td>{proposal.subscriber.person.contact.mobilePhone}</td>
                    </tr>
                  </tbody>
                </Table> :
                <InfinitySpin
                  height="200"
                  width="200"
                  radius="20"
                  color="green"
                  ariaLabel="loading"
                  wrapperStyle
                  wrapperClass
                />
              }

              <h3>Car:</h3>
              {proposal.car ?
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID:</th>
                      <th>Brand:</th>
                      <th>Model:</th>
                      <th>Year Made:</th>
                      <th>Licence Number:</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{proposal.car.id}</td>
                      <td>{proposal.car.model.brand.name}</td>
                      <td>{proposal.car.model.name}</td>
                      <td>{proposal.car.year}</td>
                      <td>{proposal.licenceNum}</td>
                    </tr>
                  </tbody>
                </Table> :
                <InfinitySpin
                  height="200"
                  width="200"
                  radius="20"
                  color="green"
                  ariaLabel="loading"
                  wrapperStyle
                  wrapperClass
                />
              }

              <h3>Drivers:</h3>
              {proposal.drivers === null || JSON.stringify(proposal.drivers) === "[]" ? (
                <InfinitySpin
                  height="200"
                  width="200"
                  radius="20"
                  color="green"
                  ariaLabel="loading"
                  wrapperStyle
                  wrapperClass
                />
              ) : (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID:</th>
                      <th>Full Name</th>
                      <th>JMBG</th>
                      <th>Date of Birth:</th>
                      <th>Address:</th>
                      <th>Contact:</th>
                      <th>Driving Licence Number:</th>
                      <th>Driving Licence Obtained:</th>
                    </tr>
                  </thead>
                  <tbody>
                    {proposal.drivers.map((driver, index) => {
                      return (
                        <React.Fragment key={`fragment-${index}`}>
                          <tr key={`tr-driver-info${index}`}>
                            <td key={`td-id-${index}`}>{driver.id}</td>
                            <td key={`td-fullname-${index}`}>
                              {driver.person.firstName} {driver.person.lastName}
                            </td>
                            <td key={`td-jmbg-${index}`}>
                              {driver.person.jmbg}
                            </td>
                            <td key={`td-birth-${index}`}>
                              {driver.person.birth}
                            </td>
                            <td key={`td-address-${index}`}>
                              {driver.person.address.street}{" "}
                              {driver.person.address.streetNumber}
                            </td>
                            <td key={`td-contact-${index}`}>
                              {driver.person.contact.mobilePhone}
                            </td>
                            <td key={`td-licencenum-${index}`}>
                              {driver.licenceNum}
                            </td>
                            <td key={`td-licenceobtained-${index}`}>
                              {driver.licenceObtained}
                            </td>
                          </tr>
                          <tr key={`tr-driveraccidenthistoryinfo-${index + 1}`}>
                            <td colSpan={2}></td>
                            <td
                              key={`td-driveraccidenthistortyrowname-${
                                index + 1
                              }`}
                              colSpan={2}
                            >
                              <b key={`bold-accidenthistory-${index + 1}`}>
                                Driver Accident History
                              </b>
                              :
                            </td>
                            <td
                              key={`td-driveraccidenthistorydata-${index + 1}`}
                              colSpan={6}
                            >
                              {driver.accidentHistories.map(
                                (accidentHistory, index) => {
                                  return (
                                    <ul key={index}>
                                      <li key={`li-description-${index}`}>
                                        {accidentHistory.description}.<br />
                                        Time of accident: &nbsp;
                                        {accidentHistory.timeHappened}h<br />
                                        Was driver responsible: &nbsp;
                                        {accidentHistory.wasResponsible
                                          ? "Yes"
                                          : "No"}
                                      </li>
                                    </ul>
                                  );
                                }
                              )}
                            </td>
                          </tr>
                          <tr key={`tr-driverrisksinfo-${index + 2}`}>
                            <td colSpan={2}></td>
                            <td
                              key={`td-driverriskstitle-${index + 2}`}
                              colSpan={2}
                            >
                              <b key={`bold-driverrisks-${index + 2}`}>
                                Driver Risks:
                              </b>
                            </td>
                            <td key={`td-driverrisks-${index + 2}`} colSpan={6}>
                              {driver.risks.map((risk, index) => {
                                return (
                                  <ul key={index}>
                                    <li key={`li-description-${index}`}>
                                      {risk.description}.
                                    </li>
                                  </ul>
                                );
                              })}
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </Table>
              )}

              <h3>Insurance Plan:</h3>
              {proposal.insurancePlan === null ? (
                <InfinitySpin
                  height="200"
                  width="200"
                  radius="20"
                  color="green"
                  ariaLabel="loading"
                  wrapperStyle
                  wrapperClass
                />
              ) : (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th></th>
                      <th>ID:</th>
                      <th>Name:</th>
                      <th>Is Premium:</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                      <td>{proposal.insurancePlan.id}</td>
                      <td>{proposal.insurancePlan.name}</td>
                      <td>{proposal.insurancePlan.isPremium ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                      <td colSpan={4}>
                        <h5>
                          ({proposal.franchises.length}
                          )&nbsp;
                          {proposal.franchises.length > 1
                            ? "Insurance plan items:"
                            : "Insurance plan item:"}
                        </h5>
                      </td>
                    </tr>
                    {proposal.franchises.map(
                      (franchise, index) => {
                        return (
                          <tr key={franchise.id}>
                            <td></td>
                            <td>
                              <b>{index + 1}. Item:</b>
                            </td>
                            <td colSpan={2}>
                              <ul className="no-bullets">
                                <li>
                                  <b>ID:</b>&nbsp;&nbsp;{franchise.insuranceItem.id}
                                </li>
                                <li>
                                  <b>Name:</b>&nbsp;&nbsp;{franchise.insuranceItem.name}
                                </li>
                                <li>
                                  <b>Amount:</b>&nbsp;&nbsp;
                                  {franchise.insuranceItem.amount}
                                </li>
                                <li>
                                  <b>Franchise percentage:</b>&nbsp;&nbsp;
                                  {franchise.percentage}%
                                </li>
                                <li>
                                  <b>Is optional:</b>&nbsp;&nbsp;
                                  {franchise.insuranceItem.isOptional ? "Yes" : "No"}
                                </li>
                              </ul>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </Table>
              )}
            </>
          )}
        </Card.Body>
        <Card.Footer>
          <Button type="submit" onClick={confirmProposalHandler}>
            Confrim
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default ConfirmProposalPage;
