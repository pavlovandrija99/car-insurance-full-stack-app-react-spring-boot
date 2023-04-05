import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import CreditDebitCardPaymentForm from "../components/form/CreditDebitCardPaymentForm";
import ChequePaymentForm from "../components/form/ChequePaymentForm";
import BankPaymentForm from "../components/form/BankPaymentForm";
import { getProposalById } from "../services/ProposalService";

function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [proposal, setProposal] = useState({});

  const { proposalId } = useParams();

  useEffect(() => {
    getProposalById(proposalId).then((response) => {
      if (response != null) {
        setProposal(response);
      }
    });
  }, []);

  return (
    <div>
      <Card
        className="text-center"
        border="success"
        style={{ margin: "auto", width: "50%", marginTop: "2%" }}
      >
        <Card.Header>
          <h1>Proposal Payment</h1>
        </Card.Header>
        <Card.Body>
          {paymentMethod === "" ? (
            <>
              <div className="d-flex flex-row" style={{ margin: 20 }}>
                <div className="form-check" style={{ margin: "auto" }}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="cashPayment"
                    onChange={() => setPaymentMethod("bank")}
                  />
                  <label className="form-check-label" htmlFor="cashPayment">
                    Bank
                  </label>
                </div>
                <div className="form-check" style={{ margin: "auto" }}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="creditDebitPayment"
                    onChange={() => setPaymentMethod("creditDebitCard")}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="creditDebitPayment"
                  >
                    Credit/Debit card
                  </label>
                </div>
                <div className="form-check" style={{ margin: "auto" }}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="chequePayment"
                    onChange={() => setPaymentMethod("cheque")}
                  />
                  <label className="form-check-label" htmlFor="cheksPayment">
                    Cheque
                  </label>
                </div>
              </div>
            </>
          ) : paymentMethod === "creditDebitCard" ? (
            <CreditDebitCardPaymentForm setPaymentMethod={setPaymentMethod} />
          ) : paymentMethod === "cheque" ? (
            <ChequePaymentForm
              proposal={proposal}
              setPaymentMethod={setPaymentMethod}
            />
          ) : (
            paymentMethod === "bank" && (
              <BankPaymentForm
                proposal={proposal}
                setPaymentMethod={setPaymentMethod}
              />
            )
          )}
        </Card.Body>
        <Card.Footer>
          {paymentMethod === "" && <h3>Choose payment method:</h3>}
          {paymentMethod !== "" && (
            <Button
              style={{ width: "10%" }}
              onClick={() => setPaymentMethod("")}
            >
              Back
            </Button>
          )}
        </Card.Footer>
      </Card>
    </div>
  );
}

export default PaymentPage;
