import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import {
  getAllSubscribers,
  getSubscribersByJmbg,
  addSubscriberToProposal,
} from "../../services/SubscriberService";
import { getAllSubscriberRoles } from "../../services/SubscriberRoleService";
import {
  createNewSubscriberAndAddToProposal,
  getProposalById,
} from "../../services/ProposalService";
import { getAllCountries } from "../../services/CountryService";
import { getAllCitiesByCountry } from "../../services/CityService";
import { getAllZipsByCity } from "../../services/ZipService";
import { getAllAddressesByZip } from "../../services/AddressService";

import { Pagination, SearchBox, Stepper } from "../../utils/Components";
import { Alert, Button, Form, Table, Card } from "react-bootstrap";

import ProposalContext from "../../context/proposal-context";
import DriversContext from "../../context/drivers-context";

function NewSubscriberPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const proposalContext = useContext(ProposalContext);
  const driversContext = useContext(DriversContext);

  const [subscribers, setSusbcribers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [zips, setZips] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [proposal, setProposal] = useState({});
  const [pageState, setPageState] = useState({
    hasNext: true,
    hasPrevious: false,
    sliceNumber: 0,
  });
  const [cityDisabled, setCityDisabled] = useState(true);
  const [zipCodeDisabled, setZipCodeDisabled] = useState(true);
  const [addressDisabled, setaddressDisabled] = useState(true);

  let [jmbg, setJmbg] = useState("");

  let { proposalId } = useParams();

  useEffect(() => {
    getAllSubscribers().then((response) => {
      if (response != null) {
        setSusbcribers(response.objects);
        updatePageState(response);
      }
    });

    getAllSubscriberRoles().then((response) => {
      if (response != null) {
        setRoles(response);
      }
    });

    getAllCountries().then((response) => {
      if (response != null) {
        setCountries(response);
      }
    });

    getProposalById(proposalId).then((response) => {
      proposalContext.setProposal(response);
    });
  }, []);

  const previousPage = () => {
    if (pageState.hasPrevious) {
      getSubscribersByJmbg(jmbg, pageState.sliceNumber - 1).then((response) => {
        if (response != null) {
          setSusbcribers(response.objects);
          updatePageState(response);
        }
      });
    }
  };

  const nextPage = () => {
    if (pageState.hasNext) {
      getSubscribersByJmbg(jmbg, pageState.sliceNumber + 1).then((response) => {
        if (response != null) {
          setSusbcribers(response.objects);
          updatePageState(response);
        }
      });
    }
  };

  const searchSubscribers = function (inputText) {
    setJmbg(inputText);

    getSubscribersByJmbg(inputText, pageState.sliceNumber).then((response) => {
      if (response != null) {
        setSusbcribers(response.objects);
        updatePageState(response);
      }
    });
  };

  const addSubscriberToProposalHandler = (subscriberId) => {
    window.alert(`Subscriber successfully added to proposal!`);

    addSubscriberToProposal(subscriberId, proposalId).then((response) => {
      if (response != null) {
        setProposal(response);
        proposalContext.setProposal(response);
      }
    });

    navigate(`/add-proposal-newcar/${proposalId}`);
  };

  const submitHandler = (data) => {
    const subscriberData = {
      firstName: data.firstName,
      lastName: data.lastName,
      jmbg: data.jmbg,
      birth: data.birth,
      subscriberRole: data.subscriberRole,
      homePhone: data.homePhone,
      mobilePhone: data.mobilePhone,
      email: data.email,
      addressId: data.address,
    };

    createNewSubscriberAndAddToProposal(proposalId, subscriberData).then(
      (response) => {
        if (response != null) {
          alert(
            "You successfully created and added new subscriber to the proposal!"
          );
          navigate(`/add-proposal-newcar/${proposalId}`);
        }
      }
    );
  };

  const firstLetterUpperCase = (text) => {
    text = text.toLowerCase();
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

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

  const fetchCities = (event) => {
    const countryId = event.target.value;

    if (countryId) {
      getAllCitiesByCountry(countryId).then((response) => {
        if (response != null) {
          setCities(response);
          setZips([]);
          setAddresses([]);
          setCityDisabled(false);
          setZipCodeDisabled(true);
          setaddressDisabled(true);
        }
      });
    } else {
      setCities([]);
      setZips([]);
      setAddresses([]);
      setCityDisabled(true);
      setZipCodeDisabled(true);
      setaddressDisabled(true);
    }
  };

  const fetchZips = (event) => {
    const cityId = event.target.value;

    if (cityId) {
      getAllZipsByCity(cityId).then((response) => {
        if (response != null) {
          setZips(response);
          setAddresses([]);
          setZipCodeDisabled(false);
          setaddressDisabled(true);
        }
      });
    } else {
      setZips([]);
      setAddresses([]);
      setZipCodeDisabled(true);
      setaddressDisabled(true);
    }
  };

  const fetchAddresses = (event) => {
    const zipId = event.target.value;

    if (zipId) {
      getAllAddressesByZip(zipId).then((response) => {
        if (response != null) {
          setAddresses(response);
          setaddressDisabled(false);
        }
      });
    } else {
      setAddresses([]);
      setaddressDisabled(true);
    }
  };

  console.log(`proposal context on subscriber page`);
  console.log(proposalContext);

  console.log(`drivers context on subscriber page`);
  console.log(driversContext);

  return (
    <>
      <div>
        <Stepper step1 proposalId={proposalId} />
      </div>

      <div className="container">
        <Card className="text-center" border="success">
          <Card.Header>
            <h1>All Subscribers</h1>
            <div style={{ width: "600px", margin: "auto" }}>
              <SearchBox
                searchObjects={searchSubscribers}
                resetPageNumber={resetPageNumber}
                validationFunction={jmbgValidation}
              />
            </div>
          </Card.Header>
          {subscribers.length !== 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Jmbg</th>
                  <th>E-mail</th>
                  <th>Birth Date (dd-mm-yyyy)</th>
                  <th>Contact</th>
                  <th>Address</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((subscriber) => {
                  return (
                    <tr key={`tr-${subscriber.id}`}>
                      <td key={`td-id-${subscriber.id}`}>{subscriber.id}</td>
                      <td key={`td-full-name-${subscriber.id}`}>
                        {subscriber.person.firstName}{" "}
                        {subscriber.person.lastName}
                      </td>
                      <td key={`td-jmbg-${subscriber.id}`}>
                        {subscriber.person.jmbg}
                      </td>
                      <td key={`td-email-${subscriber.id}`}>
                        {subscriber.person.contact.email}
                      </td>
                      <td key={`td-birth-${subscriber.id}`}>
                        {subscriber.person.birth}
                      </td>
                      <td key={`td-contact-${subscriber.id}`}>
                        {subscriber.person.contact.mobilePhone}
                      </td>
                      <td key={`td-address-${subscriber.id}`}>
                        {subscriber.person.address.street}{" "}
                        {subscriber.person.address.streetNumber}
                      </td>
                      <td key={`td-subscriberrole-${subscriber.id}`}>
                        {subscriber.subscriberRole.name}
                      </td>
                      <td>
                        <Button
                          type="submit"
                          onClick={() =>
                            addSubscriberToProposalHandler(subscriber.id)
                          }
                        >
                          Add
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <Alert variant="danger">
              <h2>No subscribers found!</h2>
            </Alert>
          )}
          <Card.Footer>
            <div
              className="d-flex flex-row justify-content-center"
              style={{ margin: "1rem 0 0 0" }}
            >
              <Pagination previousPage={previousPage} nextPage={nextPage} />
            </div>
          </Card.Footer>
        </Card>
        <div style={{ width: "600px", margin: "auto" }}>
          <br />
          <Card className="text-center" border="success">
            <Card.Header>
              <h2>Add New Subscriber</h2>
            </Card.Header>
            <Form onSubmit={handleSubmit(submitHandler)}>
              <Form.Group
                className="mb-3"
                style={{ margin: "1rem" }}
                controlId="formFirstName"
              >
                <Form.Label>
                  <h4>First Name</h4>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name..."
                  {...register("firstName", { required: true })}
                />
                {errors.firstName && (
                  <span className="text-danger">This field is required!</span>
                )}
              </Form.Group>

              <Form.Group
                className="mb-3"
                style={{ margin: "1rem" }}
                controlId="formLastName"
              >
                <Form.Label>
                  <h4>Last Name</h4>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name..."
                  {...register("lastName", { required: true })}
                />
                {errors.lastName && (
                  <span className="text-danger">This field is required!</span>
                )}
              </Form.Group>

              <Form.Group className="mb-3" style={{ margin: "1rem" }}>
                <Form.Label>
                  <h4>Subscriber Role</h4>
                </Form.Label>
                <Form.Select
                  {...register("subscriberRole", { required: true })}
                >
                  <option key={"subscriberRole-blank"}></option>
                  {roles.map((role) => {
                    return (
                      <option key={`option-role-${role.id}`} value={role.name}>
                        {firstLetterUpperCase(role.name)}
                      </option>
                    );
                  })}
                </Form.Select>
                {errors.subscriberRole && (
                  <span className="text-danger">This field is required!</span>
                )}
              </Form.Group>

              <Form.Group
                className="mb-3"
                style={{ margin: "1rem" }}
                controlId="formJmbg"
              >
                <Form.Label>
                  <h4>JMBG</h4>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter jmbg..."
                  {...register("jmbg", {
                    pattern: /\d{13}/,
                    required: true,
                    maxLength: 13,
                  })}
                />
                {errors.jmbg && (
                  <span className="text-danger">
                    JMBG consists of 13 digits!
                  </span>
                )}
              </Form.Group>

              <Form.Group
                className="mb-3"
                style={{ margin: "1rem" }}
                controlId="formJmbg"
              >
                <Form.Label>
                  <h4>E-mail</h4>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter e-mail..."
                  {...register("email", {
                    pattern:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    required: true,
                  })}
                />
                {errors.email && (
                  <span className="text-danger">
                    Email must be well-formed!
                  </span>
                )}
              </Form.Group>

              <div
                className="d-flex flex-column mb-3"
                style={{ margin: "1rem" }}
              >
                <Form.Label>
                  <h4>Birth Date</h4>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter date must in yyyy-MM-dd format..."
                  {...register("birth", {
                    pattern: /\d{4}-\d{2}-\d{2}/,
                    required: true,
                  })}
                ></Form.Control>
                {errors.birth && (
                  <span className="text-danger">
                    Date does not fit the yyyy-MM-dd format!
                  </span>
                )}
              </div>

              <Form.Group
                className="mb-3"
                style={{ margin: "1rem" }}
                controlId="formHomePhone"
              >
                <Form.Label>
                  <h4>Home phone</h4>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter home phone number..."
                  {...register("homePhone")}
                />
              </Form.Group>

              <Form.Group className="mb-3" style={{ margin: "1rem" }}>
                <Form.Label>
                  <h4>Mobile phone</h4>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter mobile phone number..."
                  {...register("mobilePhone", { required: true })}
                />
                {errors.mobilePhone && (
                  <span className="text-danger">This field is required!</span>
                )}
              </Form.Group>

              <Form.Group className="mb-3" style={{ margin: "1rem" }}>
                <Form.Label>
                  <h4>Country</h4>
                </Form.Label>
                <Form.Select
                  {...register("country", { required: true })}
                  onChange={(event) => fetchCities(event)}
                >
                  <option key={"country-blank"}></option>
                  {countries.map((country) => {
                    return (
                      <option
                        key={`option-country-${country.id}`}
                        value={country.id}
                      >
                        {country.name}
                      </option>
                    );
                  })}
                </Form.Select>
                {errors.country && (
                  <span className="text-danger">This field is required!</span>
                )}
              </Form.Group>

              <Form.Group className="mb-3" style={{ margin: "1rem" }}>
                <Form.Label>
                  <h4>City</h4>
                </Form.Label>
                <Form.Select
                  {...register("city", { required: true })}
                  onChange={(event) => fetchZips(event)}
                  disabled={cityDisabled}
                >
                  <option key={"city-blank"}></option>
                  {cities.map((city) => {
                    return (
                      <option key={`option-city-${city.id}`} value={city.id}>
                        {city.name}
                      </option>
                    );
                  })}
                </Form.Select>
                {errors.city && (
                  <span className="text-danger">This field is required!</span>
                )}
              </Form.Group>

              <Form.Group className="mb-3" style={{ margin: "1rem" }}>
                <Form.Label>
                  <h4>Zip code</h4>
                </Form.Label>
                <Form.Select
                  {...register("zip", { required: true })}
                  onChange={(event) => fetchAddresses(event)}
                  disabled={zipCodeDisabled}
                >
                  <option key={"zip-blank"}></option>
                  {zips.map((zip) => {
                    return (
                      <option key={`option-zip-${zip.id}`} value={zip.id}>
                        {zip.zipNumber}
                      </option>
                    );
                  })}
                </Form.Select>
                {errors.zip && (
                  <span className="text-danger">This field is required!</span>
                )}
              </Form.Group>

              <Form.Group className="mb-3" style={{ margin: "1rem" }}>
                <Form.Label>
                  <h4>Address</h4>
                </Form.Label>
                <Form.Select
                  {...register("address", { required: true })}
                  disabled={addressDisabled}
                >
                  <option key={"address-blank"}></option>
                  {addresses.map((address) => {
                    return (
                      <option
                        key={`option-address-${address.id}`}
                        value={address.id}
                      >
                        {address.street} {address.streetNumber}
                      </option>
                    );
                  })}
                </Form.Select>
                {errors.address && (
                  <span className="text-danger">This field is required!</span>
                )}
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                style={{ margin: "1rem", width: "95%" }}
              >
                Submit
              </Button>
            </Form>
          </Card>
          <br />
        </div>
      </div>
    </>
  );
}

export default NewSubscriberPage;
