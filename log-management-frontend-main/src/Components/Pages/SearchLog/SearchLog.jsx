import React from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import { Container, Row } from 'reactstrap'

const SearchLog = () => {
  return (
    <>
    <Breadcrumbs mainTitle="Dashboard" parent="Dashboard" title="" />
      <Container fluid={true}>
        <Row>
          {/* <GreetingCard /> */}
    <iframe src="https://localhost:5601/app/dashboards#/view/b1f2bf10-2fc6-11ee-8aa6-6d2da7336f01?embed=true&_g=(refreshInterval:(pause:!t,value:60000),time:(from:now-15m,to:now))&_a=()&show-query-input=true&show-time-filter=true" height="600" width="800"></iframe>
        </Row>
      </Container>
    </>
  )
}

export default SearchLog