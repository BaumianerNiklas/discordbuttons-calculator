const { Client, Intents, Collection } = require('discord.js');
const registerEvents = require('./EventHandler.js');
require('dotenv').config();

const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

bot.slashCommands = new Collection();
registerEvents(bot);

bot.ws.on('INTERACTION_CREATE', async (interaction) => {
	if (interaction.type !== 3) return;
	const command = interaction.data.custom_id.split('_')[0];
	bot.slashCommands.get(command).onButtonClick(interaction, bot);
});

bot.login(process.env.BOT_TOKEN);
