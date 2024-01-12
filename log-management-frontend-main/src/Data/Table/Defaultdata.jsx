import React from "react";
import { Col, Media } from "reactstrap";
import { Btn, Image, ToolTip, P, H6 } from "../../AbstractElements";
import { formatDate } from "../../redux/constants";
import user1 from "../../assets/images/user/1.jpg";
import user2 from "../../assets/images/user/2.png";
import user3 from "../../assets/images/user/3.jpg";
import user4 from "../../assets/images/user/3.png";
import user5 from "../../assets/images/user/4.jpg";
import user6 from "../../assets/images/user/5.jpg";
import user7 from "../../assets/images/user/6.jpg";
import user8 from "../../assets/images/user/7.jpg";
import user9 from "../../assets/images/user/8.jpg";
import user10 from "../../assets/images/user/9.jpg";
import user11 from "../../assets/images/user/10.jpg";
import user12 from "../../assets/images/user/11.png";
import user13 from "../../assets/images/user/12.png";
import { Link } from "react-router-dom";

import product1 from "../../assets/images/ecommerce/product-table-1.png";
import product2 from "../../assets/images/ecommerce/product-table-2.png";
import product3 from "../../assets/images/ecommerce/product-table-3.png";
import product4 from "../../assets/images/ecommerce/product-table-4.png";
import product5 from "../../assets/images/ecommerce/product-table-5.png";
import product6 from "../../assets/images/ecommerce/product-table-6.png";

const style = {
  width: 40,
  height: 40,
};
const style2 = { width: 120, fontSize: 14, padding: 4 };
export const productData = [
  {
    image: <Image attrImage={{ src: product1, style: style, alt: "" }} />,
    Details: (
      <div>
        <H6>Red Lipstick</H6>
        <span>
          Interchargebla lens Digital Camera with APS-C-X Trans CMOS Sens
        </span>
      </div>
    ),
    amount: "$10",
    stock: <div className="font-success">Open</div>,
    start_date: "2022/4/19",
    action: (
      <div>
        {/* <span>
          <Btn attrBtn={{ style: style2, color: 'danger', className: 'btn btn-xs', type: 'button' }}>Delete</Btn>
        </span>{' '}
        &nbsp;&nbsp;
        <span>
          <Btn attrBtn={{ style: style2, color: 'success', className: 'btn btn-xs', type: 'button' }}>Edit </Btn>
        </span> */}
        <span>
          <Btn
            attrBtn={{
              style: style2,
              color: "primary",
              className: "btn btn-xs",
              type: "button",
            }}
          >
            Want to Bid{" "}
          </Btn>
        </span>
      </div>
    ),
  },
  {
    image: <Image attrImage={{ src: product2, style: style, alt: "" }} />,
    Details: (
      <div>
        <H6>Brown Lipstick</H6>
        <span>
          Interchargebla lens Digital Camera with APS-C-X Trans CMOS Sens
        </span>
      </div>
    ),
    amount: "$10",
    stock: <div className="font-danger">Expired</div>,
    start_date: "2022/4/19",
    action: (
      <div>
        {/* <span>
          <Btn attrBtn={{ style: style2, color: 'danger', className: 'btn btn-xs', type: 'button' }}>Delete</Btn>
        </span>{' '}
        &nbsp;&nbsp;
        <span>
          <Btn attrBtn={{ style: style2, color: 'success', className: 'btn btn-xs', type: 'button' }}>Edit </Btn>
        </span> */}
        <span>
          <Btn
            attrBtn={{
              style: style2,
              color: "success",
              className: "btn btn-xs",
              type: "button",
            }}
            disabled
          >
            Bid Submitted
          </Btn>
        </span>
      </div>
    ),
  },
  {
    image: <Image attrImage={{ src: product3, style: style, alt: "" }} />,
    Details: (
      <div>
        <H6>Yellow Lipstick</H6>
        <span>
          Interchargebla lens Digital Camera with APS-C-X Trans CMOS Sens
        </span>
      </div>
    ),
    amount: "$10",
    stock: <div className="font-danger">Expired</div>,
    start_date: "2022/4/19",
    action: (
      <div>
        {/* <span>
          <Btn attrBtn={{ style: style2, color: 'danger', className: 'btn btn-xs', type: 'button' }}>Delete</Btn>
        </span>{' '}
        &nbsp;&nbsp;
        <span>
          <Btn attrBtn={{ style: style2, color: 'success', className: 'btn btn-xs', type: 'button' }}>Edit </Btn>
        </span> */}
        <span>
          <Btn
            attrBtn={{
              style: style2,
              color: "primary",
              className: "btn btn-xs",
              type: "button",
            }}
            disabled
          >
            Want to Bid{" "}
          </Btn>
        </span>
      </div>
    ),
  },
  {
    image: <Image attrImage={{ src: product4, style: style, alt: "" }} />,
    Details: (
      <div>
        <H6>Green Lipstick</H6>
        <span>
          Interchargebla lens Digital Camera with APS-C-X Trans CMOS Sens
        </span>
      </div>
    ),
    amount: "$20",
    stock: <div className="font-warning">About to end</div>,
    start_date: "2022/4/19",
    action: (
      <div>
        {/* <span>
          <Btn attrBtn={{ style: style2, color: 'danger', className: 'btn btn-xs', type: 'button' }}>Delete</Btn>
        </span>{' '}
        &nbsp;&nbsp;
        <span>
          <Btn attrBtn={{ style: style2, color: 'success', className: 'btn btn-xs', type: 'button' }}>Edit </Btn>
        </span> */}
        <span>
          <Btn
            attrBtn={{
              style: style2,
              color: "success",
              className: "btn btn-xs",
              type: "button",
            }}
          >
            Open Bid{" "}
          </Btn>
        </span>
      </div>
    ),
  },
  {
    image: <Image attrImage={{ src: product5, style: style, alt: "" }} />,
    Details: (
      <div>
        <H6>Pink Lipstick</H6>
        <span>
          Interchargebla lens Digital Camera with APS-C-X Trans CMOS Sens
        </span>
      </div>
    ),
    amount: "$30",
    stock: <div className="font-success">Open</div>,
    start_date: "2022/4/19",
    action: (
      <div>
        {/* <span>
          <Btn attrBtn={{ style: style2, color: 'danger', className: 'btn btn-xs', type: 'button' }}>Delete</Btn>
        </span>{' '}
        &nbsp;&nbsp;
        <span>
          <Btn attrBtn={{ style: style2, color: 'success', className: 'btn btn-xs', type: 'button' }}>Edit </Btn>
        </span> */}
        <span>
          <Btn
            attrBtn={{
              style: style2,
              color: "primary",
              className: "btn btn-xs",
              type: "button",
            }}
          >
            Want to Bid{" "}
          </Btn>
        </span>
      </div>
    ),
  },
  {
    image: <Image attrImage={{ src: product6, style: style, alt: "" }} />,
    Details: (
      <div>
        <H6>Blue Lipstick</H6>
        <span>
          Interchargebla lens Digital Camera with APS-C-X Trans CMOS Sens
        </span>
      </div>
    ),
    amount: "$40",
    stock: <div className="font-success">Open</div>,
    start_date: "2022/4/19",
    action: (
      <div>
        {/* <span>
          <Btn attrBtn={{ style: style2, color: 'danger', className: 'btn btn-xs', type: 'button' }}>Delete</Btn>
        </span>{' '}
        &nbsp;&nbsp;
        <span>
          <Btn attrBtn={{ style: style2, color: 'success', className: 'btn btn-xs', type: 'button' }}>Edit </Btn>
        </span> */}
        <span>
          <Btn
            attrBtn={{
              style: style2,
              color: "primary",
              className: "btn btn-xs",
              type: "button",
            }}
          >
            Want to Bid{" "}
          </Btn>
        </span>
      </div>
    ),
  },
  {
    image: <Image attrImage={{ src: product2, style: style, alt: "" }} />,
    Details: (
      <div>
        <H6>Grey Lipstick</H6>
        <span>
          Interchargebla lens Digital Camera with APS-C-X Trans CMOS Sens
        </span>
      </div>
    ),
    amount: "$10",
    stock: <div className="font-success">Open</div>,
    start_date: "2022/4/19",
    action: (
      <div>
        {/* <span>
          <Btn attrBtn={{ style: style2, color: 'danger', className: 'btn btn-xs', type: 'button' }}>Delete</Btn>
        </span>{' '}
        &nbsp;&nbsp;
        <span>
          <Btn attrBtn={{ style: style2, color: 'success', className: 'btn btn-xs', type: 'button' }}>Edit </Btn>
        </span> */}
        <span>
          <Btn
            attrBtn={{
              style: style2,
              color: "primary",
              className: "btn btn-xs",
              type: "button",
            }}
          >
            Want to Bid{" "}
          </Btn>
        </span>
      </div>
    ),
  },
  {
    image: <Image attrImage={{ src: product3, style: style, alt: "" }} />,
    Details: (
      <div>
        <H6>Black Lipstick</H6>
        <span>
          Interchargebla lens Digital Camera with APS-C-X Trans CMOS Sens
        </span>
      </div>
    ),
    amount: "$10",
    stock: <div className="font-success">Open</div>,
    start_date: "2022/4/19",
    action: (
      <div>
        {/* <span>
          <Btn attrBtn={{ style: style2, color: 'danger', className: 'btn btn-xs', type: 'button' }}>Delete</Btn>
        </span>{' '}
        &nbsp;&nbsp;
        <span>
          <Btn attrBtn={{ style: style2, color: 'success', className: 'btn btn-xs', type: 'button' }}>Edit </Btn>
        </span> */}
        <span>
          <Btn
            attrBtn={{
              style: style2,
              color: "primary",
              className: "btn btn-xs",
              type: "button",
            }}
          >
            Want to Bid{" "}
          </Btn>
        </span>
      </div>
    ),
  },
];
export const activeRFQListcolumns = [
  // {
  //   name: 'Image',
  //   selector: (row) => row.image,
  //   sortable: true,
  //   center: true,
  //   minWidth: '100px',
  //   maxWidth: '100px',
  // },
  {
    name: "S. No.",
    cell: (row, index) => index + 1,
    width: "4.5rem",
    center: true,
  },
  {
    name: "Details",
    selector: (row) => row.Details,
    sortable: true,
    center: true,
    wrap: true,
    minWidth: "380px",
  },
  // {
  //   name: 'Amount',
  //   selector: (row) => row.amount,
  //   sortable: true,
  //   center: true,
  //   minWidth: '100px',
  //   maxWidth: '150px',
  // },
  {
    name: "Status",
    selector: (row) => row.stock,
    sortable: true,
    center: true,
    minWidth: "120px",
    maxWidth: "150px",
  },
  {
    name: "End Date",
    selector: (row) => row.start_date,
    sortable: true,
    center: true,
    minWidth: "120px",
    // maxWidth: "150px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
    sortable: true,
    center: true,
    minWidth: "160px",
    maxWidth: "160px",
  },
];

