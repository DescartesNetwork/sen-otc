import { ThemeConfig } from 'antd/es/config-provider/context'

const radius = {
  borderRadius: 24,
  borderRadiusXS: 8,
  borderRadiusSM: 16,
  borderRadiusLG: 24,
  borderRadiusOuter: 24,
}

export const theme: ThemeConfig = {
  token: {
    colorPrimary: '#1A63FF',
    fontFamily: "'Satoshi', sans-serif",
  },
  components: {
    Button: {
      colorPrimary: '#000000',
      colorPrimaryHover: '#333333',
      colorPrimaryActive: '#000000',
    },
    Card: {
      ...radius,
      colorBgContainer: '#FAFAFA',
    },
    Segmented: {
      ...radius,
      controlPaddingHorizontal: 16,
      controlPaddingHorizontalSM: 12,
    },
    Input: {
      ...radius,
      colorBgContainer: '#FAFAFA',
    },
    DatePicker: {
      ...radius,
    },
  },
}
