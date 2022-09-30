import { EmbedBuilder, Message } from 'discord.js';
import { DateTime } from 'luxon';

export const config = {
    name: 'ping',
    description: 'Ping!',
};

export const run = (command: string, msg: Message, args: string[]) => {
    const embed = new EmbedBuilder()
        .setTitle('Pong!  🏓')
        .setColor(0x33cc33)
        .setDescription(
            `${DateTime.now().minus(msg.createdTimestamp).millisecond} ms`
        );

    msg.channel.send({ embeds: [embed] });
};
