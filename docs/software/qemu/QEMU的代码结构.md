---
title: QEMU的代码结构
date: 2020-01-05 17:44:00
sidebar: 'auto'
categories:
 - QEMU
tags:
 - QEMU
 - 二进制翻译
---

<!-- more -->

## QEMU代码结构

### 文件夹结构

```
/hw/ 负责仿真虚拟机上所有的虚拟硬件
/target-xyz/ QEMU能仿真的处理器架构
/tcg/ 负责将TCG op翻译成目标代码
```

### 主要代码文件

```
/target-xyz/translate.c: 负责guest binary -> TCG op的转换
/tcg/tcg.c: TCG主要代码
/tcg/*/tcg-target.c: 负责TCG op -> host binary的转换
/cpu-exec.c: 其中的 cpu-exec() 函数负责寻找下一个TB，如果没找到则进行翻译。最后执行翻译得到的host binary
```

### 重要结构体

```c
struct CPUArchState
// 存在于{/target/xyz/cpu.h}
// struct CPUArchState 是结构相关的，通过typedef定义CPUX86State，存放处理器状态
struct ArchCPU
// 存在于{/target/xyz/cpu.h}
// struct ArchCPU 是结构相关的，通过typedef定义X86CPU
CPUState
// __thread，说明是一个CPU
struct CPUClass
// 存在于{\include\hw\core\cpu.h}
// 里面包含了CPU的类型信息，同时可以说是CPU类的一个封装，类似于父类
// 内部函数通过回调的方式完成“重载”
```

### 重要函数

#### 用户模式

##### 1. `main(...)`

位于 `linux-user/main.c`
其中含有 `cpu_loop()`/`tcg_prologue_init()` / `tcg_region_init()`
在完成相关环境配置后执行 `cpu_loop()`

##### 2. `cpu_loop(CPUArchState *env)`

定义位于 `linux-user/qemu.h`，`#include "cpu.h" ` 根据条件，在 `target/xyz` 找
声明位于 `linux-user/xyz/cpu-loop.c`
内部大致处理如下：

1. 获取CPU状态 -- `env_cpu()`
2. 执行代码 -- `cpu_exec()`
3. 跳出 `cpu_exec()`，说明需要处理异常
4. 判断是否有异常等 -- `switch(trapnr)`
5. 执行异常

##### 3. `env_cpu(CPUArchState *env)`

位于 `include/exec/cpu-all.h`

##### 4. `cpu_exec(CPUState *cpu)`

定义位于`include/exec/cpu-all.h`
声明位于`accel/tcg/cpu-exec.c`
属于整个翻译器的`main execution loop`

1. `sigsetjmp()`
2. `cpu_handle_exception()` 处理异常
3. `cpu_handle_interrupt()` 处理中断
4. `tb_find()` 查找下一个TB
5. `cpu_loop_exec_tb()` 执行TB

#### 系统模式

```c
main(...)
// 存在于{/vl.c}
// 在完成相关环境配置后执行main_loop()
// 函数会在前序的define中被替换成qemu_main()
    
main_loop(...)
// 存在于{/vl.c}
// 开始会判断main_loop_should_exit()，如果没有退出的条件，就执行循环。循环内执行main_loop_wait()和 profile_getclock()。
```

