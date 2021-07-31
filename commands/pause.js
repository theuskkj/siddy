module.exports = {
    name: "pause",
    description: "Pause a music",

    async run  (client, message, args) {
        if(!message.member.voice.channel) return message.channel.send("please join a voice channel first!");

        client.distube.pause(message);
        message.channel.send("Paused!")
    }
}