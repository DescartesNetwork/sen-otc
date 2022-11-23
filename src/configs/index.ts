import { env } from './env'
import sol from './sol.config'
import otc from './otc.config'
import system from './system.config'

const configs = {
  sol: sol[env],
  otc: otc[env],
  system: system[env],
}

/**
 * Module exports
 */
export default configs
