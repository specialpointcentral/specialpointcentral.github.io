(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{558:function(t,a,s){"use strict";s.r(a);var e=s(6),o=Object(e.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("p",[t._v("该论文主要研究在使用二进制翻译技术后，对于那些含有安全保护的软件的影响。\n通过实验，检查由DBT执行的转换和优化是否影响提供给原始程序的安全性。")]),t._v(" "),s("h2",{attrs:{id:"简介"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#简介"}},[t._v("#")]),t._v(" 简介")]),t._v(" "),s("h3",{attrs:{id:"研究的问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#研究的问题"}},[t._v("#")]),t._v(" 研究的问题")]),t._v(" "),s("p",[t._v("当使用二进制翻译技术后，对于那些含有安全保护的软件有什么影响。\n通过实验，检查由DBT执行的转换和优化是否影响提供给原始程序的安全性。")]),t._v(" "),s("p",[t._v("使用DBT的优势")]),t._v(" "),s("ul",[s("li",[t._v("在潜在的软件安全漏洞(例如缓冲区溢出攻击可能发生的位置)周围添加检查代码")]),t._v(" "),s("li",[t._v("添加一些随机化技术(例如地址或指令集随机化)来阻止攻击")])]),t._v(" "),s("p",[t._v("劣势")]),t._v(" "),s("ul",[s("li",[t._v("可能自身被攻击，特别在用户态下")]),t._v(" "),s("li",[t._v("如何保护它的代码缓存")])]),t._v(" "),s("h3",{attrs:{id:"结论"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#结论"}},[t._v("#")]),t._v(" 结论")]),t._v(" "),s("p",[t._v("对于软件自有安全")]),t._v(" "),s("ol",[s("li",[t._v("静态的安全措施DBT都能比较好的解决")]),t._v(" "),s("li",[t._v("如果代码检查由外部的程序负责，则有一定问题")]),t._v(" "),s("li",[t._v("加密的代码也有可能会让DBT无法识别")])]),t._v(" "),s("p",[t._v("对于DBT自身安全")]),t._v(" "),s("ul",[s("li",[t._v("放入内核部分，以获得操作系统的权限")]),t._v(" "),s("li",[t._v("集成进固件、操作系统")]),t._v(" "),s("li",[t._v("使用硬件保护--TPM、SP(Secret Protection)")])]),t._v(" "),s("h2",{attrs:{id:"相关的保护措施"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#相关的保护措施"}},[t._v("#")]),t._v(" 相关的保护措施")]),t._v(" "),s("ul",[s("li",[t._v("预防缓冲区溢出\n"),s("ul",[s("li",[t._v("Stackshield"),s("sup",{staticClass:"footnote-ref"},[s("a",{attrs:{href:"#fn1"}},[t._v("[1]")]),s("a",{staticClass:"footnote-anchor",attrs:{id:"fnref1"}})])]),t._v(" "),s("li",[t._v("Propolice"),s("sup",{staticClass:"footnote-ref"},[s("a",{attrs:{href:"#fn2"}},[t._v("[2]")]),s("a",{staticClass:"footnote-anchor",attrs:{id:"fnref2"}})]),t._v(" and Stackguard"),s("sup",{staticClass:"footnote-ref"},[s("a",{attrs:{href:"#fn3"}},[t._v("[3]")]),s("a",{staticClass:"footnote-anchor",attrs:{id:"fnref3"}})])]),t._v(" "),s("li",[t._v("Libsafe"),s("sup",{staticClass:"footnote-ref"},[s("a",{attrs:{href:"#fn4"}},[t._v("[4]")]),s("a",{staticClass:"footnote-anchor",attrs:{id:"fnref4"}})])]),t._v(" "),s("li",[t._v("Address space randomization"),s("sup",{staticClass:"footnote-ref"},[s("a",{attrs:{href:"#fn5"}},[t._v("[5]")]),s("a",{staticClass:"footnote-anchor",attrs:{id:"fnref5"}})])])])]),t._v(" "),s("li",[t._v("检测恶意代码修改\n"),s("ul",[s("li",[t._v("Self-checksum"),s("sup",{staticClass:"footnote-ref"},[s("a",{attrs:{href:"#fn6"}},[t._v("[6]")]),s("a",{staticClass:"footnote-anchor",attrs:{id:"fnref6"}})])]),t._v(" "),s("li",[t._v("Watermarking"),s("sup",{staticClass:"footnote-ref"},[s("a",{attrs:{href:"#fn7"}},[t._v("[7]")]),s("a",{staticClass:"footnote-anchor",attrs:{id:"fnref7"}})])])])]),t._v(" "),s("li",[t._v("系统调用\n"),s("ul",[s("li",[t._v("Sandboxing System calls")]),t._v(" "),s("li",[t._v("Authenticated system call"),s("sup",{staticClass:"footnote-ref"},[s("a",{attrs:{href:"#fn8"}},[t._v("[8]")]),s("a",{staticClass:"footnote-anchor",attrs:{id:"fnref8"}})])])])]),t._v(" "),s("li",[t._v("逆向工程\n"),s("ul",[s("li",[t._v("代码混淆")]),t._v(" "),s("li",[t._v("防止debug")]),t._v(" "),s("li",[t._v("随机指令集"),s("sup",{staticClass:"footnote-ref"},[s("a",{attrs:{href:"#fn9"}},[t._v("[9]")]),s("a",{staticClass:"footnote-anchor",attrs:{id:"fnref9"}})])])])]),t._v(" "),s("li",[t._v("安全检测\n"),s("ul",[s("li",[t._v("可信证明"),s("sup",{staticClass:"footnote-ref"},[s("a",{attrs:{href:"#fn10"}},[t._v("[10]")]),s("a",{staticClass:"footnote-anchor",attrs:{id:"fnref10"}})])])])])]),t._v(" "),s("h2",{attrs:{id:"dbt对软件自有安全的研究"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#dbt对软件自有安全的研究"}},[t._v("#")]),t._v(" DBT对软件自有安全的研究")]),t._v(" "),s("h3",{attrs:{id:"研究结果"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#研究结果"}},[t._v("#")]),t._v(" 研究结果")]),t._v(" "),s("p",[t._v("DBT-friendly techniques")]),t._v(" "),s("ul",[s("li",[t._v("Stackshield, Propolice and Stackguard, Libsafe, address space randomization, watermarking, Sandboxing system calls, Proof-Carrying Code")]),t._v(" "),s("li",[t._v("因为他们基本上都是静态的（少部分是装载等方面），DBT按照正常语义翻译都可以成功解决")])]),t._v(" "),s("p",[t._v("DBT-tolerable techniques")]),t._v(" "),s("ul",[s("li",[t._v("Self-checksum")]),t._v(" "),s("li",[t._v("因为DBT一般引用的是原始代码，自校验的都是原始代码")]),t._v(" "),s("li",[t._v("但可能存在某些DBT为了优化对部分原始代码进行了修改，但这容易解决")])]),t._v(" "),s("p",[t._v("DBT-troublesome techniques")]),t._v(" "),s("ul",[s("li",[t._v("code obsfucation, code morphing: 可能会因为DBT而失去作用，但其实问题不大")]),t._v(" "),s("li",[t._v("anti-debugging: 基于时间的其实也问题不大，因为正常运行可能会经历中断、上下文切换，至少翻译后执行不会很差")]),t._v(" "),s("li",[t._v("Authenticated system call: 在运行时可能使用可信的系统调用替换原来的调用，此时由于code cache导致不成功")]),t._v(" "),s("li",[t._v("Instruction set randomization: 主要是硬件问题，DBT需要让硬件解密，这意味着“必须信任DBT才能看到解密的代码，甚至能够访问用于解密的密钥”")])]),t._v(" "),s("h3",{attrs:{id:"总结"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[t._v("#")]),t._v(" 总结")]),t._v(" "),s("ol",[s("li",[t._v("静态的安全措施DBT都能比较好的解决")]),t._v(" "),s("li",[t._v("如果代码检查由外部的程序负责，则有一定问题")]),t._v(" "),s("li",[t._v("加密的代码也有可能会让DBT无法识别")])]),t._v(" "),s("h2",{attrs:{id:"dbt自身安全研究"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#dbt自身安全研究"}},[t._v("#")]),t._v(" DBT自身安全研究")]),t._v(" "),s("p",[t._v("用户态的DBT事实上code cache没有被保护。")]),t._v(" "),s("ul",[s("li",[t._v("放入内核部分，以获得操作系统的权限")]),t._v(" "),s("li",[t._v("集成进固件、操作系统")]),t._v(" "),s("li",[t._v("使用硬件保护--TPM、SP(Secret Protection)")])]),t._v(" "),s("hr",{staticClass:"footnotes-sep"}),t._v(" "),s("section",{staticClass:"footnotes"},[s("ol",{staticClass:"footnotes-list"},[s("li",{staticClass:"footnote-item",attrs:{id:"fn1"}},[s("p",[t._v("Vendicator, Stackshield, available at http://www.angelfire.com/sk/stackshield/ "),s("a",{staticClass:"footnote-backref",attrs:{href:"#fnref1"}},[t._v("↩︎")])])]),t._v(" "),s("li",{staticClass:"footnote-item",attrs:{id:"fn2"}},[s("p",[t._v('Propolice, "GCC extension for protecting applications from stack-smashing attacks", available at http://www.trl.ibm.com/projects/security/ssp/ '),s("a",{staticClass:"footnote-backref",attrs:{href:"#fnref2"}},[t._v("↩︎")])])]),t._v(" "),s("li",{staticClass:"footnote-item",attrs:{id:"fn3"}},[s("p",[t._v("C. Cowan, C. Pu, D. Maier, H. Hinton, J. Walpole, P. Bakke, S. Beattie, A. Grier, P. Wagle, and Q. "),s("a",{staticClass:"footnote-backref",attrs:{href:"#fnref3"}},[t._v("↩︎")])])]),t._v(" "),s("li",{staticClass:"footnote-item",attrs:{id:"fn4"}},[s("p",[t._v("Libsafe, Avaya Labs Research, available at http://www.research.avayalabs.com/gcm/usa/enus/ "),s("a",{staticClass:"footnote-backref",attrs:{href:"#fnref4"}},[t._v("↩︎")])])]),t._v(" "),s("li",{staticClass:"footnote-item",attrs:{id:"fn5"}},[s("p",[t._v('C. Kil, J. Jun, C. Bookholt, J. Xu and P. Ning, "Address space layout permutation (ASLP): Towards '),s("a",{staticClass:"footnote-backref",attrs:{href:"#fnref5"}},[t._v("↩︎")])])]),t._v(" "),s("li",{staticClass:"footnote-item",attrs:{id:"fn6"}},[s("p",[t._v('Horne, B., Matheson, L. R., Sheehan, C., and Tarjan, R. E. 2002. "Dynamic Self-Checking Techniques" '),s("a",{staticClass:"footnote-backref",attrs:{href:"#fnref6"}},[t._v("↩︎")])])]),t._v(" "),s("li",{staticClass:"footnote-item",attrs:{id:"fn7"}},[s("p",[t._v("R. El-Khalil and A.D. Keromytis, \"Hydan: Hiding information in program binaries,\" Proc. 6th Int'l Conf. Information and Communications Security (ICICS'04), LNCS 3269, pp.187–199, Springer, 2004. "),s("a",{staticClass:"footnote-backref",attrs:{href:"#fnref7"}},[t._v("↩︎")])])]),t._v(" "),s("li",{staticClass:"footnote-item",attrs:{id:"fn8"}},[s("p",[t._v('Mohan Rajagopalan, Matti A. Hiltunen, Trevor Jim, Richard D. Schlichting, "System Call Monitoring Using Authenticated System Calls,"IEEE Transactions on Dependable and Secure Computing ,vol. 3, no. 3, pp. 216-229, July-September, 2006. '),s("a",{staticClass:"footnote-backref",attrs:{href:"#fnref8"}},[t._v("↩︎")])])]),t._v(" "),s("li",{staticClass:"footnote-item",attrs:{id:"fn9"}},[s("p",[t._v('Kc, G. S., Keromytis, A. D., and Prevelakis, V. 2003. "Countering code-injection attacks with instruction-set randomization." In Proceedings of the 10th ACM Conference on Computer and Communications Security (Washington D.C., USA, October 27 - 30, 2003). CCS \'03. ACM, New York, NY, 272-280. '),s("a",{staticClass:"footnote-backref",attrs:{href:"#fnref9"}},[t._v("↩︎")])])]),t._v(" "),s("li",{staticClass:"footnote-item",attrs:{id:"fn10"}},[s("p",[t._v('George Necula, "Proof-carrying code", In 24th ACM SIGPLAN-SIGACT Symposium on Principles of Programming Languages, pages 106–119, New York, January 1997. ACM Press. '),s("a",{staticClass:"footnote-backref",attrs:{href:"#fnref10"}},[t._v("↩︎")])])])])])])}),[],!1,null,null,null);a.default=o.exports}}]);