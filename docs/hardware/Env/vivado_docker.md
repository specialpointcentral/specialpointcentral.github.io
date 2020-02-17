---
title: 使用docker部署vivado
date: 2019-11-15 10:50:00
sidebar: 'auto'
categories:
 - Vivado
tags:
 - Docker
 - Vivado
---

使用CI工具自动构建vivado项目（一）

<!-- more -->

## 下载vivado二进制安装文件

1. 进入网站https://china.xilinx.com/support/download.html
2. 因为在ubuntu环境下运行，所以选择[Vivado HLx 2019.2:  All OS installer Single-File Download](https://china.xilinx.com/member/forms/download/xef.html?filename=Xilinx_Vivado_2019.2_1106_2127.tar.gz)，全量安装包

## 使用命令行模式安装vivado

::: tip 
注意由于vivado是安装在`ubuntu server`版本下，所以需要使用命令行模式安装vivado

命令行安装vivado有两种模式，具体可以参考UG973
:::

### 使用Web Installer

1. 解压安装系统

   使用以下命令解压：

   ``` shell
   <Download Dir>/Xilinx_Vivado_VITIS_Web_201X.Y_MMDD_HHMM_Lin64.bin --keep --noexec --target <WI Client Dir>
   ```

   解压完成后会出现`xsetup`文件

2. 创建配置文件

   使用命令行模式，需要加入开关`-b`或者`--batch`

   ``` shell
   xsetup -b ConfigGen
   ```

   选择相应的选项，完成config文件的生成，如下是一个例子：

   ``` text
   #### Vivado HL WebPACK Install Configuration ####
   Edition=Vivado HL WebPACK
   
   Product=Vivado
   
   # Path where Xilinx software will be installed.
   Destination=/tools/Xilinx
   
   # Choose the Products/Devices the you would like to install.
   Modules=Virtex UltraScale+ HBM:1,Zynq UltraScale+ MPSoC:1,DocNav:1,Kintex UltraScale:1,Zynq-7000:1,System Generator for DSP:0,Virtex UltraScale+:1,Kintex UltraScale+:1,Model Composer:0
   
   # Choose the post install scripts you'd like to run as part of the finalization step. Please note that some of these scripts may require user interaction during runtime.
   InstallOptions=
   
   ## Shortcuts and File associations ##
   # Choose whether Start menu/Application menu shortcuts will be created or not.
   CreateProgramGroupShortcuts=1
   
   # Choose the name of the Start menu/Application menu shortcut. This setting will be ignored if you choose NOT to create shortcuts.
   ProgramGroupFolder=Xilinx Design Tools
   
   # Choose whether shortcuts will be created for All users or just the Current user. Shortcuts can be created for all users only if you run the installer as administrator.
   CreateShortcutsForAllUsers=0
   
   # Choose whether shortcuts will be created on the desktop or not.
   CreateDesktopShortcuts=1
   
   # Choose whether file associations will be created or not.
   CreateFileAssociation=1
   
   # Choose whether disk usage will be optimized (reduced) after installation
   EnableDiskUsageOptimization=1
   ```

   ::: tip Note 
   这些选项对应的GUI中的选择，1代表安装，0代表不安装
   :::

3. 获取许可密钥

   在下载和安装过程中需要许可密钥，所以需要请求许可密钥，同时许可密钥有效时间为7天

   ``` shell
   xsetup -b AuthTokenGen
   ```

   此时需要输入你的用户名与密码

4. 下载与安装

   你需要同意许可，使用`-a`或者`--agree`；使用config文件需要加入开关`-c`或`--config`

   ``` shell
   xsetup -a XilinxEULA,3rdPartyEULA,WebTalkTerms -b Install -c install_config.txt
   ```

### 使用Full Package

::: tip Note 
使用与Web Installer类似
:::


未完待续...
