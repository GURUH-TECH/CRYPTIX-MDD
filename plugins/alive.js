import fs from 'fs';
import process from 'process';
import config from '../config.cjs';
import moment from 'moment';

// Helper function for tiny caps text
const toTinyCap = (text) =>
    text.split("").map(char => {
        const tiny = {
            a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ғ', g: 'ɢ',
            h: 'ʜ', i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ',
            o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ', s: 's', t: 'ᴛ', u: 'ᴜ',
            v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ'
        };
        return tiny[char.toLowerCase()] || char;
    }).join("");

// Runtime formatter function
const runtime = (seconds) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    let timeString = '';
    if (days > 0) timeString += `${days}d `;
    if (hours > 0) timeString += `${hours}h `;
    if (minutes > 0) timeString += `${minutes}m `;
    timeString += `${secs}s`;
    
    return timeString;
};

const alive = async (m, Matrix) => {
    try {
        const uptimeSeconds = process.uptime();
        const uptime = runtime(uptimeSeconds);
        
        const now = moment();
        const currentTime = now.format("HH:mm:ss");
        const currentDate = now.format("dddd, MMMM Do YYYY");
        const pushname = m.pushName || "User";
        const prefix = config.PREFIX;

        // Check if it's a button response
        const isButtonResponse = m.message?.buttonsResponseMessage;
        
        if (isButtonResponse) {
            const selectedButtonId = m.message.buttonsResponseMessage.selectedButtonId;
            
            if (selectedButtonId === `${prefix}audio`) {
                const audioUrls = [
                    'https://files.catbox.moe/m0xfku.mp3',
                    'https://files.catbox.moe/8stziq.mp3',
                    'https://files.catbox.moe/3au05j.m4a',
                    'https://files.catbox.moe/dcxfi1.mp3',
                    'https://files.catbox.moe/ebkzu5.mp3',
                    'https://files.catbox.moe/xsa1ig.mp3',
                    'https://files.catbox.moe/iq4ouj.mp3',
                    'https://files.catbox.moe/wtux78.mp3'
                ];

                const randomAudioUrl = audioUrls[Math.floor(Math.random() * audioUrls.length)];
                
                // Send audio
                await Matrix.sendMessage(m.from, {
                    audio: { url: randomAudioUrl },
                    mimetype: 'audio/mp4',
                    ptt: true
                }, { quoted: m });
                
                return;
            } else if (selectedButtonId === `${prefix}repo`) {
                // Repository button clicked
                await Matrix.sendMessage(m.from, { 
                    text: '📁 Repository: https://github.com/your-username/your-repo' 
                }, { quoted: m });
                return;
            }
        }
        
        // Regular command handling
        const cmd = m.body?.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

        if (!cmd || !['alive', 'uptime', 'runtime', 'status'].includes(cmd)) return;

        const msg = `
╭──❖ 「 *${toTinyCap("Bot Status")}* 」 ❖─
│ 👤 ʜɪ: *${pushname}*
│ 🕓 ᴛɪᴍᴇ: *${currentTime}*
│ 📆 ᴅᴀᴛᴇ: *${currentDate}*
│ 🧭 ᴜᴘᴛɪᴍᴇ: *${uptime}*
│ ⚙️ ᴍᴏᴅᴇ: *${config.MODE || 'default'}*
│ 🔰 ᴠᴇʀsɪᴏɴ: *${config.version || '1.0.0'}*
╰─────────❖
        `.trim();

        const buttons = [
            {
                buttonId: `${prefix}repo`,
                buttonText: { displayText: '📁 Repository' },
                type: 1
            },
            {
                buttonId: `${prefix}audio`,
                buttonText: { displayText: '🎵 Audio' },
                type: 1
            }
        ];

        // Check if image file exists
        let imageBuffer;
        try {
            imageBuffer = fs.readFileSync('./media/Casey.jpg');
        } catch (error) {
            console.log('Image file not found, sending text message only');
        }

        const buttonMessage = {
            caption: msg,
            footer: 'Choose an option',
            buttons: buttons,
            headerType: 4,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363302677217436@newsletter',
                    newsletterName: "JINX-XMD",
                    serverMessageId: 143
                }
            }
        };

        // Add image only if it exists
        if (imageBuffer) {
            buttonMessage.image = imageBuffer;
        } else {
            buttonMessage.text = msg;
        }

        await Matrix.sendMessage(m.from, buttonMessage, {
            quoted: m
        });
    } catch (error) {
        console.error('Error in alive command:', error);
        await Matrix.sendMessage(m.from, { 
            text: '❌ An error occurred while processing your request.' 
        }, { quoted: m });
    }
};

export default alive;
