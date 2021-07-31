const Discord = require('discord.js')
const DisTube = require('distube')
const client = new Discord.Client()
const { readdirSync } = require('fs');
const { waitForDebugger } = require('inspector');

const config = require('./config.json')

const token = config.token;

const { join } = require('path');

const { dirname } = require('path/posix');

// Create a new DisTube
const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true });

const prefix = config.prefix

client.distube = distube;


client.commands = new Discord.Collection();
client.config = require("./config.json")
client.emotes = config.emoji



    const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

    for (const file of commandFiles) {
        const command = require(join(__dirname, "commands", `${file}`));
        client.commands.set(command.name, command);
    }


client.on("error", console.error);

client.on("guildCreate", (guild) => {
    console.log(`O bot foi adicionado no servidor ${guild.name}`)
})

const activities_list = [
    "For Rule Breakers", 
    "The purple names",
    "#general", 
    "The mods do their job"
    ]; // creates an arraylist containing phrases you want your bot to switch through.

client.on("ready", () => {
    console.log(`Bot funcionando em ${client.guilds.cache.size} servidores`); 

    let activities = [
        `Hacked By Theuskkj | =help`,
        `Criado por theuskkj`
    ],
    i = 0;
    setInterval(() => client.user.setActivity(`${activities[i++ % 
    activities.length]}`, {
        type: "WATCHING"
    }), 5000)
});


client.on("message", async message => {

    if(message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`) return message.reply(`Hi, my name is Siddy, Im created by theusdorockkkj#5767 and my prefix is ${prefix}`);
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
    
    //let prefix = await db.get(`prefix_${message.guild.id}`);
    //if(prefix === null) prefix = default_prefix;


    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

/*
        if(command === "queue") {
            let queue = client.distube.getQueue(message);
        message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
            `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        ).slice(0, 10).join("\n"));
        }

*/

        if(!client.commands.has(command)) return;


        try{
            client.commands.get(command).run(client, message, args);

        } catch (error){
            console.error(error);
        }
    }
})

        const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

        distube
        .on("playSong", (message, queue, song) => {
            const ago = song.ago
            const play = new Discord.MessageEmbed()
            .setAuthor("Playing", "https://raw.githubusercontent.com/Akshit1025/discordjs-music-bot/main/assets/Music.gif")
            .setThumbnail(`${song.thumbnail}`)
            .setColor("RANDOM")
            .addField("Name", `${song.name}`)
            .addField("Requested by", `${song.user}`, true)
            .setFooter(`Views: ${song.views} | ${ago}`)
            message.channel.send(play)
        })
        .on("addSong", (message, queue, song) => {
            const embed = new Discord.MessageEmbed()
            .setAuthor("A música foi adicionada à fila", "https://media.discordapp.net/attachments/821270469172658196/845709703358971904/Music.gif")
            .setThumbnail(`${song.thumbnail}`)
            .setColor("RANDOM")
            .addField("Name", `${song.name}`)
            .addField("Duration", `${song.duration}`, true)
            .addField("Requested by", `${song.user}`, true)
            message.channel.send(embed)
        })
            .on("playList", (message, queue, playlist, song) => message.channel.send(
                `🎶 Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
            ))
            .on("addList", (message, queue, playlist) => message.channel.send(
                `🎶 Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
            ))
            // DisTubeOptions.searchSongs = true
            .on("searchResult", (message, result) => {
                let i = 0;
                message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. **${song.name}** - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
            })
            // DisTubeOptions.searchSongs = true
            .on("searchCancel", (message) => message.channel.send(`Searching canceled`))


client.login(token);