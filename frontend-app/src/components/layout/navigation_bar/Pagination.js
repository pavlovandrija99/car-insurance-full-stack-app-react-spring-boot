import { Button } from "react-bootstrap";

function Pagination({ previousPage, nextPage }) {
  return (
    <nav aria-label="Page navigation example" className="ms-2">
      <ul className="pagination">
        <li onClick={previousPage}>
          <Button
            style={{ margin: "0 2px 0 0" }}
            variant="outline-primary"
            className="page-link"
          >
            Previous
          </Button>
        </li>
        <li onClick={nextPage}>
          <Button variant="outline-primary" className="page-link">
            Next
          </Button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
