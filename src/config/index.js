import { config } from 'dotenv';

config();

const AppConfig = {
  botToken: process.env.BOT_API_TOKEN,
};

export default AppConfig;