import { Telegraf } from 'telegraf';
import { Markup } from 'telegraf';
import AppConfig from './config';
import { CronJob } from 'cron';

let users = [];

const bot = new Telegraf(AppConfig.botToken);
bot.start(
	(ctx) => 
		ctx.reply(
			'Keyboard sended',
			Markup.keyboard(
				[
					Markup.button.callback('Check', 'check_it')
				]
			).resize()
		)
);

bot.hears('Check', ({ message: { from: { username }}}) => {
	users.push(username);
})

const notifyCronFunc = (id) => async() => {
	console.log('notifyCronFunc', id);
	const chatData = await bot.telegram.getChat(+AppConfig.chatId);
	
	if (users.length === 0) {
		bot
			.telegram
			.sendMessage(
				chatData.id,
				AppConfig.notifyMessage,
			);
	}
		
	users = [];
	}

const job = new CronJob(AppConfig.timeAtStart,
	notifyCronFunc(1),
	null,
	true,
	'UTC+3'
);

const job1 = new CronJob(AppConfig.timeAtEnd,
	notifyCronFunc(2),
	null,
	true,
	'UTC+3'
);

job.start();
job1.start();

bot.launch();
