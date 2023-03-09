```
module.exports = {
  base64Encode: (str) => {
    return Buffer.from(str).toString('base64')
  },

  base64Decode: (str) => {
    return Buffer.from(str, 'base64').toString('ascii')
  }
}
```
