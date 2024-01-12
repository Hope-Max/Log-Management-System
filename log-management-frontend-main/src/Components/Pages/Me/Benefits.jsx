import React, { Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Card, CardBody, Row, Col, CardDeck, CardHeader } from 'reactstrap'

import { BenefitsData } from '../../../Data/Table/Defaultdata'
import { Breadcrumbs, H5 } from '../../../AbstractElements'
import { leaveTypeAction } from '../../../redux/actions/leaveActions'
import SvgIcon from '../../Common/Component/SvgIcon'

const Benefits = () => {
  // const dispatch = useDispatch()

  // const { leaveTypeData, error } = useSelector((state) => state.leaveRes);

  const [benefitType, setBenefitType] = useState('Leave Benefits')
  const [subBenefitType, setSubBenefitType] = useState(
    BenefitsData.find(item => item.title === 'Leave Benefits')
      ?.subTypes.find(item => item.title === 'Paid Leave')
      ?.title
  )
  const [subTypes, setSubTypes] = useState(BenefitsData.find(item => item.title === 'Leave Benefits')
    ?.subTypes)

  useEffect(() => {
    setSubBenefitType(subTypes[0].title)
  }, [subTypes])

  const handleUpperCardClick = (benefit) => {
    setBenefitType(BenefitsData.find(item => item.title === benefit.title).title)
    setSubTypes(BenefitsData.find(item => item.title === benefit.title)?.subTypes ?? [benefit])
  }

  return (
    <Fragment>
      <Breadcrumbs mainTitle="Benefits" parent="Me" title="Benefits" />
      <Container fluid={true}>

        <Row>
          <H5>Bouquet of Benefits</H5>
        </Row>
        <Row>
          {
            BenefitsData.map((benefit, i) => {
              return (
                <CardDeck className="col col-md-2 col-sm-12 p-10 place-items-center" key={i}>
                  <Card className="h-100 d-flex h-100 align-items-center justify-content-center p-10"
                    style={{ gap: '0.5rem', cursor: 'pointer', overflow: 'clip' }}
                    onClick={() => handleUpperCardClick(benefit)}
                  >
                    <div style={{ width: '25%', display: 'grid', placeItems: 'center' }}>
                      <SvgIcon iconId={benefit.icon_id} width="32px" height="32px" />
                    </div>
                    <div className="text-wrap" style={{ textAlign: 'center' }}>{benefit.title}</div>
                  </Card>
                </CardDeck>
              )
            })
          }
        </Row>

        <Row className='m-t-50'>
          <Col>
            <H5>{benefitType}</H5>
            <Card>
              <Row className='subtypes m-l-5 m-r-5'>
                <>
                  {subTypes.map((subtype, i) => {
                    if (subBenefitType === subtype?.title)
                      return (
                        <CardHeader
                          className="col text-center" key={i}
                          style={{ borderBottom: '1px solid #7366ff', cursor: 'pointer' }}
                          onClick={() => setSubBenefitType(subtype?.title)}
                        >
                          {subtype?.title}
                        </CardHeader>
                      )
                    else
                      return (
                        <CardHeader
                          className="col text-center" key={i}
                          style={{ cursor: 'pointer' }}
                          onClick={() => setSubBenefitType(subtype?.title)}
                        >
                          {subtype?.title}
                        </CardHeader>
                      )
                  })}
                </>
              </Row>


              <CardBody>
                {/* {console.log(subTypes, subBenefitType)} */}
                {subTypes.find(item => item.title === subBenefitType)?.rules}
              </CardBody>


            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment >
  )
}

export default Benefits