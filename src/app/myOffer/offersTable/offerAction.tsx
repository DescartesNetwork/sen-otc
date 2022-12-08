import { useCallback, useState } from 'react'
import { OrderState, OrderStates } from '@sentre/otc'
import isEqual from 'react-fast-compare'

import { Button, Col, message, Row } from 'antd'

import { useOtc } from 'hooks/useProvider'

const OfferAction = ({
  orderAddress,
  state,
}: {
  orderAddress: string
  state: OrderState
}) => {
  const [loading, setLoading] = useState(0)
  const otc = useOtc()

  const onPause = useCallback(async () => {
    try {
      setLoading(1)
      await otc.pause({ orderAddress })
    } catch (er: any) {
      return message.error(er.message)
    } finally {
      return setLoading(0)
    }
  }, [orderAddress, otc])

  const onResume = useCallback(async () => {
    try {
      setLoading(1)
      await otc.resume({ orderAddress })
    } catch (er: any) {
      return message.error(er.message)
    } finally {
      return setLoading(0)
    }
  }, [orderAddress, otc])

  const onComplete = useCallback(async () => {
    try {
      setLoading(2)
      await otc.stop({ orderAddress })
    } catch (er: any) {
      return message.error(er.message)
    } finally {
      return setLoading(0)
    }
  }, [orderAddress, otc])

  return (
    <Row gutter={[12, 12]} justify="end">
      <Col>
        <Button
          type="text"
          shape="round"
          loading={loading === 1}
          onClick={isEqual(state, OrderStates.Paused) ? onResume : onPause}
        >
          {isEqual(state, OrderStates.Paused) ? 'Resume' : 'Pause'}
        </Button>
      </Col>
      <Col>
        <Button
          type="primary"
          shape="round"
          loading={loading === 2}
          onClick={onComplete}
        >
          Complete
        </Button>
      </Col>
    </Row>
  )
}

export default OfferAction
