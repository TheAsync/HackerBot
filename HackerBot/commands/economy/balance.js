const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription('hard earned cash will be shown ;)'),

  async execute(interaction) {

    await interaction.deferReply({ ephemeral: true });
    interaction.editReply({
        content: "",
        embeds: [
          new EmbedBuilder()
            .setTimestamp()
            .setColor('Green')
            .setDescription('You have **' + ' coins**')
            .setTitle('Your Balance')
        ]
    });
	},
};
