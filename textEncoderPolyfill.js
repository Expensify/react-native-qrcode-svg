// Minimal UTF-8 only TextEncoder for React Native < 0.75 (no global TextEncoder).
// `node-qrcode` only calls `new TextEncoder().encode(string)`, so that is all we implement.
// Lone surrogates are encoded as U+FFFD, matching the WHATWG Encoding Standard.
class TextEncoder {
  get encoding () {
    return 'utf-8'
  }

  encode (input = '') {
    const str = String(input)
    const bytes = []
    for (let i = 0; i < str.length; i++) {
      let cp = str.charCodeAt(i)
      if (cp >= 0xd800 && cp <= 0xdbff) {
        const next = i + 1 < str.length ? str.charCodeAt(i + 1) : 0
        if (next >= 0xdc00 && next <= 0xdfff) {
          cp = 0x10000 + ((cp - 0xd800) << 10) + (next - 0xdc00)
          i++
        } else {
          cp = 0xfffd
        }
      } else if (cp >= 0xdc00 && cp <= 0xdfff) {
        cp = 0xfffd
      }
      if (cp < 0x80) {
        bytes.push(cp)
      } else if (cp < 0x800) {
        bytes.push(0xc0 | (cp >> 6), 0x80 | (cp & 0x3f))
      } else if (cp < 0x10000) {
        bytes.push(0xe0 | (cp >> 12), 0x80 | ((cp >> 6) & 0x3f), 0x80 | (cp & 0x3f))
      } else {
        bytes.push(0xf0 | (cp >> 18), 0x80 | ((cp >> 12) & 0x3f), 0x80 | ((cp >> 6) & 0x3f), 0x80 | (cp & 0x3f))
      }
    }
    return new Uint8Array(bytes)
  }
}

module.exports = { TextEncoder }
