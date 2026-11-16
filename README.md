# 云灵音乐 - Vue3 在线音乐 Web 应用

一个基于 Vue 3 + Pinia + Vue Router 4 + Vite + Less 构建的现代化在线音乐播放器 Web 应用。

## 项目简介

云灵音乐是一个功能完善的在线音乐播放器前端项目，采用最新的 Vue 3 生态技术栈开发。项目包含完整的音乐浏览、搜索、播放等核心功能，支持响应式布局，适配 PC 端和移动端。

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架（Composition API + setup 语法糖）
- **Pinia** - Vue 3 官方状态管理库
- **Vue Router 4** - Vue.js 官方路由
- **Vite** - 下一代前端构建工具
- **Less** - CSS 预处理器
- **pinia-plugin-persistedstate** - Pinia 状态持久化插件

## 功能特性

### 完整的音乐应用功能

- **首页** - 顶部导航、轮播图 Banner、推荐歌单、热门歌手、最新歌曲列表
- **歌单广场** - 分类筛选、歌单卡片网格展示
- **歌单详情页** - 歌单封面、标签、播放按钮、歌曲列表
- **歌手列表页** - 按首字母/地区/性别筛选、歌手卡片
- **歌手详情页** - 歌手信息、热门歌曲、专辑列表、Tab 切换
- **搜索页** - 搜索框、热搜榜、搜索历史、搜索结果 Tab 切换（歌曲/歌手/歌单）
- **个人中心/我的** - 收藏歌单、我喜欢的音乐、最近播放
- **404 页面** - 友好的页面未找到提示

### 全局播放器（核心）

- **底部播放条** - 固定在底部，所有页面显示
- **播放控制** - 播放/暂停、上一首/下一首按钮
- **进度条** - 进度展示与点击拖拽跳转
- **播放模式** - 顺序播放 / 单曲循环 / 随机播放
- **播放列表面板** - 展开查看当前队列、移除单曲、清空列表
- **全屏播放器** - 封面旋转动画、歌词滚动效果、音量控制
- **缓冲提示** - 切歌时显示缓冲加载状态
- **模拟播放** - 使用定时器模拟真实播放进度

### 状态管理

- **player store** - 当前歌曲、播放列表、播放状态、进度、播放模式、音量
- **user store** - 用户信息、收藏歌曲、收藏歌单、最近播放、搜索历史
- **状态持久化** - 使用 pinia-plugin-persistedstate 自动保存到 localStorage

### 性能优化

- **路由懒加载** - Vite 代码分割，按需加载
- **图片懒加载** - 自定义 v-lazy 指令，基于 Intersection Observer
- **构建优化** - Terser 压缩、console 移除、手动分包策略
- **资源分类** - JS/CSS/图片等静态资源分类输出
- **预构建优化** - Vite optimizeDeps 预构建配置

### 错误处理与边界

- **全局错误捕获** - Vue 错误 + JS 错误 + Promise 错误 + 资源加载错误
- **组件错误捕获** - onErrorCaptured 钩子
- **图片加载失败兜底** - 懒加载组件内置错误占位图
- **空状态页面** - 歌单空、搜索结果空、播放列表空等
- **404 页面** - 友好的页面未找到提示
- **路由错误处理** - chunk 加载失败自动刷新

### 用户体验

- **键盘快捷键** - 空格播放/暂停、左右箭头切歌、上下箭头音量、M 静音、ESC 关闭
- **页面切换过渡动画** - fade 淡入淡出
- **平滑滚动** - 路由切换平滑滚动到顶部
- **缓冲提示** - 切歌加载状态
- **搜索防抖** - 搜索输入优化
- **触摸反馈** - 按钮和卡片的 hover/active 状态

### 可访问性

- **语义化标签** - article、nav、main 等语义化 HTML 标签
- **ARIA 属性** - 按钮、链接、状态等 ARIA 标签
- **键盘可操作** - 所有交互元素支持键盘访问
- **焦点样式** - 清晰的 focus-visible 焦点样式

## 项目结构

