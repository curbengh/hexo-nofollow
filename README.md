# hexo-nofollow

[![npm version](https://badge.fury.io/js/hexo-nofollow.svg)](https://www.npmjs.com/package/hexo-nofollow)
[![Build Status](https://travis-ci.com/curbengh/hexo-nofollow.svg?branch=master)](https://travis-ci.com/curbengh/hexo-nofollow)

Adds nofollow attribute to all external links in your hexo blog posts automatically.

This is an updated version of [hexo-autonofollow](https://github.com/liuzc/hexo-autonofollow). All the options are the same, so you can use this as a drop-in replacement.

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

## Credits
All credits go to the following work:
- [hexo-autonofollow](https://github.com/liuzc/hexo-autonofollow) by liuzc
- Regex is [created by](https://github.com/hexojs/hexo/pull/3685) SukkaW
- `target="_blank"` behaviour is noticed through this [commit](https://github.com/SukkaW/hexo-filter-nofollow/commit/6c5f49fb551237b42413c158b9294d58c4c8b221)
