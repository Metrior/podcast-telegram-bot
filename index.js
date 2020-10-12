const TelegramBot = require('node-telegram-bot-api');

const token = "1253334239:AAFHhUVM6yq6t8N3X9iMAJykQe892PBqxds"

const bot = new TelegramBot(token, {polling: true});

let last_greeting_id
let last_instruction_link

bot.on("new_chat_members", async (msg) => {
    //Send greeting message
    await bot.sendMessage(msg.chat.id,
        `Привет ${msg.from.username}. 
        Круто, что ты присоединился. Какой у тебя подкаст? 
        Если интересно, то вот здесь: [Navi](https://t.me/chatpropodcasty/4009) 
        можно посмотреть хэштеги навигации по чатику.`,
    { parse_mode: "markdown",
            disable_web_page_preview:true
         });

    //Delete previous greeting message
    if (last_greeting_id){
        await bot.deleteMessage(msg.chat.id, last_greeting_id)
    }

    //Because we will need to delete next message
    last_greeting_id = msg.message_id+1
})

bot.onText(/\/navi/, async (msg) => {

    await bot.sendMessage(msg.chat.id, `[Navi](https://t.me/chatpropodcasty/4009)`, {
        parse_mode: "markdown",
        disable_web_page_preview:true
    });

    await bot.deleteMessage(msg.chat.id, msg.message_id)

    if (last_instruction_link){
        await bot.deleteMessage(msg.chat.id, last_greeting_id)
    }

    //Because we will need to delete next message
    last_greeting_id = msg.message_id+1
})
