import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { payProposal } from "../../services/ProposalService";

function ChequePaymentForm(props) {
  const { proposalId } = useParams();

  const navigate = useNavigate();

  const [chequeNumber, setChequeNumber] = useState();
  const [paymentDate, setPaymentDate] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formSubmitHandler = () => {
    let payObject = {
      chequeNumber,
      paymentDate,
    };

    payProposal(proposalId, payObject).then((response) => {
      if (response != null) {
        alert(`Proposal with ID ${proposalId} successfully paid!`);
        navigate("/");
      }
    });
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit(formSubmitHandler)}>
        <div className="card-body border border-gray p-0">
          <h3>
            <span>Check Info:</span>
          </h3>

          <div className="collapse show p-3 pt-0" id="collapseExample">
            <div className="row">
              <div className="row">
                <div className="col-12">
                  <div className="form__div">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="123456"
                      {...register("checkNumber", {
                        required: true,
                        pattern: /^\d{6}$/,
                      })}
                      onChange={(event) => setChequeNumber(event.target.value)}
                    />
                    <label htmlFor="checkNumber" className="form__label">
                      {errors.checkNumber ? (
                        <span className="text-danger">
                          Cheque number must have 6 digits!
                        </span>
                      ) : (
                        "Cheque number:"
                      )}
                    </label>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form__div">
                    <input
                      type="date"
                      className="form-control"
                      {...register("date", { required: true })}
                      onChange={(event) => setPaymentDate(event.target.value)}
                    />
                    <label for="" className="form__label">
                      {errors.date ? (
                        <span className="text-danger">Pick a date!</span>
                      ) : (
                        "Payment date"
                      )}
                    </label>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form__div">
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={props.proposal.amount}
                    />
                    <label for="" className="form__label">
                      Amount (€)
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <Button
            variant="success"
            type="submit"
            style={{ margin: "10px 10px 0 0", width: "20%" }}
          >
            Pay
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ChequePaymentForm;
