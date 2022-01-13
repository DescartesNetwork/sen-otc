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
    purchasingProgramAddress: '',
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
    node: 'https://api.mainnet-beta.solana.com',
    spltAddress: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
    splataAddress: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
    purchasingProgramAddress: '',
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
