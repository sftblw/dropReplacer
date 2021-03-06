'use strict';

function handleInput() {
  let areas = document.querySelectorAll('div.highlightWrap.inputRegex');

  for (let i = 0; i < areas.length; i++) {
    let inputArea = areas[i].querySelector('#inputRegex');
    let highlightArea = areas[i].querySelector('div.highlight');

    let text = inputArea.value;
    highlightArea.setAttribute('data-text', text);
    GenInputRegexHTML(text, highlightArea);
  }
}

window.addEventListener('load', (loadev) => {
  let areas = document.querySelectorAll('div.highlightWrap.inputRegex');
  
  for (let i = 0; i < areas.length; i++) {
    let inputArea = areas[i].querySelector('#inputRegex');
    let highlightArea = areas[i].querySelector('div.highlight');

    let inputHandler = () => {
      let text = inputArea.value;
      highlightArea.setAttribute('data-text', text);
      GenInputRegexHTML(text, highlightArea);
    };

    inputArea.addEventListener('input', (ev) => {
      inputHandler();
    });
  }
  handleInput();
});

function handleOutput() {
  let areas = document.querySelectorAll('div.highlightWrap.outputRegex');

  for (let i = 0; i < areas.length; i++) {
    let inputArea = areas[i].querySelector('#outputRegex');
    let highlightArea = areas[i].querySelector('div.highlight');

    let text = inputArea.value;
    highlightArea.setAttribute('data-text', text);
    GenOutputRegexHTML(text, highlightArea);
  }
}

window.addEventListener('load', (loadev) => {
    let areas = document.querySelectorAll('div.highlightWrap.outputRegex');
    
    for (let i = 0; i < areas.length; i++) {
        let inputArea = areas[i].querySelector('#outputRegex');
        let highlightArea = areas[i].querySelector('div.highlight');

        let outputHandler = () => {
            let text = inputArea.value;
            highlightArea.setAttribute('data-text', text);
            GenOutputRegexHTML(text, highlightArea);
        }
        inputArea.addEventListener('input', (ev) => {
            outputHandler();
        });
    }

    handleOutput();
});

module.exports = {
  handleInput: handleInput,
  handleOutput: handleOutput
};

function GenInputRegexHTML(text, parent) {
    let elementList = [];

    // state machine
    let braceStack = [];
    let mode = 'normal';
    for(let i = 0; i < text.length; i++) {
        let element = document.createElement('span');

        // 각 모드는 해당 모드의 시작 문자 index부터 시작함
        switch(mode) {
            case 'normal': {
                switch (text[i]) {
                    case '\\': {
                        mode = 'escape';
                        i--;
                    } break;
                    case '(': case ')': {
                        mode = 'brace';
                        i--;
                    } break;
                    default: {
                        element.innerHTML = text[i];
                        elementList.push(element);
                    } break;
                }
            } break;
            case 'escape': {
                // '/' 가 끝인 경우의 처리
                if (i == text.length - 1) {
                    element.innerHTML = text[i];
                    element.classList.add('error');
                    elementList.push(element);
                    mode = 'normal';
                    break;
                }

                // https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Values,_variables,_and_literals
                switch (text[i]) {
                    case '0': case 'b': case 'f': case 'n': case 'r': case 't': case 'v': case '\'': case '"': case '\\': {
                        element.innerHTML = text[i] + text[i + 1];
                        element.classList.add('escape');
                        elementList.push(element);
                        i += 1;
                    } break;
                    // case 'x': {

                    // } break;
                    // case 'u': {
                        
                    // } break;
                    default: {
                        element.innerHTML = text[i] + text[i + 1];
                        element.classList.add('escape');
                        elementList.push(element);
                        i += 1;
                    } break;
                }
                mode = 'normal';
            } break;
            case 'brace': {
                switch (text[i]) {
                    case '(': {
                        element.innerHTML = text[i];
                        element.classList.add('brace');
                        elementList.push(element);

                        braceStack.push(element);
                    } break;
                    case ')': {
                        element.innerHTML = text[i];
                        element.classList.add('brace');
                        elementList.push(element);

                        if (braceStack.length === 0) {
                            element.className = 'error';
                        } else {
                            let braceStart = braceStack.pop();
                            braceStart.braceEnd = element;
                            element.braceStart = braceStart;
                        }
                    } break;
                    default : {
                        element.innerHTML = text [i];
                        elementList.push(element);
                    } break;
                }
                mode = 'normal';
            }
        }
    }

    // error process
    while (braceStack.length > 0) {
        let brace = braceStack.pop();
        brace.className = 'error';
    }

    // replace
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    for (let i = 0; i < elementList.length; i++) {
        parent.appendChild(elementList[i]);
    }
}


function GenOutputRegexHTML(text, parent) {
    let elementList = [];

    // state machine
    let braceStack = [];
    let mode = 'normal';
    for(let i = 0; i < text.length; i++) {
        let element = document.createElement('span');

        // 각 모드는 해당 모드의 시작 문자 index부터 시작함
        switch(mode) {
            case 'normal': {
                switch (text[i]) {
                    // case '\\': {
                    //     mode = 'escape';
                    //     i--;
                    // } break;
                    case '$': {
                        mode = 'match';
                        i--;
                    } break;
                    default: {
                        element.innerHTML = text[i];
                        elementList.push(element);
                    } break;
                }
            } break;
            // case 'escape': {
            //     // '/' 가 끝인 경우의 처리
            //     if (i == text.length - 1) {
            //         element.innerHTML = text[i];
            //         element.classList.add('error');
            //         elementList.push(element);
            //         mode = 'normal';
            //         break;
            //     }

            //     // https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Values,_variables,_and_literals
            //     switch (text[i]) {
            //         case '0': case 'b': case 'f': case 'n': case 'r': case 't': case 'v': case '\'': case '"': case '\\': {
            //             element.innerHTML = text[i] + text[i + 1];
            //             element.classList.add('escape');
            //             elementList.push(element);
            //             i += 1;
            //         } break;
            //         // case 'x': {

            //         // } break;
            //         // case 'u': {
                        
            //         // } break;
            //         default: {
            //             element.innerHTML = text[i] + text[i + 1];
            //             element.classList.add('escape');
            //             elementList.push(element);
            //             i += 1;
            //         } break;
            //     }
            //     mode = 'normal';
            // } break;
            case 'match': {
                // '$' 가 끝인 경우의 처리
                if (i == text.length - 1 || !isCharDigit(text[i + 1])) {
                    element.innerHTML = text[i];
                    element.classList.add('error');
                    elementList.push(element);
                    mode = 'normal';
                    break;
                }
                
                let digit = '';
                while (isCharDigit(text[++i])) {
                    digit += text[i];
                }

                element.innerHTML = '$' + digit;
                element.classList.add('match');
                elementList.push(element);

                mode = 'normal';
                i--;
            } break;
        }
    }

    // error process
    while (braceStack.length > 0) {
        let brace = braceStack.pop();
        brace.className = 'error';
    }

    // replace
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    for (let i = 0; i < elementList.length; i++) {
        parent.appendChild(elementList[i]);
    }
}

/**
 * @param char {string}
 */
function isCharDigit (char) {
    switch (char) {
        // === comparision. http://stackoverflow.com/a/6989959
        case '0': case '1': case '2': case '3': case '4': 
        case '5': case '6': case '7': case '8': case '9': {
            return true;
        }
        default: {
            return false;
        }
    }
}