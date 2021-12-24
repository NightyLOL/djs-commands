const Discord = require("discord.js");
const { TextCommand, SlashCommand } = require("./command.js");
const Event = require("./event.js");
const fs = require("fs");

class Client extends Discord.Client {
	constructor(obj, config) {
		super(obj);

		/**
     * @type {Discord.Collection<string, Command>}
     */
		this.commands = new Discord.Collection();

		this.botConfig = config.botConfig;
		this.testConfig = config.testConfig;
	}
	
	start(token, log, reqPath) {
		log("Bot is starting up");
		const cmdDir = this.botConfig.commandDir;
    const commandFiles = fs.readdirSync(cmdDir)
		  .filter(file => file.endsWith(".js"));

		/**
     * @type {TextCommand[]}
     */
		const allCommands = commandFiles.map(file => require(`${reqPath.cmd}/${file}`));

		for (let i = 0; i < allCommands.length; i++) {
			log("Registered Command: " + allCommands[i].name);
			this.commands.set(allCommands[i].name, allCommands[i]);
		}

		/**
     * @type {SlashCommand[]}
     */
		const slashCommands = allCommands
			.filter(cmd => cmd.type === "SLASH_COMMAND")
			.map(cmd => ({
				name: cmd.name,
				description: cmd.description,
				permissions: cmd.requires.permissions,
				options: cmd.appCommandOptions,
		    defaultPermission: cmd.defaultPerm
			}));

	  this.removeAllListeners();

		this.on("ready", async () => {
			const cmds = await this.application.commands.set(slashCommands);

			for (let index = 0; index < cmds.length; index++) {
				log("Registered Slash Command: " + cmds[index].name);
			}
		});

		const allEventFiles = fs.readdirSync(this.botConfig.eventDir)
			.filter(file => file.endsWith(".js"));

		for (let i = 0; i < allEventFiles.length; i++) {
			/**
       * @type {Event}
       */
			const events = require(`${reqPath.event}/${allEventFiles[i]}`);
			
			log("Registered event: " + events.event);
			this.on(events.event, events.run.bind(null, this));
		}

		this.login(token);
	}
}

module.exports = Client;