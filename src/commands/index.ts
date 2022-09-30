import { Message } from 'discord.js';
import { commands } from '../client';
import fs from 'fs';
import path from 'path';

import type { Command } from '../types/ex';

const Filter = fs
    .readdirSync(path.join(__dirname + '/'))
    .filter((file: string) => file.endsWith('.ts'))
    .filter((file: string) => file !== 'index.ts');
Filter.forEach(async (file: string) => {
    const command = await import(path.join(__dirname + '/' + file));
    commands.set(command.config.name, command);
});

export const executeCommand = (
    command: string,
    msg: Message,
    args: string[]
) => {
    if (msg.author.bot) return;
    if (commands.get(command)) {
        const ex: Command = commands.get(command);
        if (ex) {
            ex.run(command, msg, args);
        }
    }
};
