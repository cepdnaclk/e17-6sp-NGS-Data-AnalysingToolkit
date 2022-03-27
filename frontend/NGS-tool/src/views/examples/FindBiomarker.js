import { useState, useEffect } from "react"; 
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Nav,
  Button,
} from "reactstrap";
// core components
 
import Header from "../../components/Headers/Header.js";
import ChooseFile from "./ChooseFile";
import Normalization from './Normalization';

const FindBiomarker = (props) => {
 
  const [fileName, setFileName] = useState();
  const [newFile, setNewFile] = useState(false);
  const [status, setStatus] = useState(0);

  useEffect(() => {
  console.log(props)
    if(props.location.state.fileName)
    setFileName(props.location.state.fileName)
       
     
  }, [] );


  const status_change = () => {
       setStatus(status+1)
  }
  
const steps = ['Choose File', 'Normalization', 'Feature Selection'];
  

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
        <Col className="mb-8 mb-xl-0" xl="8">
        <Card className="shadow ">
              <CardHeader className="bg-transparent">
              
                <h3 className="mb-0">{ steps[status]}</h3>
                <Nav className="justify-content-end" pills>
                    <Button
                      color="success"
                      onClick={status_change}
                      size="sm"
                    >
                      {steps[status+1]}  <i className="ni ni-bold-right" />
                
                    </Button>
                      
                    </Nav>
              </CardHeader>
          {status==0?
        <ChooseFile  fileName={fileName} key={fileName} />:null}

          {status==1?
        <Normalization   />:null}

        </Card>
         </Col>

          {/* <Col lg="6" xl="4">
          <Row>
                <Card className="card-stats mb-4 mb-xl-0">
                  <Row>
          <div className="col">
            <Card className="shadow">
                   <CardHeader className="border-0">
                <h3 className="mb-0"> </h3>
              </CardHeader>
             
               
            </Card>
          </div>
        </Row>
                </Card>
 </Row>
              </Col> */}
        </Row>
      </Container>
    </>
  );
};



export default FindBiomarker;
