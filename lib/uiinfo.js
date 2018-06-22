'use strict';
let isDragFinished = true;
const highlightRegex = require('../renderer/highlightregex');
const _recent_regex = require('../sotrage/recent_regex');
let regex = {
  get inputRegex() {
    return document.querySelector('#inputRegex').value;
  },
  get outputRegex() {
    return document.querySelector('#outputRegex').value;
  },
  set inputRegex(value) {
    document.querySelector('#inputRegex').value = value;
    highlightRegex.handleInput();
  },
  set outputRegex(value) {
    document.querySelector('#outputRegex').value = value;
    highlightRegex.handleOutput();
  },
  inputOption: {
    get isExtensionIncluded() { return document.querySelector('.inputOption .isExtensionIncluded').checked; }
  }
};

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
};

class History {
  constructor() {
    this.limit_count = 256;
    this.backend = _recent_regex;
  }

  recover() {
    // empty ui
    while (this._ul.childNodes.length != 0) { this._ul.removeChild(this._ul.firstChild); }

    // set ui from backend entirely
    for (let regex_tuple of this.backend.get()) {
      // dont' use add & remove. they have backend access.
      console.log(regex_tuple);
      let li = this._make_ui_item(regex_tuple[0], regex_tuple[1]);
      this._push_back_ul(li);
    }
  }

  add(inputRegex, outputRegex) {
    let regex_tuple = [inputRegex, outputRegex];

    // when it already has the thing, remove and add → move top.
    if (this.backend.has(regex_tuple)) {
      this.remove(inputRegex, outputRegex);
      this.add(inputRegex, outputRegex);
      return;
    }

    let li = this._make_ui_item(inputRegex, outputRegex);
    this._push_back_ul(li);
    this.backend.push(regex_tuple);

    this._limit();
  }

  remove(inputRegex, outputRegex) {
    let regex_tuple = [inputRegex, outputRegex];

    if (this.backend.has(regex_tuple)) {
      this.backend.remove(regex_tuple);
      this._ul_find(inputRegex, outputRegex).forEach(li_item => {
        this._ul.removeChild(li_item);
      });

      return true;
    }
    return false;
  }

  _limit() {
    let store_length = this.backend.get().length /* as Array (TypeScript) */;

    while (store_length > this.limit_count) {
      this.backend.dequeue();
      this._ul_dequeue();
      store_length--;
    }
  }

  // <ul>
  get _ul() {
    let ul = document.querySelector('.history ul');
    return ul;
  }

  // <ul> (destory one <li />) </ul>
  _ul_dequeue() {
    this._ul.removeChild(this._ul.lastChild); // lastchild is the first of imaginary queue
  }

  // caution: returns array
  _ul_find(inputRegex, outputRegex) {
    let list = document.querySelectorAll('.history ul li');
    list = [].slice.call(list);
    let matching = list.filter((v) => {
      return v.querySelector('.inputRegex').innerText.trim() === inputRegex &&
        v.querySelector('.outputRegex').innerText.trim() === outputRegex;
    });
    return matching;
  }

  _push_back_ul(li) {
    this._ul.insertBefore(li, this._ul.firstChild);
  }

  _make_ui_item(inputRegex, outputRegex) {
    let li = document.createElement('li');

    li.innerHTML = `<a href='#'><span class='inputRegex'>${inputRegex}</span>
     / <span class='outputRegex'>${outputRegex}</span></a>
    <input type='button' value='X'>`;

    li.querySelector('a').addEventListener('click', (e) => {
      e.preventDefault();
      // renew UI. this regex is UI regex.
      regex.inputRegex = inputRegex;
      regex.outputRegex = outputRegex;
    });

    let history = this;
    li.querySelector('input[type=\'button\']').addEventListener('click', (e) => {
      history.remove(inputRegex, outputRegex);
    });

    return li;
  }
}
let history = new History();

module.exports = {
  get isDragFinished() { return isDragFinished; },
  set isDragFinished(value) { isDragFinished = value; },
  regex: regex,
  history: history,
  fileinfo: fileinfo
};