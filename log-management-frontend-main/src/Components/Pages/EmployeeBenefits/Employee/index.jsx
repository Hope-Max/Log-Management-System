import React, { Fragment } from 'react';
import { Form, ToggleButton } from 'react-bootstrap';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import { H5, P } from '../../../../AbstractElements';
import styles from './Organization.module.css';
import SvgIcon from '../../../Common/Component/SvgIcon';

const Employee = () => {
	return (
		<Fragment>
			{/* <Breadcrumbs mainTitle="Sample Card" parent="Pages" title="Sample Card" /> */}
			<Container fluid={true}>
				<Row>
					<Col sm="12">
						<Card>
							<CardHeader style={{ margin: '0px !important', justifyContent: 'spaceAround' }}>
								<div>
									<H5>My Employees</H5>
									<P>(200)</P>
									<P>Company Employee</P>
									<Form>
										<Form.Check
											type="switch"
											id="custom-switch"
											label="Check this switch"
											checked
										/>
									</Form>
									{/* <SvgIcon className="stroke-icon" iconId={`fill-${'sample-page'}`} />
								<SvgIcon className="stroke-icon" iconId={`fill-${'sample-page'}`} />
								<SvgIcon className="stroke-icon" iconId={`fill-${'sample-page'}`} />
								<SvgIcon className="stroke-icon" iconId={`fill-${'sample-page'}`} />
								<SvgIcon className="stroke-icon" iconId={`fill-${'sample-page'}`} />
								<SvgIcon className="stroke-icon" iconId={`fill-${'sample-page'}`} /> */}
								</div>
							</CardHeader>
							<CardBody>
								<P>
									"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
									incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
									exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
									irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
									pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
									deserunt mollit anim id est laborum."
								</P>
							</CardBody>
						</Card>
					</Col>
				</Row>
				<Organization />
			</Container>
		</Fragment>
	);
};

export default Employee;

