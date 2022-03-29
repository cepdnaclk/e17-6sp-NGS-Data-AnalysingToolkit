import { useState, useEffect } from "react";
 
import {
CardBody,
} from "reactstrap";
// core components
import Select from 'react-select';
 
  

const ChooseFile = (props) => {
   
  const [fileName, setFileName] = useState();
 

  useEffect(() => {
    
    if( props.fileName)
      setFileName(props.fileName)
 
  }, [] )


  const Countries = [
    { label: "Albania", value: 355 },
    { label: "Argentina", value: 54 },
    { label: "Austria", value: 43 },
    { label: "Cocos Islands", value: 61 },
    { label: "Kuwait", value: 965 },
    { label: "Sweden", value: 46 },
    { label: "Venezuela", value: 58 }
  ];
  return (
    <>
      
     
        
          
              <CardBody >
              
               
              {fileName? 
              <>
              <div className="align-items-center">
              
                <h6 className="heading-small text-muted mb-4 align-items-center">Selected file : {fileName}  </h6> 
              
                 
                    <h6 className="heading-small text-muted mb-4">or</h6>
                 
            
                   <h6 className="heading-small text-muted mb-4"> Choose Another File </h6> 
                   <div className="container">
                    <div className="row">
                   
                    <div className="col-md-6">
                        <Select  options={Countries}/>
                    </div>
                    
                    </div>
                </div>
                   </div>
                   </>
               
                   :
                   <>
               <h6 className="heading-small text-muted mb-4"> Choose A File </h6> 
               <div className="container">
               <div className="row">
               <div className="col-md-3"></div>
               <div className="col-md-6">
                   <Select  options={Countries}/>
               </div>
               <div className="col-md-4"></div>
               </div>
           </div>
           </>
                }
              
              </CardBody>
          
       
      
       
    </>
  );
};



export default ChooseFile;