export const WelcomeToRevCorp = "Welcome to Rev Corp";
export const WelcomeMessage = "Here whats happing in your account today";

export const dummytabledata = [
  {
    id: 1,
    name: (
      <Media className="d-flex">
        <Image
          attrImage={{
            className: "rounded-circle img-30 me-3",
            src: `${user1}`,
            alt: "Generic placeholder image",
          }}
        />
        <Media body className="align-self-center">
          <div>Airi Satou</div>
        </Media>
      </Media>
    ),
    date: "2023/04/27",
    invoice: "#PX0101",
    designation: "System Architect",
    credit: (
      <span className="f-w-700 font-success">
        <i className="icofont icofont-arrow-up"></i> 4.3%
      </span>
    ),
    company: "Hewlett packard",
    priority: <span className="badge badge-light-primary">High</span>,
    budget: "$3142.00",
  },
  {
    id: 2,
    name: (
      <Media className="d-flex">
        <Image
          attrImage={{
            className: "rounded-circle img-30 me-3",
            src: `${user2}`,
            alt: "Generic placeholder image",
          }}
        />
        <Media body className="align-self-center">
          <div>Thomas Taylor</div>
        </Media>
      </Media>
    ),
    date: "2023/04/22",
    invoice: "#RF304f",
    designation: "Maintenace service",
    credit: (
      <span className="f-w-700 font-success">
        <i className="icofont icofont-arrow-up"></i> 5.6%
      </span>
    ),
    company: "Apple Inc.",
    priority: <span className="badge badge-light-danger">Urgent</span>,
    budget: "$1234.00",
  },
  {
    id: 3,
    name: (
      <Media className="d-flex">
        <Image
          attrImage={{
            className: "rounded-circle img-30 me-3",
            src: `${user3}`,
            alt: "Generic placeholder image",
          }}
        />
        <Media body className="align-self-center">
          <div>Michael Morris</div>
        </Media>
      </Media>
    ),
    date: "2023/05/21",
    invoice: "#DNJ480",
    designation: "Junior Technical Author	",
    credit: (
      <span className="f-w-700 font-danger">
        <i className="icofont icofont-arrow-down"></i> 2.4%
      </span>
    ),
    company: "Edinburgh",
    priority: <span className="badge badge-light-success">Low</span>,
    budget: "$2345.00",
  },
  {
    id: 4,
    name: (
      <Media className="d-flex">
        <Image
          attrImage={{
            className: "rounded-circle img-30 me-3",
            src: `${user4}`,
            alt: "Generic placeholder image",
          }}
        />
        <Media body className="align-self-center">
          <div>Tiger Nixon</div>
        </Media>
      </Media>
    ),
    date: "2023/03/09",
    invoice: "#G189d0",
    designation: "Senior Javascript Developer",
    credit: (
      <span className="f-w-700 font-danger">
        <i className="icofont icofont-arrow-down"></i> 2.2%
      </span>
    ),
    company: "Microsoft",
    priority: <span className="badge badge-light-info">Medium</span>,
    budget: "$7689.00",
  },
  {
    id: 5,
    name: (
      <Media className="d-flex">
        <Image
          attrImage={{
            className: "rounded-circle img-30 me-3",
            src: `${user5}`,
            alt: "Generic placeholder image",
          }}
        />
        <Media body className="align-self-center">
          <div>Garrett Winters</div>
        </Media>
      </Media>
    ),
    date: "2023/04/10",
    invoice: "#31D8FFS",
    designation: "Accountant",
    credit: (
      <span className="f-w-700 font-success">
        <i className="icofont icofont-arrow-up"></i> 5.8%
      </span>
    ),
    company: "Tata Co.",
    priority: <span className="badge badge-light-primary">High</span>,
    budget: "$2145.00",
  },
  {
    id: 6,
    name: (
      <Media className="d-flex">
        <Image
          attrImage={{
            className: "rounded-circle img-30 me-3",
            src: `${user6}`,
            alt: "Generic placeholder image",
          }}
        />
        <Media body className="align-self-center">
          <div>Carolyn Jones</div>
        </Media>
      </Media>
    ),
    date: "2023/06/12",
    invoice: "#G189D4",
    designation: "General service",
    credit: (
      <span className="f-w-700 font-success">
        <i className="icofont icofont-arrow-up"></i> 6.4%
      </span>
    ),
    company: "Google Inc.",
    priority: <span className="badge badge-light-danger">Urgent</span>,
    budget: "$2578.00",
  },
  {
    id: 7,
    name: (
      <Media className="d-flex">
        <Image
          attrImage={{
            className: "rounded-circle img-30 me-3",
            src: `${user7}`,
            alt: "Generic placeholder image",
          }}
        />
        <Media body className="align-self-center">
          <div>Glen Matney</div>
        </Media>
      </Media>
    ),
    date: "2023/04/25",
    invoice: "#PX2101",
    designation: "System Architect",
    credit: (
      <span className="f-w-700 font-danger">
        <i className="icofont icofont-arrow-down"></i> 0.3%
      </span>
    ),
    company: "Mindtree Ltd.",
    priority: <span className="badge badge-light-success">Low</span>,
    budget: "$6538.00",
  },
  {
    id: 8,
    name: (
      <Media className="d-flex">
        <Image
          attrImage={{
            className: "rounded-circle img-30 me-3",
            src: `${user8}`,
            alt: "Generic placeholder image",
          }}
        />
        <Media body className="align-self-center">
          <div>Ashton Cox</div>
        </Media>
      </Media>
    ),
    date: "2023/06/09",
    invoice: "#px0101",
    designation: "System Architect",
    credit: (
      <span className="f-w-700 font-success">
        <i className="icofont icofont-arrow-up"></i> 7.3%
      </span>
    ),
    company: "Wipro Ltd.",
    priority: <span className="badge badge-light-danger">Urgent</span>,
    budget: "$2121.00",
  },
  {
    id: 9,
    name: (
      <Media className="d-flex">
        <Image
          attrImage={{
            className: "rounded-circle img-30 me-3",
            src: `${user9}`,
            alt: "Generic placeholder image",
          }}
        />
        <Media body className="align-self-center">
          <div>Tiger Nixon</div>
        </Media>
      </Media>
    ),
    date: "2023/01/11",
    invoice: "#G5384H",
    designation: "General service",
    credit: (
      <span className="f-w-700 font-success">
        <i className="icofont icofont-arrow-up"></i> 6.3%
      </span>
    ),
    company: "Edinburgh",
    priority: <span className="badge badge-light-primary">High</span>,
    budget: "$9546.00",
  },
  {
    id: 10,
    name: (
      <Media className="d-flex">
        <Image
          attrImage={{
            className: "rounded-circle img-30 me-3",
            src: `${user10}`,
            alt: "Generic placeholder image",
          }}
        />
        <Media body className="align-self-center">
          <div>Brielle Williamson</div>
        </Media>
      </Media>
    ),
    date: "2023/04/02",
    invoice: "#E5384H",
    designation: "System Architect",
    credit: (
      <span className="f-w-700 font-danger">
        <i className="icofont icofont-arrow-down"></i> 3.3%
      </span>
    ),
    company: "Mphasis Ltd",
    priority: <span className="badge badge-light-info">Medium</span>,
    budget: "$4587.00",
  },
  {
    id: 11,
    name: (
      <Media className="d-flex">
        <Image
          attrImage={{
            className: "rounded-circle img-30 me-3",
            src: `${user11}`,
            alt: "Generic placeholder image",
          }}
        />
        <Media body className="align-self-center">
          <div>Charles Kubik</div>
        </Media>
      </Media>
    ),
    date: "2023/05/01",
    invoice: "#JK384H",
    designation: "System Architect",
    credit: (
      <span className="f-w-700 font-danger">
        <i className="icofont icofont-arrow-down"></i> 2.3%
      </span>
    ),
    company: "Infosys Ltd.",
    priority: <span className="badge badge-light-success">Low</span>,
    budget: "$3140.00",
  },
  {
    id: 12,
    name: (
      <Media className="d-flex">
        <Image
          attrImage={{
            className: "rounded-circle img-30 me-3",
            src: `${user12}`,
            alt: "Generic placeholder image",
          }}
        />
        <Media body className="align-self-center">
          <div>Brielle Williamson</div>
        </Media>
      </Media>
    ),
    date: "2023/07/04",
    invoice: "#HY5384H",
    designation: "General service",
    credit: (
      <span className="f-w-700 font-danger">
        <i className="icofont icofont-arrow-down"></i> 1.3%
      </span>
    ),
    company: "Edinburgh",
    priority: <span className="badge badge-light-success">Low</span>,
    budget: "$3014.00",
  },
  {
    id: 13,
    name: (
      <Media className="d-flex">
        <Image
          attrImage={{
            className: "rounded-circle img-30 me-3",
            src: `${user13}`,
            alt: "Generic placeholder image",
          }}
        />
        <Media body className="align-self-center">
          <div>Kevin Dawson</div>
        </Media>
      </Media>
    ),
    date: "2022/04/06",
    invoice: "#KH384H",
    designation: "System Architect",
    credit: (
      <span className="f-w-700 font-success">
        <i className="icofont icofont-arrow-up"></i> 5.3%
      </span>
    ),
    company: "Infosys.",
    priority: <span className="badge badge-light-danger">Urgent</span>,
    budget: "$2014.00",
  },
];

