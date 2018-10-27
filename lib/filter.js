'use strict'

const cheerio = require('cheerio')
const URL = require('url')

function isExternal (url, config) {
  let exclude = config.nofollow.exclude
  let myhost = URL.parse(config.url).hostname
  let hostname = URL.parse(url).hostname
  if (!hostname) {
    return false
  }

  if (exclude && !Array.isArray(exclude)) {
    exclude = [exclude]
  }

  if (exclude && exclude.length) {
    for (var i = 0, len = exclude.length; i < len; i++) {
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

  $('a').each(function (index, element) {
    let href = $(element).attr('href')
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

  // Workaround for https://github.com/hexojs/hexo/issues/3313
  $('body').each(function (index, element) {
    $('meta[name="generator"]').remove()
  })

  return $.html()
}
