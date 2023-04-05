import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import "./Stepper.css";

function Stepper({
  step1,
  step2,
  step3,
  step4,
  step5,
  step6,
  step7,
  step8,
  step9,
  proposalId,
}) {
  return (
    <Nav className="justify-content-center" variant="pills">
      <Nav.Item className="margins">
        <LinkContainer
          style={
            step1
              ? { background: `#90EE90`, color: "black" }
              : { color: "black" }
          }
          to={`/add-proposal-subscriber/${proposalId}`}
        >
          <Nav.Link disabled={step1 ? true : false}>1. Add subscriber</Nav.Link>
        </LinkContainer>
      </Nav.Item>

      <Nav.Item className="margins">
        <LinkContainer
          style={
            step2
              ? { background: `#90EE90`, color: "black" }
              : { color: "black" }
          }
          to={`/add-proposal-newcar/${proposalId}`}
        >
          <Nav.Link disabled={step2 ? true : false}>2. Add car</Nav.Link>
        </LinkContainer>
      </Nav.Item>

      <Nav.Item className="margins">
        <LinkContainer
          style={
            step3
              ? { background: `#90EE90`, color: "black" }
              : { color: "black" }
          }
          to={`/add-proposal-drivers/${proposalId}`}
        >
          <Nav.Link disabled={step3 ? true : false}>3. Add drivers</Nav.Link>
        </LinkContainer>
      </Nav.Item>

      <Nav.Item className="margins">
        <LinkContainer
          style={
            step4
              ? { background: `#90EE90`, color: "black" }
              : { color: "black" }
          }
          to={`/choose-insurance-plan/${proposalId}`}
        >
          <Nav.Link disabled={step4 ? true : false}>
            4. Add insurance plan
          </Nav.Link>
        </LinkContainer>
      </Nav.Item>

      <Nav.Item className="margins">
        <LinkContainer
          style={
            step5
              ? { background: `#90EE90`, color: "black" }
              : { color: "black" }
          }
          to={`/confirm-proposal/${proposalId}`}
        >
          <Nav.Link disabled={step5 ? true : false}>
            5. Confirm proposal
          </Nav.Link>
        </LinkContainer>
      </Nav.Item>
    </Nav>
  );
}

export default Stepper;
