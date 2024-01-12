import React, { Fragment, useState } from "react";
import { Col, Nav, NavItem, NavLink } from "reactstrap";
import { Image, H6, P } from "../../../../../AbstractElements";

const NavOrg = ({ callback, exp }) => {
  const [orgactiveTab, setorgActiveTab] = useState(1);
  return (
    <Fragment>
      <Col md="4" className="xl-50">
        <Nav
          className="flex-column nav-pills"
          id="v-pills-tab1"
          role="tablist"
          aria-orientation="vertical"
        >
          {exp.map((item, i) => {
            console.log("NavOrg item", i);
            return (
              <NavItem id="myTab" role="tablist" key={i}>
                <NavLink
                  href="#javaScript"
                  className={orgactiveTab === i + 1 ? "active" : ""}
                  onClick={() => {
                    setorgActiveTab(i + 1);
                    callback(i + 1);
                  }}
                >
                  <div className="media">
                    <Image
                      attrImage={{
                        className: "p-0 img-50 img-fluid m-r-20 rounded-circle",
                        src: `${require(`../../../../../assets/images/rapid-small-logo.png`)}`,
                        alt: "",
                      }}
                    />
                    <div className="media-body">
                      <H6>{item?.degree}</H6>
                      <P>{item?.specialization}</P>
                    </div>
                  </div>
                </NavLink>
              </NavItem>
            );
          })}
        </Nav>
      </Col>
    </Fragment>
  );
};

export default NavOrg;