export const tableColumns = [
  {
    name: "Name",
    selector: (row) => row["name"],
    sortable: true,
    center: false,
  },
  {
    name: "Date",
    selector: (row) => `${row.date}`,
    sortable: true,
    center: true,
  },
  {
    name: "invoice No.",
    selector: (row) => `${row.invoice}`,
    sortable: true,
    center: true,
  },
  {
    name: "Job Designation",
    selector: (row) => `${row.designation}`,
    sortable: true,
    center: true,
  },
  {
    name: "Credit/Debit",
    selector: (row) => row["credit"],
    sortable: true,
    center: true,
  },
  {
    name: "Company Name",
    selector: (row) => `${row.company}`,
    sortable: true,
    center: true,
  },
  {
    name: "Priority",
    selector: (row) => row["priority"],
    sortable: true,
    center: true,
  },
  {
    name: "Budget",
    selector: (row) => row["budget"],
    sortable: true,
    center: true,
  },
];

export const designationTableColumnss = [
  {
    name: "Designation Name",
    selector: (row) => `${row?.title}`,
    sortable: true,
    center: false,
  },
  {
    name: "Parent Designation",
    selector: (row) => `${row?.parent?.title ?? "N/A"}`,
    sortable: true,
    center: true,
  },
  {
    name: "Department",
    selector: (row) => `${row.department}`,
    sortable: true,
    center: true,
  },
];

