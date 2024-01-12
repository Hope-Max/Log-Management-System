import React, { Fragment } from "react";
import { H6, Image, P } from "../../../../AbstractElements";

const HeaderProfile = (props) => {
  return (
    <Fragment>
      <div className="media align-items-center">
        <div className="media-size-email">
          <Image
            attrImage={{
              className: "me-3 rounded-circle h-30 w-30",
              src:
                props?.photoUrl ??
                `${require("../../../../assets/images/user/user.png")}`,
              alt: "",
            }}
            style={{ height: 49, width: 49 }}
          />
        </div>
        <div className="media-body">
          <H6 attrH6={{ className: "f-w-600" }}>{props?.name}</H6>

          <P>{props?.email}</P>
        </div>
      </div>
    </Fragment>
  );
};

export default HeaderProfile;
