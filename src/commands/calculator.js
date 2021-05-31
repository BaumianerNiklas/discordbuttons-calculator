const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');
const { evaluate } = require('mathjs');

module.exports = {
	name: 'calculator',
	description: 'A somewhat functioning calculator using Discord Message Buttons.',
	async execute(int, bot) {
		let data = readFileSync(join(process.env.BASE_PATH, 'commands/calculatordata.txt')).toString();
		console.log(data);
		let content = data.length > 0 ? data : 'Calculator';
		await bot.api.interactions(int.id, int.token).callback.post({
			data: {
				type: 4,
				data: {
					content: content,
					components: components,
				},
			},
		});
	},
	async onButtonClick(int, bot) {
		const value = int.data.custom_id.split('_')[1];
		let data = readFileSync(join(process.env.BASE_PATH, 'commands/calculatordata.txt')).toString();
		let content;
		if (value === '=' && data) {
			try {
				const result = evaluate(data);
				content = `${data} = **${result}**`;
				data = result + '';
			} catch (e) {
				console.error(e);
				bot.api.interactions(int.id, int.token).callback.post({
					data: {
						type: 7,
						data: {
							content: 'Something went wrong evaluating. You probably supplied an invalid expression.',
							components,
						},
					},
				});
			}
		} else {
			data += value;
			content = data;
		}

		if (value === 'clear') {
			content = ' ';
			data = '';
		}

		await writeFileSync(join(process.env.BASE_PATH, 'commands/calculatordata.txt'), data);
		bot.api.interactions(int.id, int.token).callback.post({
			data: {
				type: 7,
				data: {
					content,
					components,
				},
			},
		});
		bot.api.interactions;
	},
	options: [],
	example: [''],
};

const components = [
	{
		type: 1,
		components: [
			{
				type: 2,
				label: 'Clear',
				style: 4,
				custom_id: 'calculator_clear',
			},
			{
				type: 2,
				label: '(',
				style: 1,
				custom_id: 'calculator_(',
			},
			{
				type: 2,
				label: ')',
				style: 1,
				custom_id: 'calculator_)',
			},
			{
				type: 2,
				label: '^',
				style: 1,
				custom_id: 'calculator_^',
			},
		],
	},
	{
		type: 1,
		components: [
			{
				type: 2,
				label: '7',
				style: 2,
				custom_id: 'calculator_7',
			},
			{
				type: 2,
				label: '8',
				style: 2,
				custom_id: 'calculator_8',
			},
			{
				type: 2,
				label: '9',
				style: 2,
				custom_id: 'calculator_9',
			},
			{
				type: 2,
				label: '/',
				style: 1,
				custom_id: 'calculator_/',
			},
		],
	},
	{
		type: 1,
		components: [
			{
				type: 2,
				label: '4',
				style: 2,
				custom_id: 'calculator_4',
			},
			{
				type: 2,
				label: '5',
				style: 2,
				custom_id: 'calculator_5',
			},
			{
				type: 2,
				label: '6',
				style: 2,
				custom_id: 'calculator_6',
			},
			{
				type: 2,
				label: '*',
				style: 1,
				custom_id: 'calculator_*',
			},
		],
	},
	{
		type: 1,
		components: [
			{
				type: 2,
				label: '1',
				style: 2,
				custom_id: 'calculator_1',
			},
			{
				type: 2,
				label: '2',
				style: 2,
				custom_id: 'calculator_2',
			},
			{
				type: 2,
				label: '3',
				style: 2,
				custom_id: 'calculator_3',
			},
			{
				type: 2,
				label: '-',
				style: 1,
				custom_id: 'calculator_-',
			},
		],
	},
	{
		type: 1,
		components: [
			{
				type: 2,
				label: '0',
				style: 2,
				custom_id: 'calculator_0',
			},
			{
				type: 2,
				label: '.',
				style: 2,
				custom_id: 'calculator_.',
			},
			{
				type: 2,
				label: '=',
				style: 3,
				custom_id: 'calculator_=',
			},
			{
				type: 2,
				label: '+',
				style: 1,
				custom_id: 'calculator_+',
			},
		],
	},
];
