import { client } from './client';
import { sequelize } from './models';

const dotenv = require('dotenv');
dotenv.config();

client.on('ready', async () => {
    try {
        console.log(`Logged in as ${client.user.tag}!`);
        await sequelize
            .sync()
            .then(async () => {
                console.log('Database synced');
            })
            .catch((error) => {
                console.error(error);
            });
    } catch (error) {
        console.error(error);
    }
});

client.login(process.env.TOKEN);
