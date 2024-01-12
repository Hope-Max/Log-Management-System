import React, { Fragment, useEffect, useState } from 'react';
import { Breadcrumbs, Btn, H3, H4, H5, Image, P } from '../../../AbstractElements';
// import './index.scss';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Media,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane
} from 'reactstrap';
import Select from 'react-select';
import { FaGreaterThan, FaLessThan } from 'react-icons/fa';
import moment from 'moment';
import user1 from '../../../assets/images/user/1.jpg';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import { dummytabledata, leaveTableColumns, tableColumns } from '../../../Data/Table/Defaultdata';
import DatePicker from 'react-datepicker';
import { leaveTimeType } from '../../Forms/FormWidget/FormSelect2/OptionDatas';
import TodoCheckbox from '../../Application/Todo/TodoCheckbox';
import { department } from '../../../redux/constants';
import { Info, PlusCircle, Target } from 'react-feather';
import { Link } from 'react-router-dom';

const Payroll = () => {
    const [date, setDate] = useState(new Date());
    const [currentYear, setCurrentYear] = useState(date.getFullYear());
    const [startDate, setStartDate] = useState(moment(date).startOf('month').format('DD-MM-YYYY'));
    const [lastDate, setLastDate] = useState(moment(date).endOf('month').format('DD-MM-YYYY'));
    const [listType, setListType] = useState({ value: 'Pending expense', label: 'Pending expense' });
    const [filterDepartment, setFilterDepartment] = useState({ value: 'null', label: 'Select department' });
    const [activeTab, setActiveTab] = useState('1');
    const [daysInMonth, setDaysInMonth] = useState([]);
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const getDaysInMonth = (month, year) =>
        new Array(31)
            .fill('')
            .map((v, i) => new Date(year, month - 1, i + 1))
            .filter((v) => v.getMonth() === month - 1);

    useEffect(
        () => {
            setDaysInMonth(getDaysInMonth(moment(date).format('M'), currentYear));
        },
        startDate,
        currentYear
    );

    const handleDateChange = (action) => {
        if (action === 'increase') {
            let newDate = new Date(date.setMonth(date.getMonth() + 1));
            setDate(newDate);
            setCurrentYear(date.getFullYear());
            setStartDate(moment(date).startOf('month').format('DD-MM-YYYY'));
            setLastDate(moment(date).endOf('month').format('DD-MM-YYYY'));
        } else {
            let newDate = new Date(date.setMonth(date.getMonth() - 1));
            setDate(newDate);
            setCurrentYear(date.getFullYear());
            setStartDate(moment(date).startOf('month').format('DD-MM-YYYY'));
            setLastDate(moment(date).endOf('month').format('DD-MM-YYYY'));
        }
    };

    console.log('getDaysInMonth', daysInMonth);

    return (
        <Fragment>
            <Breadcrumbs mainTitle="Summary" parent="My Team" title="Summary" />
            <Container fluid={true}>
                <Col md="12">
                    <Row>
                        <Col md="6">
                            <Card>
                                <CardBody>
                                    <Col>
                                        <H5>Who is off today</H5>
                                    </Col>
                                    <Row>
                                        <Col className="col m-t-10">
                                            <Image
                                                attrImage={{
                                                    className: 'rounded-circle img-30 me-3',
                                                    src: `${user1}`,
                                                    alt: 'Generic placeholder image'
                                                }}
                                            />

                                            <Media body className="align-self-center m-t-10">
                                                <div>Airi Satou</div>
                                            </Media>
                                        </Col>
                                        <Col className="col m-t-10">
                                            <Image
                                                attrImage={{
                                                    className: 'rounded-circle img-30 me-3',
                                                    src: `${user1}`,
                                                    alt: 'Generic placeholder image'
                                                }}
                                            />

                                            <Media body className="align-self-center m-t-10">
                                                <div>Airi Satou</div>
                                            </Media>
                                        </Col>
                                        <Col className="col m-t-10">
                                            <Image
                                                attrImage={{
                                                    className: 'rounded-circle img-30 me-3',
                                                    src: `${user1}`,
                                                    alt: 'Generic placeholder image'
                                                }}
                                            />

                                            <Media body className="align-self-center m-t-10">
                                                <div>Airi Satou</div>
                                            </Media>
                                        </Col>
                                        <Col className="col m-t-10">
                                            <Image
                                                attrImage={{
                                                    className: 'rounded-circle img-30 me-3',
                                                    src: `${user1}`,
                                                    alt: 'Generic placeholder image'
                                                }}
                                            />

                                            <Media body className="align-self-center m-t-10">
                                                <div>Airi Satou</div>
                                            </Media>
                                        </Col>
                                        <Col className="col m-t-10">
                                            <Image
                                                attrImage={{
                                                    className: 'rounded-circle img-30 me-3',
                                                    src: `${user1}`,
                                                    alt: 'Generic placeholder image'
                                                }}
                                            />

                                            <Media body className="align-self-center m-t-10">
                                                <div>Airi Satou</div>
                                            </Media>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="6">
                            <Card>
                                <CardBody>
                                    <Col>
                                        <H5>Not in yet today</H5>
                                    </Col>
                                    <Row>
                                        <Card
                                            style={{ backgroundColor: '#FFEFD5', height: '50px' }}
                                            className="m-t-10 justify-content-center"
                                        >
                                            <P>All employees are already in.</P>
                                        </Card>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <CustomCountCard title={'Employee On time today'} color={'#51BFCF'} count={7} />
                        <CustomCountCard title={'Late arrivals today'} color={'#C974BC'} count={3} />
                        <CustomCountCard title={'Work from Home/On Duty today'} color={'#96B31E'} count={6} />
                        <CustomCountCard title={'Remote Clock-ins today'} color={'#FBBF23'} count={5} />
                    </Row>
                </Col>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <Row>
                                    <div className="mainCardHeader">
                                        <div className="paddingTop">
                                            <p>Team time off calendar</p>
                                        </div>
                                    </div>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col md="4">
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
                                            <div onClick={() => handleDateChange('decrese')}>
                                                <FaLessThan style={{ marginRight: '10px' }} />
                                            </div>
                                            <p style={{ color: 'blue' }}>
                                                {startDate.slice(0, 2)} {moment(date).format('MMM')} -{' '}
                                                {lastDate.slice(0, 2)} {moment(date).format('MMM')}
                                            </p>{' '}
                                            <p style={{ color: 'blue' }}>{currentYear}</p>
                                            <FaGreaterThan
                                                style={{ marginLeft: '10px' }}
                                                onClick={() => handleDateChange('increase')}
                                            />
                                        </div>
                                    </Col>
                                    <Col md="8" style={{ overflow: 'scroll' }}>
                                        <div className="d-flex flex-direction-row">
                                            {daysInMonth?.map((item, i) => {
                                                return (
                                                    <div className="m-l-10" key={i}>
                                                        <P>{moment(item).format('dd')}</P>
                                                        <P>{moment(item).format('DD')}</P>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="d-flex flex-direction-row">
                                            {daysInMonth?.map((item, i) => {
                                                return (
                                                    <div className="m-l-10" key={i}>
                                                        <P>{moment(item).format('DD')}</P>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default Payroll;

const CustomCountCard = ({ count = 0, title = '', color = 'white' }) => {
    return (
        <Col md="3">
            <Card style={{ height: '90px' }}>
                <Row>
                    <Col md="2">
                        <div
                            className="m-l-10 m-t-10"
                            style={{
                                width: '5px',
                                height: '70px',
                                backgroundColor: color
                            }}
                        ></div>
                    </Col>
                    <Col md="10">
                        <Row>
                            <div className="m-t-10 font-weight-bold">{title}</div>
                            <div className="m-t-15">
                                <H3 className="m-t-10">{count}</H3>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </Col>
    );
};
