module.exports = {
    name: "repeat",
    description: "repeat modes",

    async run(client, message, args) {
        let mode = distube.setRepeatMode(message, parseInt(args[0]));
        mode = mode ? mode == 2 ? "Repeat queue" : "Repeat song" : "Off";
        message.channel.send("Set repeat mode to `" + mode + "`");
    }
}   