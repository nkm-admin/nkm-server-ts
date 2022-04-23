import * as CryptoJS from 'crypto-js'
import { SECRET_KEY } from '../settings'
import { isObject } from '@xuanmo/javascript-utils'

export const md5 = (value: string, salt?: boolean | string) => {
  return CryptoJS.MD5(`${value}${SECRET_KEY}${typeof salt === 'boolean' ? Date.now() : salt ?? ''}`).toString()
}

class AESHandle {
  SECRET_KEY = md5(SECRET_KEY).toString()

  encrypt(data: string) {
    if (!data) return ''
    return CryptoJS.AES.encrypt(isObject(data) ? JSON.stringify(data) : data, this.SECRET_KEY).toString()
  }

  decrypt(cipherText: string) {
    if (!cipherText) return ''
    return CryptoJS.AES.decrypt(cipherText, this.SECRET_KEY).toString(CryptoJS.enc.Utf8)
  }
}

export const AESHelper: AESHandle = new AESHandle()
