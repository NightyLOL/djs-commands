// This is Ferotiq's command handler but it 
// has a few tweaks and it's an npm package.

const Client = require("./client.js");
const Commands = require("./command.js");
const Event = require("./event.js");

module.exports = {
	Client,
	Commands,
	Event
}