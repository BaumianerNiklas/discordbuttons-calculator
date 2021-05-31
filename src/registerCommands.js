const { readdirSync } = require('fs');
const { join } = require('path');

module.exports = async (bot) => {
	const guild = bot.guilds.cache.get('123456789012345678'); // Replace with a valid guild id
	// This is using guild-only slash commands because they update instantly while global slash commands take 1 hour to update

	const commandFiles = readdirSync(join(process.env.BASE_PATH, 'commands')).filter((f) => f.endsWith('.js'));
	const existingCommands = await bot.guilds.cache.get(guildID)?.commands.fetch();

	console.log(`Handling Commands. On disk: ${commandFiles.length} | On discord API: ${existingCommands.size}`);

	for (const file of commandFiles) {
		const command = require(`./commands/${file}`);

		if (!command.options) command.options = [];
		if (!command.defaultPermission) command.defaultPermission = true;

		bot.slashCommands.set(command.name, command);

		if (!existingCommands.find((c) => c.name === command.name)) {
			bot.guilds.cache.get(guildID)?.commands.create({
				name: command.name,
				description: command.description,
				options: command.options,
				defaultPermission: command.defaultPermission,
			});
			console.log(`Created ${command.name} - wasn't found on Discord API.`);
		}
	}

	for (const existingCommand of existingCommands) {
		if (bot.slashCommands.has(existingCommand[1].name)) {
			const command = bot.slashCommands.get(existingCommand[1].name);

			const exCmd = JSON.parse(JSON.stringify(existingCommand[1]));
			const newCmd = JSON.parse(JSON.stringify(command));

			const hasSameDescription = newCmd.description === exCmd.description;
			const hasSameOptions = JSON.stringify(newCmd.options) === JSON.stringify(exCmd.options);
			const hasSameDefaultPermission = newCmd.defaultPermission === exCmd.defaultPermission;

			// if (command.name === 'purge') {
			// 	console.log(hasSameDescription, hasSameDefaultPermission, hasSameOptions);
			// 	console.log(...newCmd.options);
			// 	console.log(...exCmd.options);
			// }

			if (hasSameDescription && hasSameOptions && hasSameDefaultPermission) {
				console.log(`Skipped ${command.name} - command hasn't changed.`);
			} else {
				const id = guild.commands.cache.find((c) => c.name === command.name).id;
				guild.commands.edit(id, command);

				console.log(`Edited ${command.name}.`);
			}
		} else {
			bot.guilds.cache.get(guildID)?.commands.delete(existingCommand[0]);
			console.log(`Deleted ${existingCommand[1].name} - wasn't found on disk.`);
		}
	}
};
