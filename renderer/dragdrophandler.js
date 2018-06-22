'use strict';

const renamer = require('../lib/renamer.js');
const uiinfo = require('../lib/uiinfo.js');

window.addEventListener('load', (loadev) => {
  window.addEventListener('dragover', (ev) => {
    ev = ev || event;
    ev.preventDefault();
  });

  window.addEventListener('drop', (ev) => {
    ev = ev || event;
    ev.preventDefault();

    let files = ev.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      let oldPath = files[i].path;
      renamer.renameByRegex(oldPath, uiinfo.regex.outputRegex, uiinfo.regex.inputRegex, (err) => {
        if (err) console.error(err);
      });
    }

    uiinfo.history.add(uiinfo.regex.inputRegex, uiinfo.regex.outputRegex);
  });

  uiinfo.history.recover();
});
