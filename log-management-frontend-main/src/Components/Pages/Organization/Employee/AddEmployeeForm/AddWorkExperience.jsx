import React, { Fragment, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Label, FormGroup, Input } from "reactstrap";
import Select from "react-select";
import { Btn, H5 } from "../../../../../AbstractElements";
import { FirstName, LastName } from "../../../../../Constant";
import {
  CreateUser,
  UpdateUser,
} from "../../../../../redux/actions/authAction";
import {
  department,
  designations,
  isEmpty,
  nationalities,
  UserType,
  roles,
  getRoleBasedAccess,
} from "../../../../../redux/constants";
import { use } from "i18next";
import moment from "moment";
import { ListUsers } from "../../../../../redux/actions/commonApiAction";
import { SET_INITIAL_AUTH } from "../../../../../redux/actions/types";
import { designationListAction } from "../../../../../redux/actions/organizationActions";

const AddWorkExperience = (props) => {
  const { userData } = props;
  console.log("AddWorkExperience", userData);
  const [url, setUrl] = useState("");
  const [date] = useState(new Date());
  const [workFormState, setWorkFormState] = useState(1);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [designationList, setDesignationList] = useState([]);
  const { usersList } = useSelector((state) => state.commonApi);
  const [designation, setDesignation] = useState(null);
  const { designationListData } = useSelector((state) => state.organizationRes);
  const { updateUserSuccess, error } = useSelector((state) => state.auth);
  const [reportingManagers, setReportingManagers] = useState([]);
  const [payload, setPayload] = useState({
    id: props?.userId,
    department: "",
    // role_id: userData?.role_id ?? 2,
    is_probation: false,
    probation_period_in_months: null,
    doj: null,
    user_type: "Full Time",
    designation_id: null,
    gross_salary: null,
    sup_user_id: null,
    is_active: true,
  });

  const [oldExperiencePayload, setOldExperiencePayload] = useState([
    {
      previous_comp_name: "",
      job_title: "",
      total_experience: "",
      job_description: "",
      start_date: null,
      end_date: null,
    },
  ]);

  useEffect(() => {
    setWorkFormState(oldExperiencePayload?.length);
  }, [oldExperiencePayload]);

  useEffect(() => {
    if (userData) {
      setPayload({
        id: userData?.id ?? props?.userId,
        department: userData?.department ?? "",
        mohre_salary: userData?.mohre_salary,
        is_probation: userData?.is_probation ?? false,
        probation_period_in_months:
          userData?.probation_period_in_months ?? null,
        doj: userData?.doj ?? null,
        user_type: userData?.user_type ?? "Full Time",
        designation_id: userData?.designation?.id ?? null,
        gross_salary: userData?.gross_salary ?? null,
        sup_user_id: userData?.sup_user_id ?? null,
        is_active: userData?.is_active ?? true,
      });
      setDesignation(userData?.designation?.title);
      if (userData?.work_experience) {
        setOldExperiencePayload(userData?.work_experience);
      }
    }
  }, [userData]);

  useEffect(() => {
    dispatch(ListUsers());
    dispatch(designationListAction());
  }, []);

  useEffect(() => {
    //let departmentDesignations = designationListData?.reduce((designation) => designation.department === payload.department)
    // console.log("DesignationListData", departmentDesignations)
    console.log("payload?.department", payload?.department);
    let ll = designationListData
      ?.filter((j) => payload?.department === j?.department)
      ?.map((item) => {
        return { label: item?.title, value: item?.id };
      });
    console.log("payload?.department HOLA", ll);
    setDesignationList(ll);
  }, [designationListData, payload?.department]);

  useEffect(() => {
    if (props?.submit) {
      if (Object.keys(updateUserSuccess).length !== 0) {
        props?.setSubmit(false);
        props.jumpToStep(2);
        props?.setUserData(updateUserSuccess);
        console.log("updateUserSuccess - false", updateUserSuccess);
        dispatch({ type: SET_INITIAL_AUTH, payload: {} });
        // history(`${process.env.PUBLIC_URL}/me/leave`);
      } else if (!!error?.data) {
        props?.setSubmit(false);
        console.log("VERIFY ", error);
        props?.setErrorMsg(error?.data?.msg);
        dispatch({ type: SET_INITIAL_AUTH, payload: {} });
      }
    }
  }, [updateUserSuccess]);

  useEffect(() => {
    if (!isEmpty(usersList)) {
      console.log("usersList", usersList);
      let data = [];
      if (userData?.department === "Labour Staff") {
        data = usersList?.filter((item) => {
          return item.userRole === "sup";
        });
      } else if (userData?.department === "Drivers") {
        data = usersList?.filter((item) => {
          return item.department === "Finance, HR & Accounts";
        });
      } else {
        data = usersList?.filter(
          (user) =>
            payload.department === user.department && user.id !== payload.id
        );
      }

      console.log("Data", data);
      let supList = data?.map((item) => {
        return { value: item?.id, label: item?.full_name };
      });

      if (payload.department !== "Director") {
        supList.push({
          label: "Reports to Directors",
          value: null,
        });
      } else {
        supList.push({
          label: "N/A",
          value: null,
        });
      }
      setReportingManagers(supList);
    }
  }, [usersList, payload?.department]);

  const handleOnChange = (e, type = null, name) => {
    // console.log('NONO', e.target.name, e.target.value);
    if (type === "select") {
      console.log("name", name, e);
      if (name === "designation") {
        setPayload({ ...payload, designation_id: e.value });
        let designationTitle =
          designationListData?.find((designation) => designation.id === e.value)
            ?.title ?? null;
        //console.log(designationTitle)
        setDesignation(designationTitle);
      } else {
        setPayload({ ...payload, [name]: e.value });
      }
    } else if (type === "date") {
      setPayload({ ...payload, [name]: e.target.value });
    } else {
      setPayload({ ...payload, [e.target.name]: e.target.value });
    }
  };

  const updateFieldChanged = (e, index, type = null, name) => {
    let newArr = oldExperiencePayload.map((item, i) => {
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
    setOldExperiencePayload(newArr);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (payload) {
      let finalPayload = { ...payload, work_experience: oldExperiencePayload };
      props?.setErrorMsg("");
      props.setSubmit(true);
      dispatch(UpdateUser(finalPayload));
    }
  };

  const WorkExperienceComp = (item, i) => {
    console.log(
      "WorkExperience",
      workFormState !== 1 && i !== 0 && workFormState >= i,
      i,
      workFormState
    );
    return (
      <div className="hovercard m-b-30 m-t-30">
        <div className="form-row">
          <Row>
            <Col md="4 mb-3">
              <Label>{"Previous Company Name"}</Label>
              <input
                className="form-control"
                name="previous_comp_name"
                ref={inputRef}
                autoFocus={inputRef.current === document.activeElement}
                key="previous_comp_name"
                type="text"
                placeholder="Previous company name"
                value={oldExperiencePayload[i]?.previous_comp_name}
                onChange={(e) => updateFieldChanged(e, i)}
              />
              <div className="valid-feedback">{"Looks good!"}</div>
            </Col>
            <Col md="4 mb-3">
              <Label>{"Designation"}</Label>
              <input
                className="form-control"
                name="job_title"
                ref={inputRef}
                autoFocus={inputRef.current === document.activeElement}
                key="job_title"
                type="text"
                placeholder="Designation"
                value={oldExperiencePayload[i]?.job_title}
                onChange={(e) => updateFieldChanged(e, i)}
              />
              {/* <Select
								options={designations}
								className="js-example-basic-single col-sm-12"
								required
								name="job_title"
								autoFocus="autoFocus"
							key="job_title" value={{ label: payload?.job_title, value: payload?.job_title }}
							onChange={(e) => (e) => updateFieldChanged(e, i)(e, 'select', 'job_title')}
							/> */}
              <div className="valid-feedback">{"Looks good!"}</div>
            </Col>
            <Col md="4 mb-3">
              <Label>Total Years of Experience</Label>
              <input
                className="form-control"
                name="total_experience"
                // autoFocus="autoFocus"
                key="total_experience"
                type="number"
                placeholder="Ex. 2.5 or 4"
                value={oldExperiencePayload[i]?.total_experience}
                onChange={(e) => updateFieldChanged(e, i)}
              />
              <div className="valid-feedback">{"Looks good!"}</div>
            </Col>
            <Col md="4 mb-3">
              <Label>{"Joining Date"}</Label>
              <input
                className="form-control"
                name="start_date"
                // autoFocus="autoFocus"
                key="start_date"
                type="date"
                max={moment(date).format("YYYY-MM-DD")}
                value={oldExperiencePayload[i]?.start_date}
                onChange={(e) => updateFieldChanged(e, i, "date", "start_date")}
              />
              <div className="valid-feedback">{"Looks good!"}</div>
            </Col>
            <Col md="4 mb-3">
              <Label>{"Last Working Date"}</Label>
              <input
                className="form-control"
                name="end_date"
                // autoFocus="autoFocus"
                key="end_date"
                type="date"
                max={moment(date).format("YYYY-MM-DD")}
                value={oldExperiencePayload[i]?.end_date}
                onChange={(e) => updateFieldChanged(e, i, "date", "end_date")}
              />
              <div className="valid-feedback">{"Looks good!"}</div>
            </Col>
            <Col md="4 mb-3">
              <Label>{"Job Description"}</Label>
              <input
                className="form-control"
                name="job_description"
                key="job_description"
                type="text"
                placeholder="Job Description"
                value={oldExperiencePayload[i]?.job_description}
                onChange={(e) => updateFieldChanged(e, i)}
              />
              <div className="valid-feedback">{"Looks good!"}</div>
            </Col>

            <div className=" text-end">
              <p
                style={{ color: "red" }}
                onClick={() => {
                  setOldExperiencePayload(
                    oldExperiencePayload.filter(function (item, index) {
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

  return (
    <Fragment>
      <Row>
        <Col sm="12">
          <Form className="needs-validation" onSubmit={onSubmit}>
            <div className="d-flex w-100 justify-content-center m-t-20">
              <H5 attrH5={{ className: "mb-1" }}>{"Work Details"}</H5>
            </div>
            <div className="hovercard m-b-30 m-t-30">
              <div className="form-row">
                <Row>
                  <Col md="4 mb-3">
                    <Label>Department*</Label>
                    <Select
                      options={department}
                      className="js-example-basic-single col-sm-12"
                      required
                      name="department"
                      isDisabled={getRoleBasedAccess()}
                      value={{
                        label: payload?.department,
                        value: payload?.department,
                      }}
                      onChange={(e) =>
                        handleOnChange(e, "select", "department")
                      }
                    />
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                  {/* <Col md="4 mb-3">
                                        <Label>Role</Label>
                                        <Select
                                            options={roles}
                                            className="js-example-basic-single col-sm-12"
                                            required
                                            name="role_id"
                                            value={roles?.find((obj) => obj.value === payload?.role_id)}
                                            onChange={(e) => handleOnChange(e, "select", "role_id")}
                                        />
                                        <div className="valid-feedback">{"Looks good!"}</div>
                                    </Col> */}
                  <Col md="4 mb-3">
                    <Label>{"Designation*"}</Label>
                    <Select
                      options={designationList}
                      className="js-example-basic-single col-sm-12"
                      required
                      name="designation"
                      isDisabled={getRoleBasedAccess()}
                      value={{
                        label: designation,
                        value: payload?.designation_id,
                      }}
                      onChange={(e) =>
                        handleOnChange(e, "select", "designation")
                      }
                    />
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                  <Col md="4 mb-3">
                    <Label>
                      {userData?.staff_type === "office"
                        ? "Reporting Manager"
                        : "Reporting Supervisor"}
                    </Label>
                    <Select
                      options={reportingManagers}
                      className="js-example-basic-single col-sm-12"
                      name="sup_user_id"
                      isDisabled={getRoleBasedAccess()}
                      value={reportingManagers?.find(
                        (item) => item.value === payload?.sup_user_id
                      )}
                      onChange={(e) =>
                        handleOnChange(e, "select", "sup_user_id")
                      }
                      // isDisabled={payload.department === "Director"}
                    />
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                  {/* <Col md="4 mb-3">
                                        <Label>{"Visa Status"}</Label>
                                        <Select
                                            options={[
                                                { label: "Work Visa", value: true },
                                                { label: "Visiting Visa", value: false }
                                            ]}
                                            className="js-example-basic-single col-sm-12"
                                            name="on_work_visa"
                                        />
                                        <input
                                            className="form-control"
                                            name="on_work_visa"
                                            type="text"
                                            placeholder="Visa Status"
                                            value={payload?.on_work_visa}
                                            onChange={handleOnChange}
                                            required
                                        />
                                        <div className="valid-feedback">{"Looks good!"}</div>
                                    </Col> */}
                  <Col md="4 mb-3">
                    <Label>{"Gross Salary*"}</Label>
                    <input
                      className="form-control"
                      name="gross_salary"
                      type="tel"
                      placeholder="Gross salary in AED"
                      disabled={getRoleBasedAccess()}
                      value={payload?.gross_salary}
                      onChange={handleOnChange}
                      required
                    />
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                  <Col md="4 mb-3">
                    <Label>{"Mohre Salary"}</Label>
                    <input
                      className="form-control"
                      name="mohre_salary"
                      type="tel"
                      placeholder="Mohre salary in AED"
                      disabled={getRoleBasedAccess()}
                      value={payload?.mohre_salary}
                      onChange={handleOnChange}
                    />
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                  <Col md="4 mb-3">
                    <Label>{"Date of Joining*"}</Label>
                    <input
                      className="form-control"
                      name="doj"
                      type="date"
                      max={moment(date).format("YYYY-MM-DD")}
                      disabled={getRoleBasedAccess()}
                      placeholder="Date of joining"
                      value={payload?.doj}
                      onChange={handleOnChange}
                      required
                    />
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                  <Col md="4 mb-3">
                    <FormGroup check inline>
                      <div className="checkbox checkbox-dark m-squar">
                        <Input
                          id="inline-sqr-1"
                          type="checkbox"
                          disabled={getRoleBasedAccess()}
                          onChange={(e) =>
                            setPayload({
                              ...payload,
                              is_probation: e.target.checked,
                            })
                          }
                          checked={payload?.is_probation}
                        />
                        <Label className="mt-0" for="inline-sqr-1">
                          {"Probation?"}
                        </Label>
                      </div>
                    </FormGroup>
                  </Col>
                  {payload?.is_probation ? (
                    <Col md="4 mb-3">
                      <Label>{"Probation period (months)*"}</Label>
                      <input
                        className="form-control"
                        name="probation_period_in_months"
                        type="number"
                        disabled={getRoleBasedAccess()}
                        placeholder="Probation period (months)"
                        value={payload?.probation_period_in_months}
                        onChange={handleOnChange}
                        required
                      />
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
                  ) : (
                    <></>
                  )}
                </Row>
              </div>
            </div>

            <div className="d-flex w-100 justify-content-center">
              <H5 attrH5={{ className: "mb-1" }}>{"Work Experience"}</H5>
            </div>
            {oldExperiencePayload.map((item, i) => {
              return WorkExperienceComp(item, i);
            })}

            <div className="m-t-10 text-center">
              <p
                style={{ color: "blue" }}
                onClick={() => {
                  setWorkFormState(workFormState + 1);
                  setOldExperiencePayload((oldArray) => [
                    ...oldArray,
                    {
                      previous_comp_name: "",
                      job_title: "",
                      total_experience: "",
                      job_description: "",
                      start_date: null,
                      end_date: null,
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
                  props.jumpToStep(0);
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
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};

export default AddWorkExperience;
