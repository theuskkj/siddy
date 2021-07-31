module.exports =  {
  name: "ping",
  description: "View  bot ping",
  
  async run(client, message, args) {
    const m = await message.channel.send('ping?');
  
    m.edit(`:ping_pong: **| Pong!**\nLatência do Server: **${m.createdTimestamp -
        message.createdTimestamp}ms.**\nLatência da API: **${Math.round(
        client.ws.ping
   )}ms**
  `);
}
}