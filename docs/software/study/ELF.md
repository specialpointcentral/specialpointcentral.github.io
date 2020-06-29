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

可以通过命令`readrlf -h program`方式查看：

```bash
$ readelf -h ossfs
ELF Header:
  Magic:   7f 45 4c 46 02 01 01 00 00 00 00 00 00 00 00 00 
  Class:                             ELF64
  Data:                              2's complement, little endian
  Version:                           1 (current)
  OS/ABI:                            UNIX - System V
  ABI Version:                       0
  Type:                              EXEC (Executable file)
  Machine:                           Advanced Micro Devices X86-64
  Version:                           0x1
  Entry point address:               0x40a0ed
  Start of program headers:          64 (bytes into file)
  Start of section headers:          4415144 (bytes into file)
  Flags:                             0x0
  Size of this header:               64 (bytes)
  Size of program headers:           56 (bytes)
  Number of program headers:         9
  Size of section headers:           64 (bytes)
  Number of section headers:         38
  Section header string table index: 37
```



#### 段表

ELF 头部中，`e_shoff `成员给出从文件头到段表的偏移字节数；`e_shnum `给出表格中条目数目（段的数量）；`e_shentsize `给出每个项目的字节数（段表描述符大小）。从这些信息中可以确切地定 位节区的具体位置、长度。

段表构成非常简单，就是以`Elf32_Shdr` 结构体为元素的数组构成。数组元素个数等于段的个数（`e_shnum `）。

段表每一项（又称段描述符）的数据结构如下：

```c
/* Section Header */
typedef struct {
	Elf32_Word	sh_name;	/* name - index into section header
					   		string table section */
	Elf32_Word	sh_type;	/* type */
	Elf32_Word	sh_flags;	/* flags */
	Elf32_Addr	sh_addr;	/* address */
	Elf32_Off	sh_offset;	/* file offset */
	Elf32_Word	sh_size;	/* section size */
	Elf32_Word	sh_link;	/* section header table index link */
	Elf32_Word	sh_info;	/* extra information */
	Elf32_Word	sh_addralign;	/* address alignment */
	Elf32_Word	sh_entsize;	/* section entry size */
} Elf32_Shdr;
typedef struct {
	Elf64_Half	sh_name;	/* section name */
	Elf64_Half	sh_type;	/* section type */
	Elf64_Xword	sh_flags;	/* section flags */
	Elf64_Addr	sh_addr;	/* virtual address */
	Elf64_Off	sh_offset;	/* file offset */
	Elf64_Xword	sh_size;	/* section size */
	Elf64_Half	sh_link;	/* link to another */
	Elf64_Half	sh_info;	/* misc info */
	Elf64_Xword	sh_addralign;	/* memory alignment */
	Elf64_Xword	sh_entsize;	/* table entry size */
} Elf64_Shdr;
```

段表数据可以通过命令`readrlf -S program`方式查看：

```bash
$ readelf -S hello 
There are 30 section headers, starting at offset 0x1928:

Section Headers:
  [Nr] Name              Type             Address           Offset
       Size              EntSize          Flags  Link  Info  Align
  [ 0]                   NULL             0000000000000000  00000000
       0000000000000000  0000000000000000           0     0     0
  [ 1] .interp           PROGBITS         0000000000400238  00000238
       000000000000001c  0000000000000000   A       0     0     1
  [ 2] .note.ABI-tag     NOTE             0000000000400254  00000254
       0000000000000020  0000000000000000   A       0     0     4
  [ 3] .note.gnu.build-i NOTE             0000000000400274  00000274
       0000000000000024  0000000000000000   A       0     0     4
  [ 4] .gnu.hash         GNU_HASH         0000000000400298  00000298
       000000000000001c  0000000000000000   A       5     0     8
  [ 5] .dynsym           DYNSYM           00000000004002b8  000002b8
       0000000000000060  0000000000000018   A       6     1     8
  [ 6] .dynstr           STRTAB           0000000000400318  00000318
       000000000000003f  0000000000000000   A       0     0     1
  [ 7] .gnu.version      VERSYM           0000000000400358  00000358
       0000000000000008  0000000000000002   A       5     0     2
  [ 8] .gnu.version_r    VERNEED          0000000000400360  00000360
       0000000000000020  0000000000000000   A       6     1     8
  [ 9] .rela.dyn         RELA             0000000000400380  00000380
       0000000000000018  0000000000000018   A       5     0     8
  [10] .rela.plt         RELA             0000000000400398  00000398
       0000000000000048  0000000000000018  AI       5    23     8
  [11] .init             PROGBITS         00000000004003e0  000003e0
       000000000000001a  0000000000000000  AX       0     0     4
  [12] .plt              PROGBITS         0000000000400400  00000400
       0000000000000040  0000000000000010  AX       0     0     16
  [13] .text             PROGBITS         0000000000400440  00000440
       00000000000001b2  0000000000000000  AX       0     0     16
  [14] .fini             PROGBITS         00000000004005f4  000005f4
       0000000000000009  0000000000000000  AX       0     0     4
  [15] .rodata           PROGBITS         0000000000400600  00000600
       0000000000000013  0000000000000000   A       0     0     8
  [16] .eh_frame_hdr     PROGBITS         0000000000400614  00000614
       0000000000000034  0000000000000000   A       0     0     4
  [17] .eh_frame         PROGBITS         0000000000400648  00000648
       00000000000000f4  0000000000000000   A       0     0     8
  [18] .init_array       INIT_ARRAY       0000000000600e10  00000e10
       0000000000000008  0000000000000008  WA       0     0     8
  [19] .fini_array       FINI_ARRAY       0000000000600e18  00000e18
       0000000000000008  0000000000000008  WA       0     0     8
  [20] .jcr              PROGBITS         0000000000600e20  00000e20
       0000000000000008  0000000000000000  WA       0     0     8
  [21] .dynamic          DYNAMIC          0000000000600e28  00000e28
       00000000000001d0  0000000000000010  WA       6     0     8
  [22] .got              PROGBITS         0000000000600ff8  00000ff8
       0000000000000008  0000000000000008  WA       0     0     8
  [23] .got.plt          PROGBITS         0000000000601000  00001000
       0000000000000030  0000000000000008  WA       0     0     8
  [24] .data             PROGBITS         0000000000601030  00001030
       0000000000000004  0000000000000000  WA       0     0     1
  [25] .bss              NOBITS           0000000000601034  00001034
       0000000000000004  0000000000000000  WA       0     0     1
  [26] .comment          PROGBITS         0000000000000000  00001034
       000000000000002d  0000000000000001  MS       0     0     1
  [27] .symtab           SYMTAB           0000000000000000  00001068
       00000000000005e8  0000000000000018          28    46     8
  [28] .strtab           STRTAB           0000000000000000  00001650
       00000000000001cc  0000000000000000           0     0     1
  [29] .shstrtab         STRTAB           0000000000000000  0000181c
       0000000000000108  0000000000000000           0     0     1
Key to Flags:
  W (write), A (alloc), X (execute), M (merge), S (strings), I (info),
  L (link order), O (extra OS processing required), G (group), T (TLS),
  C (compressed), x (unknown), o (OS specific), E (exclude),
  l (large), p (processor specific)
```

