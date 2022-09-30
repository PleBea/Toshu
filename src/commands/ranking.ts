import { Message, EmbedBuilder } from 'discord.js';
import Users from '../models/user.model';

export const config = {
    name: 'ranking',
    description: 'Show ranking',
};

async function getRanking(ranking: number) {
    return await Users.findAll({
        attributes: ['name'],
        where: {
            ranking,
        },
    }).then((users) =>
        users.length ? users.map((x) => x.name) : ['아직 등록되지 않았습니다.']
    );
}

export const run = async (command: string, msg: Message, args: string[]) => {
    if (args.length === 0) {
        const embed = new EmbedBuilder()
            .setTitle('🏆 랭킹')
            .setDescription('랭킹을 확인할 수 있습니다.')
            .setColor(0xffd480)
            .addFields(
                { name: '🥇 1부', value: `${await getRanking(1)}` },
                { name: '🥈 1부', value: `${await getRanking(2)}` },
                { name: '🥉 3부', value: `${await getRanking(3)}` }
            );

        msg.channel.send({ embeds: [embed] });
    } else if (args[0] === 'set') {
        if (msg.author.id === process.env.ADMIN_ID) {
            if (args.length < 3) {
                const embed = new EmbedBuilder()
                    .setTitle('랭킹을 설정할 수 없습니다.')
                    .setDescription('Usage: !ranking set <userId> <ranking>')
                    .setColor(0xff0000);

                msg.channel.send({ embeds: [embed] });
            } else {
                const embed = new EmbedBuilder();
                const user = await Users.findOne({
                    where: {
                        id: args[1],
                    },
                });
                if (user) {
                    await Users.update(
                        {
                            ranking: args[2],
                        },
                        {
                            where: {
                                id: user.id,
                            },
                        }
                    );
                    embed
                        .setTitle('랭킹이 성공적으로 설정되었어요!')
                        .setColor(0x33cc33);
                } else {
                    embed
                        .setTitle('랭킹을 설정할 수 없습니다.')
                        .setDescription('유저를 찾을 수 없습니다.')
                        .setColor(0xff0000);
                }

                msg.channel.send({ embeds: [embed] });
            }
        } else {
            const embed = new EmbedBuilder()
                .setTitle('랭킹을 설정할 수 없습니다.')
                .setDescription('관리자만 사용할 수 있습니다.')
                .setColor(0xff0000);

            msg.channel.send({ embeds: [embed] });
        }
    }
};
