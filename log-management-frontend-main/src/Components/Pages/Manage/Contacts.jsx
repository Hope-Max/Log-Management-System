import React, { useEffect, useState } from "react";
import { Col, Card, CardHeader, CardBody, CardFooter, Input, Row } from 'reactstrap';
import { Breadcrumbs, Btn } from '../../../AbstractElements';
import DataTable from "react-data-table-component";
import { SampleContacts } from "./Samplecontacts";
import { Link } from "react-router-dom";

const Contacts = () => {    

    const [contactName, setContactName] = useState();
    const [searchData, setSearchData] = useState(SampleContacts);

    const handleChange = (event) => {
        setContactName(event.target.value);
    }

    useEffect(() => {
        showSearchData();
    });

    const showSearchData = () => {
        if (SampleContacts.find((check) => check.firstName.toLowerCase().includes(contactName))) {
            setSearchData(SampleContacts.filter((item) => item.firstName.toLowerCase().includes(contactName)));
        }
        else if (SampleContacts.find((check) => check.lastName.toLowerCase().includes(contactName))) {
            setSearchData(SampleContacts.filter((item) => item.lastName.toLowerCase().includes(contactName)));
        }
    }

    const columns = [
        { name: "First Name", selector: "firstName", sortable: "true" },
        { name: "Last Name", selector: "lastName", sortable: "true" },
        { name: "Role", selector: "role", sortable: "true" },
        { name: "Status", selector: "status", sortable: "true" },
        { name: "Email", selector: "email", sortable: "true" },
        { name: "Phone", selector: "phone", sortable: "true" },
        {
            name: "Action", cell: (item) => {
                return (
                    <>
                        <Link to={`/manage/view-contact-details/${item?.id}`}>
                            <span className="m-l-15" style={{ cursor: "pointer" }}>
                                <i className="icofont icofont-ui-edit"></i>
                            </span>
                        </Link>
                    </>
                );
            },
        },
    ];
    return (
        <>
            <Breadcrumbs parent="Manage" />
            <Col sm='12'>
                <Card>
                    <CardHeader>
                        <div class="row">
                            <div class="col-sm-8 xl-50">
                                <h4 class="mb-0">List of Contacts</h4>
                            </div>
                            <div class="btn-middle text-end col-sm-4 xl-50">
                                <Link to={"/manage/create-contact"}>
                                    <Btn
                                        attrBtn={{
                                            color: "primary",
                                            className: "mb-0 mt-0 text-center"
                                        }}
                                    >
                                        {"Add Contact"}
                                    </Btn>
                                </Link>
                            </div></div>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md='12'>
                                <Input type='text' name="" placeholder='Search by Name' onChange={handleChange} />
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

export default Contacts;