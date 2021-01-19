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

## 简介

### 研究的问题

当使用二进制翻译技术后，对于那些含有安全保护的软件有什么影响。
检查由DBT执行的转换和优化是否影响提供给原始程序的安全性。

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

## 实验方式及结果
