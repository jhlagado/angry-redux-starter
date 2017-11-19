// load all js sources
const testsContext = require.context('./app', true, /\.js$/);
testsContext.keys().forEach(testsContext);
