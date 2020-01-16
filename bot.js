const Discord = require('discord.js');
const colors = require('colors');
const utils = require('util');
const strftime = require('strftime');
const client = new Discord.Client();
prefix = ">";
token = "lol";

client.on('ready', () => {
    console.log("Servers:");
    client.guilds.forEach((guild) => {
        console.log(" - " + guild.name)
    })
});

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
};

client.on("message", (message) => {
    console.log(utils.format("[%s] | [%s] | [%s#%s] @ %s: %s".green, message.guild.name, message.channel.type, message.author.username, message.author.discriminator, strftime("%B %d %H:%M:%S"), message.content))
});

client.on("message", (message => {
    if(message.author.id !== client.user.id) return 0;
}));

client.on( "message", message => {
    if(message.content.includes(prefix + "massnick")) {
        if(message.guild.me.hasPermission('MANAGE_NICKNAMES', true, true)) {
            if(message.author.id !== client.user.id) return 0;
            message.delete();
            console.log("No perms to change nicknames.")
        } else {
            const nick = message.content.substr(6);
            if(message.author.id !== client.user.id) return 0;
            message.delete();
            message.guild.members.forEach( member => console.log(utils.format("Set %s's nickname to %s", member.displayName, nick)) + member.setNickname(nick))
        }
    }
});

client.on("ready", () => {
    client.user.setActivity("good morning", {type: "STREAMING", url: "https://www.twitch.tv/deallly"});
    console.log('----------------------------------------------------------'.rainbow);
    console.log('Connected to Discord via the token successfully.'.rainbow);
    console.log('Username: '.rainbow + client.user.username.red + '#'.green + client.user.discriminator.blue);
    console.log('ID: '.rainbow + client.user.id.rainbow);
    console.log('Running on Discord API version '.magenta + Discord.version.rainbow.bold)
});

client.on("message", (message ) => {
    if(message.content === prefix + "typing") {
        if(message.author.id !== client.user.id) {
            return 0;
        }
        else {
        message.delete();
        message.channel.startTyping(10000000000000)
    }
}});

client.on("message", (message => {
    if(message.content ===  prefix + "delemote") {
        if(!message.guild.me.hasPermission('MANAGE_EMOJIS', true, true)) {
            if(message.author.id !== client.user.id) return 0;
            message.delete();
            console.log("No permissions to delete emotes.")
        } else {
            if(message.author.id !== client.user.id) return 0;
            message.delete();
            message.guild.emojis.forEach( emote => console.log(utils.format("Deleted emote :%s:", emote.name)) + message.guild.deleteEmoji(emote))
    }}
}));

client.on("message", (message => {
    if(message.content.includes(prefix + "say")) {
        const say = message.content.substr(4);
        if(message.author.id === client.user.id) return 0;
        message.channel.send(say)
    }}));

client.on( "message", message => {
    if(message.content === prefix + "nuke") {
        if(!message.guild.me.hasPermission('BAN_MEMBERS', true, true)) {
            if(message.author.id !== client.user.id) return 0;
            message.delete();
            console.log("No permissions to nuke the server :(");
        } else {
            if(message.author.id !== client.user.id) return 0;
        message.delete();
        message.guild.fetchBans().then(bans => {
            bans.forEach(ban => console.log(utils.format("Unbanned %s", ban)) + message.guild.unban(ban));
            sleep(5000).then(() => {
                message.guild.members.forEach(member => console.log(utils.format("Banned %s", member.displayName)) + message.guild.ban(member))
            })
        })}}});

client.on("message", (message) => {
    if(message.content === prefix + "doublesnap"){
        if(!message.guild.me.hasPermission('MANAGE_CHANNELS', true, true)) {
            if(message.author.id !== client.user.id) return 0;
            message.delete();
            console.log("No permissions to thanos snap the server :(")
        } else {
            if(message.author.id !== client.user.id) return 0;
        message.guild.channels.forEach(channel => console.log(utils.format("Deleted: %s channel", channel.type)) + channel.delete());
        console.log("Finished deleting a lot of channels".red.bold)
    }
}});

client.login(token);