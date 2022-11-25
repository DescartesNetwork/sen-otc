export type PartneredTokenMetadata = {
  address: string
  symbol: string
  decimals: number
  url: string
}

export type PartneredToken = PartneredTokenMetadata[]

export const PARTNERED_TOKENS_DEVNET: PartneredToken = [
  {
    address: '5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ',
    symbol: 'SNTR',
    decimals: 9,
    url: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SENBBKVCM7homnf5RX9zqpf1GFe935hnbU4uVzY1Y6M/logo.png',
  },
  {
    address: '8jk4eJymMfNZV9mkRNxJEt2VJ3pRvdJvD5FE94GXGBPM',
    symbol: 'wBTC',
    decimals: 9,
    url: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/qfnqNqs3nCAHjnyCgLRDbBtq4p2MtHZxw8YjSyYhPoL/logo.png',
  },
]

export const PARTNERED_TOKENS_TESTNET: PartneredToken = []

export const PARTNERED_TOKENS_MAINNET: PartneredToken = [
  {
    address: 'SENBBKVCM7homnf5RX9zqpf1GFe935hnbU4uVzY1Y6M',
    symbol: 'SNTR',
    decimals: 9,
    url: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SENBBKVCM7homnf5RX9zqpf1GFe935hnbU4uVzY1Y6M/logo.png',
  },
  {
    address: 'C98A4nkJXhpVZNAZdHUA95RpTF3T4whtQubL3YobiUX9',
    symbol: 'C98',
    decimals: 6,
    url: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/c98-512.svg',
  },
]
