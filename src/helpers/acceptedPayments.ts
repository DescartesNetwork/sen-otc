export type AcceptedPaymentMetadata = {
  address: string
  symbol: string
  decimals: number
  url: string
}

export type AcceptedPayment = AcceptedPaymentMetadata[]

export const ACCEPTED_PAYMENTS_DEVNET: AcceptedPayment = [
  {
    address: 'So11111111111111111111111111111111111111112',
    symbol: 'SOL',
    decimals: 9,
    url: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
  },
  {
    address: '2z6Ci38Cx6PyL3tFrT95vbEeB3izqpoLdxxBkJk2euyj',
    symbol: 'USDC',
    decimals: 9,
    url: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
  },
]

export const ACCEPTED_PAYMENTS_TESTNET: AcceptedPayment = []

export const ACCEPTED_PAYMENTS_MAINNET: AcceptedPayment = [
  {
    address: 'So11111111111111111111111111111111111111112',
    symbol: 'SOL',
    decimals: 9,
    url: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
  },
  {
    address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    symbol: 'USDC',
    decimals: 6,
    url: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
  },
  {
    address: '7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT',
    symbol: 'UXD',
    decimals: 6,
    url: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT/uxd-icon-black.png',
  },
  {
    address: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
    symbol: 'USDT',
    decimals: 6,
    url: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg',
  },
  {
    address: 'USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX',
    symbol: 'USDH',
    decimals: 6,
    url: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX/usdh.svg',
  },
]
