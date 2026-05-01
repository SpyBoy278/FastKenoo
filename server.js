const { Telegraf } = require('telegraf');
const express = require('express');
const path = require('path');

// 1. Initialize Bot & App
const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();
const PORT = process.env.PORT || 3000;

// 2. Serve your 'index.html' folder
app.use(express.static(path.join(__dirname, '/')));

// 3. Command: /start
// When user starts the bot, show the "Play" button
bot.start((ctx) => {
    ctx.reply('Welcome to FastKeno! Click the button below to play.', {
        reply_markup: {
            inline_keyboard: [[
                { text: 'Play FastKeno', web_app: { url: 'https://fastkenoo-1.onrender.com/' } }
            ]]
        }
    });
});

// 4. Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    // Launch the bot
    bot.launch();
});
