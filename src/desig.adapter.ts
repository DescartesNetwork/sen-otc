import { WalletName } from '@solana/wallet-adapter-base'
import {
  BaseMessageSignerWalletAdapter,
  scopePollingDetectionStrategy,
  WalletNotConnectedError,
  WalletNotReadyError,
  WalletPublicKeyError,
  WalletReadyState,
  WalletSignMessageError,
  WalletSignTransactionError,
} from '@solana/wallet-adapter-base'
import {
  PublicKey,
  Transaction,
  VersionedTransaction,
  TransactionVersion,
} from '@solana/web3.js'

interface DesigWallet {
  isDesig?: boolean
  signTransaction<T extends Transaction | VersionedTransaction>(
    transaction: T,
  ): Promise<T>
  signAllTransactions<T extends Transaction | VersionedTransaction>(
    transactions: T[],
  ): Promise<T[]>
  signMessage(message: Uint8Array): Promise<{ signature: Uint8Array }>
  connect(): Promise<string[]>
  disconnect(): Promise<boolean>
}

interface DesigWindow extends Window {
  desig?: {
    solana?: DesigWallet
  }
}

declare const window: DesigWindow

export interface DesigWalletAdapterConfig {}

export const DesigWalletName = 'Desig' as WalletName<'Desig'>

