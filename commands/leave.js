const { run } = require("./resume");

module.exports = {
    name: "leave",
    description: "leaves the voice channel",

    async run(client, message, args) {
        if(!message.guild.me.voice.channel) return message.channel.send("I'm not in a voice channel"); //If the bot is not in a voice channel, then return a message
        message.guild.me.voice.channel.leave();
        message.channel.send(`Going out...`) //Leave the voice channel
    }
}