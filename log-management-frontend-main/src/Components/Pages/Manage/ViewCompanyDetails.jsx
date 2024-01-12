import React, { useState } from 'react';
//import {H5} from "../../../AbstractElements";
import { Button, Card, CardBody, CardFooter, CardHeader, TabContent, Table, TabPane, Nav, NavItem, NavLink, Col, Container,Label, Row } from 'reactstrap';
import { Breadcrumbs, H5} from '../../../AbstractElements';
import Select from 'react-select'
import { Hometxt, Profile, Contact } from '../../../Constant';
import { TabCardData } from '../../../Components/Common/Data/Bonus-ui';
import HeaderCard from '../../../Components/Common/Component/HeaderCard';
import { Hovertabledata } from '../../../Data/Table/bootstraptabledata';

 

const ViewCompanyDetails = () => {

    const [activeTab, setActiveTab] = useState('1');
    const showSiteDetails = () =>{
        document.getElementById("siteDetails").style.display="block";
        document.getElementById("siteTable").style.display="none";
      }
      const backToSiteDetails= () =>{
        document.getElementById("siteDetails").style.display="none";
        document.getElementById("siteTable").style.display="block";
      }
      const showContactDetails = () =>{
        document.getElementById("contactsTable").style.display="none";
        document.getElementById("contactDetails").style.display="block";
      }
      const backToContactsTable = () =>{
        document.getElementById("contactsTable").style.display="block";
        document.getElementById("contactDetails").style.display="none";
      }
      



    return (
<>
<Breadcrumbs
                mainTitle="Company Details"
                parent="Manage"
            //title="Contact Us"
            />
<Container fluid={true}>
<Row>
<Col md="12">
<Card>
<CardBody>
                                {TabCardData.map((item, i) =>
<Col lg="12" className='box-col-12 xl-100' key={i}>
<Card>
<HeaderCard title={''} />
<CardBody>
<div className="tabbed-card">
<Nav className={item.navClass}>
<NavItem>
<NavLink className={activeTab === '1' ? 'active' : ''} onClick={() => setActiveTab('1')}>
                                                                {item.homeIcon ? item.homeIcon : ''} Company Details
</NavLink>
</NavItem>
<NavItem>
<NavLink className={activeTab === '2' ? 'active' : ''} onClick={() => setActiveTab('2')}>
                                                                {item.glassIcon ? item.glassIcon : ''} Sites
</NavLink>
</NavItem>
<NavItem>
<NavLink className={activeTab === '3' ? 'active' : ''} onClick={() => setActiveTab('3')}>
                                                                {item.glassIcon ? item.glassIcon : ''} Contact
</NavLink>
</NavItem>
<NavItem>
<NavLink className={activeTab === '4' ? 'active' : ''} onClick={() => setActiveTab('4')}>
                                                                {item.homeIcon ? item.homeIcon : ''} Notes
</NavLink>
</NavItem>

 

 

                                                    </Nav>
<TabContent activeTab={activeTab}>
<TabPane tabId="1">
<Card>
<CardHeader>
<H5>
                                                                        Company Details
</H5>
</CardHeader>
<CardBody>
<Row>
<Col md="6">
<Label>
                                                                                Company
</Label>
<Label>
                                                                                { }
</Label>
</Col>
<Col md="6">
<Label>
                                                                                Email
</Label>
<Label>
                                                                                { }
</Label>
</Col>

 

 

                                                                        <Col md="6">
<Label>
                                                                                Phone
</Label>
<Label>
                                                                                { }
</Label>
</Col>
<Col md="6">
<Label>
                                                                                Website
</Label>
<Label>
                                                                                { }
</Label>
</Col>

 

                                                                        <Col md="6">
<Label>
                                                                                Type
</Label>
<Label>
                                                                                { }
</Label>
</Col>

 

                                                                        <Col md="6">
<Label>
                                                                                Date started
</Label>
<Label>
                                                                                { }
</Label>
</Col>

 

 

                                                                        <Col md="6">
<Label>
                                                                                Date Acquired
</Label>
<Label>
                                                                                { }
</Label>
</Col>

 

                                                                        <Col md="6">
<Label>
                                                                                Terraitory
</Label>
<Label>
                                                                                { }
</Label>
</Col>
</Row>
</CardBody>
</Card>
</TabPane>

 

                                                        <TabContent activeTab={activeTab}>
<TabPane tabId="2">
<Card>
<CardHeader>
<H5>
                                                                            Sites
</H5>
</CardHeader>
<CardBody>
<div id="siteTable" className='table-responsive'>
<Table hover={true} className='table-border-horizontal'>
<thead>
<tr>
<th scope='col'>Sr. No.</th>
<th scope='col'>Location</th>

 

<th scope='col'>View</th>
</tr>
</thead>
<tbody>
{Hovertabledata.map((item) => (
<tr>
<th scope='row'>{ }</th>
<td>{ }</td>
<td><Button color="success" onClick={showSiteDetails}>View</Button></td>
</tr>
  ))}
</tbody>
</Table>
</div>
<div id="siteDetails" style={{display:"none"}}>
<Row style={{ marginBottom: "1rem" }}>
<Col md="6">
<div>
<Label>
                              {"Name"}
</Label>
<Label>{ }</Label>
</div>
</Col>
<Col md="6">
<div>
<Label>
                              {"Phone"}
</Label>
<Label>{ }</Label>
</div>
</Col>

 

<Col md="6">
<div>
<Label>
       {"Fax"}
</Label>
<Label>{ }</Label>
</div>
</Col>

 

<Col md="6">
<div>
<Label>
       {"Address 1"}
</Label>
<Label>{ }</Label>
</div>
</Col>

 

<Col md="6">
<div>
<Label>
       {"Address 2"}
</Label>
<Label>{ }</Label>
</div>
</Col>

 

<Col md="6">
<div>
<Label>
       {"City"}
</Label>
<Label>{ }</Label>
</div>
</Col>

 

 

<Col md="6">
<div>
<Label>
       {"Postal Code"}
</Label>
<Label>{ }</Label>
</div>
</Col>

 

<Col md="6">
<div>
<Label>
       {"State"}
</Label>
<Label>{ }</Label>
</div>
</Col>

 

<Col md="6">
<div>
<Label>
       {"Country"}
</Label>
<Label>{ }</Label>
</div>
</Col>

 

</Row>

 

 

<div>
<Button onClick={backToSiteDetails} color="danger">
                        Back
</Button>
</div>
</div>
</CardBody>

</Card>
</TabPane>

 

                                                        </TabContent>

 

                                                        <TabContent activeTab={activeTab}>
<TabPane tabId="3">
<Card>
<CardHeader>
<H5>
                                                                            Contact Details
</H5>
</CardHeader>
<CardBody>
<div id="contactsTable" className='table-responsive'>
<Table hover={true} className='table-border-horizontal'>
<thead>
<tr>
<th scope='col'>Sr. No.</th>
<th scope='col'>Name</th>
<th scope='col'>Email</th>
<th scope='col'>View</th>
</tr>
</thead>
<tbody>
    {Hovertabledata.map((item) => (
<tr>
<th scope='row'>{ }</th>
<td>{ }</td>
<td>{ }</td>

 

<td><Button color="success" onClick={showContactDetails}>View</Button></td>
</tr>

 

 

   ))}
</tbody>
</Table>
</div>
<div id="contactDetails" style={{display:"none"}}>
<Row style={{ marginBottom: "1rem" }}>
<Col md="6">
<div>
<Label>
                              {"First Name"}
</Label>
<Label>{ }</Label>
</div>
</Col>
<Col md="6">
<div>
<Label>
                              {"Last Name"}
</Label>
<Label>{ }</Label>
</div>
</Col>
</Row>
<Row style={{ marginBottom: "1rem" }}>
<Col md="6">
<div>
<Label>
                              {"Role"}
</Label>
<Label>{ }</Label>
</div>
</Col>
<Col md="6">
<div>
<Label>
                              {"Department"}
</Label>
<Label>{ }</Label>
</div>
</Col>
</Row>
<Row style={{ marginBottom: "1rem" }}>
<Col md="6">
<div>
<Label>
                              {"Email"}
</Label>
<Label>{ }</Label>
</div>
</Col>
<Col md="6">
<div>
<Label>
                              {"Phone"}
</Label>
<Label>{ }</Label>
</div>
</Col>
</Row>

<div>
<Button onClick={backToContactsTable} color="danger">
                        Back
</Button>
</div>
</div>
</CardBody>          


</Card>
</TabPane>
</TabContent>
<TabContent activeTab={activeTab}>
<TabPane tabId="4">
<Card>
<CardHeader>
<H5>
                                                                            Note
</H5>
</CardHeader>
<CardBody>
<Row>
<Col md="6">
<Label>
                                                                                    Note
</Label>
<Label>
                                                                                    { }
</Label>
</Col>


 

                                                                        </Row>
</CardBody>
</Card>
</TabPane>

 

 

                                                        </TabContent>

 

 

                                                    </TabContent>
</div>
</CardBody>
</Card>
</Col>
                                )}
</CardBody>

 

                            <CardFooter>
<div className='d-flex justify-content-end' style={{ gap: "1rem" }}>
<Button color="danger">
                                        Cancel
</Button>
<Button color="success" type="submit">
                                        View
</Button>
</div>

 

                            </CardFooter>
</Card>
</Col>
</Row>
</Container>
</>
    )
}
export default ViewCompanyDetails;