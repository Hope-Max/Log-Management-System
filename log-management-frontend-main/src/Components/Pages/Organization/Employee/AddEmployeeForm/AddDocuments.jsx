import Select from "react-select";
import React, { Fragment, useEffect, useState } from "react";
import { X } from "react-feather";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Row, Col, Form, Label, Input, Spinner } from "reactstrap";
import { Btn, H5, H6 } from "../../../../../AbstractElements";
import { FirstName, LastName } from "../../../../../Constant";
import {
  CreateUser,
  UpdateUser,
} from "../../../../../redux/actions/authAction";
import {
  download,
  getSignedUploadUrl,
  uploadFile,
} from "../../../../../redux/actions/commonApiAction";
import {
  HIDE_LOADER,
  SET_INITIAL_AUTH,
  SHOW_LOADER,
} from "../../../../../redux/actions/types";
import {
  getRoleBasedAccess,
  nationalities,
  visaSponsors,
  visaTypes,
} from "../../../../../redux/constants";

const AddDocuments = (props) => {
  const { userData } = props;
  const dispatch = useDispatch();
  const { updateUserSuccess, error } = useSelector((state) => state.auth);
  const history = useNavigate();

  const [otherDocFormState, setOtherDocFormState] = useState(1);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadReset, setUploadReset] = useState(false);
  const [uploadedFileURLs, setUploadedFileURLs] = useState([]);

  const [payload, setPayload] = useState({
    id: props?.userId,
    passport_url: [],
    passport_back_url: [],
    visa_url: [],
    emirates_url: [],
    driver_license_url: [],
    labour_card_url: [],
  });
  const [documentPayload, setDocumentPayload] = useState([
    {
      name: "passport",
      passport_no: "",
      passport_expiry: "",
      passport_urls: [],
    },
    {
      name: "visa",
      visa_no: "",
      visa_expiry: "",
      visa_type: "",
      visa_sponsor: "",
      visa_urls: [],
    },
    {
      name: "emirates",
      emirates_id: "",
      emirate_expiry: "",
      emirates_urls: [],
    },
    {
      name: "driving_license",
      driving_license_no: "",
      driving_license_expiry: "",
      driver_license_urls: [],
    },
    {
      name: "labour_card",
      labour_card_no: "",
      labour_card_expiry: "",
      labour_card_urls: [],
    },
  ]);
  console.log("Documents URL", payload);

  useEffect(() => {
    if (documentPayload.length > 5)
      setOtherDocFormState(documentPayload?.length - 5);
  }, [documentPayload]);

  useEffect(() => {
    if (userData) {
      if (userData?.documents_details?.length > 0) {
        setPayload({
          id: userData?.id ?? props?.userId,
          passport_url: userData?.documents_details[0]?.passport_urls ?? [],
          passport_back_url: [],
          visa_url: userData?.documents_details[1]?.visa_urls ?? [],
          emirates_url: userData?.documents_details[2]?.emirates_urls ?? [],
          driver_license_url:
            userData?.documents_details[3]?.driver_license_urls ?? [],
          labour_card_url:
            userData?.documents_details[4]?.labour_card_urls ?? [],
        });
        if (userData?.documents_details?.length > 4) {
          userData?.documents_details?.map((item, i) => {
            if (userData?.documents_details?.length > 4) {
              setPayload((prevState) => ({
                ...prevState,
                [item.name?.replace(/\s/g, "_")]:
                  item[item.name?.replace(/\s/g, "_")],
              }));
            }
          });
        }
        setDocumentPayload(userData?.documents_details);
      }
    }
  }, [userData]);

  useEffect(() => {
    if (props?.submit) {
      if (Object.keys(updateUserSuccess).length !== 0) {
        props?.setSubmit(false);
        dispatch({ type: SET_INITIAL_AUTH, payload: {} });
        history(`${process.env.PUBLIC_URL}/organization/employee`);
      } else if (!!error?.data) {
        props?.setSubmit(false);
        console.log("VERIFY ", error);
        props?.setErrorMsg(error?.data?.msg);
        dispatch({ type: SET_INITIAL_AUTH, payload: {} });
      }
    }
  }, [updateUserSuccess]);

  const handleFile = async (e, index) => {
    const files = e.target.files;
    console.log("Document URL uploadedFileURLs", uploadedFileURLs);
    let uploadedFileURL = [];
    if (files?.length > 0 && files?.length <= 10) {
      dispatch({ type: SHOW_LOADER });
      setUploading(true);
      setUploadReset(false);
      // setUploadValue(10);
      for (let i = 0; i < files.length; i++) {
        const { name, type } = files[i];
        const params = {
          key: name.includes(".") ? name.substring(0, name.indexOf(".")) : name,
          extension: type.includes("/")
            ? type.substring(type.indexOf("/") + 1)
            : type,
          belongsTo: "doctor",
          purpose: "internal",
        };

        try {
          const res = await getSignedUploadUrl(params);
          const url = res.data.url;
          // setUploadValue(30);
          if (url) {
            try {
              const response = await uploadFile(url, files[i]);
              const reader = new FileReader();
              reader.onload = function (e) {
                // document.getElementById(`iconUpload`).className = 'bi bi-check-circle-fill';
                // document.getElementById(`iconUpload`).style.color = 'green';
                // document.getElementById(`upload-info-text`).innerText = `Total files uploaded: ${uploadedFileURLs.length}`
                setUploadedFileURLs(uploadedFileURL);
                // setUploadValue(10);
              };
              reader.onerror = function (e) {};
              reader.readAsDataURL(files[i]);
              let parsedUrl = new URL(url).pathname.substring(1);
              parsedUrl = parsedUrl.substring(parsedUrl.indexOf("/") + 1);
              uploadedFileURL.push({
                id: null,
                url: parsedUrl,
                file_type: files[i].type,
                file_name: files[i].name,
              });
              console.log("Document URL uploadedFileURL", uploadedFileURL);
              setUploadedFileURLs(uploadedFileURL);

              // setUploadValue(50);
            } catch (error) {
              console.error(error);
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
      console.log(
        "Document URL uploadedFileURLs",
        documentPayload[index],
        index
      );
      if (index) {
        setPayload((prevState) => ({
          ...prevState,
          [documentPayload[index]?.name?.replace(/\s/g, "_")]: uploadedFileURL,
        }));
      } else {
        setPayload((prevState) => ({
          ...prevState,
          [e.target.name]: [...payload[e.target.name], ...uploadedFileURL],
        }));
      }

      setUploadReset(true);
      setUploading(false);
      setSelectedFiles([...files]);
      setUploadedFileURLs([]);
      dispatch({ type: HIDE_LOADER });
      // setUploadValue(-100);
    } else {
      toast.error(`Max ${5} files can be uploaded`);
      setUploading(false);
      dispatch({ type: HIDE_LOADER });
    }
    e.target.value = null;
  };

  const updateFieldChanged = (e, index, type = null, name) => {
    let newArr = documentPayload.map((item, i) => {
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
    setDocumentPayload(newArr);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (payload) {
      let modified_data = documentPayload?.map((data, i) => {
        if (i === 0) {
          return { ...data, passport_urls: payload?.passport_url };
        }
        if (i === 1) {
          return { ...data, visa_urls: payload?.visa_url };
        }
        if (i === 2) {
          return { ...data, emirates_urls: payload?.emirates_url };
        }
        if (i === 3) {
          return { ...data, driver_license_urls: payload?.driver_license_url };
        }
        if (i === 4) {
          return { ...data, labour_card_urls: payload?.labour_card_url };
        } else {
          return { ...data, [data.name]: payload[data.name] };
        }
      });
      let finalPayload = {
        ...{
          id: userData?.id ?? props?.userId,
          visa_type: documentPayload[1]?.visa_type,
          visa_sponsor: documentPayload[1]?.visa_sponsor,
        },
        documents_details: modified_data,
      };
      props?.setErrorMsg("");
      props.setSubmit(true);
      dispatch(UpdateUser(finalPayload));
    }
  };

  const OtherDocumentDetails = (item, i) => {
    return (
      <div className="hovercard m-b-30 m-t-30" key={i}>
        <div className="form-row">
          <Row>
            <Col md="4 mb-3">
              <Label>Document Name</Label>
              <input
                className="form-control"
                name="name"
                type="text"
                placeholder="Document Title"
                value={documentPayload[i]?.name}
                onChange={(e) => updateFieldChanged(e, i)}
              />
              <div className="valid-feedback">{"Looks good!"}</div>
            </Col>
            <Col md="4 mb-3">
              <Label>Document No.</Label>
              <input
                className="form-control"
                name="document_no"
                type="text"
                placeholder="Document No."
                value={documentPayload[i]?.document_no}
                onChange={(e) => updateFieldChanged(e, i)}
              />
              <div className="valid-feedback">{"Looks good!"}</div>
            </Col>
            <Col md="4 mb-3">
              <Label>{"Document Expiry Date"}</Label>
              <input
                className="form-control"
                name="document_expiry"
                type="date"
                value={documentPayload[i]?.document_expiry}
                onChange={(e) =>
                  updateFieldChanged(e, i, "date", "document_expiry")
                }
              />
              <div className="valid-feedback">{"Looks good!"}</div>
            </Col>
            <Col md="4 mb-3">
              <Label>{"Files"}</Label>
              <Input
                className="form-control"
                type="file"
                name="documents"
                multiple
                // value={selectedFiles}
                onChange={(e) => handleFile(e, i)}
              />
              {payload[item?.name?.replace(/\s/g, "_")]?.length > 0 && (
                <span>
                  {payload[item?.name?.replace(/\s/g, "_")].map((file) => (
                    <>
                      <div style={{ display: "flex" }}>
                        <div
                          onClick={() => dispatch(download(file?.url))}
                          style={{ cursor: "pointer" }}
                        >
                          {file.file_name}
                        </div>
                        <X
                          className="close-search"
                          onClick={() => {
                            setPayload((prevState) => ({
                              ...prevState,
                              [documentPayload[i]?.name?.replace(/\s/g, "_")]:
                                payload[
                                  item?.name?.replace(/\s/g, "_")
                                ]?.filter((item) => item.url != file.url),
                            }));
                          }}
                          style={{ marginBottom: -5 }}
                        />
                        {" , "}
                      </div>
                    </>
                  ))}
                </span>
              )}
              <div className="valid-feedback">{"Looks good!"}</div>
            </Col>

            <div className=" text-end">
              <p
                style={{ color: "red" }}
                onClick={() => {
                  setDocumentPayload(
                    documentPayload.filter(function (item, index) {
                      return index !== i;
                    })
                  );
                  setOtherDocFormState(otherDocFormState - 1);
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

  console.log("payload.emirates_url", payload.emirates_url);

  return (
    <Fragment>
      <Row>
        <Col sm="12">
          <Form className="needs-validation" onSubmit={onSubmit}>
            <div className="d-flex w-100 justify-content-center m-t-20">
              <H5 attrH5={{ className: "mb-1" }}>{"Passport Details"}</H5>
            </div>
            <div className="hovercard m-b-30 m-t-30">
              <div className="form-row">
                <Row>
                  <Col md="4 mb-3">
                    <Label>Passport No.</Label>
                    <input
                      className="form-control"
                      name="passport_no"
                      type="text"
                      placeholder="Passport No."
                      value={documentPayload[0]?.passport_no}
                      onChange={(e) => updateFieldChanged(e, 0)}
                    />
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                  <Col md="4 mb-3">
                    <Label>{"Passport Expiry Date"}</Label>
                    <input
                      className="form-control"
                      name="passport_expiry"
                      type="date"
                      value={documentPayload[0]?.passport_expiry}
                      onChange={(e) =>
                        updateFieldChanged(e, 0, "date", "passport_expiry")
                      }
                    />
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                  <Col md="4 mb-3">
                    <Label>{"Files"}</Label>
                    <Input
                      className="form-control"
                      type="file"
                      name="passport_url"
                      multiple
                      // value={selectedFiles}
                      onChange={handleFile}
                    />
                    {payload?.passport_url.length > 0 && (
                      <span>
                        {payload?.passport_url.map((file) => (
                          <>
                            <div style={{ display: "flex" }}>
                              <div
                                onClick={() => dispatch(download(file?.url))}
                                style={{ cursor: "pointer" }}
                              >
                                {file.file_name}
                              </div>
                              <X
                                className="close-search"
                                onClick={() => {
                                  setPayload((prevState) => ({
                                    ...prevState,
                                    passport_url: payload?.passport_url?.filter(
                                      (item) => item.url != file.url
                                    ),
                                  }));
                                }}
                                style={{ marginBottom: -5 }}
                              />
                              {" , "}
                            </div>
                          </>
                        ))}
                      </span>
                    )}
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="d-flex w-100 justify-content-center">
              <H5 attrH5={{ className: "mb-1" }}>{"Visa Details"}</H5>
            </div>
            <div className="hovercard m-b-30 m-t-30">
              <div className="form-row">
                <Row>
                  <Col md="4 mb-3">
                    <Label>Visa No.</Label>
                    <input
                      className="form-control"
                      name="visa_no"
                      type="text"
                      placeholder="Visa No."
                      value={documentPayload[1]?.visa_no}
                      onChange={(e) => updateFieldChanged(e, 1)}
                    />
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                  <Col md="4 mb-3">
                    <Label>{"Visa expiry date"}</Label>
                    <input
                      className="form-control"
                      name="visa_expiry"
                      type="date"
                      value={documentPayload[1]?.visa_expiry}
                      onChange={(e) =>
                        updateFieldChanged(e, 1, "date", "visa_expiry")
                      }
                    />

                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                  <Col md="4 mb-3">
                    <Label>{"Files"}</Label>
                    <Input
                      className="form-control"
                      type="file"
                      name="visa_url"
                      multiple
                      // value={selectedFiles}
                      onChange={handleFile}
                    />
                    {payload.visa_url?.length > 0 && (
                      <span>
                        {payload?.visa_url.map((file) => (
                          <>
                            <div style={{ display: "flex" }}>
                              <div
                                onClick={() => dispatch(download(file?.url))}
                                style={{ cursor: "pointer" }}
                              >
                                {file.file_name}
                              </div>
                              <X
                                className="close-search"
                                onClick={() => {
                                  setPayload((prevState) => ({
                                    ...prevState,
                                    visa_url: payload?.visa_url?.filter(
                                      (item) => item.url != file.url
                                    ),
                                  }));
                                }}
                                style={{ marginBottom: -5 }}
                              />
                              {" , "}
                            </div>
                          </>
                        ))}
                      </span>
                    )}
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                  <Col md="4 mb-3">
                    <Label>Visa Type</Label>
                    <Select
                      options={visaTypes}
                      className="js-example-basic-single col-sm-12"
                      name="visa_type"
                      value={{
                        label: documentPayload[1]?.visa_type,
                        value: documentPayload[1]?.visa_type,
                      }}
                      isDisabled={getRoleBasedAccess()}
                      onChange={(e) =>
                        updateFieldChanged(e, 1, "select", "visa_type")
                      }
                    />
                  </Col>
                  {documentPayload[1]?.visa_type && (
                    <Col md="4 mb-3">
                      <Label>Visa Sponsor</Label>
                      <Select
                        options={visaSponsors}
                        className="js-example-basic-single col-sm-12"
                        name="visa_sponsor"
                        value={{
                          label: documentPayload[1]?.visa_sponsor,
                          value: documentPayload[1]?.visa_sponsor,
                        }}
                        isDisabled={getRoleBasedAccess()}
                        onChange={(e) =>
                          updateFieldChanged(e, 1, "select", "visa_sponsor")
                        }
                      />
                    </Col>
                  )}
                </Row>
              </div>
            </div>
            <div className="d-flex w-100 justify-content-center">
              <H5 attrH5={{ className: "mb-1" }}>{"Emirates ID details"}</H5>
            </div>
            <div className="hovercard m-b-30 m-t-30">
              <div className="form-row">
                <Row>
                  <Col md="4 mb-3">
                    <Label>Emirates ID No.</Label>
                    <input
                      className="form-control"
                      name="emirates_id"
                      type="text"
                      placeholder="Emirates ID No."
                      value={documentPayload[2]?.emirates_id}
                      onChange={(e) => updateFieldChanged(e, 2)}
                    />
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                  <Col md="4 mb-3">
                    <Label>{"Emirate expiry date"}</Label>
                    <input
                      className="form-control"
                      name="emirate_expiry"
                      type="date"
                      placeholder="Emirate Expiry Date"
                      value={documentPayload[2]?.emirate_expiry}
                      onChange={(e) =>
                        updateFieldChanged(e, 2, "date", "emirate_expiry")
                      }
                    />
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                  <Col md="4 mb-3">
                    <Label>{"Files"}</Label>
                    <Input
                      className="form-control"
                      type="file"
                      name="emirates_url"
                      multiple
                      // value={selectedFiles}
                      onChange={handleFile}
                    />
                    {payload.emirates_url?.length > 0 && (
                      <span>
                        {payload?.emirates_url.map((file) => (
                          <>
                            <div style={{ display: "flex" }}>
                              <div
                                onClick={() => dispatch(download(file?.url))}
                                style={{ cursor: "pointer" }}
                              >
                                {file.file_name}
                              </div>
                              <X
                                className="close-search"
                                onClick={() => {
                                  setPayload((prevState) => ({
                                    ...prevState,
                                    emirates_url: payload?.emirates_url?.filter(
                                      (item) => item.url != file.url
                                    ),
                                  }));
                                }}
                                style={{ marginBottom: -5 }}
                              />
                              {" , "}
                            </div>
                          </>
                        ))}
                      </span>
                    )}
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="d-flex w-100 justify-content-center">
              <H5 attrH5={{ className: "mb-1" }}>
                {"Driving license Details"}
              </H5>
            </div>
            <div className="hovercard m-b-30 m-t-30">
              <div className="form-row">
                <Row>
                  <Col md="4 mb-3">
                    <Label>Driving License No.</Label>
                    <input
                      className="form-control"
                      name="driving_license_no"
                      type="text"
                      placeholder="Driving License No."
                      value={documentPayload[3]?.driving_license_no}
                      onChange={(e) => updateFieldChanged(e, 3)}
                    />
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                  <Col md="4 mb-3">
                    <Label>{"Driving license expiry date"}</Label>
                    <input
                      className="form-control"
                      name="driving_license_expiry"
                      type="date"
                      value={documentPayload[3]?.driving_license_expiry}
                      onChange={(e) =>
                        updateFieldChanged(
                          e,
                          3,
                          "date",
                          "driving_license_expiry"
                        )
                      }
                    />
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                  <Col md="4 mb-3">
                    <Label>{"Files"}</Label>
                    <Input
                      className="form-control"
                      type="file"
                      name="driver_license_url"
                      multiple
                      // value={selectedFiles}
                      onChange={handleFile}
                    />
                    {payload?.driver_license_url.length > 0 && (
                      <span>
                        {payload?.driver_license_url.map((file) => (
                          <>
                            <div style={{ display: "flex" }}>
                              <div
                                onClick={() => dispatch(download(file?.url))}
                                style={{ cursor: "pointer" }}
                              >
                                {file.file_name}
                              </div>
                              <X
                                className="close-search"
                                onClick={() => {
                                  setPayload((prevState) => ({
                                    ...prevState,
                                    driver_license_url:
                                      payload?.driver_license_url?.filter(
                                        (item) => item.url != file.url
                                      ),
                                  }));
                                }}
                                style={{ marginBottom: -5 }}
                              />
                              {" , "}
                            </div>
                          </>
                        ))}
                      </span>
                    )}
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="d-flex w-100 justify-content-center">
              <H5 attrH5={{ className: "mb-1" }}>{"Labour Card Details"}</H5>
            </div>
            <div className="hovercard m-b-30 m-t-30">
              <div className="form-row">
                <Row>
                  <Col md="4 mb-3">
                    <Label>Labour card number</Label>
                    <input
                      className="form-control"
                      name="labour_card_no"
                      type="text"
                      placeholder="Labour card number"
                      value={documentPayload[4]?.labour_card_no}
                      onChange={(e) => updateFieldChanged(e, 4)}
                    />
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                  <Col md="4 mb-3">
                    <Label>{"Driving license expiry date"}</Label>
                    <input
                      className="form-control"
                      name="labour_card_expiry"
                      type="date"
                      value={documentPayload[4]?.labour_card_expiry}
                      onChange={(e) =>
                        updateFieldChanged(e, 4, "date", "labour_card_expiry")
                      }
                    />
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                  <Col md="4 mb-3">
                    <Label>{"Files"}</Label>
                    <Input
                      className="form-control"
                      type="file"
                      name="labour_card_url"
                      multiple
                      // value={selectedFiles}
                      onChange={handleFile}
                    />
                    {payload?.labour_card_url.length > 0 && (
                      <span>
                        {payload?.labour_card_url.map((file) => (
                          <>
                            <div style={{ display: "flex" }}>
                              <div
                                onClick={() => dispatch(download(file?.url))}
                                style={{ cursor: "pointer" }}
                              >
                                {file.file_name}
                              </div>
                              <X
                                className="close-search"
                                onClick={() => {
                                  setPayload((prevState) => ({
                                    ...prevState,
                                    labour_card_url:
                                      payload?.labour_card_url?.filter(
                                        (item) => item.url != file.url
                                      ),
                                  }));
                                }}
                                style={{ marginBottom: -5 }}
                              />
                              {" , "}
                            </div>
                          </>
                        ))}
                      </span>
                    )}
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="d-flex w-100 justify-content-center">
              <H5 attrH5={{ className: "mb-1" }}>{"Other Documents"}</H5>
            </div>
            {documentPayload.map((item, i) => {
              console.log("OtherDocumentDetails", i);
              return i > 4 && OtherDocumentDetails(item, i);
            })}

            <div className="m-t-10 text-center">
              <p
                style={{ color: "blue" }}
                onClick={() => {
                  setOtherDocFormState(otherDocFormState + 1);
                  console.log("setOtherDocFormState", documentPayload);
                  setDocumentPayload([
                    ...documentPayload,
                    {
                      name: "document_" + Math.random(),
                      document_no: "",
                      document_expiry: "",
                    },
                  ]);
                }}
              >
                {" "}
                + Add more field
              </p>
            </div>
            <div className="d-flex justify-content-end m-t-10">
              <Btn
                attrBtn={{
                  color: "primary d-flex align-items-end",
                  type: "submit",
                }}
              >
                {"Submit"}
              </Btn>
            </div>
          </Form>
        </Col>
        {/* )} */}
      </Row>
    </Fragment>
  );
};

export default AddDocuments;
