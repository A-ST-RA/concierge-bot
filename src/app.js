import { Telegraf } from 'telegraf';
import { Markup } from 'telegraf';
import AppConfig from './config';

const bot = new Telegraf(AppConfig.botToken);
bot.hears('test', (ctx) => ctx.reply('test success'));
bot.start(
	(ctx) => 
		ctx.reply(
			'Keyboard sended',
			MarkupgreetingData.keyboard(
				[
					Markup.button.callback('Check', 'check_it')
				]
			).resize()
		)
);

bot.hears('Check', (ctx) => {console.log(ctx)})

bot.launch();
