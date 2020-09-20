const TelegramBot = require('node-telegram-bot-api');

const token = "1253334239:AAFHhUVM6yq6t8N3X9iMAJykQe892PBqxds"

const bot = new TelegramBot(token, {polling: true});

let last_greeting_id

bot.on("new_chat_members", async (msg) => {
    await bot.sendMessage(msg.chat.id, `I don't like you, but you can stay`);
    if (last_greeting_id){
        await bot.deleteMessage(msg.chat.id, last_greeting_id)
    }
    last_greeting_id = msg.message_id+1
})

bot.onText(/\/trigger/, async (msg, match) => {
    console.log(msg)
    await bot.sendMessage(msg.chat.id, `Shit. Here we go again.`);
    await bot.deleteMessage(msg.chat.id, msg.message_id)
})
