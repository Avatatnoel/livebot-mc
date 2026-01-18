const mineflayer = require('mineflayer');
const readline = require('readline');

const bot = mineflayer.createBot({
  host: 'mc.jpini.dev', // Cambia esto por la IP del servidor
  port: 8265,       // Puerto del servidor
  username: 'Live', // Nombre del bot
  version: '1.21.4'  // Versión de Minecraft
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

rl.prompt();

rl.on('line', (input) => {
  const command = input.trim();
  if (command.startsWith('say ')) {
    const message = command.slice(4);
    bot.chat(message);
    console.log(`Bot dijo: ${message}`);
  } else if (command === 'exit') {
    rl.close();
    process.exit(0);
  } else {
    console.log('Comando no reconocido. Usa "say <mensaje>" para que el bot hable.');
  }
  rl.prompt();
});

bot.on('login', () => {
  console.log('Bot conectado al servidor');
  bot.chat('hola, estoy vivo');
});

bot.on('chat', (username, message) => {
  if (username === bot.username) return;
  console.log(`${username}: ${message}`);
  if (message === 'hola') {
    bot.chat('¡Hola! Soy un bot creado por jpini.dev.');
  }
  if (message === '!help') {
    bot.chat('Comandos disponibles: hola (responde), !help (muestra esta ayuda)');
  }
});

bot.on('error', (err) => {
  console.error('Error:', err);
});

bot.on('end', () => {
  console.log('Bot desconectado');
  rl.close();
});
