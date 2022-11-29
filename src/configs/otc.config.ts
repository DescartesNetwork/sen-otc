import {
  ACCEPTED_PAYMENTS_DEVNET,
  ACCEPTED_PAYMENTS_MAINNET,
  ACCEPTED_PAYMENTS_TESTNET,
} from './acceptedPayments'
import {
  PARTNERED_TOKENS_DEVNET,
  PARTNERED_TOKENS_MAINNET,
  PARTNERED_TOKENS_TESTNET,
} from './partneredToken'
import { Net } from './net'

/**
 * Contructor
 */

type Conf = {
  partneredTokens: TokenMetadata[]
  acceptedPayments: TokenMetadata[]
}

const conf: Record<Net, Conf> = {
  /**
   * Development configurations
   */
  devnet: {
    partneredTokens: PARTNERED_TOKENS_DEVNET,
    acceptedPayments: ACCEPTED_PAYMENTS_DEVNET,
  },

  /**
   * Testing configurations
   */
  testnet: {
    partneredTokens: PARTNERED_TOKENS_TESTNET,
    acceptedPayments: ACCEPTED_PAYMENTS_TESTNET,
  },

  /**
   * Production configurations
   */
  mainnet: {
    partneredTokens: PARTNERED_TOKENS_MAINNET,
    acceptedPayments: ACCEPTED_PAYMENTS_MAINNET,
  },
}

/**
 * Module exports
 */
export default conf
