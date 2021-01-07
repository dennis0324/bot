Const embedHelper = class{
    constructor(){}
    
    set(title, descript, color){
        return new Discord.MessageEmbed()
            .setColor(color)
            .setAuthor(title,"")
            .setDescription(descript)
    }
    
    show(message, embed){
        message.channel.send(embed);
    }
}

module.exports = embedHelper
