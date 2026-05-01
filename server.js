let timeLeft = 60;
let isDrawing = false;

function startTimer() {
    const timerElement = document.getElementById('timer');
    const statusText = document.getElementById('status-text');

    const countdown = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(countdown);
            triggerDrawPhase(); // Function to show drawing animation
        } else {
            timeLeft--;
            let mins = Math.floor(timeLeft / 60);
            let secs = timeLeft % 60;
            timerElement.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
    }, 1000);
}

function triggerDrawPhase() {
    isDrawing = true;
    document.getElementById('grid-section').style.display = 'none';
    document.getElementById('draw-section').style.display = 'block';
    
    // After 10 seconds of showing results, reset to betting
    setTimeout(() => {
        location.reload(); 
    }, 10000);
}

// Start the game loop
window.onload = startTimer;
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
