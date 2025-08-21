import axios from "axios";
import config from '../config.cjs';

const repo = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(" ")[0].toLowerCase() : "";
  const args = m.body.slice(prefix.length).trim().split(/ +/).slice(1);

  if (["repo", "sc", "script", "info"].includes(cmd)) {
    const githubRepoURL = "https://github.com/caseyweb/CASEYRHODES-XMD";

    try {
      // Extract username and repo name from the URL
      const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);

      // Fetch repository details using GitHub API
      const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`);

      if (!response.data) {
        throw new Error("GitHub API request failed.");
      }

      const repoData = response.data;

      // Format the repository information
      const formattedInfo = `*BOT NAME:*\n> ${repoData.name}\n\n*OWNER NAME:*\n> ${repoData.owner.login}\n\n*STARS:*\n> ${repoData.stargazers_count}\n\n*FORKS:*\n> ${repoData.forks_count}\n\n*GITHUB LINK:*\n> ${repoData.html_url}\n\n*DESCRIPTION:*\n> ${repoData.description || "No description"}\n\n*Don't Forget To Star and Fork Repository*\n\n> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄᴀsᴇʏʀʜᴏᴅᴇs ᴛᴇᴄʜ 🖤*`;

      // Create buttons
      const buttons = [
        {
          buttonId: `${prefix}sendaudio`,
          buttonText: { displayText: "🔊 Send Audio" },
          type: 1
        },
        {
          buttonId: `${prefix}menu`,
          buttonText: { displayText: "📋 Menu" },
          type: 1
        },
        {
          buttonId: `${prefix}repo`,
          buttonText: { displayText: "📁 Repository Info" },
          type: 1
        }
      ];

      // Send an image with the formatted info as a caption and buttons
      await gss.sendMessage(
        m.from,
        {
          image: { url: "https://files.catbox.moe/57e80f.jpg" },
          caption: formattedInfo,
          buttons: buttons,
          headerType: 1,
          contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: "120363302677217436@newsletter",
              newsletterName: "Caseyrhodes Tech👻",
              serverMessageId: 143,
            },
          },
        },
        { quoted: m }
      );

    } catch (error) {
      console.error("Error in repo command:", error);
      m.reply("Sorry, something went wrong while fetching the repository information. Please try again later.");
    }
  }

  // Handle button actions
  if (m.message?.buttonsResponseMessage) {
    const selectedButtonId = m.message.buttonsResponseMessage.selectedButtonId;
    
    if (selectedButtonId === `${prefix}sendaudio`) {
      // Send the audio file with context info
      await gss.sendMessage(
        m.from,
        {
          audio: { url: "https://files.catbox.moe/a95ye6.aac" },
          mimetype: "audio/mp4",
          ptt: true,
          contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: "120363302677217436@newsletter",
              newsletterName: "Caseyrhodes Tech👻",
              serverMessageId: 143,
            },
          },
        },
        { quoted: m }
      );
    } else if (selectedButtonId === `${prefix}menu`) {
      // Send menu options
      const menuMessage = `
*🤖 BOT MENU*

🔹 *${prefix}repo* - Show repository info
🔹 *${prefix}audio* - Send audio file
🔹 *${prefix}help* - Show help information
🔹 *${prefix}sticker* - Create sticker from image

*More commands available! Type ${prefix}help for full list.*
      `.trim();
      
      await gss.sendMessage(
        m.from,
        { text: menuMessage },
        { quoted: m }
      );
    } else if (selectedButtonId === `${prefix}repo`) {
      // Trigger the repo command again
      m.body = `${prefix}repo`;
      await repo(m, gss);
    }
  }
};

export default repo;