export class DesigWalletAdapter extends BaseMessageSignerWalletAdapter {
  name = DesigWalletName
  url = 'https://desig.io'
  icon =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAABhySURBVHgB7d1djF51ncDx33mmpbQb2VJvoNMEFIywiwZYW64WWDHgnZQrvVhgAW+0yL7ciNkoIRv1RoNu9UYCpTdy4xa80ob3u5asVjELCSiYdLTJhlIgSwvtPGfP/+lMndJ5ed6fc57/57PbzEw7Q8dmZv7f8zvn/E8RNbD5znLz+RFXF624OlpxSZRxafXbl1YvN0fReR0AmqWMN6o17Fj12rHq5aFoxx/Ldhw6EXHo2J7iWExYERNy0Z3lDcW6+EL1D3RD9ebVy3wuE/vcAGCIymXefj5FQXkqnjyyp3g+JmCsi+ySRf+O6s0LJ/E5AEANLI2C16uF8Pn2fDw2zhgY+eKbxvsbW9WCX8Tt1ZvXjOvvBYAGWQyC18syHjzySPFYjNjIFuK08G9qxdfKIu6L00f7Fn0AWFuKgdeLMh57rx0/HNX1AiNZlC++u/xa9eJbYeEHgH51QmBUE4GhLs6dc/wznYX/xrDwA8AwnA6B+bjpyJ7ijRiSVgzJxXeV368W/2fD4g8Aw5TW1I9Xa+zvt95VfjOGZOCFujrqv7RYFz+r+uSasPADwCgNbRow0ARgYeT/39Wnc21Y/AFg1BanAc9cdE95Qwyg7wBIF/otjPy3BAAwTh8rynh2kFMCfQXAwl/4UDjqB4BJKcoiHug3AnpewNNflP7CsPgDQB2U1TTggT89UjzYywf1tIhb/AGglnqOgK4X8oXNfYz9AaCeyur//uXPjxQ/6Oadu1rMF672fzYs/gBQZ2U1qf+HIw+v/VChNRf0zn3+M/FM9erHAgCou7fK+bh2rX0C1rwLwOIPAI1yYbV2/9da77RqACzcWmDxB4Bmueaiu8pvrfYOK54CWBj9/yGc9weAJipPteLa//1JcWi5P1xxArAw+rf4A0AzFeva8f2V/nDZAKjGBneE0T8ANN2NF99V3rfcHyx7hH/x3WUa/QsAAGi+t47Px8eP7SmOLf3NcyYALvwDgKly4fmtOGcKcE4AlEXcGQDA1CiKuG/zneXmpb93VgA49w8AU+nCja24Y+lvnBUAVSF8KwCA6VPEF5a+eSYA0n7/4egfAKbVjRfd01nrO84EQGvm7NEAADBVimI+bl1840wAlFUZBAAwvZZcB9AJAON/AMjChYunAToBUBR/GQkAANNr8TTA6VMArbg6AIDpt7Dmd7YCvvjush0e/AMAOSiPz8eW1sL5f4s/AOShWB9xaatoxTUBAGRjpjoN0IoyLg0AIBtFmQKgFZcEAJCPVnUKoHqxOQCAnFziFAAA5GdzKwoTAADIzGanAAAgP5tbAQBkRwAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIbWBXThytl2fHLrfHCup3+3Lt49XgTjM7ulHdsv8/W4nBd/vy7mjvp6ZG0CgK589qqTce8tHwTnuv3Hm+LgazPB+MxeWMZ3v3QiONf9Pz0/9h1dH7AWAUBX0vFE4aCCGvH1CINxDQAAZEgAAECGBAAAZEgAAECGBAAAZEgAAECGBAAAZEgAAECGBAAAZEgAAECGBAAAZEgAAECGBAAAZEgAAECGBAAAZEgAAECGBAAAZEgAAECGBAAAZEgAAECGBAAAZEgAAECGBAAAZEgAAECGBAAAZEgAAECGBAAAZEgAAECGBAAAZEgAAECGBAAAZEgAAECGBAAAZEgAAECGBAAAZEgAAECGBAAAZEgAAECGBAAAZEgAAECGBAAAZEgAAECGBAAAZEgAAECGBAAAZEgAAECGBAAAZEgAAECGBAAAZEgAAECGBAAAZEgAAECGBAAAZEgAAECGBAAAZEgAAECGBAAAZEgAAECGBAAAZEgAAECGBAAAZEgAAECGBAAAZEgAAECGBAAAZEgAAECGBAAAZEgAAECGBAAAZEgAAECGBAAAZEgAAECGBAAAZEgAAECGBAAAZEgAAI0zu6UdwGAEAABkSAAAQIYEANA4TgHA4AQA0DgXbCyD5b1zogjohgAAGmfbFgGwknePCwC6IwCAxvmICQAMTAAAjXPlrGsAVjJ31I91uuMrBWiUdP7fBGBl7xwP6IoAABrliq2O/lfjGgC6JQCARrlydj5YnvE/vfDVAjTKdZcLgJUcPuron+4JAKBRdgiAFRn/0wsBADTGjsvmXQC4ijkTAHogAIDGuOlTJ4OVuQaAXvhqARrjc58y/l/N4bf8SKd7vlqARkib/2zzEKBVOQVALwQA0Ai3X/9BsLpX5mYCuiUAgNpLu/+5/W91L8/5cU5vfMUAtffZq07FrPH/qlwASK98xQC1d+8txv9rOfia8T+9EQBArd26/WRs+6ij/7W8/CcBQG8EAFBbaezv6L87rgGgV75igNra6ei/K2nxtw0wvRIAQC2lo/9djv674vw//RAAQC3t/crxKBzUduXA79cF9EoAALWz6+b3jf57YAMg+iEAgFpJT/zb9Xmj/26l8/+2AKYfAgCojXTe/ztfOmH03wPn/+mXAABqIS3+6by/0X9vnv7d+oB+CABg4j6ysYzd/2Tx71Xa/veACQB9EgDARKXFf+9X3ou/2Wbx75XFn0G4dwSYGGP/wTzxovE//TMBACbiylmL/yCM/xmUCQAwdrdf/0Fnj/8LNpVBfyz+DEoAAGPTuc3viydix+XzbvUbkPE/gxIAwFg46h8e43+GQQAAI9XZ2e+W9x31D9Hu/ecFDEoAACNh4R+dA6/60c3gfBUBQ5Pu6d+5/WR87qpTFv4R2Xdwvb3/GQoBAAwsHe3fdNXJuG3HqU4EWPhHZ/f+DQHDIACAnqVFPi36Oy47FTurRf+C6u0oOv/PCKUL/w6/6V+Z4RAAwKpmLyw7t+9dMTsfV249/fKK2fbpxd6iP1Z7X3DxH8MjAGBAu25+P+Y+Mz2baqaj+3REP7ulPPP6GRb8iUm3/j39kh/ZDI+vJhjQdZ+YjzLmY5pY5Osn3fpnBwWGSQDAEFgwGaV09L/vgJ3/GC4PAwKoOUf/jIIAAKixdOW/o39GQQAA1Ng3Ht/o6J+REAAANZV2/XPfP6MiAABq6N3jhV3/GCkBAFBDj71wnqN/RkoAANRMuu1v9y/t+sdoCQCAmrn9x5uidOUfIyYAAGpkr9E/YyIAAGoijf7/0+ifMREAADVx/+PnxzvvOfpnPAQAQA2kW/4OvDoTMC4CAGDCOlf9/8Lon/ESAAATlDb8cdU/kyAAACYojf5d9c8kCACACUm3/D32nCf9MRkCAGAC0nn/bz+xwZP+mBgBADBmafF33p9JEwAAY7br0Y3O+zNxAgBgjL7z5PnxP4f96GXyfBUCjEm64t9Ff9SFAAAYg30vru9s9uO0P3UhAABG7OW5Vtz/0/Nd9EetCACAEUqLvyv+qSMBADAi6Xa/XY9u8oQ/akkAAIzA4r3+bvejrtYFAEOVFv9//NGm6qXFn/oyAQAYosVz/hZ/6s4EAGBIFhd/5/xpAgEAMATpPv/0cB+LP00hAAAGlB7r23myn1v9aBABADCAtL1vZ4c/iz8NIwAA+vDu8SK+/eSG2HdwvcWfRhIAAD06vcHPxnj5cMve/jSWAADowYHXZjqLv4v9aDoBANAl5/uZJgIAYA1p5H//4+fHwero3+LPtBAAAKt4+qV18fVq8TfyZ9oIAIBlpKv808j/sedd5c90EgAAH5Iu9PvG4xtj7s3CVf5MLQEAsCAd9adz/U9VY39H/Uw7AQCw4J0qAJ767TpH/WTB44ABFsxuacf2y+cDciAAAJbYdfP7ATkQAABLXPeJ+dhhCkAGBADAh5gCkAMBAPAhpgDkQAAALMMUgGknAACWkaYAs1vcEMj0EgAAKzAFYJoJAIAV3PTpU/GRjaYATCcBALCCv64W/9uv/yBgGgkAgFXcccNJUwCmkgAAWIUpANNKAACswRSAaSQAANZgCsA0EgAAXbhtx6mAabIugIF89dGN8crcTDTJHX//Qdx+gyPaXmzb0o5bt5+MJ15cHzANBAAM6J33ijj8ZhFNsnv/ebFzh/PavbpthwBgejgFABl6u4qWp17S/7267nIPCWJ6CADIVJoC0DvbAzMtBABk6vCbrTj4WrOuXagDjwpmWggAyNju/RuC3pkCMA0EAGTswKszpgB9MAVgGggAyJwpQH92bj8Z0GQCADJnCtCfdBvl7Ba3UdJcAgAwBehD2vnh1u02U6K5BABgCtAnDwmiyQQA0LH3BfsC9MpDgmgyAQB0pJ0B5476kdArUwCaync70JGWsL3P2+e+V6YANJUAAM7Y9+L6ePd4sx5sVAemADSRAADOeLta/B8zBehZmgLcdNWpgCYRAMBZ0sWApgC9u/cWpwFoFgEAnMUUoD/bPtq2PTCNIgCAc5gC9MdDgmgSAQCcwxSgPx4SRJMIAGBZpgD9MQWgKQQAsKw0BUibA9EbUwCaQgAAK9q93/bA/TAFoAkEALCiw2+2PCSoD2kK4FHB1J0AAFblUcH9MQWg7gQAsCqPCu7PTZ8+ZXtgak0AAGsyBeidhwRRdwIAWJMpQH88JIg6EwBAV0wBemcKQJ0JAKArpgD9MQWgrgQA0LV9L9oeuFemANSVAAC6tu/g+pg76sdGr27bcSqgbnwnA11Lg+y9HhLUs21b2nHr9pMBdSIAgJ6k0wAeEtS723YIAOpFAAA98ajg/lx3uYcEUS8CAOiZRwX3x/bA1IkAAHpmCtAfjwqmTgQA0BdTgP6YAlAXAgDoiylAf0wBqAsBAPQtTQHo3U63BFIDAgDoW5oCpM2B6M3OHSdjdovtgZksAQAMZPd+U4BepSsnbt1ue2AmSwAAAzn8ZstDgvrgIUFMmgAABuZRwb3zkCAmTQAAA/Oo4P6YAjBJAgAYClOA3pkCMEkCABgKU4D+mAIwKQIAGBpTgN6lKcBNV50KGDcBAAyNKUB/7r3FaQDGTwAAQ7XvRRsD9WrbR9u2B2bsBAAwVGlnwLmjfrT0ykOCGDffpcBQpcvZ9npIUM88JIhxEwDA0KXTAB4V3DtTAMZJAABD51HB/TEFYJwEADAS6VHBpgC9MwVgXAQAMBKmAP1JUwARwDgIAGBkTAH6s+vzH8T9XzgRMEoCABgZU4D+FFUz3XHjyXj63/8vbt1+MmAUBAAwUmkKQO/S3CRtEPTdL53ohMB3vniis2XwFVvbnh3AUKwLgBFKU4C0OdDOHY5k+5GmASkEZqtfi/+G417+d//ivPiR5zxMHRMAYOR27zcFGFSaCKQYSL9aY/5VuIxjKgkAYOQOv9nykCCoGQEAjIVHBUO9CABgLDwqGOpFAABjYwoA9SEAgLExBYD6EADAWJkCQD0IAGCsTAGgHgQAMHb7XrQ9MEyaAADGLu0MOHfUjx+YJN+BwNilrWz3ekgQTJQAACYinQbwqGCYHAEATIRHBcNkCQBgYtKjgk0BYDIEADAxpgAwOQIAmChTAJgMAQBMlCkATIYAACYuTQGA8RIAwMSlKUDaHAgYHwEA1MLu/aYAME4CAKiFw2+2PCQIxkgAALXhUcEwPgIAqA2PCobxEQBArZgCwHgIAKBWTAFgPAQAUDumADB6AgCoHVMAGD0BANSSKQCMlgAAaskUAEZLAAC1df/j5wcwGgIAqK20O+DuX9oiGEZBAAC1tvf582LuqB9VMGy+q4BaS08KdCoAhk8AALWXLghMkwBgeAQA0AjpccGvzPmRBcPiuwlohLffK+Krj26Md6tTAsDgBADQGOmuANcDwHAIAKBRnvrtOrsEwhAIAKBRyurX7l+cF08cXB9A/wQA0DhlVQFfr04F2CoY+icAgEZKEbDr0Y3uDIA++c4BGivdGXD7jzeJAOiD7xqg0RYjwOkA6I0AABpvMQLsFgjdEwDAVEjXBHz7yQ1uEYQuCQBgaqQISLcIps2C7BgIqxMAwFRJEbDvwPq49XubPEYYVuG7A5g6abOgtG3wzu+5LgBWIgCAqZUuDkzXBaRTAqYBcDbfEcBUWzwlYBoAZxMAwNRLpwQWpwE3/cdfxdMvrQvInQAAspGmAenagK8+urGzb8ABmweRMRkMZCeFwIFXZ+Lga5tix+XzsfMzJ2PnjpMBOREAQLb+EgIzsXv/ebHr5g86QTC7pR0w7QQAkL3FUwPpboFkcSogBphmAgBgQQqBZHEqkKQI+NzfnoxPzrbjuup1mBYCAGAZy8XABRvLuKIKgR2XnYort7Y7r5sQ0FQCAGANizGQbiVcGgTJYhR0Xm6tThlcWMbWLaff3raljI9sLAPqSADQlWd+tz7+dMxdo8uxw1x+yiVr+mIUpEcPPfWh/QUWH0e0dcvpD/jwtCBFQhMC4ZXDbpecRsXFd5fylK54ttryfAPRr6Z8T/kan04mAHTNDwEYLt9TTJLZJQBkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkSAAAQIYEAABkKAXAsQAAcnKsFaUAAIDMVAFQCAAAyEkZ8UY6BfBGAADZKCLebkU7/hgAQD7a1QSgLOJQAAD5KKoAmGkLAADISdmKQ631rgEAgNw8t7gPwHMBAEy9slrzjzxcROuNPUWUZTwfAMDUK9rxm/Ty9FbALRMAAMhBORNPppeLzwJ4LmwJDADTrexc9/dserUTAOlcQLRjbwAAU6ssTp//T848DbAaCTwRAMD0Kv5ysL/0ccBpJPBcAADTZ8n4PzkTAJ2RQBk/DwBg6pQRDy6O/5OlE4DY0I494WJAAJgup4/+9yz9rdaH3uWtsowfBgAwNTpH/48U5dLfOysA0qZA1RTgoTAFAIDpsMzRf/LhCUB6RnCaAvxrAACNt9zRf3JOAKQpQJwuhecCAGiuFY7+k2Klj5n9cnlNux2/CgCgkcr5+PiRPcXry/1Za5WP+3U4FQAAjVQW8WD14vWV/rxY7YMvvqv68CKeqV69MQCApjhUreDXHnn43HP/i1abAMSfHynKanxw18I5BACg7qo1u1q7b1tt8U9WDYAFr5etKgIAgNprteO2WGX0f+b91nqHI6fvCnjW9QAAUHNFZ63+9cLavapuJgCxsHfwQwsXFAAANbOwRj8018Xin3T3XgsuuqdM7/9AdVbhmwEA1MLC4v/AWuf9l+opABIRAAD10c/in/QcAEmKgKId/1x99PcDAJiIzkX6ZezpdfFP+gqAJO0RUMzENeV8/Kz6r1waAMB4pFv90uJfxHNHftL74p90dRHgctIeAVU9/Kpsx2erNw8FADBy1Wr/3MLa+2y/i3/SdwAkcz/pDBDSvYZ/5w4BABix07f5pcX/9YU79Ab4Tw1J5+LAU/GxohVPOyUAAMOTjvpb8/Fv5br49Z8f7v+of6mBJgBLLVyA8Ifq12VlaftgABhYGcc6a2p11J9Ouw9r8U+GNgFY6qJ0gWD1364+yzuql980EQCAHqSFvxU/fP9U/GBDK9468sjwFv5FIwmARUIAALqXRv3VovnzE+14bMO6eOvEqSiP7RnNUj3SAFi0GALFTFzdbsd91f+468UAAETnaL9aE/eWRTxRvZ4CII63R7fwLxpLACya/XIZ8+0qBMpqKtCKG6IdN1afwfXVJ3FjAEAO0ni/iEPV+vdCpCP+djxfvV5Wv1cOemV/L8YaAEtddE+VOFUMpM+gc5qgiBuqMNgcp2PgkupP/7r6R7q0+rPN1TtsDgBoirTIRxyrxt/p5W+qteztsoxDrZn4zfGT8caGmXhrYQUe66K/1P8DvJo1zxdzszQAAAAASUVORK5CYII='
  supportedTransactionVersions: ReadonlySet<TransactionVersion> = new Set([
    'legacy',
    0,
  ]) as any

