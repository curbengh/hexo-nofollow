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
```

- **enable** - Enable the plugin. Defaults to **false**.
- **exclude** - Exclude hostname.
