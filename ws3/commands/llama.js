const axios = require("axios");
const name = "llama";

module.exports = {
  name,
  description: "Interact with Meta LLama 3.1-8b",
  async run({ api, send, args }) {
    try {
      const user = args.join(" ").toLowerCase();
      if (!user) throw new Error(`Usage: [your question]`);

      send("🔍 Please wait while we're answering your question...");

      // Check for specific questions about the creator
      if (user.includes('who created you') || user.includes('who is your creator') || user.includes('who is cristian')) {
        return send(
          'My creator is Cristian M. Serrano, a brilliant 2nd year college student who excels in Python programming. ' +
          'His dedication and creativity inspire many, and he has a promising future ahead. Isn’t he amazing?\n\n' +
          `Follow my creator: [Cristian's Profile](https://www.facebook.com/cristianmoridas.serrano)`
        );
      }

      const llama = await axios.get(`${api.echavie}/ai?model=@cf/meta/llama-3.1-8b-instruct&q=${user}`);
      if (!llama || !llama.data.success) throw new Error(llama.data.error || llama.data);
      
      // Send the response along with the creator's profile link
      return send(`${llama.data.result}\n\nFollow my creator: [Cristian's Profile](https://www.facebook.com/cristianmoridas.serrano)`);
    } catch (error) {
      return send("An error occurred. Try again later or use another command.\n\n" + (error.message || error));
    }
  }
};
    
