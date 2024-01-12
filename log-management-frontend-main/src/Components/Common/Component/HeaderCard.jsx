import { Btn, H5 } from "../../../AbstractElements";
import React, { Fragment } from "react";
import { CardHeader, Col, Row } from "reactstrap";
import { useNavigate } from "react-router";

const HeaderCard = ({ title, span1, span2, mainClasses, user = null }) => {
  console.log("HeaderCard user", user);
  const history = useNavigate();
  return (
    <Fragment>
      <CardHeader className={`${mainClasses ? mainClasses : ""}`}>
        {user ? (
          <Col className="d-flex justify-space-between">
            <div>
              <H5>{title}</H5>
              {span1 ? <span>{span1}</span> : ""}
              {span2 ? <span>{span2}</span> : ""}
            </div>
            <div>
              <Btn
                attrBtn={{
                  onClick: (e) =>
                    history(`/organization/employee/edit-employee/${user.id}`),
                  color: "primary",
                  // className: "md-sidebar-toggle",
                }}
              >
                Edit Profile
              </Btn>
            </div>
          </Col>
        ) : (
          <>
            {" "}
            <H5>{title}</H5>
            {span1 ? <span>{span1}</span> : ""}
            {span2 ? <span>{span2}</span> : ""}
          </>
        )}
      </CardHeader>
    </Fragment>
  );
};

export default HeaderCard;
