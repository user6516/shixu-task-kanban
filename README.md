# 拾序 · 任务看板

基于提供的 task-kanban-skill-main/SKILL.md 创建的 Vue 3 + Vite 本地应用。

## 本地运行

双击 `启动看板.cmd`，或在此文件夹运行 `powershell -ExecutionPolicy Bypass -File .\start.ps1`，访问 http://127.0.0.1:8085 。关闭运行窗口或按 Ctrl+C 即可停止。

启动脚本直接使用 Node.js 安装目录中的 npm，避免电脑现有 npm 入口的路径问题。初次启动自动安装依赖。

## 功能

- 新增、删除任务，自定义分类、已有分类自动补全。
- 待办、进行中、已完成三列可双向拖拽；卡片右下角菜单同样可以切换状态。
- 星标、紧急标记，分类筛选与文字搜索。
- 晴日、夜航、花园三种主题，悬停预览。
- 本地自动保存、完成庆祝、操作提示，适配手机和减少动态效果的系统偏好。
- 导出 JSON 备份，清空前确认。

初次进入附有五张示例卡片；清空后刷新仍保持空看板。数据保存在当前浏览器的 localStorage，不在不同浏览器或地址之间同步。请保持使用同一访问地址；清除浏览器数据会删除任务，可提前点击导出按钮备份。

## 验证

`npm run build` 构建，`npm test` 运行功能测试。如果电脑默认 npm 入口有问题，可执行 `node D:\newapps\NodeJS\node_modules\npm\bin\npm-cli.js run build`（测试将 `run build` 换为 `test`）。
