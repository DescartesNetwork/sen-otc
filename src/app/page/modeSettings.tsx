import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Popover, Space, Switch, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'

import { AppDispatch, AppState } from 'app/model'
import { setRetailerMode } from 'app/model/main.controller'

const ModeSettings = () => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const { retailerMode } = useSelector((state: AppState) => state.main)

  const title = retailerMode ? 'Retailer mode' : 'User mode'

  return (
    <Popover
      content={
        <Space>
          <Switch
            checked={retailerMode}
            onChange={() => dispatch(setRetailerMode(!retailerMode))}
            size="small"
          />
          <Typography.Text>{title}</Typography.Text>
        </Space>
      }
      trigger="click"
      visible={visible}
      onVisibleChange={setVisible}
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
