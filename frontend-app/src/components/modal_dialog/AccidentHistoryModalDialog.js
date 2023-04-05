import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AccidentHistoryModalDialog(props) {
  const [accidentDate, setAccidentDate] = useState(new Date());
  const [isResponsible, setIsResponsible] = useState(false);
  const [accidentDescription, setAccidentDescription] = useState("");

  const MyContainer = ({ className, children }) => {
    return (
      <CalendarContainer className={className}>
        <div style={{ position: "relative" }}>{children}</div>
      </CalendarContainer>
    );
  };

  const handleCheckboxState = (event) => {
    event.target.checked ? setIsResponsible(true) : setIsResponsible(false);
  };

  const submitAccidentHandler = () => {
    let accident = {
      timeHappened: accidentDate,
      wasResponsible: isResponsible,
      description: accidentDescription,
    };

    props.setAccidents((prevState) => [...prevState, accident]);
    props.setAccidentHistoryModalShow(false);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Driver Accident History
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="p-2">
            <h5>Accident date:</h5>
            <DatePicker
              selected={accidentDate}
              onChange={(date) => setAccidentDate(date)}
              calendarContainer={MyContainer}
            />
          </div>
          <div className="p-2">
            <h5>Is Driver Responsible for Accident:</h5>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={isResponsible}
                id="flexCheckChecked"
                onChange={handleCheckboxState}
              />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                {isResponsible ? "Yes." : "No."}
              </label>
            </div>
          </div>
          <div className="row p-2">
            <h5>Accident Description:</h5>
            <textarea
              name="accident-description"
              placeholder="Enter accident description here..."
              value={accidentDescription}
              onChange={(event) => setAccidentDescription(event.target.value)}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={submitAccidentHandler}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AccidentHistoryModalDialog;
