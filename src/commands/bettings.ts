import { Message } from 'discord.js';

export const config = {
    name: 'bettings',
    description: 'Show bettings',
};

export const run = async (command: string, msg: Message, args: string[]) => {
    msg.reply('Developing...');
};
