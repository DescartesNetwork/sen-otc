import { createRoot } from 'react-dom/client'
import {
  Coin98WalletAdapter,
  PhantomWalletAdapter,
} from '@solana/wallet-adapter-wallets'

import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { ConfigProvider } from 'antd'
import App from 'app'

import configs from 'configs'
import { theme } from 'static/styles/theme'
import reportWebVitals from 'reportWebVitals'

import 'static/styles/index.css'

const {
  sol: { endpoint },
} = configs

createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider theme={theme}>
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider
        wallets={[new PhantomWalletAdapter(), new Coin98WalletAdapter()]}
        autoConnect
      >
        <WalletModalProvider>
          <App />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  </ConfigProvider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
