import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, LogIn, Mail, User } from "react-feather";
import man from "../../../assets/images/dashboard/profile.png";

import { LI, UL, Image, P } from "../../../AbstractElements";
import CustomizerContext from "../../../_helper/Customizer";
import { Account, Admin, Inbox, LogOut, Taskboard } from "../../../Constant";
import { capitalizeFirstLetter, isEmpty } from "../../../redux/constants";

const UserHeader = () => {
  const history = useNavigate();
  const [profile, setProfile] = useState("");
  const [name, setName] = useState("Emay Walter");
  const { layoutURL } = useContext(CustomizerContext);
  const authenticated = JSON.parse(localStorage.getItem("login"));
  const auth0_profile = JSON.parse(localStorage.getItem("user"));

  const Logout = () => {
    if (auth0_profile?.userType === 'vendor') {
      localStorage.clear();
      history(`${process.env.PUBLIC_URL}/vendor/login`);
    }
    else {
      localStorage.clear();
      history(`${process.env.PUBLIC_URL}/login`);
    }
  };

  console.log("Auth", auth0_profile);

  useEffect(() => {
    setProfile(auth0_profile?.photo_url || man);
    if (isEmpty(JSON.parse(localStorage.getItem("user")))) {
      Logout();
    }
    setName(auth0_profile ? auth0_profile?.fullName : name);
  }, []);

  const UserMenuRedirect = (redirect) => {
    history(redirect);
  };

  return (
    <li className="profile-nav onhover-dropdown pe-0 py-0">
      <div className="media profile-media">
        {/* <img
          attrImage={{
            className: "b-r-10 m-0",
            src: auth0_profile?.photo_url,
            alt: "",
            width: 40,
            height: 40,
          }}
          style={{ width: 40, height: 40, borderRadius: "50%" }}
          src={auth0_profile?.photo_url}
          alt="profile"
        /> */}
        <div className="media-body" style={{ textAlign: "end" }}>
          <span style={{ marginRight: "12px" }}>{authenticated ? auth0_profile?.fullName ?? auth0_profile?.name : name}</span>
          <P attrPara={{ className: "mb-0 font-roboto" }}>
            {capitalizeFirstLetter(auth0_profile?.designation?.title ?? auth0_profile?.email)}{" "}
            <i className="middle fa fa-angle-down"></i>
          </P>
        </div>
      </div>
      {
        auth0_profile?.userType === 'vendor'
          ?
          (
            <UL attrUL={{ className: "simple-list profile-dropdown onhover-show-div" }}>
              <LI attrLI={{ onClick: Logout }}>
                <LogIn />
                <span>{LogOut}</span>
              </LI>
            </UL>
          )
          :
          (
            <UL attrUL={{ className: "simple-list profile-dropdown onhover-show-div" }}>
              <LI
                attrLI={{
                  onClick: () =>
                    UserMenuRedirect(
                      `organization/employee/${JSON.parse(localStorage.getItem("user"))?.id
                      }`
                    ),
                }}
              >
                <User />
                <span>{Account} </span>
              </LI>
              <LI
                attrLI={{
                  onClick: () =>
                    UserMenuRedirect(
                      `${process.env.PUBLIC_URL}/app/email-app/${layoutURL}`
                    ),
                }}
              >
                <Mail />
                <span>{Inbox}</span>
              </LI>
              <LI
                attrLI={{
                  onClick: () =>
                    UserMenuRedirect(
                      `${process.env.PUBLIC_URL}/app/todo-app/todo/${layoutURL}`
                    ),
                }}
              >
                <FileText />
                <span>{Taskboard}</span>
              </LI>
              <LI attrLI={{ onClick: Logout }}>
                <LogIn />
                <span>{LogOut}</span>
              </LI>
            </UL>
          )
      }
    </li>
  );
};

export default UserHeader;
