const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')

const token = '7286954847:AAENSpfDUGAU7Vwsr0-mNZpob6Of7RVbWRs'

const bot = new TelegramApi(token, {polling: true})

const chats = {}

// Logic of generate a random number by bot
const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `Now I will guess a number from 0 to 9, and you have to guess it`);
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Guess', gameOptions)
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Opening greeting'},
        {command: '/info', description: 'Get info about user'},
        {command: '/game', description: 'Guess the correct number'},
    ])
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text === '/start') {
            await bot.sendMessage(chatId, `https://sl.combot.org/hacker_0708/webp/0xf09fa494.webp`);
            return bot.sendMessage(chatId, `Welcome to Telegram bot by Serhio`);
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Your name is ${msg.from.first_name} and username is ${msg.from.username}`);
        }
        if (text === '/game') {
            return startGame(chatId);
        }
        return bot.sendMessage(chatId, `I don't understand you, please repeat!`);
    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(chatId);
        }
        if (data == chats[chatId]) {
            await bot.sendMessage(chatId, 'https://sl.combot.org/hangseed_pepe/webp/42xf09f9889.webp');
            return await bot.sendMessage(chatId, `Congrats, you guess a number ${chats[chatId]}`, againOptions)
        } else {
            return await bot.sendMessage(chatId, `You didn't guess the number, the bot guessed the number ${chats[chatId]}`, againOptions)
        }
    })
}

start()