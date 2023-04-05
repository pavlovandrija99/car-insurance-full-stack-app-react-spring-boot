import { useEffect, useRef, useState } from "react";
import { Alert, Button, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { generateReport } from "../services/ProposalService";

function GenerateReportPage() {
  const [reportURL, setReportURL] = useState(null);

  const [isReportGenerated, setIsReportGenerated] = useState(false);
  const [isResponseReceived, setIsResponseReceived] = useState(false);

  const { proposalId } = useParams();
  const anchorRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    generateReportHandler();
  }, []);

  const generateReportHandler = () => {
    generateReport(proposalId).then((response) => {
      if (response != null) {
        const binaryString = window.atob(response);
        const bytes = new Uint8Array(binaryString.length);
        const arrayBuffer = bytes.map((byte, i) => binaryString.charCodeAt(i));

        const blob = new Blob([arrayBuffer], { type: "application/pdf" });
        var fileURL = URL.createObjectURL(blob);

        setReportURL(fileURL);
        setIsReportGenerated(true);
        setIsResponseReceived(true);
      } else {
        setIsReportGenerated(false);
        setIsResponseReceived(true);
      }
    });
  };

  const downloadReport = () => {
    anchorRef.current.click();
  };

  const navigateToHomepage = () => {
    navigate("/");
  };

  if (!isResponseReceived) {
    return (
      <div className="d-flex flex-column justify-content-center">
        <div className="d-flex flex-row justify-content-center">
          <Spinner animation="border" className="m-2" style={{ width: "150px", height: "150px" }}></Spinner>
        </div>
      </div>
    );
  } else {
    if (isReportGenerated) {
      return (
        <div>
          <div className="d-flex justify-content-center m-2">
            <Alert variant="success" className="col-sm-4">
              <b>Report has been succesfully generated!</b>
            </Alert>
          </div>
          <Button variant="primary" className="m-2" onClick={downloadReport}>
            Download report
          </Button>
          <Button variant="primary" className="m-2" onClick={navigateToHomepage}>
            Go to Homepage
          </Button>
          <a href={reportURL} download="report.pdf" ref={anchorRef} hidden></a>
        </div>
      );
    } else {
      return (
        <div>
          <div className="d-flex justify-content-center m-2">
            <Alert variant="danger" className="col-sm-4">
              <b>An error occurred while generating report! Try again by clicking on the "Generate report" button!</b>
            </Alert>
          </div>
          <Button variant="primary" className="m-2" onClick={generateReportHandler}>
            Generate report
          </Button>
          <Button variant="primary" className="m-2" onClick={navigateToHomepage}>
            Go to Homepage
          </Button>
        </div>
      );
    }
  }
}

export default GenerateReportPage;
