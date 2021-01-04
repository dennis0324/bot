const notification = class{
    constructor(message){
        this.message = message;
    }
    
    create(title, descript, color){
        if(!color){
            console.log("please enter colorcode!")
            return;
        }
        return new Discord.MessageEmbed()
            .setColor(color)
            .setAuthor(title,message.guild.iconURL)
            .setDescription(descript)
            .setFooter("도우미",null)
    }
    
    show(embed){
        this.message.channel.send(embed);
        
    }
};
