---
title: Impact of Dynamic Binary Translators on Security 阅读
date: 2021-01-19 10:00:00
sidebar: 'auto'
categories:
 - 二进制翻译
 - 论文阅读
tags:
 - 二进制翻译
---

该论文主要研究在使用二进制翻译技术后，对于那些含有安全保护的软件的影响。
通过实验，检查由DBT执行的转换和优化是否影响提供给原始程序的安全性。

<!-- more -->

## 简介

### 研究的问题

当使用二进制翻译技术后，对于那些含有安全保护的软件有什么影响。
通过实验，检查由DBT执行的转换和优化是否影响提供给原始程序的安全性。

使用DBT的优势

- 在潜在的软件安全漏洞(例如缓冲区溢出攻击可能发生的位置)周围添加检查代码
- 添加一些随机化技术(例如地址或指令集随机化)来阻止攻击

劣势

- 可能自身被攻击，特别在用户态下
- 如何保护它的代码缓存

### 结论

## 相关的保护措施

- 预防缓冲区溢出
  - Stackshield[^1]
  - Propolice[^2] and Stackguard[^3]
  - Libsafe[^4]
  - Address space randomization[^5]
- 检测恶意代码修改
  - Self-checksum[^6]
  - Watermarking[^7]
- 系统调用
  - Sandboxing System calls
  - Authenticated system call[^8]
- 逆向工程
  - 代码混淆
  - 防止debug
  - 随机指令集[^9]
- 安全检测
  - 可信证明[^10]

[^1]: Vendicator, Stackshield, available at http://www.angelfire.com/sk/stackshield/
[^2]: Propolice, "GCC extension for protecting applications from stack-smashing attacks", available at http://www.trl.ibm.com/projects/security/ssp/
[^3]: C. Cowan, C. Pu, D. Maier, H. Hinton, J. Walpole, P. Bakke, S. Beattie, A. Grier, P. Wagle, and Q.
[^4]: Libsafe, Avaya Labs Research, available at http://www.research.avayalabs.com/gcm/usa/enus/
[^5]: C. Kil, J. Jun, C. Bookholt, J. Xu and P. Ning, "Address space layout permutation (ASLP): Towards
[^6]: Horne, B., Matheson, L. R., Sheehan, C., and Tarjan, R. E. 2002. "Dynamic Self-Checking Techniques"
[^7]: R. El-Khalil and A.D. Keromytis, "Hydan: Hiding information in program binaries," Proc. 6th Int'l Conf. Information and Communications Security (ICICS'04), LNCS 3269, pp.187–199, Springer, 2004.
[^8]: Mohan Rajagopalan, Matti A. Hiltunen, Trevor Jim, Richard D. Schlichting, "System Call Monitoring Using Authenticated System Calls,"IEEE Transactions on Dependable and Secure Computing ,vol. 3, no. 3, pp. 216-229, July-September, 2006.
[^9]: Kc, G. S., Keromytis, A. D., and Prevelakis, V. 2003. "Countering code-injection attacks with instruction-set randomization." In Proceedings of the 10th ACM Conference on Computer and Communications Security (Washington D.C., USA, October 27 - 30, 2003). CCS '03. ACM, New York, NY, 272-280.
[^10]: George Necula, "Proof-carrying code", In 24th ACM SIGPLAN-SIGACT Symposium on Principles of Programming Languages, pages 106–119, New York, January 1997. ACM Press.

## DBT对软件自有安全的研究

### 研究结果

DBT-friendly techniques

- Stackshield, Propolice and Stackguard, Libsafe, address space randomization, watermarking, Sandboxing system calls, Proof-Carrying Code
- 因为他们基本上都是静态的（少部分是装载等方面），DBT按照正常语义翻译都可以成功解决

DBT-tolerable techniques

- Self-checksum
- 因为DBT一般引用的是原始代码，自校验的都是原始代码
- 但可能存在某些DBT为了优化对部分原始代码进行了修改，但这容易解决

DBT-troublesome techniques

- code obsfucation, code morphing: 可能会因为DBT而失去作用，但其实问题不大
- anti-debugging: 基于时间的其实也问题不大，因为正常运行可能会经历中断、上下文切换，至少翻译后执行不会很差
- Authenticated system call: 在运行时可能使用可信的系统调用替换原来的调用，此时由于code cache导致不成功
- Instruction set randomization: 主要是硬件问题，DBT需要让硬件解密，这意味着“必须信任DBT才能看到解密的代码，甚至能够访问用于解密的密钥”

### 总结

1. 静态的安全措施DBT都能比较好的解决
1. 如果代码检查由外部的程序负责，则有一定问题
1. 加密的代码也有可能会让DBT无法识别

## DBT自身安全研究

用户态的DBT事实上code cache没有被保护。

- 放入内核部分，以获得操作系统的权限
- 集成进固件、操作系统
- 使用硬件保护--TPM、SP(Secret Protection)