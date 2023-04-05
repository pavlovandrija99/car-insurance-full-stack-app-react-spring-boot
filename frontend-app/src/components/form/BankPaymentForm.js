import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { payProposal } from "../../services/ProposalService";
import Button from "react-bootstrap/Button";

function BankPaymentForm(props) {
  const { proposalId } = useParams();

  const navigate = useNavigate();

  const [bankName, setBankName] = useState();
  const [paymentDate, setPaymentDate] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formSubmitHandler = () => {
    let payObject = {
      bankName,
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
                      placeholder="Enter bank name..."
                      {...register("bankName", {
                        required: true,
                        pattern: /^[A-Z]{1,}/,
                      })}
                      onChange={(event) => setBankName(event.target.value)}
                    />
                    <label htmlFor="bankName" className="form__label">
                      {errors.bankName ? (
                        <span className="text-danger">
                          Name must be provided! Must start with capital letter!
                        </span>
                      ) : (
                        "Bank name:"
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
                    <label htmlFor="" className="form__label">
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
                    <label htmlFor="" className="form__label">
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

export default BankPaymentForm;
