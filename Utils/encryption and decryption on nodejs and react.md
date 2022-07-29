## encryption and decryption on nodejs and react

```
export const decryptCrypto = (data) => {
  let salt = process.env.REACT_APP_SERCET_KEY ?? ''
  var bytes = CryptoJS.AES.decrypt(data, salt)
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  return decryptedData
}

export const encryptCrypto = (data) => {
  let salt = process.env.REACT_APP_SERCET_KEY ?? ''
  var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), salt).toString()
  return ciphertext
}

```
