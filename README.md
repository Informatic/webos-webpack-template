webos-webpack-template
======================

Minimal webOS frontend + service webpack-based template.

Targets webOS 3.x, but should probably work well on webOS 1.x as well.

Usage
-----

1. Update `vendor`/`title` in `./appinfo.json`
2. Update `name` in `./package.json` and `./service/package.json`
3. Populate logo images


Building
--------

```sh
npm install

npm run build
npm run package

# Configure development TV/emulator
node_modules/.bin/ares-setup-device ...

npm run deploy
npm run launch
```
