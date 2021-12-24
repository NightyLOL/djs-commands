// This is Ferotiq's command/event handler but it 
// has a few tweaks and it's an npm package.
// Ferotiq's youtube channel: https://youtube.com/c/Ferotiq

const Client = require("./client.js");
const Commands = require("./command.js");
const Event = require("./event.js");

module.exports = {
	Client,
	Commands,
	Event
}