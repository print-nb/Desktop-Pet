梦幻口袋 - 学习激励桌宠系统
一款基于 Electron 开发的桌面宠物养成应用，通过可爱的虚拟宠物陪伴学习，提供学习激励和成长体验。

功能特性
🐾 桌面宠物：可爱的虚拟宠物，支持多种角色和表情（开心、无聊、生气、伤心、害羞）

🤖 AI 聊天：集成通义千问大模型，提供智能对话功能

🎨 个性化设置：支持调整透明度、大小、置顶等

🖱️ 拖拽交互：宠物可自由拖拽移动

📊 数据同步：支持数据导出功能

📦 系统托盘：最小化到托盘，方便随时调用

技术栈
Electron 28.3.3：跨平台桌面应用框架

Node.js：后端运行环境

JavaScript/HTML/CSS：前端界面

通义千问 API：AI 对话功能

安装与运行
环境要求
Node.js (建议版本 16 或以上)

npm 或 yarn

安装依赖

bash
1
npm install
开发模式运行

bash
1
npm start
打包应用

bash
1
npm run package
打包后的文件将生成在 dist 目录下。

配置说明
AI 功能配置
要使用 AI 聊天功能，需要配置通义千问 API Key：

1.
注册阿里云账号并开通通义千问服务

2.
获取 API Key

3.
设置环境变量 OPENAI_API_KEY 为你的 API Key


bash
12345
# Windows PowerShell$env:OPENAI_API_KEY="your-api-key-here"# Windows CMDset OPENAI_API_KEY=your-api-key-here
宠物资源
宠物图片资源放置在 pet-images 目录下，结构如下：


Text
1234567891011
pet-images/├── baby/│   ├── happy.png│   ├── bored.png│   ├── angry.png│   ├── sad.png│   └── shy.png├── boy/│   └── (同样的表情文件)└── girl/    └── (同样的表情文件)
支持的表情：happy（开心）、bored（无聊）、angry（生气）、sad（伤心）、shy（害羞）

项目结构

Text
1234567891011121314
yingyong/├── main.js              # Electron 主进程├── preload.js           # 主窗口预加载脚本├── pet-preload.js       # 宠物窗口预加载脚本├── package.json         # 项目配置文件├── src/                 # 前端资源│   ├── index.html       # 主界面│   ├── pet.html         # 宠物界面│   ├── style.css        # 主界面样式│   ├── pet.css          # 宠物界面样式│   ├── renderer.js      # 主界面逻辑│   └── pet.js           # 宠物界面逻辑├── pet-images/          # 宠物图片资源└── dist/                # 打包输出目录
主要功能说明
主窗口功能
1.
宠物选择：浏览和选择不同的宠物角色

2.
AI 聊天：与智能助手对话

3.
设置面板：调整宠物大小、透明度、置顶等

4.
数据导出：导出应用数据

宠物窗口功能
1.
表情展示：根据状态展示不同表情

2.
拖拽移动：按住宠物可拖拽到桌面任意位置

3.
右键菜单：快捷操作菜单

开发说明
主进程 (main.js)
创建和管理窗口

处理 IPC 通信

集成 AI 功能

管理系统托盘

渲染进程
src/renderer.js：主窗口界面逻辑

src/pet.js：宠物窗口界面逻辑

自定义宠物
1.
在 pet-images 目录下创建新文件夹（如 cat）

2.
放入 5 种表情的图片文件

3.
重启应用即可使用新宠物

常见问题
Q: 宠物不显示？ A: 检查 pet-images 目录是否存在，且包含至少一个宠物文件夹。

Q: AI 功能无法使用？ A: 确认已正确设置 OPENAI_API_KEY 环境变量。

Q: 如何完全退出应用？ A: 右键点击系统托盘图标，选择"退出应用"。

许可证
本项目采用 MIT 许可证。

相关项目
完整的梦幻口袋项目还包含：

前端 Web 应用

后端服务

数据库系统

详情请查看 friend_project 和 project 目录下的文档。


