import { Fragment } from 'react'

import { Col } from 'antd'
import CoinFilterHistory from './coinFilterHistory'
import StatusFilterHistory from './statusFilter'
import TimeFilterHistory from './timeFilterHistory'

import { FilterOrderSet } from 'app/page/user/history'

const FilterHistory = ({
  onSelect = () => {},
  filterValues,
}: {
  onSelect: (value: FilterOrderSet) => void
  filterValues: FilterOrderSet
}) => {
  // const { coin, time, status } = filterValues
  return (
    <Fragment>
      <Col>
        <CoinFilterHistory orderState={filterValues} onSelect={onSelect} />
      </Col>
      <Col>
        <TimeFilterHistory orderState={filterValues} onSelect={onSelect} />
      </Col>
      <Col>
        <StatusFilterHistory orderState={filterValues} onSelect={onSelect} />
      </Col>
    </Fragment>
  )
}

export default FilterHistory