export const designationTableColumns = [
  {
    name: "Serial No.",
    selector: (row) => `${row?.serial_number}`,
    sortable: true,
    center: false,
  },
  {
    name: "Model",
    selector: (row) => `${row?.model}`,
    sortable: true,
    center: true,
  },
  {
    name: "Type",
    selector: (row) => `${row.type}`,
    sortable: true,
    center: true,
  },
  {
    name: "Assigned to",
    selector: (row) => `${row.assignedTo?.full_name}`,
    sortable: true,
    center: true,
  },
  {
    name: "Assigned by",
    selector: (row) => `${row.assignedBy?.full_name}`,
    sortable: true,
    center: true,
  },
  {
    name: "Purchase Date",
    selector: (row) => `${formatDate(row.purchase_date)}`,
    sortable: true,
    center: true,
  },
];

export const leaveTableColumns = [
  {
    name: "S. No.",
    cell: (row, index) => index + 1,
    width: "4.25rem",
    center: true,
  },
  {
    name: "Duration",
    selector: (row) =>
      row.end_date
        ? `${formatDate(row.start_date)} - ${formatDate(row.end_date)}`
        : `${formatDate(row.start_date)}`,
    sortable: true,
    grow: 2,
    style: {
      minWidth: 220,
    },
  },
  {
    name: "Type",
    selector: (row) => `${row?.leaveType?.name}`,
    sortable: true,
  },
  {
    name: "Count",
    selector: (row) => `${row.total_days} days`,
    sortable: true,
  },
  {
    name: "Requested Date",
    selector: (row) => `${formatDate(row.created_at)}`,
    sortable: true,
  },
  {
    name: "Reason",
    selector: (row) => `${row.reason}`,
    sortable: true,
    wrap: true,
  },
  {
    name: "Actioned By",
    selector: (row) =>
      `${row?.actionedBy?.full_name ? row?.actionedBy?.full_name : "Pending"}`,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => {
      let statusClassName =
        row.status == "open"
          ? "badge-light-info"
          : row.status === "approved"
            ? "badge-light-success"
            : "badge-light-danger";
      return (
        <span className={`badge ${statusClassName}`}>
          {row?.status?.toUpperCase()}
        </span>
      );
    },
    sortable: true,
  },
];

export const pastExpenseTableColumns = [
  {
    name: "S. No.",
    cell: (row, index) => index + 1,
    width: "4.25rem",
    center: true,
  },
  {
    name: "Title",
    selector: (row) => row.title,
    sortable: true,
    center: false,
  },
  {
    name: "Category",
    selector: (row) => `${row.head}`,
    sortable: true,
    center: true,
  },
  {
    name: "Department",
    selector: (row) => `${row.department}`,
    sortable: true,
    center: true,
  },
  {
    name: "Amount",
    selector: (row) => `${row.amount}`,
    sortable: true,
    center: true,
  },
  {
    name: "Requested Date",
    selector: (row) => `${row.date}`,
    sortable: true,
    center: true,
  },
  {
    name: "Description",
    selector: (row) => `${row.description}`,
    sortable: true,
    center: true,
  },
  // {
  //     name: "Reason",
  //     selector: (row) => `${row.cancel_reason}`,
  //     sortable: true,
  //     center: true,
  // },
  {
    name: "Actioned By",
    selector: (row) =>
      `${row?.approvedBy?.full_name
        ? row?.approvedBy?.full_name
        : row?.rejectedBy?.full_name
      }`,
    sortable: true,
    center: true,
  },
  {
    name: "Status",
    selector: (row) => {
      let statusClassName =
        row.status == "open"
          ? "badge-light-info"
          : row.status == "approved"
            ? "badge-light-success"
            : "badge-light-danger";
      return (
        <span className={`badge ${statusClassName}`}>
          {row?.status?.toUpperCase()}
        </span>
      );
    },
    sortable: true,
    center: true,
  },
];

export const leaveRequestsTableColumns = [
  {
    name: "User",
    selector: (row) => (
      <Media className="d-flex">
        <Image
          attrImage={{
            className: "rounded-circle img-30 me-3",
            src: `${user1}`,
            alt: "Generic placeholder image",
          }}
        />
        <Media body className="align-self-center">
          <div id="TooltipExample">{row?.user?.full_name}</div>
          {/* <Btn attrBtn={{ id: 'TooltipExample' }}>{row?.user?.full_name}</Btn> */}

          <ToolTip
            attrToolTip={{
              placement: "top",
              isOpen: false,
              target: "TooltipExample",
              toggle: () => { },
            }}
          >
            {row?.user?.full_name}
          </ToolTip>
        </Media>
      </Media>
    ),
    sortable: true,
    center: false,
  },
  {
    name: "Duration",
    selector: (row) =>
      `${formatDate(row.start_date)} - ${formatDate(row.end_date)}`,
    sortable: true,
    center: false,
    style: {
      minWidth: 220,
    },
  },
  {
    name: "Type",
    selector: (row) => `${row?.leaveType?.name}`,
    sortable: true,
    center: true,
  },
  {
    name: "Count",
    selector: (row) => `${row.total_days} days`,
    sortable: true,
    center: true,
  },
  {
    name: "Requested Date",
    selector: (row) => `${formatDate(row.created_at)}`,
    sortable: true,
    center: true,
  },
  {
    name: "Reason",
    selector: (row) => `${row.reason}`,
    sortable: true,
    center: true,
  },
  {
    name: "Actioned By",
    selector: (row) =>
      `${row?.actionedBy?.full_name ? row?.actionedBy?.full_name : "Pending"}`,
    sortable: true,
    center: true,
  },
  {
    name: "Status",
    selector: (row) => `${row.status}`,
    sortable: true,
    center: true,
  },
  {
    name: "",
    selector: (row) => row["options"],
    sortable: false,
    center: true,
  },
];

export const expenseTableColumns = [
  {
    name: "Duration",
    selector: (row) => row["name"],
    sortable: true,
    center: false,
  },
  {
    name: "Type",
    selector: (row) => `${row.date}`,
    sortable: true,
    center: true,
  },
  {
    name: "Count",
    selector: (row) => `${row.invoice}`,
    sortable: true,
    center: true,
  },
  {
    name: "Requested Date",
    selector: (row) => `${row.designation}`,
    sortable: true,
    center: true,
  },
  {
    name: "Reason",
    selector: (row) => row["credit"],
    sortable: true,
    center: true,
  },
  {
    name: "Status",
    selector: (row) => `${row.company}`,
    sortable: true,
    center: true,
  },
  {
    name: "",
    selector: (row) => row["priority"],
    sortable: false,
    center: true,
  },
  {
    cell: (row) => <Col></Col>,
    allowOverflow: true,
    button: true,
    width: "56px",
  },
];

export const assetTableColumns = [
  {
    name: "SR. No.",
    selector: (row) => row["name"],
    sortable: true,
    center: false,
  },
  {
    name: "Type",
    selector: (row) => `${row.date}`,
    sortable: true,
    center: true,
  },
  {
    name: "Details",
    selector: (row) => `${row.invoice}`,
    sortable: true,
    center: true,
  },
  {
    name: "Model",
    selector: (row) => `${row.designation}`,
    sortable: true,
    center: true,
  },
  {
    name: "Purchase Date",
    selector: (row) => row["credit"],
    sortable: true,
    center: true,
  },
  {
    name: "Availability",
    selector: (row) => `${row.company}`,
    sortable: true,
    center: true,
  },
  {
    name: "Status",
    selector: (row) => `${row.company}`,
    sortable: true,
    center: true,
  },
  // {
  // 	name: '',
  // 	selector: (row) => row['priority'],
  // 	sortable: false,
  // 	center: true
  // }
];

