'use strict';
let packager = require('electron-packager');

// win32
packager({
  dir: './',
  arch: 'ia32,x64',
  asar: true,
  out: 'build',
  platform: 'win32',
  prune: true,
  ignore: /(build|.gitignore|.gidmodules|res_bin|task|doc)/,
  icon: 'res_bin/dropReplacer_icon.ico'
}, (err, appPaths) => {
  if (err) console.error(err);
  else console.info('npm run build:: Packaging done');
});
