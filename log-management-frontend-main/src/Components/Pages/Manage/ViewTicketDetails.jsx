import React, { useState } from "react";
import { Breadcrumbs, H6, H5, P } from "../../../AbstractElements";
import { Col, Row, Card, CardBody, CardHeader, Nav, NavItem, NavLink, TabContent, TabPane, Table, Form, FormGroup, Input, Label, Button } from "reactstrap";
import { TabCardData } from '../../Common/Data/Bonus-ui';
import HeaderCard from '../../Common/Component/HeaderCard';
import { Hovertabledata } from '../../../Data/Table/bootstraptabledata';
import { SampleData } from "./SampleData";
import { useParams } from "react-router";
const ViewTicketDetails = () => {

  const { id } = useParams();
  const [BasicLineTab, setBasicLineTab] = useState('1');
  const [activeTab, setActiveTab] = useState('1');

  const showTimeEntryDetails = () => {
    document.getElementById("timeEntryDetails").style.display = "block";
    document.getElementById("timeEntryTable").style.display = "none";
  }
  const backToTimeEntryTable = () => {
    document.getElementById("timeEntryDetails").style.display = "none";
    document.getElementById("timeEntryTable").style.display = "block";
  }
  return (
    <>
      <Breadcrumbs parent="Manage" title="Ticket" />
      <Row>
        <Col sm='12' xl='6' className='xl-100'>
          <Card>
            <CardHeader>
              <H5>Ticket Details</H5>
            </CardHeader>
            <CardBody>
              <Nav className='border-tab' tabs>
                <NavItem>
                  <NavLink href='#javascript' className={BasicLineTab === '1' ? 'active' : ''} onClick={() => setBasicLineTab('1')}>
                    Company Details
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href='#javascript' className={BasicLineTab === '2' ? 'active' : ''} onClick={() => setBasicLineTab('2')}>
                    Ticket Information
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href='#javascript' className={BasicLineTab === '3' ? 'active' : ''} onClick={() => setBasicLineTab('3')}>
                    Notes
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href='#javascript' className={BasicLineTab === '4' ? 'active' : ''} onClick={() => setBasicLineTab('4')}>
                    Time Analysis
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={BasicLineTab}>
                <TabPane className='fade show' tabId='1'>
                  <Card>
                    <CardHeader>
                      <H6>
                        Company Details
                      </H6>
                    </CardHeader>
                    <CardBody>
                      <Row style={{ marginBottom: "1rem" }}>
                        <Col md="6">
                          <Label>
                            {"Company"}
                          </Label>
                          <Label></Label>
                        </Col>
                        <Col md="6">
                          <Label>
                            {"Location"}
                          </Label>
                          <Label>{ }</Label>
                        </Col>
                      </Row>
                      <Row style={{ marginBottom: "1rem" }}>
                        <Col md="6">
                          <Label>
                            {"Contact Person"}
                          </Label>
                          <Label>{ }</Label>
                        </Col>
                        <Col md="6">
                          <Label>
                            {"Email"}
                          </Label>
                          <Label>{ }</Label>
                        </Col>
                      </Row>
                      <Row style={{ marginBottom: "1rem" }}>
                        <Col md="6">
                          <Label>
                            {"Address"}
                          </Label>
                          <Label>{ }</Label>
                        </Col>
                        <Col md="6">
                          <Label>
                            {"City"}
                          </Label>
                          <Label>{ }</Label>
                        </Col>
                      </Row>
                      <Row style={{ marginBottom: "1rem" }}>
                        <Col md="6">
                          <Label>
                            {"Country"}
                          </Label>
                          <Label>{ }</Label>
                        </Col>
                        <Col md="6">
                          <Label>
                            {"State/Province"}
                          </Label>
                          <Label>{ }</Label>
                        </Col>
                      </Row>
                      <Row style={{ marginBottom: "1rem" }}>
                        <Col md="6">
                          <Label>
                            {"Postal Code"}
                          </Label>
                          <Label>{ }</Label>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </TabPane>
                <TabPane tabId='2'>
                  <Card>
                    <CardHeader>
                      <H6>
                        Ticket Information
                      </H6>
                    </CardHeader>
                    <CardBody>
                      <Row style={{ marginBottom: "1rem" }}>
                        <Col md="6">
                          <div>
                            <Label>
                              {"Board"}
                            </Label>
                            <Label>{ }</Label>
                          </div>
                        </Col>
                        <Col md="6">
                          <div>
                            <Label>
                              {"Assigned To"}
                            </Label>
                            <Label>{ }</Label>
                          </div>
                        </Col>
                      </Row>
                      <Row style={{ marginBottom: "1rem" }}>
                        <Col md="6">
                          <div>
                            <Label>
                              {"Type of the Ticket"}
                            </Label>
                            <Label>{ }</Label>
                          </div>
                        </Col>
                        <Col md="6">
                          <div>
                            <Label>
                              {"Sub Type"}
                            </Label>
                            <Label>{ }</Label>
                          </div>
                        </Col>
                      </Row>
                      <Row style={{ marginBottom: "1rem" }}>
                        <Col md="6">
                          <div>
                            <Label>
                              {"Start Date"}
                            </Label>
                            <Label>{ }</Label>
                          </div>
                        </Col>
                        <Col md="6">
                          <div>
                            <Label>
                              {"End Date"}
                            </Label>
                            <Label>{ }</Label>
                          </div>
                        </Col>
                      </Row>
                      <Row style={{ marginBottom: "1rem" }}>
                        <Col md="6">
                          <div>
                            <Label>
                              {"Status"}
                            </Label>
                            <Label>{ }</Label>
                          </div>
                        </Col>
                        <Col md="6">
                          <div>
                            <Label>
                              {"Priority"}
                            </Label>
                            <Label>{ }</Label>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </TabPane>
                <TabPane tabId='3'>
                  <Row>
                    <Col md="12">
                      {TabCardData.map((item, i) =>
                        <Col lg="12" className='box-col-12 xl-100' xl="12" key={i}>
                          <Card>
                            <HeaderCard title="Notes" />
                            <CardBody>
                              <div className="tabbed-card">
                                <Nav className={item.navClass}>
                                  <NavItem>
                                    <NavLink className={activeTab === '1' ? 'active' : ''} onClick={() => setActiveTab('1')}>
                                      Discussion
                                    </NavLink>
                                  </NavItem>
                                  <NavItem>
                                    <NavLink className={activeTab === '2' ? 'active' : ''} onClick={() => setActiveTab('2')}>
                                      Internal
                                    </NavLink>
                                  </NavItem>
                                  <NavItem>
                                    <NavLink className={activeTab === '3' ? 'active' : ''} onClick={() => setActiveTab('3')}>
                                      Resolution
                                    </NavLink>
                                  </NavItem>
                                </Nav>
                                <TabContent activeTab={activeTab}>
                                  <TabPane tabId="1">
                                    <P attrPara={{ className: 'mb-0' }} >Notes for Discussion</P>
                                  </TabPane>
                                  <TabPane tabId="2">
                                    <P attrPara={{ className: 'mb-0' }}>Notes for Internal</P>
                                  </TabPane>
                                  <TabPane tabId="3">
                                    <P attrPara={{ className: 'mb-0' }}>Notes for Resolution</P>
                                  </TabPane>
                                </TabContent>
                              </div>
                            </CardBody>
                          </Card>
                        </Col>
                      )}
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId='4'>
                  <Card>
                    <CardHeader>
                      <H6>
                        Time
                      </H6>
                    </CardHeader>
                    <CardBody>
                      <div className='table-responsive'>
                        <Table id='timeEntryTable' className='table-border-horizontal'>
                          <thead>
                            <tr>
                              <th scope='col'>Time Added By</th>
                              <th scope='col'>Start Time</th>
                              <th scope='col'>End Time</th>
                              <th scope='col'>Actual Hours</th>
                              <th scope='col'>Work Type</th>
                              <th scope='col'>Notes Added To</th>
                              <th scope='col'>View</th>
                            </tr>
                          </thead>
                          <tbody>
                            {SampleData.map((item) => (
                              <tr>
                                <th scope='row'>{ }</th>
                                <td></td>
                                <td>{ }</td>
                                <td>{ }</td>
                                <td>{ }</td>
                                <td>{ }</td>
                                <td><Button color="success" onClick={showTimeEntryDetails}>View</Button></td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                      <div id="timeEntryDetails" style={{ display: "none" }}>
                        <Row style={{ marginBottom: "1rem" }}>
                        </Row>
                          <div>
                          <Button onClick={backToTimeEntryTable} color="danger">
                            Back
                          </Button>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ViewTicketDetails;