  private _connecting: boolean
  private _wallet: DesigWallet | null
  private _publicKey: PublicKey | null
  private _readyState: WalletReadyState =
    typeof window === 'undefined' || typeof document === 'undefined'
      ? WalletReadyState.Unsupported
      : WalletReadyState.NotDetected

  constructor(config: DesigWalletAdapterConfig = {}) {
    super()
    this._connecting = false
    this._wallet = null
    this._publicKey = null

    if (this._readyState !== WalletReadyState.Unsupported) {
      scopePollingDetectionStrategy(() => {
        if (window.desig?.solana?.isDesig) {
          this._readyState = WalletReadyState.Installed
          this.emit('readyStateChange', this._readyState)
          return true
        }
        return false
      })
    }
  }

  get publicKey(): PublicKey | null {
    return this._publicKey
  }

  get connecting(): boolean {
    return this._connecting
  }

  get readyState(): WalletReadyState {
    return this._readyState
  }

  async autoConnect(): Promise<void> {
    if (this.readyState === WalletReadyState.Installed) {
      await this.connect()
    }
  }

  async connect(): Promise<void> {
    try {
      if (this.connected || this.connecting) return
      if (this._readyState !== WalletReadyState.Installed)
        throw new WalletNotReadyError()

      this._connecting = true
      const wallet = window.desig?.solana!

      let publicKey: PublicKey
      try {
        const [address] = await wallet.connect()
        publicKey = new PublicKey(address)
      } catch (error: any) {
        throw new WalletPublicKeyError(error?.message, error)
      }

      this._publicKey = publicKey
      this._wallet = wallet

      this.emit('connect', publicKey)
    } catch (error: any) {
      this.emit('error', error)
      throw error
    } finally {
      this._connecting = false
    }
  }

