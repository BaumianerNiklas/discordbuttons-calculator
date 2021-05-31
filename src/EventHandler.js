const { readdirSync } = require('fs');
const { join } = require('path');

module.exports = async bot => {
	const eventFiles = readdirSync(join(process.env.BASE_PATH, 'events')).filter(f => f.endsWith('js'));
	for (const eventFile of eventFiles) {
		const event = require(`./events/${eventFile}`);

		bot.on(event.name, (...args) => event.execute(bot, ...args));
	}
};
