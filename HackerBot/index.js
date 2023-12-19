//start
console.log("[HACKERBOT] starting...\n");

// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { REST, Routes, Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const config = require('./config.json');

//client
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
});
client.cooldowns = new Collection();

//globals
global.progressBar = (value, maxValue, size) => {
  const percentage = value / maxValue; // Calculate the percentage of the bar
  const progress = Math.round((size * percentage)); // Calculate the number of square caracters to fill the progress side.
  const emptyProgress = size - progress; // Calculate the number of dash caracters to fill the empty progress side.

  const progressText = '/'.repeat(progress); // Repeat is creating a string with progress * caracters in it
  const emptyProgressText = '—'.repeat(emptyProgress); // Repeat is creating a string with empty progress * caracters in it
  const percentageText = Math.round(percentage * 100) + '%'; // Displaying the percentage of the bar

  const bar = '```[' + progressText + emptyProgressText + '] ' + percentageText + '```'; // Creating the bar
  return bar;
};

global.isRegistered = (userId) => {
	if(userId == true) {
		return true;
	} else {
		return false;
	}
};

//commands
client.commands = new Collection();
const commands = [];

// Grab all the commands directories
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	// Grab all the command files from the commands directories
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);

		if (!('data' in command)) {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" property.`);
			break;
		}

		if (!('execute' in command)) {
			console.log(`[WARNING] The command at ${filePath} is missing a required "execute" property.`);
			break;
		}

		commands.push(command.data.toJSON());
		client.commands.set(command.data.name, command);
	}
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(config.token);

// and deploy commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
    	Routes.applicationCommands(config.clientId),
    	{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();

//commands event INTERACTION
client.on(Events.InteractionCreate, async interaction => {

	if (interaction.isChatInputCommand()) {
		if (isRegistered(true) == false) {
			return interaction.reply({content:"use `/register` to use **HackerBot**...", ephemeral: true});
		}

		const command = client.commands.get(interaction.commandName);

		if (!command) return;

		const { cooldowns } = client;

		if (!cooldowns.has(command.data.name)) {
			cooldowns.set(command.data.name, new Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.data.name);

		const defaultCooldownDuration = 3;
		const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;



		if (timestamps.has(interaction.user.id)) {
			const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

			if (now < expirationTime) {
				const expiredTimestamp = Math.round(expirationTime / 1000);
				return interaction.reply({ content: `Please wait, you are on a cooldown for **\`${command.data.name}\`**. You can use it again <t:${expiredTimestamp}:R>.`, ephemeral: true });
			}
		}

		timestamps.set(interaction.user.id, now);
		setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	client.user.setActivity('Gathering your data...');
	console.log(`\n[HACKERBOT] READY! Logged in as ${c.user.tag}\n`);
});

// Log in to Discord with your client's token
client.login(config.token);
