const path = require('path');
const fs = require('fs');

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
    if (err) console.error(err);
    callback();
  });
}

module.exports = {
  renameByRegex: renameByRegex
}
