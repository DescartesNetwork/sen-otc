import { useMemo } from 'react'

import IconSax from '@sentre/antd-iconsax'
import { Button, Space, Typography } from 'antd'

import { SortedBy, SORTING_TYPES } from 'store/filter.reducer'

export const parseDirection = (type: string, sort: SortedBy) => {
  if (!sort.endsWith(type)) return ''
  for (let direction of ['Ascending', 'Descending'])
    if (sort.startsWith(direction)) return direction
  return ''
}

export type SortBUttonProps = {
  title: string
  value: SortedBy
  onChange?: (value: SortedBy) => void
}

const SortedButton = ({
  title,
  value,
  onChange = () => {},
}: SortBUttonProps) => {
  const direction = useMemo(() => parseDirection(title, value), [title, value])
  const icon = useMemo(() => {
    if (direction === 'Ascending')
      return <IconSax name="ArrowUp2" variant="Bold" />
    if (direction === 'Descending')
      return <IconSax name="ArrowDown2" variant="Bold" />
    return null
  }, [direction])
  return (
    <Button
      type={!direction ? 'text' : 'primary'}
      size="small"
      icon={icon}
      onClick={() =>
        onChange(
          (direction === 'Ascending'
            ? `Descending${title}`
            : `Ascending${title}`) as SortedBy,
        )
      }
    >
      {title}
    </Button>
  )
}

export type SortProps = {
  sort: SortedBy
  onSort: (sort: SortedBy) => void
}

const Sort = ({ sort, onSort }: SortProps) => {
  return (
    <Space size={8}>
      <Typography.Text type="secondary">Sort by:</Typography.Text>
      {SORTING_TYPES.map((type) => (
        <SortedButton key={type} title={type} value={sort} onChange={onSort} />
      ))}
    </Space>
  )
}

export default Sort
