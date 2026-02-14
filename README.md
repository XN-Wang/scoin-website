# Scoin Website

官网项目：香港稳定币控股公司（Scoin）品牌展示、信息披露与客户服务入口。支持繁体中文 / 英文。

---

## 技术栈

| 类别     | 技术 |
|----------|------|
| 框架     | React 19 |
| 构建     | Vite 6 |
| 语言     | TypeScript |
| 样式     | Tailwind CSS（CDN） |
| 动效     | Framer Motion |
| 图表     | Recharts |
| 多语言   | 自维护 `translations`（EN / ZH） |

---

## 项目结构

```
scoin-website/
├── index.html              # 入口 HTML，Tailwind + 全局样式
├── types.ts                # 全局类型：Language, NavItem, Product 等
├── App.tsx                 # 根组件：路由状态、Navbar、Footer、页面渲染
├── main.tsx                # React 挂载入口
├── vite.config.ts          # Vite 配置（端口 3000、别名 @、env）
├── package.json
│
├── components/             # 公共组件
│   ├── Navbar.tsx          # 顶栏：Logo、导航、语言切换、登录/注册
│   ├── Footer.tsx          # 页脚：联系方式、多列导航、社交
│   └── AnimatedCounter.tsx # 数字滚动动画（可配置前后缀、字号）
│
├── pages/                  # 页面（按 currentPage 切换）
│   ├── Home.tsx            # 首页：Hero、产品入口、优势、数据等
│   ├── ScoinHK.tsx         # Scoin-HK 产品页
│   ├── ScoinUS.tsx         # Scoin-US 产品页
│   ├── About.tsx           # 关于我们：Banner、公司介绍、管理团队、联系+表单
│   ├── Partners.tsx        # 合作伙伴：Hero、Logo 墙、权益、增长方向、申请表单
│   ├── Support.tsx         # 客户支持：FAQ、投诉入口
│   ├── Disclosure.tsx      # 信息披露入口（若有）
│   ├── DisclosureReserves.tsx   # 储备资产：左侧图表、右侧数据卡片
│   ├── DisclosureCirculation.tsx # 发行与流通：左侧趋势图、右侧数据卡片
│   ├── DisclosureAudit.tsx       # 审计报告
│   └── DisclosureWhitepaper.tsx # 白皮书
│
├── translations/           # 多语言文案
│   ├── index.ts            # 合并 en/zh，导出 translations、getT
│   ├── en.ts               # 英文键值
│   └── zh.ts               # 繁体中文键值
│
├── public/                 # 静态资源（根路径访问）
│   └── images/             # 图片：about_banner.png、partner_banner.png 等
│
└── docs/                   # 需求与说明
    └── 官网需求文档_v1.1.md
```

---

## 路由与导航

- 路由为**内存状态**，由 `App.tsx` 中 `currentPage` 与 `setCurrentPage` 控制。
- `Navbar` 通过 `currentPage` / `setCurrentPage` 高亮当前项并切换页面。
- 页面 ID 与对应组件：
  - `home` → Home  
  - `scoin-hk` → ScoinHK  
  - `scoin-us` → ScoinUS  
  - `about` → About  
  - `partners` → Partners  
  - `support` → Support  
  - `disclosure-reserves` → DisclosureReserves  
  - `disclosure-circulation` → DisclosureCirculation  
  - `disclosure-audit` → DisclosureAudit  
  - `disclosure-whitepaper` → DisclosureWhitepaper  

---

## 多语言

- 语言类型：`Language = 'EN' | 'ZH'`，存于 `App` 的 `lang` 状态。
- 使用方式：页面内 `const t = (key: string) => translations[key]?.[lang] || key`，文案用 `t('key')`。
- 文案来源：`translations/en.ts`、`translations/zh.ts` 为源，`translations/index.ts` 合并并导出 `translations`。

---

## 本地运行

**环境要求：** Node.js

1. 安装依赖：
   ```bash
   npm install
   ```
2. （可选）若需 Gemini 相关功能，在项目根目录配置 `.env.local`，设置 `GEMINI_API_KEY`。
3. 启动开发服务器：
   ```bash
   npm run dev
   ```
   默认访问：http://localhost:3000

4. 构建与预览：
   ```bash
   npm run build
   npm run preview
   ```

---

## 主要页面说明

| 页面 | 说明 |
|------|------|
| 首页 | Hero、产品入口、优势、市场数据、新闻/公告区 |
| Scoin-HK / Scoin-US | 产品介绍、特性、CTA |
| 关于我们 | 本地 Banner 图、公司介绍两段、使命卡片、管理团队一段话、信任四格、联系信息+表单 |
| 合作伙伴 | Hero+配图、双行 Logo 墙、权益三卡、增长三卡（图+动效）、申请表单 |
| 储备资产 | 左右布局：左侧资产分配图，右侧 4 指标卡+信任卡，右侧可滚动无滚动条 |
| 发行与流通 | 左右布局：左侧 Issued/Redeemed 趋势图，右侧 2×2 指标+分期 breakdown，右侧可滚动无滚动条 |
| 客户支持 | FAQ 占位、投诉表单入口 |

---

## 配置与扩展

- **Tailwind**：通过 `index.html` 内 CDN 引入，自定义类与动画在 `<style>` 中（如 `.scrollbar-hide`、`.animate-float-slow`、marquee 等）。
- **别名**：`vite.config.ts` 中 `@` 指向项目根目录，可按需 `import from '@/components/...'`。
- **静态资源**：放在 `public/` 下，引用路径为 `/images/xxx.png`。

---

## 文档

- 产品与页面需求详见：`docs/官网需求文档_v1.1.md`。
