import React, { Fragment } from 'react';
import { Form, ToggleButton } from 'react-bootstrap';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../../AbstractElements';

const Performance = () => {
	return (
		<Fragment>
			{/* <Breadcrumbs parent="Performance" /> */}
			<Container fluid={true}>
				<Row>
					<Col sm="12">
						<Card></Card>
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

export default Performance;