export const leaveQuotaTableColumns = [
  {
    name: "S. No.",
    cell: (row, index) => index + 1,
    width: "4.25rem",
    center: true,
  },
  {
    name: "Leave Type.",
    selector: (row) => `${row?.type?.name}`,
    sortable: true,
    center: false,
  },
  {
    name: "Quota in Days",
    selector: (row) => `${row?.quota_in_days}`,
    sortable: true,
    center: true,
  },
  {
    name: "Role",
    selector: (row) => `${row?.role?.name}`,
    sortable: true,
    center: true,
  },
  {
    name: "Year",
    selector: (row) => `${row?.year}`,
    sortable: true,
    center: true,
  },
];

export const employeeTableColumns = [
  {
    name: "S. No.",
    cell: (row, index) => index + 1,
    width: "4.25rem",
    center: true,
  },
  {
    name: "Name",
    selector: (row) => row["name"],
    sortable: true,
    center: false,
  },
  {
    name: "Email",
    selector: (row) => `${row.email}`,
    sortable: true,
    center: true,
  },
  {
    name: "Employee ID",
    selector: (row) => `${row.employee_id}`,
    sortable: true,
    center: false,
  },
  {
    name: "Department",
    selector: (row) => `${row.department}`,
    sortable: true,
    center: false,
  },
  // {
  //     name: "Role",
  //     selector: (row) => `${row.userRole}`,
  //     sortable: true,
  //     center: true,
  // },
  {
    name: "Designation",
    selector: (row) => `${row.designation}`,
    sortable: true,
    center: true,
  },
  {
    name: "Reports to",
    selector: (row) => `${row.supervisor}`,
    sortable: true,
    center: true,
  },
  // {
  //     name: "Status",
  //     selector: (row) => row["is_active"],
  //     sortable: true,
  //     center: true,
  // },
  {
    name: "Action",
    selector: (row) => row["priority"],
    sortable: false,
    center: true,
  },
];

export const VendorTableColumns = [
  {
    name: "S. No.",
    cell: (row, index) => index + 1,
    width: "4.25rem",
    center: true,
  },
  {
    name: "Company Name",
    selector: (row) => `${row.company_name}`,
    sortable: true,
    center: false,
  },
  {
    name: "Category",
    selector: (row) => `${row.category}`,
    sortable: true,
    center: false,
  },
  {
    name: "Contact Person",
    selector: (row) => `${row.name}`,
    sortable: true,
    center: false,
  },
  {
    name: "Email",
    selector: (row) => `${row.email}`,
    sortable: true,
    center: true,
  },
  {
    name: "Phone",
    selector: (row) => `${row.phone}`,
    sortable: true,
    center: true,
  },
  {
    name: "Status",
    selector: (row) => row["is_active"],
    sortable: true,
    center: true,
  },
  {
    name: "Action",
    selector: (row) => row["priority"],
    sortable: false,
    center: true,
  },
];

export const RFQNotEditablecolumns = [
  { field: "sr_no", headerName: "Sr. No.", width: 90, editable: false },
  {
    field: "type",
    headerName: "Type",
    width: 150,
    editable: false,
  },
  {
    field: "subtype",
    headerName: "Sub Type",
    width: 150,
    editable: false,
  },
  {
    field: "description",
    headerName: "Item Description",
    width: 400,
    editable: false,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 150,
    editable: false,
  },
  {
    field: "unit",
    headerName: "Unit",
    width: 150,
    editable: false,
  },
  {
    field: "unit_price",
    headerName: "Unit Price (AED)",
    width: 180,
    editable: false,
  },
  {
    field: "total",
    headerName: "Total (AED)",
    // description: 'This column has a value getter and is not sortable.',
    width: 150,
    valueGetter: (params) =>
      `${(params.row.quantity || 0) * (params.row.unit_price || 0.0)}`,
  },
  {
    field: "markup_percentage",
    headerName: "Mark Up %",
    width: 150,
    editable: false,
  },
  {
    field: "markup",
    headerName: "Mark Up",
    // description: 'This column has a value getter and is not sortable.',
    width: 150,
    valueGetter: (params) =>
      `${((params.row.total || 0.0) * (params.row.markup_percentage || 0.0)) /
      100
      }`,
  },
  {
    field: "grand_total",
    headerName: "Grand Total",
    // description: 'This column has a value getter and is not sortable.',
    width: 160,
    valueGetter: (params) =>
      `${(params.row.total || 0.0) - (params.row.markup || 0.0)}`,
  },
];

export const productTableColumns = [
  {
    name: "S. No.",
    cell: (row, index) => index + 1,
    width: "4.25rem",
    center: true,
  },
  {
    name: "Title",
    selector: (row) => row["name"],
    sortable: true,
    center: false,
  },
  {
    name: "Category",
    selector: (row) => row["category"],
    sortable: true,
    center: false,
  },
  {
    name: "Brand",
    selector: (row) => row["brand"],
    sortable: true,
    center: false,
  },
  {
    name: "Model",
    selector: (row) => row["model"],
    sortable: true,
    center: false,
  },
  {
    name: "Avg. Price",
    selector: (row) => row["avg_unit_price"],
    sortable: true,
    center: false,
  },
  {
    name: "Quantity available",
    selector: (row) => row["qty_available"],
    sortable: true,
    center: false,
  },
  {
    name: "Action",
    selector: (row) => row["priority"],
    sortable: false,
    center: true,
  },
];

export const searchedProductTableColumns = [
  {
    name: "S. No.",
    cell: (row, index) => index + 1,
    width: "4.25rem",
    center: true,
  },
  {
    name: "Title",
    selector: (row) => row["name"],
    sortable: true,
    center: false,
  },
  {
    name: "Quantity available",
    selector: (row) => row["qty_available"],
    sortable: true,
    center: false,
  },
];

