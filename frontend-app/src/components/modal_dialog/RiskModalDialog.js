import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function RiskModalDialog(props) {
  const [isChecked, setIsChecked] = useState(false);

  const onChangeHandler = (event, risk) => {
    if (event.target.checked) {
      props.setCheckedDriverRisks(() => [...props.checkedDriverRisks, risk]);
    } else {
      props.setCheckedDriverRisks((prevState) =>
        prevState.filter((r) => r.id !== risk.id)
      );
    }
    setIsChecked((current) => !current);
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
          Choose Risks for Driver
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>List of risks:</h4>
        {props.risks.map((risk) => {
          return (
            <div className="form-check" key={risk.id}>
              <input
                className="form-check-input"
                type="checkbox"
                value={isChecked}
                id={risk.id}
                onChange={(event) => onChangeHandler(event, risk)}
              />
              <label className="form-check-label" htmlFor={risk.id}>
                {risk.description}
              </label>
            </div>
          );
        })}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RiskModalDialog;
