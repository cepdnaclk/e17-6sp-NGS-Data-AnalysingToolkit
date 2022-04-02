import { useState, useEffect } from "react";
 
import {
CardBody,
Nav,
Button
} from "reactstrap";
// core components
import Select from 'react-select';

import User from '../../services/user';  

const ChooseFile = (props) => {
   
  const [fileName, setFileName] = useState();
 

  useEffect(() => {
    console.log('hello')
    if( props.fileName){
      setFileName(props.fileName)
      console.log(fileName)
    }

    else{
      User.files().then(res => {
        console.log(res.data);
     
    }).catch((err)=>console.log(err));
    }
 
  }, [] )

  const onTrigger = (event) => {
 
    props.parentCallback(event.label);
  
}

const submit = (event) =>{
  props.parentCallback('submit')
}

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
                        <Select  options={Countries} onChange={onTrigger}/>
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
                   <Select  options={Countries} onChange={onTrigger}/>
               </div>
               <div className="col-md-4"></div>
               </div>
               <div style = {{marginTop:20}}>
                    <Nav className="justify-content-center" pills>
                    <Button
                      color="success"
                      onClick={submit}
                      size="sm"
                    >
                      Submit
                    </Button>
                      
                    </Nav>
                    </div>
           </div>
           </>
                }
              
              </CardBody>
          
       
      
       
    </>
  );
};



export default ChooseFile;
