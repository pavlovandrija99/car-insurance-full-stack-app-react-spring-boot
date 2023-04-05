import { Link } from "react-router-dom";

function UnauthorizedPage() {
  return (
    <div className="d-flex flex-column justify-content-center m-5">
      <h1>UNAUTHORIZED</h1>
      <h3>Proceed to the <Link to="/login">login</Link> page.</h3>
    </div>
  );
}

export default UnauthorizedPage;