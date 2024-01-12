import React, { useEffect, useState } from "react";
import { Col, Card, CardHeader, CardBody, CardFooter, Input, Row } from 'reactstrap';
import { Breadcrumbs, Btn } from '../../../AbstractElements';
import DataTable from "react-data-table-component";
import { SampleCompany } from "./SampleCompany";
import { Link } from "react-router-dom";

const Organization = () => {

    const [companyName, setCompanyName] = useState();
    const [searchData, setSearchData] = useState(SampleCompany);

    const handleChange = (event) => {
        setCompanyName(event.target.value);
    }

    useEffect(() => {
        showSearchData();
    });

    const showSearchData = () => {
        if (SampleCompany.find((check) => check.name.toLowerCase().includes(companyName))) {
            setSearchData(SampleCompany.filter((item) => item.name.toLowerCase().includes(companyName)));
        }
    }

    const columns = [
        { name: "Company", selector: "name", sortable: "true" },
        { name: "Type", selector: "type", sortable: "true" },
        { name: "Site", selector: "site", sortable: "true" },
        { name: "Address", selector: "address", sortable: "true" },
        { name: "City", selector: "city", sortable: "true" },
        { name: "State", selector: "province", sortable: "true" },
        { name: "Country", selector: "country", sortable: "true" },
        {
            name: "Action", cell: (item) => {
                return (
                    <>
                        <Link to={`/manage/view-company-details/${item?.id}`}>
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
                                <h4 class="mb-0">List of Companies</h4>
                            </div>
                            <div class="btn-middle text-end col-sm-4 xl-50">
                                <Link to={"/manage/add-organization"}>
                                    <Btn
                                        attrBtn={{
                                            color: "primary",
                                            className: "mb-0 mt-0 text-center"
                                        }}
                                    >
                                        {"Add Company"}
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

export default Organization;