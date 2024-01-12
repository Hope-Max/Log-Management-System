// //Samp lePage
import LeavePage from "../Components/Pages/Me/LeavePage";
import Benefits from "../Components/Pages/Me/Benefits";
import TimeSheet from "../Components/Pages/Me/TimeSheet";
import Employee from "../Components/Pages/Organization/Employee";
import AddEmployee from "../Components/Pages/Organization/Employee/AddEmployee";
import ComingSimple from "../Components/Pages/ComingSoon/ComingSimple";
import ExpenseAndTravels from "../Components/Pages/Me/ExpenseAndTravels";
import Performance from "../Components/Pages/Performance";
import MyTeam from "../Components/Pages/MyTeam/Summary";
import Designations from "../Components/Pages/Organization/Designations";
import Assets from "../Components/Pages/Organization/Assets";
import Expenses from "../Components/Pages/Organization/Expenses";
import Announcements from "../Components/Pages/Announcements";
import Reports from "../Components/Pages/Reports";
import Settings from "../Components/Pages/Settings";
import Payroll from "../Components/Pages/Payroll/Payroll";
import Employees from "../Components/Pages/Attendance/Employees";
import LeaveApplication from "../Components/Pages/LeaveTracker/LeaveApplication";
import Holidays from "../Components/Pages/LeaveTracker/Holidays";
import MeAttendance from "../Components/Pages/Me/Attendance";
import LeaveQuota from "../Components/Pages/Settings/LeaveQouta";
import Projects from "../Components/Pages/Projects";
import Project from "../Components/Pages/Projects/Project";
import MonthlyAttendance from "../Components/Pages/Common/MonthlyAttendance";
import ProfilePage from "../Components/Pages/Common/ProfilePage";
import DashBoard from "../Components/Pages/Dashboard/DashBoard";
import Clients from "../Components/Pages/Projects/Clients";
import AddClient from "../Components/Pages/Projects/Clients/AddClient";
import Vendors from "../Components/Pages/Procurement/Vendors";
import AddVendor from "../Components/Pages/Procurement/Vendors/AddVendor";
import Products from "../Components/Pages/Procurement/Products";
import AddProduct from "../Components/Pages/Procurement/Products/ManageProduct";
import Requirements from "../Components/Pages/Projects/Requirements/Requirements";
import AddRequirement from "../Components/Pages/Projects/Requirements/AddRequirement";
import Bills from "../Components/Pages/Estimation/Bills";
import CreateBOQ from "../Components/Pages/Estimation/CreateBOQ";
import ProcurementRequirements from "../Components/Pages/Procurement/Requirements/Requirement";
import BiddingDashboard from "../Components/Pages/Procurement/Bidding/Dashboard";
import EditBOQ from "../Components/Pages/Estimation/EditBOQ";
import ManageRequirement from "../Components/Pages/Procurement/Requirements/ManageRequirement";
import RequestQuotations from "../Components/Pages/Procurement/RequestQuotation";
import ManageQuotation from "../Components/Pages/Procurement/RequestQuotation/ManageQuotation";
import OpenBidding from "../Components/Pages/Procurement/Bidding/OpenBidding";
import QuotationResponses from "../Components/Pages/Procurement/QuotationResponses";
import SearchLog from "../Components/Pages/SearchLog/SearchLog";
import { Company } from "../Constant";
import CreateTicket from "../Components/Pages/Manage/CreateTicket";
import Location  from "../Components/Pages/Manage/Location";
import ViewTicketDetails  from "../Components/Pages/Manage/ViewTicketDetails";
import Organization from "../Components/Pages/Manage/Organization";
import AddOrganization from "../Components/Pages/Manage/AddOrganization";
import Ticket from "../Components/Pages/Manage/Ticket";
import ViewCompanyDetails from "../Components/Pages/Manage/ViewCompanyDetails";
import Contacts from "../Components/Pages/Manage/Contacts";
import CreateContact from "../Components/Pages/Manage/CreateContact";
import ViewContactDetails from "../Components/Pages/Manage/ViewContactDetails";
import Test from "../Components/Pages/Manage/Test";

