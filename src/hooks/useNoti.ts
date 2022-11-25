import axios from 'axios'
import { useCallback, useEffect } from 'react'
import useSWR from 'swr'

import { message } from 'antd'

export type NotiType = {
  _id: string
  name: string
  description: string
  createdAt: Date
}

const getMockData = async (route: string): Promise<NotiType[]> => {
  const { data } = await axios.get(
    `https://63807d338efcfcedac062a10.mockapi.io${route}`,
  )
  return data.map(({ createdAt, ...rest }: NotiType) => ({
    createdAt: new Date(createdAt),
    ...rest,
  }))
}

export const useRecentNoti = () => {
  const { data, error, mutate } = useSWR('/noti', getMockData)

  const refresh = useCallback(() => mutate(), [mutate])
  useEffect(() => {
    if (error) message.error(error)
  }, [error])

  return [data, refresh] as [typeof data, typeof refresh]
}
