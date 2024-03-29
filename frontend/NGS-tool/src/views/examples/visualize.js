import { useState , useEffect} from "react";
import {useHistory} from 'react-router-dom';
import Chart from "chart.js";
import {MDBCloseIcon} from 'mdbreact';
import BoxPlot from '../../services/boxplot'; 
import {RangeStepInput} from 'react-range-step-input';
import {NumericInput} from 'react-numeric-input';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  CardTitle
} from "reactstrap";

import { 
  chartOptions,
  parseOptions,
} from "../../variables/charts.js";

import Header from "../../components/Headers/Header.js";
import ReactHtmlParser from 'react-html-parser'
import Normalization from "./Normalization";
import ChooseFile from './ChooseFile';
import NormalizedDataTable from './NormalizedDataTable';

const Index = (props) => { 
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [openModal , setModalOpen] = useState(false);
  const [tableData, setTableData] = useState('');
  const [fileName, setFileName] = useState('');
  const [geneName, setGeneName] = useState('')
  const [ AD, setAD] = useState([]);
  const [control, setControl] = useState([]);
  const [ADpoints, setAdPoints] = useState(0);
  const [controlPoints, setControlPoinnts] = useState(0);
  const [normSelect, setNormSelect] = useState(false);
  const [tempFile, setTempFile] = useState('');
  const [normalized, setNormalized] = useState(false)
  const [normalizedData, setNormalizedData] = useState({})
  const [features, setFeatures] = useState(0);
  const [samples, setSamples] = useState(0);
 const [value, setValue] = useState(50);

  let history = useHistory();
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

useEffect(() => {
  var l = JSON.stringify(props.history.location.state)
  const c = props.history.location.state.data ;
  setSamples(props.history.location.state.samples)
  setFeatures(props.history.location.state.features)
  setFileName(props.history.location.state.name)
  console.log(c);
  setTableData(c);
  console.log(features)
  console.log(samples)
}, [])
  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  const handleClick = (e) => {
    let gene = e.target.innerText;
    console.log( typeof e.target.innerText);
    setGeneName(e.target.innerText)
    // console.log(normalizedData)
    BoxPlot.boxPlot(gene, normalizedData.name).then(res => {
    setAD (res.data.Ad_props); //calc
    setControl(res.data.Control_props) 
    setAdPoints(res.data.ad.length)//points
    setControlPoinnts(res.data.control.length)
    setModalOpen(true)
  }).catch((err)=>console.log(err));
  }
  const closeHandle = () =>{
    setNormSelect(false)
  }

  const Choose_norm_tech = () => {
    setNormSelect(true);
  }
  const handleCallback = (childData) =>{
    //from back need to provide file list ---------
    //selected file come here(done)
    //need to retreive data from that file -------
    //send norm algo to the backend ----------- 
    //get result data & boxplot 
    if(childData=='submit'){
      setFileName(tempFile)
      console.log("File name is: ",fileName)
    }
    else 
      setTempFile(childData)
}

const get_normalized_data = (childData) =>{
  setNormalizedData(childData);
  setNormalized(true) 
}
  const  series= [
    {
      type: 'boxPlot', 
      data: [
        {
          x: 'AD Sample',
          y: AD
        }, 
        
        {
          x: 'Control Sample',
          y: control
        }
      ]
    
    }] 
  const options = {
    chart: {
      type: 'boxPlot',
      height: 500
    },
    title: {
      text: '',//geneName,
      align: 'left'
    },
    plotOptions: {
      boxPlot: {
        colors: {
          upper: '#28A316',
          lower: '#7BEEB5'
        },
        stroke: {
          width: 0,
          curve: 'smooth'
        },
        fill: {
          opacity: 1,
          type: 'solid'
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left'
        },
        xaxis: {
          type: 'datetime'
        },
      }  
    },
  }

  const forceNumber = function(n) {
    n = Number(n);
    if (isNaN(n) || typeof n === 'undefined') {
        n = 0;
    }
    return n;
};
  const onChange = (e)=> {
    const newVal = forceNumber(e.target.value);
    setValue(newVal);
}
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--8" fluid>
        <Row className="mt-5">
        {!normalized?
        <>
        {!normSelect?
        <>
        {fileName? 
          <Col>
           {/* xl="4"> */}
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">{fileName}</h3>
                  </div>
                  <div className="col ">
                    <Nav className="justify-content-end" pills>
                    <Button
                      color="success"
                      onClick={Choose_norm_tech}
                      size="sm"
                    >
                      Normalization
                    </Button>
                      
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">FEATURES</th>
                    <th scope="col">SAMPLES</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{samples}</td>
                    <td>{features}</td>          
                  </tr>
                 
                   
                </tbody>
              </Table>
              {/* <RangeStepInput
                min={0} max={100}
                value={value} step={1}
                onChange={onChange.bind(this)}
            />
               <h2>{value}</h2> */}

               {/* <NumericInput className="form-control"/> */}
		 
              </CardBody>

                <Table style={{ width: '100%', height:'100%'}} className="align-items-center table-flush table-hover " responsive onClick={e => handleClick(e)}>
                
                {ReactHtmlParser(tableData)}
                </Table>
            </Card>
          </Col>
        :
        <>
          <Col className="mb-8 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">ChooseFile</h3>
                  </div>
                  {/* <div className="col ">
                    <Nav className="justify-content-end" pills>
                    <Button
                      color="success"
                      onClick={normalize_data}
                      size="sm"
                    >
                      Normalize the data
                    </Button>
                      
                    </Nav>
                  </div> */}
              
                </Row>
              </CardHeader>
        <ChooseFile parentCallback={handleCallback} />
            </Card>
          </Col>
</>}
</>
          :
          // {/* choose normalization technique ---------------------------------------- */}
          <>
          <Col className="mb-8 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Normalization</h3>
                  </div>
                  {/* <div className="col ">
                    <Nav className="justify-content-end" pills>
                    <Button
                      color="success"
                      onClick={normalize_data}
                      size="sm"
                    >
                      Normalize the data
                    </Button>
                    </Nav>
                  </div> */}
                </Row>
              </CardHeader>
              <div style={{alignItems:'right'}} 
              >
              <MDBCloseIcon style={{position:'absolute' , left:0, botton:0, top:5, top:5 }} onClick={closeHandle}/>
              </div>        
        <Normalization  fileName={fileName} key={fileName}  parentCallback={get_normalized_data}/>
                

            </Card>
          </Col>
          </>
            }
            </>
            :
            
            // normalized data should come here
            <NormalizedDataTable data = {normalizedData}/>
          }
        </Row>
      </Container>
    </>
  );

  

};

