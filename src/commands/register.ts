import { EmbedBuilder, Message } from 'discord.js';
import Users from '../models/user.model';

export const config = {
    name: 'register',
    description: 'Register a new user',
};

export const run = async (command: string, msg: Message, args: string[]) => {
    Users.findOne({
        where: {
            id: msg.author.id,
        },
    }).then((user) => {
        const embed = new EmbedBuilder();
        if (user) {
            embed.setColor(0xff0000).setTitle('이미 등록된 사용자입니다.');
        } else {
            Users.create({
                id: msg.author.id,
                name: msg.author.username,
            });
            embed.setColor(0x33cc33).setTitle('성공적으로 등록되었어요!');
        }
        msg.channel.send({ embeds: [embed] });
    });
};
