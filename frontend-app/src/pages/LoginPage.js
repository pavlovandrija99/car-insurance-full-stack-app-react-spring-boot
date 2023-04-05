import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../services/AuthenticationService";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const submitHandler = (data) => {
    const loginInfo = {
      username: data.username,
      password: data.password,
    };

    console.log(loginInfo);

    login(loginInfo).then((response) => {
      if (response != null) {
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        localStorage.setItem("roles", response.roles);
        localStorage.setItem("subject", response.subject);
        localStorage.setItem("issuer", response.issuer);
        localStorage.setItem("expiresIn", response.expiresIn);

        alert("You successfully logged in!");
        navigate(0);
      }
    });
  };

  return (
    <div className="d-flex flex-column justify-content-center m-3">
      <div className="d-flex flex-row justify-content-center m-3">
        <Form className="col-sm-4" onSubmit={handleSubmit(submitHandler)}>
          <Form.Group className="m-3">
            <Form.Label>
              <h4>Username</h4>
            </Form.Label>
            <Form.Control type="text" {...register("username", { required: true })}></Form.Control>
            {errors.username && <span className="text-danger">Username is required!</span>}
          </Form.Group>
          <Form.Group className="m-3">
            <Form.Label>
              <h4>Password</h4>
            </Form.Label>
            <Form.Control type="password" {...register("password", { required: true })}></Form.Control>
            {errors.password && <span className="text-danger">Password is required!</span>}
          </Form.Group>
          <Button variant="primary" size="lg" type="submit" className="m-2" style={{ width: "95%" }}>
            <b><span className="h5">Submit</span></b>
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
