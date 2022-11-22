import { Env } from './env'

/**
 * Contructor
 */

type Conf = {}

const conf: Record<Env, Conf> = {
  /**
   * Development configurations
   */
  development: {},

  /**
   * Testing configurations
   */
  test: {},

  /**
   * Production configurations
   */
  production: {},
}

/**
 * Module exports
 */
export default conf
