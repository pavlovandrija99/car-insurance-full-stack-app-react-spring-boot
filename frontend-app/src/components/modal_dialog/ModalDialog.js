import { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalDialog(props) {
  const [licenceNum, setLicenceNum] = useState("");

  const onChangeHandler = (event) => {
    setLicenceNum(event.target.value);
  };

  const onSubmitHandler = () => {
    let filteredLicenceNum = licenceNum.match(/[A-Z]{2}[0-9]{3}[A-Z]{2}/);

    if (filteredLicenceNum !== null) {
      setLicenceNum("");

      props.onHide();
      props.addCar(props.car, licenceNum);
    }
  };

  return (
    <>
      {props.car !== undefined && (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Car to Proposal - Enter Licence Number
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Car ID: {props.car.id}</h4>
            <h4>Car Brand: {props.car.model.brand.name}</h4>
            <h4>Car Model: {props.car.model.name}</h4>
            <h4>Car Year: {props.car.year}</h4>
            <h4>
              Enter Licence Number:&nbsp;&nbsp;
              <input
                type="text"
                placeholder="Format: NS499PZ"
                value={licenceNum}
                onChange={onChangeHandler}
              />
            </h4>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" onClick={onSubmitHandler}>
              Submit
            </Button>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default ModalDialog;
