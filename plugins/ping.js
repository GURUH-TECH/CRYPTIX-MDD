
import config from '../config.cjs';

const ping = async (m, Matrix) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  if (cmd === "ping") {
    const start = new Date().getTime();

    const reactionEmojis = ['🔥', '⚡', '🚀', '💨', '🎯', '🎉', '🌟', '💥', '🕐', '🔹'];
    const textEmojis = ['💎', '🏆', '⚡️', '🚀', '🎶', '🌠', '🌀', '🔱', '🛡️', '✨'];

    const reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];
    let textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];

    // Ensure reaction and text emojis are different
    while (textEmoji === reactionEmoji) {
      textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
    }

    await m.React(textEmoji);

    const end = new Date().getTime();
    const responseTime = (end - start) / 1000;
    const imageUrl = "https://files.catbox.moe/y3j3kl.jpg";
    const text = `*CASEYRHODES SPEED: ${responseTime.toFixed(2)}ms ${reactionEmoji}*\n\n` +
                 `Select an option below:`;

    const buttons = [
      {
        buttonId: `${prefix}status`,
        buttonText: { displayText: '📊 Bot Status' },
        type: 1
      },
      {
        buttonId: `${prefix}help`,
        buttonText: { displayText: '❓ Help Menu' },
        type: 1
      },
      {
        buttonId: `${prefix}speedtest`,
        buttonText: { displayText: '⚡ Speed Test' },
        type: 1
      }
    ];

    // Combined image with buttons in a single message
    const combinedMessage = {
      image: { url: imageUrl },
      caption: text,
      footer: "Caseyrhodes Performance Menu",
      buttons: buttons,
      headerType: 4, // For image message
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: "Caseyrhodes Xtech",
          serverMessageId: 143
        }
      }
    };

    await Matrix.sendMessage(m.from, combinedMessage, { quoted: m });
  }
};

export default ping;
