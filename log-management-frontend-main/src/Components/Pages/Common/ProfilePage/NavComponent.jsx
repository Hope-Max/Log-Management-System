import { Nav, NavItem } from "reactstrap";
import React, { Fragment, useState } from "react";
import '../index.scss';

const NavComponent = ({ callbackActive }) => {
  const [activeTab, setActiveTab] = useState("1");

  return (
    <Fragment>
      <Nav className="main-menu contact-options" role="tablist">
        <NavItem>
          <a
            href
            className={activeTab === "1" ? "active" : ""}
            onClick={() => {
              setActiveTab("1");
              callbackActive("1");
            }}
          >
            <span className="title"> {"Personal Details"}</span>
          </a>
        </NavItem>
        <NavItem>
          <a
            href
            className={activeTab === "2" ? "active" : ""}
            onClick={() => {
              setActiveTab("2");
              callbackActive("2");
            }}
          >
            <span className="title"> {"Work Details"}</span>
          </a>
        </NavItem>
        <NavItem>
          <a
            href
            className={activeTab === "3" ? "active" : ""}
            onClick={() => {
              setActiveTab("3");
              callbackActive("3");
            }}
          >
            <span className="title">{"Past Work Experiences"}</span>
          </a>
        </NavItem>
        <NavItem>
          <a
            href
            className={activeTab === "4" ? "active" : ""}
            onClick={() => {
              setActiveTab("4");
              callbackActive("4");
            }}
          >
            <span className="title">{"Educational Details"}</span>
          </a>
        </NavItem>
        <NavItem>
          <a
            href
            className={activeTab === "5" ? "active" : ""}
            onClick={() => {
              setActiveTab("5");
              callbackActive("5");
            }}
          >
            <span className="title">{"Certificates"}</span>
          </a>
        </NavItem>
        <NavItem>
          <a
            href
            className={activeTab === "6" ? "active" : ""}
            onClick={() => {
              setActiveTab("6");
              callbackActive("6");
            }}
          >
            <span className="title">{"Bank Details"}</span>
          </a>
        </NavItem>
        <NavItem>
          <a
            href
            className={activeTab === "7" ? "active" : ""}
            onClick={() => {
              setActiveTab("7");
              callbackActive("7");
            }}
          >
            <span className="title">{"Visa Details"}</span>
          </a>
        </NavItem>
        <NavItem>
          <a
            href
            className={activeTab === "8" ? "active" : ""}
            onClick={() => {
              setActiveTab("8");
              callbackActive("8");
            }}
          >
            <span className="title">{"Other Details"}</span>
          </a>
        </NavItem>
        <NavItem>
          <a
            href
            className={activeTab === "9" ? "active" : ""}
            onClick={() => {
              setActiveTab("9");
              callbackActive("9");
            }}
          >
            <span className="title">{"Documents"}</span>
          </a>
        </NavItem>
      </Nav>
    </Fragment>
  );
};

export default NavComponent;
