module.exports = {
    name: "loop",
    description: "Skips the queue",
    aliases: ["lp"],

    async run  (client, message, args) {
        if(!message.member.voice.channel) return message.channel.send("please join a voice channel first!");

        let mode = client.distube.setRepeatMode(message, parseInt(args[0]));
        mode = mode ? mode == 2 ? "Repeat queue" : "Repeat song" : "Off";
        message.channel.send("Set repeat mode to `" + mode + "`");
    }
}