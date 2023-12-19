const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  cooldown: 60,
	data: new SlashCommandBuilder()
		.setName('pay')
		.setDescription('Send someone money')
    .addUserOption(option =>
  		option
        .setName('user')
  			.setDescription('who do you want to pay?')
        .setRequired(true)
    )
    .addStringOption(option =>
  		option
        .setName('amount')
  			.setDescription('how much you wanna give?')
        .setRequired(true)
    ),
	async execute(interaction) {

    const target = interaction.options.getUser('user');
		const amount = interaction.options.getString('amount');

		await interaction.deferReply({ephemeral: true});
    let counter = 0;
    let interval = setInterval(() => {
      interaction.editReply('Sending coins: '+ progressBar(counter, 100, 30) ); // todo: make this look better lol
      if (counter == 100) {
        clearInterval(interval);
        // todo: add times up message
        interaction.editReply('sent: **`'+ amount +'AstroCoins`** to **'+ target.tag +'**\n');
      } else {
        counter += 10;
      }
    }, 750) // 1000 = 1 second
	},
};
