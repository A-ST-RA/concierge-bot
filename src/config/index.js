import { config } from 'dotenv';

config();

const AppConfig = {
  botToken: process.env.BOT_API_TOKEN,
  chatId: process.env.CHAT_ID,
  timeAtStart: process.env.TIME_AT_START,
  timeAtEnd: process.env.TIME_AT_STOP,
  notifyMessage: process.env.NOTIFY_MESSAGE,
};

export default AppConfig;