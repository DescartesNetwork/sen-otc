import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react'
import {
  Coin98WalletAdapter,
  PhantomWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import dayjs from 'dayjs'
import durationPlugin from 'dayjs/plugin/duration'

import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { ConfigProvider } from 'antd'
import App from 'app'
import TvlProvider from 'providers/tvl.provider'
import VolumeProvider from 'providers/volume.provider'

import configs from 'configs'
import store from 'store'
import reportWebVitals from 'reportWebVitals'
import { theme } from 'static/styles/theme'
import 'static/styles/index.css'

const {
  sol: { endpoint },
} = configs

dayjs.extend(durationPlugin)

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <ConfigProvider theme={theme}>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider
            wallets={[new PhantomWalletAdapter(), new Coin98WalletAdapter()]}
            autoConnect
          >
            <WalletModalProvider>
              <TvlProvider>
                <VolumeProvider>
                  <App />
                </VolumeProvider>
              </TvlProvider>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </ConfigProvider>
    </BrowserRouter>
  </Provider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
