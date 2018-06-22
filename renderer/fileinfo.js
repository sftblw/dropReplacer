// this will not happen in new chrome aka new electron.

// reason: security (blink / webkit) which is not for electron :(

// electron issue: https://github.com/electron/electron/issues/9840
// s/o 2012: https://stackoverflow.com/a/9536533

const path = require('path');
const uiinfo = require('../lib/uiinfo.js');
const dragdrophandler = require('./dragdrophandler.js');

window.addEventListener('load', (loadev) => {

  document.addEventListener('dragenter', (ev) => {
    ev = ev || event;
    recordFileInfo(ev);
  });
  document.addEventListener('dragover', (ev) => {
    ev = ev || event;
    recordFileInfo(ev);
  });
  document.addEventListener('dragleave', (ev) => {
    ev = ev || event;
    // dragleave occurs when it's not actually exits...
    // just on dragging.
    uiinfo.fileinfo.reset();
  });
  document.addEventListener('drop', (ev) => {
    ev = ev || event;
    uiinfo.fileinfo.reset();
  });
});

function recordFileInfo(ev) {
  if (uiinfo.isDragFinished === true) {
    let matchingCount = 0;
    let files = ev.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {

      // get filename to check
      // TODO: refactor later (filename retriving would be in one place rather than spreaded)
      let fileName = "";
      if (uiinfo.regex.inputOption.isExtensionIncluded) {
        fileName = path.parse(files[i].path).base;
      } else {
        fileName = path.parse(files[i].path).name;
      }

      let regex = uiinfo.regex.inputRegex;
      let matchedInfo = fileName.match(regex);
      if (matchedInfo !== null && matchedInfo.length != 0) {
        matchingCount++;
      }
    }
    uiinfo.isDragFinished = false;
    uiinfo.fileinfo.dragging = files.length;
    uiinfo.fileinfo.matching = matchingCount;
  }
}
