import { EmbedBuilder, Message } from 'discord.js';
import Users from '../models/user.model';

export const config = {
    name: 'nick',
    description: 'Change nickname',
};

export const run = async (command: string, msg: Message, args: string[]) => {
    if (args.length === 0) {
        const embed = new EmbedBuilder()
            .setTitle('닉네임을 입력해주세요.')
            .setColor(0xff0000);

        msg.channel.send({ embeds: [embed] });
    } else {
        await Users.update(
            {
                name: args[0],
            },
            {
                where: {
                    id: msg.author.id,
                },
            }
        );

        const embed = new EmbedBuilder()
            .setTitle('닉네임이 성공적으로 변경되었어요!')
            .setColor(0x33cc33);

        msg.channel.send({ embeds: [embed] });
    }
};
