module.exports = {
  regex: {
    get inputRegex() {
      return document.querySelector('#inputRegex').value;
    },
    get outputRegex() {
      return document.querySelector('#outputRegex').value;
    }
  },
}
