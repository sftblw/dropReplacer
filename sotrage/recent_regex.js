'use strict';

// this document implements internal api for saving and loading recent regex
// using 'electron-store'. see their document.

const Path = require('path');
const app = require('electron').app;

const the_key = 'k';

const Store = require('electron-store');
const store = new Store({ name: 'recent_regex' });
// { 'k' : [ '[inputRegex, outputRegex]', ... ]}

// the value is array. this ensure it.
const init = () => {
    if (store.get(the_key) == null || (!(store.get(the_key) instanceof Array))) {
        store.set(the_key, []);
    }
};
init();

// to use [a, b] as key, this document uses JSON serialization inside the js array. :lol:

const get = () => { /* Array */
    let items = store.get(the_key).map(val => JSON.parse(val));
    return items;
};

const push = (regex_tuple /* [inputRegex :string, outputRegex: string]*/) => { /* void */
    let items = store.get(the_key);
    items.push(JSON.stringify(regex_tuple));
    store.set(the_key, items);
};

const remove = (regex_tuple /* [inputRegex :string, outputRegex: string]*/) => { /* void */
    let saved_set = new Set(store.get(the_key));
    saved_set.delete(JSON.stringify(regex_tuple));
    store.set(the_key, [...saved_set]);
};

const has = (regex_tuple /* [inputRegex :string, outputRegex: string]*/) => { /* bool */
    let saved_set = new Set(store.get(the_key));
    if (saved_set.has(JSON.stringify(regex_tuple))) {
        return true;
    } else {
        return false;
    }
}

const dequeue = () => {
    let saved_list = store.get();
    let dequeued = saved_list[0];
    store.set(saved_list.splice(1));

    return JSON.parse(dequeued);
}

const clear = () => { /* void */
    store.set(the_key, []);
}

module.exports = {
    get: get,
    push: push,
    remove: remove,
    has: has,
    dequeue: dequeue,
    clear: clear
}