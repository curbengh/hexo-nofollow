'use strict'

const urlFn = require('url')

function isExternal (url, config) {
  let exclude = config.nofollow.exclude
  const myhost = urlFn.parse(config.url).hostname // eslint-disable-line node/no-deprecated-api
  const hostname = urlFn.parse(url).hostname // eslint-disable-line node/no-deprecated-api

  if (!hostname) {
    return false
  }

  if (exclude && !Array.isArray(exclude)) {
    exclude = [exclude]
  }

  if (exclude && exclude.length) {
    for (const i in exclude) {
      if (hostname === exclude[i]) return false
    }
  }

  if (hostname !== myhost) {
    return true
  }
  return false
}

module.exports = function (data) {
  const hexo = this
  const config = hexo.config
  const noFollow = 'external nofollow noopener noreferrer'

  let option = true
  if (config.external_link !== 'undefined') {
    option = config.external_link
  }

  // https://github.com/hexojs/hexo/pull/3685
  data = data.replace(/<a.*?(href=['"](.*?)['"]).*?>/gi, (str, hrefStr, href) => {
    if (!isExternal(href, config)) return str

    if (/rel=/gi.test(str)) {
      str = str.replace(/rel="(.*?)"/gi, (relStr, rel) => {
        if (!rel.includes(noFollow)) relStr = relStr.replace(rel, `${rel} ${noFollow}`)
        return relStr
      })

      if (option) {
        return str.replace(hrefStr, `${hrefStr} target="_blank"`)
      } else {
        return str.replace(hrefStr, `${hrefStr}`)
      }
    }

    if (option) {
      return str.replace(hrefStr, `${hrefStr} target="_blank" rel="${noFollow}"`)
    } else {
      return str.replace(hrefStr, `${hrefStr} rel="${noFollow}"`)
    }
  })

  return data
}