export const routes = [
  //page
  { path: `${process.env.PUBLIC_URL}/dashboard`, Component: <DashBoard /> },
  { path: `${process.env.PUBLIC_URL}/search-logs`, Component: <SearchLog /> },
  { path: `${process.env.PUBLIC_URL}/monitor`, Component: <ComingSimple /> },
  { path: `${process.env.PUBLIC_URL}/contact-us`, Component: <ComingSimple /> },
  { path: `${process.env.PUBLIC_URL}/reports`, Component: <Reports /> },
  { path: `${process.env.PUBLIC_URL}/manage/user`, Component: <ComingSimple /> },
  { path: `${process.env.PUBLIC_URL}/manage/organization`, Component: <Organization /> },
  { path: `${process.env.PUBLIC_URL}/manage/add-organization`, Component: <AddOrganization /> },
  { path: `${process.env.PUBLIC_URL}/manage/location`, Component: <Location /> },
  { path: `${process.env.PUBLIC_URL}/manage/device`, Component: <ComingSimple /> },
  { path: `${process.env.PUBLIC_URL}/manage/create-ticket`, Component: <CreateTicket /> },
  { path: `${process.env.PUBLIC_URL}/manage/ticket`, Component: <Ticket /> },
  { path: `${process.env.PUBLIC_URL}/manage/view-ticket-details/:id`, Component: <ViewTicketDetails /> },
  { path: `${process.env.PUBLIC_URL}/me/leave`, Component: <LeavePage /> },
  { path: `${process.env.PUBLIC_URL}/me/benefits`, Component: <Benefits /> },
  { path: `${process.env.PUBLIC_URL}/me/timesheets`, Component: <TimeSheet /> },
  { path: `${process.env.PUBLIC_URL}/manage/view-company-details/:id`, Component: <ViewCompanyDetails /> },
  { path: `${process.env.PUBLIC_URL}/manage/contacts`, Component: <Contacts /> },
  { path: `${process.env.PUBLIC_URL}/manage/create-contact`, Component: <CreateContact /> },
  { path: `${process.env.PUBLIC_URL}/manage/view-contact-details/:id`, Component: <ViewContactDetails /> },
  { path: `${process.env.PUBLIC_URL}/manage/test`, Component: <Test /> },
  {
    path: `${process.env.PUBLIC_URL}/me/attendance`,
    Component: <MeAttendance />,
  },
  {
    path: `${process.env.PUBLIC_URL}/me/performance`,
    Component: <Performance />,
  },
  {
    path: `${process.env.PUBLIC_URL}/me/expense`,
    Component: <ExpenseAndTravels />,
  },
  { path: `${process.env.PUBLIC_URL}/my-team/summary`, Component: <MyTeam /> },
  {
    path: `${process.env.PUBLIC_URL}/my-team/overtime`,
    Component: <ComingSimple />,
  },
  {
    path: `${process.env.PUBLIC_URL}/my-finance/summary`,
    Component: <ComingSimple />,
  },
  {
    path: `${process.env.PUBLIC_URL}/my-finance/pay`,
    Component: <ComingSimple />,
  },
  {
    path: `${process.env.PUBLIC_URL}/organization/designations`,
    Component: <Designations />,
  },
  {
    path: `${process.env.PUBLIC_URL}/organization/assets`,
    Component: <Assets />,
  },
  {
    path: `${process.env.PUBLIC_URL}/organization/documents`,
    Component: <ComingSimple />,
  },
  {
    path: `${process.env.PUBLIC_URL}/organization/expenses`,
    Component: <Expenses />,
  },
  {
    path: `${process.env.PUBLIC_URL}/organization/employee`,
    Component: <Employee />,
  },
  {
    path: `${process.env.PUBLIC_URL}/organization/employee/:id`,
    Component: <ProfilePage />,
  },
  {
    path: `${process.env.PUBLIC_URL}/organization/employee/add-employee`,
    Component: <AddEmployee />,
  },
  {
    path: `${process.env.PUBLIC_URL}/organization/employee/edit-employee/:id`,
    Component: <AddEmployee edit />,
  },
  {
    path: `${process.env.PUBLIC_URL}/projects/summary`,
    Component: <ComingSimple />,
  },
  {
    path: `${process.env.PUBLIC_URL}/projects/clients`,
    Component: <Clients />,
  },
  {
    path: `${process.env.PUBLIC_URL}/projects/clients/add`,
    Component: <AddClient />,
  },
  {
    path: `${process.env.PUBLIC_URL}/projects/clients/edit/:id`,
    Component: <AddClient />,
  },
  {
    path: `${process.env.PUBLIC_URL}/projects/requirements`,
    Component: <Requirements />,
  },
  {
    path: `${process.env.PUBLIC_URL}/projects/requirements/:id`,
    Component: <AddRequirement />,
  },
  {
    path: `${process.env.PUBLIC_URL}/projects/requirements/add`,
    Component: <AddRequirement />,
  },
  {
    path: `${process.env.PUBLIC_URL}/projects/project-status`,
    Component: <ComingSimple />,
  },
  {
    path: `${process.env.PUBLIC_URL}/leave-tracker/leave-applications`,
    Component: <LeaveApplication />,
  },
  {
    path: `${process.env.PUBLIC_URL}/leave-tracker/holidays`,
    Component: <Holidays />,
  },
  {
    path: `${process.env.PUBLIC_URL}/attendance/employees`,
    Component: <Employees />,
  },
  {
    path: `${process.env.PUBLIC_URL}/attendance/employees/:id`,
    Component: <MonthlyAttendance />,
  },
  { path: `${process.env.PUBLIC_URL}/payroll`, Component: <Payroll /> },
  {
    path: `${process.env.PUBLIC_URL}/settings/leave-quota`,
    Component: <LeaveQuota />,
  },
  {
    path: `${process.env.PUBLIC_URL}/announcements`,
    Component: <Announcements />,
  },
  { path: `${process.env.PUBLIC_URL}/reports`, Component: <Reports /> },
  { path: `${process.env.PUBLIC_URL}/performance`, Component: <Performance /> },
  { path: `${process.env.PUBLIC_URL}/benefits`, Component: <Benefits /> },
  { path: `${process.env.PUBLIC_URL}/Projects`, Component: <Projects /> },
  {
    path: `${process.env.PUBLIC_URL}/projects/:project`,
    Component: <Project />,
  },
  //Procurement
  {
    path: `${process.env.PUBLIC_URL}/procurement/vendors`,
    Component: <Vendors />,
  },
  {
    path: `${process.env.PUBLIC_URL}/procurement/vendors/add`,
    Component: <AddVendor />,
  },
  {
    path: `${process.env.PUBLIC_URL}/procurement/vendors/edit/:id`,
    Component: <AddVendor />,
  },
  {
    path: `${process.env.PUBLIC_URL}/procurement/products`,
    Component: <Products />,
  },
  {
    path: `${process.env.PUBLIC_URL}/procurement/products/add`,
    Component: <AddProduct />,
  },
  {
    path: `${process.env.PUBLIC_URL}/procurement/products/edit/:id`,
    Component: <AddProduct />,
  },
  {
    path: `${process.env.PUBLIC_URL}/requirements`,
    Component: <BiddingDashboard />,
  },
  {
    path: `${process.env.PUBLIC_URL}/estimation/bills`,
    Component: <Bills />,
  },
  {
    path: `${process.env.PUBLIC_URL}/estimation/boq/create`,
    Component: <CreateBOQ />,
  },
  {
    path: `${process.env.PUBLIC_URL}/estimation/boq/edit/:id`,
    Component: <EditBOQ />,
  },
  {
    path: `${process.env.PUBLIC_URL}/procurement/requirements`,
    Component: <ProcurementRequirements />,
  },
  {
    path: `${process.env.PUBLIC_URL}/procurement/requirements/:id`,
    Component: <ManageRequirement />,
  },
  {
    path: `${process.env.PUBLIC_URL}/procurement/quotation-requests`,
    Component: <RequestQuotations />,
  },
  {
    path: `${process.env.PUBLIC_URL}/procurement/manage-quotation-requests/:id`,
    Component: <ManageQuotation />,
  },
  {
    path: `${process.env.PUBLIC_URL}/bid/:id/:intent`,
    Component: <OpenBidding />,
  },
  {
    path: `${process.env.PUBLIC_URL}/procurement/quotation-responses/:id`,
    Component: <QuotationResponses />,
  },
];

