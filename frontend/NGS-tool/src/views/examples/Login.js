 /// reactstrap components
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
import React, {useState, useEffect, useContext} from 'react';
import { useHistory} from 'react-router-dom';
import authService from '../../services/auth'; 

const Login = () => {


  let history = useHistory();
    const [ user, setUser] = useState({});
    const [error, setErrors] = useState({});
    const [submit, setSubmit] = useState(false);

    const handleChange = e => { 
        setUser({...user, [e.target.name]:e.target.value});
        // setErrors(validate(user));
        // console.log(user)
    };

    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validate(user));
        setSubmit(true);
        
    };

    useEffect(()=>{
        let errorx = {}
        if(Object.keys(error).length === 0 && submit){
            //console.log(user);
            let username = user.username;
            let password = user.password;
            authService.login(username, password)
            .then(res => {console.log(res)
              setSubmit(false)
                //console.log(res);

    //         if(res.data.message)     //INVALID LOGIN
    //         errorx.all = 'Invalid User!, Email or Password is incorrect.'; 

    //         else if(res.data.email)
    //         errorx.all = 'Please confirm your email to login.'; 
            

    //         else{   //LOGGED IN
    //         localStorage.setItem('isLoggedIn', true);
            
    //         errorx.all = 'Success';
    //         console.log(state, 'loggin');
    //         dispatch({type:'USER', payload:true});
    //         console.log(state, 'loggin');
    //        // <Redirect to='/'/>;
    //        history.push('/home');
           
    //         } 
    // setErrors(errorx); 
            })
                
            .catch(err=>{console.log(err)});
        }
    } );

    const validate = (values) => {
      const errors = {};
      // console.log(errors)
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if( !values.username ||  !values.password  ){
                  errors.all ='has-danger';
                  errors.msg = 'Wrong Input! Fields cannot be empty.';
      }
  
     
      // else if(!regex.test(values.username)){
      //     errors.email = 'has-danger'; 
      //     errors.emsg = 'This is not a valid email format!';  
      //     errors.all =' ';
      //     errors.msg = '';
         
      // }
      // else{
      //   errors = {};
      // }
      
      return errors;
  }
  return (
    <>
      <Col lg="5" md="10">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-1 mb-2">
              <small>Sign in with</small>
            </div>
            <div className="btn-wrapper text-center">
              
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
          <CardBody className="px-lg-5 py-lg-4">
            <div className="text-center text-muted mb-4">
              <small>Or sign in with credentials</small>
            </div>
            <Form role="form" onChange={handleChange} onSubmit={handleSubmit} className={error.all}>
            <div className="text-muted font-italic"> <small>
                        <span className="text-danger font-weight-700">{error.msg}</span>
                        </small>
                    </div>


                  
              <FormGroup className="mb-3" action=''   className={error.username}>
              <div className="text-muted font-italic"> <small>
                        <span className="text-danger font-weight-700">{error.emsg}</span>
                        </small>
                    </div>

                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend"  >
                    <InputGroupText >
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input 
                  name='username'
                    placeholder="Username"
                    type="text"
                    // autoComplete="new-email"
                  />
                </InputGroup>
              </FormGroup >
              <FormGroup>
              
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                  name='password'
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="button" type="submit">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
