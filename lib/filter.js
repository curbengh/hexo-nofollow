'use strict'

const cheerio = require('cheerio')
const URL = require('url')

function isExternal (url, config) {
  let exclude = config.nofollow.exclude
  const myhost = URL.parse(config.url).hostname // eslint-disable-line node/no-deprecated-api
  const hostname = URL.parse(url).hostname // eslint-disable-line node/no-deprecated-api

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
  if (config.external_link !== 'undefined') {
    option = config.external_link
  }

  const $ = cheerio.load(source, {
    decodeEntities: true
  })

  $('a').each((index, element) => {
    const noFollow = 'external nofollow noopener noreferrer'
    const href = $(element).attr('href')
    let relAttr = $(element).attr('rel') || noFollow

    if (!relAttr.includes(noFollow)) {
      relAttr += ' ' + noFollow
    }

    if (href && isExternal(href, config)) {
      if (option) {
        $(element).attr({
          rel: relAttr,
          target: '_blank'
        })
      } else {
        $(element).attr({
          rel: relAttr
        })
      }
    }
  })

  return $.html()
}
