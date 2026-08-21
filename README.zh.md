# dsh-memory-panel

[DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)（`dsh`）的长期记忆插件：跨会话持久的记忆工具，加上一个展示「代理记住了你什么」的侧边栏面板。

[English](README.md) | [中文](README.zh.md)

## 功能

- **`memory_save`** — 保存一条记忆（按 key 新建或更新）
- **`memory_recall`** — 按关键词或类别召回记忆
- **`memory_list`** — 列出所有记忆，可按类别过滤
- **侧边栏记忆面板** — Web 侧边栏的「记忆」按钮，打开可视化记忆库的面板

记忆存放在 `~/.dsh/memory.json` —— 你机器上的纯 JSON，数据不出本机。

## 特性

- **原子写**：先写临时文件再 rename，读者永远看不到半截文件
- **写串行化**：并发的 `memory_save` 排队执行，不会互相覆盖
- **损坏自恢复**：`memory.json` 损坏时先备份为 `memory.json.corrupt-<时间戳>` 再空库继续 —— 绝不静默丢数据
- **增长控制**：单条内容上限 4000 字符、总条数上限 500（最旧淘汰）、召回结果上限 30 条
- **可选过滤**：`memory_list` 带不带 `category_filter` 都能用
- **穿透感知 UI**：通过隧道访问时，面板会提示 browser-trust fence 会拦 `/api/*`

## 安装

```sh
# web profile（交互式 GUI）
dsh plugin --profile web add dsh-memory-panel

# headless profile（一次性任务）—— 同一 bundle，需单独安装
dsh plugin --profile headless add dsh-memory-panel
```

直接从 GitHub 安装（无需 npm）：

```sh
dsh plugin --profile web add github:x2it/dsh-memory-panel
```

安装后重启 `dsh web`，打开侧边栏的「记忆」按钮。

## 验证

```sh
dsh --profile web --dump-config | grep memory-panel
```

agent 的工具列表里应出现 `memory_save` / `memory_recall` / `memory_list`。

## 工作原理

```
agent 工具 (memory_save/recall/list)
        │  ctx.tools.register
        ▼
 宿主插件 (lib/index.js)
        │  GET /api/memory  (ctx.webServer)
        ▼
 客户端面板 (lib/client.js, sidebar.footer.action 槽位)
```

一个插件行（`memory-panel`）同时承载两半：宿主加载器导入 `main`，Web 客户端加载 `./client`。

## 开发

```sh
npm install
npm run typecheck   # tsc --noEmit
npm run build       # esbuild → lib/index.js + lib/client.js
npm pack            # tarball
```

发布前用本地 tarball 测试：

```sh
npm pack
dsh plugin --profile web add ./dsh-memory-panel-0.1.0.tgz
```

## 目录结构

```
src/index.ts          # 宿主半：记忆工具 + /api/memory 端点
src/client/index.tsx  # 客户端半：侧边栏记忆面板
lib/                  # 构建产物（由 build.mjs 生成）
cordis.patch.yml      # bundle patch（dsh.bundle.patch）
```

## 安全

`/api/memory` 端点无鉴权 —— 请将 dsh web 绑定到 localhost 或可信网络。插件以明文存储记忆内容于 `~/.dsh/memory.json`；不要保存你不愿写进本地文件的机密。

## License

MIT
