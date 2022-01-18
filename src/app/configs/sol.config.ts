import { Purchasing } from '@senswap/sen-js'
import { Net } from 'shared/runtime'

/**
 * Contructor
 */
type Conf = {
  node: string
  spltAddress: string
  splataAddress: string
  purchasingProgramAddress: string
  purchasing: Purchasing
  sntrAddress: string
}

const conf: Record<Net, Conf> = {
  /**
   * Development configurations
   */
  devnet: {
    node: 'https://api.devnet.solana.com',
    spltAddress: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
    splataAddress: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
    purchasingProgramAddress: 'FHeonxeZFH76K57KGRWgsmE97tiupcHDjvWNKMQDmdVd',
    sntrAddress: '5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ',
    get purchasing() {
      return new Purchasing(
        this.purchasingProgramAddress,
        this.spltAddress,
        this.splataAddress,
        this.node,
      )
    },
  },

  /**
   * Staging configurations
   */
  testnet: {
    node: 'https://api.testnet.solana.com',
    spltAddress: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
    splataAddress: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
    purchasingProgramAddress: 'Ecw8Vh3cwwwwMsaU63mW6knKMsuaiSakVDvKxB5nyhFC',
    sntrAddress: '',
    get purchasing() {
      return new Purchasing(
        this.purchasingProgramAddress,
        this.spltAddress,
        this.splataAddress,
        this.node,
      )
    },
  },

  /**
   * Production configurations
   */
  mainnet: {
    node: 'https://solana-api.projectserum.com',
    spltAddress: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
    splataAddress: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
    purchasingProgramAddress: 'Ecw8Vh3cwwwwMsaU63mW6knKMsuaiSakVDvKxB5nyhFC',
    sntrAddress: 'SENBBKVCM7homnf5RX9zqpf1GFe935hnbU4uVzY1Y6M',
    get purchasing() {
      return new Purchasing(
        this.purchasingProgramAddress,
        this.spltAddress,
        this.splataAddress,
        this.node,
      )
    },
  },
}

/**
 * Module exports
 */
export default conf
