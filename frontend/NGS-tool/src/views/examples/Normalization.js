import { useState, useEffect } from "react";
 
import {
CardBody,
} from "reactstrap";
// core components
import Select from 'react-select';
 
 

const Normalization = (props) => {
   
  const [fileName, setFileName] = useState();
 

  useEffect(() => {
    
    if( props.fileName)
      setFileName(props.fileName)
 
  }, [] )


  const NormTech = [
    { label: "Min Max", value: 1 },
    { label: "Standard Deviation", value: 2 },
    
  ];
  return (
    <> 
              <CardBody >
    <h6 className="heading-small text-muted mb-4"> Choose A Normalization Technique </h6> 
               <div className="container">
               <div className="row">
               <div className="col-md-3"></div>
               <div className="col-md-6">
                   <Select  options={NormTech}/>
               </div>
               <div className="col-md-4"></div>
               </div>
           </div>
            
              
              </CardBody>
  
    </>
  );
};



export default Normalization;
