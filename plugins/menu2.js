import moment from 'moment-timezone';
import fs from 'fs';
import os from 'os';
import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);
import config from '../config.cjs';
import axios from 'axios';

// Get total memory and free memory in bytes
const totalMemoryBytes = os.totalmem();
const freeMemoryBytes = os.freemem();

// Define unit conversions
const byteToKB = 1 / 1024;
const byteToMB = byteToKB / 1024;
const byteToGB = byteToMB / 1024;

// Function to format bytes to a human-readable format
function formatBytes(bytes) {
  if (bytes >= Math.pow(1024, 3)) {
    return (bytes * byteToGB).toFixed(2) + ' GB';
  } else if (bytes >= Math.pow(1024, 2)) {
    return (bytes * byteToMB).toFixed(2) + ' MB';
  } else if (bytes >= 1024) {
    return (bytes * byteToKB).toFixed(2) + ' KB';
  } else {
    return bytes.toFixed(2) + ' bytes';
  }
}

// Bot Process Time
const uptime = process.uptime();
const day = Math.floor(uptime / (24 * 3600)); // Calculate days
const hours = Math.floor((uptime % (24 * 3600)) / 3600); // Calculate hours
const minutes = Math.floor((uptime % 3600) / 60); // Calculate minutes
const seconds = Math.floor(uptime % 60); // Calculate seconds

// Uptime
const uptimeMessage = `*I am alive now since ${day}d ${hours}h ${minutes}m ${seconds}s*`;
const runMessage = `*☀️ ${day} Day*\n*🕐 ${hours} Hour*\n*⏰ ${minutes} Minutes*\n*⏱️ ${seconds} Seconds*\n`;

const xtime = moment.tz("Asia/Colombo").format("HH:mm:ss");
const xdate = moment.tz("Asia/Colombo").format("DD/MM/YYYY");
const time2 = moment().tz("Asia/Colombo").format("HH:mm:ss");
let pushwish = "";

if (time2 < "05:00:00") {
  pushwish = `Good Morning 🌄`;
} else if (time2 < "11:00:00") {
  pushwish = `Good Morning 🌄`;
} else if (time2 < "15:00:00") {
  pushwish = `Good Afternoon 🌅`;
} else if (time2 < "18:00:00") {
  pushwish = `Good Evening 🌃`;
} else if (time2 < "19:00:00") {
  pushwish = `Good Evening 🌃`;
} else {
  pushwish = `Good Night 🌌`;
}

