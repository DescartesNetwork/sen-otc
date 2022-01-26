import { Provider } from 'react-redux'
import {
  WalletProvider,
  UIProvider,
  PoolProvider,
  AccountProvider,
  MintProvider,
} from '@senhub/providers'

import PageView from 'app/page'
import WidgetView from 'app/widget'

import model from 'app/model'
import configs from 'app/configs'
import './static/styles/dark.less'
import './static/styles/light.less'
import './static/styles/index.less'

const {
  manifest: { appId },
} = configs

export const Page = () => {
  return (
    <UIProvider appId={appId} antd>
      <WalletProvider>
        <PoolProvider>
          <AccountProvider>
            <MintProvider>
              <Provider store={model}>
                <PageView />
              </Provider>
            </MintProvider>
          </AccountProvider>
        </PoolProvider>
      </WalletProvider>
    </UIProvider>
  )
}

export const widgetConfig: WidgetConfig = {
  size: 'small',
  type: 'solid',
}

export const Widget = () => {
  return (
    <UIProvider appId={appId} antd>
      <WalletProvider>
        <PoolProvider>
          <AccountProvider>
            <MintProvider>
              <Provider store={model}>
                <WidgetView />
              </Provider>
            </MintProvider>
          </AccountProvider>
        </PoolProvider>
      </WalletProvider>
    </UIProvider>
  )
}