export const hrRoutes = [];

export const adminRoutes = [];

export const commonRoutes = [
  { path: `${process.env.PUBLIC_URL}/dashboard`, Component: <DashBoard /> },

  { path: `${process.env.PUBLIC_URL}/me/leave`, Component: <LeavePage /> },
  { path: `${process.env.PUBLIC_URL}/me/benefits`, Component: <Benefits /> },
  { path: `${process.env.PUBLIC_URL}/me/timesheets`, Component: <TimeSheet /> },
  { path: `${process.env.PUBLIC_URL}/me/attendance`, Component: <MeAttendance /> },
  { path: `${process.env.PUBLIC_URL}/me/performance`, Component: <Performance /> },
  { path: `${process.env.PUBLIC_URL}/me/expense`, Component: <ExpenseAndTravels /> },
];

export const cleanerRoutes = [
  ...commonRoutes
];

export const labourRoutes = [
  ...commonRoutes
];

export const driverRoutes = [
  ...commonRoutes
];

export const siteConstructionRoutes = [
  ...commonRoutes
];

// Procurement Department 
export const estimationRoutes = [
  ...commonRoutes,
  { path: `${process.env.PUBLIC_URL}/estimation/bills`, Component: <Bills /> },

  { path: `${process.env.PUBLIC_URL}/estimation/boq/create`, Component: <CreateBOQ /> },
  { path: `${process.env.PUBLIC_URL}/estimation/boq/edit/:id`, Component: <EditBOQ /> },
];

