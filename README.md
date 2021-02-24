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
return value `boolean`


[add Bot]: https://discord.com/oauth2/authorize?client_id=664884458025123853&scope=bot