```
yunling-music/
├── public/                  # 静态资源
│   └── favicon.svg          # 网站图标
├── src/
│   ├── assets/              # 资源文件
│   │   └── styles/          # 样式文件
│   │       ├── index.less   # 全局样式
│   │       └── variables.less # Less 变量
│   ├── components/          # 通用组件
│   │   ├── Banner.vue       # 轮播图组件
│   │   ├── FullPlayer.vue   # 全屏播放器组件
│   │   ├── LazyImage.vue    # 懒加载图片组件
│   │   ├── NavBar.vue       # 导航栏组件
│   │   ├── PlayBar.vue      # 底部播放条组件
│   │   ├── PlaylistCard.vue # 歌单卡片组件
│   │   ├── PlaylistPanel.vue # 播放列表面板组件
│   │   ├── SingerCard.vue   # 歌手卡片组件
│   │   ├── Skeleton.vue     # 骨架屏组件
│   │   ├── SongItem.vue     # 歌曲条目组件
│   │   └── SongList.vue     # 歌曲列表组件
│   ├── directives/          # 自定义指令
│   │   └── lazyLoad.js      # 图片懒加载指令
│   ├── mock/                # Mock 数据
│   │   ├── hotSearch.js     # 热搜数据
│   │   ├── playlists.js     # 歌单数据
│   │   ├── singers.js       # 歌手数据
│   │   └── songs.js         # 歌曲数据
│   ├── router/              # 路由配置
│   │   └── index.js
│   ├── store/               # Pinia 状态管理
│   │   ├── player.js        # 播放器状态
│   │   └── user.js          # 用户状态
│   ├── utils/               # 工具函数
│   │   ├── errorHandler.js  # 全局错误处理
│   │   └── format.js        # 格式化工具
│   ├── views/               # 页面组件
│   │   ├── Home.vue         # 首页
│   │   ├── NotFound.vue     # 404 页面
│   │   ├── Player.vue       # 全屏播放器页
│   │   ├── PlaylistDetail.vue # 歌单详情页
│   │   ├── PlaylistSquare.vue # 歌单广场页
│   │   ├── Search.vue       # 搜索页
│   │   ├── SingerDetail.vue # 歌手详情页
│   │   ├── SingerList.vue   # 歌手列表页
│   │   └── User.vue         # 个人中心页
│   ├── App.vue              # 根组件
│   └── main.js              # 入口文件
├── .env.development         # 开发环境变量
├── .env.production          # 生产环境变量
├── .gitignore               # Git 忽略文件
├── index.html               # HTML 入口
├── package.json             # 项目配置
├── vite.config.js           # Vite 配置
└── README.md                # 项目说明
```

## 快速开始

### 环境要求

- Node.js >= 14.18.0
- npm >= 6.14.0

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

启动后访问 http://localhost:3000 查看应用。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产版本

```bash
npm run preview
```

### 环境变量

项目支持通过环境变量配置：

- `.env.development` - 开发环境
- `.env.production` - 生产环境

可用环境变量：

```
VITE_APP_TITLE     # 应用标题
VITE_APP_ENV       # 环境标识
VITE_APP_BASE_API  # API 基础路径
VITE_APP_BASE_URL  # 应用基础路径（用于子路径部署）
```

## 键盘快捷键

| 快捷键 | 功能 |
|--------|------|
| 空格 | 播放/暂停 |
| ← | 上一首 |
| → | 下一首 |
| ↑ | 音量增加 |
| ↓ | 音量减少 |
| M | 静音切换 |
| Esc | 关闭全屏播放器/播放列表面板 |

## 部署说明

### 静态部署

将 `dist` 目录部署到任意静态文件服务器即可。

### Nginx 配置示例

```nginx
server {
  listen 80;
  server_name your-domain.com;
  root /path/to/dist;
  index index.html;

  # 由于使用 Hash 路由，无需额外配置 fallback
  location / {
    try_files $uri $uri/ /index.html;
  }

  # 静态资源缓存
  location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
}
```

### GitHub Pages 部署

修改 `.env.production` 中的 `VITE_APP_BASE_URL` 为仓库名：

```
VITE_APP_BASE_URL = /yunling-music/
```

然后执行构建并部署 `dist` 目录。

## 功能说明

### 播放器

- 点击歌曲或播放按钮开始播放
- 底部播放条显示当前播放歌曲信息
- 点击播放条封面或全屏按钮进入全屏播放器
- 全屏播放器支持歌词滚动、封面旋转动画
- 播放列表面板可查看当前队列、移除歌曲、清空列表
- 支持三种播放模式：顺序播放、单曲循环、随机播放
- 音量控制和静音功能
- 进度条可点击跳转
- 切歌时显示缓冲状态

### 搜索

- 顶部导航栏搜索框输入关键词搜索
- 搜索页展示热搜榜和搜索历史
- 搜索结果支持歌曲、歌手、歌单三个分类切换
- 搜索历史自动保存，支持删除和清空

### 个人中心

- 查看最近播放记录
- 管理我喜欢的音乐（收藏歌曲）
- 管理收藏的歌单
- 支持一键播放全部

## 说明

本项目为前端演示项目，使用 Mock 数据模拟真实音乐服务。
播放功能使用定时器模拟真实播放进度，不包含真实音频文件。

## License

MIT
