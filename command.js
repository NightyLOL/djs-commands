const Discord = require("discord.js");
const Client = require("./index.js");

/**
 * @param {Discord.Message | Discord.CommandInteraction} message - A Discord message or command interaction
 * @param {string[]} args - Arguments for the command
 * @param {Client} client - A Discord client
 */
function RunFunction(message, args, client) {}

class TextCommand {
	/**
   * @typedef {Object} TextCommandOptions
   * @property {string} name - Name of the command
   * @property {string} description - Description of the command
   * @property {Object} [requires] - Required perms and roles
   * @property {RunFunction} run - Run function for the command
	 * @param {TextCommandOptions} options
   */
	constructor(options) {
		this.name = options.name.toLowerCase();
		this.description = options.description;
		this.type = "TEXT_COMMAND";
		this.requires = options.requires || "nothing";
		this.run = options.run;
	}
}

class SlashCommand {
	/**
   * @typedef {Object} SlashCommandOptions
   * @property {string} name - Slash command name
   * @property {string} description - Slash command description
   * @property {Object} [requires] - Required perms and roles
   * @property {Discord.ApplicationCommandOption[]} appCommandOptions - Command options
   * @property {boolean} [defaultPerm] - Default perms
   * @property {RunFunction} run - Run function for the command
	 * @param {SlashCommandOptions} options
   */
	constructor(options) {
		this.name = options.name.toLowerCase();
		this.description = options.description;
		this.type = "SLASH_COMMAND";
		this.requires = options.requires || [];
		this.defaultPerm = options.defaultPerm || true;
		this.appCommandOptions = options.appCommandOptions;
		this.run = options.run;
	}
}

module.exports = {
	TextCommand,
	SlashCommand
}