---
title: 远程 GDB + VScode 调试
date: 2020-02-27 22:04:00
sidebar: 'auto'
categories:
 - 二进制翻译
tags:
 - GDB
 - vscode
 - qemu
---

因为疫情，只能在家里完成毕设。而毕设完成的是二进制指令翻译，需要龙芯计算机，所以实验室提供远程访问的服务器。

为了方便调试，一向很懒的我还是喜欢`VScode`的简单方法，对于`GDB`命令行模式还是比较抵触的，在此记录一下如何使用远程方式进行编译。

<!-- more -->

## 服务器端

### 安装 `GDB/GDBserver`

其中最主要的是安装`GDBserver`，编译及安装过程如下：

1. 在 https://ftp.gnu.org/gnu/gdb/ 下载`GDB`源代码;

   ::: tip 提示

    如果下载速度过慢，可以使用国内镜像：https://mirrors.tuna.tsinghua.edu.cn/gnu/gdb/

   :::

2.  用`tar -zxvf`命令解压缩你下载的源码包;

3. 编译安装`GDB` 

   1. 使用 `./configure`  命令生成makefile文件
   2. 执行 `make `
   3. 执行 `make install` 
   4.  查看安装是否成功：`gdb -v  `

4. 编译安装`GDBserver`

   1. 使用`cd ./gdb/gdbserver`进入 `./gdb/gdbserver/`目录
   2. 使用 `./configure`  命令生成makefile文件
   3. 执行 `make `
   4. 执行 `make install` 
   5. 查看安装是否成功：`gdbserver --version  `

::: warning 提示

这里一定要注意 `GDB` 的版本，如果版本过低，会导致无法识别 `gcc -g`  编译文件的调试信息。

:::

## 主机端

### 安装 `GDB`

与在服务器安装 `GDB` 类似：

1. 在 https://ftp.gnu.org/gnu/gdb/ 下载`GDB`源代码;
2.  用`tar -zxvf`命令解压缩你下载的源码包;
3. 编译安装`GDB` 
   1. 使用 `./configure --enable-targets=all `  命令生成makefile文件
   2. 执行 `make `
   3. 执行 `make install` 
   4.  查看安装是否成功：`gdb -v  `

::: tip 提示

要使用 gdb 跨平台远程调试，需要在编译 gdb 的时候开启相关的支持选项，简单的说在 configure 选项中加入 --enable-targets=all 

:::

### 安装 `VScode`

`VScode` 安装没有难点，可以参考 Microsoft 文档：https://code.visualstudio.com/docs/setup/linux

### 配置 `VScode` 

1. 需要安装扩展 `C/C++`

2. 在 `Debug` 界面创建一个配置文件 `launch.json`

3. 配置文件内容模板如下：注意修改  `## `处

   ``` json
   {
       "version": "0.2.0",
       "configurations": [
           {
               "name": "gdb Remote Launch",
               "type": "cppdbg",
               "request": "launch",
               "program": "##Program##",
               "args": ["##arg1##","##arg2##"],
               "stopAtEntry": true,
               "environment": [],
               "externalConsole": false,
               "MIMode": "gdb",
               "miDebuggerPath": "gdb",
               "miDebuggerArgs": "gdb",
               "linux": {
                   "MIMode": "gdb",
                   "miDebuggerPath": "gdb",
                   "miDebuggerServerAddress": "##server IP:PORT##",
               },
               "logging": {
                   "moduleLoad": false,
                   "engineLogging": true,
                   "trace": false
               },
               "setupCommands": [
                   {
                       "description": "Enable pretty-printing for gdb",
                       "text": "-enable-pretty-printing",
                       "ignoreFailures": true
                   }
               ],
               "cwd": "${workspaceFolder}",
           }
       ]
   }
   ```

   `##Program##` 是需要运行程序的地址，`##server IP:PORT##` 是服务器`GDBserver`的地址，`##arg1##` 是相应输入程序的参数。

## 调试方法

### 服务器端

1. 将源代码拷贝到服务器端，进行编译，生成 `test` 文件

   ```shell
   gcc -g test.c -o test
   ```

2. 运行 `GDBserver`

   ``` shell
   gdbserver :port ./test
   ```

   这里，`port` 为自己设定，用于后期与主机的 `GDB` 通信

### 主机端

1. 使用 `scp` 命令，将服务器编译完成可执行文件下载到目录

   ``` shell
   scp -P port user@ip:~/test ./
   ```

2. 在源代码文件夹下打开 `VScode` ，并按照“配置 `VScode`“方法，完成 `GDB` 的配置，其中`##Program##` 是需要运行程序的地址，设置成第一步使用 `scp` 命令下载程序的地址；`##server IP:PORT##` 是服务器`GDBserver`的地址，其中 `IP` 为你服务器地址，`port` 为 `gdbserver :port ./test` 中的 `port` 地址

3. 点击运行，开始调试，即可享受在本地调试一样的感觉。