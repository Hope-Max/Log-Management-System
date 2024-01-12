import React, { Fragment, useState } from 'react';
import { Breadcrumbs, Btn } from '../../../AbstractElements';
import './index.scss';
import {
	Button,
	Card,
	CardBody,
	Col,
	Container,
	Form,
	FormGroup,
	Input,
	Label,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Row,
	Table
} from 'reactstrap';
import moment from 'moment';
import styles from './FrameComponent.module.css';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import { benefitsTableColumns, dummytabledata, leaveTableColumns } from '../../../Data/Table/Defaultdata';
import ReactSelect from 'react-select';
import ReactDatePicker from 'react-datepicker';
import { department, isEmpty } from '../../../redux/constants';
import { Textarea } from '@mobiscroll/react-lite';

const Performance = () => {
	const [modal, setModal] = useState(false);
	const [payload, setPayload] = useState({
		department: null,
		employee: null
	});

	const toggle = () => setModal(!modal);
	return (
		<Fragment>
			<Breadcrumbs mainTitle="Performance" parent="Me" title="Performance" />
			<Container fluid={true}>
				{/* <Row>
					<div className={'d-flex justify-content-end m-b-20'}>
						<div>
							<Btn attrBtn={{ className: 'btn btn-air-primary', color: 'primary' }} onClick={toggle}>
								Add benefits
							</Btn>
						</div>
					</div>
				</Row> */}
				<Row>
					<Col sm="12">
						<Card>
							<CardBody>
								<DataTableComponent data={dummytabledata} tableColumns={benefitsTableColumns} />
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

export default Performance;
