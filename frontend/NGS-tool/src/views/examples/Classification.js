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
    { label: "Logistic Regression", value: 1 },
    { label: "Linear SVM", value: 2 },
    { label: "KNN", value: 3 },
    { label: "Gaussian SVM", value: 4 },
    { label: "Naive Bayes", value: 5 },
    { label: "Random Forest", value: 6 },

  ];

  const handleChange = (e)=> {
    console.log(e.label)
    setTech(e.label);
  }

  const Choose_norm_tech = (value) => { //Select the file method and send to normalization
    console.log(tech)
    if(!tech)
      setError(true)
    else{
      setError(false)
      var method = tech
      MlServices.normalization(fileName, method)
        .then(res => {console.log(res);
          props.parentCallback(res.data);
        })
        .catch(error=>{console.log(error)});
  }
}
  return (
    <> 
              <CardBody >
              <h6 className="heading-small text-muted mb-4 align-items-center">Selected file : {fileName}  </h6> 
              <h6 className="heading-small text-muted mb-4"> Choose A Feature Selection Technique </h6> 
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
                      Select 
                    </Button>
                    </Nav>
                    </div>
                  </div>
              </CardBody>
    </>
  );
};

export default Normalization;
