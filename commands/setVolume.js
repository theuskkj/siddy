module.exports = {
    name: "setvolume",
    description: "set the volume",

    async run(client, message, args) {
        if(!message.member.voice.channel) return message.channel.send("please join a voice channel first!");


        client.distube.setVolume(message, args[0]);
    }
}