module.exports = {
  description: "What is Act AI Chatbot?",
  async run({ api, send, admin }){
    await send({
      attachment: {
        type: "image",
        payload: {
          url: "https://i.imgur.com/gw1V46p.jpeg",
          is_reusable: true
        }
      }
    });
    setTimeout(async () => await send({
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: `🤖 About Act Ai Chatbot:
Act Ai Chatbot is your friendly, helpful personal assistant.

💭 Why I named Act AI Chatbot as a name of the page bot because this is the course of my Creator

❓ Contact us admins if you experienced/encountered any issue regarding to the bot and I will try to fix it. Thankyou for using me as a personal assistant!`,
          buttons: [
            {
              type: "web_url",
              url: "https://www.facebook.com/profile.php?id=61567908865958",
              title: "Like/Follow our other Page Bot"
                },
            {
              type: "web_url",
              url: "https://www.facebook.com/cristianmoridas.serrano",
              title: "Contact Admin 1"
                },
            {
              type: "web_url",
              url: "https://www.facebook.com/Kiel.as.usual.11",
              title: "Contact Admin 2"
                }
             ]
        }
      }
    }), 2*1000);
  }
}
