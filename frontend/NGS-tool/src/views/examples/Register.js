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
import React, {useEffect, useState} from 'react'

const Register = () => {

  const [ user, setUser] = useState({});
   
    const [error, setErrors] = useState({});
    const [submit, setSubmit] = useState(false);
    


    const handleChange = e => { 
        setUser({...user, [e.target.name]:e.target.value});
        // setErrors(validate(user));
        console.log(user)
    };

    const handleSubmit = e => {
        e.preventDefault(); 
        setErrors(validate(user));
        setSubmit(true);
   
    };

    useEffect(()=>{
        let errorx = {}
        if(Object.keys(error).length === 0 && submit){
                 let {username, email, password} = user;
      //  authServices.signup(name, email, address, phoneno, nic, password)
      //   .then(res => {console.log(res);
      //       if(res.data.email) {     //error

      //           errorx.success ='User created Succssfully!, Please confirm your email to login';
      //       }
      //       else{
      //           errorx.all = res.data;
                
      //           //alert(res.headers);
      //         }
      //   setErrors(errorx);
      //   })
            
      //   .catch(error=>{console.log(error)});
        }
    }, [error]);

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!values.username || !values.email || !values.password)
        errors.all = 'Fields cannot be empty!';
        else{
        // if(!values.username )
        //             errors.all = 'Name is required';
        
        
        if(values.username && values.username.length < 6)
                    errors.username = 'Name must be 6 characters long.'

        // if(!values.email )
        //             errors.email = 'Email is required.';
        
        if(!regex.test(values.email && values.email))
            errors.email = 'This is not a valid email format!';  

        // if(!values.password )
        //     errors.password = 'Password is required.';

        if(values.password.length < 6 )
            errors.password = 'Password must be 6 characters long.';


        }
       
        
        console.log(errors)
        return errors;
    }
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
            <Form role="form"  onChange={handleChange} onSubmit={handleSubmit}>

            <div className="text-muted font-italic"> <small>
                        <span className="text-danger font-weight-700">{error.all}</span>
                        </small>
                    </div>


              <FormGroup>

                <div  className="text-muted font-italic" >
              <small>
                        <span className="text-danger font-weight-700">{error.username}</span>
                        </small>
                  
                    </div>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input name= 'username' placeholder="Username" type="text" />
                </InputGroup>
              </FormGroup>



              <FormGroup>
                <div  className="text-muted font-italic">
              <small>
                        <span className="text-danger font-weight-700">{error.email}</span>
                        </small>
                    </div>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                  name= 'email'
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                  />
                </InputGroup>
              </FormGroup>


              <FormGroup >
              <div  className="text-muted font-italic">
              <small>
                        <span className="text-danger font-weight-700">{error.password}</span>
                        </small>
                    </div>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                  name= 'password'
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              
              <div className="text-muted font-italic">
                {/* <small>
                  password strength:{" "}
                  <span className="text-success font-weight-700">strong</span>
                </small> */}
              </div>
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
