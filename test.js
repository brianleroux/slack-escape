var escapes = require('.')
var test = require('tape')

test('ok lets do this', t=> {
  t.plan(1)
  t.ok(escapes, 'exists')
})

test('escape greater than', t=> {
  t.plan(1)
  var bad = 'foo &gt; baz'
  var good = 'foo > baz'
  t.equal(escapes(bad), good, 'fixed em')
})

test('escape less than', t=> {
  t.plan(1)
  var bad = 'foo &lt; baz'
  var good = 'foo < baz'
  t.equal(escapes(bad), good, 'fixed em')
})

test('escape ampersand', t=> {
  t.plan(1)
  var bad = 'foo &amp; baz'
  var good = 'foo & baz'
  t.equal(escapes(bad), good, 'fixed em')
})

test('escape smiley', t=> {
  t.plan(1)
  var bad = 'foo :smile: baz'
  var good = 'foo \uD83D\uDE04 baz'
  t.equal(escapes(bad), good, 'fixed em')
  console.log(escapes(bad))
})

test('escape link', t=> {
  t.plan(1)
  var bad = 'foo <http://brian.io|http://brian.io>'
  var good = 'foo http://brian.io'
  t.equal(escapes(bad), good, 'fixed em')
  console.log(escapes(bad))
})

test('escape link with https', t=> {
  t.plan(1)
  var bad = '<https://blog.ninlabs.com/2013/01/programmer-interrupted>'
  var good = 'https://blog.ninlabs.com/2013/01/programmer-interrupted'
  t.equal(escapes(bad), good, 'fixed it')
  console.log(escapes(bad))
})

test('two links', t=> {
  t.plan(1)
  var bad = 'blah blah <https://blog.ninlabs.com/2013/01/programmer-interrupted> blah <http://brian.io>'
  var good = 'blah blah https://blog.ninlabs.com/2013/01/programmer-interrupted blah http://brian.io'
  t.equal(escapes(bad), good, 'fixed it')
  console.log(escapes(bad))
})

test('escape a phone number', t=> {
  t.plan(1)
  var bad = 'Call Topo re. backpack at <tel:(303)297-3802|(303) 297-3802>'
  var good = 'Call Topo re. backpack at (303) 297-3802'
  t.equal(escapes(bad), good, 'fixed it')
  console.log(escapes(bad))
})
