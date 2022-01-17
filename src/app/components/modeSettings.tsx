import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Popover, Space, Switch, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'

import { AppDispatch, AppState } from 'app/model'
import { setRetailerMode } from 'app/model/main.controller'

const RETAILER_MODE = 'Retailer mode'
const USER_MODE = 'User mode'

const ModeSettings = () => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const { retailerMode } = useSelector((state: AppState) => state.main)

  const getTitle = useCallback(
    (reverse?: boolean) => {
      let mode = retailerMode
      if (reverse) mode = !retailerMode
      return mode ? RETAILER_MODE : USER_MODE
    },
    [retailerMode],
  )

  return (
    <Popover
      content={
        <Space direction="vertical">
          <Switch
            checked={retailerMode}
            onChange={() => dispatch(setRetailerMode(!retailerMode))}
            size="small"
          />
          <Space direction="vertical" size={0}>
            <Typography.Text>Actived: {getTitle()}</Typography.Text>
            <Typography.Text type="secondary" className="caption">
              Click the toggle to switch to {getTitle(true)}
            </Typography.Text>
          </Space>
        </Space>
      }
      trigger="click"
      visible={visible}
      onVisibleChange={setVisible}
      arrowPointAtCenter
      placement="left"
    >
      <Button
        type="text"
        shape="circle"
        size="small"
        icon={<IonIcon name="cog-outline" />}
        onClick={() => setVisible(false)}
      />
    </Popover>
  )
}

export default ModeSettings
