import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { isEmpty } from '../../redux/constants';
// import cubaimg from '../../assets/rapid-small-logo.png';
import CustomizerContext from '../../_helper/Customizer';

const SidebarIcon = (props) => {
	const { layoutURL } = useContext(CustomizerContext);
	console.log('logo, props', props);
	return (
		<div className="logo-icon-wrapper">
			<Link to={`${process.env.PUBLIC_URL}/me/leave`}>
				<img
					className="img-fluid"
					src={
						!isEmpty(props?.logo)
							? require(props?.logo)
							: require('../../assets/images/rapid-small-logo.png')
					}
					alt=""
				/>
			</Link>
		</div>
	);
};

export default SidebarIcon;
