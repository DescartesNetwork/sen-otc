import { CSSProperties, useMemo } from 'react'
import { SizeType } from 'antd/es/config-provider/SizeContext'

import IconSax from '@sentre/antd-iconsax'
import { Button } from 'antd'

import { SortedBy } from 'providers/sort.provider'

export const parseDirection = (type: string, sort: SortedBy) => {
  if (!sort.endsWith(type)) return ''
  for (let direction of ['Ascending', 'Descending'])
    if (sort.startsWith(direction)) return direction
  return ''
}

export type SortButtonProps = {
  title: string
  value?: SortedBy
  onChange?: (value: SortedBy) => void
  style?: CSSProperties
  size?: SizeType
}

const SortButton = ({
  title,
  value = SortedBy.AscendingPrice,
  onChange = () => {},
  style = {},
  size = 'small',
}: SortButtonProps) => {
  const direction = useMemo(() => parseDirection(title, value), [title, value])
  const icon = useMemo(() => {
    if (direction === 'Ascending')
      return <IconSax name="ArrowUp2" variant="Bold" />
    if (direction === 'Descending')
      return <IconSax name="ArrowDown2" variant="Bold" />
    return <IconSax name="ArrowRight2" variant="Bold" />
  }, [direction])
  return (
    <Button
      type={!direction ? 'text' : 'primary'}
      size={size}
      icon={icon}
      onClick={() =>
        onChange(
          (direction === 'Ascending'
            ? `Descending${title}`
            : `Ascending${title}`) as SortedBy,
        )
      }
      style={style}
    >
      {title}
    </Button>
  )
}

export default SortButton
