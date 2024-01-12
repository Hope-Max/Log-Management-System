import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Label } from "reactstrap";
import { Btn, H5 } from "../../../../../AbstractElements";
import { UpdateUser } from "../../../../../redux/actions/authAction";
import { SET_INITIAL_AUTH } from "../../../../../redux/actions/types";
import moment from "moment";

const AddEducationDetails = (props) => {
  const { userData } = props;
  const [date] = useState(new Date());
  const [workFormState, setWorkFormState] = useState(1);
  const [certFormState, setCertFormState] = useState(1);
  const dispatch = useDispatch();
  const { updateUserSuccess, error } = useSelector((state) => state.auth);
  const [payload, setPayload] = useState({
    id: props?.userId,
    qualification_doc_url: "string",
  });

  const [educationPayload, setEducationPayload] = useState([
    {
      degree: "",
      university: "",
      specialization: "",
      completion_date: "",
      result: "",
    },
  ]);

  const [certificatesPayload, setCertificatesPayload] = useState([
    {
      name: "",
      issuing_organization: "",
      issue_date: "",
      expiry_date: "",
      credential_id: "",
      crendential_url: "",
    },
  ]);

  useEffect(() => {
    setWorkFormState(educationPayload?.length);
  }, [educationPayload]);

  useEffect(() => {
    setCertFormState(certificatesPayload?.length);
  }, [certificatesPayload]);

  useEffect(() => {
    if (userData) {
      setPayload({
        id: userData?.id ?? props?.userId,
        qualification_doc_url: userData?.qualification_doc_url ?? "string",
      });
      if (userData?.educational_details) {
        setEducationPayload(userData?.educational_details);
      }
      if (userData?.certificates_details) {
        setCertificatesPayload(userData?.certificates_details);
      }
    }
  }, [userData]);

  useEffect(() => {
    if (props?.submit) {
      if (Object.keys(updateUserSuccess).length !== 0) {
        props?.setSubmit(false);
        props.jumpToStep(3);
        props?.setUserData(updateUserSuccess);
        dispatch({ type: SET_INITIAL_AUTH, payload: {} });
        // history(`${process.env.PUBLIC_URL}/me/leave`);
      } else if (!!error?.data) {
        props?.setSubmit(false);
        console.log("VERIFY ", error);
        props?.setErrorMsg(error?.data?.msg);
        dispatch({ type: SET_INITIAL_AUTH, payload: {} });
      }
    }
  }, [updateUserSuccess, props?.submit]);

  const updateEduFieldChanged = (e, index, type = null, name) => {
    let newArr = educationPayload.map((item, i) => {
      if (index === i) {
        if (type === "select") {
          return { ...item, [name]: e.value };
        } else if (type === "date") {
          return { ...item, [name]: e.target.value };
        } else {
          return { ...item, [e.target.name]: e.target.value };
        }
      } else {
        return item;
      }
    });
    setEducationPayload(newArr);
  };

  const updateCertFieldChanged = (e, index, type = null, name) => {
    let newArr = certificatesPayload.map((item, i) => {
      if (index === i) {
        if (type === "select") {
          return { ...item, [name]: e.value };
        } else if (type === "date") {
          return { ...item, [name]: e.target.value };
        } else {
          return { ...item, [e.target.name]: e.target.value };
        }
      } else {
        return item;
      }
    });
    setCertificatesPayload(newArr);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (payload) {
      let finalPayload = {
        ...payload,
        educational_details: educationPayload,
        certificates_details: certificatesPayload,
      };
      props.setSubmit(true);
      props?.setErrorMsg("");
      dispatch(UpdateUser(finalPayload));
    }
  };

  const EducationDetailsComp = (item, i) => {
    return (
      <div className="hovercard m-b-30 m-t-30">
        <div className="form-row">
          <Row>
            <Col md="4 mb-3">
              <Label>Degree</Label>
              <input
                className="form-control"
                name="degree"
                type="text"
                placeholder="Degree"
                value={item?.degree}
                onChange={(e) => updateEduFieldChanged(e, i)}
              />
              <div className="valid-feedback">{"Looks good!"}</div>
            </Col>
            <Col md="4 mb-3">
              <Label>{"University"}</Label>
              <input
                className="form-control"
                name="university"
                type="text"
                placeholder="University"
                value={item?.university}
                onChange={(e) => updateEduFieldChanged(e, i)}
              />
              <div className="valid-feedback">{"Looks good!"}</div>
            </Col>
            <Col md="4 mb-3">
              <Label>{"Specialization"}</Label>
              <input
                className="form-control"
                name="specialization"
                type="text"
                placeholder="Specialization"
                value={item?.specialization}
                onChange={(e) => updateEduFieldChanged(e, i)}
              />
              <div className="valid-feedback">{"Looks good!"}</div>
            </Col>
            <Col md="4 mb-3">
              <Label>{"Date of completion"}</Label>
              <input
                className="form-control"
                name="completion_date"
                type="date"
                max={moment(date).format("YYYY-MM-DD")}
                placeholder="Date of completion"
                value={item?.completion_date}
                onChange={(e) =>
                  updateEduFieldChanged(e, i, "date", "completion_date")
                }
              />
              <div className="valid-feedback">{"Looks good!"}</div>
            </Col>
            <Col md="4 mb-3">
              <Label>{"Percentage / Grade / CGPA"}</Label>
              <input
                className="form-control"
                name="result"
                type="text"
                placeholder="Ex. 89.20% / A+ / 8.5"
                value={item?.result}
                onChange={(e) => updateEduFieldChanged(e, i)}
              />
              <div className="valid-feedback">{"Looks good!"}</div>
            </Col>

            <div className=" text-end">
              <p
                style={{ color: "red" }}
                onClick={() => {
                  setEducationPayload(
                    educationPayload.filter(function (item, index) {
                      return index !== i;
                    })
                  );
                  setWorkFormState(workFormState - 1);
                }}
              >
                {" "}
                - Delete
              </p>
            </div>
          </Row>
        </div>
      </div>
    );
  };

  const CertificatesDetailsComp = (item, i) => {
    return (
      <div className="hovercard m-b-30 m-t-30">
        <div className="form-row">
          <Row>
            <Col md="4 mb-3">
              <Label>Title</Label>
              <input
                className="form-control"
                name="name"
                type="text"
                placeholder="Title of the certificate"
                value={item?.name}
                onChange={(e) => updateCertFieldChanged(e, i)}
              />
              <div className="valid-feedback">{"Looks good!"}</div>
            </Col>
            <Col md="4 mb-3">
              <Label>{"Issuing Organization"}</Label>
              <input
                className="form-control"
                name="issuing_organization"
                type="text"
                placeholder="Issuing Organization"
                value={item?.issuing_organization}
                onChange={(e) => updateCertFieldChanged(e, i)}
              />
              <div className="valid-feedback">{"Looks good!"}</div>
            </Col>
            <Col md="4 mb-3">
              <Label>{"Credential ID"}</Label>
              <input
                className="form-control"
                name="credential_id"
                type="text"
                placeholder="Credential ID"
                value={item?.credential_id}
                onChange={(e) => updateCertFieldChanged(e, i)}
              />
              <div className="valid-feedback">{"Looks good!"}</div>
            </Col>
            <Col md="4 mb-3">
              <Label>{"Credential URL"}</Label>
              <input
                className="form-control"
                name="crendential_url"
                type="text"
                placeholder="public url of certificate"
                value={item?.crendential_url}
                onChange={(e) => updateCertFieldChanged(e, i)}
              />
              <div className="valid-feedback">{"Looks good!"}</div>
            </Col>
            <Col md="4 mb-3">
              <Label>{"Issue Date"}</Label>
              <input
                className="form-control"
                name="issue_date"
                type="date"
                max={moment(date).format("YYYY-MM-DD")}
                value={item?.issue_date}
                onChange={(e) =>
                  updateCertFieldChanged(e, i, "date", "issue_date")
                }
              />
              <div className="valid-feedback">{"Looks good!"}</div>
            </Col>
            <Col md="4 mb-3">
              <Label>{"Expiry Date (if applicable)"}</Label>
              <input
                className="form-control"
                name="expiry_date"
                type="date"
                min={moment(date).format("YYYY-MM-DD")}
                value={item?.expiry_date}
                onChange={(e) =>
                  updateCertFieldChanged(e, i, "date", "expiry_date")
                }
              />
              <div className="valid-feedback">{"Looks good!"}</div>
            </Col>
            <div className=" text-end">
              <p
                style={{ color: "red" }}
                onClick={() => {
                  setCertificatesPayload(
                    certificatesPayload.filter(function (item, index) {
                      return index !== i;
                    })
                  );
                  setCertFormState(certFormState - 1);
                }}
              >
                {" "}
                - Delete
              </p>
            </div>
          </Row>
        </div>
      </div>
    );
  };
  return (
    <Fragment>
      <Form className="needs-validation" onSubmit={onSubmit}>
        <Row>
          <Col sm="12">
            <div className="d-flex w-100 justify-content-center m-t-20">
              <H5 attrH5={{ className: "mb-1" }}>{"Education Details"}</H5>
            </div>

            {educationPayload?.map((item, i) => {
              return EducationDetailsComp(item, i);
            })}

            <div className="m-t-10 text-center">
              <p
                style={{ color: "blue" }}
                onClick={() => {
                  setWorkFormState(workFormState + 1);
                  setEducationPayload((oldArray) => [
                    ...oldArray,
                    {
                      degree: "",
                      university: "",
                      specialization: "",
                      completion_date: "",
                      result: "",
                    },
                  ]);
                }}
              >
                {" "}
                + Add more field
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <div className="d-flex w-100 justify-content-center">
              <H5 attrH5={{ className: "m-t-40 mb-1" }}>
                {"Certificates Details"}
              </H5>
            </div>

            {certificatesPayload?.map((item, i) => {
              return CertificatesDetailsComp(item, i);
            })}

            <div className="m-t-10 text-center">
              <p
                style={{ color: "blue" }}
                onClick={() => {
                  setCertFormState(certFormState + 1);
                  setCertificatesPayload((oldArray) => [
                    ...oldArray,
                    {
                      name: "",
                      issuing_organization: "",
                      issue_date: "",
                      expiry_date: "",
                      credential_id: "",
                      crendential_url: "",
                    },
                  ]);
                }}
              >
                {" "}
                + Add more field
              </p>
            </div>

            <div className="d-flex justify-content-between m-t-10">
              <Btn
                attrBtn={{
                  color: "primary d-flex",
                }}
                onClick={() => {
                  props.jumpToStep(1);
                }}
              >
                {"Prev"}
              </Btn>
              <Btn
                attrBtn={{
                  color: "primary d-flex",
                  type: "submit",
                }}
              >
                {"Next"}
              </Btn>
            </div>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};
export default AddEducationDetails;
