# hexo-filter-nofollow

Adds nofollow attribute to all external links in your hexo blog posts automatically.

## Features
* Add rel="external nofollow noopener noreferrer" to all external links, which is SEO friendly.

## Install

``` bash
$ npm install hexo-autonofollow --save
```

## Options

You can configure this plugin in `_config.yml`.

```
nofollow:
  enable: true
  exclude:
    - exclude1.com
    - exclude2.com
  ignore_target: false
```

- **enable** - Enable the plugin. Defaults to **false**.
- **exclude** - Exclude hostname.
- **ignore_target** - Enable it to add nofollow attribute even when the link has `target` attribute. Defaults to **false**.
