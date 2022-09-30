import { Message, EmbedBuilder } from 'discord.js';
import Users from '../models/user.model';

export const config = {
    name: 'info',
    description: 'Show bot information',
};

export const run = async (command: string, msg: Message, args: string[]) => {
    const userInfo = await Users.findOne({
        where: {
            id: msg.author.id,
        },
    });
    const embed = new EmbedBuilder();

    if (userInfo) {
        embed
            .setColor(0xffd480)
            .setThumbnail(msg.author.avatarURL())
            .addFields(
                { name: '닉네임', value: userInfo.name },
                { name: 'TTC', value: String(userInfo.ttc) }
            )
            .setFooter({
                text: 'Made by PleBea',
                iconURL: 'https://avatars.githubusercontent.com/u/47373132?v=4',
            });
    } else {
        embed
            .setColor(0xff0000)
            .setTitle('등록되지 않은 사용자입니다.')
            .setDescription('!register 명령어를 사용해주세요.');
    }
    msg.channel.send({ embeds: [embed] });
};
