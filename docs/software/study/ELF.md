---
title: ELF文件格式分析
date: 2020-06-29 17:56:00
sidebar: 'auto'
categories:
 - 二进制翻译
tags:
 - ELF
---

可执行链接格式(Executable and Linking Format)最初是由 UNIX 系统实验室(UNIX System Laboratories，USL)开发并发布的，作为应用程序二进制接口(Application Binary Interface，ABI)的一部分。

<!-- more -->

## 简介

ELF文件标准将系统中采用的ELF格式文件归为4类：

| ELF文件类型                      | 说明                                                         | 示例      |
| -------------------------------- | ------------------------------------------------------------ | --------- |
| 可重定位文件(Relocatable File)   | 包含适合于与其他目标文件链接来创建可执行文件或者共享目标文件的代码和数据 | .o/.obj   |
| 可执行文件(Executable File)      | 包含适合于执行的一个程序，此文件规定了exec() 如何创建一个程序的进程映像 | .exe      |
| 共享目标文件(Shared Object File) | 包含可在两种上下文中链接的代码和数据。首先链接编辑器可以将它和其它可重定位文件和共享目标文件一起处理，生成另外一个目标文件。其次动态链接器(Dynamic Linker)可能将它与某个可执行文件以及其它共享目标一起组合，创建进程映像 | .so/.dll  |
| 核心转储文件(Core Dump File)     | 意外终止等，系统将进程地址空间的内容及终止时的一些信息转储到核心转储文件 | core dump |

可以通过：

``` bash
$ file foobar.o
$ file /bin/bash
$ file /lib/ld-2.6.so
```

查看对应ELF文件信息

## ELF文件格式

### ELF文件格式

目标文件既要参与程序链接又要参与程序执行。出于方便性和效率考虑，目标文件格式提供了两种并行视图，分别反映了这些活动的不同需求。 

<img src="ELF\1.png" alt="目标文件格式" style="width: 400px;" />

文件开始处是一个 ELF 头部(ELF Header)，用来描述整个文件的组织。节区部 分包含链接视图的大量信息:指令、数据、符号表、重定位信息等等。 

程序头部表(Program Header Table)，如果存在的话，告诉系统如何创建进程映像。用来构造进程映像的目标文件必须具有程序头部表，可重定位文件不需要这个表。

节区头部表(Section Heade Table)包含了描述文件节区的信息，每个节区在表中 都有一项，每一项给出诸如节区名称、节区大小这类信息。用于链接的目标文件必须包 含节区头部表，其他目标文件可以有，也可以没有这个表。

**注意：** 尽管图中显示的各个组成部分是有顺序的，实际上除了 ELF 头部表以外， 其他节区和段都没有规定的顺序

### ELF文件数据结构

#### ELF Header 部分

 ELF Header 部分描述了整个文件的基本属性，如ELF文件版本号、目标机器型号、程序入口地址等等。可以用以下的数据结构表示：

```c
/* ELF Header */
typedef struct elfhdr {
	unsigned char	e_ident[EI_NIDENT]; /* ELF Identification */
	Elf32_Half	e_type;			/* object file type */
	Elf32_Half	e_machine;		/* machine */
	Elf32_Word	e_version;		/* object file version */
	Elf32_Addr	e_entry;		/* virtual entry point */
	Elf32_Off	e_phoff;		/* program header table offset */
	Elf32_Off	e_shoff;		/* section header table offset */
	Elf32_Word	e_flags;		/* processor-specific flags */
	Elf32_Half	e_ehsize;		/* ELF header size */
	Elf32_Half	e_phentsize;	/* program header entry size */
	Elf32_Half	e_phnum;		/* number of program header entries */
	Elf32_Half	e_shentsize;	/* section header entry size */
	Elf32_Half	e_shnum;		/* number of section header entries */
	Elf32_Half	e_shstrndx;		/* section header table's "section 
					   			header string table" entry offset */
} Elf32_Ehdr;

typedef struct {
	unsigned char	e_ident[EI_NIDENT];	/* Id bytes */
	Elf64_Quarter	e_type;		/* file type */
	Elf64_Quarter	e_machine;	/* machine type */
	Elf64_Half		e_version;	/* version number */
	Elf64_Addr		e_entry;	/* entry point */
	Elf64_Off		e_phoff;	/* Program hdr offset */
	Elf64_Off		e_shoff;	/* Section hdr offset */
	Elf64_Half		e_flags;	/* Processor flags */
	Elf64_Quarter	e_ehsize;	/* sizeof ehdr */
	Elf64_Quarter	e_phentsize;/* Program header entry size */
	Elf64_Quarter	e_phnum;	/* Number of program headers */
	Elf64_Quarter	e_shentsize;/* Section header entry size */
	Elf64_Quarter	e_shnum;	/* Number of section headers */
	Elf64_Quarter	e_shstrndx;	/* String table index */
} Elf64_Ehdr;
```

其中， e_ident 数组给出了 ELF 的一些标识信息，这个数组中不同下标的含义如表所示：

<img src="ELF\3.png" alt="e_ident标志索引" style="width: 450px;" />

这些索引访问包含以下数值的字节 ：

<img src="ELF\4.png" alt="索引包含字节" style="width:600px;" />

e_ident[EI_MAG0]~e_ident[EI_MAG3]即e_ident[0]~e_ident[3]被称为魔数（Magic Number）,其值一般为0x7f,’E’,’L’,’F’。

e_ident[EI_CLASS]（即e_ident[4]）识别目标文件运行在目标机器的类别，取值可为三种值：ELFCLASSNONE（0）非法类别；ELFCLASS32（1）32位目标；ELFCLASS64（2）64位目标。

e_ident[EI_DATA]（即e_ident[5]）：给出处理器特定数据的数据编码方式。即大端还是小端方式。取值可为3种：ELFDATANONE（0）非法数据编码；ELFDATA2LSB（1）高位在前；ELFDATA2MSB（2）低位在前。 

ELF Header 中各个字段的说明如表： 

<img src="ELF\5.png" alt="ELF header各字段说明" style="width:600px;" />