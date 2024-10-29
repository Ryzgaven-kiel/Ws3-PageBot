const axios = require("axios");
const name = "actai";

module.exports = {
  name,
  description: "Interact with me!",
  async run({ api, send, args }) {
    try {
      const user = args.join(" ");
      if (!user) throw new Error(`Usage: ${api.prefix + name} [your question]`);

      send("I will respond to your question right now!");

      const aIpi = await axios.get(`${api.echavie}/actai`, {
        params: {
          q: user,
        },
      });

      // Ensure the response is valid
      if (!aIpi || !aIpi.data.success) throw new Error(aIpi.data.error || "Unexpected error");

      // Send the AI response along with the follow-up message
      return send(aIpi.data.result + "\n\nFollow my creator: ==>(https://www.facebook.com/cristianmoridas.serrano)");
      
    } catch (error) {
      return send("An error occurred. Try again later or use another command.\n\n" + (error.message || error));
    }
  },
};
