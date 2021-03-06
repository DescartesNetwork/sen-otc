import { explorer } from 'shared/util'

export const notifySuccess = (content: string, txId: string) => {
  return window.notify({
    type: 'success',
    description: `${content} successfully. Click to view details.`,
    onClick: () => window.open(explorer(txId), '_blank'),
  })
}

export const notifyError = (er: any) => {
  return window.notify({
    type: 'error',
    description: er.message,
  })
}

export const getWallet = () => {
  const wallet = window.sentre.wallet
  if (!wallet) throw new Error('Login fist')
  return wallet
}

export const getWalletAddress = () => {
  const wallet = getWallet()
  return wallet.getAddress()
}
