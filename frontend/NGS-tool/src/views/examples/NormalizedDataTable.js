import { useState , useEffect} from "react";
// node.js library that concatenates classes (strings)
import {useHistory} from 'react-router-dom';
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import {MDBBtn} from 'mdb-react-ui-kit'
import {CCloseButton} from '@coreui/react';
import {MDBCloseIcon} from 'mdbreact';
import ScrollBars from 'react-scrollbar';
import { StrictMode } from "react";
import BoxPlot from '../../services/boxplot';  

//import Table from "react-bootstrap/Table"
// import { MDBSmoothScroll } from "mdbreact";

// reactstrap components
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

// core components
import { 
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "../../variables/charts.js";

//import Modal from 'react-modal';
import styled from 'styled-components';
import Header from "../../components/Headers/Header.js";
// import ApexChart from 'components/modal/barplotModal.js's
import ReactApexChart from 'react-apexcharts';
import parse from 'html-react-parser';
import JsonToTable from 'react-json-to-table';
import ReactHtmlParser from 'react-html-parser'
import Normalization from "./Normalization";

const Index = (props) => { 
  
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [openModal , setModalOpen] = useState(false);
  const [tableData, setTableData] = useState('');
  const [fileName, setFileName] = useState('');
  const [geneName, setGeneName] = useState('')
  const [ AD, setAD] = useState([]);
  const [control, setControl] = useState([]);
  const [ADpoints, setAdPoints] = useState(0);
  const [controlPoints, setControlPoinnts] = useState(0);
  const [normalizedData,setNormalizedData] = useState({})
  
  let history = useHistory();


  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

useEffect(() => {

   
//   var l = JSON.stringify(props.history.location.state)
//   const c = props.history.location.state.data ;
//   setFileName(props.history.location.state.name)
  console.log(props.data);
  setNormalizedData(props.data)

//   setTableData(c);
  
   
}, [] )
  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  const handleClick = (e) => {
    let gene = e.target.innerText;
    console.log( typeof e.target.innerText);
    console.log(e.target.innerText)
    setGeneName(e.target.innerText)

    BoxPlot.boxPlot(gene, fileName).then(res => {
      console.log(res.data);
    setAD (res.data.Ad_props); //calc
    setControl(res.data.Control_props) 
    setAdPoints(res.data.ad.length)//points
    setControlPoinnts(res.data.control.length)
    console.log(res.data.ad.length)
    setModalOpen(true)
  }).catch((err)=>console.log(err));

    
    
  }

  const closeHandle = () =>{
    // setModalOpen(false)
    setNormSelect(false)
  }

 
  

  // const  AD = [54, 66, 69, 75, 88, 90];
  // const control = [54, 59, 66, 71, 88];
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

   

  
  return (
    <>
      
     
        {openModal?null :
       
          <Col>
           {/* xl="4"> */}
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">{normalizedData.name}</h3>
                    <h5 className="mt-4">Normalization technique : {normalizedData.method}</h5>

                  </div>
                  
                </Row>
              </CardHeader>
                  

            <Table style={{ width: '100%',height:'100%'}} className="align-items-center table-flush table-hover" responsive onClick={e => handleClick(e)}>
                
                {ReactHtmlParser(normalizedData.html)}
               
      
                </Table>
                


 

 
               
            </Card>
          </Col>
        }

          {openModal  ? 
          
        <>
               
        <Col className="mb-8 mb-xl-0" xl="8">
          <Card className="shadow">
            <CardHeader className="border-0">
              <Row className="align-items-center">
                <div className="col">
                  <h3 className="mb-0">{geneName}</h3>
                  
                </div>
            
              </Row>
            </CardHeader>
                
            <div style={{alignItems:'right'}}>
             <MDBCloseIcon style={{position:'absolute' , left:0, botton:0, top:5, top:5 }} onClick={closeHandle}/>
             </div>
                
               
       <ReactApexChart options={options} series={series} type="boxPlot" height={350} />
              
             
          </Card>
        </Col>
       
        <Col lg="6" xl="4">
          <Row>
                <Card className="card-stats mb-4 mb-xl-0">
                  <Row>
          <div className="col">
            <Card className="shadow">
                   <CardHeader className="border-0">
                <h3 className="mb-0"> </h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">AD</th>
                    <th scope="col">Control</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>SAMPLES</td>
                    <td>{ADpoints}</td>
                    <td>{controlPoints}</td>
                  </tr>
                  <tr>
                    <td>MIN</td>
                    <td>{AD[0]}</td>
                    <td>{control[0]}</td>
                  </tr>
                  <tr>
                    <td>Q1</td>
                    <td>{AD[1]}</td>
                    <td>{control[1]}</td>
                  </tr>
                  <tr>
                    <td>MEDIAN</td>
                    <td>{AD[2]}</td>
                    <td>{control[2]}</td>
                  </tr>
                  <tr>
                    <td>Q3</td>
                    <td>{AD[3]}</td>
                    <td>{control[3]}</td>
                  </tr>
                  <tr>
                    <td>MAX</td>
                    <td>{AD[4]}</td>
                    <td>{control[4]}</td>
                  </tr>
                   
                </tbody>
              </Table>
               
            </Card>
          </div>
        </Row>
                </Card>
 </Row>

                


              </Col>
   
     
         </>
          :null}

     

       
    </>
  );

  

};


export default Index;