// Vendor Routes
export const vendorRoutes = [
  { path: `${process.env.PUBLIC_URL}/bid/:id/:intent`, Component: <OpenBidding /> },
  { path: `${process.env.PUBLIC_URL}/requirements`, Component: <BiddingDashboard /> },
  { path: `${process.env.PUBLIC_URL}/my-bids`, Component: <ComingSimple /> },
]

// Procurement Department Routes
export const procurementRoutes = [
  ...commonRoutes,
  { path: `${process.env.PUBLIC_URL}/procurement/vendors`, Component: <Vendors /> },
  { path: `${process.env.PUBLIC_URL}/procurement/vendors/add`, Component: <AddVendor /> },
  { path: `${process.env.PUBLIC_URL}/procurement/vendors/edit/:id`, Component: <AddVendor /> },

  { path: `${process.env.PUBLIC_URL}/procurement/products`, Component: <Products /> },
  { path: `${process.env.PUBLIC_URL}/procurement/products/add`, Component: <AddProduct /> },
  { path: `${process.env.PUBLIC_URL}/procurement/products/edit/:id`, Component: <AddProduct /> },

  { path: `${process.env.PUBLIC_URL}/procurement/requirements`, Component: <ProcurementRequirements /> },
  { path: `${process.env.PUBLIC_URL}/procurement/requirements/:id`, Component: <ManageRequirement /> },

  { path: `${process.env.PUBLIC_URL}/procurement/quotation-requests`, Component: <RequestQuotations /> },
  { path: `${process.env.PUBLIC_URL}/procurement/manage-quotation-requests/:id`, Component: <ManageQuotation /> },

  { path: `${process.env.PUBLIC_URL}/procurement/quotation-responses/:id`, Component: <QuotationResponses /> },

  ...vendorRoutes
];

export const directorRoutes = [

];