  async disconnect(): Promise<void> {
    if (this._wallet) {
      this._wallet = null
      this._publicKey = null
    }

    this.emit('disconnect')
  }

  async signTransaction<T extends Transaction | VersionedTransaction>(
    transaction: T,
  ): Promise<T> {
    try {
      const wallet = this._wallet
      if (!wallet) throw new WalletNotConnectedError()

      try {
        return (await wallet.signTransaction(transaction)) || transaction
      } catch (error: any) {
        throw new WalletSignTransactionError(error?.message, error)
      }
    } catch (error: any) {
      this.emit('error', error)
      throw error
    }
  }

  async signAllTransactions<T extends Transaction | VersionedTransaction>(
    transactions: T[],
  ): Promise<T[]> {
    try {
      const wallet = this._wallet
      if (!wallet) throw new WalletNotConnectedError()

      try {
        return (await wallet.signAllTransactions(transactions)) || transactions
      } catch (error: any) {
        throw new WalletSignTransactionError(error?.message, error)
      }
    } catch (error: any) {
      this.emit('error', error)
      throw error
    }
  }

  async signMessage(message: Uint8Array): Promise<Uint8Array> {
    try {
      const wallet = this._wallet
      if (!wallet) throw new WalletNotConnectedError()

      try {
        const { signature } = await wallet.signMessage(message)
        return signature
      } catch (error: any) {
        throw new WalletSignMessageError(error?.message, error)
      }
    } catch (error: any) {
      this.emit('error', error)
      throw error
    }
  }
}
