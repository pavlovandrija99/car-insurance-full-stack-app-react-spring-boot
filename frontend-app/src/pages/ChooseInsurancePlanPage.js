import { useEffect, useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { getAllInsurancePlans } from "../services/InsurancePlanService";
import { addInsurancePlanToProposal } from "../services/ProposalService";
import { Stepper } from "../utils/Components";

function ChooseInsurancePlanPage() {
  const [insurancePlans, setInsurancePlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState({});

  const { proposalId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getAllInsurancePlans().then((response) => {
      if (response != null) {
        let plans = [];
        for (let i = 0; i < response.length; i++) {
          let plan = response[i];

          for (let j = 0; j < plan.insuranceItems.length; j++) {
            plan.insuranceItems[j].franchise = plan.insuranceItems[j].franchisePercentage;
            plan.insuranceItems[j].selected = (plan.insuranceItems[j].isOptional ? false : true);
          }
          plans.push(plan);
        }
        setInsurancePlans(plans);
      }
    });
  }, []);

  const calculateTotalAmount = (insurancePlan) => {
    let totalAmount = 0;

    for (let i = 0; i < insurancePlan.insuranceItems.length; i++) {
      if (insurancePlan.insuranceItems[i].selected)
        totalAmount += insurancePlan.insuranceItems[i].amount;
    }

    return totalAmount;
  };

  const selectInsurancePlan = (insurancePlan) => {
    if (!isPlanSelected(insurancePlan))
      setSelectedPlan(insurancePlan);
  };

  const isPlanSelected = (plan) => {
    if (selectedPlan.id === plan.id) {
      return true;
    } else {
      return false;
    }
  };

  const addPlanToProposal = () => {
    // Preparing data to be sent to backend:
    let data = {};
    data.id = selectedPlan.id;
    data.name = selectedPlan.name;
    data.isPremium = selectedPlan.isPremium;
    data.insuranceItems = [];
    for (let i = 0; i < selectedPlan.insuranceItems.length; i++) {
      if (selectedPlan.insuranceItems[i].selected) {
        let item = {};
        item.id = selectedPlan.insuranceItems[i].id;
        item.name = selectedPlan.insuranceItems[i].name;
        item.isOptional = selectedPlan.insuranceItems[i].isOptional;
        item.franchisePercentage = selectedPlan.insuranceItems[i].franchise;
        item.amount = selectedPlan.insuranceItems[i].amount;

        data.insuranceItems.push(item);
      }
    }

    addInsurancePlanToProposal(proposalId, data).then(response => {
      if (response != null) {
        alert("Plan successfully added to the proposal!");
        navigate("/confirm-proposal/" + proposalId);
      }
    })
  };

  const optionalItemSelectHandler = (planId, itemId) => {
    if (insurancePlans.filter(plan => plan.id === planId).length !== 0) {
      let plan = insurancePlans.filter(plan => plan.id === planId).slice()[0];
      if (plan.insuranceItems.filter(item => item.id === itemId).length !== 0) {
        let item = plan.insuranceItems.filter(item => item.id === itemId)[0];
        item.selected = (item.selected ? false : true);

        updateInsurancePlansState(plan);
        setSelectedPlan(plan);
      }
    }
  };

  const updateItemsFranchise = (event, planId, itemId) => {
    if (insurancePlans.filter(plan => plan.id === planId).length !== 0) {
      let plan = insurancePlans.filter(plan => plan.id === planId).slice()[0];
      if (plan.insuranceItems.filter(item => item.id === itemId).length !== 0) {
        let item = plan.insuranceItems.filter(item => item.id === itemId)[0];
        item.franchise = parseInt(event.target.value);

        updateInsurancePlansState(plan);
        setSelectedPlan(plan);
      }
    }
  };

  const updateInsurancePlansState = (updatedPlan) => {
    let plans = insurancePlans.slice();

    for (let i = 0; i < plans.length; i++) {
      if (plans[i].id === updatedPlan.id) {
        plans[i] = updatedPlan;
        break;
      }
    }

    setInsurancePlans(plans);
  };

  const cardWithGreenBorder = (plan) => {
    return (
      <div key={`div-${plan.id}`} className="col-sm-4">
        <Card className="m-1 border rounded-4 border-5 border-success shadow-lg" key={`card-${plan.id}`} onClick={() => selectInsurancePlan(plan)}>
          <Card.Header className="bg-secondary">
            <Card.Title key={`card-title-${plan.id}`} >{plan.name} {plan.isPremium ? <span className="text-danger"><b>[premium]</b></span> : null}</Card.Title>
          </Card.Header>
          <Card.Body key={`card-body-${plan.id}`}>
            <ListGroup key={`listGroup-${plan.id}`}>
              {plan.insuranceItems.map((item, index) => {
                return (
                  <ListGroup.Item key={`listGroup-item-${item.id}`}>
                    {item.isOptional ? 
                      <input type="checkbox" className="form-check-input me-2" onClick={() => optionalItemSelectHandler(plan.id, item.id)}></input> : 
                      <input type="checkbox" className="form-check-input me-2" checked></input>
                    }
                    <b>{index + 1}. {item.name}</b> {item.isOptional ? <span className="text-success"><b>[optional]</b></span> : null}
                    <br /><label>Franchise percentage: {item.franchise} %</label>
                    <input type="range" className="form-range" min={item.franchisePercentage} max="100" onChange={(event) => updateItemsFranchise(event, plan.id, item.id)}></input>
                    <br /><label>Amount: {item.amount}</label>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Card.Body>
          <Card.Footer>
            <label className="h4"><b>Total amount: {calculateTotalAmount(plan)}</b></label>
          </Card.Footer>
        </Card>
      </div>
    );
  };

  const cardWithoutGreenBorder = (plan) => {
    return (
      <div key={`div-${plan.id}`} className="col-sm-4">
        <Card className="m-1" key={`card-${plan.id}`} onClick={() => selectInsurancePlan(plan)}>
          <Card.Header className="bg-secondary">
            <Card.Title key={`card-title-${plan.id}`} >{plan.name} {plan.isPremium ? <span className="text-danger"><b>[premium]</b></span> : null}</Card.Title>
          </Card.Header>
          <Card.Body key={`card-body-${plan.id}`}>
            <ListGroup key={`listGroup-${plan.id}`}>
              {plan.insuranceItems.map((item, index) => {
                return (
                  <ListGroup.Item key={`listGroup-item-${item.id}`}>
                    {item.isOptional ? 
                      <input type="checkbox" className="form-check-input me-2" disabled></input> : 
                      <input type="checkbox" className="form-check-input me-2" checked disabled></input>
                    }
                    <b>{index + 1}. {item.name}</b> {item.isOptional ? <span className="text-success"><b>[optional]</b></span> : null}
                    <br /><label>Franchise percentage: {item.franchise} %</label>
                    <input type="range" className="form-range" min={item.franchisePercentage} max="100" disabled></input>
                    <br /><label>Amount: {item.amount}</label>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Card.Body>
          <Card.Footer>
            <label className="h4"><b>Total amount: {calculateTotalAmount(plan)}</b></label>
          </Card.Footer>
        </Card>
      </div>
    );
  };

  return (
    <>
      <Stepper proposalId={proposalId} step4 />
      <label className="h2 m-4">Click on insurance plan to choose it: </label>
      <div className="d-flex flex-row justify-content-center">
        {insurancePlans.map((plan) => {
          return (
            isPlanSelected(plan) ? cardWithGreenBorder(plan) : cardWithoutGreenBorder(plan)
          );
        })}
      </div>
      {JSON.stringify(selectedPlan) !== "{}" ? 
      <Button className="m-3" onClick={addPlanToProposal}>
        Add plan to the proposal
      </Button> : null
      }
    </>
  );
}

export default ChooseInsurancePlanPage;
