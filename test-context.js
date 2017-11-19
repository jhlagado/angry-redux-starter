require('babel-polyfill');
// require("angular");
// require("angular-mocks");
// require('./src/app/components/auth/auth.module.js');

const context = require.context('./src', true, /.spec\.js$/);
context.keys().forEach(context);
