import { env } from './env'
import { net } from './net'
import sol from './sol.config'
import otc from './otc.config'
import system from './system.config'

const configs = {
  env,
  net,
  sol: sol[net],
  otc: otc[env],
  system: system[env],
}

/**
 * Module exports
 */
export default configs
