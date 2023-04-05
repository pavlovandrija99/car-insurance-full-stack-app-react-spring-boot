import Accordion from "react-bootstrap/Accordion";

function AccordionComponent(props) {
  let count = 0;

  return (
    <Accordion defaultActiveKey="0">
      {props.drivers.map((driver) => {
        return (
          <Accordion.Item eventKey="0">
            <Accordion.Header>Driver {++count}</Accordion.Header>
            <Accordion.Body></Accordion.Body>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
}

export default AccordionComponent;
