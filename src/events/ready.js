const registerCommands = require('../registerCommands');

module.exports = {
	name: 'ready',
	async execute(bot) {
		console.log('Bot is ready');
		registerCommands(bot);
	},
};
