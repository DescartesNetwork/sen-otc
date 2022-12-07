import { Space, Typography } from 'antd'
import SortButton from 'components/sortButton'

import { SortedBy, SORTING_TYPES } from 'providers/sort.provider'

export type SortProps = {
  sort: SortedBy
  onSort: (sort: SortedBy) => void
}

const Sort = ({ sort, onSort }: SortProps) => {
  return (
    <Space size={8}>
      <Typography.Text type="secondary">Sorted by:</Typography.Text>
      {SORTING_TYPES.map((type) => (
        <SortButton key={type} title={type} value={sort} onChange={onSort} />
      ))}
    </Space>
  )
}

export default Sort
