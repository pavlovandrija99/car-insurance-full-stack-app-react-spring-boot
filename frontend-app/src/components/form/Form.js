import { useState, useEffect, useRef } from "react";

import RiskModalDialog from "../modal_dialog/RiskModalDialog";
import AccidentHistoryModalDialog from "../modal_dialog/AccidentHistoryModalDialog";

import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { getAllCitiesByCountry } from "../../services/CityService";
import { getAllZipsByCity } from "../../services/ZipService";
import { getAllAddressesByZip } from "../../services/AddressService";
import { getAllCountries } from "../../services/CountryService";

function FormComponent(props) {
  // Driver related states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jmbg, setJmbg] = useState("");
  const [birth, setBirth] = useState("");
  const [address, setAddress] = useState("");
  const [addressId, setAddressId] = useState(0);
  const [contact, setContact] = useState("");
  const [licenceNum, setLicenceNum] = useState("");
  const [licenceObtained, setLicenceObtained] = useState("");
  const [id, setId] = useState();

  const [riskModalDialogShow, setRiskModalDialogShow] = useState(false);
  const [accidentHistoryModalShow, setAccidentHistoryModalShow] =
    useState(false);

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [zips, setZips] = useState([]);
  const [addresses, setAddresses] = useState([]);

  const [cityDisabled, setCityDisabled] = useState(true);
  const [zipCodeDisabled, setZipCodeDisabled] = useState(true);
  const [addressDisabled, setaddressDisabled] = useState(true);
  const [driverInputFlag, setDriverInputFlag] = useState(false);

  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const jmbgInputRef = useRef();
  const emailInputRef = useRef();
  const birthInputRef = useRef();
  const addressSelectRef = useRef();
  const homePhoneInputRef = useRef();
  const mobilePhoneInputRef = useRef();
  const licenceNumberInputRef = useRef();
  const licenceObtainedInputRef = useRef();

  useEffect(() => {
    console.log(`props.driver`);
    console.log(props.driver);
    if (!props.isCompletelyNewDriver) {
      setDriverRelatedStates(
        props.driver.person.firstName,
        props.driver.person.lastName,
        props.driver.person.jmbg,
        props.driver.person.birth,
        `${props.driver.person.address.street} ${props.driver.person.address.streetNumber}, ${props.driver.person.address.zip.city.name} ${props.driver.person.address.zip.zipNumber}, ${props.driver.person.address.zip.city.country.name}`,
        props.driver.person.address.id,
        props.driver.person.contact.mobilePhone,
        props.driver.licenceNum,
        props.driver.licenceObtained,
        props.driver.id
      );
    } else {
      setDriverRelatedStates("", "", "", "", "", 0, "", "", "", null);
    }

    getAllCountries().then((response) => {
      if (response != null) {
        setCountries(response);
      }
    });
  }, [props, driverInputFlag]);

  const setDriverRelatedStates = (
    firstName,
    lastName,
    jmbg,
    birth,
    address,
    addressId,
    contact,
    licenceNum,
    licenceObtained,
    id
  ) => {
    setFirstName(firstName);
    setLastName(lastName);
    setJmbg(jmbg);
    setBirth(birth);
    setAddress(address);
    setAddressId(addressId);
    setContact(contact);
    setLicenceNum(licenceNum);
    setLicenceObtained(licenceObtained);
    setId(id);
  };

  const submitDriverHandler = (event) => {
    event.preventDefault();

    if (formValidation()) {
      if (!props.isSubscriberAddedAsDriver) {
        if (!props.isCompletelyNewDriver) {
          if (props.driver.person.jmbg === props.subscriber.person.jmbg) {
            props.setIsSubscriberAddedAsDriver(true);
          }
        }
      }

      let driver = {
        licenceNum: licenceNum,
        licenceObtained: licenceObtained,
        person: {
          firstName: firstName,
          lastName: lastName,
          id: id,
          jmbg: jmbg,
          birth: birth,
        },
        address: {
          street: address,
        },
        addressId: Number.parseInt(addressId),
        contact: {
          mobilePhone: contact,
        },
        risks: props.checkedDriverRisks,
        accidents: props.accidents,
      };
      if (props.passedDriverIsSubscriber) {
        driver.subscriberId = props.driver.id;
        driver.id = null;
      } else {
        driver.subscriberId = null;
        driver.id = id;
      }

      console.log(driver);

      props.setAddedDrivers((prevState) => {
        return [...prevState, driver];
      });

      props.setDriver({});
      props.setCheckedDriverRisks([]);
      props.setAccidents([]);
      props.setIsAddNewDriverBtnClicked(false);
      props.setIsAddSubscriberAsDriverBtnVisible(true);
      props.setPassedDriverIsSubscriber(false);
      setDriverInputFlag(false);

      window.scrollTo(0, 1500);
    }
  };

  const firstNameHandler = (event) => {
    setFirstName(event.target.value);
  };

  const lastNameHandler = (event) => {
    setLastName(event.target.value);
  };

  const jmbgHandler = (event) => {
    setJmbg(event.target.value);
  };

  const birthHandler = (event) => {
    setBirth(event.target.value);
  };

  const addressHandler = (event) => {
    //setAddress(event.target.value);
    setAddressId(event.target.value);
  };

  const contactHandler = (event) => {
    setContact(event.target.value);
  };

  const licenceNumHandler = (event) => {
    setLicenceNum(event.target.value);
    setDriverInputFlag(true);
  };

  const licenceObtainedHandler = (event) => {
    setLicenceObtained(event.target.value);
    setDriverInputFlag(true);
  };

  const driverRisksHandler = (event) => {
    event.preventDefault();

    setRiskModalDialogShow(true);
    props.setCheckedDriverRisks([]);

    props.getAllRisks().then((response) => {
      if (response != null) {
        props.setRisks(response);
      }
    });
  };

  const driverAccidentHistoryHandler = (event) => {
    event.preventDefault();
    setAccidentHistoryModalShow(true);
  };

  const formValidation = () => {
    const jmbgRegex = new RegExp("[0-9]{13}");
    const dateRegex = new RegExp("[0-9]{2}-[0-9]{2}-[0-9]{4}");

    if (
      !firstName ||
      !lastName ||
      !jmbgRegex.test(jmbg) ||
      !dateRegex.test(birth) ||
      (!address && !addressId) ||
      !contact ||
      !licenceNum ||
      !dateRegex.test(licenceObtained)
    ) {
      alert("Form not valid!");
      return false;
    }

    return true;
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

  const completelyNewDriverFormValidation = () => {
    const jmbgRegex = new RegExp("[0-9]{13}$");
    const dateRegex = new RegExp("[0-9]{2}-[0-9]{2}-[0-9]{4}$");
    const emailRegex = new RegExp(
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
    );

    if (
      !firstNameInputRef.current.value ||
      !lastNameInputRef.current.value ||
      !jmbgRegex.test(jmbgInputRef.current.value) ||
      !emailRegex.test(emailInputRef.current.value) ||
      !emailInputRef.current.value ||
      !dateRegex.test(birthInputRef.current.value) ||
      !addressSelectRef.current.value ||
      !homePhoneInputRef.current.value ||
      !mobilePhoneInputRef.current.value ||
      !licenceNumberInputRef.current.value ||
      !dateRegex.test(licenceObtainedInputRef.current.value)
    ) {
      return false;
    }

    return true;
  };

  const submitCompletelyNewDriver = (event) => {
    event.preventDefault();

    if (completelyNewDriverFormValidation()) {
      const address = addresses[addressSelectRef.current.selectedIndex];

      let driver = {
        licenceNum: licenceNumberInputRef.current.value,
        licenceObtained: licenceObtainedInputRef.current.value,
        person: {
          firstName: firstNameInputRef.current.value,
          lastName: lastNameInputRef.current.value,
          jmbg: jmbgInputRef.current.value,
          birth: birthInputRef.current.value,
        },
        address: {
          street: `${address.street} ${address.streetNumber}, ${address.zip.city.name} ${address.zip.zipNumber}, ${address.zip.city.country.name}`,
        },
        addressId: Number.parseInt(addressSelectRef.current.value),
        contact: {
          mobilePhone: mobilePhoneInputRef.current.value,
          homePhone: homePhoneInputRef.current.value,
          email: emailInputRef.current.value,
        },
        risks: props.checkedDriverRisks,
        accidents: props.accidents,
        id: null,
        subscriberId: null,
      };

      console.log(driver);

      props.setAddedDrivers((prevState) => {
        return [...prevState, driver];
      });

      props.setDriver({});
      props.setCheckedDriverRisks([]);
      props.setAccidents([]);
      props.setIsAddNewDriverBtnClicked(false);
      props.setIsAddSubscriberAsDriverBtnVisible(true);

      window.scrollTo(0, 1500);
    }
  };

  return (
    <>
      {!props.isCompletelyNewDriver ? (
        <Form className="center">
          <Form.Group className="mb-3">
            <Form.Label>
              <h5>First Name</h5>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name..."
              value={firstName}
              disabled={true}
            />
            <Form.Text className="text-muted">
              Enter driver first name.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <h5>Last Name</h5>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name..."
              value={lastName}
              disabled={true}
            />
            <Form.Text className="text-muted">
              Enter driver last name.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <h5>JMBG</h5>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter jmbg..."
              value={jmbg}
              disabled={true}
            />
            <Form.Text className="text-muted">Enter driver jmbg.</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <h5>Date of Birth</h5>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter date of birth..."
              value={birth}
              disabled={true}
            />
            <Form.Text className="text-muted">
              Enter driver's date of birth. Date must be of dd-MM-yyyy format.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <h5>Address</h5>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address..."
              value={address}
              disabled={true}
            />
            <Form.Text className="text-muted">Enter driver address.</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <h5>Home phone</h5>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter home phone..."
              value={contact}
              disabled={true}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <h5>Mobile phone</h5>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter mobile phone..."
              value={contact}
              disabled={true}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <h5>Licence Number</h5>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter licence number..."
              disabled={!props.passedDriverIsSubscriber}
              value={licenceNum}
              onChange={licenceNumHandler}
            />
            <Form.Text className="text-muted">
              Enter driver licence number.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <h5>Licence Obtained</h5>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter licence obtained date..."
              disabled={!props.passedDriverIsSubscriber}
              value={licenceObtained}
              onChange={licenceObtainedHandler}
            />
            <Form.Text className="text-muted">
              Enter driver's licence obtained date. Date must be of dd-MM-yyyy
              format.
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Button
              type="submit"
              style={{ margin: "0 0 20px 0" }}
              onClick={driverRisksHandler}
            >
              Driver Risks
            </Button>
            <RiskModalDialog
              show={riskModalDialogShow}
              onHide={() => setRiskModalDialogShow(false)}
              driver={props.driver}
              risks={props.risks}
              checkedDriverRisks={props.checkedDriverRisks}
              setCheckedDriverRisks={props.setCheckedDriverRisks}
            />
          </Form.Group>

          <Form.Group>
            <Button type="submit" onClick={driverAccidentHistoryHandler}>
              Driver Accident History
            </Button>
            <AccidentHistoryModalDialog
              accidents={props.accidents}
              setAccidents={props.setAccidents}
              show={accidentHistoryModalShow}
              onHide={() => setAccidentHistoryModalShow(false)}
              setAccidentHistoryModalShow={setAccidentHistoryModalShow}
            />
          </Form.Group>

          <Button
            style={{ margin: "50px 0 0 0" }}
            size="lg"
            type="submit"
            onClick={submitDriverHandler}
          >
            Submit Driver
          </Button>
        </Form>
      ) : (
        <Form className="center">
          <Form.Group className="mb-3">
            <Form.Label>
              <h5>First Name</h5>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name..."
              ref={firstNameInputRef}
            />
            <Form.Text className="text-muted">
              Enter driver first name.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <h5>Last Name</h5>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name..."
              ref={lastNameInputRef}
            />
            <Form.Text className="text-muted">
              Enter driver last name.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <h5>JMBG</h5>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter jmbg..."
              ref={jmbgInputRef}
            />
            <Form.Text className="text-muted">Enter driver jmbg.</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" style={{ margin: "1rem" }}>
            <Form.Label>
              <h4>E-mail</h4>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter e-mail..."
              ref={emailInputRef}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <h5>Date of Birth</h5>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter date of birth..."
              ref={birthInputRef}
            />
            <Form.Text className="text-muted">
              Enter driver date of birth. Format for date of birth: (dd-mm-yyyy)
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" style={{ margin: "1rem" }}>
            <Form.Label>
              <h4>Country</h4>
            </Form.Label>
            <Form.Select onChange={(event) => fetchCities(event)}>
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
          </Form.Group>

          <Form.Group className="mb-3" style={{ margin: "1rem" }}>
            <Form.Label>
              <h4>City</h4>
            </Form.Label>
            <Form.Select
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
          </Form.Group>

          <Form.Group className="mb-3" style={{ margin: "1rem" }}>
            <Form.Label>
              <h4>Zip code</h4>
            </Form.Label>
            <Form.Select
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
          </Form.Group>

          <Form.Group className="mb-3" style={{ margin: "1rem" }}>
            <Form.Label>
              <h4>Address</h4>
            </Form.Label>
            <Form.Select
              disabled={addressDisabled}
              onChange={(event) => addressHandler(event)}
              ref={addressSelectRef}
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
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <h5>Home phone</h5>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter home phone..."
              ref={homePhoneInputRef}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <h5>Mobile phone</h5>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter mobile phone..."
              ref={mobilePhoneInputRef}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <h5>Licence Number</h5>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter licence number..."
              ref={licenceNumberInputRef}
            />
            <Form.Text className="text-muted">
              Enter driver licence number.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <h5>Licence Obtained</h5>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter licence obtained date..."
              ref={licenceObtainedInputRef}
            />
            <Form.Text className="text-muted">
              Enter driver licence obtained date.
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Button
              type="submit"
              onClick={driverRisksHandler}
              style={{ margin: "0 0 20px 0" }}
            >
              Driver Risks
            </Button>
            <RiskModalDialog
              show={riskModalDialogShow}
              onHide={() => setRiskModalDialogShow(false)}
              driver={props.driver}
              risks={props.risks}
              checkedDriverRisks={props.checkedDriverRisks}
              setCheckedDriverRisks={props.setCheckedDriverRisks}
            />
          </Form.Group>

          <Form.Group>
            <Button type="submit" onClick={driverAccidentHistoryHandler}>
              Driver Accident History
            </Button>
            <AccidentHistoryModalDialog
              accidents={props.accidents}
              setAccidents={props.setAccidents}
              show={accidentHistoryModalShow}
              onHide={() => setAccidentHistoryModalShow(false)}
              setAccidentHistoryModalShow={setAccidentHistoryModalShow}
            />
          </Form.Group>

          <Button
            style={{ margin: "50px 0 0 0" }}
            size="lg"
            type="submit"
            onClick={submitCompletelyNewDriver}
          >
            Submit Driver
          </Button>
        </Form>
      )}
    </>
  );
}

export default FormComponent;
