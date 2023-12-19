const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

/*
  { //the darkweb
    "item1": 5 //amount
    "item2": 12 //amount
  }

*/


module.exports = {
  cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('darkweb')
    .setDescription('=¤&#- T63 d4rkw36 -#&¤=')
    .addSubcommand(subcommand =>
  		subcommand
  			.setName('buy')
  			.setDescription('buy from the darkweb')
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('sell')
        .setDescription('sell items to the darkweb')
    )
  	.addSubcommand(subcommand =>
  		subcommand
  			.setName('inv')
  			.setDescription('view your inventory')
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('help')
        .setDescription('=¤&#- T63 d4rkw36 -#&¤=')
    ),
	async execute(interaction) {
    const target = interaction.options.getUser('user');
    if(interaction.options.getSubcommand() == 'analyze') {
      await interaction.deferReply({ ephemeral: true });
      let counter = 0;
      let interval = setInterval(() => {
        interaction.editReply('Analyzing: '+ progressBar(counter, 100, 30) ); // todo: make this look better lol
        if (counter == 100) {
          clearInterval(interval);
          // todo: add times up message
          interaction.editReply('server info')

        } else {
          counter += 10;
        }
      }, 750) // 1000 = 1 second
    } else if (interaction.options.getSubcommand() == 'create') {

    } else if (interaction.options.getSubcommand() == 'delete') {
      const nodes = ['1', '2', '3', '4']; //max 4

      const cancelButton = new ButtonBuilder({}).setCustomId('cancel').setLabel('cancel').setStyle(ButtonStyle.Secondary);

      const nodeRow = new ActionRowBuilder().setComponents(cancelButton);

      for (var i = 0; i < nodes.length; i++) {
        const nodeButton = new ButtonBuilder({}).setCustomId(nodes[i]).setLabel('hacknet-node '+ nodes[i]).setStyle(ButtonStyle.Danger);

        nodeRow.addComponents(nodeButton);
      }

      console.log(nodeRow);

  		const response = await interaction.reply({
  			content: 'click on a node to delete/remove it...',
  			components: [nodeRow],
  		});

      const collectorFilter = i => i.user.id === interaction.user.id;

      try {
      	const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60000 });

        if (confirmation.customId === 'cancel') {
      		await interaction.deleteReply();

      	} else if (nodes[confirmation.customId] != null) {
      		await confirmation.update({ content: `**hacker-node ${confirmation.customId}** has been deleted!`, components: [] });
      	}

      } catch (e) {

      	await interaction.editReply({ content: 'Confirmation not received within 1 minute, cancelling', components: [] });
      }

    } else if (interaction.options.getSubcommand() == 'info') {
      await interaction.reply({content: "you have 0 nodes on this server ;(", ephemeral: true });
    }
	},
};
