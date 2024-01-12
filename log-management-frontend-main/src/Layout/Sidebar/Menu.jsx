export const USERMENUITEMS = [
  {
    menutitle: "",
    menucontent: "Dashboards,Widgets",
    Items: [
      {
        title: "Dashboard",
        icon: "home",
        active: false,
        path: `${process.env.PUBLIC_URL}/dashboard`,
        type: "link",
      },
      {
        title: "Search Logs",
        icon: "search",
        active: false,
        path: `${process.env.PUBLIC_URL}/search-logs`,
        type: "link",
      },
      {
        title: "Monitor",
        icon: "charts",
        active: false,
        path: `${process.env.PUBLIC_URL}/monitor`,
        type: "link",
      },
      {
        title: "Contact Us",
        icon: "contact",
        active: false,
        path: `${process.env.PUBLIC_URL}/contact-us`,
        type: "link",
      },
      {
        title: "Reports",
        icon: "sample-page",
        active: false,
        path: `${process.env.PUBLIC_URL}/reports`,
        type: "link",
      },
      {
        title: "Manage",
        icon: "editors",
        active: false,
        path: `${process.env.PUBLIC_URL}/manage`,
        type: "sub",
        children: [
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/manage/user`,
            title: "User",
            type: "link",
          },
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/manage/organization`,
            title: "Organization",
            type: "link",
          },
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/manage/location`,
            title: "Location",
            type: "link",
          },
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/manage/device`,
            title: "Device",
            type: "link",
          },  
           {
            active: false,
            path: `${process.env.PUBLIC_URL}/manage/ticket`,
            title: "Ticket",
            type: "link",
          },
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/manage/view-company-details`,
            title: "Company Details",
            type: "link",
          },
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/manage/contacts`,
            title: "Contacts",
            type: "link",
          },
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/manage/test`,
            title: "Test",
            type: "link",
          },
        ]
      },
    ],
  }
];

export const MENUITEMS = [
  {
    menutitle: "",
    menucontent: "Dashboards,Widgets",
    Items: [
      {
        title: "Dashboard",
        icon: "home",
        active: false,
        path: `${process.env.PUBLIC_URL}/dashboard`,
        type: "link",
      },
      {
        title: "Me",
        icon: "user",
        active: false,
        path: `${process.env.PUBLIC_URL}/me`,
        type: "sub",
        children: [
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/me/leave`,
            title: "Leave",
            type: "link",
          },
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/me/benefits`,
            title: "Benefits",
            type: "link",
          },
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/me/timesheets`,
            title: "Timesheets",
            type: "link",
          },
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/me/attendance`,
            title: "Attendance",
            type: "link",
          },
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/me/performance`,
            title: "Performance",
            type: "link",
          },
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/me/expense`,
            title: "Expense & Travels",
            type: "link",
          },
        ],
      },
      {
        title: "Leave Tracker",
        icon: "faq",
        active: false,
        path: `${process.env.PUBLIC_URL}/leave-tracker`,
        type: "sub",
        children: [
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/leave-tracker/leave-applications`,
            title: "Leave Applications",
            type: "link",
          },
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/leave-tracker/holidays`,
            title: "Holidays",
            type: "link",
          },
        ],
      },
      {
        title: "Attendance Tracker",
        icon: "calendar",
        active: false,
        path: `${process.env.PUBLIC_URL}/attendance`,
        type: "sub",
        children: [
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/attendance/employees`,
            title: "Employees",
            type: "link",
          },
        ],
      },
      {
        title: "Benefits Policy",
        icon: "bonus-kit",
        active: false,
        path: `${process.env.PUBLIC_URL}/benefits`,
        type: "link",
      },
      // {
      //     title: 'Performance',
      //     icon: 'sample-page',
      //     active: false,
      //     path: `${process.env.PUBLIC_URL}/performance`,
      //     type: 'link'
      // },
      {
        title: "My Team",
        icon: "user",
        active: false,
        path: `${process.env.PUBLIC_URL}/my-team`,
        type: "sub",
        children: [
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/my-team/summary`,
            title: "Summary",
            type: "link",
          },
          // {
          //     active: false,
          //     path: `${process.env.PUBLIC_URL}/my-team/overtime`,
          //     title: 'Overtime',
          //     type: 'link'
          // }
        ],
      },
      // {
      //     title: 'My Finance',
      //     icon: 'sample-page',
      //     active: false,
      //     type: 'sub',
      //     children: [
      //         {
      //             active: false,
      //             path: `${process.env.PUBLIC_URL}/my-finance/summary`,
      //             title: 'Summary',
      //             type: 'link'
      //         },
      //         {
      //             active: false,
      //             path: `${process.env.PUBLIC_URL}/my-finance/pay`,
      //             title: 'My Pay',
      //             type: 'link'
      //         }
      //     ]
      // },
      {
        title: "Organization",
        icon: "social",
        active: false,
        type: "sub",
        children: [
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/organization/employee`,
            title: "Employee",
            type: "link",
          },
          // {
          //   active: false,
          //   path: `${process.env.PUBLIC_URL}/organization/designations`,
          //   title: "Designation",
          //   type: "link",
          // },
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/organization/assets`,
            title: "Asset",
            type: "link",
          },
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/organization/documents`,
            title: "Document",
            type: "link",
          },
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/organization/expenses`,
            title: "Expense",
            type: "link",
          },
        ],
      },
      // {
      //     title: 'Announcements',
      //     icon: 'sample-page',
      //     active: false,
      //     path: `${process.env.PUBLIC_URL}/announcements`,
      //     type: 'link'
      // },
      {
        title: "Payroll",
        icon: "task",
        active: false,
        path: `${process.env.PUBLIC_URL}/payroll`,
        type: "link",
      },
      // {
      //   title: "Settings",
      //   icon: "sample-page",
      //   active: false,
      //   path: `${process.env.PUBLIC_URL}/settings`,
      //   type: "sub",
      //   children: [
      //     {
      //       active: false,
      //       path: `${process.env.PUBLIC_URL}/settings/leave-quota`,
      //       title: "Leave Quota",
      //       type: "link",
      //     },
      //   ],
      // },
      {
        title: "Reports",
        icon: "sample-page",
        active: false,
        path: `${process.env.PUBLIC_URL}/Reports`,
        type: "link",
      },
      {
        title: "Project Management",
        icon: "project",
        active: false,
        type: "sub",
        children: [
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/projects`,
            title: "Projects",
            type: "link",
          },
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/projects/clients`,
            title: "Clients",
            type: "link",
          },
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/projects/requirements`,
            title: "Requirements",
            type: "link",
          },
        ],
      },
      {
        title: "Procurement",
        icon: "ecommerce",
        active: false,
        type: "sub",
        children: [
          // {
          //   active: false,
          //   path: `${process.env.PUBLIC_URL}/purchase/requisition`,
          //   title: "Purchase Requisitions",
          //   type: "link",
          // },
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/procurement/summary`,
            title: "Summary",
            type: "link",
          },
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/procurement/requirements`,
            title: "Requirements",
            type: "link",
          },
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/procurement/quotation-requests`,
            title: "Quotation-Requests",
            type: "link",
          },
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/purchase/orders`,
            title: "Purchase Orders",
            type: "link",
          },
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/procurement/invoices`,
            title: "Invoices",
            type: "link",
          },
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/procurement/products`,
            title: "Reports",
            type: "link",
          },
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/procurement/vendors`,
            title: "Vendors",
            type: "link",
          },
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/Procurement/products`,
            title: "Products",
            type: "link",
          },
        ],
      },
      {
        title: "Estimation",
        icon: "project",
        active: false,
        type: "sub",
        children: [
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/estimation/bills`,
            title: "Bills",
            type: "link",
          },
        ],
      },
    ],
  },
];

export const VENDORMENUITEMS = [
  {
    menutitle: "",
    menucontent: "Dashboards,Widgets",
    Items: [
      {
        title: "Requirements",
        icon: "sample-page",
        active: false,
        path: `${process.env.PUBLIC_URL}/requirements`,
        type: "link",
      },
      {
        title: "My Bids",
        icon: "faq",
        active: false,
        path: `${process.env.PUBLIC_URL}/my-bids`,
        type: "link",
      },
    ],
  },
];

const generalItems = [
  {
    title: "Dashboard",
    icon: "home",
    active: false,
    path: `${process.env.PUBLIC_URL}/dashboard`,
    type: "link",
  },
  {
    title: "Me",
    icon: "user",
    active: false,
    path: `${process.env.PUBLIC_URL}/me`,
    type: "sub",
    children: [
      {
        active: false,
        path: `${process.env.PUBLIC_URL}/me/leave`,
        title: "Leave",
        type: "link",
      },
      {
        active: false,
        path: `${process.env.PUBLIC_URL}/me/benefits`,
        title: "Benefits",
        type: "link",
      },
      {
        active: false,
        path: `${process.env.PUBLIC_URL}/me/timesheets`,
        title: "Timesheets",
        type: "link",
      },
      {
        active: false,
        path: `${process.env.PUBLIC_URL}/me/attendance`,
        title: "Attendance",
        type: "link",
      },
      {
        active: false,
        path: `${process.env.PUBLIC_URL}/me/performance`,
        title: "Performance",
        type: "link",
      },
      {
        active: false,
        path: `${process.env.PUBLIC_URL}/me/expense`,
        title: "Expense & Travels",
        type: "link",
      },
    ],
  },
];

export const ESTIMATIONNITEMS = [
  {
    menutitle: "",
    menucontent: "Dashboards,Widgets",
    Items: [
      ...generalItems,
      {
        title: "Estimation",
        icon: "project",
        active: false,
        type: "sub",
        children: [
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/estimation/bills`,
            title: "Bills",
            type: "link",
          },
        ],
      },
    ],
  },
];

export const PROCUREMENTITEMS = [
  {
    menutitle: "",
    menucontent: "Dashboards,Widgets",
    Items: [
      ...generalItems,
      {
        title: "Procurement",
        icon: "ecommerce",
        active: false,
        type: "sub",
        children: [
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/procurement/summary`,
            title: "Summary",
            type: "link",
          },
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/procurement/requirements`,
            title: "Requirements",
            type: "link",
          },
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/procurement/quotation-requests`,
            title: "Quotation-Requests",
            type: "link",
          },
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/purchase/orders`,
            title: "Purchase Orders",
            type: "link",
          },
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/procurement/invoices`,
            title: "Invoices",
            type: "link",
          },
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/procurement/products`,
            title: "Reports",
            type: "link",
          },
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/procurement/vendors`,
            title: "Vendors",
            type: "link",
          },
          {
            active: false,
            path: `${process.env.PUBLIC_URL}/Procurement/products`,
            title: "Products",
            type: "link",
          },
        ],
      },
    ],
  },
];


