import { Message } from 'discord.js';

const client = require('../client');
const fs = require('fs');
const path = require('path');

const Filter = fs
    .readdirSync(path.join(__dirname + '/'))
    .filter((file: string) => file.endsWith('.js'))
    .filter((file: string) => file !== 'index.js');
Filter.forEach((file: any) => {
    const command = require(`./${file}`);
    client.commands.set(command.config.name, command);
});

export const executeCommand = (
    command: string,
    msg: Message,
    args: string[]
) => {
    if (msg.author.bot) return;
    if (client.commands.get(command)) {
        const ex = client.commands.get(command);
        if (ex) {
            ex.run(client, msg, args);
        }
    }
};
