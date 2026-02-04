'use strict'

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Bot is alive. Regrettably.");
});

app.listen(PORT, () => {
  console.log(`Web server running on port ${PORT}`);
});

const mineflayer = require('mineflayer')

let bot

function createBot() {
  bot = mineflayer.createBot({
    host: 'motasemtestpvpserver.aternos.me',
    port: 63814,
    username: 'hguehukuzhuuegu',
    auth: 'offline',
    version: '1.21.10',          // auto-detect version, usually works best for Aternos
    hideErrors: false
  })

  bot.on('login', () => {
    console.log('tl connected—server is ours.')
  })

  bot.on('spawn', () => {
    console.log('Spawned in, random walk engaged.')
    startMoving()
  })

  bot.on('error', (err) => console.log('Hit error:', err.message || err))
  bot.on('end', () => {
    console.log('Disconnected—reconnecting in 5s...')
    setTimeout(createBot, 5000)
  })

  bot.on('kicked', (reason) => console.log('Kicked reason:', reason))
}

function startMoving() {
  const directions = ['forward', 'back', 'left', 'right']
  setInterval(() => {
    const chosen = directions[Math.floor(Math.random() * directions.length)]
    console.log(`tl moving ${chosen} for a sec`)
    bot.setControlState(chosen, true)
    setTimeout(() => {
      bot.setControlState(chosen, false)
    }, 1200)  // slight longer strut, looks natural
  }, 30000)
}

createBot()
