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
