import React, { Fragment, useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Form, Label, Card, FormGroup, Input } from "reactstrap";
import { Btn, H5, Image, P } from "../../../../../AbstractElements";
import { Country, FirstName, LastName } from "../../../../../Constant";
import Select from "react-select";
import {
  countries,
  genders,
  getRoleBasedAccess,
  isEmpty,
  nationalities,
  religions,
  roles,
} from "../../../../../redux/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateUser,
  UpdateUser,
} from "../../../../../redux/actions/authAction";
import { SET_INITIAL_AUTH } from "../../../../../redux/actions/types";
import DatePicker from "react-datepicker";
import moment from "moment";
import { useNavigate } from "react-router";
import countryList from "react-select-country-list";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  getSignedUploadUrl,
  uploadFile,
} from "../../../../../redux/actions/commonApiAction";
import { toast } from "react-toastify";

const AddPersonalDetails = (props) => {
  const { userData } = props;
  const [url, setUrl] = useState("");
  const [date, setDate] = useState(new Date());

  const dispatch = useDispatch();
  const history = useNavigate();
  const { createUserSuccess, updateUserSuccess, error } = useSelector(
    (state) => state.auth
  );
  const { uploadImageRes, downloadImageRes, commonApiError } = useSelector(
    (state) => state.commonApi
  );

  const countryCodes = useMemo(() => countryList().getData(), []);

  const [payload, setPayload] = useState({
    is_company_emp: userData?.is_company_emp ?? true,
    staff_type: userData?.staff_type,
    role_id: userData?.role_id,
    employee_id: userData?.employee_id ?? "",
    labour_id: userData?.labour_id ?? null,
    photo_url:
      userData?.photo_url ??
      "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg",
    first_name: userData?.first_name ?? "",
    last_name: userData?.last_name ?? "",
    email: userData?.email ?? "",
    country_code: userData?.country_code ?? "",
    phone: userData?.phone ?? "",
    dob: userData?.dob ?? "",
    address1: userData?.address1 ?? "",
    address2: userData?.address2 ?? "",
    gender: userData?.gender ?? null,
    nationality: userData?.nationality ?? "",
    religion: userData?.religion ?? "",
    marital_status: userData?.marital_status ?? null,
    bank_name: userData?.bank_name ?? "",
    bank_account_no: userData?.bank_account_no ?? "",
    bank_account_holder: userData?.bank_account_holder ?? "",
    bank_iban_no: userData?.bank_iban_no ?? "",
    bank_code: userData?.bank_code ?? "",
    password: userData?.password ?? "",
  });

  console.log("props", payload);

  useEffect(() => {
    setPayload({
      id: userData?.id,
      is_company_emp: userData?.is_company_emp ?? true,
      staff_type: userData?.staff_type,
      role_id: userData?.role_id,
      employee_id: userData?.employee_id ?? "",
      labour_id: userData?.labour_id ?? null,
      photo_url:
        userData?.photo_url ??
        "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg",
      first_name: userData?.first_name ?? "",
      last_name: userData?.last_name ?? "",
      email: userData?.email ?? "",
      country_code: userData?.country_code ?? "",
      phone: userData?.phone ?? "",
      dob: userData?.dob ?? "",
      address1: userData?.address1 ?? "",
      address2: userData?.address2 ?? "",
      gender: userData?.gender ?? null,
      nationality: userData?.nationality ?? "",
      religion: userData?.religion ?? "",
      marital_status: userData?.marital_status ?? null,
      bank_name: userData?.bank_name ?? "",
      bank_account_no: userData?.bank_account_no ?? "",
      bank_account_holder: userData?.bank_account_holder ?? "",
      bank_iban_no: userData?.bank_iban_no ?? "",
      bank_code: userData?.bank_code ?? "",
      anniversary: userData?.anniversary ?? null,
    });
  }, [userData]);

  useEffect(() => {
    if (props?.submit) {
      if (Object.keys(createUserSuccess).length !== 0) {
        props?.setSubmit(false);
        console.log("LOGALOGA", createUserSuccess);
        props?.setUserId(createUserSuccess?.id);
        props.jumpToStep(1);
        // setStep(1);
        // history(`${process.env.PUBLIC_URL}/Organization/employee`);
        dispatch({ type: SET_INITIAL_AUTH, payload: {} });
      } else if (!!error?.data) {
        props?.setSubmit(false);
        console.log("VERIFY ", error);
        props?.setErrorMsg(error?.data?.msg);
        dispatch({ type: SET_INITIAL_AUTH, payload: {} });
      }
    }
  }, [createUserSuccess]);

  useEffect(() => {
    if (props?.submit) {
      if (Object.keys(updateUserSuccess).length !== 0) {
        props?.setSubmit(false);
        props.jumpToStep(1);
        props?.setUserData(updateUserSuccess);
        dispatch({ type: SET_INITIAL_AUTH, payload: {} });
      } else if (!!error?.data) {
        props?.setSubmit(false);
        console.log("VERIFY ", error);
        props?.setErrorMsg(error?.data?.msg);
        dispatch({ type: SET_INITIAL_AUTH, payload: {} });
      }
    }
  }, [updateUserSuccess]);

  const handleOnChange = (e, type = null, name) => {
    // console.log('NONO', e.target.name, e.target.value);
    if (type === "select") {
      // console.log("name", name, e);
      if (name === "phone") {
        setPayload({
          ...payload,
          country_code: e.split("-")[0],
          phone: e.split("-")[1],
        });
      } else {
        setPayload({ ...payload, [name]: e.value });
      }
    } else if (type === "date") {
      // console.log(e)
      // setPayload({ ...payload, [name]: moment(e).format('YYYY-MM-DD') }); -> use in case of DatePicker
      setPayload({ ...payload, [name]: e.target.value });
    } else {
      // console.log("e", e.target.name, e.target.value);
      setPayload({ ...payload, [e.target.name]: e.target.value });
    }
  };

  const readUrl = (event) => {
    if (event.target.files.length === 0) return;
    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      setUrl(reader.result);
    };
  };

  const resizeImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const image = new Image();
        image.onload = () => {
          const canvas = document.createElement("canvas");
          const maxDimension = 800;
          let width = image.width;
          let height = image.height;

          if (width > maxDimension || height > maxDimension) {
            const aspectRatio = width / height;
            if (width > height) {
              width = maxDimension;
              height = Math.round(width / aspectRatio);
            } else {
              height = maxDimension;
              width = Math.round(height * aspectRatio);
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(image, 0, 0, width, height);

          // Compress and convert the canvas image to a resized Blob
          canvas.toBlob(
            (blob) => {
              resolve(blob);
            },
            file.type,
            0.8
          ); // Specify the desired image quality (0.8 is 80% quality)
        };

        image.src = event.target.result;
      };

      reader.readAsDataURL(file);
    });
  };

  const handleUploadProfileAvatar = async (e) => {
    // dispatch({ type: "SHOW_LOADER" });
    console.log("handleUploadProfileAvatar", e);
    const files = e.target.files;

    if (files?.length > 0 && files[0]?.size / 1024 <= 10240) {
      console.log("fileSize", files[0]?.size / 1024);
      const { name, type } = files[0];
      const params = {
        key: name.includes(".") ? name.substring(0, name.indexOf(".")) : name,
        extension: type.includes("/")
          ? type.substring(type.indexOf("/") + 1)
          : type,
        belongsTo: "patient",
        purpose: "public",
      };

      if (
        params.extension.toLowerCase() === "jpg" ||
        params.extension.toLowerCase() === "jpeg" ||
        params.extension.toLowerCase() === "png"
      ) {
        // console.log("resizeImage(files[0])", resizeImage(files[0]));
        try {
          const res = await getSignedUploadUrl(params);
          console.log("handleUploadProfileAvatar", res);
          const url = res.data.url;
          if (url) {
            console.log("handleUploadProfileAvatar url", url);
            try {
              const response = await uploadFile(url, files[0]);
              console.log("handleUploadProfileAvatar file", response);
              if (response) {
                const fileReader = new FileReader();
                // fileReader.readAsDataURL(await resizeImage(files[0]));
                fileReader.readAsDataURL(e.target.files[0]);
                fileReader.onload = async (event) => {
                  if (e.target.files) {
                    console.log("ileReader.result", fileReader.result);
                    let parsedUrl = new URL(url).pathname.substring(1);
                    parsedUrl = parsedUrl.substring(parsedUrl.indexOf("/") + 1);
                    console.log("parsedUrl", parsedUrl);
                    setPayload({ ...payload, photo_url: parsedUrl });
                    setUrl(fileReader.result);
                  }
                  toast.success("Profile Image Uploaded Successfully");
                };
              }
            } catch (error) {
              toast.error(error);
            }
          }
        } catch (error) {
          toast.error(error);
        }
      } else {
        toast.error("Only image with .jpeg, .jpg, .png extentions are valid.");
      }
      // dispatch({ type: "HIDE_LOADER" });
      e.target.value = null;
    } else {
      // dispatch({ type: "HIDE_LOADER" });
      toast.error("File size should be less than 10MB.");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (payload) {
      if (payload.photo_url.includes(`s3.amazonaws.com`)) {
        let parsedUrl = new URL(payload.photo_url).pathname.substring(0);
        parsedUrl = parsedUrl.substring(parsedUrl.indexOf("/") + 1);
        console.log("parsedUrl", parsedUrl);
        // return;
        payload.photo_url = parsedUrl;
      }
      console.log("payload", payload);
      if (isEmpty(userData)) {
        props.setSubmit(true);
        dispatch(CreateUser(payload));
      } else {
        props.setSubmit(true);
        dispatch(UpdateUser(payload));
      }
    }
  };

  // console.log("payload?.staff_type", payload?.staff_type);

  return (
    <Fragment>
      <Row>
        <Col sm="12">
          <Form className="needs-validation" onSubmit={onSubmit}>
            <div className="d-flex w-100 justify-content-center m-t-20">
              <H5 attrH5={{ className: "mb-1" }}>{"Personal Details"}</H5>
            </div>
            <div className="hovercard text-center m-b-30 m-t-30">
              <div className="user-image">
                <div className="avatar">
                  <Image
                    attrImage={{
                      className: "step1",
                      alt: "",
                      src: `${url ? url : payload?.photo_url}`,
                      style: {
                        width: "110px",
                        height: "110px",
                        maxWidth: "155px",
                        maxHeight: "155px",
                        borderRadius: "50%",
                        border: "7px solid #fff",
                      },
                    }}
                  />
                </div>
                <div
                  className="icon-wrapper step2"
                  data-intro="Change Profile image here"
                >
                  <i
                    className="icofont icofont-pencil-alt-5"
                    // onChange={(e) => handleUploadProfileAvatar(e)}
                  >
                    <input
                      className="upload"
                      type="file"
                      onChange={(e) => handleUploadProfileAvatar(e)}
                    />
                  </i>
                </div>
              </div>
            </div>
            <Row>
              <div
                className="d-flex"
                onChange={handleOnChange}
                style={{
                  paddingBlockStart: "1rem",
                  marginBlockEnd: "2rem",
                  borderBlock: "1px solid #cccccc",
                  backgroundColor: "#f1f0ff",
                }}
              >
                <P>Employee type* : </P>
                <div className="radio radio-primary ms-2 m-l-20">
                  <Input
                    type="radio"
                    name="staff_type"
                    value={"office"}
                    id="radio1"
                    disabled={getRoleBasedAccess()}
                    checked={payload?.staff_type === "office"}
                    //checked={payload?.is_company_emp}
                  />
                  <Label for="radio1">{"Office"}</Label>
                </div>
                <div className="radio radio-primary ms-2 m-l-40">
                  <Input
                    type="radio"
                    name="staff_type"
                    value={"site"}
                    id="radio2"
                    disabled={getRoleBasedAccess()}
                    checked={payload?.staff_type === "site"}
                  />
                  <Label for="radio2">{"Site"}</Label>
                </div>
                <div className="radio radio-primary ms-2 m-l-40">
                  <Input
                    type="radio"
                    name="staff_type"
                    value={"labour"}
                    id="radio3"
                    disabled={getRoleBasedAccess()}
                    checked={payload?.staff_type === "labour"}
                  />
                  <Label for="radio3">{"Labour"}</Label>
                </div>
              </div>
            </Row>

            <div className="form-row">
              <Row>
                <Col md="2 mb-3">
                  <Label>Role*</Label>
                  <Select
                    options={
                      payload?.staff_type === "labour"
                        ? [{ label: "Labour", value: 8 }]
                        : roles
                    }
                    className="js-example-basic-single col-sm-12"
                    required
                    name="role_id"
                    isDisabled={getRoleBasedAccess()}
                    value={roles?.find((obj) => obj.value === payload?.role_id)}
                    onChange={(e) => handleOnChange(e, "select", "role_id")}
                  />
                  <div className="valid-feedback">{"Looks good!"}</div>
                </Col>
                <Col md="2 mb-3">
                  <Label>{"Employee Code*"}</Label>
                  <input
                    className="form-control"
                    name="employee_id"
                    type="text"
                    placeholder="Employee code"
                    required
                    disabled={getRoleBasedAccess()}
                    value={payload?.employee_id}
                    onChange={handleOnChange}
                  />
                  <div className="valid-feedback">{"Looks good!"}</div>
                </Col>
                <Col md="4 mb-3">
                  <Label>{"FirstName*"}</Label>
                  <input
                    className="form-control"
                    name="first_name"
                    type="text"
                    placeholder="First name"
                    required
                    value={payload?.first_name}
                    disabled={getRoleBasedAccess()}
                    onChange={handleOnChange}
                  />
                  <div className="valid-feedback">{"Looks good!"}</div>
                </Col>
                <Col md="4 mb-3">
                  <Label>{"LastName*"}</Label>
                  <input
                    className="form-control"
                    name="last_name"
                    type="text"
                    placeholder="Last name"
                    required
                    value={payload?.last_name}
                    disabled={getRoleBasedAccess()}
                    onChange={handleOnChange}
                  />
                  <div className="valid-feedback">{"Looks good!"}</div>
                </Col>
              </Row>
              <Row>
                <Col md="4 mb-3">
                  <Label>{"Email*"}</Label>
                  <input
                    className="form-control"
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={payload?.email}
                    onChange={handleOnChange}
                  />
                  <div className="valid-feedback">{"Looks good!"}</div>
                </Col>
                <Col md="4 mb-3">
                  <Label>Phone Number*</Label>
                  <PhoneInput
                    country={"ae"}
                    inputProps={{
                      required: true,
                      name: "country_code",
                    }}
                    inputClass="w-100 form-control"
                    enableSearch
                    value={`${payload?.country_code}${payload?.phone}`}
                    onChange={(phone, country) => {
                      handleOnChange(
                        country.dialCode +
                          "-" +
                          phone.replace(country.dialCode, ""),
                        "select",
                        "phone"
                      );
                    }}
                  />
                  {/* <Select
                    options={countryCodes}
                    className="js-example-basic-single col-sm-12"
                    required
                    name="country_code"
                    value={{
                      label: payload?.country_code,
                      value: payload?.country_code,
                    }}
                    onChange={(e) => handleOnChange(e, "select", "country_code")}
                  />
                  <input
                    className="form-control"
                    name="phone"
                    type="tel"
                    pattern="\d{3}[\-]?\d{3}[\-]?\d{4}"
                    // minLength="10"
                    maxLength="10"
                    placeholder="Phone number"
                    required
                    value={payload?.phone}
                    onChange={handleOnChange}
                  /> */}
                  <div className="valid-feedback">{"Looks good!"}</div>
                </Col>
                <Col md="4 mb-3">
                  <Label>Date of birth*</Label>
                  {/* <DatePicker
                    className="form-control digits col-sm-6"
                    name='dob'
                    maxDate={date}
                    format="YYYY-MM-DD"
                    selected={date}
                    value={payload?.dob}
                    onSelect={(e) => handleOnChange(e, 'date', 'dob')}
                    required
                  /> */}
                  <input
                    className="form-control"
                    name="dob"
                    type="date"
                    max={moment(date).format("YYYY-MM-DD")}
                    required
                    value={payload?.dob}
                    onChange={(e) => handleOnChange(e, "date", "dob")}
                  />
                  <div className="valid-feedback">{"Looks good!"}</div>
                </Col>
                <Col md="6 mb-3">
                  <Label>Present Address*</Label>
                  <input
                    className="form-control"
                    name="address1"
                    type="text"
                    placeholder="322S, GB Rd. Jaipur"
                    required
                    value={payload?.address1}
                    onChange={handleOnChange}
                  />
                  <div className="valid-feedback">{"Looks good!"}</div>
                </Col>
                <Col md="6 mb-3">
                  <Label>Permanent Address*</Label>
                  <input
                    className="form-control"
                    name="address2"
                    type="text"
                    placeholder="322S, GB Rd. Jaipur"
                    required
                    value={payload?.address2}
                    onChange={handleOnChange}
                  />
                  <div className="valid-feedback">{"Looks good!"}</div>
                </Col>
                <Col md="3 mb-3">
                  <Label>Gender*</Label>
                  <Select
                    options={genders}
                    className="js-example-basic-single col-sm-12"
                    required
                    name="nationality"
                    value={{
                      label: payload?.gender,
                      value: payload?.gender,
                    }}
                    onChange={(e) => handleOnChange(e, "select", "gender")}
                  />
                  <div className="valid-feedback">{"Looks good!"}</div>
                </Col>
                <Col md="3 mb-3">
                  <Label>Nationality*</Label>
                  <Select
                    options={nationalities}
                    className="js-example-basic-single col-sm-12"
                    required
                    name="nationality"
                    value={{
                      label: payload?.nationality,
                      value: payload?.nationality,
                    }}
                    onChange={(e) => handleOnChange(e, "select", "nationality")}
                  />
                  <div className="valid-feedback">{"Looks good!"}</div>
                </Col>
                <Col md="3 mb-3">
                  <Label>Religion</Label>
                  <Select
                    options={religions}
                    className="js-example-basic-single col-sm-12"
                    name="nationality"
                    value={{
                      label: payload?.religion,
                      value: payload?.religion,
                    }}
                    onChange={(e) => handleOnChange(e, "select", "religion")}
                  />
                  <div className="valid-feedback">{"Looks good!"}</div>
                </Col>
                <Col md="3 mb-3">
                  <Label>Marital Status</Label>
                  <Select
                    options={[
                      { label: "Married", value: "Married" },
                      { label: "Unmarried", value: "Unmarried" },
                    ]}
                    className="js-example-basic-single col-sm-12"
                    name="marital_status"
                    defaultValue={{ value: "null", label: "Select Status" }}
                    value={{
                      label: payload?.marital_status,
                      value: payload?.marital_status,
                    }}
                    onChange={(e) =>
                      handleOnChange(e, "select", "marital_status")
                    }
                  />
                  <div className="valid-feedback">{"Looks good!"}</div>
                </Col>
                {payload?.marital_status === "Married" && (
                  <Col md="4 mb-3">
                    <Label>Anniversary</Label>
                    <input
                      className="form-control"
                      name="anniversary"
                      type="date"
                      max={moment(date).format("YYYY-MM-DD")}
                      placeholder="Anniversary"
                      value={payload?.anniversary}
                      onChange={(e) => handleOnChange(e, "date", "anniversary")}
                    />

                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                )}
                <Row
                  style={{
                    paddingBlockStart: "1rem",
                    marginBlock: "2rem",
                    borderBlock: "1px solid #cccccc",
                    backgroundColor: "#f1f0ff",
                  }}
                >
                  {isEmpty(userData) && (
                    <Col md="4 mb-3">
                      <Label>Create Password*</Label>
                      <input
                        className="form-control"
                        name="password"
                        type="text"
                        placeholder="Enter password"
                        required
                        value={payload?.password}
                        onChange={handleOnChange}
                      />

                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
                  )}
                </Row>

                <div className="d-flex w-100 justify-content-center m-t-20 m-b-20">
                  <H5 attrH5={{ className: "mb-1" }}>{"Bank Details"}</H5>
                </div>
                <Col md="4 mb-3">
                  <Label>Bank Name</Label>
                  <input
                    className="form-control"
                    name="bank_name"
                    type="text"
                    placeholder="Bank name"
                    value={payload?.bank_name}
                    onChange={handleOnChange}
                  />
                  <div className="valid-feedback">{"Looks good!"}</div>
                </Col>
                <Col md="4 mb-3">
                  <Label>Account Holder</Label>
                  <input
                    className="form-control"
                    name="bank_account_holder"
                    type="text"
                    placeholder="Account Holder Name"
                    value={payload?.bank_account_holder}
                    onChange={handleOnChange}
                  />
                  <div className="valid-feedback">{"Looks good!"}</div>
                </Col>
                <Col md="4 mb-3">
                  <Label>Account Number</Label>
                  <input
                    className="form-control"
                    name="bank_account_no"
                    type="tel"
                    //pattern="\d"
                    minLength="8"
                    maxLength="23"
                    placeholder="Ex. 53604043XXXX"
                    value={payload?.bank_account_no}
                    onChange={handleOnChange}
                  />
                  <div className="valid-feedback">{"Looks good!"}</div>
                </Col>
                <Col md="4 mb-3">
                  <Label>IBAN Number</Label>
                  <input
                    className="form-control"
                    name="bank_iban_no"
                    type="text"
                    placeholder="Ex. FI21123456987654XXXX"
                    value={payload?.bank_iban_no}
                    onChange={handleOnChange}
                  />
                  <div className="valid-feedback">{"Looks good!"}</div>
                </Col>
                <Col md="4 mb-3">
                  <Label>Bank code / Swift Code</Label>
                  <input
                    className="form-control"
                    name="bank_code"
                    type="text"
                    placeholder="Ex. ADCBXXXXX60"
                    value={payload?.bank_code}
                    onChange={handleOnChange}
                  />
                  <div className="valid-feedback">{"Looks good!"}</div>
                </Col>
              </Row>
              <div className="d-flex justify-content-end m-t-10">
                <Btn
                  attrBtn={{
                    color: "primary d-flex align-items-end",
                    type: "submit",
                  }}
                >
                  {"Next"}
                </Btn>
              </div>
            </div>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};

export default AddPersonalDetails;
