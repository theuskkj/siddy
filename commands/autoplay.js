const { run } = require("./setVolume");

module.exports = {
    name: "autoplay",
    description: "toggle auto play",

    async run(client, message, args) {
        let mode = client.distube.toggleAutoplay(message);
        message.channel.send("Set autoplay mode to `" + (mode ? "On" : "Off") + "`");
    }
}