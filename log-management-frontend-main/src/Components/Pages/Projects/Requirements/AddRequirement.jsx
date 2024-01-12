import React, { Fragment, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { Breadcrumbs, Btn, H5, P } from "../../../../AbstractElements";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import Dropzone from "react-dropzone-uploader";
import DataTableComponent from "../../../Tables/DataTable/DataTableComponent";
import {
  createRequirementRequest,
  getRequestRequirement,
  listProjects,
} from "../../../../redux/actions/projectActions";
import { productList } from "../../../../redux/actions/procurementActions";
import { useNavigate, useParams } from "react-router";
import { isEmpty } from "../../../../redux/constants";
import { toast } from "react-toastify";
import { GET_REQUIREMENT_REQUEST_SUCCESS } from "../../../../redux/actions/types";

const AddRequirement = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { id } = useParams();

  const [projects, setProjects] = useState([]);
  const [payload, setPayload] = useState({
    title: "",
    description: "",
    project_id: null,
  });
  const [products, setProducts] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [submit, setSubmit] = useState(false);

  const [dimensionsData, setDimensionsData] = useState([
    {
      attr: "",
      value: "",
    },
  ]);

  const initial_item = {
    product_id: null,
    name: "",
    description: "",
    brand: "",
    model: "",
    dimensions: {},
    notes: null,
    quantity: 0,
    is_mandatory: false,
  };
  const [item, setItem] = useState(initial_item);

  const {
    projectsList,
    createRequirementRes,
    updateRequirementRes,
    requirementRequestRes,
    error,
  } = useSelector((state) => state.projectRes);
  const { productsListData } = useSelector((state) => state.procurementRes);

  useEffect(() => {
    dispatch(listProjects());
    dispatch(productList());
  }, []);

  useEffect(() => {
    if (!isEmpty(id)) {
      dispatch(getRequestRequirement(id));
    } else {
      dispatch({ type: GET_REQUIREMENT_REQUEST_SUCCESS, payload: {} });
    }
  }, [id]);

  console.log("requirementRequestRes", requirementRequestRes);

  useEffect(() => {
    if (!isEmpty(requirementRequestRes)) {
      setPayload({
        title: requirementRequestRes?.title,
        description: requirementRequestRes?.description,
        project_id: requirementRequestRes?.project.id,
        label: requirementRequestRes?.project.name,
      });
      if (requirementRequestRes?.products) {
        setProducts(requirementRequestRes?.products);
      }
    }
  }, [requirementRequestRes]);
  useEffect(() => {
    if (submit) {
      if (Object.keys(createRequirementRes).length !== 0) {
        setSubmit(false);
        history(`${process.env.PUBLIC_URL}/organization/employee`);
      } else if (!!error?.data) {
        setSubmit(false);
        console.log("VERIFY ", error);
      }
    }
  }, [createRequirementRes]);

  console.log("dimensionsData!!", dimensionsData[dimensionsData?.length - 1]);

  useEffect(() => {
    let allProjects = projectsList?.map((project) => {
      return {
        label: project?.name,
        value: project?.id,
      };
    });
    setProjects(allProjects);
  }, [projectsList]);
  useEffect(() => {
    let allProjects = productsListData?.map((project) => {
      return {
        label: project?.name,
        value: project?.id,
      };
    });

    console.log("productsListData", productsListData, allProjects);
    setProductsList(allProjects);
  }, [productsListData]);

  const getUploadParams = ({ meta }) => {
    return {
      // url: 'https://httpbin.org/post',
    };
  };
  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {};

  const updateFieldChanged = (e, index, type = null, name) => {
    console.log("updateFieldChanged", e, index, type, name);
    let newArr = dimensionsData.map((item, i) => {
      if (index === i) {
        console.log("updateFieldChanged", item, i);
        if (type === "select") {
          return { ...item, [name]: e.value };
        } else if (type === "date") {
          return { ...item, [name]: e.target.value };
        } else {
          return { ...item, [name]: e.target.value };
        }
      } else {
        return item;
      }
    });
    console.log("updateFieldChanged", newArr);
    setDimensionsData(newArr);
  };

  const handleOnChange = (e, type = null, name) => {
    if (type === "select") {
      setPayload({ ...payload, [name]: e.value });
    } else if (type === "date") {
      setPayload({ ...payload, [name]: moment(e).format("YYYY-MM-DD") });
    } else {
      setPayload({ ...payload, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isEmpty(products)) {
      setSubmit(true);
      dispatch(createRequirementRequest({ ...payload, products: products }));
    } else {
      toast.error("Please add some products first");
    }
    console.log("dimensionsData", dimensionsData, products);
  };

  const productColumns = [
    {
      name: "S. No.",
      cell: (row, index) => index + 1,
      width: "4.25rem",
      center: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      center: false,
    },
    {
      name: "Brand",
      selector: (row) => row.brand,
      sortable: true,
      center: false,
    },
    {
      name: "Model",
      selector: (row) => row.model,
      sortable: true,
      center: false,
    },
    {
      name: "Quantity",
      selector: (row) => `${row.quantity}`,
      sortable: true,
      center: true,
    },
    {
      name: "Is Mandatory",
      selector: (row) => `${row.is_mandatory ? "Yes" : "No"}`,
      sortable: true,
      center: true,
    },
    {
      name: "Action",
      selector: (row, index) => {
        return (
          <>
            <Btn
              theme="danger"
              onClick={() => {
                setProducts(products.filter((obj, i) => i != index));
              }}
            >
              Delete
            </Btn>
          </>
        );
      },
      sortable: false,
      center: false,
    },
  ];

  const ExpandedComponent = ({ data }) =>
    data.dimensions ? (
      <>
        <div
          style={{
            backgroundColor: "#f7f8f9",
            padding: "1rem",
            // boxShadow: "inset 0 0 4px #aeaeae"
          }}
        >
          <H5> Dimensions </H5>
          {!isEmpty(data?.dimensions) &&
            data?.dimensions?.map((item, i) => {
              return (
                <Row>
                  <Col>
                    <P>{item?.attr ?? "NA"}</P>
                  </Col>
                  " : "
                  <Col>
                    <P>{item?.value ?? "NA"}</P>
                  </Col>
                </Row>
              );
            })}
        </div>
      </>
    ) : (
      <></>
    );

  const AddItem = () => {
    const [dimension, setDimension] = useState("");
    const [value, setValue] = useState("");
    return (
      <>
        <Card>
          <CardBody>
            <Row className="m-b-20">
              <Col style={{ textAlign: "center" }}>
                <H5>Item's Details</H5>
              </Col>
            </Row>
            <Row className="m-b-10">
              <Col md="4">
                <FormGroup>
                  <Label>Product Title*</Label>
                  <CreatableSelect
                    isClearable
                    options={productsList} // Product List will appended here
                    className=""
                    name="product_id"
                    onChange={(e) => {
                      setItem({
                        ...item,
                        product_id: e?.value,
                        name: e?.label,
                      });
                    }}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Brand*</Label>
                  <input
                    className="form-control"
                    name="brand"
                    placeholder="" //Product List will be there (in case of new product -> help user to add accordingly)
                    onChange={(e) =>
                      setItem({
                        ...item,
                        brand: e?.target?.value,
                      })
                    }
                    required
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Model*</Label>
                  <input
                    className="form-control"
                    name="model"
                    placeholder="" //Product List will be there (in case of new product -> help user to add accordingly)
                    onChange={(e) =>
                      setItem({
                        ...item,
                        model: e?.target?.value,
                      })
                    }
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="m-b-10">
              <Col>
                <FormGroup>
                  <Label>Description</Label>
                  <textarea
                    className="form-control"
                    style={{
                      border: "1px solid #ced4da",
                      borderRadius: "0.375rem",
                    }}
                    name="description"
                    rows="2"
                    required
                    onChange={(e) =>
                      setItem({
                        ...item,
                        description: e?.target?.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            {dimensionsData &&
              dimensionsData?.length > 1 &&
              dimensionsData.map((item, i) => {
                if (i !== dimensionsData?.length - 1)
                  return (
                    <Row>
                      <Col md="4 mb-3">
                        <FormGroup>
                          <Label>Attribute Name</Label>
                          <input
                            className="form-control"
                            placeholder="Ex. Length / Height / Power / Weight"
                            value={item.attr}
                            onChange={(e) =>
                              updateFieldChanged(e, i, null, "attr")
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4 mb-3">
                        <FormGroup>
                          <Label>Attribute Value</Label>
                          <input
                            className="form-control"
                            placeholder="Ex. 80 cm / 30 inch / 12 W / 100 kg"
                            value={item.value}
                            onChange={(e) =>
                              updateFieldChanged(e, i, null, "value")
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col
                        md="4 mb-3"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Btn
                          attrBtn={{ color: "transparent" }}
                          onClick={() => {
                            let newDimensions = dimensionsData.filter(function (
                              obj,
                              index
                            ) {
                              return index !== i;
                            });
                            //   delete newDimensions[`${key}`];
                            setDimensionsData(newDimensions);
                          }}
                          style={{ color: "red", padding: "0" }}
                        >
                          - Remove
                        </Btn>
                      </Col>
                    </Row>
                  );
              })}
            <Row>
              <Col md="4 mb-3">
                <FormGroup>
                  <Label>Dimension Attribute</Label>
                  <input
                    className="form-control"
                    placeholder="Ex. Length / Height / Power / Weight"
                    value={dimensionsData[dimensionsData?.length - 1].attr}
                    onChange={(e) => {
                      updateFieldChanged(
                        e,
                        dimensionsData?.length - 1,
                        null,
                        "attr"
                      );
                    }}
                  />
                </FormGroup>
              </Col>
              <Col md="4 mb-3">
                <Label>Dimension Value</Label>
                <FormGroup>
                  <input
                    className="form-control"
                    placeholder="Ex. 80 cm / 30 inch / 12 W / 100 kg"
                    onChange={(e) =>
                      updateFieldChanged(
                        e,
                        dimensionsData?.length - 1,
                        null,
                        "value"
                      )
                    }
                    value={dimensionsData[dimensionsData?.length - 1].value}
                  />
                </FormGroup>
              </Col>
              <Col
                md="4 mb-3"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Btn
                  attrBtn={{ color: "transparent" }}
                  onClick={() => {
                    dimensionsData[dimensionsData?.length - 1].attr &&
                      dimensionsData[dimensionsData?.length - 1].value &&
                      setDimensionsData([
                        ...dimensionsData,
                        { attr: "", value: "" },
                      ]);
                  }}
                  style={{ color: "#7366ff", padding: "0" }}
                >
                  + Add Extra Attribute
                </Btn>
              </Col>
            </Row>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label>Required Quantity*</Label>
                  <input
                    className="form-control"
                    name="quantity"
                    type="tel"
                    pattern="\d+"
                    minLength="1"
                    maxLength="10"
                    onChange={(e) =>
                      setItem({
                        ...item,
                        quantity: e.target.value,
                      })
                    }
                    required
                  />
                  <span style={{ color: "red" }}></span>
                </FormGroup>
              </Col>
              <Col>
                <Label>{}</Label>
                <FormGroup check>
                  <div
                    className="checkbox checkbox-dark m-squar m-l-10"
                    style={{ display: "grid", placeItems: "end" }}
                  >
                    <input
                      id="is_mandatory"
                      name="is_mandatory"
                      type="checkbox"
                      onChange={(e) =>
                        setItem({
                          ...item,
                          is_mandatory: e.target.checked,
                        })
                      }
                      checked={item.is_mandatory}
                    />
                    <Label className="mt-0" for="is_mandatory">
                      Is Mandatory?
                    </Label>
                  </div>
                </FormGroup>
              </Col>
            </Row>
            <Row className="m-b-30 d-flex flex-row-reverse">
              <Col style={{ display: "grid", placeItems: "end" }}>
                <Btn
                  attrBtn={{ color: "primary d-flex align-items-end" }}
                  onClick={() => {
                    if (
                      item?.name &&
                      item?.brand &&
                      item?.model &&
                      !isEmpty(dimensionsData)
                    ) {
                      let items = { ...item, dimensions: dimensionsData };
                      setProducts([...products, items]);
                      setItem(initial_item);
                    } else {
                      toast.error("Please fill required detail first.");
                    }
                  }}
                >
                  + Add Item
                </Btn>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Row>
                    <Col
                      style={{
                        marginInline: "0.75rem",
                        border: "1px solid #ced4da",
                        borderRadius: "0.375rem",
                        overflow: "hidden",
                      }}
                    >
                      <Row
                        style={{
                          padding: "1rem 0.4rem",
                          background: "rgba(115, 102, 255, 0.2)",
                          borderBlockEnd: "1px solid #ced4da",
                        }}
                      >
                        <Col>
                          <DataTableComponent
                            data={products}
                            tableColumns={productColumns}
                            noDataComponent={<NoItemsAdded />}
                            expandableRows
                            expandableRowsComponent={ExpandedComponent}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </>
    );
  };

  const NoItemsAdded = () => {
    return (
      <div style={{ padding: "1.5rem", color: "gray" }}>
        <p>There are no items added yet!</p>
      </div>
    );
  };

  return (
    <Fragment>
      <Breadcrumbs
        parent="Projects / Requirements"
        title="Create"
        mainTitle="Requirement"
      />
      <Container fluid={true}>
        <Form className="theme-form" onSubmit={onSubmit}>
          <Row>
            <Col sm="12">
              <Card>
                <CardBody>
                  <Row className="m-b-20">
                    <Col style={{ textAlign: "center" }}>
                      <H5>Requirement Details</H5>
                    </Col>
                  </Row>
                  <Row className="m-b-10">
                    <Col md="8">
                      <FormGroup>
                        <Label>Name</Label>
                        <input
                          className="form-control"
                          name="title"
                          placeholder="Requirement title"
                          onChange={handleOnChange}
                          value={payload.title}
                          required
                        />
                        {/* <span style={{ color: "red" }}>
                          {"Title is required"}
                        </span> */}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Project</Label>
                        <Select
                          options={projects}
                          className=""
                          name="project_id"
                          value={{
                            label: payload.label,
                            value: payload.project_id,
                          }}
                          onChange={(e) =>
                            handleOnChange(e, "select", "project_id")
                          }
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>Description</Label>
                        <textarea
                          className="form-control"
                          style={{
                            border: "1px solid #ced4da",
                            borderRadius: "0.375rem",
                          }}
                          name="description"
                          rows="3"
                          onChange={handleOnChange}
                          value={payload.description}
                          required
                        />
                        <span style={{ color: "red" }}></span>
                      </FormGroup>
                    </Col>
                  </Row>
                  {/* <Row>
                    <Col>
                      <FormGroup>
                        <Label>Upload Relevant Documents</Label>
                        <Dropzone
                          className="dropzone dz-clickable"
                          getUploadParams={getUploadParams}
                          onChangeStatus={handleChangeStatus}
                          maxFiles={5}
                          multiple={false}
                          canCancel={false}
                          inputContent="Drop your files here.."
                          styles={{
                            dropzone: { width: "100%", height: 150 },
                            dropzoneActive: { borderColor: "green" },
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row> */}
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>{AddItem()}</Col>
          </Row>
          <Row>
            <Col>
              <div
                className="d-flex justify-content-center m-b-20"
                style={{ gap: "1rem" }}
              >
                <Btn
                  attrBtn={{
                    color: "secondary d-flex align-items-end",
                    type: "button",
                  }}
                >
                  Cancel Request
                </Btn>
                <Btn
                  attrBtn={{
                    color: "primary d-flex align-items-end",
                    type: "submit",
                  }}
                >
                  Submit Request
                </Btn>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    </Fragment>
  );
};

export default AddRequirement;
