'use strict'

const cheerio = require('cheerio')
const URL = require('url')

function isExternal (url, config) {
  let exclude = config.nofollow.exclude
  const myhost = URL.parse(config.url).hostname
  const hostname = URL.parse(url).hostname

  if (!hostname) {
    return false
  }

  if (exclude && !Array.isArray(exclude)) {
    exclude = [exclude]
  }

  if (exclude && exclude.length) {
    for (let i = 0; i < exclude.length; i++) {
      if (hostname === exclude[i]) return false
    }
  }

  if (hostname !== myhost) {
    return true
  }
  return false
}

module.exports = function (source) {
  const hexo = this
  const config = hexo.config

  // Get value of external_link from _config.yml
  // Defaults to true if external_link is missing
  let option = true
  if (typeof config.external_link !== 'undefined') {
    option = config.external_link
  }

  const $ = cheerio.load(source, {
    decodeEntities: false
  })

  $('a').each((index, element) => {
    const href = $(element).attr('href')
    if (href && isExternal(href, config)) {
      if (option) {
        $(element).attr({
          rel: 'external nofollow noopener noreferrer',
          target: '_blank'
        })
      } else {
        $(element).attr({
          rel: 'external nofollow noopener noreferrer'
        })
      }
    }
  })

  return $.html()
}
