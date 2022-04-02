import { useState, useEffect } from "react";
 
import {
CardBody,
Nav,
Button
} from "reactstrap";
// core components
import Select from 'react-select';
import MlServices from '../../services/MlModel';


const Normalization = (props) => {
  const [fileName, setFileName] = useState();
  const [tech, setTech] = useState();
  const [error, setError] = useState(false); 
  
  useEffect(() => {
    console.log('norm')
    if( props.fileName)
      setFileName(props.fileName)
  }, [] )

  const NormTech = [
    { label: "Min Max", value: 1 },
    { label: "Standard Deviation", value: 2 },
  ];

  const handleChange = (e)=> {
    console.log(e.label)
    setTech(e.label);
  }

  const Choose_norm_tech = (value) => {
    console.log(tech)
    if(!tech)
      setError(true)
    else{
      setError(false)
      var method = tech
      MlServices.normalization(fileName, method)
        .then(res => {
          console.log(res);
        })
        .catch(error=>{console.log(error)});
  }
}
  return (
    <> 
              <CardBody >
              <h6 className="heading-small text-muted mb-4 align-items-center">Selected file : {fileName}  </h6> 
              <h6 className="heading-small text-muted mb-4"> Choose A Normalization Technique </h6> 
              <div className="row">
              <div className="col-md-3"></div>
              <div className="container">
              <div className="col-md-6">
                  <Select  options={NormTech} onChange={handleChange}/>
              </div>
              <div className="col-md-4"></div>
              </div>
          </div>
          <div className="col ">
          <div style = {{marginTop:20}}>
                    <Nav className="justify-content-center" pills>
                    <Button
                      color="success"
                      onClick={Choose_norm_tech}
                      size="sm"
                    >
                      Normalize the data
                    </Button>
                    </Nav>
                    </div>
                  </div>
              </CardBody>
    </>
  );
};



export default Normalization;
