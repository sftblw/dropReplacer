'use strict';

const path = require('path');
const fs = require('fs');

let config = {
  get inputRegex() {
    return document.querySelector('#inputRegex').value;
  },
  get outputRegex() {
    return document.querySelector('#outputRegex').value;
  }
}

window.onload = () => {
  document.addEventListener('dragenter', (ev) => {
    ev = ev || event;
    // ev.dataTransfer.setData('files', event.target.id);
  });
  document.addEventListener('dragover', (ev) => {
    ev = ev || event;
    ev.preventDefault();
  });
  document.addEventListener('drop', (ev) => {
    ev = ev || event;
    ev.preventDefault();

    let files = ev.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      let oldPath = files[i].path;
      renameByRegex(oldPath, config.outputRegex, config.inputRegex, (err) => {
        if (err) console.log(err);
      });
    }
  });
};

function renameByRegex(oldPath, newName, regex, callback) {

  // filter input
  if (typeof regex === 'string') {
    regex = new RegExp(regex);
  }
  if (typeof regex !== 'object' || !(regex instanceof RegExp)) {
    callback(new Error('regex should be string or instance of RegExp.'));
  }

  // make new path
  let newPath = path.parse(oldPath);
  delete newPath.base;
  newPath.name = newPath.name.replace(regex, newName);
  newPath = path.format(newPath);

  fs.rename(oldPath, newPath, (err) => {
    if (err) console.log(err);
    callback();
  });
}
