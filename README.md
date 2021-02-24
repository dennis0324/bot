# Discord ChannelControl Bot

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


##명령어(commands)
------

command prefix : -- (ex: --role,--help)

role 
---------
```
[-s/set] [rolename] @playMention
```
return value `boolean`

```
[-u/unset] [rolename(number)] @playerMetion
```
return value `boolean`

```
[-l/list]
```
return value `boolean`

이 상황에서는 gmaeName이 rolename으로 대체됩니다.
In this situation gameName is replace bt rolename
```
[-c/create] [gameName] 
```
return value `boolean`

```
[-c/create] [gameName] [categoryName]
```
return value `boolean`

```
[-r/remove] [roleName] 
```
return value `boolean`

--------------------------


[add Bot]: https://discord.com/oauth2/authorize?client_id=INSERT_CLIENT_ID_HERE&scope=bot&permissions=1069689918
