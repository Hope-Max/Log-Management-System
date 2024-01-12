import React from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { Breadcrumbs, H6 } from "../../../AbstractElements";
import Select from "react-select";
import { Option } from "../../../Constant";
import HeaderCard from "../../Common/Component/HeaderCard";

const CreateContact = () => {
    return (
        <>
            <Breadcrumbs title="Contact" parent="Manage" />
            <Container fluid={true}>
                <Card>
                    <HeaderCard title='Add New Contact Details' />
                    <Form className="form theme-form">
                        <CardBody>
                            <Row>
                                <Col>
                                    <FormGroup className="row">
                                        <Label className="col-sm-3 col-form-label">Company*</Label>
                                        <Col sm="9">
                                            <Select options={[]} type="select" name="" required />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <Label className="col-sm-3 col-form-label">First Name*</Label>
                                        <Col sm="9">
                                            <Input className="form-control" type="text" name='' required />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <Label className="col-sm-3 col-form-label">Last Name*</Label>
                                        <Col sm="9">
                                            <Input className="form-control" type="text" name='' required />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup className="row">
                                        <Label className="col-sm-3 col-form-label">Title</Label>
                                        <Col sm="9">
                                            <Input className="form-control" type="text" name='' />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup tag="fieldset">
                                        <Row>
                                            <Label className="col-form-label col-sm-3 pt-0">Status</Label>
                                            <Col sm="9">
                                                <div className="radio radio-primary ms-2">
                                                    <Input type="radio" name="radio1" id="radio1" value="option1" />
                                                    <Label for="radio1">Active</Label>
                                                </div>
                                                <div className="radio radio-primary ms-2">
                                                    <Input type="radio" name="radio1" id="radio2" value="option1" />
                                                    <Label for="radio2">Inactive</Label>
                                                </div>

                                            </Col>
                                        </Row>
                                    </FormGroup>

                                    <FormGroup className="row">
                                        <Label className="col-sm-3 col-form-label">Phone</Label>
                                        <Col sm="9">
                                            <Input className="form-control" type="tel" name='' />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <Label className="col-sm-3 col-form-label">Email</Label>
                                        <Col sm="9">
                                            <Input className="form-control" type="email" name='' />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <Label className="col-sm-3 col-form-label">Fax</Label>
                                        <Col sm="9">
                                            <Input className="form-control" type="tel" name='' />
                                        </Col>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter>
                            <div className='d-flex justify-content-end' style={{ gap: "1rem" }}>
                                <Button color="info" type="submit">
                                    Add Contact
                                </Button>
                                <Button color="danger">
                                    Cancel
                                </Button>
                            </div>
                        </CardFooter>
                    </Form>

                </Card>

            </Container>
        </>
    )
}

export default CreateContact;
