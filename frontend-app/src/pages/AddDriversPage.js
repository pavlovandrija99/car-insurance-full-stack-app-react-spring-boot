import { useEffect, useState, useContext } from "react";

import ProposalContext from "../context/proposal-context";
import DriversContext from "../context/drivers-context";

import Button from "react-bootstrap/Button";
import { Accordion } from "react-bootstrap";

import { Alert, Card, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Pagination, SearchBox, Stepper, Form } from "../utils/Components";

import {
  getProposalById,
  addDriversToProposal,
} from "../services/ProposalService";
import { getAllDriversByJmbg } from "../services/DriverService";
import { getAllRisks } from "../services/RiskService";

function AddDriversPage() {
  let { proposalId } = useParams();

  const proposalContext = useContext(ProposalContext);
  const driversContext = useContext(DriversContext);

  const navigate = useNavigate();

  const [pageState, setPageState] = useState({
    hasNext: true,
    hasPrevious: false,
    sliceNumber: 0,
  });

  const [drivers, setDrivers] = useState([]);
  const [proposal, setProposal] = useState({});
  const [addedDrivers, setAddedDrivers] = useState([]);
  const [driver, setDriver] = useState({});
  const [isCompletelyNewDriver, setIsCompletelyNewDriver] = useState(false);
  const [jmbg, setJmbg] = useState("");
  const [isAddNewDriverBtnClicked, setIsAddNewDriverBtnClicked] =
    useState(false);
  const [isSubscriberAddedAsDriver, setIsSubscriberAddedAsDriver] =
    useState(false);
  const [passedDriverIsSubscriber, setPassedDriverIsSubscriber] =
    useState(false);
  const [
    isAddSubscriberAsDriverBtnVisible,
    setIsAddSubscriberAsDriverBtnVisible,
  ] = useState(true);

  const [risks, setRisks] = useState([]);
  const [checkedDriverRisks, setCheckedDriverRisks] = useState([]);
  const [accidents, setAccidents] = useState([]);

  useEffect(() => {
    getAllDriversByJmbg("", 0).then((response) => {
      if (response != null) {
        setDrivers(response.objects);
        updatePageState(response);
      }
    });

    getProposalById(proposalId).then((response) => {
      if (response != null) {
        setProposal(response);
        proposalContext.setProposal(response);
      }
    });
  }, []);

  const updatePageState = (response) => {
    const tmp = {
      hasNext: response.hasNext,
      hasPrevious: response.hasPrevious,
      sliceNumber: response.sliceNumber,
      totalElements: response.totalElements,
      totalNumberOfPages: response.totalNumberOfPages,
    };
    setPageState(tmp);
  };

  const searchDrivers = (inputText) => {
    setJmbg(inputText);

    getAllDriversByJmbg(inputText, pageState.sliceNumber).then((response) => {
      if (response != null) {
        setDrivers(response.objects);
        updatePageState(response);
      }
    });
  };

  const resetPageNumber = () => {
    const tmp = {
      hasNext: true,
      hasPrevious: false,
      sliceNumber: 0,
    };
    setPageState(tmp);
  };

  const jmbgValidation = (inputText) => {
    if (inputText.length === 0 || inputText.match(new RegExp(/^\d{1,13}$/))) {
      return true;
    } else {
      return false;
    }
  };

  const previousPage = () => {
    if (pageState.hasPrevious) {
      getAllDriversByJmbg(jmbg, pageState.sliceNumber - 1).then((response) => {
        if (response != null) {
          setDrivers(response.objects);
          updatePageState(response);
        }
      });
    }
  };

  const nextPage = () => {
    if (pageState.hasNext) {
      getAllDriversByJmbg(jmbg, pageState.sliceNumber + 1).then((response) => {
        if (response != null) {
          setDrivers(response.objects);
          updatePageState(response);
        }
      });
    }
  };

  const isDriverAdded = (driver) => {
    /*if (addedDrivers.filter((d) => d.id === driver.id).length > 0) return true;
    else return false;*/
    if (
      driversContext.addedDrivers.filter((d) => d.id === driver.id).length > 0
    )
      return true;
    else return false;
  };

  const addDriversToProposalHandler = () => {
    let data = {
      newDrivers: [],
      existingDrivers: [],
      subscriber: null,
    };

    for (let i = 0; i < driversContext.addedDrivers.length; i++) {
      if (
        driversContext.addedDrivers[i].id === null &&
        driversContext.addedDrivers[i].subscriberId === null
      ) {
        // Adding new drivers
        let birthDate =
          driversContext.addedDrivers[i].person.birth.substring(6) +
          "-" +
          driversContext.addedDrivers[i].person.birth.substring(3, 5) +
          "-" +
          driversContext.addedDrivers[i].person.birth.substring(0, 2);

        let newDriver = {
          firstName: driversContext.addedDrivers[i].person.firstName,
          lastName: driversContext.addedDrivers[i].person.lastName,
          jmbg: driversContext.addedDrivers[i].person.jmbg,
          birth: birthDate,
          homePhone: driversContext.addedDrivers[i].contact.homePhone,
          mobilePhone: driversContext.addedDrivers[i].contact.mobilePhone,
          email: driversContext.addedDrivers[i].contact.email,
          addressId: driversContext.addedDrivers[i].addressId,
          licenceNum: driversContext.addedDrivers[i].licenceNum,
          licenceObtained:
            driversContext.addedDrivers[i].licenceObtained.substring(6) +
            "-" +
            driversContext.addedDrivers[i].licenceObtained.substring(3, 5) +
            "-" +
            driversContext.addedDrivers[i].licenceObtained.substring(0, 2),
          risksIds: [],
          accidentHistories: [],
        };

        for (let j = 0; j < driversContext.addedDrivers[i].risks.length; j++) {
          newDriver.risksIds.push(driversContext.addedDrivers[i].risks[j].id);
        }

        for (
          let k = 0;
          k < driversContext.addedDrivers[i].accidents.length;
          k++
        ) {
          let accidentHistory = {
            timeHappened: "1970-01-01",
            wasResponsible:
              driversContext.addedDrivers[i].accidents[k].wasResponsible,
            description:
              driversContext.addedDrivers[i].accidents[k].description,
          };

          newDriver.accidentHistories.push(accidentHistory);
        }

        data.newDrivers.push(newDriver);
      } else if (driversContext.addedDrivers[i].id !== null) {
        // Adding existing drivers
        let newExistingDriver = {
          id: driversContext.addedDrivers[i].id,
          risksIds: [],
          accidentHistories: [],
        };

        for (let j = 0; j < driversContext.addedDrivers[i].risks.length; j++) {
          newExistingDriver.risksIds.push(
            driversContext.addedDrivers[i].risks[j].id
          );
        }

        for (
          let k = 0;
          k < driversContext.addedDrivers[i].accidents.length;
          k++
        ) {
          let accidentHistory = {
            timeHappened: "1970-01-01",
            wasResponsible:
              driversContext.addedDrivers[i].accidents[k].wasResponsible,
            description:
              driversContext.addedDrivers[i].accidents[k].description,
          };

          newExistingDriver.accidentHistories.push(accidentHistory);
        }

        data.existingDrivers.push(newExistingDriver);
      } else if (driversContext.addedDrivers[i].subscriberId !== null) {
        // Adding subscriber
        // dodati subscribera sa informacijama

        let subscriber = {
          id: driversContext.addedDrivers[i].subscriberId,
          licenceNum: driversContext.addedDrivers[i].licenceNum,
          licenceObtained:
            driversContext.addedDrivers[i].licenceObtained.substring(6) +
            "-" +
            driversContext.addedDrivers[i].licenceObtained.substring(3, 5) +
            "-" +
            driversContext.addedDrivers[i].licenceObtained.substring(0, 2),
          risksIds: [],
          accidentHistories: [],
        };

        for (let j = 0; j < driversContext.addedDrivers[i].risks.length; j++) {
          subscriber.risksIds.push(driversContext.addedDrivers[i].risks[j].id);
        }

        for (
          let k = 0;
          k < driversContext.addedDrivers[i].accidents.length;
          k++
        ) {
          let accidentHistory = {
            timeHappened: "1970-01-01",
            wasResponsible:
              driversContext.addedDrivers[i].accidents[k].wasResponsible,
            description:
              driversContext.addedDrivers[i].accidents[k].description,
          };

          subscriber.accidentHistories.push(accidentHistory);
        }

        data.subscriber = subscriber;
      }
    }

    addDriversToProposal(proposalId, data).then((response) => {
      if (response != null) {
        setIsSubscriberAddedAsDriver(false);
        setAddedDrivers([]);

        navigate(`/choose-insurance-plan/${proposalId}`);
      } else {
        alert("Error!");
      }
    });
  };

  const addCompletelyNewDriverHandler = () => {
    setIsAddNewDriverBtnClicked(true);
    driversContext.setIsAddNewDriverBtnClicked(true);
    setIsCompletelyNewDriver(true);
    driversContext.setIsCompletelyNewDriver(true);
    setIsAddSubscriberAsDriverBtnVisible(false);
    driversContext.setIsAddSubscriberAsDriverBtnVisible(false);
    setPassedDriverIsSubscriber(false);
    driversContext.setPassedDriverIsSubscriber(false);
  };

  const searchDriversHandler = () => {
    setDriver({});
    driversContext.setDriver({});
    setCheckedDriverRisks([]);
    setAccidents([]);
    setRisks([]);
    setIsAddNewDriverBtnClicked(false);
    driversContext.setIsAddNewDriverBtnClicked(false);
    setIsCompletelyNewDriver(false);
    driversContext.setIsCompletelyNewDriver(false);
    setIsAddSubscriberAsDriverBtnVisible(true);
    driversContext.setIsAddSubscriberAsDriverBtnVisible(true);
    setPassedDriverIsSubscriber(false);
    driversContext.setPassedDriverIsSubscriber(false);
  };

  const addDriverHandler = (driver) => {
    if (isDriverAdded(driver)) {
      alert(
        driver.person.firstName +
          " " +
          driver.person.lastName +
          " is already added to the list of drivers!"
      );
    } else {
      setDriver(driver);
      driversContext.setDriver(driver);
      setIsAddNewDriverBtnClicked(true);
      driversContext.setIsAddNewDriverBtnClicked(true);
      setIsAddSubscriberAsDriverBtnVisible(false);
      driversContext.setIsAddSubscriberAsDriverBtnVisible(false);
      setIsCompletelyNewDriver(false);
      driversContext.setIsCompletelyNewDriver(false);
      setPassedDriverIsSubscriber(false);
      driversContext.setPassedDriverIsSubscriber(false);
    }
  };

  const addSubscriberAsDriver = () => {
    setDriver(proposal.subscriber);
    driversContext.setDriver(proposal.subscriber);
    setIsAddSubscriberAsDriverBtnVisible(false);
    driversContext.setIsAddSubscriberAsDriverBtnVisible(false);
    setIsAddNewDriverBtnClicked(true);
    driversContext.setIsAddNewDriverBtnClicked(true);
    setIsCompletelyNewDriver(false);
    driversContext.setIsCompletelyNewDriver(false);
    setPassedDriverIsSubscriber(true);
    driversContext.setPassedDriverIsSubscriber(true);
  };

  const removeSubscriberAsDriver = () => {
    /*setAddedDrivers((current) => {
      return current.filter(
        (d) => d.person.jmbg !== proposal.subscriber.person.jmbg
      );
    });*/

    driversContext.setAddedDrivers((current) => {
      return current.filter(
        (d) => d.person.jmbg !== proposal.subscriber.person.jmbg
      );
    });

    setIsAddNewDriverBtnClicked(false);
    driversContext.setIsAddNewDriverBtnClicked(false);
    setIsSubscriberAddedAsDriver(false);
    driversContext.setIsSubscriberAddedAsDriver(false);
    setIsCompletelyNewDriver(false);
    driversContext.setIsCompletelyNewDriver(false);

    window.scrollTo(0, 1500);
  };

  const viewAddedDriversHandler = () => {
    window.scrollTo(0, 1500);
  };

  const removeDriverHandler = (driverToRemove) => {
    if (driverToRemove.person.jmbg === proposal.subscriber.person.jmbg) {
      setIsSubscriberAddedAsDriver(false);
      driversContext.setIsSubscriberAddedAsDriver(false);
    }

    setAddedDrivers((current) => {
      return current.filter(
        (d) => d.person.jmbg !== driverToRemove.person.jmbg
      );
    });

    driversContext.setAddedDrivers((current) => {
      return current.filter(
        (d) => d.person.jmbg !== driverToRemove.person.jmbg
      );
    });

    setCheckedDriverRisks([]);
  };

  console.log(`proposal context on drivers page`);
  console.log(proposalContext);

  console.log(`drivers context on drivers page`);
  console.log(driversContext);

  return (
    <>
      <Stepper step3 proposalId={proposalId} />
      {driversContext.isAddSubscriberAsDriverBtnVisible && (
        <div style={{ margin: "15px" }}>
          {driversContext.isSubscriberAddedAsDriver ? (
            <Button size="lg" type="submit" onClick={removeSubscriberAsDriver}>
              Remove Subscriber as Driver
            </Button>
          ) : (
            <Button size="lg" type="submit" onClick={addSubscriberAsDriver}>
              Add Subscriber as Driver
            </Button>
          )}
        </div>
      )}
      <div className="container mb-5">
        <Card
          className="text-center"
          border="success"
          style={{ margin: "20px" }}
        >
          <Card.Header>
            <h1>Drivers</h1>
            {!driversContext.isAddNewDriverBtnClicked ? (
              <div className="d-flex flex-row">
                {driversContext.addedDrivers.length > 0 && (
                  <Button
                    type="submit"
                    style={{
                      width: "fit-content",
                      height: "fit-content",
                      margin: "15px 0 0 40px",
                    }}
                    onClick={viewAddedDriversHandler}
                  >
                    View Added Drivers
                  </Button>
                )}
                <div
                  className="p-2"
                  style={{ width: "50%", margin: "0 0 0 150px" }}
                >
                  <SearchBox
                    searchObjects={searchDrivers}
                    resetPageNumber={resetPageNumber}
                    validationFunction={jmbgValidation}
                  />
                </div>
                <Button
                  style={{
                    width: "fit-content",
                    height: "fit-content",
                    margin: "15px 0 0 0",
                  }}
                  onClick={addCompletelyNewDriverHandler}
                  disabled={driversContext.addedDrivers.length > 3}
                >
                  Add new Driver
                </Button>
              </div>
            ) : (
              <Button
                type="submit"
                style={{ margin: "2px" }}
                onClick={searchDriversHandler}
              >
                Search Drivers
              </Button>
            )}
          </Card.Header>
          <Card.Body>
            {driversContext.isAddNewDriverBtnClicked ? (
              <Form
                subscriber={proposal.subscriber}
                driver={driversContext.driver}
                setDriver={driversContext.setDriver}
                setIsAddNewDriverBtnClicked={
                  driversContext.setIsAddNewDriverBtnClicked
                }
                setAddedDrivers={driversContext.setAddedDrivers}
                isCompletelyNewDriver={driversContext.isCompletelyNewDriver}
                setIsCompletelyNewDriver={
                  driversContext.setIsCompletelyNewDriver
                }
                isSubscriberAddedAsDriver={
                  driversContext.isSubscriberAddedAsDriver
                }
                setIsSubscriberAddedAsDriver={
                  driversContext.setIsSubscriberAddedAsDriver
                }
                setIsAddSubscriberAsDriverBtnVisible={
                  driversContext.setIsAddSubscriberAsDriverBtnVisible
                }
                getAllRisks={getAllRisks}
                risks={risks}
                setRisks={setRisks}
                checkedDriverRisks={checkedDriverRisks}
                setCheckedDriverRisks={setCheckedDriverRisks}
                accidents={accidents}
                setAccidents={setAccidents}
                passedDriverIsSubscriber={
                  driversContext.passedDriverIsSubscriber
                }
                setPassedDriverIsSubscriber={
                  driversContext.setPassedDriverIsSubscriber
                }
              />
            ) : drivers.length !== 0 ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>JMBG</th>
                    <th>Birthdate</th>
                    <th>Licence number</th>
                    <th>Licence obtained</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {drivers.map((driver, index) => {
                    return (
                      <tr key={`tr-${index}`}>
                        <td key={`td-id-${index}`}>{driver.id}</td>
                        {isDriverAdded(driver) ? (
                          <td key={`td-name-${index}`} className="bg-success">
                            {driver.person.firstName} {driver.person.lastName}
                          </td>
                        ) : (
                          <td key={`td-name-${index}`}>
                            {driver.person.firstName} {driver.person.lastName}
                          </td>
                        )}
                        <td key={`td-jmbg-${index}`}>{driver.person.jmbg}</td>
                        <td key={`td-birthdate-${index}`}>
                          {driver.person.birth}
                        </td>
                        <td key={`td-licenceNum-${index}`}>
                          {driver.licenceNum}
                        </td>
                        <td key={`td-licenceObtained-${index}`}>
                          {driver.licenceObtained}
                        </td>
                        <td key={`td-btn-${index}`}>
                          <Button
                            type="submit"
                            disabled={driversContext.addedDrivers.length > 3}
                            onClick={() => addDriverHandler(driver)}
                          >
                            Add Driver
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            ) : (
              <Alert variant="danger">
                <h2>No drivers found!</h2>
              </Alert>
            )}
          </Card.Body>
          <Card.Footer>
            {!driversContext.isAddNewDriverBtnClicked && (
              <div
                className="d-flex flex-row justify-content-center"
                style={{ margin: "1rem 0 0 0" }}
              >
                <Pagination previousPage={previousPage} nextPage={nextPage} />
              </div>
            )}
          </Card.Footer>
        </Card>
        <Card>
          <Accordion>
            {driversContext.addedDrivers.map((driver, index) => {
              return (
                <Accordion.Item key={index} eventKey={index}>
                  <Accordion.Header>Driver {index + 1}</Accordion.Header>
                  <Accordion.Body>
                    <div>
                      <h5>ID:&nbsp;&nbsp;{driver.id}</h5>
                      <h5>
                        Full Name:&nbsp;&nbsp;{driver.person.firstName}{" "}
                        {driver.person.lastName}
                      </h5>
                      <h5>Jmbg:&nbsp;&nbsp;{driver.person.jmbg}</h5>
                      <h5>Date of Birth:&nbsp;&nbsp;{driver.person.birth}</h5>
                      <h5>Address:&nbsp;&nbsp;{driver.address.street}</h5>
                      <h5>Licence Number:&nbsp;&nbsp;{driver.licenceNum}</h5>
                      <h5>
                        Licence Obtained:&nbsp;&nbsp;
                        {driver.licenceObtained}
                      </h5>
                      <h5>Contact:&nbsp;&nbsp;{driver.contact.mobilePhone}</h5>
                    </div>
                    <div className="d-flex flex-row justify-content-end">
                      <div className="p-2">
                        <Button
                          type="submit"
                          onClick={() => removeDriverHandler(driver)}
                        >
                          Remove Driver
                        </Button>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </Card>
        {driversContext.addedDrivers.length > 0 && (
          <Button
            size="lg"
            style={{ margin: "20px" }}
            onClick={addDriversToProposalHandler}
          >
            Add Driver/s to Proposal
          </Button>
        )}
        <Button type="submit" onClick={() => window.scrollTo(0, 0)}>
          Scroll Up
        </Button>
      </div>
    </>
  );
}

export default AddDriversPage;
