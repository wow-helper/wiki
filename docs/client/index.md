---
sidebar_position: 1
---

# 客户端工具

## 双开战网
通过此方式可以设置多个本地电脑账户来存储客户端数据
```wowmacro
C:\Windows\System32\runas.exe /savecred /user:wow2 "D:\game\Battle.net\Battle.net Launcher.exe"

"%systemroot%\System32\runas.exe /savecred /user:KM\小李 "C:\Program Files (x86)\Internet Explorer\iexplore.exe""

sanur.exe 
https://stackoverflow.com/questions/4011245/pass-password-to-runas-from-python/4017529#4017529
runas /user:domain\username cmd.exe | sanur mysekritpassword

参考 https://stackoverflow.com/questions/44054128/using-python-to-open-cmd-and-automatically-enter-a-password
参考 psexec -u user -p password cmd 自动密码
```

## 修改战网客户端登录地区
具体过程：
一、（1）打开任务管理器把Agent.exe和Battle.net这两个进程关掉（没有就跳过）
（2）打开Battle.net.config（记得把隐藏的文件改成可见）
　　WIN7路径：C:\Users\Administrator\AppData\Roaming\Battle.net
　　MAC路径：~/Library/Application Support/Battle.net
　　XP路径：C:\Documents and Settings\Administrator\Application Data\Battle.net
二、修改Battle.net.config
　　改Client语法下的AllowedRegions区域，
　　将AllowedRegions区域加入CN;US;EU;KR
　　Regions就是你的登录可以选择的区域，CN就是国服;US美服;EU欧服;KR韩/台服。(根据自己的喜好选择对应的区域)
　　Locales是你的登录器语言，加入zhCN就是简体中文版登录器。
　　"Client":
　　{
　　"AllowedRegions": "CN;US;EU;KR",
　　"AllowedLocales": "zhCN;deDE;enGB;enUS;esMX;esES;frFR;itIT;plPL;ptBR;ruRU;koKR;zhTW"
　　}
　　},
---------------------
修改不成功的看这里：出现这种情况的大部分应该都是安装或者拷贝了几个不同的战网客户端，然后在修改Battle.net.config文件时 没有修改到与自己所使用的客户端相对应的client语法。
①按着上面第一步的方法打开Battle.net.config文件
②找到文件里所有的client语法，把所有client语法下的AllowedRegions、AllowedLocales按照第二步修改，然后保存
③大功告成， 快去下载吧！！

## [萌新指路][国服去美服]怎么去美服玩指南手册！ https://nga.178.com/read.php?tid=39152767&rand=766
