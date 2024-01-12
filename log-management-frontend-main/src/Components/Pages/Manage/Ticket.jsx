import React, { useEffect, useState } from "react";
import { Col, Card, CardHeader, CardBody, CardFooter, Input, Row } from 'reactstrap';
import { Breadcrumbs, Btn } from '../../../AbstractElements';
import Select from "react-select";
import { SampleData } from "./SampleData";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

const Ticket = () => {


    const [ticketId, setTicketId] = useState();
    const [ticketStatus, setTicketStatus] = useState("Select..");
    const [ticketPriority, setTicketPriority] = useState("Select..");
    const [company, setComapny] = useState();
    const [searchData, setSearchData] = useState(SampleData);
    const [filterBy, setFilterBy] = useState("Filter By..");
    const [inputPlaceholder, setInputPlaceholder] = useState("Search by Ticket Id");
    const [options, setOptions] = useState();
    const [searchValue, setSearchValue] = useState(ticketId);
    const [textDisplay, setTextDisplay] = useState("block");
    const [selectDisplay, setSelectDisplay] = useState("none");

    const handleChange = (event) => {
        if (filterBy == "Id" || filterBy == "Filter By..") {
            setTicketId(event.target.value);
        }
        else if (filterBy == "Status") {
            setTicketStatus(event.value);
        }
        else if (filterBy == "Priority") {
            setTicketPriority(event.value);
        }
        else if (filterBy == "Company") {
            setComapny(event.target.value);
        }
    }


    const filterChange = (event) => {
        setFilterBy(event.value);


    }

    const columns = [
        { name: "Ticket Id", selector: "id", sortable: "true" },
        { name: "Status", selector: "status", sortable: "true" },
        { name: "Priority", selector: "priority", sortable: "true" },
        { name: "Assigned To", selector: "assigned_to", sortable: "true" },
        { name: "Type of the Ticket", selector: "ticket_case", sortable: "true" },
        { name: "Company", selector: "company", sortable: "true" },
        {
            name: "Action", cell: (item) => {
                return (
                    <>
                        <Link to={`/manage/view-ticket-details/${item?.id}`}>
                            <span className="m-l-15" style={{ cursor: "pointer" }}>
                                <i className="icofont icofont-ui-edit"></i>
                            </span>
                        </Link>
                    </>
                );
            },
        },
    ];


    const showSearchData = (searchValue) => {
        if (searchValue === ticketId) {

            if (SampleData.find((check) => check.id.toLowerCase().includes(ticketId))) {
                setSearchData(SampleData.filter((item) => item.id.toLowerCase().includes(ticketId)));
            }
        }
        if (searchValue === ticketStatus) {
            if (SampleData.find(check => check.status === ticketStatus)) {
                setSearchData(SampleData.filter(item => item.status === ticketStatus));
            }
        }
        if (searchValue === ticketPriority) {
            if (SampleData.find(check => check.priority === ticketPriority)) {
                setSearchData(SampleData.filter(item => item.priority === ticketPriority));
            }
        }
        if (searchValue === company) {
            if (SampleData.filter((item) => item.company.toLowerCase().includes(company))) {
                setSearchData(SampleData.filter((item) => item.company.toLowerCase().includes(company)
                ));
            }
        }

    }

    const showshowFilterBy = () => {
        if (filterBy == "Id" || filterBy == "Filter By..") {
            setInputPlaceholder('Search by Ticket Id');
            setTextDisplay("block");
            setSelectDisplay("none");
            setSearchValue(ticketId);
            setSearchData(SampleData);
        }
        else if (filterBy == "Status") {
            setOptions([
                {
                    label: 'Select..',
                    value: 'Select..'
                },
                {
                    label: 'Open',
                    value: 'Open'
                },
                {
                    label: 'In Progress',
                    value: 'In Progress'
                },
                {
                    label: 'Closed',
                    value: 'Closed'
                },
            ]);
            setSearchValue(ticketStatus);
            setTextDisplay("none");
            setSelectDisplay("block");
            setSearchData(SampleData);
        }
        else if (filterBy == "Priority") {
            setOptions([
                {
                    label: 'Select..',
                    value: 'Select..'
                },
                {
                    label: 'Low',
                    value: 'Low'
                },
                {
                    label: 'Medium',
                    value: 'Medium'
                },
                {
                    label: 'High',
                    value: 'High'
                },
            ]);
            setSearchValue(ticketPriority);
            setTextDisplay("none");
            setSelectDisplay("block");
            setSearchData(SampleData);
        }
        else if (filterBy == "Company") {
            setInputPlaceholder('Search by Company');
            setTextDisplay("block");
            setSelectDisplay("none");
            setSearchValue(company);
            setSearchData(SampleData);
        }
    }


    useEffect(() => {
        showshowFilterBy();
    });

    useEffect(() => {
        showSearchData(searchValue);
    });

    return (
        <>
            <Breadcrumbs parent="Manage" />
            <Col sm='12'>
                <Card>
                    <CardHeader>
                        <div class="row">
                            <div class="col-sm-8 xl-50">
                                <h4 class="mb-0">List of Tickets</h4>
                            </div>
                            <div class="btn-middle text-end col-sm-4 xl-50">
                                <Link to={"/manage/create-ticket"}>
                                    <Btn
                                        attrBtn={{
                                            color: "primary",
                                            className: "mb-0 mt-0 text-center"
                                        }}
                                    >
                                        {"Create New Ticket"}
                                    </Btn>
                                </Link>
                            </div></div>
                    </CardHeader>

                    <CardBody>
                        <Row>
                            <Col md='6'>
                                <Select options={[{ label: "Filter By..", value: "Filter By.." }, { label: "Id", value: "Id" }, { label: "Status", value: "Status" }, { label: "Priority", value: "Priority" }, { label: "Company", value: "Company" }]} value={{ label: filterBy, value: filterBy }} onChange={filterChange} />
                            </Col>
                            <Col md='6' style={{ display: textDisplay }}>
                                <Input type='text' name="" placeholder={inputPlaceholder} onChange={handleChange} />
                            </Col>
                            <Col md='6' style={{ display: selectDisplay }}>
                                <Select options={options} type="select" onChange={handleChange} value={{ label: searchValue, value: searchValue }} />
                            </Col>
                        </Row>
                    </CardBody>

                    <CardFooter>
                        <DataTable data={searchData} columns={columns} />
                    </CardFooter>
                </Card>
            </Col>
        </>
    )
}

export default Ticket;