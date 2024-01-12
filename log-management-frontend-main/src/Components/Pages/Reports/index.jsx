import React, { Fragment } from 'react';
import { Dropdown, Form, ToggleButton } from 'react-bootstrap';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../../AbstractElements';
import {jsPDF} from "jspdf";
import html2canvas from "html2canvas";
import domtoimage from "dom-to-image";
import { Bar, Doughnut } from "react-chartjs-2";
import { BarChart, DoughnutChart1, DoughnutChart2, DoughnutChart3 } from "../../../Constant";
import { barChartData, barChartOptions ,doughnutData, doughnutOption } from "../../../Data/Chart/chartjs";
import HeaderCard from '../../Common/Component/HeaderCard';
const Reports = () => {

function GeneratePDFReport() 
{
	var report = document.getElementById("report");
  	const pdf = new jsPDF();
  	if(pdf)
  	{
		domtoimage.toPng(report).then(imgData => {
    	pdf.addImage(imgData, 'PNG', 10, 10);
    	pdf.save("Log-Management-Report.pdf");
    	});
 	}
}
return (
		<Fragment>
			{/* <Breadcrumbs parent="Reports" /> */}
			<Container fluid={true}>		
			<Row>
				<label>Device</label>
				<select>
					<option value="select">--Select--</option>
				</select>
				<label>Channel</label>
				<select>
					<option value="select">--Select--</option>
				</select>
				<label>Log Level</label>
				<select>
					<option value="select">--Select--</option>
				</select>
			</Row>	
			<Row>
				<button onClick={GeneratePDFReport}>Download PDF Report</button>
			</Row>	
			<Row id="report">
			<Col xl="6" md="12" >
                <Card>
                    <HeaderCard title={BarChart} />
                    <CardBody className="chart-block">
                        <Bar data={barChartData} options={barChartOptions} width={717} height={358} />
                    </CardBody>
                </Card>
            	<Card>
                	<HeaderCard title={DoughnutChart1} />
                	<CardBody className="chart-block">
                    	<Doughnut data={doughnutData} options={doughnutOption} width={717} height={358} />
                	</CardBody>
            	</Card>
				<Card>
                	<HeaderCard title={DoughnutChart2} />
                	<CardBody className="chart-block">
                    	<Doughnut data={doughnutData} options={doughnutOption} width={717} height={358} />
                	</CardBody>
            	</Card>
				<Card>
                	<HeaderCard title={DoughnutChart3} />
                	<CardBody className="chart-block">
                    	<Doughnut data={doughnutData} options={doughnutOption} width={717} height={358} />
                	</CardBody>
            	</Card>
        	</Col>
		</Row>
		<Row>
			<Col sm="12">
				<Card></Card>
			</Col>
		</Row>
	</Container>
</Fragment>
);
};

export default Reports;
