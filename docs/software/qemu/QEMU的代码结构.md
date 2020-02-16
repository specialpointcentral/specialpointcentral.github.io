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
```
存在于 `{/target/xyz/cpu.h}`
`struct CPUArchState` 是结构相关的，通过`typedef`定义`CPUX86State`，存放处理器状态

```c
struct ArchCPU
```
存在于 `{/target/xyz/cpu.h}`
`struct ArchCPU` 是结构相关的，通过`typedef`定义`X86CPU`
其中包含 `CPUState` 以及 `CPUArchState`

```c
struct CPUState
```
CPU现在状态
`env_ptr` 指向  `CPUArchState`

```c
struct CPUClass
```
存在于 `{\include\hw\core\cpu.h}`
里面包含了CPU的类型信息，同时可以说是CPU类的一个封装，类似于父类
内部函数通过回调的方式完成“重载”

### 重要函数

#### 用户模式

##### 1. `main(...)`

位于 `linux-user/main.c`
其中含有 `cpu_loop()`/`tcg_prologue_init()` / `tcg_region_init()` / `get_elf_eflags()`
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

1. `sigsetjmp()` 保存现场寄存器，方便后续跳回（使用  `siglongjmp()`）
2. `cpu_handle_exception()` 处理异常
3. `cpu_handle_interrupt()` 处理中断
4. `tb_find()` 查找下一个TB
5. `cpu_loop_exec_tb()` 执行TB

##### 5. `tb_find()`

位于 `accel/tcg/cpu-exec.c`

```c
static inline TranslationBlock *tb_find(CPUState *cpu,
                                        TranslationBlock *last_tb,
                                        int tb_exit, uint32_t cf_mask)
```

1. `tb_lookup__cpu_state()` 通过 `CPUState `等，完成对于TB的获取
2. `if(未找到) tb_gen_code()`，同时将翻译完成的加入`cpu->tb_jmp_cache`中
3. 如果有上一个TB，将这个TB链接到他的后面 -- ` tb_add_jump()`

##### 6. `cpu_loop_exec_tb()`

位于 `accel/tcg/cpu-exec.c`

```c
static inline void cpu_loop_exec_tb(CPUState *cpu, 
                                    TranslationBlock *tb,
                                    TranslationBlock **last_tb, int *tb_exit)
```

> ? `trace_exec_tb()` 从何而来

1. `cpu_tb_exec()` 执行一个TB

##### 7. `tb_lookup__cpu_state()`

位于 `accel/tcg/cpu-exec.c`

```c
static inline TranslationBlock *
						tb_lookup__cpu_state(CPUState *cpu, 
											target_ulong *pc, target_ulong *cs_base,
                                         	uint32_t *flags, uint32_t cf_mask)
```

1. 获取CPU状态 -- `cpu_get_tb_cpu_state()`
2. 获取TB的hash -- `tb_jmp_cache_hash_func()`
3. 从 `cpu->tb_jmp_cache` 获取TB，如果获取到，并且判断正确（因为可能产生hash冲突），则返回tb
4. 如果第3步没有有效的TB，去cache里面找 -- `tb_htable_lookup()`，并且放入 `cpu->tb_jmp_cache`

##### 8. `tb_gen_code()`

位于 `accel/tcg/translate-all.c`

```C
TranslationBlock *tb_gen_code(CPUState *cpu,
                              target_ulong pc, target_ulong cs_base,
                              uint32_t flags, int cflags)
```

1. 分配TB空间 -- `tcg_tb_alloc(tcg_ctx)`

2. 翻译成中间代码 -- `gen_intermediate_code()`

3. 翻译成宿主代码 -- `tcg_gen_code()`

   > 这里还需要进一步查看

##### 9. `cpu_tb_exec()`

1. 执行TC --  `tcg_qemu_tb_exec()`，通过 `tb->tc.ptr` 获得TC的地址

2. 根据 `ret` 进行相应操作

   > 这里还需要进一步查看

##### 10. `tcg_qemu_tb_exec()`

```c
#define tcg_qemu_tb_exec(env, tb_ptr) \
    ((uintptr_t (*)(void *, void *))tcg_ctx->code_gen_prologue)(env, tb_ptr)
```

定位到 `code_gen_prologue()`

> 位于 `tcg.c`
>
> `size_t code_gen_buffer_size`
>
> `void *code_gen_buffer`
>
> `void *code_gen_prologue`
>
> `void *code_gen_epilogue`
>
> `void *code_gen_ptr`
>
> `void *data_gen_ptr`
>
> `tcg_insn_unit *code_ptr`

##### 11. `tcg_tb_alloc(tcg_ctx)`

##### 12. `gen_intermediate_code()`

##### 13. `tcg_gen_code()`

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

