const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  cooldown: 0,
  data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription('hard earned cash will be shown ;)'),

  async execute(interaction) {
    if (isRegistered(interaction.user.id)) {
      interaction.reply("You are already registered!");
    } else {
      registerUser(interaction.user);
      interaction.reply("You Successfully registered!");
    }

    interaction.user.send("Thanks for registering with HACKERBOT !!!");
	},
};