export const boqTableColumn = [
  {
    name: "S. No.",
    cell: (row, index) => index + 1,
    width: "4.25rem",
    center: true,
  },
  {
    name: "Project",
    selector: (row) => row?.project?.name,
    sortable: true,
    minWidth: "6rem",
    maxWidth: "10rem",
  },
  {
    name: "Title",
    selector: (row) => row["title"],
    sortable: true,
    center: false,
    minWidth: "8rem",
    maxWidth: "12rem",
    wrap: true,
    style: {
      padding: "16px",
    }
  },
  {
    name: "Description",
    selector: (row) => row["description"],
    sortable: true,
    center: false,
    wrap: true,
    minWidth: "24rem",
    style: {
      padding: "16px",
    }
  },
  // {
  //   name: "Status",
  //   selector: (row) => row["status"],
  //   sortable: true,
  //   center: true,
  // },
  {
    name: "Status",
    selector: (row) => {
      let statusClassName =
        row.status === "open"
          ? "badge-light-info"
          : row.status === "approved"
            ? "badge-light-success"
            : "badge-light-danger";
      return (
        <span className={`badge ${statusClassName}`}>{row?.status?.toUpperCase()}</span>
      );
    },
    sortable: true,
    minWidth: "6rem",
    maxWidth: "10rem"
  },
  {
    name: "Action",
    selector: (row) => {
      return (
        <div className="cursor__pointer">
          <Link to={`/estimation/boq/edit/${row?.project?.id}`}>
            <span style={{ cursor: "pointer", fontSize: "1rem" }}>
              {row.status === 'approved'
                ?
                <i className="fa fa-eye"></i>
                :
                <i className="icofont icofont-ui-edit"></i>
              }
            </span>
          </Link>
          {/* <div
                  onClick={() => {
                    setUserId(item?.id);
                toggle();
                
                  }}
                >
                  <span className="m-l-15" style={{ cursor: "pointer" }}>
                    <i
                      className="icofont icofont-ui-delete"
                      style={{ color: "red" }}
                    ></i>
                  </span>
                </div>
                <div
                  onClick={() => {
                    dispatch(resetPassword(item?.id));
                    setSubmit(true);
                  }}
                  style={{ color: "green" }}
                >
                  <span className="m-l-15" style={{ cursor: "pointer" }}>
                    <i className="fa fa-key"></i>
                  </span>
                </div> */}
        </div>
      );
    },
    sortable: false,
    center: true,
    minWidth: "4rem",
    maxWidth: "6rem"
  },
];

export const RFQTableColumn = [
  {
    name: "S. No.",
    cell: (row, index) => index + 1,
    width: "4.25rem",
    center: true,
  },
  {
    name: "Title",
    selector: (row) => row["title"],
    sortable: true,
    center: false,
  },
  {
    name: "Project",
    selector: (row) => row?.project?.name,
    sortable: true,
    center: false,
  },
  {
    name: "Description",
    selector: (row) => row["description"],
    sortable: true,
    center: false,
  },
  {
    name: "Status",
    selector: (row) => row["status"],
    sortable: true,
    center: true,
  },

  {
    name: "Action",
    selector: (row) => {
      return (
        <div>
          <div className="cursor__pointer d-flex">
            <Link to={`/procurement/requirements/${row?.project?.id}`}>
              <span className="m-l-15" style={{ cursor: "pointer" }}>
                <i className="icofont icofont-ui-edit"></i>
              </span>
            </Link>
            {/* <div
                  onClick={() => {
                    setUserId(item?.id);
                toggle();
                
                  }}
                >
                  <span className="m-l-15" style={{ cursor: "pointer" }}>
                    <i
                      className="icofont icofont-ui-delete"
                      style={{ color: "red" }}
                    ></i>
                  </span>
                </div>
                <div
                  onClick={() => {
                    dispatch(resetPassword(item?.id));
                    setSubmit(true);
                  }}
                  style={{ color: "green" }}
                >
                  <span className="m-l-15" style={{ cursor: "pointer" }}>
                    <i className="fa fa-key"></i>
                  </span>
                </div> */}
          </div>
        </div>
      );
    },
    sortable: false,
    center: true,
  },
];

export const QuotationRequestsTableColumn = [
  {
    name: "S. No.",
    cell: (row, index) => index + 1,
    width: "4.25rem",
    center: true,
  },
  {
    name: "Title",
    selector: (row) => row["title"],
    sortable: true,
    center: false,
  },
  {
    name: "Project",
    selector: (row) => row?.project?.name,
    sortable: true,
    center: false,
  },
  {
    name: "Description",
    selector: (row) => row["description"],
    sortable: true,
    center: false,
  },
  {
    name: "Status",
    selector: (row) => row["status"],
    sortable: true,
    center: true,
  },

  {
    name: "Action",
    selector: (row) => {
      return (
        <div>
          <div className="cursor__pointer d-flex">
            <Link to={`/procurement/manage-quotation-requests/${row?.id}`}>
              <span className="m-l-15" style={{ cursor: "pointer" }}>
                <i className="icofont icofont-ui-edit"></i>
              </span>
            </Link>
            {/* <div
                  onClick={() => {
                    setUserId(item?.id);
                toggle();
                
                  }}
                >
                  <span className="m-l-15" style={{ cursor: "pointer" }}>
                    <i
                      className="icofont icofont-ui-delete"
                      style={{ color: "red" }}
                    ></i>
                  </span>
                </div>
                <div
                  onClick={() => {
                    dispatch(resetPassword(item?.id));
                    setSubmit(true);
                  }}
                  style={{ color: "green" }}
                >
                  <span className="m-l-15" style={{ cursor: "pointer" }}>
                    <i className="fa fa-key"></i>
                  </span>
                </div> */}
          </div>
        </div>
      );
    },
    sortable: false,
    center: true,
  },
];

export const requirementRequestColumns = [
  {
    name: "S. No.",
    cell: (row, index) => index + 1,
    width: "4.25rem",
    center: true,
  },
  {
    name: "Title",
    selector: (row) => row["title"],
    sortable: true,
    center: false,
  },
  {
    name: "Project Name",
    selector: (row) => `${row.project.name}`,
    sortable: true,
    center: true,
  },
  // {
  //   name: "Email",
  //   selector: (row) => `${row.email}`,
  //   sortable: true,
  //   center: true,
  // },
  // {
  //   name: "Phone",
  //   selector: (row) => `${row.phone}`,
  //   sortable: true,
  //   center: true,
  // },
  {
    name: "Status",
    selector: (row) => row["status"],
    sortable: true,
    center: true,
  },

  {
    name: "Action",
    selector: (row) => {
      return (
        <div>
          <div className="cursor__pointer d-flex">
            <Link to={`/projects/requirements/${row?.id}`}>
              <span className="m-l-15" style={{ cursor: "pointer" }}>
                <i className="icofont icofont-ui-edit"></i>
              </span>
            </Link>
          </div>
        </div>
      );
    },
    sortable: false,
    center: true,
  },
];

export const clientTableColumns = [
  {
    name: "S. No.",
    cell: (row, index) => index + 1,
    width: "4.25rem",
    center: true,
  },
  {
    name: "Company Name",
    selector: (row) => row["company"],
    sortable: true,
    center: false,
  },
  {
    name: "Contact Person",
    selector: (row) => row["contact_person"],
    sortable: true,
    center: true,
  },
  {
    name: "Email",
    selector: (row) => `${row.email}`,
    sortable: true,
    center: true,
  },
  {
    name: "Phone",
    selector: (row) => `${row.phone}`,
    sortable: true,
    center: true,
  },
  {
    name: "Status",
    selector: (row) => row["is_active"],
    sortable: true,
    center: true,
  },
  {
    name: "Action",
    selector: (row) => row["priority"],
    sortable: false,
    center: true,
  },
];

export const benefitsTableColumns = [
  {
    name: "S. No.",
    cell: (row, index) => index + 1,
    width: "4.25rem",
    center: true,
  },
  {
    name: "Benefits",
    selector: (row) => row["name"],
    sortable: true,
    center: false,
  },
  {
    name: "Department",
    selector: (row) => `${row.date}`,
    sortable: true,
    center: true,
  },
  {
    name: "Employee",
    selector: (row) => `${row.invoice}`,
    sortable: true,
    center: true,
  },
  {
    name: "From date",
    selector: (row) => `${row.designation}`,
    sortable: true,
    center: true,
  },
  {
    name: "To date",
    selector: (row) => row["credit"],
    sortable: true,
    center: true,
  },
  {
    name: "Description",
    selector: (row) => `${row.company}`,
    sortable: true,
    center: true,
  },
  {
    name: "Status",
    selector: (row) => row["priority"],
    sortable: true,
    center: true,
  },
];

