import genMatrix from '../genMatrix'

it('generates with ecl:M correctly', () => {
  const matrix = genMatrix('test')
  expect(matrix).toMatchSnapshot()
})

it('generates with ecl:L correctly', () => {
  const matrix = genMatrix('test', 'L')
  expect(matrix).toMatchSnapshot()
})

it('generates with ecl:H correctly', () => {
  const matrix = genMatrix('test', 'H')
  expect(matrix).toMatchSnapshot()
})

it('generates with ecl:Q correctly', () => {
  const matrix = genMatrix('test', 'Q')
  expect(matrix).toMatchSnapshot()
})
