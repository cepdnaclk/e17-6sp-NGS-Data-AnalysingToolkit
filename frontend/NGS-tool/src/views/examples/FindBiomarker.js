// import { useState, useEffect } from "react"; 
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   Container,
//   Row,
//   Col,
//   UncontrolledTooltip,
//   Nav,
//   Button, 
// } from "reactstrap";
// // core components

// import { Timeline, TimelineEvent } from "react-event-timeline";

// import Header from "../../components/Headers/Header.js";
// import ChooseFile from "./ChooseFile";
// import Normalization from './Normalization';
// import NormalizedDataTable from './NormalizedDataTable';


// const FindBiomarker = (props) => {
 
//   const [fileName, setFileName] = useState('');
//   const [tempFile, setTempFile] = useState('');
//   const [status, setStatus] = useState(0);
//   const [normalizedData, setNormalizedData] = useState({})
//   const [normalized, setNormalized] = useState(false)


//   useEffect(() => {
//   // console.log(props)
//   //   if(props.location.state.fileName)
//   //   setFileName(props.location.state.fileName)

// //   }, [] );


// //   const status_change = () => {
// //        setStatus(status+1)
// //   }
  
// const steps = ['Step - 1: Choose File', 'Step - 2: Normalization', 'Step - 3: P-Value', 'Step - 4: Feature Selection'];
  

//       const handleCallback = (childData) => {
//           setFileName(childData)
//           console.log(fileName)

//           //  console.log(childData)
//           //   if(childData=='submit'){
//           //     console.log(tempFile)

//           //     setFileName(tempFile)
//           //     console.log(fileName)
//           //   }
      
// //   else 
// //     setTempFile(childData)

// }

// const get_normalized_data = (childData) =>{
//   setNormalizedData(childData);
//   setNormalized(true) 
//   console.log(childData)
// }

//   return (
//     <>
//       <Header />
//       {/* Page content */}
//       <Container className="mt--8" fluid>
//         {/* Table */}
//         <Row>
//         <Col className="mb-8 mb-xl-0" xl="10">
//         <Card className="shadow ">
//               <CardHeader className="bg-transparent">
              
// //                 <h3 className="mb-0">{ steps[status]}</h3>
// //                 <Nav className="justify-content-end" pills>
// //                     <Button
// //                       color="success"
// //                       onClick={status_change}
// //                       size="sm"
// //                     >
// //                       {steps[status+1]}  <i className="ni ni-bold-right" />
                
// //                     </Button>
                      
//                     </Nav>
//               </CardHeader>
//           {status==0?
//         // <ChooseFile  fileName={fileName} key={fileName} />
//         <ChooseFile parentCallback={handleCallback} />
//         :null}

//           {status==1?
          
//           <>
//           {console.log(normalized)}
//           {normalized?
//         <NormalizedDataTable data = {normalizedData}/>
//         :
//         <Normalization   fileName={fileName} key={fileName} parentCallback={get_normalized_data}/>

//         }
//       </>
        
//         :null}

//         </Card>
 
//            <Col lg="9" xl="2">
//           <Row>
//                 <Card className="card-stats mb-5 mb-xl-7">
//                   <Row>
//           <div className="col">
//             <Card className="shadow">
//                    <CardHeader className="border-0">
//                 <h3 className="mb-0"> Find Biomarker</h3>
//               </CardHeader>
             
// //               <Timeline color="success">

// //               <TimelineEvent 
// //         title="Choose File"
// //         icon={<i className="ni ni-cloud-upload-96   "> </i>}
// //       >
// //       <></>
// //       </TimelineEvent>
      
// //       <TimelineEvent
// //         title="Normalization"
// //         icon={<i className="ni ni-cloud-upload-96   "> </i>}
// //       >
// //       <></>
// //       </TimelineEvent>
      
// //       <TimelineEvent
// //         title="Feature Selection"
// //         icon={<i className="ni ni-cloud-upload-96   "> </i>}
// //       >
// //       <></>
// //       </TimelineEvent>
      
// //     </Timeline>
// //             </Card>
// //           </div>
// //         </Row>
// //                 </Card>
// //  </Row>
// //               </Col> 
// //         </Row>
// //       </Container>
// //     </>
// //   );
// // };



// // export default FindBiomarker;
