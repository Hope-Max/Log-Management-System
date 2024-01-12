import React from 'react';

//import {H5} from "../../../AbstractElements";

import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';

import { Breadcrumbs, H5 } from '../../../AbstractElements';

import Select from 'react-select'

const Location = () =>

{

  return (

 

    <>

 

      <Breadcrumbs

 

        mainTitle="location"

 

        parent="Support"

 

        title="Contact Us"

 

      />

 

      <Container fluid={true}>

        <Row>

          <Col>

            <Form className="theme-form">

              <Card>

                <CardHeader>

                  <H5>

                    Location

                  </H5>

                </CardHeader>

                <CardBody>

                  <Row>

                    <Col md="12">

                      <FormGroup className="form-group">

                        <Label className="col-sm-12 col-form-label text-start">

                          {"Company Name"}

                        </Label>

                        <Select

                          options={[]}

                          // className="form-input"

                           name="company_name"

                          // value={finalPayload.name}

                          type="select"

                          // onChange={handleOnChange}

                          required

                        />

                      </FormGroup>

 

                    </Col>

                    <Col md="6">

                      <FormGroup className="form-group">

                        <Label className="col-sm-12 col-form-label text-start">

                          {"Phone"}

                        </Label>

                        <Input

                          className="form-input"

                          name="phone"

                          // value={finalPayload.name}

                          type="text"

                          placeholder="Ex. +1-038-4894"

                          // onChange={handleOnChange}

                          required

                        />

                      </FormGroup>

                    </Col>

                    <Col md="6">

                      <FormGroup className="form-group">

                        <Label className="col-sm-12 col-form-label text-start">

                          {"Fax"}

                        </Label>

                        <Input

                          className="form-input"

                          name="fax"

                          // value={finalPayload.name}

                          type="text"

                          placeholder="Ex. 34687982789379"

                          // onChange={handleOnChange}

                          required

                        />

                      </FormGroup>

                    </Col>

                    <Col md="12">

                      <FormGroup className="form-group">

                        <Label className="col-sm-12 col-form-label text-start">

                          {"Address 1"}

                        </Label>

                        <Input

                          className="form-input"

                          name="fax"

                          // value={finalPayload.name}

                          type="text"

                          placeholder="Ex. 39379"

                          // onChange={handleOnChange}

                          required

                        />

                      </FormGroup>

                    </Col>

                    <Col md="12">

                      <FormGroup className="form-group">

                        <Label className="col-sm-12 col-form-label text-start">

                          {"ADdress 2"}

                        </Label>

                        <Input

                          className="form-input"

                          name="fax"

                          // value={finalPayload.name}

                          type="text"

                          placeholder="Ex. 3468"

                          // onChange={handleOnChange}

                          required

                        />

                      </FormGroup>

                    </Col>

                    <Col md="12">

                      <FormGroup className="form-group">

                        <Label className="col-sm-12 col-form-label text-start">

                          {"City"}

                        </Label>

                        <Input

                          className="form-input"

                          name="City"

                          // value={finalPayload.name}

                          type="text"

                          placeholder="Name"

                          // onChange={handleOnChange}

                          required

                        />

                      </FormGroup>

                    </Col>

                    <Col md="12">

                      <FormGroup className="form-group">

                        <Label className="col-sm-12 col-form-label text-start">

                          {"City"}

                        </Label>

                        <Input

                          className="form-input"

                          name="City"

                          // value={finalPayload.name}

                          type="text"

                          placeholder="Name"

                          // onChange={handleOnChange}

                          required

                        />

                      </FormGroup>

                    </Col>

                    <Col md="12">

                      <FormGroup className="form-group">

                        <Label className="col-sm-12 col-form-label text-start">

                          {"Postal Code"}

                        </Label>

                        <Input

                          className="form-input"

                          name="Postal Code"

                          // value={finalPayload.name}

                          type="text"

                          placeholder="Ex. L7B 5W8"

                          // onChange={handleOnChange}

                          required

                        />

                      </FormGroup>

                    </Col>

                    <Col md="12">

                      <FormGroup className="form-group">

                        <Label className="col-sm-12 col-form-label text-start">

                          {"State"}

                        </Label>

                        <Input

                          className="form-input"

                          name="State"

                          // value={finalPayload.name}

                          type="text"

                          placeholder="Name"

                          // onChange={handleOnChange}

                          required

                        />

                      </FormGroup>

                    </Col>

                    <Col md="12">

                      <FormGroup className="form-group">

                        <Label className="col-sm-12 col-form-label text-start">

                          {"Country"}

                        </Label>

                        <Input

                          className="form-input"

                          name="Country"

                          // value={finalPayload.name}

                          type="text"

                          placeholder="Name"

                          // onChange={handleOnChange}

                          required

                        />

                      </FormGroup>

                    </Col>

                  </Row>

                </CardBody>

                <CardFooter>

                  <div className='d-flex justify-content-end' style={{ gap: "1rem" }}>

                    <Button color="danger">

                      Cancel

                    </Button>

                    <Button color="success" type="submit">

                      Register

                    </Button>

                  </div>

                </CardFooter>

              </Card>

            </Form>

          </Col>

        </Row>

      </Container>

    </>

  )

}

export default Location;