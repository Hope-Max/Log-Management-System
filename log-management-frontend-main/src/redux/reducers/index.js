import { combineReducers } from "redux";
import acceptNegoReducer from "./acceptNegoReducer";
import accountDeactivateReducer from "./accountDeactivateReducer";
import applyNegoReducer from "./organizationReducer";
import authReducer from "./authReducers";
import cancelShiftReducer from "./cancelShiftReducer.js";
import commonApiReducer from "./commonApiReducer";
import companyProfileReducer from "./companyProfileReducer";
import createShiftReducer from "./createShiftReducer";
import expenseReducer from "./expenseReducer";
import leaveReducer from "./leaveReducer";
import membersReducer from "./membersReducer";
import otpSendResend from "./otpSendResned";
import otpVerifyReducer from "./otpVerifReducer";
import resReducer from "./resReducer";
import subscriptionReducer from "./subscriptionReducer";
import timesheetReducer from "./timesheetReducers";
import projectReducer from "./projectReducer";
import organizationReducer from "./organizationReducer";
import attendanceReducer from "./attendanceReducer";
import payrollReducer from "./payrollReducer";
import procurementReducer from "./procurementReducer";
import estimationReducer from "./estimationReducer"
export default combineReducers({
  auth: authReducer,
  leaveRes: leaveReducer,
  expenseRes: expenseReducer,
  organizationRes: organizationReducer,
  res: resReducer,
  otp: otpSendResend,
  otpVerify: otpVerifyReducer,
  commonApi: commonApiReducer,
  createShift: createShiftReducer,
  companyProfile: companyProfileReducer,
  cancelShift: cancelShiftReducer,
  acceptNego: acceptNegoReducer,
  accountDeactivate: accountDeactivateReducer,
  applyNego: applyNegoReducer,
  cancelShift: cancelShiftReducer,
  membersRes: membersReducer,
  subscriptionRes: subscriptionReducer,
  timesheet: timesheetReducer,
  projectRes: projectReducer,
  procurementRes: procurementReducer,
  attendance: attendanceReducer,
  payroll: payrollReducer,
  estimation: estimationReducer,
});
