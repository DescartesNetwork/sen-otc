import { Avatar, Space, Typography } from 'antd'
import { TierLevel } from 'app/constant'

import tierGold from 'app/static/images/tier-gold.svg'
import { useMemo } from 'react'

const TIER_ICON = {
  bronze: tierGold,
  silver: tierGold,
  gold: tierGold,
  platinum: tierGold,
}

const Tier = ({
  level = 0,
  size = 24,
  label = true,
}: {
  level?: number
  size?: number
  label?: boolean
}) => {
  const tierLevel = useMemo(() => {
    if (level === TierLevel.Brozen) return 'bronze'
    if (level === TierLevel.Silver) return 'silver'
    if (level === TierLevel.Gold) return 'gold'
    return 'platinum'
  }, [level])

  return (
    <Space size={12}>
      <Avatar src={TIER_ICON[tierLevel]} size={size} />
      {label && (
        <Typography.Text style={{ textTransform: 'capitalize' }}>
          {tierLevel}
        </Typography.Text>
      )}
    </Space>
  )
}

export default Tier
