const Discord = require("discord.js");
const { TextCommand, SlashCommand } = require("./command.js");
const Event = require("./event.js");

class Client extends Discord.Client {
	constructor(obj, config) {
		super(obj);

		/**
     * @type {Discord.Collection<string, TextCommand|SlashCommand>}
     */
		this.commands = new Discord.Collection();

		/**
     * @typedef {Object} ConfigOptions
     * @property {Object} [reqDirs] - Ways to access dirs using require from node_modules to project dir
     * @property {string} textCommandDir - Text command directory
     * @property {string} slashCommandDir - Slash command directory
     * @property {string} clientEventDir - Client event directory
     * @property {string} [prefix] - Use this to make an easily accessible bot prefix
     */

		/**
     * @type {ConfigOptions}
     */
		this.config = config;
	}

	start(token, log) {
		log("Starting up Discord bot");
		const textCommandFiles = fs.readdirSync(this.config.textCommandDir)
			.filter(file => file.endsWith(".js"));
		const slashCommandFiles = fs.readdirSync(this.config.slashCommandDir)
			.filter(file => file.endsWith(".js"));

		const txtCmdReqDir = this.config.reqDirs.txtCmd || "../../." + this.config.textCommandDir;
		const slshCmdReqDir = this.config.reqDirs.slshCmd || "../../." + this.config.slashCommandDir;

		/**
     * @type {TextCommand[]}
     */
		const textCommands = textCommandFiles.map(file => require(txtCmdReqDir + `/${file}`));

		/**
     * @type {SlashCommand[]}
     */
		const slashCommands = slashCommandFiles.map(file => require(slshCmdReqDir + `/${file}`));

		for (let i = 0; i < textCommands.length; i++) {
			this.commands.set(textCommands[i].name, textCommands[i]);
			log(`[${textCommands[i].type}] ${textCommands[i].name} registered!`);
		}
		
		for (let i = 0; i < slashCommands.length; i++) {
			this.commands.set(slashCommands[i].name, slashCommands[i]);
			log(`[${slashCommands[i].type}] ${slashCommands[i].name} registered!`);
		}
	
		const slashCmds = slashCommands.map(cmd => ({
			name: cmd.name,
			description: cmd.description,
			permissions: cmd.requires.permissions,
			options: cmd.appCommandOptions,
			defaultPermission: cmd.defaultPerm
		}));

		this.removeAllListeners();

		this.on("ready", async () => {
			const cmds = await this.application.commands.set(slashCmds);
		});

		const eventFiles = fs.readdirSync(this.config.clientEventDir)
			.filter(file => file.endsWith(".js"));

		for (let i = 0; i < eventFiles.length; i++) {
			const evntReqDir = this.config.reqDirs.evntDir || "../../." + this.config.clientEventDir;

			/**
       * @type {Event}
       */
			const events = require(evntReqDir + `/${eventFiles[i]}`);

			this.on(events.event, events.run.bind(null, this));
			log(`[EVENT] registered ${events.event}!`);
		}

		this.login(token);
	}
}

module.exports = Client;