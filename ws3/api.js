const token = "EAASBCYOwnwMBO7xNuZBtCq8oxdfnSXlWuMm6FE7WcIjo8kRFnUYzSPEPllIa2qHrLuByBpZBxFGgyjAFXI3PTOLUpjbSHEakZCNZBA2sAiJMf2QkozpqTIZC9yjsn1rB0Q7KL2pPindgVG7zoLc0zqNkZCJfFFy1A8Xx58vAveyUg78OkZCcrOXU9ZBbEGZBvAtbPZCgZDZD";
const PAGE_ACCESS_TOKEN = process.env.token || token;
const request = require('request');
const axios = require("axios");
const cmdLoc = __dirname + "/commands";
const temp = __dirname + "/temp";
const fs = require("fs");
const prefix = "/";
const commands = [];
const descriptions = [];
module.exports = {
  PAGE_ACCESS_TOKEN,
  async loadCommands() {
    const commandsPayload = [];
    fs.readdir(cmdLoc, {}, async (err, files) => {
      for await (const name of files) {
        const readCommand = require(cmdLoc + "/" + name);
        const commandName = readCommand.name || (name.replace(".js", "")).toLowerCase();
        const description = readCommand.description || "No description provided.";
        commands.push(commandName);
        descriptions.push(description);
        commandsPayload.push({
          name: `${prefix + commandName}`,
          description
        });
        console.log(commandName, "Loaded");
      }
      console.log("Wait...");
    });
    const dataCmd = await axios.get(`https://graph.facebook.com/v21.0/me/messenger_profile`, {
      params: {
        fields: "commands",
        access_token: PAGE_ACCESS_TOKEN
      }
    });
    if (dataCmd.data.data.commands){
    if (dataCmd.data.data[0].commands[0].commands.length === commandsPayload.length)
    return console.log("Commands not changed");
    }
    const loadCmd = await axios.post(`https://graph.facebook.com/v21.0/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}`, {
      commands: [
        {
          locale: "default",
          commands: commandsPayload
      }
    ]
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (loadCmd.data.result === "success")
      console.log("Commands loaded!")
    else
      console.log("Failed to load commands");
    return;
  },
  commands,
  descriptions,
  cmdLoc,
  temp,
  prefix,
  admin: [
"100051157809614",
""
],
  async sendMessage(senderId, message, pageAccessToken) {
    return await new Promise(async (resolve, reject) => {
      const sendMsg = await axios.post(`https://graph.facebook.com/v21.0/me/messages`,
      {
        recipient: { id: senderId },
        message
      }, {
        params: {
          access_token: pageAccessToken
        },
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = sendMsg.data;
      if (data.error) {
        console.error('Error sending message:', data.error);
        reject(data.error);
      }
      resolve(data);
    });
  },
  async publishPost(message, access_token) {
    return await new Promise(async (resolve, reject) => {
    const res = await axios.post(`https://graph.facebook.com/v21.0/me/feed`,
    {
      message,
      access_token
    }, {
      params: {
        access_token
      },
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!res) reject();
    resolve(res.data);
    });
  },
  introduction: `Hello, I am WieAI and I am your assistant.
Type ${prefix}help for available commands.

Note: WieAI is highly recommended to use Messenger because some features won't work and limited.
🤖 Created by Neth Aceberos`,
  api_josh: "https://deku-rest-apis.ooguy.com",
  echavie: "https://echavie3.nethprojects.workers.dev"
}
