---
sidebar_position: 1
---

# 自动挂机打怪

## 目标
### G1
暂无简介
```wowmacro
#showtooltip
/target pettarget
/stopmacro [combat]
/targetenemy
/cast 奥术射击(等级 1)
```
### G1-0
```wowmacro
#showtooltip
/target pettarget
/stopmacro [combat]
/target 破碎岭
/cast 奥术射击(等级 1)
```
### G1-1
```wowmacro
#showtooltip
/target pettarget
/stopmacro [combat]
/targetexact 巨型雪人
/cast 奥术射击(等级 1)
```
### G1-2 (类推...)
```wowmacro
#showtooltip
/target pettarget
/stopmacro [combat]
/targetexact 山岭雪人
/cast 奥术射击(等级 1)
```

## 攻击
### GA G2
```wowmacro
#showtooltip
/cast [@pet,dead,exists] 复活宠物; [@pet,noexists] 召唤宠物
/cast 猛禽一击
/cast 猫鼬撕咬
```