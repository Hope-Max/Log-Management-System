import React, { Fragment } from 'react';
// import { Breadcrumbs } from '../../../../../AbstractElements';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import HeaderCard from '../../../../Common/Component/HeaderCard';
import RequirementTableData from './RequirementTableData';

const RequirementListContain = () => {
    return (
        <Fragment>
            {/* <Breadcrumbs parent="Ecommerce" title="Products List" mainTitle="Products List" /> */}
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card className='m-t-30'>
                            <HeaderCard
                                title={"Requirements"}
                            // span1={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
                            />
                            <CardBody>
                                <RequirementTableData />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};
export default RequirementListContain;