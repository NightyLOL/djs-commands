const Discord = require("discord.js");
const Client = require("./index.js");

/**
 * @param {Discord.Message | Discord.CommandInteraction} message - A Discord message
 * @param {string[]} args - Arguments for the commands
 * @param {Client} client - A client
 */
function RunFunction(message, args, client) {}

class TextCommand {
	/**
   * @typedef {{name: string, description: string, requires: Object, run: RunFunction}} CommandOptions
	 * @param {CommandOptions} options
   */
	constructor(options) {
		this.name = options.name;
		this.description = options.description;
		this.type = "TEXT_COMMAND";
		this.requires = options.requires;
		this.run = options.run;
	}
}

class SlashCommand {
	/**
   * @typedef {{name: string, description: string, requires: Object, appCommandOptions: Discord.ApplicationCommandOption[], run: RunFunction}} SlashCommandOptions
	 * @param {SlashCommandOptions} options
   */
	constructor(options) {
		this.name = options.name;
		this.description = options.description;
		this.type = "SLASH_COMMAND";
		this.requires = options.requires;
		this.defaultPerm = options.defaultPerm || true;
		this.appCommandOptions = options.appCommandOptions;
		this.run = options.run;
	}
}

module.exports = {
	TextCommand,
	SlashCommand
}