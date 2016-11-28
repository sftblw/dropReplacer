'use strict';

module.exports = {
    inputRegexEditor: null,
    outputRegexEditor: null
};
require("codemirror/mode/javascript/javascript");
const codemirror = require('codemirror');
window.addEventListener('load', (loadev) => {
    let inputRegexTextArea = document.querySelector('textarea.inputRegex');
    let outputRegexTextArea = document.querySelector('textarea.outputRegex');
    module.exports.inputRegexEditor = codemirror.fromTextArea(inputRegexTextArea, {
        value: "(.*)",
        mode: "javascript"
    });
    module.exports.outputRegexEditor = codemirror.fromTextArea(outputRegexTextArea, {
        value: "$1 (renamed)",
        mode: "javascript"
    });
});