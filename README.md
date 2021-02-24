# Discord ChannelControl Bot
***
+ 설치하는 방법(installation)
    + 설치링크(installation link)
+ 명령어(commands)
    + role
    + serverinfo
    + help
    + gameinfo
    + channel
    + setting
***
설치하는 방법(installation)
--------------------------
설치링크: [add Bot]

***
명령어(commands)
***
command prefix : -- (ex: --role,--help)

role

```
[-s/set] [rolename] @playMention
```
```
[-u/unset] [rolename(number)] @playerMetion
```
```
[-l/list]
```
return value `string: name`

이 상황에서는 gmaeName이 rolename으로 대체됩니다.
In this situation gameName is replace bt rolename
```
[-c/create] [gameName] 
```

```
[-c/create] [gameName] [categoryName]
```

```
[-r/remove] [roleName] 
```


[add Bot]: https://discord.com/api/oauth2/authorize?client_id=664884458025123853&permissions=2147483639&redirect_uri=http%3A%2F%2Flocalhost&response_type=code&scope=bot%20identify%20email%20connections%20guilds%20guilds.join%20gdm.join%20rpc%20applications.builds.read%20applications.commands%20applications.builds.upload%20activities.write%20activities.read%20applications.entitlements%20applications.store.update%20applications.commands.update%20relationships.read%20messages.read%20webhook.incoming%20rpc.notifications.read
