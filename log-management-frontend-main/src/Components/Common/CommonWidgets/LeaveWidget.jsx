import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Image, H5 } from '../../../AbstractElements';
import { isEmpty } from '../../../redux/constants';
import RadialChart from './RadialChart';

const LeaveWidget = ({ data, color, series }) => {
	const chartData = {
		color: [color] ?? ['#57B9F6'],
		series: [series] ?? 0
	};
	return (
		<Card className="social-widget widget-hover" style={{ height: "100%" }}>
			<CardBody className='d-flex flex-column'>
				<div className="d-flex align-items-center justify-content-between">
					<div className="d-flex align-items-center gap-2">
						{/* <div className="social-icons">
							<Image
								attrImage={{
									src: require(`../../../assets/images/dashboard-5/social/${data.image}`),
									alt: 'facebook icon'
								}}
							/>
						</div> */}
						<span>{data.name}</span>
					</div>
					{data?.gros && <span className="font-success f-12 d-xxl-block d-xl-none">+{data.gros}%</span>}
				</div>
				<div className="social-content flex-wrap" style={{ marginBlockStart: 'auto', gap: '0.5rem' }}>
					<div>
						<H5 attrH5={{ className: 'mb-1' }}>{getLeaveBalance(data)}</H5>
						<span className="f-light">{'Taken'}</span>
					</div>
					<div className="social-chart">
						<RadialChart chartData={chartData} />
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export const getLeaveBalance = (data) => {
	if (isEmpty(data.leave_quota)) {
		return '0/0';
	} else {
		if (!isEmpty(data.leave_quota[0]?.leave_balance)) {
			return `${data.leave_quota[0]?.leave_balance[0]?.consumed}/${data.leave_quota[0]?.leave_balance[0]?.quota}`;
		} else {
			return `${0}/${data.leave_quota[0]?.quota_in_days}`;
		}
	}
};

export default LeaveWidget;
