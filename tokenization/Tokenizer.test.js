const Tokenizer = require('./Tokenizer')

module.exports.tests = {}

module.exports.tests.constructor = (test) => {
  test('constructor: basic', (t) => {
    let tok = new Tokenizer('100 Main Street')
    t.equals(tok.span.constructor.name, 'Span')
    t.equals(tok.span.body, '100 Main Street')
    t.deepEquals(tok.solution, [])
    t.end()
  })
  test('constructor: advanced', (t) => {
    let tok = new Tokenizer('100 West 26th Street, NYC, 10010 NY, USA')
    t.equals(tok.span.constructor.name, 'Span')
    t.equals(tok.span.body, '100 West 26th Street, NYC, 10010 NY, USA')
    t.deepEquals(tok.solution, [])
    t.end()
  })
}

module.exports.tests.segment = (test) => {
  test('segment: basic', (t) => {
    let tok = new Tokenizer('100 Main Street')
    t.true(tok.section.every(s => s.constructor.name === 'Span'))
    t.equals(tok.section.length, 1)
    t.equals(tok.section[0].body, '100 Main Street')
    t.end()
  })
  test('segment: advanced', (t) => {
    let tok = new Tokenizer('100 West 26th Street, NYC, 10010 NY, USA')
    t.true(tok.section.every(s => s.constructor.name === 'Span'))
    t.equals(tok.section.length, 4)
    t.equals(tok.section[0].body, '100 West 26th Street')
    t.equals(tok.section[1].body, ' NYC')
    t.equals(tok.section[2].body, ' 10010 NY')
    t.equals(tok.section[3].body, ' USA')
    t.end()
  })
}

module.exports.tests.split = (test) => {
  test('split: basic', (t) => {
    let tok = new Tokenizer('100 Main Street')
    t.true(tok.section.every(s => s.child.every(c => c.constructor.name === 'Span')))
    t.equals(tok.section[0].child.length, 3)
    t.equals(tok.section[0].child[0].body, '100')
    t.equals(tok.section[0].child[1].body, 'Main')
    t.equals(tok.section[0].child[2].body, 'Street')
    t.end()
  })
  test('split: advanced', (t) => {
    let tok = new Tokenizer('100 West 26th Street, NYC, 10010 NY, USA')
    t.true(tok.section.every(s => s.child.every(c => c.constructor.name === 'Span')))
    t.equals(tok.section[0].child.length, 4)
    t.equals(tok.section[0].child[0].body, '100')
    t.equals(tok.section[0].child[1].body, 'West')
    t.equals(tok.section[0].child[2].body, '26th')
    t.equals(tok.section[0].child[3].body, 'Street')
    t.equals(tok.section[1].child.length, 1)
    t.equals(tok.section[1].child[0].body, 'NYC')
    t.equals(tok.section[2].child.length, 2)
    t.equals(tok.section[2].child[0].body, '10010')
    t.equals(tok.section[2].child[1].body, 'NY')
    t.equals(tok.section[3].child.length, 1)
    t.equals(tok.section[3].child[0].body, 'USA')
    t.end()
  })
}

module.exports.tests.permute = (test) => {
  test('permute: basic', (t) => {
    let tok = new Tokenizer('100 Main Street')
    t.true(tok.section.every(s => s.permutation.every(p => p.constructor.name === 'Span')))
    t.equals(tok.section[0].permutation.length, 6)
    t.equals(tok.section[0].permutation[0].body, '100 Main Street')
    t.equals(tok.section[0].permutation[1].body, '100 Main')
    t.equals(tok.section[0].permutation[2].body, '100')
    t.equals(tok.section[0].permutation[3].body, 'Main Street')
    t.equals(tok.section[0].permutation[4].body, 'Main')
    t.equals(tok.section[0].permutation[5].body, 'Street')
    t.end()
  })
  test('permute: advanced', (t) => {
    let tok = new Tokenizer('100 West 26th Street, NYC, 10010 NY, USA')
    t.true(tok.section.every(s => s.permutation.every(p => p.constructor.name === 'Span')))
    t.equals(tok.section[0].permutation.length, 10)
    t.equals(tok.section[0].permutation[0].body, '100 West 26th Street')
    t.equals(tok.section[0].permutation[1].body, '100 West 26th')
    t.equals(tok.section[0].permutation[2].body, '100 West')
    t.equals(tok.section[0].permutation[3].body, '100')
    t.equals(tok.section[0].permutation[4].body, 'West 26th Street')
    t.equals(tok.section[0].permutation[5].body, 'West 26th')
    t.equals(tok.section[0].permutation[6].body, 'West')
    t.equals(tok.section[0].permutation[7].body, '26th Street')
    t.equals(tok.section[0].permutation[8].body, '26th')
    t.equals(tok.section[0].permutation[9].body, 'Street')
    t.equals(tok.section[1].permutation.length, 1)
    t.equals(tok.section[1].permutation[0].body, 'NYC')
    t.equals(tok.section[2].permutation.length, 3)
    t.equals(tok.section[2].permutation[0].body, '10010 NY')
    t.equals(tok.section[2].permutation[1].body, '10010')
    t.equals(tok.section[2].permutation[2].body, 'NY')
    t.equals(tok.section[3].permutation.length, 1)
    t.equals(tok.section[3].permutation[0].body, 'USA')
    t.end()
  })
}

module.exports.tests.computeCoverage = (test) => {
  test('computeCoverage: basic', (t) => {
    let tok = new Tokenizer('100 Main Street')
    t.equal(13, tok.coverage)
    t.end()
  })
  test('computeCoverage: advanced', (t) => {
    let tok = new Tokenizer('100 West 26th Street, NYC, 10010 NY, USA')
    t.equal(30, tok.coverage)
    t.end()
  })
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`Tokenizer: ${name}`, testFunction)
  }

  for (var testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common)
  }
}