const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  cooldown: 24*60*60,
	data: new SlashCommandBuilder()
		.setName('work')
		.setDescription('hard earned cash, with taxation :)')
    .addStringOption(option =>
  		option
        .setName('time')
  			.setDescription('how much you wanna work? *in seconds*')
        .setRequired(true)
    ),
	async execute(interaction) {

    const user = await interaction.guild.members.fetch(interaction.user.id);
		const time = interaction.options.getString('time');

    const replyEmbed = new EmbedBuilder()
  	 .setTimestamp()
     .setColor('Green')
     .setDescription('added **`'+'coins`** to your balance')
     .setTitle('You worked **'+ time +'seconds**');

		await interaction.deferReply({ephemeral: true});
    let counter = 0;
    let interval = setInterval(() => {
      interaction.editReply('Working `'+ time +' seconds`: '+ progressBar(counter, 100, 30) ); // todo: make this look better lol
      if (counter == 100) {
        clearInterval(interval);
        // todo: add times up message
        interaction.editReply({ content: "", embeds: [replyEmbed] });
      } else {
        counter += 10;
      }
    }, (time / 10 * 1000)) // 1000 = 1 second
	},
};
