const { MessageActionRow, MessageButton } = require('discord.js');
const { evaluate } = require('mathjs');

module.exports = {
	name: 'calculator',
  	description: 'Bring up a calculator using Buttons!',
	async execute(bot, int) {
		let data = '';
		let content = '';

		const components = generateComponents();

		int.reply({ content: '```fix\n ```', components });
		const message = await int.fetchReply();

		const filter = (compInt) => compInt.member.id === int.member.id;
		const collector = message.createMessageComponentInteractionCollector(filter, { time: 10e3 });

		collector.on('collect', (compInt) => {
		const value = compInt.customID;
     	 // Adding a prefix like "calculator_" isn't necessary anymore as these listeners are only scoped to this file.

		switch (value) {
			case 'clear':
				data = '';
				content = '```fix\n ```';
				break;
			case '=':
				try {
					const res = evaluate(data);
					content = `\`\`\`fix\n${data}\n= ${res}\`\`\``;
					data = res + '';
				} catch (e) {
					console.error(e);
					content = 'Something went wrong while trying to evaluate this expression.';
					data = '';
				}
					break;
			default:
				data += value;
				content = '```fix\n' + data + '```';
				break;
			}

			collector.resetTimer();
			compInt.update({ content, components });
		});
		collector.on('end', (collected) => {
			message.edit({
				content: content + `*This session has timed out. You can start a new one with \`/calculator\`.*`,
			});
		});
	}
}

const generateComponents = () => {
	const row1 = new MessageActionRow().addComponents(
		new MessageButton().setCustomID('clear').setLabel('C').setStyle('DANGER'),
		new MessageButton().setCustomID('(').setLabel('(').setStyle('PRIMARY'),
		new MessageButton().setCustomID(')').setLabel(')').setStyle('PRIMARY'),
		new MessageButton().setCustomID('^').setLabel('^').setStyle('PRIMARY')
	);
	const row2 = new MessageActionRow().addComponents(
		new MessageButton().setCustomID('7').setLabel('7').setStyle('SECONDARY'),
		new MessageButton().setCustomID('8').setLabel('8').setStyle('SECONDARY'),
		new MessageButton().setCustomID('9').setLabel('9').setStyle('SECONDARY'),
		new MessageButton().setCustomID('/').setLabel('/').setStyle('PRIMARY')
	);
	const row3 = new MessageActionRow().addComponents(
		new MessageButton().setCustomID('4').setLabel('4').setStyle('SECONDARY'),
		new MessageButton().setCustomID('5').setLabel('5').setStyle('SECONDARY'),
		new MessageButton().setCustomID('6').setLabel('6').setStyle('SECONDARY'),
		new MessageButton().setCustomID('*').setLabel('*').setStyle('PRIMARY')
	);
	const row4 = new MessageActionRow().addComponents(
		new MessageButton().setCustomID('1').setLabel('1').setStyle('SECONDARY'),
		new MessageButton().setCustomID('2').setLabel('2').setStyle('SECONDARY'),
		new MessageButton().setCustomID('3').setLabel('3').setStyle('SECONDARY'),
		new MessageButton().setCustomID('-').setLabel('-').setStyle('PRIMARY')
	);
	const row5 = new MessageActionRow().addComponents(
		new MessageButton().setCustomID('0').setLabel('0').setStyle('SECONDARY'),
		new MessageButton().setCustomID('.').setLabel('.').setStyle('SECONDARY'),
		new MessageButton().setCustomID('=').setLabel('=').setStyle('SUCCESS'),
		new MessageButton().setCustomID('+').setLabel('+').setStyle('PRIMARY')
	);
	return [row1, row2, row3, row4, row5];
};
