import { ChangeEvent, useCallback, useEffect, useState } from 'react'

import IconSax from '@sentre/antd-iconsax'
import { Button, Input } from 'antd'

let timeoutId: ReturnType<typeof setTimeout>

export type SearchProps = {
  keyword?: string
  onKeyword?: (value: string) => void
}

const Search = ({ keyword = '', onKeyword = () => {} }: SearchProps) => {
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState('')

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      clearTimeout(timeoutId)
      setLoading(true)
      setValue(e.target.value)
      timeoutId = setTimeout(() => {
        setLoading(false)
        return onKeyword(e.target.value)
      }, 500)
    },
    [onKeyword],
  )

  useEffect(() => {
    setValue(keyword)
  }, [keyword])

  return (
    <Input
      size="large"
      placeholder="Search Offer"
      prefix={
        <Button
          type="text"
          size="small"
          shape="circle"
          style={{ marginLeft: -3 }}
          icon={<IconSax name="SearchNormal1" />}
        />
      }
      suffix={
        value && (
          <Button
            type="text"
            size="small"
            shape="circle"
            style={{ marginRight: -3 }}
            icon={<IconSax name="CloseCircle" />}
            onClick={() => onKeyword('')}
            loading={loading}
          />
        )
      }
      value={value}
      onChange={onChange}
    />
  )
}

export default Search