export const attendanceTableColumns = [
  {
    name: "Date",
    selector: (row) => row["name"],
    sortable: true,
    center: false,
  },
  {
    name: "Status",
    selector: (row) => row["priority"],
    sortable: true,
    center: true,
  },
  {
    name: "Arrival Time",
    selector: (row) => `${row.date}`,
    sortable: true,
    center: true,
  },
  {
    name: "Departure Time",
    selector: (row) => `${row.date}`,
    sortable: true,
    center: true,
  },
  {
    name: "Total Working Hours",
    selector: (row) => "04:00",
    sortable: true,
    center: true,
  },
  {
    name: "Shift Hours",
    selector: (row) => "04:00",
    sortable: true,
    center: true,
  },
  {
    name: "Overtime Hours",
    selector: (row) => "04:00",
    sortable: true,
    center: true,
  },
  {
    name: "Status",
    selector: (row) => row["priority"],
    sortable: true,
    center: true,
  },
];

export const projectUserTableColumns = [
  {
    name: "S. No.",
    cell: (row, index) => index + 1,
    width: "4.25rem",
    center: true,
  },
  {
    name: "User",
    selector: (row) => (
      <Media className="d-flex">
        <Image
          attrImage={{
            className: "rounded-circle img-30 me-3",
            src: `${user1}`,
            alt: "Generic placeholder image",
          }}
        />
        <Media body className="align-self-center">
          <div id="TooltipExample">{row?.full_name}</div>
          {/* <Btn attrBtn={{ id: 'TooltipExample' }}>{row?.user?.full_name}</Btn> */}

          <ToolTip
            attrToolTip={{
              placement: "top",
              isOpen: false,
              target: "TooltipExample",
              toggle: () => { },
            }}
          >
            {row?.full_name}
          </ToolTip>
        </Media>
      </Media>
    ),
    sortable: true,
    center: false,
  },
  {
    name: "Email",
    selector: (row) => `${row.email}`,
    sortable: true,
    center: true,
  },
  {
    name: "Department",
    selector: (row) => `${row?.department ?? "N/A"}`,
    sortable: true,
    center: true,
  },
  {
    name: "Role",
    selector: (row) => `${row?.userRole ?? "N/A"}`,
    sortable: true,
    center: true,
  },
  {
    name: "Designation",
    selector: (row) => `${row?.designation?.title ?? "N/A"}`,
    sortable: true,
    center: true,
  },
  {
    name: "Supervisor",
    selector: (row) => `${row?.supervisor?.full_name ?? "N/A"}`,
    sortable: true,
    center: true,
  },
];

export const projectTableColumns = [
  {
    name: "Project Name",
    selector: (row) => (
      <div
      // onClick={() => history(
      //     `${process.env.PUBLIC_URL}/projects/${row?.id}`,
      //     { state: { project_id: row?.id } }
      // )}
      >
        {row?.name}
      </div>
    ),
    sortable: true,
    center: false,
  },
  {
    name: "Address",
    selector: (row) => `${row?.address1}, ${row?.address2}`,
    sortable: false,
    center: true,
    grow: 2,
  },
  {
    name: "City",
    selector: (row) => `${row?.city}`,
    sortable: true,
    center: true,
  },
  {
    name: "Postal Code",
    selector: (row) => `${row?.postal_code}`,
    sortable: true,
    center: true,
  },
  {
    name: "State",
    selector: (row) => `${row?.state}`,
    sortable: true,
    center: true,
  },
  {
    name: "Start Date",
    selector: (row) =>
      `${row?.start_date ? formatDate(row?.start_date) : "NA"}`,
    sortable: true,
    center: true,
  },
  {
    name: "End Date",
    selector: (row) => `${row?.end_date ? formatDate(row?.end_date) : "NA"}`,
    sortable: true,
    center: true,
  },
  {
    name: "Supervisor",
    selector: (row) => `${row?.sup?.full_name}`,
    sortable: true,
    center: true,
  },
  {
    name: "Manager",
    selector: (row) => `${row?.pManager?.full_name}`,
    sortable: true,
    center: true,
  },
  {
    name: "Created By",
    selector: (row) => `${row?.creator?.full_name}`,
    sortable: true,
    center: true,
  },
  {
    name: "Status",
    selector: (row) => `${row?.status}`,
    sortable: true,
    center: true,
  },
];

