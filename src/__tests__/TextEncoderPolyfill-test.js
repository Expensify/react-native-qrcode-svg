import { TextEncoder } from '../../textEncoderPolyfill'

describe('textEncoderPolyfill', () => {
  const samples = [
    '',
    'hello',
    'https://example.com/a?b=c&d=e',
    'こんにちは世界',
    'é ñ ü €',
    '😀 emoji 👨‍👩‍👧',
    '\u0000\u007f\u0080߿ࠀ￿',
    'lone high \ud800 and lone low \udc00 and trailing \ud83d'
  ]

  it.each(samples)('matches the native TextEncoder for %j', (value) => {
    expect(Array.from(new TextEncoder().encode(value)))
      .toEqual(Array.from(new global.TextEncoder().encode(value)))
  })

  it('returns a Uint8Array and defaults to empty input', () => {
    expect(new TextEncoder().encode()).toBeInstanceOf(Uint8Array)
    expect(new TextEncoder().encode().length).toBe(0)
  })
})
