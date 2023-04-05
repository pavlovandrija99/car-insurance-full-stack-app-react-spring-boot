import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./NewCarPage.css";

import ProposalContext from "../context/proposal-context";

import Button from "react-bootstrap/Button";
import { Stepper, ModalDialog, Pagination } from "../utils/Components";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";

import { getAllCars } from "../services/CarService";
import { getAllBrands } from "../services/BrandService";
import { getAllModels } from "../services/ModelService";
import {
  addCarWithLicenceNumToProposal,
  getProposalById,
} from "../services/ProposalService";
import DriversContext from "../context/drivers-context";

function NewCarPage() {
  const navigate = useNavigate();

  const proposalContext = useContext(ProposalContext);
  const driversContext = useContext(DriversContext);

  const { proposalId } = useParams();

  const [cars, setCars] = useState({
    objects: [],
    totalElements: 0
  });
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);

  const [brandId, setBrandId] = useState("");
  const [modelId, setModelId] = useState("");
  const [year, setYear] = useState("");

  const [isBrandBtnDisabled, setIsBrandBtnDisabled] = useState(false);
  const [isModelBtnDisabled, setIsModelBtnDisabled] = useState(true);
  const [isYearBtnDisabled, setIsYearBtnDisabled] = useState(true);

  const [modalDialogShow, setModalDialogShow] = useState(false);
  const [chosenCar, setChosenCar] = useState();

  useEffect(() => {
    getAllCars("", "", "", "").then((response) => {
      if (response != null) {
        setCars(response);
      }
    });

    getAllBrands().then((response) => {
      if (response != null) {
        setBrands(response);
      }
    });

    getProposalById(proposalId).then((response) => {
      proposalContext.setProposal(response);
    });
  }, []);

  const getCarsByBrand = (brandId) => {
    getAllCars(brandId, "", "", "").then((response) => {
      if (response != null) {
        setCars(response);
      }
    });

    getAllModels(brandId, "").then((response) => {
      if (response != null) {
        setModels(response);
      }
    });

    setBrandId(brandId);
    setModelId("");
    setYear("");
    setModels([]);
    setYears([]);
    setIsModelBtnDisabled(false);
    setIsYearBtnDisabled(true);
  };

  const getCarsByModel = (brandId, modelId) => {
    getAllCars(brandId, modelId, "", "").then((response) => {
      if (response != null) {
        setCars(response);
      }
    });

    getAllModels("", modelId).then((response) => {
      if (response != null) {
        setYears(response[0].years);
      }
    });

    setModelId(modelId);
    setYear("");
    setYears([]);
    setIsYearBtnDisabled(false);
  };

  const getCarByYear = (year) => {
    getAllCars(brandId, modelId, year, "").then((response) => {
      setCars(response);
    });

    setYear(year);
  };

  const viewAllCars = () => {
    getAllCars("", "", "", "").then((response) => {
      if (response != null) {
        setCars(response);
        setBrandId("");
        setModelId("");
        setYear("");
      }
    });

    setModels([]);
    setYears([]);
    setIsBrandBtnDisabled(false);
    setIsModelBtnDisabled(true);
    setIsYearBtnDisabled(true);
  };

  const addCarToProposal = (car, licenceNum) => {
    addCarWithLicenceNumToProposal(car, licenceNum, proposalId).then(
      (response) => {
        if (response != null) {
          alert(
            `Car with licence number ${licenceNum} successfully submitted!`
          );
          proposalContext.setProposal(response);
          navigate(`/add-proposal-drivers/${proposalId}`);
        }
      }
    );
  };

  const nextPage = () => {
    if (cars.hasNext) {
      getAllCars(brandId, modelId, year, cars.sliceNumber + 1).then(
        (response) => {
          if (response != null) {
            setCars(response);
          }
        }
      );
    }
  };

  const previousPage = () => {
    if (cars.hasPrevious) {
      getAllCars(brandId, modelId, year, cars.sliceNumber - 1).then(
        (response) => {
          if (response != null) {
            setCars(response);
          }
        }
      );
    }
  };

  const addCarHandler = (car) => {
    setChosenCar(car);
    setModalDialogShow(true);
  };

  console.log(`proposal context on car page`);
  console.log(proposalContext);

  console.log(`drivers context on car page`);
  console.log(driversContext);

  return (
    <>
      <Stepper step2 proposalId={proposalId} />
      <div className="container">
        <div>
          <Card className="text-center mb-5" border="success">
            <Card.Header>
              <h1>Cars</h1>
              <div style={{ width: "600px", margin: "auto" }}>
                <DropdownButton
                  className="margins"
                  as={ButtonGroup}
                  variant="primary"
                  title="Brand"
                  disabled={isBrandBtnDisabled}
                >
                  {brands.map((brand) => {
                    return (
                      <Dropdown.Item
                        onClick={() => getCarsByBrand(brand.id)}
                        key={brand.id}
                        eventKey={brand.id}
                      >
                        {brand.name}
                      </Dropdown.Item>
                    );
                  })}
                </DropdownButton>

                <DropdownButton
                  className="margins"
                  as={ButtonGroup}
                  variant="primary"
                  title="Model"
                  disabled={isModelBtnDisabled}
                >
                  {models.map((model) => {
                    return (
                      <Dropdown.Item
                        onClick={() => getCarsByModel(brandId, model.id)}
                        eventKey={model.id}
                        key={model.id}
                      >
                        {model.name}
                      </Dropdown.Item>
                    );
                  })}
                </DropdownButton>

                <DropdownButton
                  className="margins"
                  as={ButtonGroup}
                  variant="primary"
                  title="Year"
                  disabled={isYearBtnDisabled}
                >
                  {years.map((year) => {
                    return (
                      <Dropdown.Item
                        key={year}
                        onClick={() => getCarByYear(year)}
                      >
                        {year}
                      </Dropdown.Item>
                    );
                  })}
                </DropdownButton>

                <Button className="margins" onClick={viewAllCars}>
                  View all cars
                </Button>
              </div>
            </Card.Header>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Brand</th>
                  <th>Model</th>
                  <th>Year</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cars.objects.map((car) => {
                  return (
                    <tr key={`tr-${car.id}`}>
                      <td key={`td-id-${car.id}`}>{car.id}</td>
                      <td key={`td-brand-${car.model.brand.id}`}>
                        {car.model.brand.name}
                      </td>
                      <td key={`td-model-${car.model.id}`}>{car.model.name}</td>
                      <td key={`td-year-${car.year}`}>{car.year}</td>
                      <td key={`td-addcarbtn-${car.id}`}>
                        <>
                          <Button
                            type="submit"
                            onClick={() => addCarHandler(car)}
                          >
                            Add Car
                          </Button>
                          <ModalDialog
                            car={chosenCar}
                            show={modalDialogShow}
                            addCar={addCarToProposal}
                            onHide={() => setModalDialogShow(false)}
                          />
                        </>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Card.Footer>
              <div
                className="d-flex flex-row justify-content-center"
                style={{ margin: "1rem 0 0 0" }}
              >
                <Pagination nextPage={nextPage} previousPage={previousPage} />
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </>
  );
}

export default NewCarPage;
