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

const Tier = ({ tier = 0, size = 24 }: { tier?: number; size?: number }) => {
  const level = useMemo(() => {
    if (tier === TierLevel.Brozen) return 'bronze'
    if (tier === TierLevel.Silver) return 'silver'
    if (tier === TierLevel.Gold) return 'gold'
    return 'platinum'
  }, [tier])

  return (
    <Space size={12}>
      <Avatar src={TIER_ICON[level]} size={size} />
      <Typography.Text style={{ textTransform: 'capitalize' }}>
        {level}
      </Typography.Text>
    </Space>
  )
}

export default Tier
