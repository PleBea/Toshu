import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { executeCommand } from './commands';
import { Command } from './types/ex';

const prefix = process.env.PREFIX || '!';

export const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
    ],
});

client.on('messageCreate', async (msg) => {
    if (msg.content.startsWith(prefix)) {
        const args = msg.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();
        executeCommand(command, msg, args);
    } else {
        return;
    }
});

export const commands = new Collection<string, Command>();
