const axios = require('axios');

require("babel-polyfill");

const JSDOM = require('jsdom').JSDOM;

const dom = new JSDOM('');
global.document = dom.window.document;
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

axios.defaults.baseURL='http://localhost:4000/';
