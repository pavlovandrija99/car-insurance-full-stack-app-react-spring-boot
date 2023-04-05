import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";

function SearchBox({ searchObjects, resetPageNumber, validationFunction }) {
  const [pageNumberUpdated, setPageNumberUpdated] = useState(0);
  const [inputTextEntered, setInputTextEntered] = useState(false);
  
  const errorSpanRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    if (inputTextEntered) {
      if (validationFunction(inputRef.current.value)) {
        errorSpanRef.current.innerHTML = "";
        searchObjects(inputRef.current.value);
      } else {
        errorSpanRef.current.innerHTML =
          "Only digits are allowed! You can enter up to 13 digits.";
      }
    }
  }, [pageNumberUpdated, inputTextEntered]);

  const onChangeHandler = (event) => {
    resetPageNumber();
    setPageNumberUpdated(previousValue => previousValue + 1);
    setInputTextEntered(true);
  };

  return (
    <Form>
      <div className="d-flex flex-row">
        <Form.Control
          onChange={(event) => onChangeHandler(event)}
          type="text"
          placeholder="Search subscribers by their JMBG..."
          ref={inputRef}
        ></Form.Control>
      </div>
      <span className="text-danger" ref={errorSpanRef}></span>
    </Form>
  );
}

export default SearchBox;
