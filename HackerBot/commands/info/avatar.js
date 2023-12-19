const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Get the avatar URL of the selected user, or your own avatar.')
		.addUserOption(option => option.setName('target').setDescription('The user\'s avatar to show')),
	category: 'utility',
	async execute(interaction) {
		const user = interaction.options.getUser('target');
		await interaction.deferReply({ ephemeral: true });

		if (user) {
			return interaction.editReply(`${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`);
		}

		return interaction.editReply(`Your avatar: ${interaction.user.displayAvatarURL()}`);
	},
};