export const BenefitsData = [
  {
    title: "Leave Benefits",
    icon_id: "leave",
    subTypes: [
      {
        title: "Paid Leave",
        rules: (
          <div>
            <P>Casual Leave / Vacation Leave / Annual Leave</P>
            <P>30 Calendar Days in a Year in the given below process:</P>
            <ul className="p-l-20 m-b-20" style={{ listStyleType: "disc" }}>
              <li className="m-t-5 m-b-5">First 6 months - No Paid Leave</li>
              <li className="m-t-5 m-b-5">
                Between 06 to 12 Months - 1.5 Days Per Month
              </li>
              <li className="m-t-5 m-b-5">
                After 12 Months - 02 Days Per Month or 30 Calendar Days together
              </li>
            </ul>
          </div>
        ),
      },
      {
        title: "Sick Leave",
        rules: (
          <div>
            <P>
              An employee is entitled to a sick leave of not more than 90 days
              per year, only after the end of the probationary period.
            </P>
            <P>
              The 90 days' sick leave can be continuous or intermittent, and the
              salary is paid as follows:
            </P>
            <ul className="p-l-20 m-b-20" style={{ listStyleType: "disc" }}>
              <li className="m-t-5 m-b-5">First 6 months - No Paid Leave</li>
              <li className="m-t-5 m-b-5">
                Between 06 to 12 Months - 1.5 Days Per Month
              </li>
              <li className="m-t-5 m-b-5">
                After 12 Months - 02 Days Per Month or 30 Calendar Days together
              </li>
            </ul>
            <P>
              However, during the probationary period, the employee may get sick
              leave without pay, subject to the approval of the employer and
              based on a medical report issued by the medical entity that
              stipulates the necessity of the leave.
            </P>
            <P>
              <strong>Note:</strong> The above provisions are subject to
              conditions and do not apply to sick leave because of occupational
              illness.
            </P>
            <P>
              On the other hand, the employee is ineligible for a paid sick
              leave in the following situations:
            </P>
            <ul className="p-l-20 m-b-20" style={{ listStyleType: "disc" }}>
              <li className="m-t-5 m-b-5">during the probation period</li>
              <li className="m-t-5 m-b-5">
                if the illness directly arises from the misconduct of the
                worker, such as the consumption of alcohol or narcotics
              </li>
              <li className="m-t-5 m-b-5">
                if the worker violated the safety instructions in accordance
                with the effective legislations in the UAE, and the rules set
                out in the firm's regulations, which the employee was informed
                of.
              </li>
            </ul>
          </div>
        ),
      },
      {
        title: "Paternity Leave",
        rules: (
          <div>
            <P>
              Employees of the private sector are entitled to a parental leave
              of 5 working days from the day of the birth of their child to six
              months. The parental leave is a paid leave that can be applied for
              by both mother and father of the baby.
            </P>
          </div>
        ),
      },
      {
        title: "Maternity Leave",
        rules: (
          <div>
            <P>
              A female worker is entitled to a maternity leave of 60 days, out
              of which:
            </P>
            <ul className="p-l-20 m-b-20" style={{ listStyleType: "disc" }}>
              <li className="m-t-5 m-b-5">45 days will be fully-paid leave</li>
              <li className="m-t-5 m-b-5">15 days will be half-paid leave</li>
            </ul>
            <P>
              A female worker may apply for her maternity leave up to 30 days
              prior to the expected date of delivery.
            </P>
            <P>
              In addition to the basic maternity leave above, she may take an
              additional 45 without pay, if she has an illness as a result of
              pregnancy or childbirth, and is unable to resume work. The illness
              must be proved via a medical certificate issued by the respective
              medical authority. These leave days can be consecutive or
              intermittent.
            </P>
            <P>
              If the baby is sick or suffers from a disability, the female
              worker may take additional leaves of 30 days fully paid. This
              leave can be extended for additional 30 days without pay. The
              illness or disability of the child must be proved via a medical
              certificate issued by the respective medical authority.
            </P>
          </div>
        ),
      },
      {
        title: "Study Leave",
        rules: (
          <div>
            <P>
              Workers pursuing higher education in the UAE can take a paid
              10-day leave every year to sit for examinations.
            </P>
            <P>
              The employee must be a student attending an educational
              institution in the UAE and should have completed at least two
              years of service with the employer.
            </P>
          </div>
        ),
      },
      {
        title: "Bereavement Leave",
        rules: (
          <div>
            <P>
              Bereavement or compassionate leave is for employees, in case of
              the death of a close relative or family member.
            </P>
            <P>
              The number of days of leave may vary slightly, with the UAE Labour
              Law providing :{" "}
            </P>
            <ul className="p-l-20 m-b-20" style={{ listStyleType: "disc" }}>
              <li className="m-t-5 m-b-5">
                five days of paid bereavement leave for the death of a spouse
                and{" "}
              </li>
              <li className="m-t-5 m-b-5">
                three days of paid leave in the event of the death of a parent,
                child, sibling, grandchild, or grandparent.
              </li>
            </ul>
          </div>
        ),
      },
      {
        title: "Compensatory Off",
        rules: (
          <div>
            <P>
              Compensatory Off is an entitled leave that an eligible office
              employee can take on a working day as a compensation for working
              at employers request on a holiday or weekend.
            </P>
          </div>
        ),
      },
      {
        title: "Public Holidays",
        rules: (
          <div>
            <P>Employees are entitled to all National Public Holidays.</P>
            <P>Depends on the yearly calendar issued by the Ministry of UAE.</P>
          </div>
        ),
      },
    ],
  },
  {
    title: "Travel Allowance",
    icon_id: "airplane",
    rules: (
      <div>
        <ul className="p-l-20 m-b-20" style={{ listStyleType: "disc" }}>
          <li className="m-t-5 m-b-5">
            2-way Flight Tickets After Completion of 01 Year for Office Staff
          </li>
          <li className="m-t-5 m-b-5">
            2-way Flight Tickets After Completion of 02 Years for Labour Staff
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "Visa Sponsership",
    icon_id: "visa",
    rules: (
      <div>
        <P>Provided by Company</P>
      </div>
    ),
  },
  {
    title: "Medical Insurance",
    icon_id: "stethoscope",
    rules: (
      <div>
        <P>
          As per UAE Law, the Company is responsible for employee health
          insurance, as a best human resources practice company provides all its
          staff and eligible family members as per employee rank and grade with
          health insurance services through an approved service provider.
        </P>
      </div>
    ),
  },
  {
    title: "Accommodation",
    icon_id: "accomodation",
    rules: (
      <div>
        <ul className="p-l-20 m-b-20" style={{ listStyleType: "disc" }}>
          <li className="m-t-5 m-b-5">For Labours - Provided</li>
          <li className="m-t-5 m-b-5">
            For Others - Subject of Management Approval
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "Transportation",
    icon_id: "bus",
    rules: (
      <div>
        <ul className="p-l-20 m-b-20" style={{ listStyleType: "disc" }}>
          <li className="m-t-5 m-b-5">For Labours - Provided</li>
          <li className="m-t-5 m-b-5">
            For Others - Subject of Management Approval
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "Vehicle",
    icon_id: "car",
    rules: (
      <div>
        <ul className="p-l-20 m-b-20" style={{ listStyleType: "disc" }}>
          <li className="m-t-5 m-b-5">
            For All - Subject of Management Approval
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "Mobile Reimbursement",
    icon_id: "mobile",
    rules: (
      <div>
        <ul className="p-l-20 m-b-20" style={{ listStyleType: "disc" }}>
          <li className="m-t-5 m-b-5">
            Mobile services packages are also one of the benefits that our
            company offers to its employees. Each employee has a different
            package in terms of local & international calls, bill cap and data
            line usage based on the employee's grade.
          </li>
          <li className="m-t-5 m-b-5">
            The employee is expected to use the mobile service in a reasonable
            way and within the limit of each package provided to him/her. Any
            over usage of the services shall be directly deducted from the
            employee's monthly salary unless it is justifiable.
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "Retirals - Graduity",
    icon_id: "retirals",
    rules: (
      <div>
        <ul className="p-l-20 m-b-20" style={{ listStyleType: "disc" }}>
          <li className="m-t-5 m-b-5">
            On leaving the company, & with a minimum of 12 months continuous
            service, you will be entitled to receive end of service benefits
            (ESOB) in accordance with the UAE Labor Law.
          </li>
          <li className="m-t-5 m-b-5">
            ESOB are calculated on your basic salary. Allowances do not form the
            basis of ESOB calculations.
          </li>
          <li className="m-t-5 m-b-5">
            Entitlements are calculated taking into consideration length of
            continuous service, basic salary & whether you have resigned or have
            been terminated.
          </li>
          <li className="m-t-5 m-b-5">
            Final payments will be made only when visa and labor card transfer
            or cancellation documents has been processed and completed. Payment
            is by way of cash.
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "Loan / Advances",
    icon_id: "loan",
    rules: (
      <div>
        <P>
          Company offers interest-free personal loans to its employees as a mean
          of financial assistance. All loans requests will be reviewed by the HR
          & Administration Department for eligibility requirements and are
          subject to the Higher Management.
        </P>
      </div>
    ),
  },
  {
    title: "Rewards & Recognition",
    icon_id: "award",
    rules: (
      <div>
        <ul className="p-l-20 m-b-20" style={{ listStyleType: "disc" }}>
          <li className="m-t-5 m-b-5">
            Our company implements a dynamic performance management system to
            ensure that our internal culture is a performance driven culture.
          </li>
          <li className="m-t-5 m-b-5">
            Our company has a unique bonus system. Bonuses are linked to the
            employee's level and grade and to his / her annual performance
            appraisal results and overall company performance.
          </li>
        </ul>
      </div>
    ),
  },
];
