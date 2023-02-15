import { Telegraf } from 'telegraf';
import AppConfig from './config';

const bot = new Telegraf(AppConfig.botToken);
bot.hears('test', (ctx) => ctx.reply('test success'));

bot.launch();