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
