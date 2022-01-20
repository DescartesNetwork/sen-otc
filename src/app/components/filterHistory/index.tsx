import { useCallback } from 'react'

import { Col, Row } from 'antd'
import CoinFilterHistory from './coinFilterHistory'
import StatusFilterHistory from './statusFilter'
import TimeFilterHistory from './timeFilterHistory'

import { OrderFilterOptions } from 'app/constant'

const FilterHistory = ({
  onSelect = () => {},
  filterValues,
}: {
  onSelect: (value: OrderFilterOptions) => void
  filterValues: OrderFilterOptions
}) => {
  const { coin: propCoin, time: propTime, status: propStatus } = filterValues

  const onFilterValue = useCallback(
    ({
      coin,
      time,
      status,
    }: {
      coin?: string
      time?: number
      status?: string
    }) => {
      let selectedFilter = {
        coin: propCoin,
        time: propTime,
        status: propStatus,
      }

      if (coin) selectedFilter.coin = coin
      if (time) selectedFilter.time = time
      if (status) selectedFilter.status = status

      onSelect(selectedFilter)
    },
    [onSelect, propCoin, propStatus, propTime],
  )

  return (
    <Row gutter={[16, 16]}>
      <Col span={4}>
        <CoinFilterHistory
          coin={propCoin}
          onSelect={(e) => onFilterValue({ coin: e })}
        />
      </Col>
      <Col span={4}>
        <TimeFilterHistory
          time={propTime}
          onSelect={(e) => onFilterValue({ time: e })}
        />
      </Col>
      <Col span={4}>
        <StatusFilterHistory
          status={propStatus}
          onSelect={(e) => onFilterValue({ status: e })}
        />
      </Col>
    </Row>
  )
}

export default FilterHistory
