const { MessageReaction } = require("discord.js");
const { run } = require("./help");

module.exports = {
    name: "clear",
    description: "clear",

    async run(client, message, args) {
        if (!message.member.hasPermission('MANAGE_MESSAGES'))
        return message.channel.send("You cant use this command since you're missing `manage_messages` perm");
        if(!args[0]) return message.reply("Please enter the amount of messages that you want to clear!");
        if(isNaN(args[0])) return message.reply("please enter the real number!");

        if(args[0] > 100) return message.reply("You canno't delete more than 100 messages!");
        if(args[0] < 1) return message.reply("You must delete at least one message!");

        await message.channel.messages.fetch({limit: args[0]}).then(messages => {
            message.channel.bulkDelete(messages);
            message.channel.send(`Bot cleared \`${messages.size}\` messages <:sadcat:870715483169648640>`)
        })

    }
}
