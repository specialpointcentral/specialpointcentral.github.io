---
title: A New Replacement Algorithm on Content Associative Memory for Binary Translation System 阅读
date: 2021-01-19 10:00:00
sidebar: 'auto'
categories:
 - 二进制翻译
 - 论文阅读
tags:
 - 二进制翻译
---

本文研究了使用CAM对跳转指令进行加速的方法，提出PCBPC算法

<!-- more -->

## 简介

### 研究的问题

使用CAM对跳转指令进行加速

### 定义


- `static-number`：每个间接跳转映射地址个数，不管它重复多少次
- `dynamic-amount`：运行时出现的间接跳转映射地址的数量

### 发现

1. 少量的间接跳转（`static-number`），占据了大量的`dynamic-amount`
1. 很大一部分动态间接跳转映射地址来自返回指令
1. 稳定组：几个间接跳转地址的映射具有稳定的顺序

## PCBPC

### 做法

- CAM逻辑上分为跳转区、备份区和返回区域
  - 跳转区：跳转和调用指令的映射地址
  - 返回区：返回指令的映射地址
  - 备份区：替换出的地址
- 在每个区域单独使用FIFO策略作为替换算法
- 当程序在运行时遇到调用指令时，我们将它的返回地址和相对目标地址插入到CAM中