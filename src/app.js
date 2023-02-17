import { Telegraf } from 'telegraf';
import { Markup } from 'telegraf';
import AppConfig from './config';
import { CronJob } from 'cron';
import difference from 'lodash/difference';

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
	const chatData = await bot.telegram.getChat(AppConfig.chatId);
	const activeUsernames = chatData.active_usernames.map(el => el);
	
	const differenceOfNotCheckedUser = difference(activeUsernames, users).map(el => `@${el}`);
	
	console.log(differenceOfNotCheckedUser);
	
	if (differenceOfNotCheckedUser.length !== 0) {
		bot
			.telegram
			.sendMessage(
				chatData.id,
				`Внимание!!! Эти пользователи не отметились\n ${differenceOfNotCheckedUser.join('\n')}`
			);
	}
		
	users = [];
	}

const job = new CronJob('0 0 07 * * 1-5',
	notifyCronFunc(1),
	null,
	true,
	'UTC+3'
);

const job1 = new CronJob('0 */30 19 * * 1-5',
	notifyCronFunc(2),
	null,
	true,
	'UTC+3'
);

job.start();
job1.start();

bot.launch();
