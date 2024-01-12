import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { Btn, H6 } from "../../../../AbstractElements";
import {
  activeRFQListcolumns,
  productData,
} from "../../../../Data/Table/Defaultdata";
import {
  listIntents,
  vendorListRFQs,
  wantToBid,
} from "../../../../redux/actions/procurementActions";
import {
  calculateDaysLeft,
  getCurrentUser,
  isEmpty,
} from "../../../../redux/constants";
import HeaderCard from "../../../Common/Component/HeaderCard";
import RequirementList from "./RequirementList";

const Dashboard = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [submit, setSubmit] = useState(false);
  const { vendorRfqs, vendorWantsToBidSuccess, intentListRes, error } =
    useSelector((state) => {
      return state.procurementRes;
    });
  const [vendorRFQsList, setVendorRFQsList] = useState([]);
  useEffect(async () => {
    dispatch(listIntents({ vendor_id: await getCurrentUser().id }));
  }, []);

  useEffect(() => {
    dispatch(vendorListRFQs());
  }, []);

  console.log("intentListRes", intentListRes);

  useEffect(() => {
    if (submit) {
      if (Object.keys(vendorWantsToBidSuccess).length !== 0) {
        setSubmit(false);
        dispatch(vendorListRFQs());
      } else if (!!error?.data) {
        setSubmit(false);
      }
    }
  }, [vendorWantsToBidSuccess]);

  useEffect(() => {
    if (!isEmpty(vendorRfqs)) {
      const style = {
        width: 40,
        height: 40,
      };
      const style2 = { width: 120, fontSize: 14, padding: 4 };
      let cc = vendorRfqs?.map((item, i) => {
        return {
          // image: <Image attrImage={{ src: product1, style: style, alt: "" }} />,
          Details: (
            <div>
              <H6>{item.title}</H6>
              <span>{item?.description}</span>
            </div>
          ),
          amount: "$10",
          stock: (
            <div
              className={
                calculateDaysLeft(item.expire_at) > 0
                  ? "font-success"
                  : "font-danger"
              }
            >
              {calculateDaysLeft(item.expire_at) > 0
                ? calculateDaysLeft(item.expire_at) > 4
                  ? "Open"
                  : "About To End"
                : "Expired"}
            </div>
          ),
          start_date: moment(new Date(item?.expire_at)).format(
            "DD-MM-YYYY hh:mm A"
          ),

          action: (
            <div>
              {intentListRes.find((obj) => obj.rfq_id == item.id) ? (
                <span>
                  <Btn
                    attrBtn={{
                      style: style2,
                      color: "success",
                      className: "btn btn-xs",
                      type: "button",
                    }}
                    onClick={() => {
                      history(
                        `${process.env.PUBLIC_URL}/bid/${item.id}/${intentListRes.find((obj) => obj.rfq_id == item.id)?.id
                        }`
                      );
                    }}
                  >
                    Open Bid{" "}
                  </Btn>
                </span>
              ) : (
                <span>
                  <Btn
                    attrBtn={{
                      style: style2,
                      color: "primary",
                      className: "btn btn-xs",
                      type: "button",
                    }}
                    onClick={async () => {
                      setSubmit(true);
                      dispatch(
                        wantToBid({
                          rfq_id: item?.id,
                          vendor_id: await getCurrentUser()?.id,
                        })
                      );
                    }}
                  >
                    Want to Bid{" "}
                  </Btn>
                </span>
              )}
            </div>
          ),
        };
      });
      console.log("setVendorRFQsList", cc);
      setVendorRFQsList(cc);
    }
  }, [vendorRfqs, intentListRes]);

  return (
    <Fragment>
      {/* <Breadcrumbs parent="Ecommerce" title="Products List" mainTitle="Products List" /> */}
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card className="m-t-30">
              <HeaderCard
                title={"Requirements"}
              // span1={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
              />
              <CardBody>
                <Fragment>
                  <div className="table-responsive product-table">
                    <DataTable
                      noHeader
                      pagination
                      paginationServer
                      columns={activeRFQListcolumns}
                      data={vendorRFQsList}
                      highlightOnHover={true}
                      striped={true}
                      responsive={true}
                    />
                  </div>
                </Fragment>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Dashboard;
