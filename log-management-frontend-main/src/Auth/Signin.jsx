import React, { useState } from 'react';
import { Container, Row, Col, TabContent, TabPane } from 'reactstrap';
import NavAuth from './Nav';
import LoginTab from './Tabs/LoginTab';
import AuthTab from './Tabs/AuthTab';
import VendorLoginTab from './Tabs/VendorLoginTab';

const Logins = () => {
	const [selected, setSelected] = useState('simpleLogin');

	const callbackNav = (select) => {
		setSelected(select);
	};

	return (
		<Container fluid={true} className="p-0 login-page">
			<Row>
				<Col xs="12">
					<div className="login-card">
						<div className="login-main login-tab">
							{/* <NavAuth callbackNav={callbackNav} selected={selected} /> */}
							<div className="logo-icon-wrapper d-flex align-item-center m-b-30" style={{ marginLeft: "-4px" }}>
								<img
									className="img-fluid"
									src={require("../assets/images/logo/logo.png")}
									alt=""
									width="60%"
								/>
							</div>
							<TabContent activeTab={selected} className="content-login">
								<TabPane
									className="fade show"
									tabId={selected === 'simpleLogin' ? 'simpleLogin' : 'jwt'}
								>
									{
										(window.location.pathname.includes('mfa'))
											?
											<VendorLoginTab />
											:
											<LoginTab selected={selected} />
									}

								</TabPane>
								<TabPane className="fade show" tabId="auth0">
									<AuthTab />
								</TabPane>
							</TabContent>
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default Logins;
