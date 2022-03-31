// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import React, { useEffect, useState } from "react";
import authService from "../../services/auth";

const Register = () => {
  const [user, setUser] = useState({});
  const [error, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(user));
    setSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(error).length === 0 && submit) {
      let { username, email, password1, password2 } = user;
      console.log(user)
      authService
        .signup(username, email, password1, password2)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [error]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username || !values.email || !values.password1 || !values.password2)
      errors.all = "Fields cannot be empty!";
    else {
      if (values.username && values.username.length < 6)
        errors.username = "Name must be 6 characters long.";
      if (!regex.test(values.email && values.email))
        errors.email = "This is not a valid email format!";
      if (values.password1.length < 8)
        errors.password1 = "Password must be 8 characters long.";
      if (values.password2 != values.password1)
        errors.password2 = "Password does not match";
    }

    console.log(errors);
    return errors;
  };

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-4">
              <small>Sign up with</small>
            </div>
            <div className="text-center">
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Or sign up with credentials</small>
            </div>
            <Form role="form" onChange={handleChange} onSubmit={handleSubmit}>
              <div className="text-muted font-italic">
                {" "}
                <small>
                  <span className="text-danger font-weight-700">
                    {error.all}
                  </span>
                </small>
              </div>
              <FormGroup>
                <div className="text-muted font-italic">
                  <small>
                    <span className="text-danger font-weight-700">
                      {error.username}
                    </span>
                  </small>
                </div>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input name="username" placeholder="Username" type="text" />
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <div className="text-muted font-italic">
                  <small>
                    <span className="text-danger font-weight-700">
                      {error.email}
                    </span>
                  </small>
                </div>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name="email"
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                  />
                </InputGroup>
              </FormGroup>

              {/* Password1 */}
              <FormGroup>
                <div className="text-muted font-italic">
                  <small>
                    <span className="text-danger font-weight-700">
                      {error.password1}
                    </span>
                  </small>
                </div>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name="password1"
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>

              {/* Password2  */}
              <FormGroup>
                <div className="text-muted font-italic">
                  <small>
                    <span className="text-danger font-weight-700">
                      {error.password2}
                    </span>
                  </small>
                </div>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name="password2"
                    placeholder="Enter the Password Again"
                    type="password"
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        I agree with the{" "}
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit">
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
