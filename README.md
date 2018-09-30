# hexo-nofollow

[![npm version](https://badge.fury.io/js/hexo-nofollow.svg)](https://www.npmjs.com/package/hexo-nofollow)
[![Build Status](https://travis-ci.com/weyusi/hexo-nofollow.svg?branch=master)](https://travis-ci.com/weyusi/hexo-nofollow)
[![NPM Dependencies](https://david-dm.org/weyusi/hexo-nofollow.svg)](https://david-dm.org/weyusi/hexo-nofollow)
[![Known Vulnerabilities](https://snyk.io/test/npm/hexo-nofollow/badge.svg)](https://snyk.io/test/npm/hexo-nofollow) [![Greenkeeper badge](https://badges.greenkeeper.io/weyusi/hexo-nofollow.svg)](https://greenkeeper.io/)

> This project is based on [hexo-autonofollow](https://github.com/liuzc/hexo-autonofollow)

Adds nofollow attribute to all external links in your hexo blog posts automatically.

The original package has not been [updated](https://www.npmjs.com/package/hexo-autonofollow) for a while. Its outdated [dependency](https://www.npmjs.com/package/cheerio) has a minor [vulnerability](https://snyk.io/test/npm/hexo-autonofollow).

All the options are the same, so you can use this as a drop-in replacement.

## Features
* Add `rel="external nofollow noopener noreferrer"` to all external links, SEO friendly.
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
    - exclude1.com
    - exclude2.com
external_link: true
```

- **enable** - Enable the plugin. Defaults to **false**.
- **exclude** - Exclude hostname.
- **external_link** - Add `target="_blank"`. Defaults to **true**.
***Note:*** **external_link** setting already exists in default `_config.yml`. Only add it if you *can't* find it.

## Credits
All credits go to the following work:
- [hexo-autonofollow](https://github.com/weyusi/hexo-nofollow) by liuzc
- [cheerio](https://github.com/cheeriojs/cheerio)
- `target="_blank"` behaviour is noticed through this [commit](https://github.com/SukkaW/hexo-filter-nofollow/commit/6c5f49fb551237b42413c158b9294d58c4c8b221)
