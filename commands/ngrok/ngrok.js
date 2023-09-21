const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ngrok = require("@ngrok/ngrok");
const { authToken } = require('./token.json');
const { tunnels } = require('./tunnels.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ngrok')
		.setDescription('Starts a ngrok server'),
	async execute(interaction) {
        await ngrok.authtoken(authToken);
        const url = await ngrok.connect( tunnels.minecraft.config );

        const tunnelEmbed = new EmbedBuilder()
            .setColor("Green")
            .setTitle(tunnels.minecraft.name)
            .setDescription(tunnels.minecraft.description)
            .addFields( { name:"IP address:", value: url } )
        
		await interaction.reply( { embeds:[tunnelEmbed] } );
	},
};