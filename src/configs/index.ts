import { env } from './env'
import sol from './sol.config'
import otc from './otc.config'

const configs = {
  sol: sol[env],
  otc: otc[env],
}

/**
 * Module exports
 */
export default configs
