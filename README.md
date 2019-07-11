# hexo-nofollow

[![npm version](https://badge.fury.io/js/hexo-nofollow.svg)](https://www.npmjs.com/package/hexo-nofollow)
[![Build Status](https://travis-ci.com/weyusi/hexo-nofollow.svg?branch=master)](https://travis-ci.com/weyusi/hexo-nofollow)
[![NPM Dependencies](https://david-dm.org/weyusi/hexo-nofollow.svg)](https://david-dm.org/weyusi/hexo-nofollow)
[![Known Vulnerabilities](https://snyk.io/test/npm/hexo-nofollow/badge.svg)](https://snyk.io/test/npm/hexo-nofollow)
[![Greenkeeper badge](https://badges.greenkeeper.io/weyusi/hexo-nofollow.svg)](https://greenkeeper.io/)

> :warning: Current version has unescaped character issue ([#3](https://github.com/weyusi/hexo-nofollow/issues/3), [#4](https://github.com/weyusi/hexo-nofollow/issues/4)) caused by a [bug in cheerio](https://github.com/cheeriojs/cheerio/issues/1198). Read [below section](#unescaped-character-issue) for a temporary fix.

Adds nofollow attribute to all external links in your hexo blog posts automatically.

This is an updated version of [hexo-autonofollow](https://www.npmjs.com/package/hexo-autonofollow). All the options are the same, so you can use this as a drop-in replacement.

## Features
* Add `rel="external nofollow noopener noreferrer"` to all external links for security, privacy and SEO. [Read more](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types).
* Add `target="_blank"`, Open external links in new window or tab. This can be disabled, see below.

Hexo doesn't insert `target="_blank"` to all external links even if you set `external_link: true` (default value) in the _config.yml.
This plugin make sure all external links are processed.

For example,
```markdown
[example-link](https://example.com)
```
Becomes,
```html
<a href="https://example.com" rel="external nofollow noopener noreferrer" target="_blank">example-link</a>
```

## Install
``` bash
$ npm install hexo-nofollow --save
```

## Usage
To enable this plugin, insert the following to `_config.yml`:
``` yaml
nofollow:
  enable: true
```
To exclude certain links, see below.

## Options
```yaml
nofollow:
  enable: true
  exclude:
    - 'exclude1.com'
    - 'exclude2.com'
external_link: true
```

- **enable** - Enable the plugin. Defaults to `false`.
- **exclude** - Exclude hostname. Specify subdomain when applicable, including `www`
  - `'exclude1.com'` does not apply to `www.exclude1.com` nor `en.exclude1.com`.
- **external_link** - Add `target="_blank"`. [Defaults](https://hexo.io/docs/configuration#Writing) to `true`. [Recommend](https://css-tricks.com/use-target_blank/) to set it to false.

***Note:*** **external_link** setting is already in the default `_config.yml`.

## Unescaped character issue

Embedding HTML/XML in a codeblock in your post could cause issue when using this plugin with a minifier (see issue [#3](https://github.com/weyusi/hexo-nofollow/issues/3), [#4](https://github.com/weyusi/hexo-nofollow/issues/4)). This issue is caused by cheerio, the sole dependency of this plugin. In newer version (v1.0+) of cheerio, it does not properly escape character such as angle bracket, causing invalid syntax (e.g. `<<span>`) in the resulting html. While web browsers might render it just fine, minifier such as [html-minifier](https://github.com/kangax/html-minifier) requires strict syntax.

This issue has been [reported upstream](https://github.com/cheeriojs/cheerio/issues/1198) and [a fix](https://github.com/cheeriojs/dom-serializer/pull/80) has been proposed.

Meanwhile, I have included the fix in [v2.0](https://github.com/weyusi/hexo-nofollow/tree/v2.0) branch. To install this fix, change the version number of hexo-nofollow in your package.json to:

``` diff
- "hexo-nofollow": "^1.0.9"
+ "hexo-nofollow": "weyusi/hexo-nofollow#v2.0"
```

and run `npm install --only=prod`.

## Credits
All credits go to the following work:
- [hexo-autonofollow](https://github.com/weyusi/hexo-nofollow) by liuzc
- [cheerio](https://github.com/cheeriojs/cheerio)
- `target="_blank"` behaviour is noticed through this [commit](https://github.com/SukkaW/hexo-filter-nofollow/commit/6c5f49fb551237b42413c158b9294d58c4c8b221)
