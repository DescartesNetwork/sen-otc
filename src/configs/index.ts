import { env } from './env'
import { net } from './net'
import sol from './sol.config'
import otc from './otc.config'
import system from './system.config'

const configs = {
  sol: sol[net],
  otc: otc[net],
  system: system[env],
}

/**
 * Module exports
 */
export default configs
