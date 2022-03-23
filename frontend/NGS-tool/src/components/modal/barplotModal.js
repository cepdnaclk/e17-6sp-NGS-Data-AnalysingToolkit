import  React from 'react';
// import  CanvasJSReact from '../../canvas/canvasjs.react';
 
// var Component = React.Component;
 
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;
// class Modal extends Component {

	
// 	render() {
// 		const options = {
// 			theme: "light2",
// 			animationEnabled: true,
// 			title:{
// 				text: "Energy in Baked Foods"
// 			},
// 			axisY: {
// 				title: "Energy Per 100 g (kcal/100g)"
// 			}, 
// 			data: [{
// 				type: "boxAndWhisker",
// 				yValueFormatString: "#,##0.# \"kcal/100g\"",
// 				dataPoints: [
// 					{ label: "Bread",  y: [179, 256, 300, 418, 274] },
// 					{ label: "Cake",  y: [252, 346, 409, 437, 374.5] },
// 					{ label: "Biscuit",  y: [236, 281.5, 336.5, 428, 313] },
// 					{ label: "Doughnut",  y: [340, 382, 430, 452, 417] },
// 					{ label: "Pancakes",  y: [194, 224.5, 342, 384, 251] },
// 					{ label: "Bagels",  y: [241, 255, 276.5, 294, 274.5] }
// 				]
// 			}]
// 		}
// 		return (
// 		<div>
// 			<CanvasJSChart options = {options}
			 
// 			/>
		 
// 		</div>
// 		);
// 	}
// }

// import React, { Component } from 'react'
// import Boxplot, { computeBoxplotStats } from 'react-boxplot'

 
// const values = [
//   14, 15, 16, 16, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 19, 19, 19, 20,
//   20, 20, 20, 20, 20, 21, 21, 22, 23, 24, 24, 29,
// ]

// const Modal = () => (
//   <Boxplot
//     width={400}
//     height={200}
//     orientation="vertical"
//     min={0}
//     max={30}
//     stats={computeBoxplotStats(values)}
//   />
// )

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    
      series: [
        {
          type: 'boxPlot',
          data: [
            {
              x: 'Jan 2015',
              y: [54, 66, 69, 75, 88]
            },
            {
              x: 'Jan 2016',
              y: [43, 65, 69, 76, 81]
            },
            {
              x: 'Jan 2017',
              y: [31, 39, 45, 51, 59]
            },
            {
              x: 'Jan 2018',
              y: [39, 46, 55, 65, 71]
            },
            {
              x: 'Jan 2019',
              y: [29, 31, 35, 39, 44]
            },
            {
              x: 'Jan 2020',
              y: [41, 49, 58, 61, 67]
            },
            {
              x: 'Jan 2021',
              y: [54, 59, 66, 71, 88]
            }
          ]
        }
      ],
      options: {
        chart: {
          type: 'boxPlot',
          height: 350
        },
        title: {
          text: 'Basic BoxPlot Chart',
          align: 'left'
        },
        plotOptions: {
          boxPlot: {
            colors: {
              upper: '#5C4742',
              lower: '#A5978B'
            }
          }
        }
      },
    
    
    };
  }



  render() {
    return (
      

<div id="chart">
<ReactApexChart options={this.state.options} series={this.state.series} type="boxPlot" height={350} />
</div>


    );
  }
}

 
 
  export default ApexChart;    