const menu = async (m, Matrix) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const mode = config.MODE === 'public' ? 'public' : 'private';
  const pref = config.PREFIX;
  const totalCommands = 100; // Added this variable as it was referenced but not defined

  const validCommands = ['list', 'help', 'menu'];

  if (validCommands.includes(cmd)) {
    const mainMenu = `
╭━━━《 *𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐗𝐌𝐃* 》 ━━━┈⊷
┃❍⁠⁠⁠⁠╭──────────────
┃❍⁠⁠⁠⁠│▸  Usᴇʀ : ${config.OWNER_NAME}
┃❍⁠⁠⁠⁠│▸  ʙᴀɪʟᴇʏs : 𝐌𝐮𝐥𝐭𝐢 𝐝𝐞𝐯𝐢𝐜𝐞
┃❍⁠⁠⁠⁠│▸  ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴᴅs : *${totalCommands}*
┃❍⁠⁠⁠⁠│▸  𝖳ʏᴘᴇ : 𝐍𝐨𝐝𝐞𝐣𝐬
┃❍⁠⁠⁠⁠│▸  ᴘʟᴀᴛғᴏʀᴍ : 𝐇𝐞𝐫𝐨𝐤𝐮
┃❍⁠⁠⁠⁠│▸  𝖣ᴇᴠᴇʟᴏᴘᴇʀ : ᴄᴀsᴇʏʀʜᴏᴅᴇs ᴛᴇᴄʜ
┃❍⁠⁠⁠⁠│▸  𝖬ᴏᴅᴇ : [${config.MODE}]
┃❍⁠⁠⁠⁠│▸  𝖯ʀᴇғɪx : *[${config.PREFIX}]*
┃❍⁠⁠⁠⁠│▸  𝖵ᴇʀsɪᴏɴ : 𝟏.𝟎.𝟎
┃❍⁠⁠⁠⁠╰──────────────
╰━━━━━━━━━━━━━━━━━━━━━━━━┈⊷
${readmore}
📚 *ᴍᴇɴᴜ ɴᴀᴠɪɢᴀᴛɪᴏɴ*

   \`\`\`ʀᴇᴘʟʏ ᴡɪᴛʜ ᴀɴʏ ɴᴜᴍʙᴇʀ\`\`\`

*╭── [ MENU OPTION🌟] ‎─┈⊷*
‎*├⬡ 1.ᴅᴏᴡɴʟᴏᴀᴅ ᴍᴇɴᴜ*
‎*├⬡ 2.ɢʀᴏᴜᴘ ᴍᴇɴᴜ*
‎*├⬡ 3.ғᴜɴ ᴍᴇɴᴜ*
‎*├⬡ 4.ᴏᴡɴᴇʀ ᴍᴇɴᴜ*
‎*├⬡ 5.ᴀɪ ᴍᴇɴᴜ*
‎*├⬡ 6.ᴀɴɪᴍᴇ ᴍᴇɴᴜ*
‎*├⬡ 7.ᴄᴏɴᴠᴇʀᴛ ᴍᴇɴᴜ*
‎*├⬡ 8.ᴏᴛʜᴇʀ ᴍᴇɴᴜ*
‎*├⬡ 9.ʀᴇᴀᴄᴛɪᴏɴ ᴍᴇɴᴜ*
‎*├⬡ 10.ᴍᴀɪɴ ᴍᴇɴᴜ*
‎*├⬡ 11.sᴇᴛᴛɪɴɢs ᴍᴇɴᴜ*
‎*├⬡ 12.ᴍ-ᴘᴇsᴀ ᴍᴇɴᴜ*
‎*├⬡ 13.ʟᴏɢᴏ ᴍᴇɴᴜ*
‎*├⬡ 14.ʙɪʙʟᴇ ʟɪsᴛ*
‎*├⬡ 15.ᴄᴏᴅᴇ ᴍᴇɴᴜ*
‎*╰────────────────┈⊷*
_*ʀᴇᴘʟʏ ᴡɪᴛʜ ᴀɴʏ ɴᴜᴍʙᴇʀ ᴀʙᴏᴠᴇ ᴛᴏ ᴀᴄᴄᴇss ᴍᴇɴᴜ ᴏᴘᴛɪᴏɴ*_

Or tчpє *.αllmєnu* tσ ѕєє αll cσmmαndѕ.

fσr mσrє ínfσ tчpє *.ownєr*`;

    // Function to get menu image
    const getMenuImage = async () => {
      if (config.MENU_IMAGE && config.MENU_IMAGE.trim() !== '') {
        try {
          const response = await axios.get(config.MENU_IMAGE, { responseType: 'arraybuffer' });
          return Buffer.from(response.data, 'binary');
        } catch (error) {
          console.error('Error fetching menu image from URL:', error);
          // Fallback to a default image URL
          try {
            const fallbackUrl = "https://files.catbox.moe/y3j3kl.jpg";
            const response = await axios.get(fallbackUrl, { responseType: 'arraybuffer' });
            return Buffer.from(response.data, 'binary');
          } catch (fallbackError) {
            console.error('Error fetching fallback menu image:', fallbackError);
            return null; // Return null if both URLs fail
          }
        }
      } else {
        // Use default image URL if no MENU_IMAGE is configured
        try {
          const defaultUrl = "https://files.catbox.moe/y3j3kl.jpg";
          const response = await axios.get(defaultUrl, { responseType: 'arraybuffer' });
          return Buffer.from(response.data, 'binary');
        } catch (error) {
          console.error('Error fetching default menu image:', error);
          return null;
        }
      }
    };

    const menuImage = await getMenuImage();

    // Prepare message options
    const messageOptions = {
      caption: mainMenu,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363302677217436@newsletter',
          newsletterName: "CASEYRHODES-AI",
          serverMessageId: 143
        }
      }
    };

    // Add image if available
    if (menuImage) {
      messageOptions.image = menuImage;
    }

    const sentMessage = await Matrix.sendMessage(m.from, messageOptions, {
      quoted: m
    });

    // Send audio after sending the menu
    await Matrix.sendMessage(m.from, {
      audio: { url: 'https://files.catbox.moe/d5yxdu.mp3' },
      mimetype: 'audio/mp4',
      ptt: true
    }, { quoted: m });

    // Set up listener for menu selection
    const messageListener = async (event) => {
      const receivedMessage = event.messages[0];
      if (!receivedMessage?.message?.extendedTextMessage) return;

      const receivedText = receivedMessage.message.extendedTextMessage.text.trim();
      if (receivedMessage.message.extendedTextMessage.contextInfo?.stanzaId !== sentMessage.key.id) return;

      let menuResponse;
      let menuTitle;
      
      switch (receivedText) {
        case "1":
          menuTitle = "Download Menu";
          menuResponse = `
╭━━〔 *Download Menu* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• apk
┃◈┃• facebook
┃◈┃• mediafire
┃◈┃• pinterestdl
┃◈┃• gitclone
┃◈┃• gdrive
┃◈┃• insta
┃◈┃• ytmp3
┃◈┃• ytmp4
┃◈┃• play
┃◈┃• song
┃◈┃• video
┃◈┃• ytmp3doc
┃◈┃• ytmp4doc
┃◈┃• tiktok
┃◈└───────────┈⊷
╰──────────────┈⊷`;
          break;
          
        case "2":
          menuTitle = "Group Menu";
          menuResponse = `
╭━━〔 *Group Menu* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• linkgroup
┃◈┃• setppgc
┃◈┃• setname
┃◈┃• setdesc
┃◈┃• group
┃◈┃• gcsetting
┃◈┃• welcome
┃◈┃• add
┃◈┃• kick
┃◈┃• hidetag
┃◈┃• tagall
┃◈┃• antilink
┃◈┃• antitoxic
┃◈┃• promote
┃◈┃• demote
┃◈┃• getbio
┃◈└───────────┈⊷
╰──────────────┈⊷`;
          break;
          
        case "3":
          menuTitle = "Fun Menu";
          menuResponse = `
╭━━〔 *Fun Menu* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• truth
┃◈┃• dare
┃◈┃• fact
┃◈┃• quote
┃◈┃• joke
┃◈┃• meme
┃◈┃• riddle
┃◈└───────────┈⊷
╰──────────────┈⊷`;
          break;
          
        case "4":
          menuTitle = "Owner Menu";
          menuResponse = `
╭━━〔 *Owner Menu* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• join
┃◈┃• leave
┃◈┃• block
┃◈┃• unblock
┃◈┃• setppbot
┃◈┃• anticall
┃◈┃• setstatus
┃◈┃• setnamebot
┃◈┃• autotyping
┃◈┃• alwaysonline
┃◈┃• autoread
┃◈┃• autosview
┃◈└───────────┈⊷
╰──────────────┈⊷`;
          break;
          
        case "5":
          menuTitle = "AI Menu";
          menuResponse = `
╭━━〔 *AI Menu* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• ai
┃◈┃• bug
┃◈┃• report
┃◈┃• gpt
┃◈┃• dalle
┃◈┃• remini
┃◈┃• gemini
┃◈└───────────┈⊷
╰──────────────┈⊷`;
          break;
          
        case "6":
          menuTitle = "Anime Menu";
          menuResponse = `
╭━━〔 *Anime Menu* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• anime
┃◈┃• manga
┃◈┃• character
┃◈┃• waifu
┃◈┃• husbando
┃◈┃• neko
┃◈└───────────┈⊷
╰──────────────┈⊷`;
          break;
          
        case "7":
          menuTitle = "Converter Menu";
          menuResponse = `
╭━━〔 *Converter Menu* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• attp
┃◈┃• attp2
┃◈┃• attp3
┃◈┃• ebinary
┃◈┃• dbinary
┃◈┃• emojimix
┃◈┃• mp3
┃◈└───────────┈⊷
╰──────────────┈⊷`;
          break;
          
        case "8":
          menuTitle = "Other Menu";
          menuResponse = `
╭━━〔 *Other Menu* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• sticker
┃◈┃• take
┃◈┃• emoji
┃◈┃• weather
┃◈┃• time
┃◈┃• date
┃◈┃• qr
┃◈└───────────┈⊷
╰──────────────┈⊷`;
          break;
          
        case "9":
          menuTitle = "Reaction Menu";
          menuResponse = `
╭━━〔 *Reaction Menu* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• like
┃◈┃• love
┃◈┃• haha
┃◈┃• wow
┃◈┃• sad
┃◈┃• angry
┃◈└───────────┈⊷
╰──────────────┈⊷`;
          break;
          
        case "10":
          menuTitle = "Main Menu";
          menuResponse = `
╭━━〔 *Main Menu* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• ping
┃◈┃• alive
┃◈┃• owner
┃◈┃• menu
┃◈┃• infobot
┃◈└───────────┈⊷
╰──────────────┈⊷`;
          break;
          
        default:
          menuTitle = "Invalid Choice";
          menuResponse = "*Invalid Reply Please Reply With A Number Between 1 to 10*";
      }

      // Format the full response with title and description
      const fullResponse = `
╭━━━〔 *${config.BOT_NAME} - ${menuTitle}* 〕━━━┈⊷
┃★╭──────────────
┃★│• Owner : *${config.OWNER_NAME}*
┃★│• User : *${m.pushName}*
┃★│• Prefix : [${prefix}]
┃★│• Version : *3.1.0*
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷

${menuResponse}

> *${config.DESCRIPTION}*`;

      // Prepare response message options
      const responseMessageOptions = {
        caption: fullResponse,
        contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363398040175935@newsletter',
            newsletterName: "JawadTechX",
            serverMessageId: 143
          }
        }
      };

      // Add image if available
      if (menuImage) {
        responseMessageOptions.image = menuImage;
      }

      // Send the response with image and context info
      await Matrix.sendMessage(m.from, responseMessageOptions, {
        quoted: receivedMessage
      });
    };

    // Add the listener
    Matrix.ev.on('messages.upsert', messageListener);
    
    // Remove the listener after a timeout to prevent memory leaks
    setTimeout(() => {
      Matrix.ev.off('messages.upsert', messageListener);
    }, 60000); // Remove after 60 seconds
  }
};

export default menu;
