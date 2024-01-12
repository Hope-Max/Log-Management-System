import { ESTIMATIONNITEMS, MENUITEMS, PROCUREMENTITEMS, USERMENUITEMS, VENDORMENUITEMS } from './Menu';

export const getMenuItems = () => {
	const role = JSON.parse(localStorage.getItem('user'))?.userRole;
	const userType = JSON.parse(localStorage.getItem('user'))?.userType;
	const userDept = JSON.parse(localStorage.getItem('user'))?.department
	console.log("USER MENU DEPT", userDept)
	if (role == 'admin' || role == 'hr') {
		return MENUITEMS;
	} else if (userType === 'vendor') {
		return VENDORMENUITEMS;
	}
	else if (userDept === 'Estimation Department') {
		return ESTIMATIONNITEMS
	}
	else if (userDept === 'Procurement Department') {
		return PROCUREMENTITEMS
	}
	else {
		return USERMENUITEMS;
	}
};
