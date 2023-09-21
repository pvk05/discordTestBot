const { SlashCommandBuilder } = require('discord.js');
const ngrok = require("@ngrok/ngrok");
const { authToken } = require('./token.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tunnels')
		.setDescription('List all open tunnels'),
	async execute(interaction) {
        await ngrok.authtoken(authToken);
        const tunnels = await ngrok.tunnels();
        if(tunnels.length !== 0) {
            await interaction.reply(tunnels[0].metadata());
        }
		else {
            await interaction.reply('No open tunnels')
        }
	},
};