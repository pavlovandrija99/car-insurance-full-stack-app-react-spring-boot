import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import { payProposal } from "../../services/ProposalService";

function CreditDebitCardPaymentForm(props) {
  const { proposalId } = useParams();
  const navigate = useNavigate();

  const [cardNumber, setCardNumber] = useState();
  const [paymentDate, setPaymentDate] = useState();
  const [payer, setPayer] = useState();
  const [isVisaCardChecked, setIsVisaCardChecked] = useState(false);
  const [isMasterCardChecked, setIsMasterCardChecked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formSubmitHandler = () => {
    let payObject = {
      cardNumber,
      paymentDate,
      payer,
      cardType: isVisaCardChecked
        ? "Visa"
        : isMasterCardChecked && "MasterCard",
    };

    console.log(payObject);
    payProposal(proposalId, payObject).then((response) => {
      if (response != null) {
        alert(`Proposal with ID ${proposalId} successfully paid!`);
        navigate("/");
      }
    });
  };

  const onChangeHandler = (event) => {
    console.log(event);
    if (event.target.id === "Visa") {
      setIsVisaCardChecked(true);
      setIsMasterCardChecked(false);
    } else {
      setIsVisaCardChecked(false);
      setIsMasterCardChecked(true);
    }
  };

  return (
    <>
      <div
        style={{ margin: "0 0 10px 0" }}
        className="d-flex flex-row justify-content-center"
      >
        <input
          className="form-check-input"
          type="checkbox"
          value={isVisaCardChecked}
          id="Visa"
          onChange={onChangeHandler}
          checked={isVisaCardChecked}
        />
        <label
          className="form-check-label"
          htmlFor="Visa"
          style={{ margin: "0 30px 0 5px" }}
        >
          Visa
        </label>

        <input
          className="form-check-input"
          type="checkbox"
          value={isMasterCardChecked}
          id="MasterCard"
          onChange={onChangeHandler}
          checked={isMasterCardChecked}
        />
        <label
          className="form-check-label"
          htmlFor="MasterCard"
          style={{ margin: "0 0 0 5px" }}
        >
          MasterCard
        </label>
      </div>

      <form className="form" onSubmit={handleSubmit(formSubmitHandler)}>
        <div>
          <div className="card-body border border-gray p-0">
            <h3>
              <span>Credit Card Info:</span>
            </h3>
            <div className="collapse show p-3 pt-0" id="collapseExample">
              <div className="row">
                <div className="row">
                  <div className="col-12">
                    <div className="form__div">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="0000 0000 0000 0000"
                        {...register("cardNumber", {
                          required: true,
                          pattern: /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/,
                        })}
                        onChange={(event) => setCardNumber(event.target.value)}
                      />
                      <label htmlFor="" className="form__label">
                        {errors.cardNumber ? (
                          <span className="text-danger">
                            Invalid credit card format!
                          </span>
                        ) : (
                          "Card Number"
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
                        type="password"
                        className="form-control"
                        placeholder="000"
                        {...register("cvvCode", {
                          required: true,
                          pattern: /^\d{3}$/,
                        })}
                      />
                      <label htmlFor="" className="form__label">
                        {errors.cvvCode ? (
                          <span className="text-danger">
                            CCV contains 3 digits!
                          </span>
                        ) : (
                          "CVV Code"
                        )}
                      </label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form__div">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter name..."
                        {...register("nameOnTheCreditCard", {
                          required: true,
                          pattern: /^[A-Z]{1}\w{1,}\s[A-Z]{1}\w{1,20}$/,
                        })}
                        onChange={(event) => setPayer(event.target.value)}
                      />
                      <label htmlFor="" className="form__label">
                        {errors.nameOnTheCreditCard ? (
                          <span className="text-danger">
                            Format example: Firstname Lastname
                          </span>
                        ) : (
                          "Name on the Card"
                        )}
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
        </div>
      </form>
    </>
  );
}

export default CreditDebitCardPaymentForm;
