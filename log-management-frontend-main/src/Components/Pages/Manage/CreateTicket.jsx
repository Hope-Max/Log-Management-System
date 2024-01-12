import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import { Breadcrumbs, H6, H5, H1, P } from "../../../AbstractElements";
import Select from "react-select";
import { TabCardData } from '../../Common/Data/Bonus-ui';
import HeaderCard from '../../Common/Component/HeaderCard';
import { CKEditorExample, None, SingleFileUpload, WarningColor } from '../../../Constant';
import CKEditors from 'react-ckeditor-component';
import Dropzone from 'react-dropzone-uploader';
import {  toast } from 'react-toastify';
import { emailTemplateForTickets } from "./EmailTemplateForTickets";
import { SampleContacts } from "./Samplecontacts";
import MultiSelect from "editable-creatable-multiselect";
import { SampleCompany } from "./SampleCompany";



const CreateTicket = () => {
    const [activeTab, setActiveTab] = useState('1');
const [contact,setcontact] = useState("");
    const [notes, setNotes] = useState([]);
    const [value, setValue] = useState();
    const [issue, setIssue] = useState();
    const [companyName, setCompanyName] = useState();
    const [contactList, setContactList] = useState([]);
    const addNewNote = () => {
        document.getElementById("addNote").style.display = "block";
    }

    const cancelNote = () => {
        document.getElementById("addNote").style.display = "none";
    }

    const cancelTicket = () => {
        window.location.href = "/manage/ticket";
    }

    const handleChange = (event) => {
        setValue(event.value);}

        const changeCompanyValue = (event) => {
            setCompanyName(event.value);}
            
            useEffect(() => {
                showContactList();
            },[companyName]);
            const showContactList = () => {
    
                let filteredData = SampleContacts.filter((item) => item.companyId === companyName);
                let contactPersonOptions = filteredData.map((item) => {
                    return {
                      label: item.firstName,
                      value: item.firstName
                    };
                  });
                setContactList(contactPersonOptions) ;
                let multiSelectOptions = filteredData.map((item) => {
                    return {
                      label: item.firstName,
                      value: item.email
                    };
                  });
                setSuggestions(multiSelectOptions);
                    
              
            }

        const textchange = (event) => {
            setIssue(event.target.value);}
       
        

        const [suggestions, setSuggestions] = useState([]);
          const [selectedList, setSelectedList] = useState([]);

    const [startTime, setStartTime] = useState(""); // State to store start time

    const [endTime, setEndTime] = useState(""); // State to store end time

    const [warningTab, setwarningTab] = useState('1');

    const captureCurrentTime = () => {
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const formattedTime = `${hours}:${minutes}`;
        document.getElementById("startTime").value = formattedTime;
        setStartTime(formattedTime); // Update state to store start time
    }

    const captureCurrentTime1 = () => {
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const formattedTime = `${hours}:${minutes}`;
        document.getElementById("endTime").value = formattedTime;
        setEndTime(formattedTime); // Update state to store end time
    }


    const calculateDuration = () => {
        if (startTime && endTime) {
            const start = parseTime(startTime);
            const end = parseTime(endTime);
            const duration = calculateDurationMinutes(start, end);
            return `Duration: ${duration} minutes`;
        }
        return "";
    };

    const parseTime = (time) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    };

    const calculateDurationMinutes = (start, end) => {
        return end - start;
    };

    const [content, setContent] = useState('content');
    const onChange = (evt) => {
        const newContent = evt.editor.getData();
        setContent(newContent);
    };

    const getUploadParams = ({ meta }) => {
        return { url: 'https://httpbin.org/post' };
    };

    const handleChangeStatus = ({ meta, file }, status) => {
    };

    const handleSubmit = (files, allFiles) => {
        allFiles.forEach(f => f.remove());
        toast.success('Dropzone successfully submitted !');
    };

    return (
        <>
            <Breadcrumbs title='Ticket' parent="Manage" />
            <Container fluid={true}>
                <Form className="form theme-form">
                    <Card>
                   
                        <HeaderCard title='Add Company Details' />
                        <CardBody>
                            <Row>
                                <Col>
                                    <FormGroup className="row">
                                        <Label className="col-sm-3 col-form-label">Company*</Label>
                                        <Col sm="9">
                                            <Select options={[{label:"Codefusion",value:"Codefusion"},{label:"Company ABC",value:"Company ABC"}]} type="select" name=""  onChange={changeCompanyValue} value={{ label: companyName, value: companyName }}  required/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <Label className="col-sm-3 col-form-label">Location*</Label>
                                        <Col sm="9">
                                            <Select options={[]} type="select" name="" required />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <Label className="col-sm-3 col-form-label">Contact Person*</Label>
                                        <Col sm="9">
                                            <Select options={contactList} type="select" name="" required  onChange={handleChange} value={{label:value,value:value}}/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <Label className="col-sm-3 col-form-label">Email</Label>
                                        <Col sm="9">
                                            <Input className="form-control" type="email" name='' />
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
                                </Col>
                            </Row>
                        </CardBody>

                        <HeaderCard title='Ticket Details' />
                        <CardBody>
                            <Row>
                                <Col>
                                <FormGroup className="row">
                                        <Label className="col-sm-3 col-form-label">Issue</Label>
                                        <Col sm="9">
                                            <Input className="form-control" type="text" name=''  onChange={textchange} required/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <Label className="col-sm-3 col-form-label">Board*</Label>
                                        <Col sm="9">
                                            <Select options={[]} type="select" name="" required />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <Label className="col-sm-3 col-form-label">Assigned To*</Label>
                                        <Col sm="9">
                                            <Select options={[]} type="select" name="" required />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <Label className="col-sm-3 col-form-label">Type of the Ticket</Label>
                                        <Col sm="9">
                                            <Select options={[]} type="select" name="" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <Label className="col-sm-3 col-form-label">Sub Type</Label>
                                        <Col sm="9">
                                            <Select options={[]} type="select" name="" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <Label className="col-sm-3 col-form-label">Status</Label>
                                        <Col sm="9">
                                            <Select options={[]} type="select" name="" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <Label className="col-sm-3 col-form-label">Priority</Label>
                                        <Col sm="9">
                                            <Select options={[]} type="select" name="" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <Label className="col-sm-3 col-form-label">Start Date</Label>
                                        <Col sm="9">
                                            <Input className="form-control" type="date" name='' />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup className="row">
                                        <Label className="col-sm-3 col-form-label">End Date</Label>
                                        <Col sm="9">
                                            <Input className="form-control" type="date" name='' />
                                        </Col>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </CardBody>

                        <CardHeader>
                            <div class="row">
                                <div class="col-sm-8 xl-50">
                                    <h4 class="mb-0">Notes</h4>
                                </div>
                                <div class="btn-middle text-end col-sm-4 xl-50">
                                    <button onClick={addNewNote} class="btn-mail text-center mb-0 mt-0 btn btn-success">Add Notes</button></div></div>
                        </CardHeader>

                        <Col sm='12' xl='12' className='xl-100'>
                            <CardBody>
                                <Form id='addNote' style={{ display: 'none' }} className="form theme-form">
                                    <Card>
                                        <HeaderCard title='New Note' />

                                        <CardBody>
                                            <Row>
                                                <Col>
                                                    <FormGroup className="row">
                                                        <Label className="col-sm-3 col-form-label">Notes Added By</Label>
                                                        <Col sm="9">
                                                            <Select options={[]} type="select" name="" />
                                                        </Col>
                                                    </FormGroup>
                                                    <FormGroup className="row">
                                                        <Label className="col-sm-3 col-form-label">Board</Label>
                                                        <Col sm="9">
                                                            <Select options={[]} type="select" name="" />
                                                        </Col>
                                                    </FormGroup>





                                                    <FormGroup className="row">
                                                        <Label className="col-sm-3 col-form-label">Date</Label>
                                                        <Col sm="9">
                                                            <Input className="form-control" type="date" name='' />
                                                        </Col>
                                                    </FormGroup>
                                                    <FormGroup className="row">
                                                        <Label className="col-sm-3 col-form-label">Ticket Status</Label>
                                                        <Col sm="9">
                                                            <Select options={[]} type="select" name="" />
                                                        </Col>
                                                    </FormGroup>
                                                    <FormGroup tag="fieldset">
                                                        <Row>
                                                            <Label className="col-form-label col-sm-3 pt-0">Add Notes To</Label>
                                                            <Col sm="9">
                                                                <div className="radio radio-primary ms-2">
                                                                    <Input type="radio" name="radio1" id="radio1" value="option1" />
                                                                    <Label for="radio1">{Option} Discussion</Label>
                                                                </div>
                                                                <div className="radio radio-primary ms-2">
                                                                    <Input type="radio" name="radio1" id="radio2" value="option1" />
                                                                    <Label for="radio2">{Option} Internal</Label>
                                                                </div>
                                                                <div className="radio radio-primary ms-2">
                                                                    <Input type="radio" name="radio1" id="radio3" value="option1" />
                                                                    <Label for="radio3">{Option} Resolution</Label>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>


                                                </Col>
                                            </Row>
                                        </CardBody>


                                        <HeaderCard title='Manage Time Entry' />
                                        <CardBody>
                                            <Row>
                                                <Col>
                                                    <FormGroup className="row">
                                                        <Label className="col-sm-3 col-form-label">Start Time<span className="time-icon" onClick={captureCurrentTime}>&#128340;</span></Label>

                                                        <Col sm="9">
                                                            <Input type="text" name="startTime" id="startTime" readOnly />
                                                        </Col>
                                                    </FormGroup>
                                                    <FormGroup className="row">
                                                        <Label className="col-sm-3 col-form-label">End Time<span className="time-icon" onClick={captureCurrentTime1}>&#128340;</span></Label>
                                                        <Col sm="9">
                                                            <Input type="text" name="endTime" id="endTime" readOnly />
                                                        </Col>
                                                    </FormGroup>
                                                    <FormGroup className="row">
                                                        <Label className="col-sm-3 col-form-label">Actual Hours</Label>
                                                        <Col sm="9">
                                                            <Input type="text" name="durationResult" id="durationResult" readOnly value={calculateDuration()} />
                                                        </Col>
                                                    </FormGroup>





                                                    <FormGroup className="row">
                                                        <Label className="col-sm-3 col-form-label">Work Type</Label>
                                                        <Col sm="9">
                                                            <Select options={[]} type="select" name="" />
                                                        </Col>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Row>
                                                            <Col sm="12">
                                                                <CKEditors
                                                                    activeclassName="p10"
                                                                    content={emailTemplateForTickets}
                                                                    events={{
                                                                        'change': onChange
                                                                    }}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>
                                                    <FormGroup className="row">
                                                        <Row>
                                                            <Col sm="12">
                                                                <H6>
                                                                    Add Attachments
                                                                </H6>
                                                                <div className="dz-message needsclick">
                                                                    <Dropzone
                                                                        getUploadParams={getUploadParams}
                                                                        onChangeStatus={handleChangeStatus}
                                                                        maxFiles={1}
                                                                        multiple={false}
                                                                        canCancel={false}
                                                                        inputContent="Drop A File"
                                                                        styles={{
                                                                            dropzoneActive: { borderColor: 'green' },
                                                                        }}
                                                                    />
                                                                </div>
                                                            </Col>

                                                        </Row>
                                                    </FormGroup>




                                                </Col>
                                            </Row>
                                        </CardBody>


                                        <CardFooter>
                                            <div className='d-flex justify-content-end' style={{ gap: "1rem" }}>
                                                <Button color="info" type="submit">
                                                    Add
                                                </Button>
                                                <Button color="danger" onClick={cancelNote}>
                                                    Cancel
                                                </Button>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </Form>

                            </CardBody>
                            <CardBody>
                                <Nav className='nav-warning nav-pills'>
                                    <NavItem>
                                        <NavLink href='#javascript' className={warningTab === '1' ? 'active' : ''} onClick={() => setwarningTab('1')}>

                                            Discussion
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href='#javascript' className={warningTab === '2' ? 'active' : ''} onClick={() => setwarningTab('2')}>

                                            Internal
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href='#javascript' className={warningTab === '3' ? 'active' : ''} onClick={() => setwarningTab('3')}>

                                            Resolution
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={warningTab}>
                                    <TabPane className='fade show' tabId='1'>
                                        <P attrPara={{ className: 'mb-0 m-t-30' }}>
                                            {
                                                'Notes for Discussion'
                                            }
                                        </P>
                                    </TabPane>
                                    <TabPane tabId='2'>
                                        <P attrPara={{ className: 'mb-0 m-t-30' }}>
                                            {
                                                'Notes for Internal'
                                            }
                                        </P>
                                    </TabPane>
                                    <TabPane tabId='3'>
                                        <P attrPara={{ className: 'mb-0 m-t-30' }}>
                                            {
                                                'Notes for Resolution'
                                            }
                                        </P>
                                    </TabPane>
                                </TabContent>
                            </CardBody>
<CardBody>
<div className='email-wrapper'>
                      <Form className='theme-form'>
                        <FormGroup>
                          <Label className='col-form-Label pt-0'>To</Label>
                          <MultiSelect
        suggestions={suggestions}
        selectedItems={selectedList}
        updateSuggestions={(response) => {
          console.log("suggestion: ");
          console.log(response);
          setSuggestions(response.list);
        }}
        updateSelectedItems={(response) => {
          console.log("selection: ");
          console.log(response);
          // let's add removed items to the suggestion
          if (response.removedItem) {
            setSuggestions([...suggestions, response.removedItem]);
          }
          setSelectedList(response.list);
        }}
        displayField={"value"}
        maxDisplayedItems={5}
        disabled={false}
        editFieldPosBelow={true}
        placeholder={"Type the name of the contact person or choose one."}
        
      />
                        </FormGroup>
                        <FormGroup>
                          <Label className='col-form-Label pt-0'>From</Label>
                          <Input className='form-control' type='email' value='support@codefusion.com'/>
                        </FormGroup>
                        <FormGroup>
                          <Label>Subject</Label>
                          <Input className='form-control' type='text' value={issue}/>
                        </FormGroup>
                        <div>
                          <Label className='text-muted'>Message</Label>
                          <CKEditors className='email-compose-ck' activeclassName='p10' content={emailTemplateForTickets} />
                        </div>
                      </Form>
                    </div>
</CardBody>
                            
                        </Col>

                        <CardFooter>
                            <div className='d-flex justify-content-end' style={{ gap: "1rem" }}>
                                <Button color="info" type="submit">
                                    Create Ticket
                                </Button>
                                <Button color="danger">
                                    Cancel
                                </Button>
                            </div>
                        </CardFooter>

                    </Card>
                </Form>
            </Container>

        </>
    )
}

export default CreateTicket;