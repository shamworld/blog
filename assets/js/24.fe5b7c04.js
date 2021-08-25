(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{460:function(t,e,s){"use strict";s.r(e);var a=s(37),r=Object(a.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"搭建-flutter-开发环境"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#搭建-flutter-开发环境"}},[t._v("#")]),t._v(" 搭建 Flutter 开发环境")]),t._v(" "),s("p",[t._v("搭建 Flutter 开发环境，有两部分：")]),t._v(" "),s("h3",{attrs:{id:"_1-flutter-sdk"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-flutter-sdk"}},[t._v("#")]),t._v(" 1. Flutter SDK")]),t._v(" "),s("p",[t._v("Flutter 开发需要安装 Flutter SDK，这里会分别介绍 Flutter SDK 在 Windows、MacOS、Linux 三个平台上的安装过程。")]),t._v(" "),s("h3",{attrs:{id:"_2-flutter-ide"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-flutter-ide"}},[t._v("#")]),t._v(" 2. Flutter IDE")]),t._v(" "),s("p",[t._v("安装完 Flutter SDK 后，想要开发 Flutter，还需要 IDE ，可以开发 Flutter 的 IDE 有两个：")]),t._v(" "),s("ul",[s("li",[t._v("Android Studio")]),t._v(" "),s("li",[t._v("VS Code")])]),t._v(" "),s("p",[t._v("这两个 IDE，你可以根据自己的习惯选择一个。但是推荐使用 VS Code，因为其运行不会占用太多的内存，小巧方便，功能强大。")]),t._v(" "),s("h2",{attrs:{id:"配置-flutter-中国镜像"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#配置-flutter-中国镜像"}},[t._v("#")]),t._v(" 配置 Flutter 中国镜像")]),t._v(" "),s("p",[t._v("在搭建 Flutter 环境之前，因为众所周知的原因，有可能被墙，所以需要先为 Flutter 配置中国镜像。")]),t._v(" "),s("h3",{attrs:{id:"中国镜像地址"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#中国镜像地址"}},[t._v("#")]),t._v(" 中国镜像地址")]),t._v(" "),s("p",[t._v("国内有两个镜像可以用，一个就是官方 Flutter 社区的国内镜像，另一个是上海交通大学 Linux 用户组的镜像，建议用官方 Flutter 社区的国内镜像。")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("Flutter 社区")]),t._v(" "),s("p",[t._v("FLUTTER_STORAGE_BASE_URL: https://storage.flutter-io.cn")]),t._v(" "),s("p",[t._v("PUB_HOSTED_URL: https://pub.flutter-io.cn")])]),t._v(" "),s("li",[s("p",[t._v("上海交通大学 Linux 用户组")]),t._v(" "),s("p",[t._v("FLUTTER_STORAGE_BASE_URL: https://mirrors.sjtug.sjtu.edu.cn")]),t._v(" "),s("p",[t._v("PUB_HOSTED_URL: https://dart-pub.mirrors.sjtug.sjtu.edu.cn")])])]),t._v(" "),s("h3",{attrs:{id:"配置方法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#配置方法"}},[t._v("#")]),t._v(" 配置方法")]),t._v(" "),s("p",[t._v("需要设置两个环境变量："),s("code",[t._v("PUB_HOSTED_URL")]),t._v(" 和 "),s("code",[t._v("FLUTTER_STORAGE_BASE_URL")]),t._v("。")]),t._v(" "),s("h4",{attrs:{id:"windows"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#windows"}},[t._v("#")]),t._v(" Windows")]),t._v(" "),s("ol",[s("li",[s("p",[s("code",[t._v("计算机")]),t._v(" -> "),s("code",[t._v("属性")]),t._v(" -> "),s("code",[t._v("高级系统设置")]),t._v(" -> "),s("code",[t._v("环境变量")]),t._v("，打开环境变量设置框。")])]),t._v(" "),s("li",[s("p",[t._v("在用户变量下，选择"),s("code",[t._v("新建环境变量")]),t._v("，添加如下的两个环境变量和值：")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("变量名")]),t._v(" "),s("th",[t._v("值")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("FLUTTER_STORAGE_BASE_URL")]),t._v(" "),s("td",[t._v("https://storage.flutter-io.cn")])]),t._v(" "),s("tr",[s("td",[t._v("PUB_HOSTED_URL")]),t._v(" "),s("td",[t._v("https://pub.flutter-io.cn")])])])])])]),t._v(" "),s("h4",{attrs:{id:"linux"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#linux"}},[t._v("#")]),t._v(" Linux")]),t._v(" "),s("p",[t._v("打开 "),s("code",[t._v("~/.bashrc")]),t._v(":")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("$vim ~/.bashrc\n")])])]),s("p",[t._v("将镜像加入环境变量：")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("export PUB_HOSTED_URL=https://pub.flutter-io.cn\nexport FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn\n")])])]),s("p",[t._v("保存后，在运行")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("$source ~/.bashrc\n")])])]),s("h4",{attrs:{id:"macos"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#macos"}},[t._v("#")]),t._v(" MacOS")]),t._v(" "),s("p",[t._v("在 "),s("code",[t._v("~/.bash_profile")]),t._v(" 上添加：")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("export")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("PUB_HOSTED_URL")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("https://pub.flutter-io.cn\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("export")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("FLUTTER_STORAGE_BASE_URL")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("https://storage.flutter-io.cn\n")])])]),s("p",[t._v("保存文件后，在运行")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[t._v("$ "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("source")]),t._v(" ~/.bash_profile\n")])])]),s("h2",{attrs:{id:"flutter-sdk-安装-windows"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#flutter-sdk-安装-windows"}},[t._v("#")]),t._v(" Flutter SDK 安装 —  Windows")]),t._v(" "),s("h3",{attrs:{id:"系统要求"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#系统要求"}},[t._v("#")]),t._v(" 系统要求")]),t._v(" "),s("p",[t._v("开发环境必须满足以下最低要求：")]),t._v(" "),s("ul",[s("li",[t._v("操作系统： Windows 7 SP1（64位）及以上")]),t._v(" "),s("li",[t._v("硬盘空间：400M（不包括 IDE 或工具的磁盘空间）")]),t._v(" "),s("li",[t._v("依赖工具：Flutter 依赖如下的工具：\n"),s("ul",[s("li",[s("a",{attrs:{href:"https://docs.microsoft.com/en-us/powershell/scripting/setup/installing-windows-powershell",target:"_blank",rel:"noopener noreferrer"}},[t._v("Windows PowerShell 5.0"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://git-scm.com/download/win",target:"_blank",rel:"noopener noreferrer"}},[t._v("Git for Windows 2.x"),s("OutboundLink")],1)])])])]),t._v(" "),s("h4",{attrs:{id:"windows-powershell-5-0"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#windows-powershell-5-0"}},[t._v("#")]),t._v(" Windows PowerShell 5.0")]),t._v(" "),s("p",[t._v("Powershell 从 Windows7 时代开始内置于 Windows 系统当中，可以看作是微软对 cmd 的大升级，随着微软对 Win10 系统的不断升级，内置的默认命令行工具也逐渐从 cmd 迁移到了 PowerShell。")]),t._v(" "),s("p",[t._v("PowerShell 相对于 cmd 来说：")]),t._v(" "),s("ul",[s("li",[t._v("界面更美观")]),t._v(" "),s("li",[t._v("不仅完美支持传统 Windows 命令和 .net 库中的命令，也支持部分常用的 Linux 命令，功能更强大。")])]),t._v(" "),s("p",[t._v("经过验证，可以不使用 PowerShell ，也不用升级 PowerShell 的版本，使用 cmd 完全没问题。")]),t._v(" "),s("p",[t._v("如果你想升级 PowerShell 到 5.0，可以自行搜索升级方法。")]),t._v(" "),s("h3",{attrs:{id:"安装-git"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装-git"}},[t._v("#")]),t._v(" 安装 Git")]),t._v(" "),s("p",[t._v("从"),s("a",{attrs:{href:"https://git-scm.com/downloads",target:"_blank",rel:"noopener noreferrer"}},[t._v("这里下载"),s("OutboundLink")],1),t._v(" Git 的安装包安装。")]),t._v(" "),s("p",[t._v("安装完后，打开 cmd 验证，输入：")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" --version\n")])])]),s("p",[t._v("看到：")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[t._v("C:"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("Users"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("Administrator"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("git --version\n"),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2.13")]),t._v(".0.windows.1\n")])])]),s("p",[t._v("说明 Git 安装成功，Git 用于管理 Flutter 的源码。")]),t._v(" "),s("h3",{attrs:{id:"搭建-android-开发环境"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#搭建-android-开发环境"}},[t._v("#")]),t._v(" 搭建 Android 开发环境")]),t._v(" "),s("p",[t._v("为了 Flutter 可以编译成 Android APK，和运行在 Android 模拟器上，需要搭建 Android 开发环境。")]),t._v(" "),s("ol",[s("li",[t._v("安装 "),s("a",{attrs:{href:"https://developer.android.com/studio",target:"_blank",rel:"noopener noreferrer"}},[t._v("Android Studio"),s("OutboundLink")],1),t._v("，Android Studio 安装成功后，会自带 Android SDK。")])]),t._v(" "),s("h4",{attrs:{id:"配置-android-sdk-环境变量"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#配置-android-sdk-环境变量"}},[t._v("#")]),t._v(" 配置 Android SDK 环境变量")]),t._v(" "),s("p",[t._v("打开 Android Studio，选择 "),s("code",[t._v("Confiure")]),t._v(" -> 'SDK Manager'：")]),t._v(" "),s("p",[s("img",{attrs:{src:"/flutter/1608272912453.jpg",alt:""}})]),t._v(" "),s("p",[t._v("在打开的窗口中就能看到 Android SDK 的路径:")]),t._v(" "),s("p",[s("img",{attrs:{src:"/flutter/1608272950153.jpg",alt:""}})]),t._v(" "),s("h4",{attrs:{id:"创建-android-模拟器"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#创建-android-模拟器"}},[t._v("#")]),t._v(" 创建 Android 模拟器")]),t._v(" "),s("p",[t._v("打开 Android Studio，选择 "),s("code",[t._v("Confiure")]),t._v(" -> 'AVD Manager'：")]),t._v(" "),s("p",[s("img",{attrs:{src:"/flutter/1608272990977.jpg",alt:""}})]),t._v(" "),s("p",[t._v("在打开的页面里点击 "),s("code",[t._v("Create Virtual Device...")]),t._v("：\n"),s("img",{attrs:{src:"/flutter/1608273052203.jpg",alt:""}})]),t._v(" "),s("p",[t._v("在 "),s("code",[t._v("Phone")]),t._v(" 里选择一个设备，这里选择 Pixel 2 XL：\n"),s("img",{attrs:{src:"/flutter/1608273088013.jpg",alt:""}})]),t._v(" "),s("p",[t._v("然后一直点击 Next，就成功创建了 Android 模拟器。")]),t._v(" "),s("ol",[s("li",[s("code",[t._v("计算机")]),t._v(" -> "),s("code",[t._v("属性")]),t._v(" -> "),s("code",[t._v("高级系统设置")]),t._v(" -> "),s("code",[t._v("环境变量")]),t._v("，打开环境变量设置框。")]),t._v(" "),s("li",[t._v("在用户变量下，选择 "),s("code",[t._v("Path")]),t._v("，点击编辑,添加上 "),s("code",[t._v(";(替换成 Android SDK 路径)/tools;(替换成 Android SDK 路径)/platform-tools")])])]),t._v(" "),s("h3",{attrs:{id:"下载-flutter-sdk"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#下载-flutter-sdk"}},[t._v("#")]),t._v(" 下载 Flutter SDK")]),t._v(" "),s("ol",[s("li",[t._v("你可以在 "),s("a",{attrs:{href:"https://flutter.dev/docs/development/tools/sdk/archive?tab=windows",target:"_blank",rel:"noopener noreferrer"}},[t._v("Flutter SDK"),s("OutboundLink")],1),t._v(" 的下载页面，选择你想要的版本，一般选择稳定版的，目前最新的稳定版是 "),s("a",{attrs:{href:"https://storage.googleapis.com/flutter_infra/releases/stable/windows/flutter_windows_v1.5.4-hotfix.2-stable.zip",target:"_blank",rel:"noopener noreferrer"}},[t._v("v1.5.4-hotfix.2"),s("OutboundLink")],1),t._v("。")]),t._v(" "),s("li",[t._v("将 Flutter SDK 的 zip 包解压到一个目录下，例如   "),s("code",[t._v("E:\\src\\flutter")]),t._v("（目录随意，但是不要放在需要权限的目录下，例如 "),s("code",[t._v("C:\\Program Files\\")]),t._v(" ）")])]),t._v(" "),s("h3",{attrs:{id:"设置-flutter-sdk-的环境变量"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#设置-flutter-sdk-的环境变量"}},[t._v("#")]),t._v(" 设置 Flutter SDK 的环境变量")]),t._v(" "),s("ol",[s("li",[s("p",[s("code",[t._v("计算机")]),t._v(" -> "),s("code",[t._v("属性")]),t._v(" -> "),s("code",[t._v("高级系统设置")]),t._v(" -> "),s("code",[t._v("环境变量")]),t._v("，打开环境变量设置框。")])]),t._v(" "),s("li",[s("p",[t._v("在用户变量下，选择 "),s("code",[t._v("Path")]),t._v("，点击编辑：")]),t._v(" "),s("ul",[s("li",[t._v("如果已经存在 "),s("code",[t._v("Path")]),t._v("变量，则在原有的值后面先加 "),s("code",[t._v(";")]),t._v("，然后将 Flutter SDK 的完整路径 "),s("code",[t._v("E:\\src\\flutter\\bin")]),t._v(" 添加上。")]),t._v(" "),s("li",[t._v("如果没有 "),s("code",[t._v("Path")]),t._v(" 变量，则新建一个名为 "),s("code",[t._v("Path")]),t._v(" 的用户变量，然后将 Flutter SDK 的完整路径 "),s("code",[t._v("E:\\src\\flutter\\bin")]),t._v(" 添加上。")])]),t._v(" "),s("p",[t._v("编辑完成后，点击确定。")])])]),t._v(" "),s("h3",{attrs:{id:"运行-flutter-doctor"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#运行-flutter-doctor"}},[t._v("#")]),t._v(" 运行 flutter doctor")]),t._v(" "),s("p",[t._v("为了验证 Flutter 是否安装成功，在 cmd 运行：")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[t._v("flutter doctor\n")])])]),s("p",[t._v("如果看到输出如下的结果：")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[t._v("C:"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("Users"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("Administrator"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("flutter doctor\nDoctor summary "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("to see all details, run flutter doctor -v"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(":\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("✓"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" Flutter "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Channel stable, v1.5.4-hotfix.2, on Microsoft Windows "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("Version "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("6.1")]),t._v(".7601"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(", locale zh-CN"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("✓"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" Android toolchain - develop "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" Android devices "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Android SDK "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("27.0")]),t._v(".3"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("✓"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" Android Studio "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("version "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3.1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" Connected device \n    "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v(" No devices available\n\n"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v(" Doctor found issues "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("in")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" categories.\n")])])]),s("p",[t._v("说明，Flutter SDK 已经安装成功。但是也可能遇到 Flutter 的报错，请按照报错的提示修复，例如：")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("Some Android licenses not accepted（Android证书的问题）")]),t._v(" "),s("p",[t._v("运行 "),s("code",[t._v("flutter doctor --android-licenses")]),t._v(" 修复")])])]),t._v(" "),s("h2",{attrs:{id:"flutter-sdk-安装-linux"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#flutter-sdk-安装-linux"}},[t._v("#")]),t._v(" Flutter SDK 安装 —  Linux")]),t._v(" "),s("p",[t._v("这里以 Ubuntu 为例。")]),t._v(" "),s("h3",{attrs:{id:"系统要求-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#系统要求-2"}},[t._v("#")]),t._v(" 系统要求")]),t._v(" "),s("p",[t._v("开发环境必须满足以下最低要求：")]),t._v(" "),s("ul",[s("li",[t._v("操作系统：Linux （64位）")]),t._v(" "),s("li",[t._v("硬盘空间：600M（不包括 IDE 或工具的磁盘空间）")]),t._v(" "),s("li",[t._v("工具：Flutter需要用到如下的命令行（Linux 自带，无需额外安装）：\n"),s("ul",[s("li",[t._v("bash")]),t._v(" "),s("li",[t._v("curl")]),t._v(" "),s("li",[t._v("git 2.x")]),t._v(" "),s("li",[t._v("mkdir")]),t._v(" "),s("li",[t._v("rm")]),t._v(" "),s("li",[t._v("unzip")]),t._v(" "),s("li",[t._v("which")]),t._v(" "),s("li",[t._v("xz-utils")])])]),t._v(" "),s("li",[t._v("共享库：Flutter test的命令需要用到如下的库（Linux 自带，无需额外安装）：\n"),s("ul",[s("li",[t._v("libGLU.so.1")])])])]),t._v(" "),s("p",[t._v("这些工具 Ubuntu 默认已经安装，无需在进行操作。")]),t._v(" "),s("h3",{attrs:{id:"安装-android-开发环境"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装-android-开发环境"}},[t._v("#")]),t._v(" 安装 Android 开发环境")]),t._v(" "),s("p",[t._v("为了 Flutter 可以编译成 Android APK，和运行在 Android 模拟器上，需要搭建 Android 开发环境。")]),t._v(" "),s("ol",[s("li",[t._v("安装 "),s("a",{attrs:{href:"https://developer.android.com/studio",target:"_blank",rel:"noopener noreferrer"}},[t._v("Android Studio"),s("OutboundLink")],1),t._v("，Android Studio 安装成功后，会自带 Android SDK。")])]),t._v(" "),s("h4",{attrs:{id:"配置-android-sdk-环境变量-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#配置-android-sdk-环境变量-2"}},[t._v("#")]),t._v(" 配置 Android SDK 环境变量")]),t._v(" "),s("p",[t._v("打开 Android Studio，选择 "),s("code",[t._v("Confiure")]),t._v(" -> 'SDK Manager'：")]),t._v(" "),s("p",[s("img",{attrs:{src:"/flutter/1608273130912.jpg",alt:""}})]),t._v(" "),s("p",[t._v("在打开的窗口中就能看到 Android SDK 的路径:")]),t._v(" "),s("p",[s("img",{attrs:{src:"/flutter/1608273165420.jpg",alt:""}})]),t._v(" "),s("p",[t._v("在 "),s("code",[t._v("~/.bashrc")]),t._v(" 上添加：")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("export ANDROID_HOME=/Users/****/Library/Android/sdk\nexport PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools\n")])])]),s("h4",{attrs:{id:"创建-android-模拟器-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#创建-android-模拟器-2"}},[t._v("#")]),t._v(" 创建 Android 模拟器")]),t._v(" "),s("p",[t._v("打开 Android Studio，选择 "),s("code",[t._v("Confiure")]),t._v(" -> 'AVD Manager'：")]),t._v(" "),s("p",[s("img",{attrs:{src:"/flutter/1608273197777.jpg",alt:""}})]),t._v(" "),s("p",[t._v("在打开的页面里点击 "),s("code",[t._v("Create Virtual Device...")]),t._v("：\n"),s("img",{attrs:{src:"/flutter/1608273419277.jpg",alt:""}})]),t._v(" "),s("p",[t._v("在 "),s("code",[t._v("Phone")]),t._v(" 里选择一个设备，这里选择 Pixel 2 XL：\n"),s("img",{attrs:{src:"/flutter/1608273088013.jpg",alt:""}})]),t._v(" "),s("p",[t._v("然后一直点击 Next，就成功创建了 Android 模拟器。")]),t._v(" "),s("h3",{attrs:{id:"下载-flutter-sdk-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#下载-flutter-sdk-2"}},[t._v("#")]),t._v(" 下载 Flutter SDK")]),t._v(" "),s("ol",[s("li",[t._v("你可以在 "),s("a",{attrs:{href:"https://flutter.dev/docs/development/tools/sdk/archive?tab=linux",target:"_blank",rel:"noopener noreferrer"}},[t._v("Flutter SDK"),s("OutboundLink")],1),t._v(" 的下载页面，选择你想要的版本，一般选择稳定版的，最新的稳定版是 "),s("a",{attrs:{href:"https://storage.googleapis.com/flutter_infra/releases/stable/linux/flutter_linux_v1.5.4-hotfix.2-stable.tar.xz",target:"_blank",rel:"noopener noreferrer"}},[t._v("v1.5.4-hotfix.2"),s("OutboundLink")],1),t._v("。")]),t._v(" "),s("li",[t._v("选择一个目录，解压缩 Flutter SDK 的 zip 包，例如："),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[t._v("$ "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" ~/development\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("tar")]),t._v(" xf ~/Downloads/flutter_linux_v1.0.0-stable.tar.xz\n")])])])])]),t._v(" "),s("h3",{attrs:{id:"设置-flutter-sdk-的环境变量-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#设置-flutter-sdk-的环境变量-2"}},[t._v("#")]),t._v(" 设置 Flutter SDK 的环境变量")]),t._v(" "),s("p",[t._v("打开 "),s("code",[t._v("~/.bashrc")]),t._v(":")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("$vim ~/.bashrc\n")])])]),s("p",[t._v("将 Flutter SDK 的完整路径加入环境变量，添加：")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("export PATH=$PATH:~/development/flutter/bin\n")])])]),s("p",[t._v("保存后，在运行")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("$source ~/.bashrc\n")])])]),s("h3",{attrs:{id:"运行-flutter-doctor-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#运行-flutter-doctor-2"}},[t._v("#")]),t._v(" 运行 flutter doctor")]),t._v(" "),s("p",[t._v("为了验证 Flutter 是否安装成功，运行：")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[t._v("$ flutter doctor\n")])])]),s("p",[t._v("如果看到输出如下的结果：")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[t._v("Doctor summary "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("to see all details, run flutter doctor -v"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(":\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("✓"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" Flutter "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Channel stable, v1.5.4-hotfix.2, on Linux, locale zh_CN.UTF-8"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("✓"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" Android toolchain - develop "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" Android devices "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Android SDK "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("27.0")]),t._v(".3"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("✓"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" Android Studio "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("version "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3.1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" Connected device \n    "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v(" No devices available\n\n"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v(" Doctor found issues "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("in")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" categories.\n")])])]),s("p",[t._v("说明，Flutter SDK 已经安装成功。但是也可能遇到 Flutter 的报错，请按照报错的提示修复，例如：")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("Some Android licenses not accepted（Android 证书的问题）")]),t._v(" "),s("p",[t._v("运行 "),s("code",[t._v("flutter doctor --android-licenses")]),t._v(" 修复")])])]),t._v(" "),s("h2",{attrs:{id:"flutter-sdk-安装-macos"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#flutter-sdk-安装-macos"}},[t._v("#")]),t._v(" Flutter SDK 安装 —  MacOS")]),t._v(" "),s("h3",{attrs:{id:"系统要求-3"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#系统要求-3"}},[t._v("#")]),t._v(" 系统要求")]),t._v(" "),s("p",[t._v("开发环境必须满足以下最低要求：")]),t._v(" "),s("ul",[s("li",[t._v("操作系统： macOS （64位）")]),t._v(" "),s("li",[t._v("硬盘空间：700M（不包括 IDE 或工具的磁盘空间）")]),t._v(" "),s("li",[t._v("依赖工具：Flutter需要用到如下的命令行（MacOS 自带，无需额外安装）：\n"),s("ul",[s("li",[t._v("bash")]),t._v(" "),s("li",[t._v("curl")]),t._v(" "),s("li",[t._v("git 2.x")]),t._v(" "),s("li",[t._v("mkdir")]),t._v(" "),s("li",[t._v("rm")]),t._v(" "),s("li",[t._v("unzip")]),t._v(" "),s("li",[t._v("which")])])])]),t._v(" "),s("p",[t._v("这些工具 MacOS 默认已经安装，无需在进行操作。")]),t._v(" "),s("h3",{attrs:{id:"安装-android-开发环境-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装-android-开发环境-2"}},[t._v("#")]),t._v(" 安装 Android 开发环境")]),t._v(" "),s("p",[t._v("为了 Flutter 可以编译成 Android APK，和运行在 Android 模拟器上，需要搭建 Android 开发环境。")]),t._v(" "),s("ol",[s("li",[t._v("安装 "),s("a",{attrs:{href:"https://developer.android.com/studio",target:"_blank",rel:"noopener noreferrer"}},[t._v("Android Studio"),s("OutboundLink")],1),t._v("，Android Studio 安装成功后，会自带 Android SDK。")])]),t._v(" "),s("h4",{attrs:{id:"配置-android-sdk-环境变量-3"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#配置-android-sdk-环境变量-3"}},[t._v("#")]),t._v(" 配置 Android SDK 环境变量")]),t._v(" "),s("p",[t._v("打开 Android Studio，选择 "),s("code",[t._v("Confiure")]),t._v(" -> 'SDK Manager'：")]),t._v(" "),s("p",[s("img",{attrs:{src:"/flutter/1608272912453.jpg",alt:""}})]),t._v(" "),s("p",[t._v("在打开的窗口中就能看到 Android SDK 的路径:")]),t._v(" "),s("p",[s("img",{attrs:{src:"/flutter/1608272950153.jpg",alt:""}})]),t._v(" "),s("p",[t._v("在 "),s("code",[t._v("~/.bash_profile")]),t._v(" 上添加：")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("export ANDROID_HOME=/Users/****/Library/Android/sdk\nexport PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools\n")])])]),s("h4",{attrs:{id:"创建-android-模拟器-3"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#创建-android-模拟器-3"}},[t._v("#")]),t._v(" 创建 Android 模拟器")]),t._v(" "),s("p",[t._v("打开 Android Studio，选择 "),s("code",[t._v("Confiure")]),t._v(" -> 'AVD Manager'：")]),t._v(" "),s("p",[s("img",{attrs:{src:"/flutter/1608273197777.jpg",alt:""}})]),t._v(" "),s("p",[t._v("在打开的页面里点击 "),s("code",[t._v("Create Virtual Device...")]),t._v("：\n"),s("img",{attrs:{src:"/flutter/1608273419277.jpg",alt:""}})]),t._v(" "),s("p",[t._v("在 "),s("code",[t._v("Phone")]),t._v(" 里选择一个设备，这里选择 Pixel 2 XL：\n"),s("img",{attrs:{src:"/flutter/1608273088013.jpg",alt:""}})]),t._v(" "),s("p",[t._v("然后一直点击 Next，就成功创建了 Android 模拟器。")]),t._v(" "),s("h3",{attrs:{id:"安装-ios-开发环境"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装-ios-开发环境"}},[t._v("#")]),t._v(" 安装 iOS 开发环境")]),t._v(" "),s("p",[t._v("为了 Flutter 可以编译成 iOS 安装包，和运行在 iOS 模拟器上，需要搭建 iOS 开发环境。")]),t._v(" "),s("p",[t._v("在 MacOS 需要先安装 Xcode：")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("Xcode 版本需要 9.0 及以上（下载地址 "),s("a",{attrs:{href:"https://developer.apple.com/xcode/",target:"_blank",rel:"noopener noreferrer"}},[t._v("web download"),s("OutboundLink")],1),t._v(" 或者 "),s("a",{attrs:{href:"https://itunes.apple.com/us/app/xcode/id497799835",target:"_blank",rel:"noopener noreferrer"}},[t._v("Mac App Store"),s("OutboundLink")],1),t._v("）。")])]),t._v(" "),s("li",[s("p",[t._v("在 Terminal 运行：")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[t._v("$  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" xcode-select --switch /Applications/Xcode.app/Contents/Developer\n")])])]),s("p",[t._v("目的是使用最新版的 Xcode。")])]),t._v(" "),s("li",[s("p",[t._v("先打开 Xcode，同意 Xcode 的许可协议")])])]),t._v(" "),s("p",[s("img",{attrs:{src:"/flutter/1608273638009.jpg",alt:""}})]),t._v(" "),s("ol",{attrs:{start:"4"}},[s("li",[s("p",[t._v("然后在命令行运行：")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[t._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" xcodebuild -license\n")])])]),s("p",[t._v("会看到如下的内容")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("....\nBy typing 'agree' you are agreeing to the terms of the software license agreements. Type 'print' to print them or anything else to cancel, [agree, print, cancel]\n")])])]),s("p",[t._v("然后输入 "),s("code",[t._v("agree")]),t._v(" 回车。")]),t._v(" "),s("p",[t._v("然后 Xcode 的协议就签署成功了。")])])]),t._v(" "),s("p",[t._v("安装完 Xcode 之后，就可以将 Flutter 编译成 iOS 安装包了，电脑上也能运行 iOS 的模拟器。")]),t._v(" "),s("h3",{attrs:{id:"下载-flutter-sdk-3"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#下载-flutter-sdk-3"}},[t._v("#")]),t._v(" 下载 Flutter SDK")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("你可以在 "),s("a",{attrs:{href:"https://flutter.dev/docs/development/tools/sdk/archive?tab=macos",target:"_blank",rel:"noopener noreferrer"}},[t._v("Flutter SDK"),s("OutboundLink")],1),t._v(" 的下载页面，选择你想要的版本，一般选择稳定版的，最新的稳定版是 "),s("a",{attrs:{href:"https://storage.googleapis.com/flutter_infra/releases/stable/macos/flutter_macos_v1.5.4-hotfix.2-stable.zip",target:"_blank",rel:"noopener noreferrer"}},[t._v("v1.5.4-hotfix.2"),s("OutboundLink")],1),t._v("。")])]),t._v(" "),s("li",[s("p",[t._v("选一个路径来存放 Flutter SDK ，例如 "),s("code",[t._v("/Users/kk/sdk")]),t._v("， 在这个位置下解压缩 Flutter SDK 的 zip 包：")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[t._v("$ "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" /Users/kk/sdk\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("unzip")]),t._v(" ~/Downloads/flutter_macos_v1.0.0-stable.zip\n")])])])])]),t._v(" "),s("h3",{attrs:{id:"设置-flutter-sdk-的环境变量-3"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#设置-flutter-sdk-的环境变量-3"}},[t._v("#")]),t._v(" 设置 Flutter SDK 的环境变量")]),t._v(" "),s("p",[t._v("在 "),s("code",[t._v("~/.bash_profile")]),t._v(" 上添加（没有 .bash_profile ,可以新建一个）：")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("export FLUTTER_HOME=/Users/kk/sdk\nexport PATH=$PATH:$FLUTTER_HOME/bin\n")])])]),s("p",[t._v("保存文件后，在运行")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[t._v("$ "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("source")]),t._v(" ~/.bash_profile\n")])])]),s("h3",{attrs:{id:"运行-flutter-doctor-3"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#运行-flutter-doctor-3"}},[t._v("#")]),t._v(" 运行 flutter doctor")]),t._v(" "),s("p",[t._v("为了验证 Flutter 是否安装成功，运行：")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[t._v("$ flutter doctor\n")])])]),s("p",[t._v("如果看到输出如下的结果：")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[t._v("Doctor summary "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("to see all details, run flutter doctor -v"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(":\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("✓"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" Flutter "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Channel stable, v1.5.4-hotfix.2, on Mac OS X "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("10.13")]),t._v(".6 17G2208, locale zh-Hans-CN"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" Android toolchain - develop "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" Android devices "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Android SDK "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("28.0")]),t._v(".3"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v(" Some Android licenses not accepted.  To resolve this, run: flutter doctor --android-licenses\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" iOS toolchain - develop "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" iOS devices "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Xcode "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("10.1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    ✗ Verify that all connected devices have been paired with this computer "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("in")]),t._v(" Xcode.\n      If all devices have been paired, libimobiledevice and ideviceinstaller may require updating.\n      To update with Brew, run:\n        brew update\n        brew uninstall --ignore-dependencies libimobiledevice\n        brew uninstall --ignore-dependencies usbmuxd\n        brew "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" --HEAD usbmuxd\n        brew unlink usbmuxd\n        brew "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("link")]),t._v(" usbmuxd\n        brew "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" --HEAD libimobiledevice\n        brew "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" ideviceinstaller\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("✓"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" Android Studio "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("version "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3.1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("✓"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" VS Code "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("version "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1.30")]),t._v(".2"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("✓"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" Connected device "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" available"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v(" Doctor found issues "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("in")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v(" categories.\n")])])]),s("p",[t._v("说明，Flutter SDK 已经安装成功。但是也可以看到 flutter 的报错，请按照报错的提示修复，例如：")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("Android toolchain - develop for Android devices（Android证书的问题）")]),t._v(" "),s("p",[t._v("运行"),s("code",[t._v("flutter doctor --android-licenses")]),t._v("修复")])]),t._v(" "),s("li",[s("p",[t._v("iOS toolchain - develop for iOS devices（iOS的问题）")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("[!] iOS toolchain - develop for iOS devices (Xcode 10.2)\n  ✗ libimobiledevice and ideviceinstaller are not installed. To install with Brew, run:\n      brew update\n      brew install --HEAD usbmuxd\n      brew link usbmuxd\n      brew install --HEAD libimobiledevice\n      brew install ideviceinstaller\n  ✗ ios-deploy not installed. To install:\n      brew install ios-deploy\n  ✗ CocoaPods not installed.\n      CocoaPods is used to retrieve the iOS platform side's plugin code that responds to your plugin usage on the Dart side.\n      Without resolving iOS dependencies with CocoaPods, plugins will not work on iOS.\n      For more info, see https://flutter.io/platform-plugins\n    To install:\n      brew install cocoapods\n      pod setup\n")])])]),s("p",[t._v("这里列出了出现的问题，并且给出了解决方案，需要你按照提示运行相应的命令。")])])]),t._v(" "),s("h2",{attrs:{id:"flutter-ide"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#flutter-ide"}},[t._v("#")]),t._v(" Flutter IDE")]),t._v(" "),s("h3",{attrs:{id:"android-studio"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#android-studio"}},[t._v("#")]),t._v(" Android Studio")]),t._v(" "),s("p",[t._v("我们知道 Android Studio 是用来开发 Android 的，但是也可以开发 Flutter。")]),t._v(" "),s("h4",{attrs:{id:"安装-android-studio"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装-android-studio"}},[t._v("#")]),t._v(" 安装 Android Studio")]),t._v(" "),s("p",[t._v("版本要求：")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://developer.android.com/studio",target:"_blank",rel:"noopener noreferrer"}},[t._v("Android Studio"),s("OutboundLink")],1),t._v(" 3.0 及以后")])]),t._v(" "),s("h4",{attrs:{id:"安装-flutter-插件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装-flutter-插件"}},[t._v("#")]),t._v(" 安装 Flutter 插件")]),t._v(" "),s("ol",[s("li",[t._v("打开 Android Studio")]),t._v(" "),s("li",[t._v("打开 plugin preferences (MacOS 是："),s("strong",[t._v("Android Studio > Preferences > Plugins")]),t._v(" ,Windows 和 Linux 是： "),s("strong",[t._v("File > Settings > Plugins")]),t._v(" )。如下图：")])]),t._v(" "),s("p",[s("img",{attrs:{src:"/flutter/1608273691243.jpg",alt:""}})]),t._v(" "),s("ol",{attrs:{start:"3"}},[s("li",[t._v("点击 "),s("strong",[t._v("Browse repositories")]),t._v(", 搜索 "),s("strong",[t._v("Flutter")]),t._v(" ,如下图")])]),t._v(" "),s("p",[s("img",{attrs:{src:"/flutter/1608273731879.jpg",alt:""}})]),t._v(" "),s("ol",{attrs:{start:"4"}},[s("li",[t._v("选中 Flutter 插件并点击 "),s("strong",[t._v("Install")]),t._v(" 安装。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"/flutter/1608273767728.jpg",alt:""}})]),t._v(" "),s("ol",{attrs:{start:"4"}},[s("li",[t._v("安装完之后，点击 "),s("strong",[t._v("Restart Android Studio")]),t._v(" ，重启 Android Studio 。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"/flutter/1608273803687.jpg",alt:""}})]),t._v(" "),s("ol",{attrs:{start:"5"}},[s("li",[t._v("Android Studio 重启后，点击 "),s("strong",[t._v("File > New")]),t._v(" ，如果看到了 "),s("strong",[t._v("New Flutter Project..")]),t._v(" ，说明 Flutter 插件已经安装完成。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"/flutter/1608273843086.jpg",alt:""}})]),t._v(" "),s("h3",{attrs:{id:"vs-code"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vs-code"}},[t._v("#")]),t._v(" VS Code")]),t._v(" "),s("p",[t._v("VS Code 是一个轻量级编辑器，支持 Flutter 的开发。")]),t._v(" "),s("h4",{attrs:{id:"安装-vs-code"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装-vs-code"}},[t._v("#")]),t._v(" 安装 VS Code")]),t._v(" "),s("p",[t._v("版本要求：")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://code.visualstudio.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("VS Code"),s("OutboundLink")],1),t._v(" 最新稳定版")])]),t._v(" "),s("h4",{attrs:{id:"安装-flutter-插件-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装-flutter-插件-2"}},[t._v("#")]),t._v(" 安装 Flutter 插件")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("打开 VS Code。")])]),t._v(" "),s("li",[s("p",[t._v("点击 "),s("strong",[t._v("View > Command Palette…")]),t._v(" 或者快捷键 "),s("strong",[t._v("Shift+cmd+P")]),t._v("(MacOS) /"),s("strong",[t._v("Ctrl+Shift+P")]),t._v("(Windows、Linux)，打开命令面板。")])]),t._v(" "),s("li",[s("p",[t._v("输入 "),s("strong",[t._v("install")]),t._v(", 选择 "),s("strong",[t._v("Extensions: Install Extensions")]),t._v("，如下图：")])])]),t._v(" "),s("p",[s("img",{attrs:{src:"/flutter/1608272838719.jpg",alt:""}})]),t._v(" "),s("ol",{attrs:{start:"4"}},[s("li",[t._v("在 "),s("strong",[t._v("Extensions")]),t._v(" 的搜索框里输入 "),s("strong",[t._v("Flutter")]),t._v(",如下图：")])]),t._v(" "),s("p",[s("img",{attrs:{src:"/flutter/1608272797044.jpg",alt:""}})]),t._v(" "),s("ol",{attrs:{start:"5"}},[s("li",[t._v("选择 "),s("strong",[t._v("Flutter")]),t._v(" 并点击 "),s("strong",[t._v("Install")]),t._v("。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"/flutter/1608272739714.jpg",alt:""}})]),t._v(" "),s("ol",{attrs:{start:"6"}},[s("li",[t._v("安装完后，在点击 "),s("strong",[t._v("Reload")]),t._v("，重启 VS Code，如下图：")])]),t._v(" "),s("p",[s("img",{attrs:{src:"/flutter/1608272696993.jpg",alt:""}})]),t._v(" "),s("ol",{attrs:{start:"7"}},[s("li",[t._v("点击 "),s("strong",[t._v("View > Command Palette…")]),t._v("，或者快捷键 "),s("strong",[t._v("Shift+cmd+P")]),t._v("(MacOS) /"),s("strong",[t._v("Ctrl+Shift+P")]),t._v("(Windows、Linux)，打开命令面板。输入 "),s("strong",[t._v("Flutter")]),t._v(" ，如果看到如下图的 Flutter 命令，说明安装成功：")])]),t._v(" "),s("p",[s("img",{attrs:{src:"/flutter/1608272624215.jpg",alt:""}})])])}),[],!1,null,null,null);e.default=r.exports}}]);