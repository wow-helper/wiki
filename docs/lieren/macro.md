---
sidebar_position: 1
---

# 专属宏

## 显示
### 宝宝复合宏
暂无简介
```wowmacro
#showtooltip
/cast [@pet,dead] 复活宠物; [nopet] 召唤宠物; 治疗宠物
```
### 挂机
- 17级 西部荒野 萨丁农场
- 17级 西部荒野 中立螃蟹
```wowmacro
/p 挂机中，有事密语。
/cast [@pet,dead,exists] 复活宠物; [@pet,noexists] 召唤宠物
/petattack
/cast 猛禽一击
/cast !自动射击
/stopmacro [exists]
/targetenemy
```
### 挂机原始
```wowmacro
/cast [@pet,dead,exists] 复活宠物; [@pet,noexists] 召唤宠物
/cast !自动射击
/castsequence reset=target 猫鼬撕咬,猛禽一击
/petattack
/stopmacro [exists]
/targetenemy
```

### 测试
```wowmacro
/cast 奥术射击
/cast 猫鼬撕咬
/cast 猛禽一击
/cast !自动射击
```

### 队列
```wowmacro
/castsequence reset=1 猫鼬撕咬, 猛禽一击, 奥术射击
```


### 自动喂食的
```wowmacro
#showtooltip
/cast 喂养宠物
/use 食物名称
```
```wowmacro
还有更简单的
#showtooltip [pet:风蛇] 魔法甜面包; [pet:豹] 烤鹌鹑; [pet:猫头鹰] 烤鹌鹑
/cast 喂养宠物
/use [pet:风蛇] 魔法甜面包
/use [pet:风蛇] 大块的硬面包
/use [pet:豹] 烤鹌鹑
/use [pet:猫头鹰] 烤鹌鹑
一键直接喂
用的时候把宠物种类和食物改成自己平时用的就行了

https://bbs.nga.cn/read.php?&tid=18375998&pid=396739279&to=1
```


### 技能绑定宠物进攻宏
/petassist 是《魔兽世界》中的一个宠物命令，用来设置宠物的行为模式为 协助模式。

在游戏中，宠物有以下四种主要行为模式：
- 防御模式（/petdefensive）：宠物会优先攻击攻击你的敌人或你的目标。
- 被动模式（/petpassive）：宠物会停止攻击，不会主动行动，完全由你手动指挥。
- 协助模式（/petassist）：宠物会自动协助你攻击当前目标，但不会主动攻击其他目标。
- 攻击模式（/petaggressive）：宠物主动攻击附近的敌人。
```wowmacro
#showtooltip
/cast 技能
/petassist
/petattack
```

### 技能绑定宠物跟随（停止）宏
```wowmacro
#showtooltip
/cast 技能
/petfollow
/petpassive
```
