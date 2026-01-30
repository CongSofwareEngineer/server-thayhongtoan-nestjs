import AES from 'crypto-js/aes'
import EncUtf8 from 'crypto-js/enc-utf8'
import EncHex from 'crypto-js/enc-hex'

const getIV = () => EncHex.parse(process.env.KEY_CRYPTO_IV_ENCODE!)

export const encryptData = (value: string | object, pinCode: string = process.env.KEY_CRYPTO_ENCODE) => {
  try {
    return AES.encrypt(JSON.stringify(value), EncUtf8.parse(pinCode), {
      iv: getIV(),
    }).toString()
  } catch (error) {
    return ''
  }
}

export const decryptData = (value: any, pinCode: string = process.env.KEY_CRYPTO_ENCODE) => {
  try {
    const bytes = AES.decrypt(value.toString(), EncUtf8.parse(pinCode), {
      iv: getIV(),
    })

    const decryptedData = JSON.parse(bytes.toString(EncUtf8))
    return decryptedData
  } catch (error) {
    return ''
  }
}

export const encodeDataMaxLength = (value: any, maxLength = 42, pinCode: string = process.env.KEY_CRYPTO_ENCODE) => {
  try {
    const stringEncode = encryptData(value, pinCode)
    if (stringEncode.length < 43) {
      return stringEncode
    }
    return stringEncode.substr(0, maxLength)
  } catch (error) {
    return ''
  }
}


 