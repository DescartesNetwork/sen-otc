import { Pie } from '@ant-design/plots'

const data = [
  {
    type: 'SOL',
    value: 27,
  },
  {
    type: 'USDC',
    value: 25,
  },
  {
    type: 'USDT',
    value: 18,
  },
  {
    type: 'UXD',
    value: 15,
  },
  {
    type: 'USDH',
    value: 10,
  },
]

const Portfolio = () => {
  return (
    <Pie
      angleField="value"
      colorField="type"
      radius={1}
      innerRadius={0.6}
      label={{
        type: 'inner',
        offset: '-50%',
        content: '{value}',
        style: {
          textAlign: 'center',
          fontSize: 14,
        },
      }}
      interactions={[
        {
          type: 'element-selected',
        },
        {
          type: 'element-active',
        },
      ]}
      statistic={{
        title: false,
        content: false,
      }}
      data={data}
    />
  )
}

export default Portfolio
