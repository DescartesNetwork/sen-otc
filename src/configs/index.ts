import { env } from './env'
import sol from './sol.config'

const configs = {
  sol: sol[env],
}

/**
 * Module exports
 */
export default configs
