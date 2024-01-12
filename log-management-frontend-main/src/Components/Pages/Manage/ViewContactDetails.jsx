import React, { useState } from "react";
import { Breadcrumbs, H6, H5, P } from "../../../AbstractElements";
import { Container, Col, Row, Card, CardBody, CardHeader, Nav, NavItem, NavLink, TabContent, TabPane, Table, Form, FormGroup, Input, Label, Button} from "reactstrap";
import { TabCardData } from '../../Common/Data/Bonus-ui';
import HeaderCard from '../../Common/Component/HeaderCard';
import { Hovertabledata } from '../../../Data/Table/bootstraptabledata';

const ViewContactDetails = () => {
    return(
        <>
        <Breadcrumbs mainTitle="Contact Details" parent="Manage"/>
        <Container fluid={true}>
            <Row>
                <Col md="12">
                        <Card>
                            <CardHeader>
                                <H6>
                                    View Contact Details
                                </H6>
                            </CardHeader>
                            <CardBody>
                            <Row>
                                    <Col md="12">
                                            <Label>
                                                {"Company"}
                                            </Label>
                                            <Input type='text' name='' />
                                    </Col>
                                </Row>
                                <Row>
                                <Col md="6">
                                            <Label>
                                                {"First Name"}
                                            </Label>
                                            <Input type='text' name='' />
                                    </Col>
                                    <Col md="6">
                                            <Label>
                                                {"Last Name"}
                                            </Label>
                                            <Input type='text' name='' />
                                    </Col>
                                </Row>
                                <Row>
                                <Col md="6">
                                            <Label>
                                                {"Title"}
                                            </Label>
                                            <Input type='text' name='' />
                                    </Col>
                                    
                                <Col md="6">
                                <Col md="6">
                                            <Label>
                                                {"Status"}
                                            </Label>
                                            <Input type='text' name='' />
                                    </Col>
                                    </Col>
                                </Row>
                                
                                <Row>
                                <Col md="6">
                                            <Label>
                                                {"Phone"}
                                            </Label>
                                            <Input type='text' name='' />
                                    </Col>
                                    <Col md="6">
                                            <Label>
                                                {"Email"}
                                            </Label>
                                            <Input type='text' name='' />
                                    </Col>
                                    <Col md="6">
                                            <Label>
                                                {"Fax"}
                                            </Label>
                                            <Input type='text' name='' />
                                    </Col>
                                </Row>
                               
                                <Row>
                                <Col md="6">
                                            <Label>
                                                {"Department"}
                                            </Label>
                                            <Input type='text' name='' />
                                    </Col>
                                    <Col md="6">
                                            <Label>
                                                {"Role"}
                                            </Label>
                                            <Input type='text' name='' />
                                    </Col>
                                </Row>
                            </CardBody>
                    </Card>
            </Col>
        </Row>
        </Container>
        </>
    )
}

export default ViewContactDetails;