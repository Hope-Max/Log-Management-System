import React from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { Breadcrumbs, H6 } from "../../../AbstractElements";
import Select from "react-select";
import FooterCard from "../../Forms/FormControl/Common/FooterCard";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Radios } from '../../../Constant';

const AddOrganization = () => {
    return (
        <>
            <Breadcrumbs title='Organization' parent="Manage" />
            <Container fluid={true}>
                <Card>
                    <HeaderCard title='Add New Company Details' />
                    <Form className="form theme-form">
                        <CardBody>
                            <Row>
                                <Col>
                                    <FormGroup className="row">
                                        <Label className="col-sm-3 col-form-label">Company Id*</Label>
                                        <Col sm="9">
                                            <Input className="form-control" type="text" name='' required />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <Label className="col-sm-3 col-form-label">Company Name*</Label>
                                        <Col sm="9">
                                            <Input className="form-control" type="text" name='' required />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <Label className="col-sm-3 col-form-label">Site</Label>
                                        <Col sm="9">
                                            <Input className="form-control" type="text" name='' />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <Label className="col-sm-3 col-form-label">Email</Label>
                                        <Col sm="9">
                                            <Input className="form-control" type="email" name='' />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <Label className="col-sm-3 col-form-label">Phone</Label>
                                        <Col sm="9">
                                            <Input className="form-control" type="tel" name='' />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <Label className="col-sm-3 col-form-label">Fax</Label>
                                        <Col sm="9">
                                            <Input className="form-control" type="tel" name='' />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <Label className="col-sm-3 col-form-label">Address</Label>
                                        <Col sm="9">
                                            <textarea className="form-control" rows="5" cols="5"></textarea>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <Label className="col-sm-3 col-form-label">City</Label>
                                        <Col sm="9">
                                            <Select options={[]} type="select" name="" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <Label className="col-sm-3 col-form-label">Country</Label>
                                        <Col sm="9">
                                            <Select options={[]} type="select" name="" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <Label className="col-sm-3 col-form-label">State/Province</Label>
                                        <Col sm="9">
                                            <Select options={[]} type="select" name="" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <Label className="col-sm-3 col-form-label">Postal Code</Label>
                                        <Col sm="9">
                                            <Input className="form-control" type="text" name='' />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <Label className="col-sm-3 col-form-label">Website</Label>
                                        <Col sm="9">
                                            <Input className="form-control" type="text" name='' />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <Label className="col-sm-3 col-form-label">Date Started</Label>
                                        <Col sm="9">
                                            <Input className="form-control" type="date" name='' />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <Label className="col-sm-3 col-form-label">Date Acquired</Label>
                                        <Col sm="9">
                                            <Input className="form-control" type="date" name='' />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <Label className="col-sm-3 col-form-label">Type*</Label>
                                        <Col sm="9">
                                            <Select
                                                options={[{ label: "Client", value: "client" }, { label: "Vendor", value: "vendor" }]} type="select" name="" required
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup tag="fieldset">
                                        <Row>
                                            <Label className="col-form-label col-sm-3 pt-0">Is Partner</Label>
                                            <Col sm="9">
                                                <div className="radio radio-primary ms-2">
                                                    <Input type="radio" name="radio1" id="radio1" value="option1" />
                                                    <Label for="radio1">{Option} Yes</Label>
                                                </div>
                                                <div className="radio radio-primary ms-2">
                                                    <Input type="radio" name="radio1" id="radio2" value="option1" />
                                                    <Label for="radio2">{Option} No</Label>
                                                </div>

                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </CardBody>
                        <HeaderCard title='Add Primary Contact Details' />
                        <CardBody>
                            <Row>
                                <Col>
                                    <FormGroup className="row">
                                        <Label className="col-sm-3 col-form-label">First Name</Label>
                                        <Col sm="9">
                                            <Input className="form-control" type="text" name='' />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <Label className="col-sm-3 col-form-label">Last Name</Label>
                                        <Col sm="9">
                                            <Input className="form-control" type="text" name='' />
                                        </Col>
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
                                        <Label className="col-sm-3 col-form-label">Department</Label>
                                        <Col sm="9">
                                            <Select options={[]} type="select" name="" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <Label className="col-sm-3 col-form-label">Position</Label>
                                        <Col sm="9">
                                            <Select options={[]} type="select" name="" />
                                        </Col>
                                    </FormGroup>
                                 </Col>
                            </Row>
                        </CardBody>
                        <CardFooter>
                            <div className='d-flex justify-content-end' style={{ gap: "1rem" }}>
                                <Button color="info" type="submit">
                                    Add Company
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

export default AddOrganization;
