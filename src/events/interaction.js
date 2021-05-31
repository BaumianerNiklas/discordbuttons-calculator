module.exports = {
	name: 'interaction',
	async execute(bot, interaction) {
		if (!interaction.isCommand()) return;

		const command = bot.slashCommands.get(interaction.commandName);
		if (!command) return;

		command.execute(interaction, bot);
	},
};
