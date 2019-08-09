/* global hexo */
'use strict'

if (hexo.config.nofollow && hexo.config.nofollow.enable) {
  hexo.extend.filter.register('after_render:html', require('./lib/filter'))
}
