//start
console.log("[HACKERBOT] starting rpc...\n");

//config
const config = require('./config.json');

//rpc
const rpc = require('discord-rpc');
rpc.register(config.clientId);
const clientRPC = new rpc.Client({transport: 'ipc'});

clientRPC.on('ready', async () => {
	if (clientRPC) {
		clientRPC.setActivity({
			details: "Coding HackerBot, open for beta testing!",
			state: '<- Add the bot or join the discord server ->',
				largeImageKey: "hackerbot-logo",
				largeImageText: "HACKERBOT",
			buttons: [
				{
					label: "ADD BOT",
					url: "https://discord.com/api/oauth2/authorize?client_id=1105051504341168168&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.gg%2F29Zsaymbum&response_type=code&scope=bot%20rpc"
				},
				{
					label: "JOIN SERVER",
					url: "https://discord.gg/29Zsaymbum"
				}
			]
		});
	}
	console.log(`\n[HACKERBOT] RPC READY!\n`);
});

// Log in to Discord with your client's token
clientRPC.login({ clientId: config.clientId });
