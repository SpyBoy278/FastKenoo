const { Telegraf } = require('telegraf');
const express = require('express');
const path = require('path');

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();
const PORT = process.env.PORT || 3000;

// Serve files from the main directory
app.use(express.static(path.join(__dirname, '/')));

bot.start((ctx) => {
    // Replace the URL with your actual Render URL
    const url = `https://${process.env.RENDER_EXTERNAL_HOSTNAME}`;
    ctx.reply('⚡ Welcome to FastKeno! ⚡', {
        reply_markup: {
            inline_keyboard: [[
                { text: '🚀 Play Now', web_app: { url: url } }
            ]]
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    bot.launch();
});
