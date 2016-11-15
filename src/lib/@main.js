VeLib            = {};
VeLib.helpers    = require('./helpers');
VeLib.validation = require('./validation');
VeLib.actions 	 = require('./actions');
VeLib.configs = require('./configs');

// This is the only module with mutable state style so it's instanced, it's "Spechul"
VeLib.state = require('./state');

module.exports = VeLib
