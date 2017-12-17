'use strict';
let isDragFinished = true;
const highlightRegex = require('../renderer/highlightregex');

let regex = {
  get inputRegex () {
    return document.querySelector('#inputRegex').value;
  },
  get outputRegex () {
    return document.querySelector('#outputRegex').value;
  },
  set inputRegex (value) {
    document.querySelector('#inputRegex').value = value;
    highlightRegex.handleInput();
  },
  set outputRegex (value) {
    document.querySelector('#outputRegex').value = value;
    highlightRegex.handleOutput();
  },
  inputOption: {
    get isExtensionIncluded () { return document.querySelector('.inputOption .isExtensionIncluded').checked; }
  }
};

let fileinfo = {
  set dragging (value) {
    document.querySelector('.fileinfo span.dragging').innerHTML = value;
  },
  set matching (value) {
    document.querySelector('.fileinfo span.matching').innerHTML = value;
  },
  reset: () => {
    if (isDragFinished === false) {
      fileinfo.dragging = 0;
      fileinfo.matching = 0;
      isDragFinished = true;
    }
  }
};

let history = {
  get list () {
    let list = document.querySelectorAll('.history ul li');
    return list;
  },
  add (inputRegex, outputRegex) {
    if (this.isExist(inputRegex, outputRegex)) return false;
    let ul = document.querySelector('.history ul');

    let li = document.createElement('li');
    li.innerHTML = `<a href='#'><span class='inputRegex'>${inputRegex}</span>
     / <span class='outputRegex'>${outputRegex}</span></a>
    <input type='button' value='X'>`;
    li.querySelector('a').addEventListener('click', (e) => {
      e.preventDefault();
      regex.inputRegex = inputRegex;
      regex.outputRegex = outputRegex;
    });
    li.querySelector('input[type=\'button\']').addEventListener('click', (e) => {
      li.parentNode.removeChild(li);
    });

    ul.insertBefore(li, ul.firstChild);
    if (this.list.length > 256) {
      ul.removeChild(ul.lastChild);
    }
    return true;
  },
  isExist (inputRegex, outputRegex) {
    let list = [].slice.call(this.list);
    let matching = list.filter((v) => {
      return v.querySelector('.inputRegex').innerText.trim() === inputRegex &&
        v.querySelector('.outputRegex').innerText.trim() === outputRegex;
    });
    return matching.length > 0;
  }
};

module.exports = {
  get isDragFinished () { return isDragFinished; },
  set isDragFinished (value) { isDragFinished = value; },
  regex: regex,
  history: history,
  fileinfo: fileinfo
};