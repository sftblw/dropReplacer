'use strict';
window.addEventListener('load', (loadev) => {
    let areas = document.querySelectorAll('div.highlightWrap.inputRegex');

    for (let i = 0; i < areas.length; i++) {
        let inputArea = areas[i].querySelector('input[type=\'text\']');
        let highlightArea = areas[i].querySelector('div.highlight');

        inputArea.addEventListener('input', (ev) => {
            let text = inputArea.value;
            highlightArea.setAttribute('data-text', text);
            GenInputRegexHTML(text, highlightArea);
        });

        // initialize
        {
            let text = inputArea.value;
            highlightArea.setAttribute('data-text', text);
            GenInputRegexHTML(text, highlightArea);
        }
    }
});

// window.addEventListener('load', (loadev) => {
//     let areas = document.querySelectorAll('div.highlightWrap.outputRegex');

//     for (let i = 0; i < areas.length; i++) {
//         let inputArea = areas[i].querySelector('input[type=\'text\']');
//         let highlightArea = areas[i].querySelector('div.highlight');

//         inputArea.addEventListener('input', (ev) => {
//             let text = inputArea.value;
//             highlightArea.setAttribute('data-text', text);
//             GenInputRegexHTML(text, highlightArea);
//         });

//         // initialize
//         {
//             let text = inputArea.value;
//             highlightArea.setAttribute('data-text', text);
//             GenInputRegexHTML(text, highlightArea);
//         }
//     }
// });

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
                } else {
                    i++;
                }
                // https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Values,_variables,_and_literals
                switch (text[i]) {
                    case '0': case 'b': case 'f': case 'n': case 'r': case 't': case 'v': case '\'': case '"': case '\\': {
                        element.innerHTML = text[i - 1] + text [i];
                        element.classList.add('escape');
                        elementList.push(element);
                    } break;
                    // case 'x': {

                    // } break;
                    // case 'u': {
                        
                    // } break;
                    default: {
                        element.innerHTML = text[i - 1] + text [i];
                        elementList.push(element);
                    } break;
                }
                mode = 'normal';
            }
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

                        let braceStart = braceStack.pop();
                        braceStart.braceEnd = element;
                        element.braceStart = braceStart;
                    } break;
                    default : {
                        element.innerHTML = text [i];
                        elementList.push(element);
                    }
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