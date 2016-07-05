var Emoji = require('@smallwins/js-emoji')
var emoji = new Emoji

function escapeHTML(txt) {
  var lessThan = /(&lt;)/g
  var greaterThan = /(&gt;)/g
  var ampersand = /(&amp;)/g
  return txt.replace(lessThan, '<').replace(greaterThan, '>').replace(ampersand, '&')
}

function escapeLink(txt) {
  var slackLink = /(<http:\/\/\w+.\w+\|)(\S+)>/
  var matches = txt.match(slackLink)
  if (matches) {
    var actualLink = matches[2]
    txt = txt.replace(slackLink, actualLink)
  }
  return txt
}

function escapeEmoji(txt) {
  var maybeEmojiIndex = 0
  var slackIndex = 3
  // create an insane collections of regexes dynamically on a private member 
  // what could possibly go wrong
  var insane = [] 
  Object.keys(emoji.data).forEach(function(k) {
    var unicodeValue = emoji.data[k][maybeEmojiIndex][0] // because > 0 === fallbacks
    var slackSyntaxes = emoji.data[k][slackIndex]
    slackSyntaxes.forEach(function(sin) {
      //  console.log(sin)
      if (sin === '+1') {
        sin = '\\+1'
      }
      insane.push([new RegExp(':' + sin + ':'), unicodeValue])
    })
  })
  // loop thru the insane replacing
  insane.forEach(function(tuple) {
    txt = txt.replace(tuple[0], tuple[1])
  })
  return txt
}

module.exports = function escape(txt) {
  return escapeHTML(escapeLink(escapeEmoji(txt)))
}
