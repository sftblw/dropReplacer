'use strict';
let isDragFinished = true;

let regex = {
  get inputRegex() {
    return document.querySelector('#inputRegex').value;
  },
  get outputRegex() {
    return document.querySelector('#outputRegex').value;
  },
  inputOption: {
    get isExtensionIncluded() { return document.querySelector('.inputOption .isExtensionIncluded').checked }
  }
}

let fileinfo = {
  set dragging(value) {
    document.querySelector('.fileinfo span.dragging').innerHTML = value;
  },
  set matching(value) {
    document.querySelector('.fileinfo span.matching').innerHTML = value;
  },
  reset: () => {
    if (isDragFinished === false) {
      fileinfo.dragging = 0;
      fileinfo.matching = 0;
      isDragFinished = true;
    }
  }
}

module.exports = {
  get isDragFinished() {return isDragFinished},
  set isDragFinished(value) {isDragFinished = value;},
  regex: regex,
  fileinfo: fileinfo
}
