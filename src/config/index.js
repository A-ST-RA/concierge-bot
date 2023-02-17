import { config } from 'dotenv';

config();

const AppConfig = {
  botToken: process.env.BOT_API_TOKEN,
  chatId: process.env.CHAT_ID
};

export default AppConfig;