import { Connection } from '@solana/web3.js'
import { Net, rpc } from './net'

/**
 * Contructor
 */

type Conf = {
  endpoint: string
  connection: Connection
}

const conf: Record<Net, Conf> = {
  /**
   * Development configurations
   */
  devnet: {
    endpoint: rpc,
    connection: new Connection(rpc, { commitment: 'confirmed' }),
  },

  /**
   * Testing configurations
   */
  testnet: {
    endpoint: rpc,
    connection: new Connection(rpc, { commitment: 'confirmed' }),
  },

  /**
   * Production configurations
   */
  mainnet: {
    endpoint: rpc,
    connection: new Connection(rpc, { commitment: 'confirmed' }),
  },
}

/**
 * Module exports
 */
export default conf
