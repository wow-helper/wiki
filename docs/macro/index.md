---
sidebar_position: 1
---

# 宏（Macro） https://nga.178.com/read.php?tid=19418985 底部有参考资料：

## 显示
### 插件排错
暂无简介
```wowmacro
/console scriptErrors 1 to display LUA errors 显示lua错误
/console scriptErrors 0 to hide LUA errors 隐藏lua错误
这两个命令对你应该有帮助

/console scriptErrors 1
显示lua错误

/console scriptErrors 0
隐藏lua错误
```
### show
显示宏第一个技能的图标，后面如果+空格+技能，就固定显示这个技能图标。
```wowmacro
#show
#show 寒冰箭
```
### showtooltip
```wowmacro
#showtooltip
#showtooltip 寒冰箭
```
和show的功能一样，如果鼠标移动上去还能显示详细内容。
[来源](https://ngabbs.com/read.php?tid=23847500&page=1&rand=403)

## 技能
### nochanneling
在《魔兽世界》的宏命令中，nochanneling 是一个条件，用来检查玩家是否正在进行引导（channeling）类的技能。
当这个条件为真时，宏中的技能或动作就会被执行，反之则不会。

引导技能（channeling spells）是那些需要玩家持续一段时间施放的技能，比如法师的奥术飞弹（Arcane Missiles）或术士的吸取灵魂（Drain Soul）。
在施放这些技能时，玩家需要保持不动且持续施放一段时间。

**/cast** [nochanneling] **法术名称** 这个宏命令的意思是：只有在玩家当前没有施放任何引导类技能时，才会施放指定的法术。
如果玩家正在引导一个技能，这个宏将不会中断引导来施放新技能。
```wowmacro
#showtooltip
/cast [nochanneling] 奥术飞弹
```

在《魔兽世界》的宏命令中，[nochanneling] 和 [nochanneling:技能名] 是两个不同的条件，它们的区别如下：
1. [nochanneling]：
这个条件表示当前没有进行任何引导（channeling）技能。
```wowmacro
/cast [nochanneling] 奥术飞弹
```
这个宏的意思是：只有在玩家没有进行任何引导技能的时候，才会施放奥术飞弹。
2. [nochanneling:技能名]：
这个条件表示当前没有进行特定的引导技能。如果指定的技能正在引导中，宏命令中的技能将不会施放。
```wowmacro
/cast [nochanneling:奥术飞弹] 奥术冲击
```
这个宏的意思是：只有在玩家没有进行奥术飞弹（Arcane Missiles）这个特定的引导技能时，才会施放奥术冲击（Arcane Blast）。
如果玩家正在引导奥术飞弹，那么奥术冲击将不会被施放。

## 选择目标
### targetenemy
/targetenemy 目标敌人(跟TAB一个机制，选正前方90度最远50码由近至远轮流流选目标，只会选视野能看到的目标，不会选遮挡的目标，所有角度内目标选完了重复此过程，DOT职业有用)
```wowmacro
/targetenemy [harm][nodead]
```

## 自动挂机 NGA精华区就有 https://ngabbs.com/read.php?tid=18153442&_fp=2
### 蓝装拾取确认宏 | 防暂离宏 | 自动买东西
```wowmacro
/script T,F=T or 0,F or CreateFrame("frame")if X then X=nil else X=function()local t=GetTime()if t-T>1 then StaticPopup1Button1:Click()T=t end end end F:SetScript ("OnUpdate",X)
开启时：点一次，聊天窗口打印on；关闭时：再点一次窗口打印off。
/script T,F=T or 0,F or CreateFrame("frame")if X then X=nil print("OFF.")else print("ON.") X=function()local t=GetTime()if t-T>1 then StaticPopup1Button2:Click()T=t end end end F:SetScript("OnUpdate",X)
点击1 代表 确定
/script T,F=T or 0,F or CreateFrame("frame")if X then X=nil print("OFF.")else print("ON.") X=function()local t=GetTime()if t-T>1 then StaticPopup1Button1:Click()T=t end end end F:SetScript("OnUpdate",X)
```
```wowmacro
https://ngabbs.com/read.php?pid=359756733&opt=128
宏
防小退宏(可用于不想下线时避免自动小退而再次排队的场景)

魔兽世界必须前台，不可以在休息区域使用，原理为弹出退出游戏20秒倒计时时自动点击取消(依然会处于暂离状态 但不会自动小退)。
如果是在休息区域，AFK会直接小退不会弹出倒计时，也就是无效！如果失效建议禁用所有插件。

使用方法为新建一个宏，内容为下面代码。

普通版:
(开启时：点一次，聊天窗口打印on；关闭时：再点一次窗口打印off。检测方法，尝试小退(返回角色选择)，如果不让你小退，证明宏运行成功。)
但是会自动接受组队 自动释放灵魂等
/script T,F=T or 0,F or CreateFrame("frame")if X then X=nil print("OFF.")else print("ON.") X=function()local t=GetTime()if t-T>1 then StaticPopup1Button2:Click()T=t end end end F:SetScript("OnUpdate",X)

改良版:
不会自动接受组队
/run T,F=T or 0,F or CreateFrame("frame")X=X==nil and function()local t=GetTime()if StaticPopup1:IsShown() and StaticPopup1Button1:GetText()=="取消" and t-T>1 then StaticPopup1Button1:Click()T=t end end or nil;F:SetScript("OnUpdate",X)

https://ngabbs.com/read.php?&tid=18307984&pid=359756733&to=1
```