'use strict';
const codemirror = require('codemirror');

module.exports = {
    inputRegex: null,
    outputRegex: null
};

window.addEventListener('load', (loadev) => {
    let inputRegexTextArea = document.querySelector('textarea.inputRegex');
    let outputRegexTextArea = document.querySelector('textarea.outputRegex');
    module.exports.inputRegex = codemirror.fromTextArea(inputRegexTextArea, {
        lineWrapping: true,
        dragDrop: false,
    });
    module.exports.outputRegex = codemirror.fromTextArea(outputRegexTextArea, {
        lineWrapping: true,
        dragDrop: false,
    });
});