export const Organization = () => {
	return (
		<div className={styles.organization}>
			<div className={styles.organizationChild} />
			<div className={styles.organizationItem} />
			<div className={styles.div}>
				<span className={styles.span}>50</span>
				<span className={styles.span1}>{` `}</span>
			</div>
			<img className={styles.vector2Stroke} alt="" src="/vector-2-stroke.svg" />
			<div className={styles.organizationInner} />
			<div className={styles.rectangleParent}>
				<div className={styles.groupChild} />
				<img className={styles.bytesizefilterIcon} alt="" src="/bytesizefilter.svg" />
			</div>
			<div className={styles.rectangleGroup}>
				<div className={styles.groupChild} />
				<img className={styles.feimportIcon} alt="" src="/feimport.svg" />
			</div>
			<img className={styles.vectorIcon} alt="" src="/vector.svg" />
			<div className={styles.rectangleContainer}>
				<div className={styles.groupChild} />
				<img className={styles.akarIconssearch} alt="" src="/akariconssearch.svg" />
			</div>
			<div className={styles.groupDiv}>
				<div className={styles.groupChild} />
			</div>
			<div className={styles.myEmployees}>My Employees</div>
			<div className={styles.div1}>(500)</div>
			<div className={styles.organizationChild1} />
			<div className={styles.addEmployee}>+ Add Employee</div>
			<img className={styles.icbaselineBackupTableIcon} alt="" src="/icbaselinebackuptable.svg" />
			<div className={styles.attendanceDetails}>
				<div className={styles.columnFixed}>
					<div className={styles.tableCellHeaderParent}>
						<div className={styles.tableCellHeader}>
							<div className={styles.text}>Check box</div>
							<img className={styles.sortIcon} alt="" />
						</div>
						<img className={styles.bxcheckboxIcon} alt="" src="/bxcheckbox.svg" />
					</div>
					<div className={styles.tableCellHeaderGroup}>
						<div className={styles.tableCellHeader1}>
							<div className={styles.text}>Check box</div>
							<img className={styles.sortIcon} alt="" />
						</div>
						<img className={styles.bxcheckboxIcon} alt="" src="/bxcheckbox.svg" />
					</div>
					<div className={styles.tableCellHeaderGroup}>
						<div className={styles.tableCellHeader2}>
							<div className={styles.text}>Check box</div>
							<img className={styles.sortIcon} alt="" />
						</div>
						<img className={styles.bxcheckboxIcon} alt="" src="/bxcheckbox.svg" />
					</div>
					<div className={styles.tableCellHeaderGroup}>
						<div className={styles.tableCellHeader2}>
							<div className={styles.text}>Check box</div>
							<img className={styles.sortIcon} alt="" />
						</div>
						<img className={styles.bxcheckboxIcon} alt="" src="/bxcheckbox.svg" />
					</div>
					<div className={styles.tableCellHeaderGroup}>
						<div className={styles.tableCellHeader2}>
							<div className={styles.text}>Check box</div>
							<img className={styles.sortIcon} alt="" />
						</div>
						<img className={styles.bxcheckboxIcon} alt="" src="/bxcheckbox.svg" />
					</div>
					<div className={styles.tableCellHeaderGroup}>
						<div className={styles.tableCellHeader2}>
							<div className={styles.text}>Check box</div>
							<img className={styles.sortIcon} alt="" />
						</div>
						<img className={styles.bxcheckboxIcon} alt="" src="/bxcheckbox.svg" />
					</div>
					<div className={styles.tableCellHeaderGroup}>
						<div className={styles.tableCellHeader2}>
							<div className={styles.text}>Check box</div>
							<img className={styles.sortIcon} alt="" />
						</div>
						<img className={styles.bxcheckboxIcon} alt="" src="/bxcheckbox.svg" />
					</div>
				</div>
				<div className={styles.columnFixed1}>
					<div className={styles.tableCellHeader7}>
						<div className={styles.text7}>Employee Name</div>
						<img className={styles.sortIcon} alt="" />
						<img
							className={styles.heroiconsSolidsortAscending}
							alt=""
							src="/heroiconssolidsortascending.svg"
						/>
					</div>
					<div className={styles.tableCellParent}>
						<div className={styles.tableCell}>
							<div className={styles.text8} />
						</div>
						<img className={styles.ellipseIcon} alt="" src="/ellipse-1176.svg" />
						<div className={styles.text9}>Harsh Sharma</div>
					</div>
					<div className={styles.tableCellParent}>
						<div className={styles.tableCell1}>
							<div className={styles.text8} />
						</div>
						<img className={styles.ellipseIcon} alt="" src="/ellipse-1176.svg" />
						<div className={styles.text9}>Nikita</div>
					</div>
					<div className={styles.tableCellParent}>
						<div className={styles.tableCell1}>
							<div className={styles.text8} />
						</div>
						<img className={styles.ellipseIcon} alt="" src="/ellipse-1176.svg" />
						<div className={styles.text9}>Nishad</div>
					</div>
					<div className={styles.tableCellParent}>
						<div className={styles.tableCell1}>
							<div className={styles.text8} />
						</div>
						<img className={styles.ellipseIcon} alt="" src="/ellipse-1176.svg" />
						<div className={styles.text9}>Shabeer</div>
					</div>
					<div className={styles.tableCellParent}>
						<div className={styles.tableCell1}>
							<div className={styles.text8} />
						</div>
						<img className={styles.ellipseIcon} alt="" src="/ellipse-1176.svg" />
						<div className={styles.text9}>Harsh Sharma</div>
					</div>
					<div className={styles.tableCellParent}>
						<div className={styles.tableCell1}>
							<div className={styles.text8} />
						</div>
						<img className={styles.ellipseIcon} alt="" src="/ellipse-1176.svg" />
						<div className={styles.text19}>Harsh Sharma</div>
					</div>
				</div>
				<div className={styles.columnFixed2}>
					<div className={styles.tableCellHeader8}>
						<div className={styles.text7}>Email</div>
						<img className={styles.sortIcon} alt="" />
						<img
							className={styles.heroiconsSolidsortAscending}
							alt=""
							src="/heroiconssolidsortascending.svg"
						/>
					</div>
					<div className={styles.tableCellParent4}>
						<div className={styles.tableCell6}>
							<div className={styles.text8} />
						</div>
						<div className={styles.text22}>harsh12@gmail.com</div>
					</div>
					<div className={styles.tableCellParent4}>
						<div className={styles.tableCell6}>
							<div className={styles.text8} />
						</div>
						<div className={styles.text22}>harsh12@gmail.com</div>
					</div>
					<div className={styles.tableCellParent4}>
						<div className={styles.tableCell6}>
							<div className={styles.text8} />
						</div>
						<div className={styles.text22}>harsh12@gmail.com</div>
					</div>
					<div className={styles.tableCellParent4}>
						<div className={styles.tableCell6}>
							<div className={styles.text8} />
						</div>
						<div className={styles.text22}>harsh12@gmail.com</div>
					</div>
					<div className={styles.tableCellParent4}>
						<div className={styles.tableCell6}>
							<div className={styles.text8} />
						</div>
						<div className={styles.text22}>harsh12@gmail.com</div>
					</div>
					<div className={styles.tableCellParent4}>
						<div className={styles.tableCell6}>
							<div className={styles.text8} />
						</div>
						<div className={styles.text22}>harsh12@gmail.com</div>
					</div>
				</div>
				<div className={styles.columnFixed3}>
					<div className={styles.tableCellHeader9}>
						<div className={styles.text7}>Role</div>
						<img className={styles.sortIcon} alt="" />
						<img
							className={styles.heroiconsSolidsortAscending}
							alt=""
							src="/heroiconssolidsortascending.svg"
						/>
					</div>
					<div className={styles.tableCellParent10}>
						<div className={styles.tableCell12}>
							<div className={styles.text8} />
						</div>
						<div className={styles.text35}>Demo Role</div>
					</div>
					<div className={styles.tableCellParent10}>
						<div className={styles.tableCell12}>
							<div className={styles.text8} />
						</div>
						<div className={styles.text35}>Demo Role</div>
					</div>
					<div className={styles.tableCellParent10}>
						<div className={styles.tableCell12}>
							<div className={styles.text8} />
						</div>
						<div className={styles.text35}>Demo Role</div>
					</div>
					<div className={styles.tableCellParent10}>
						<div className={styles.tableCell12}>
							<div className={styles.text8} />
						</div>
						<div className={styles.text35}>Demo Role</div>
					</div>
					<div className={styles.tableCellParent10}>
						<div className={styles.tableCell12}>
							<div className={styles.text8} />
						</div>
						<div className={styles.text35}>Demo Role</div>
					</div>
					<div className={styles.tableCellParent10}>
						<div className={styles.tableCell12}>
							<div className={styles.text8} />
						</div>
						<div className={styles.text35}>Demo Role</div>
					</div>
				</div>
				<div className={styles.columnFixed1}>
					<div className={styles.tableCellHeader10}>
						<div className={styles.text7}>Designation</div>
						<img className={styles.sortIcon} alt="" />
						<img
							className={styles.heroiconsSolidsortAscending}
							alt=""
							src="/heroiconssolidsortascending.svg"
						/>
					</div>
					<div className={styles.tableCellParent}>
						<div className={styles.tableCell}>
							<div className={styles.text8} />
						</div>
						<div className={styles.text48}>Demo Desigantion</div>
					</div>
					<div className={styles.tableCellParent}>
						<div className={styles.tableCell}>
							<div className={styles.text8} />
						</div>
						<div className={styles.text48}>Demo Desigantion</div>
					</div>
					<div className={styles.tableCellParent}>
						<div className={styles.tableCell}>
							<div className={styles.text8} />
						</div>
						<div className={styles.text48}>Demo Desigantion</div>
					</div>
					<div className={styles.tableCellParent}>
						<div className={styles.tableCell}>
							<div className={styles.text8} />
						</div>
						<div className={styles.text48}>Demo Desigantion</div>
					</div>
					<div className={styles.tableCellParent}>
						<div className={styles.tableCell}>
							<div className={styles.text8} />
						</div>
						<div className={styles.text48}>Demo Desigantion</div>
					</div>
					<div className={styles.tableCellParent}>
						<div className={styles.tableCell}>
							<div className={styles.text8} />
						</div>
						<div className={styles.text48}>Demo Desigantion</div>
					</div>
				</div>
				<div className={styles.columnFixed1}>
					<div className={styles.tableCellHeader10}>
						<div className={styles.text7}>Supervisor</div>
						<img className={styles.sortIcon} alt="" />
						<img
							className={styles.heroiconsSolidsortAscending}
							alt=""
							src="/heroiconssolidsortascending.svg"
						/>
					</div>
					<div className={styles.tableCellParent}>
						<div className={styles.tableCell}>
							<div className={styles.text8} />
						</div>
						<div className={styles.text61}>Sitesh Sharma</div>
					</div>
					<div className={styles.tableCellParent}>
						<div className={styles.tableCell}>
							<div className={styles.text8} />
						</div>
						<div className={styles.text61}>Sitesh Sharma</div>
					</div>
					<div className={styles.tableCellParent}>
						<div className={styles.tableCell}>
							<div className={styles.text8} />
						</div>
						<div className={styles.text61}>Sitesh Sharma</div>
					</div>
					<div className={styles.tableCellParent}>
						<div className={styles.tableCell}>
							<div className={styles.text8} />
						</div>
						<div className={styles.text61}>Sitesh Sharma</div>
					</div>
					<div className={styles.tableCellParent}>
						<div className={styles.tableCell}>
							<div className={styles.text8} />
						</div>
						<div className={styles.text61}>Sitesh Sharma</div>
					</div>
					<div className={styles.tableCellParent}>
						<div className={styles.tableCell}>
							<div className={styles.text8} />
						</div>
						<div className={styles.text61}>Sitesh Sharma</div>
					</div>
				</div>
				<div className={styles.columnFixed6}>
					<div className={styles.tableCellHeader12}>
						<div className={styles.text7}>Status</div>
						<img className={styles.sortIcon} alt="" />
						<img
							className={styles.heroiconsSolidsortAscending}
							alt=""
							src="/heroiconssolidsortascending.svg"
						/>
					</div>
					<div className={styles.tableCellWrapper}>
						<div className={styles.tableCell30}>
							<div className={styles.textWrapper}>
								<div className={styles.text73}>Active</div>
							</div>
							<div className={styles.text74} />
						</div>
					</div>
					<div className={styles.tableCellFrame}>
						<div className={styles.tableCell30}>
							<div className={styles.textContainer}>
								<div className={styles.text73}>De-Active</div>
							</div>
							<div className={styles.text74} />
						</div>
					</div>
					<div className={styles.tableCellWrapper}>
						<div className={styles.tableCell30}>
							<div className={styles.textWrapper}>
								<div className={styles.text73}>Active</div>
							</div>
							<div className={styles.text74} />
						</div>
					</div>
					<div className={styles.tableCellFrame}>
						<div className={styles.tableCell30}>
							<div className={styles.textContainer}>
								<div className={styles.text73}>De-Active</div>
							</div>
							<div className={styles.text74} />
						</div>
					</div>
					<div className={styles.tableCellWrapper}>
						<div className={styles.tableCell30}>
							<div className={styles.textWrapper}>
								<div className={styles.text73}>Active</div>
							</div>
							<div className={styles.text74} />
						</div>
					</div>
					<div className={styles.tableCellFrame}>
						<div className={styles.tableCell30}>
							<div className={styles.textContainer}>
								<div className={styles.text73}>De-Active</div>
							</div>
							<div className={styles.text74} />
						</div>
					</div>
				</div>
				<div className={styles.columnFixed7}>
					<div className={styles.tableCellHeader13}>
						<div className={styles.text7}>Action</div>
						<img className={styles.sortIcon} alt="" />
						<img
							className={styles.heroiconsSolidsortAscending}
							alt=""
							src="/heroiconssolidsortascending.svg"
						/>
					</div>
					<div className={styles.tableCellWrapper5}>
						<div className={styles.tableCell36}>
							<img className={styles.bxdotsVerticalRoundedIcon} alt="" src="/bxdotsverticalrounded.svg" />
							<div className={styles.text8} />
						</div>
					</div>
					<div className={styles.tableCellWrapper5}>
						<div className={styles.tableCell36}>
							<img className={styles.bxdotsVerticalRoundedIcon} alt="" src="/bxdotsverticalrounded.svg" />
							<div className={styles.text8} />
						</div>
					</div>
					<div className={styles.tableCellWrapper5}>
						<div className={styles.tableCell36}>
							<img className={styles.bxdotsVerticalRoundedIcon} alt="" src="/bxdotsverticalrounded.svg" />
							<div className={styles.text8} />
						</div>
					</div>
					<div className={styles.tableCellWrapper5}>
						<div className={styles.tableCell36}>
							<img className={styles.bxdotsVerticalRoundedIcon} alt="" src="/bxdotsverticalrounded.svg" />
							<div className={styles.text8} />
						</div>
					</div>
					<div className={styles.tableCellWrapper5}>
						<div className={styles.tableCell36}>
							<img className={styles.bxdotsVerticalRoundedIcon} alt="" src="/bxdotsverticalrounded.svg" />
							<div className={styles.text8} />
						</div>
					</div>
					<div className={styles.tableCellWrapper5}>
						<div className={styles.tableCell36}>
							<img className={styles.bxdotsVerticalRoundedIcon} alt="" src="/bxdotsverticalrounded.svg" />
							<div className={styles.text8} />
						</div>
					</div>
				</div>
				<div className={styles.columnFixed8}>
					<div className={styles.tableCellHeader14}>
						<div className={styles.text92}>Part Group</div>
						<img className={styles.sortIcon14} alt="" src="/sort.svg" />
					</div>
					<div className={styles.tableCellHeader15}>
						<div className={styles.text93}>Water pump</div>
						<img className={styles.sortIcon14} alt="" src="/sort1.svg" />
					</div>
					<div className={styles.tableCellHeader15}>
						<div className={styles.text93}>Water pump</div>
						<img className={styles.sortIcon14} alt="" src="/sort1.svg" />
					</div>
					<div className={styles.tableCellHeader15}>
						<div className={styles.text93}>Water pump</div>
						<img className={styles.sortIcon14} alt="" src="/sort1.svg" />
					</div>
					<div className={styles.tableCellHeader15}>
						<div className={styles.text93}>Engine</div>
						<img className={styles.sortIcon14} alt="" src="/sort1.svg" />
					</div>
					<div className={styles.tableCellHeader15}>
						<div className={styles.text93}>Water pump</div>
						<img className={styles.sortIcon14} alt="" src="/sort1.svg" />
					</div>
					<div className={styles.tableCellHeader15}>
						<div className={styles.text93}>Piston</div>
						<img className={styles.sortIcon14} alt="" src="/sort1.svg" />
					</div>
				</div>
			</div>
			<div className={styles.companyEmployee}>Company Employee</div>
			<div className={styles.contractreeLabour}>Contractree Labour</div>
			<img className={styles.fontistotoggleOffIcon} alt="" src="/fontistotoggleoff.svg" />
			<div className={styles.organizationChild2} />
			<img className={styles.rectangleIcon} alt="" src="/rectangle-3246.svg" />
			<div className={styles.organizationChild3} />
			<img className={styles.octiconbell24} alt="" src="/octiconbell24.svg" />
			<div className={styles.organizationChild4} />
			<img className={styles.groupIcon} alt="" src="/group-3810.svg" />
			<img className={styles.avatarIcon} alt="" />
			<div className={styles.dashboard}>Dashboard</div>
			<div className={styles.leaveTracker}>Leave Tracker</div>
			<div className={styles.attendance}>Attendance</div>
			<div className={styles.employeeBenefits}>Employee Benefits</div>
			<div className={styles.announcements}>Announcements</div>
			<div className={styles.reports}>Reports</div>
			<div className={styles.hrLetter}>HR Letter</div>
			<div className={styles.performance}>Performance</div>
			<img className={styles.akarIconsdashboard} alt="" src="/akariconsdashboard.svg" />
			<div className={styles.organization1}>Organization</div>
			<img className={styles.organizationChild5} alt="" src="/rectangle-5784.svg" />
			<img className={styles.organizationChild6} alt="" src="/group-39614.svg" />
			<img className={styles.grommetIconsdocumentPerform} alt="" src="/grommeticonsdocumentperformance.svg" />
			<img className={styles.vuesaxlinearcalendarIcon} alt="" src="/vuesaxlinearcalendar.svg" />
			<img className={styles.organizationChild7} alt="" src="/group-39615.svg" />
			<img className={styles.octiconorganization24} alt="" src="/octiconorganization24.svg" />
			<img className={styles.claritydocumentLineIcon} alt="" src="/claritydocumentline.svg" />
			<img className={styles.claritydocumentLineIcon1} alt="" src="/claritydocumentline.svg" />
			<img className={styles.claritydocumentLineIcon2} alt="" src="/claritydocumentline.svg" />
			<div className={styles.employee}>Employee</div>
			<div className={styles.assests}>Assests</div>
			<div className={styles.department}>Department</div>
			<div className={styles.designation}>Designation</div>
			<div className={styles.expenses}>Expenses</div>
			<div className={styles.documents}>Documents</div>
			<div className={styles.organizationChild8} />
			<div className={styles.logo}>Logo</div>
			<img className={styles.akarIconssearch1} alt="" src="/akariconssearch.svg" />
			<img className={styles.mdihandDoubleTapIcon} alt="" src="/mdihanddoubletap.svg" />
			<div className={styles.lineDiv} />
		</div>
	);
};