// const Table  = styled.table`

// div {
//   overflow-x: auto;
// }
// table {
//   border-collapse: collapse;
//   width: "5rem";
//   Height: "0rem",
// overflow: "auto",
// }
// th {
//   background-color: #f6f9fc;
// }
// th,
// td {
//   padding: 15px;
//   text-align: left;
//   border-bottom: 1px solid #ccc;
// }
// tr:hover {
//   background-color: #ddd;
// }
// tbody{
//   height: '10rem', overflow:'scroll', display: 'block'
// } 
// thead{
//   display: block;
// }
// // align-items: center !important;
// // tbody tr :hover{
// //     background:#ddd
// // }

// th {
//     color: #8898aa;
//     background-color: #f6f9fc;
//     border-color: #e9ecef; }

// // td{
// //     display: flex !important;
// //   align-items: center !important; 
// //   margin-right: 0.5rem !important;}

// span  {
//     margin-right: 0.5rem !important;
// }

//   td,
//   th {
//   vertical-align: middle; }

//    td,
//   th {
//   border-left: 0;
//   border-right: 0; }

//   tbody tr:first-child td,
// tbody tr:first-child th {
//   border-top: 0; }

//  tbody tr:last-child td,
//  tbody tr:last-child th {
//   border-bottom: 0; }

// }
// `;
export default Index;
