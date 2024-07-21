---
sidebar_position: 1
---

# 宏（Macro）

## 显示
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
