import { useState, useEffect } from "react";
import {
CardBody,
Nav,
Button,
Col,
Row
} from "reactstrap";
// core components
import Select from 'react-select';
import MlServices from '../../services/MlModel';

const PValue = (props) => {
  const [fileName, setFileName] = useState();
  const [tech, setTech] = useState();
  const [error, setError] = useState(false); 
  const [PError, setPError] = useState(false);
  const [Ferrror, setFError] = useState(false);
  const [pv, setPv] = useState();
  const [fold, setFold] = useState();
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    console.log('norm')
    if( props.fileName)
      setFileName(props.fileName)
    
  }, [] )

  const NormTech = [
    { label: "Min Max", value: 1 },
    { label: "Standard Deviation", value: 2 },
  ];


  const handlePvalue = event => {
    setError('')
    let { value, min, max } = event.target;
    if(Number(max)< Number(value) || Number(min) > Number(value))
      setPError(true)
    else {
      setPv(value)
      setPError(false)
    }

    
  };

  const handleFold = event => {
    setError('')
    let { value, min, max } = event.target;
    if(Number(max)< Number(value) || Number(min) > Number(value))
      setFError(true)
    else{ 
      setFold(value)
      setFError(false)
    }
  };

  const calculate = () => {  
      if(PError & Ferrror)
        setError('Wrong P - Value and Fold Range');
      else if(PError)
        setError('Wrong P - Value');
      else if(PError)
        setError('Wrong Fold Range');
      else 
        setError('')
  console.log(error)
}
  return (
    <> 
              <CardBody style={{marginTop:20}}>
              <div className="text-muted font-italic">
                <small>
                  <span className="text-danger font-weight-700">{error}</span>
                </small>
              </div>
              <h6 className="heading-small text-muted mb-4 align-items-center">Selected file : {fileName}  </h6> 
              <Row style={{marginTop:40}} >
                 
                  <Col>
                  
                  <h6 className="heading-small text-muted mb-4"> P value :</h6> 
                  </Col>
                  <Col>
                  <div className="row">
              <div className="col-md-3"></div>
              <div className="container">
              <div className="col-md-6">

                        <input className="form-control-muted" onChange={handlePvalue} type="number" min="0.00" step="0.01" max="1.00" presicion={2} />
                        </div>
              </div>
          </div>
                  </Col>
                  

               <Col></Col> 
          <Col>
          <h6 className="heading-small text-muted mb-4"> Fold Range :</h6> 
          </Col>
          <Col>
              <div className="row">
              <div className="col-md-3"></div>
              <div className="container">
              <div className="col-md-6">
                <input className="form-control-muted" onChange={handleFold} type="number" min="1" max="250"/>
              </div>
              </div>
          </div>
          </Col>
          </Row>

          
          <div className="col ">
          <div style = {{marginTop:20}}>
                    <Nav className="justify-content-center" pills>
                    <Button
                      color="success"
                      onClick={calculate}
                      size="sm"
                    >
                      CALCULATE
                    </Button>
                    </Nav>
                    </div>
                  </div>
              </CardBody>
    </>
  );
};

export default PValue;
