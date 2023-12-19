const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  cooldown: 12*60*60,
	data: new SlashCommandBuilder()
		.setName('hack')
		.setDescription('Steal someone\'s money')
    .addUserOption(option =>
  		option
        .setName('user')
  			.setDescription('who do you want to hack?')
        .setRequired(true)
    ),
	async execute(interaction) {
    const target = interaction.options.getUser('user');

    const replyEmbed = new EmbedBuilder()
  	 .setTimestamp();

    await interaction.deferReply({ephemeral: true});
    let counter = 0;

    if (true && isRegistered(true) == true/*target*/) {
      let interval = setInterval(() => {
        interaction.editReply('Hacking **'+ target.tag +'**: '+ progressBar(counter, 100, 30) ); // todo: make this look better lol
        if (counter == 100) {
          clearInterval(interval);
          // todo: add times up message
          replyEmbed
            .setColor('Green')
            .setDescription('added **`'+'coins`** to your balance')
            .setTitle('=¤&#- Successfully hacked **'+ target.tag +'** -#&¤=');
          interaction.editReply({ content: "", embeds: [replyEmbed] });
        } else {
          counter += 2;
        }
      }, 200)
    } else {
      let interval = setInterval(() => {
        interaction.editReply('Hacking **'+ target.tag +'**: '+ progressBar(counter, 100, 30) ); // todo: make this look better lol
        if (counter >= Math.round(Math.random() * (86 - 30) + 30)) {
          clearInterval(interval);
          // todo: add times up message
          replyEmbed
            .setColor('Red')
            .setDescription('you lost **`'+'coins`** from your balance')
            .setTitle('=¤&#- Failed to hack **'+ target.tag +'** -#&¤=');
          interaction.editReply({ content: "", embeds: [replyEmbed] });
        } else {
          counter += 5;
        }
      }, 250)
    }
  },
};
