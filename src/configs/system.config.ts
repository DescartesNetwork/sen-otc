import { Env } from './env'

/**
 * Contructor
 */

type Conf = {
  adminAddresses: string[]
}

const conf: Record<Env, Conf> = {
  /**
   * Development configurations
   */
  development: {
    adminAddresses: ['8W6QginLcAydYyMYjxuyKQN56NzeakDE3aRFrAmocS6D'],
  },

  /**
   * Testing configurations
   */
  test: {
    adminAddresses: ['8W6QginLcAydYyMYjxuyKQN56NzeakDE3aRFrAmocS6D'],
  },

  /**
   * Production configurations
   */
  production: {
    adminAddresses: ['8W6QginLcAydYyMYjxuyKQN56NzeakDE3aRFrAmocS6D'],
  },
}

/**
 * Module exports
 */
export default conf
