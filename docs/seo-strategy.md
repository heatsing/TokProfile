# TokLens SEO & GEO Strategy

> 文档状态：Draft v1.0  
> 文档日期：2026-07-25  
> 适用市场：美国、英国、加拿大、澳大利亚及欧洲英语市场  
> 语言：English-first  
> 依赖文档：[Product Requirements Document](./product-spec.md)  
> 原则：Search utility first, evidence before scale, no indexable thin pages

---

## 0. Executive Summary

TokLens 的 SEO 目标不是成为另一个依赖 “free / anonymous / no watermark” 重复页面的工具站，而是建立一个从高意图工具搜索进入、向可信 Creator Analytics 转化的内容与产品体系。

SEO 增长模型：

```text
Tool intent
  ↓
Successful public task
  ↓
Metric education
  ↓
Authorized creator connection
  ↓
Recurring analytics use
  ↓
Paid creator or research plan
```

首阶段重点：

1. 建立 Viewer、Analytics、Calculator 三个可真实完成任务的搜索入口。
2. 用 Guide 与 Methodology 内容解释指标、限制和数据来源。
3. 将 Downloader 关键词作为受合规审查控制的机会池，未提供对应能力前不创建误导页面。
4. Programmatic SEO 仅用于有独有数据、真实计算或持续更新机制的页面。
5. 所有可索引页面同时满足传统搜索和 GEO（Generative Engine Optimization）的可引用性要求。

### 0.1 核心 SEO 原则

- 一项独立搜索意图对应一个 canonical 页面。
- 工具必须位于页面首个主要内容区，而不是藏在长篇 SEO 文案后。
- 动态查询、用户 dashboard 和个人搜索结果默认 `noindex`。
- 不因国家、设备或同义词批量制造近似 doorway pages。
- 不发布产品不支持的能力。
- 不使用无法证明的 “100% anonymous”“live data”“unlimited”“any account”等绝对承诺。
- 页面内容以任务、方法和真实限制为中心，不以字数为目标。
- 每个规模化模板必须通过 indexation gate 和抽样人工审核。

---

## 1. Keyword Map

### 1.1 关键词研究方法

本版 Keyword Map 是基于：

- 产品任务与用户旅程；
- 当前英语 SERP 的定性抽样；
- 搜索意图和商业价值；
- TokLens 的数据、版权与平台条款边界。

本版不虚构搜索量、Keyword Difficulty 或 CPC。上线前应使用 Google Search Console、Google Ads Keyword Planner、Ahrefs 或 Semrush 验证实际需求，并以真实数据更新优先级。

优先级定义：

- **P0**：MVP 应拥有可完成任务的目标页。
- **P1**：MVP 后 1–2 个内容周期。
- **P2**：需要数据积累或产品能力后发布。
- **Hold**：有搜索需求，但当前产品或合规条件不支持。

### 1.2 Viewer Keywords

| Cluster                 | Primary keyword                        | Secondary / variant keywords                                                | Intent               | Canonical target                          | Priority             | Notes                                   |
| ----------------------- | -------------------------------------- | --------------------------------------------------------------------------- | -------------------- | ----------------------------------------- | -------------------- | --------------------------------------- |
| Profile viewer          | tiktok profile viewer                  | view tiktok profile, public tiktok profile viewer, tiktok account viewer    | Tool / transactional | `/tiktok-profile-viewer`                  | P0                   | 仅公开、允许展示的 profile 内容         |
| Video viewer            | tiktok video viewer                    | watch tiktok video online, view tiktok video without app, tiktok web viewer | Tool / transactional | `/tiktok-video-viewer`                    | P0                   | 使用允许的 embed/展示路径               |
| Viewer hub              | tiktok viewer                          | tiktok online viewer, view tiktok online                                    | Broad tool           | `/tiktok-viewer`                          | P0                   | 解释 profile 与 video 两条任务          |
| No-account viewing      | watch tiktok without account           | view tiktok without login, watch tiktok without app                         | Tool + informational | `/guides/watch-tiktok-without-an-account` | P1                   | 不承诺网络层“匿名”                      |
| Public-only explanation | can you view tiktok without an account | can you watch public tiktok without login                                   | Informational        | 同上                                      | P1                   | FAQ/guide intent，不拆分近似页          |
| Anonymous intent        | anonymous tiktok viewer                | view tiktok anonymously, private tiktok viewer                              | Mixed / risky        | `/tiktok-viewer`                          | Hold keyword variant | 页面应纠正边界；绝不承诺 private access |
| Story viewer            | tiktok story viewer                    | anonymous tiktok story viewer                                               | Tool / risky         | No page                                   | Hold                 | 仅在官方能力和合规确认后评估            |
| Live viewer             | tiktok live viewer                     | watch tiktok live without app                                               | Tool / risky         | No page                                   | Hold                 | 实时内容及访问控制风险高                |

#### Viewer 搜索意图规则

- “profile viewer” 和 “video viewer” 具有不同任务，应保留独立页面。
- “anonymous viewer” 是修饰词，不单独创建页面；在 `/tiktok-viewer` 中解释 TokLens 能做和不能做的事情。
- “private TikTok viewer” 不创建目标页，也不通过文案暗示可以访问私密内容。
- `/viewer?q=` 等真实查询结果不得索引。

### 1.3 Downloader Keywords

| Cluster            | Primary keyword                   | Secondary / variant keywords                                | Intent           | Proposed target                              | Priority | Product gate                     |
| ------------------ | --------------------------------- | ----------------------------------------------------------- | ---------------- | -------------------------------------------- | -------- | -------------------------------- |
| Generic downloader | tiktok downloader                 | download tiktok video, tiktok video downloader online       | Tool             | `/tiktok-downloader`                         | Hold     | 版权、平台条款、数据路径全部批准 |
| No-watermark       | tiktok downloader no watermark    | download tiktok without watermark, save tiktok no watermark | Tool / high risk | No indexable page until approved             | Hold     | 当前 PRD 明确排除                |
| Video saver        | save tiktok video                 | tiktok video saver, save my tiktok video                    | Tool             | `/tools/tiktok-video-saver`                  | P2       | 仅限用户拥有或获得许可的内容     |
| Audio extraction   | tiktok to mp3                     | download tiktok audio, tiktok audio downloader              | Tool / high risk | No page                                      | Hold     | 版权及音乐许可风险               |
| Slideshow          | tiktok slideshow downloader       | save tiktok photos                                          | Tool / high risk | No page                                      | Hold     | 版权及数据路径未确认             |
| Device guide       | how to save your own tiktok video | save your tiktok draft, download your own tiktok            | Informational    | `/guides/how-to-save-your-own-tiktok-videos` | P2       | 只介绍官方/权利明确的方法        |

#### Downloader SEO 决策

Downloader 相关查询具有高流量潜力，但不是当前 MVP 能力。SEO 团队不得：

- 提前发布 `/tiktok-downloader` 并展示无效输入框；
- 使用 “no watermark” 获取流量后跳转到 Viewer；
- 创建 MP3、HD、4K、iPhone、Android 等大量近似 doorway pages；
- 声称 TokLens 可以保存任意第三方内容；
- 使用未经验证的下载次数、评分或国家覆盖数据。

如果未来通过 Product + Legal + Security Gate，只允许两种定位：

1. 保存用户本人拥有的已授权内容；
2. 保存具有明确许可或公共领域权利的内容。

### 1.4 Analytics Keywords

| Cluster              | Primary keyword             | Secondary / variant keywords                                 | Intent                   | Canonical target                      | Priority | Conversion              |
| -------------------- | --------------------------- | ------------------------------------------------------------ | ------------------------ | ------------------------------------- | -------- | ----------------------- |
| Analytics hub        | tiktok analytics            | tiktok analytics tool, tiktok account analytics              | Commercial investigation | `/tiktok-analytics`                   | P0       | Connect TikTok          |
| Creator analytics    | tiktok creator analytics    | analytics for tiktok creators, creator performance analytics | Commercial               | `/tiktok-analytics`                   | P0       | Creator Pro             |
| Own account          | analyze my tiktok account   | tiktok account analysis, check my tiktok analytics           | Transactional            | `/tiktok-analytics`                   | P0       | OAuth                   |
| Profile analytics    | tiktok profile analytics    | tiktok profile stats, profile performance                    | Mixed                    | `/tiktok-analytics`                   | P1       | Own-account first       |
| Video analytics      | tiktok video analytics      | analyze tiktok video, video performance metrics              | Commercial               | `/tiktok-video-analytics`             | P1       | Connected content       |
| Follower growth      | tiktok follower tracker     | track tiktok followers, tiktok follower growth tracker       | Commercial               | `/features/tiktok-follower-growth`    | P2       | Needs history           |
| Competitor analytics | tiktok competitor analysis  | compare tiktok accounts, competitor tracker                  | Commercial               | `/tiktok-competitor-analysis`         | Hold/P2  | Licensed-data gate      |
| Influencer analytics | tiktok influencer analytics | tiktok influencer research tool, creator discovery analytics | B2B commercial           | `/solutions/influencer-marketing`     | P2       | Research Pro            |
| Benchmark            | tiktok benchmarks           | average tiktok engagement rate, tiktok industry benchmarks   | Informational/commercial | `/benchmarks/tiktok`                  | P2       | Requires unique dataset |
| Analytics access     | how to see tiktok analytics | where are tiktok analytics, tiktok analytics requirements    | Informational            | `/guides/how-to-see-tiktok-analytics` | P1       | Analytics hub           |

#### Analytics 防止关键词互相竞争

- `/tiktok-analytics`：产品和授权分析的主商业页面。
- `/tiktok-video-analytics`：单条内容层面的指标与分析。
- `/features/tiktok-follower-growth`：历史跟踪功能页，只有功能上线后发布。
- `/guides/how-to-see-tiktok-analytics`：TikTok 原生入口及 TokLens 补充价值，不与产品页争夺主词。
- `/solutions/influencer-marketing`：角色/用例页，不重复工具定义。

### 1.5 Calculator Keywords

| Cluster               | Primary keyword                        | Secondary / variant keywords                              | Intent               | Canonical target                           | Priority | Notes                       |
| --------------------- | -------------------------------------- | --------------------------------------------------------- | -------------------- | ------------------------------------------ | -------- | --------------------------- |
| Engagement calculator | tiktok engagement rate calculator      | tiktok engagement calculator, calculate tiktok engagement | Tool                 | `/tiktok-engagement-calculator`            | P0       | 首个 acquisition calculator |
| Formula               | tiktok engagement rate formula         | how to calculate tiktok engagement rate                   | Informational        | `/guides/tiktok-engagement-rate`           | P0/P1    | 链接 Calculator             |
| Views-based           | engagement rate by views tiktok        | tiktok view engagement rate                               | Informational/tool   | Calculator 内切换                          | P1       | 不单独建页                  |
| Followers-based       | engagement rate by followers tiktok    | tiktok follower engagement rate                           | Informational/tool   | Calculator 内切换                          | P1       | 不单独建页                  |
| Earnings              | tiktok money calculator                | tiktok earnings calculator, tiktok income calculator      | Tool / YMYL-adjacent | No page initially                          | Hold     | 收益估算误导风险高          |
| Influencer pricing    | tiktok influencer pricing calculator   | tiktok sponsorship rate calculator                        | Commercial/tool      | `/tools/tiktok-influencer-rate-calculator` | P2       | 需真实方法与范围            |
| Growth rate           | tiktok follower growth rate calculator | calculate tiktok follower growth                          | Tool                 | `/tools/tiktok-growth-rate-calculator`     | P2       | 真实公式即可发布            |

#### Calculator 页面标准

- 公式公开。
- 输入值在浏览器端或安全服务端处理，不进入索引。
- 结果说明时间窗、分母和限制。
- 提供一个可复现的 real example。
- 不将 benchmark 判定包装为事实，除非有独有且足够样本的数据。

### 1.6 Guide Keywords

| Cluster             | Primary keyword                          | Secondary questions                                    | Intent                   | Canonical target                           | Priority |
| ------------------- | ---------------------------------------- | ------------------------------------------------------ | ------------------------ | ------------------------------------------ | -------- |
| Watching            | how to watch tiktok without an account   | without login, without app, in browser                 | Informational            | `/guides/watch-tiktok-without-an-account`  | P1       |
| Analytics access    | how to see tiktok analytics              | where to find analytics, creator account analytics     | Informational            | `/guides/how-to-see-tiktok-analytics`      | P1       |
| Engagement          | what is a good engagement rate on tiktok | average engagement rate, engagement by followers/views | Informational            | `/guides/tiktok-engagement-rate`           | P0/P1    |
| Metrics             | tiktok analytics metrics explained       | views, reach, watch time, completion rate              | Informational            | `/guides/tiktok-analytics-metrics`         | P1       |
| Growth              | how to grow on tiktok using analytics    | use data to grow, content performance analysis         | Informational            | `/guides/use-tiktok-analytics-to-grow`     | P1       |
| Video analysis      | how to analyze tiktok video performance  | video metrics, compare posts                           | Informational            | `/guides/analyze-tiktok-video-performance` | P1       |
| Audit               | how to audit a tiktok account            | tiktok account audit checklist                         | Informational/commercial | `/guides/tiktok-account-audit`             | P1       |
| Competitor research | how to analyze tiktok competitors        | compare creator performance                            | Informational            | `/guides/tiktok-competitor-analysis`       | P2       |
| Influencer vetting  | how to evaluate tiktok influencers       | engagement quality, brand fit                          | Informational/commercial | `/guides/evaluate-tiktok-influencers`      | P2       |
| Data limitations    | how accurate are tiktok analytics tools  | third-party analytics limitations                      | Trust/informational      | `/guides/tiktok-analytics-accuracy`        | P1       |
| Saving rights       | can you download tiktok videos legally   | save own videos, creator permission                    | Informational            | `/guides/tiktok-video-download-rights`     | P2       |

### 1.7 Keyword-to-Funnel Map

| Funnel        | Keyword types                      | Primary CTA             | Secondary CTA        |
| ------------- | ---------------------------------- | ----------------------- | -------------------- |
| Awareness     | guides, metrics, how-to            | Try relevant free tool  | Read methodology     |
| Task          | viewer, calculator                 | Complete task           | Analyze your account |
| Consideration | analytics, profile analytics       | Connect TikTok          | View sample report   |
| Evaluation    | competitor, influencer, benchmarks | Join beta / start trial | Read methodology     |
| Retention     | branded + feature searches         | Log in                  | View weekly report   |

---

## 2. URL Architecture

### 2.1 Recommended Site Tree

```text
/
├── /tiktok-viewer
│   ├── /tiktok-profile-viewer
│   └── /tiktok-video-viewer
├── /tiktok-analytics
│   └── /tiktok-video-analytics
├── /tiktok-engagement-calculator
├── /tools
│   ├── /tools/tiktok-growth-rate-calculator          [P2]
│   ├── /tools/tiktok-influencer-rate-calculator      [P2]
│   └── /tools/tiktok-video-saver                     [Hold]
├── /features
│   ├── /features/tiktok-follower-growth              [P2]
│   ├── /features/content-performance                 [P1]
│   └── /features/weekly-creator-reports              [P1]
├── /solutions
│   ├── /solutions/tiktok-creators                    [P1]
│   ├── /solutions/influencer-marketing               [P2]
│   └── /solutions/social-media-agencies              [P2]
├── /guides
│   ├── /guides/watch-tiktok-without-an-account
│   ├── /guides/how-to-see-tiktok-analytics
│   ├── /guides/tiktok-engagement-rate
│   ├── /guides/tiktok-analytics-metrics
│   ├── /guides/use-tiktok-analytics-to-grow
│   ├── /guides/analyze-tiktok-video-performance
│   ├── /guides/tiktok-account-audit
│   └── /guides/tiktok-analytics-accuracy
├── /benchmarks
│   └── /benchmarks/tiktok                             [P2, data gate]
├── /methodology
├── /about
├── /privacy
├── /terms
└── /contact
```

### 2.2 Reserved URLs

以下 URL 可以保留在规划中，但不得在功能和合规条件满足前发布可索引页面：

```text
/tiktok-downloader
/tiktok-competitor-analysis
/tools/tiktok-video-saver
/benchmarks/tiktok/*
```

“Reserved” 不表示创建空页面、Coming Soon 页面或无效工具页。未发布时应返回 404/410，而不是 200 thin content。

### 2.3 Dynamic and Authenticated URLs

```text
/viewer?q={user-input}            noindex, follow
/app/*                            noindex, authenticated
/reports/{private-id}             noindex by default
/share/{opaque-id}                noindex unless user explicitly publishes
/api/*                            non-indexable
```

规则：

- 用户输入不得出现在 sitemap。
- 搜索结果页不得成为 creator profile pSEO 页面。
- Query parameter 页面 canonical 到对应静态工具页，或使用 `noindex`。
- 公开 share 页面只有在用户主动发布、内容权利明确且质量达到门槛时才考虑索引。

### 2.4 URL Conventions

- 全部小写。
- 使用短横线。
- 只在 URL 中保留稳定实体。
- 不加入年份，除非内容本身是年度数据集。
- 不使用 `/blog/` 混装产品指南；统一使用 `/guides/`。
- 不为 `free`、`online`、`anonymous`、`iphone` 等修饰词创建重复页面。
- 美式英语作为 canonical；英国拼写差异不单独建页。
- 页面迁移必须保持一跳 301 和更新 internal links。

### 2.5 Canonical and Indexation Matrix

| Page type                  | Index       | Canonical   | Sitemap     | Notes                    |
| -------------------------- | ----------- | ----------- | ----------- | ------------------------ |
| Static tool landing        | Yes         | Self        | Yes         | 工具必须可用             |
| Guide                      | Yes         | Self        | Yes         | 原创、有专家审核         |
| Methodology                | Yes         | Self        | Yes         | 核心信任页               |
| Dynamic query result       | No          | Static tool | No          | 防止隐私与薄内容         |
| Auth dashboard             | No          | None/self   | No          | 登录保护                 |
| Filter/sort parameter      | No          | Parent      | No          | 避免 faceted duplication |
| Programmatic benchmark     | Conditional | Self        | Conditional | 通过质量 Gate 后         |
| Coming soon                | No          | None        | No          | 最好不发布               |
| Error/provider unavailable | No          | Tool page   | No          | 正确 HTTP 状态           |

---

## 3. Internal Linking Strategy

### 3.1 Linking Model

采用 **Hub → Task → Explanation → Conversion** 模型：

```text
Homepage
  ├── Viewer hub
  │    ├── Profile Viewer
  │    ├── Video Viewer
  │    └── Watch-without-account guide
  ├── Analytics hub
  │    ├── Video Analytics
  │    ├── Metrics guide
  │    ├── Account audit guide
  │    └── Creator solution
  └── Calculator
       ├── Engagement-rate guide
       ├── Metrics guide
       └── Analytics hub
```

### 3.2 Required Link Modules

#### Tool Page

每个工具页包含：

1. 顶部主导航到 Viewer、Analytics、Tools。
2. 工具结果后提供一个情境相关 CTA。
3. “Understand this metric/tool” 链接 1–2 篇指南。
4. “Related tools” 最多 3 个真实相关页面。
5. Footer 链接 Methodology、Privacy、Terms。

示例：

```text
/tiktok-engagement-calculator
  → /guides/tiktok-engagement-rate
  → /guides/tiktok-analytics-metrics
  → /tiktok-analytics
```

#### Guide Page

每篇 Guide 至少链接：

- 1 个主任务工具页；
- 1 个上级 cluster hub；
- 1–3 篇真正补充上下文的 sibling guides；
- `/methodology`，如果文章引用 TokLens 数据或公式。

#### Analytics Page

- 链接到 Metric definitions。
- 链接到 Calculator。
- 链接到 Creator solution。
- OAuth CTA 不应成为唯一出口。

### 3.3 Anchor Text Rules

优先：

- `TikTok engagement rate calculator`
- `view a public TikTok profile`
- `how TikTok engagement rate is calculated`
- `connect your TikTok account`

避免：

- 大量完全一致的商业 anchor；
- `click here`；
- 与目标页功能不符的 anchor；
- 使用 `private viewer`、`no watermark downloader` 指向不支持这些功能的页面。

### 3.4 Link Depth

- P0 工具页距首页不超过 1 次点击。
- P1 Guide 距对应 hub 不超过 1 次点击。
- 所有可索引页距首页不超过 3 次点击。
- Orphan pages 必须为 0。
- 重要页面不能只依赖 sitemap 被发现。

### 3.5 Contextual Conversion Links

| Source context      | Best destination    | CTA example                               |
| ------------------- | ------------------- | ----------------------------------------- |
| Viewer success      | `/tiktok-analytics` | “Analyze your own account over time”      |
| Engagement guide    | Calculator          | “Calculate engagement with both formulas” |
| Calculator result   | Analytics           | “Track this rate automatically”           |
| Metrics guide       | Analytics           | “See these metrics in your account”       |
| Account audit guide | Creator solution    | “Run your weekly creator review”          |
| Accuracy guide      | Methodology         | “See how TokLens handles missing data”    |

### 3.6 Internal Link QA

每月检查：

- broken internal links；
- 3xx internal links；
- orphan pages；
- pages with fewer than two contextual inlinks；
- commercial pages receiving no guide links；
- stale anchors referring to removed capabilities；
- pages linked from sitewide navigation but blocked/noindex。

---

## 4. Content Cluster Strategy

### 4.1 Cluster A — Public Viewing

**Pillar:** `/tiktok-viewer`

**Spokes:**

- `/tiktok-profile-viewer`
- `/tiktok-video-viewer`
- `/guides/watch-tiktok-without-an-account`
- `/guides/tiktok-analytics-accuracy`

**Search need:** 在浏览器中查看允许展示的 TikTok 公共内容。

**Trust angle:** 明确 public-only、no bypass、数据与隐私限制。

### 4.2 Cluster B — Creator Analytics

**Pillar:** `/tiktok-analytics`

**Spokes:**

- `/tiktok-video-analytics`
- `/features/content-performance`
- `/features/weekly-creator-reports`
- `/guides/how-to-see-tiktok-analytics`
- `/guides/use-tiktok-analytics-to-grow`
- `/guides/analyze-tiktok-video-performance`
- `/guides/tiktok-account-audit`

**Search need:** 理解本人账号表现并形成重复复盘习惯。

**Conversion:** TikTok OAuth connection。

### 4.3 Cluster C — Metrics and Measurement

**Pillar:** `/guides/tiktok-analytics-metrics`

**Spokes:**

- `/tiktok-engagement-calculator`
- `/guides/tiktok-engagement-rate`
- `/guides/tiktok-analytics-accuracy`
- `/benchmarks/tiktok`（数据 Gate 后）

**Search need:** 理解公式、时间窗、分母和第三方分析限制。

**Defensibility:** 公式透明、样本说明、版本化 methodology。

### 4.4 Cluster D — Creator and Influencer Research

**Pillar:** `/solutions/influencer-marketing`（P2）

**Spokes:**

- `/guides/evaluate-tiktok-influencers`
- `/guides/tiktok-competitor-analysis`
- `/tiktok-competitor-analysis`（数据 Gate 后）
- `/benchmarks/tiktok/*`（数据 Gate 后）

**Search need:** 候选人筛选、比较和研究。

**Gate:** 没有获授权、获许可或合法公开数据路径时，不发布产品能力页。

### 4.5 Cluster E — Media Rights and Saving

**Pillar:** `/guides/tiktok-video-download-rights`（P2）

**Possible spokes:**

- `/guides/how-to-save-your-own-tiktok-videos`
- `/tools/tiktok-video-saver`（产品 Gate 后）

**Positioning:** 只处理用户本人或明确许可的内容；不围绕 watermark removal 建立内容集群。

### 4.6 Editorial Brief Standard

每篇内容在写作前必须有一页 brief：

| Field              | Requirement                             |
| ------------------ | --------------------------------------- |
| Primary query      | 一个主查询                              |
| User task          | 用户读完后能做什么                      |
| Search intent      | Tool / informational / commercial       |
| Existing target    | 是否已有页面防止 cannibalization        |
| Unique value       | 原创截图、公式、数据、实验或专家解释    |
| Product connection | 相关工具或功能                          |
| Evidence           | 官方来源与内部 methodology              |
| Limitations        | 明确不确定性                            |
| Update trigger     | 平台 UI/API/公式/数据发生变化           |
| Reviewer           | Product / Data / Legal / SEO 中的责任人 |

### 4.7 No-AI-Slop Editorial Rules

禁止：

- 将同一段内容替换关键词后发布到多个 URL；
- 仅重述 SERP 前十名；
- 无来源地声称平均 engagement rate；
- 虚构专家、用户、评分、下载量或案例；
- 使用不存在的产品功能作为 CTA；
- 用 2,000 字填充一个 200 字可以完整回答的问题；
- 为“2026”自动刷新年份而不更新实质内容；
- 在没有真实使用过程时生成假的截图和案例。

必须：

- 有明确作者或审核责任人；
- 引用一手来源；
- 展示 last reviewed date；
- 区分 observed、calculated、estimated、inferred；
- 提供真实步骤或可复现计算；
- 在平台变化时重新验证内容。

---

## 5. Programmatic SEO Strategy

### 5.1 pSEO 的适用范围

TokLens 的 pSEO 目标不是“尽可能多生成页面”，而是将结构化、持续更新且对单独查询有价值的数据发布为可引用资源。

允许考虑的模板：

| Template                | Example                                       | Unique value required          | Earliest phase |
| ----------------------- | --------------------------------------------- | ------------------------------ | -------------- |
| Industry benchmark      | `/benchmarks/tiktok/beauty`                   | 合法数据、样本量、时间窗、分布 | P2             |
| Follower-tier benchmark | `/benchmarks/tiktok/10k-50k-followers`        | 中位数、四分位、样本说明       | P2             |
| Metric glossary         | `/metrics/engagement-rate-by-views`           | 定义、公式、例子、限制         | P1, small set  |
| Research report         | `/research/tiktok-engagement-benchmarks-2027` | 原创数据集和分析               | P2             |
| Calculator scenario     | 不创建结果 URL                                | 个性化结果保留 noindex         | Never indexed  |
| Creator profile         | 暂不允许                                      | 权利、数据和独特价值不确定     | Hold           |
| Location page           | 不允许                                        | 容易形成 doorway pages         | Excluded       |
| Device variation        | 不允许                                        | iPhone/Android 内容近似        | Excluded       |

### 5.2 Indexation Gate

每个 programmatic page 在进入 sitemap 前必须全部通过：

#### Data Gate

- 数据来源有书面允许用途。
- 时间窗明确。
- 样本量达到预设最低值。
- 不暴露个人敏感数据。
- 数据可定期刷新或明确归档。

#### Value Gate

- 用户无需跳转即可获得独立答案。
- 页面与同模板其他页面存在实质数据差异。
- 包含至少一个独特表格、分布或真实例子。
- 结论不是只将实体名替换进同一段文字。

#### Quality Gate

- Title/H1/description 与真实页面内容一致。
- 五项 GEO 问题全部回答。
- Schema 与可见内容一致。
- 无 broken data、空图表或占位符。
- 有人工抽样审核记录。

#### Performance Gate

- 核心内容服务端渲染。
- 移动端可完整读取。
- 页面不依赖重型客户端图表才能理解。
- Core Web Vitals 达标。

### 5.3 Publish / Hold / Remove Logic

```text
Generate candidate
  ↓
Validate data
  ↓ fail → Do not publish
Check uniqueness
  ↓ fail → Merge into hub
Human QA sample
  ↓ fail → Fix template/data
Publish noindex pilot
  ↓
Measure usage and quality
  ↓ pass → Index + sitemap
  ↓ fail → Keep noindex or remove
```

### 5.4 Pilot Size

- 首批不超过 20 个页面。
- 至少人工审核 100%。
- 第二批不超过 100 个页面。
- 第二批至少人工审核 25%，并自动验证全部数据字段。
- 在看到 crawling、indexing、engagement 和 conversion 信号前不得扩展到千页级。

### 5.5 pSEO Measurement

- Valid pages submitted vs indexed。
- Crawled currently not indexed。
- Discovered currently not indexed。
- Impressions per indexed page。
- Non-brand clicks per page。
- Tool/analytics assisted conversion。
- Page engagement and return-to-SERP signals。
- Stale-data rate。
- Template-level support or complaint rate。

### 5.6 De-index and Consolidation Rules

页面出现任一情况应 noindex、合并或删除：

- 连续两个更新周期无有效数据；
- 样本量低于公开阈值；
- 与 hub 页内容高度重复；
- 数据授权终止；
- 只有 impression 没有 engagement，且搜索意图不匹配；
- 平台变化导致答案失效；
- 页面产生隐私、版权或误导风险。

---

## 6. Schema Strategy

### 6.1 Schema Principles

- JSON-LD 为首选格式。
- Schema 必须描述页面上用户可见的真实内容。
- 不使用 Schema 声明产品没有的功能。
- 结构化数据用于帮助机器理解，不承诺 rich result。
- 每次模板发布前使用 Google Rich Results Test 和 Schema.org Validator。

### 6.2 Sitewide Schema

#### `Organization`

用于首页和 About：

- `name`
- `url`
- `logo`
- `sameAs`（只有真实官方账号）
- `contactPoint`

#### `WebSite`

用于首页：

- `name`
- `alternateName`
- `url`
- `publisher`

不要添加虚假的 `SearchAction`。只有站内搜索真实可用且 URL 可安全表达查询时才评估；动态用户查询仍应 noindex。

#### `BreadcrumbList`

用于所有二级及以下可索引页面：

```text
Home > Guides > TikTok Engagement Rate
Home > Tools > TikTok Engagement Calculator
Home > Benchmarks > Beauty
```

### 6.3 Tool Pages

使用：

- `WebApplication` 或 `SoftwareApplication`
- `applicationCategory`
- `operatingSystem: "Web"`
- `offers`，仅包含真实价格
- `featureList`，仅列可用功能
- `description`

避免：

- 没有真实用户评价时使用 `aggregateRating`；
- 免费工具写入虚假的限时价格；
- 将第三方 TikTok 内容标记为 TokLens 自有作品。

### 6.4 Guide Pages

使用：

- `Article` 或 `TechArticle`
- `headline`
- `datePublished`
- `dateModified`
- `author`
- `reviewedBy`，只有真实审核人
- `publisher`
- `mainEntityOfPage`
- `citation` 或可见来源链接

`HowTo` 只在页面确实提供完整、可执行步骤时使用。即使标记正确，也不假设搜索引擎一定展示 HowTo rich result。

`FAQPage` 可用于语义表达，但不应作为流量策略依赖；FAQ 必须在页面可见、答案原创且不重复大量模板文本。

### 6.5 Benchmark and Research Pages

可使用：

- `Dataset`
- `Article`
- `dateModified`
- `temporalCoverage`
- `spatialCoverage`
- `measurementTechnique`
- `license`
- `creator`
- `distribution`，仅当确实提供数据下载

必须同时展示：

- 样本量；
- 数据采集期；
- 纳入/排除标准；
- 指标公式；
- 数据限制；
- 更新记录。

### 6.6 Video and Profile Schema

`VideoObject` 只有在页面实际可观看对应视频、缩略图和元数据来源合法时使用。

`ProfilePage` 不用于批量标记未经授权的第三方 creator pages。只有当页面是 TokLens 用户主动公开的本人资料，且可满足隐私、删除和内容质量要求时再评估。

### 6.7 Schema QA Matrix

| Test                              | Frequency      | Owner             |
| --------------------------------- | -------------- | ----------------- |
| Rich Results Test                 | 每个模板上线前 | SEO               |
| Schema.org Validator              | 每个模板上线前 | Engineering/SEO   |
| Search Console enhancement errors | 每周           | SEO               |
| Visible content vs JSON-LD parity | 每月抽样       | Content QA        |
| Stale dates/prices/features       | 每月           | Product Marketing |
| Invalid aggregate ratings         | 持续           | Trust             |

---

## 7. GEO Optimization Strategy

### 7.1 GEO 定义

GEO 在本策略中指让 TokLens 内容更容易被 AI 搜索、答案引擎和生成式搜索体验正确理解、引用和归因。

目标不是为 AI 编写机械摘要，而是提升：

- entity clarity；
- answer completeness；
- evidence traceability；
- extractable structure；
- freshness；
- citation-worthiness。

### 7.2 Mandatory Answer Contract

每个可索引工具页、功能页、指南和 programmatic page 必须清楚回答以下五项：

#### 1. What is this tool?

要求：

- 首屏 40–70 words 的直接定义。
- 说明实际功能，而不是营销形容词。
- 区分 tool、calculator、viewer、analytics product。

模板：

> TokLens TikTok Engagement Calculator is a browser-based tool that calculates engagement rate from the likes, comments, shares, views, and follower values you enter. It supports view-based and follower-based formulas and shows the formula used for each result.

#### 2. Who is it for?

要求：

- 明确角色和使用场景。
- 说明不适用人群。
- 避免 “for everyone”。

模板：

> It is designed for creators reviewing their own performance and marketers comparing metrics with a consistent formula. It is not a follower-authenticity detector and should not be used as the only basis for a partnership decision.

#### 3. How does it work?

要求：

- 3–5 个真实步骤。
- 展示输入、处理和输出。
- 对数据来源和保存方式透明。
- 能展示公式时必须展示公式。

#### 4. Limitations

要求：

- 单独可定位的小节。
- 明确 public-only、授权范围、数据时效和估算。
- 不将限制隐藏在 footer。

#### 5. Real examples

要求：

- 使用可复现数字或真实授权案例。
- 示例必须标记 sample、anonymized 或 real authorized case。
- 不伪造品牌、创作者、结果或推荐语。
- 展示计算过程，而不只展示结论。

### 7.3 Recommended Page Answer Layout

```text
H1: Exact task
├── 40–70 word direct answer / definition
├── Working tool or primary action
├── Who this is for
├── How it works
├── Result interpretation
├── Real example
├── Limitations and data freshness
├── Methodology / sources
├── Related questions
└── Last reviewed + owner
```

### 7.4 Citation-Worthy Content Elements

优先建设：

- 公布公式的 calculator；
- 版本化 methodology；
- 带样本量和分布的原创 benchmark；
- 官方产品变化的实测说明；
- 指标定义表；
- 可复现的 before/after account audit；
- 数据新鲜度和误差说明；
- 原始研究报告和公开数据字典。

避免：

- 没有证据的 “best tool” 声明；
- 无出处统计；
- 大量同义 FAQ；
- 将 AI 摘要当原创研究；
- 只有结论、没有方法的数据页。

### 7.5 Entity Optimization

TokLens 实体信息应在全站保持一致：

| Entity field           | Standard                                                             |
| ---------------------- | -------------------------------------------------------------------- |
| Name                   | TokLens                                                              |
| Category               | Public TikTok content explorer and creator analytics platform        |
| Primary audience       | Viewers, independent creators, influencer marketers                  |
| Geography              | English-speaking markets                                             |
| Relationship to TikTok | Independent product; not affiliated with TikTok                      |
| Data promise           | Authorized and publicly displayable signals only                     |
| Core methodology       | Observed, calculated, estimated, and inferred data clearly separated |

实体强化位置：

- Homepage；
- About；
- Methodology；
- Organization schema；
- Author profiles；
- Product directory profiles；
- 一致的官方社交账号；
- 高质量外部引用和数字公关。

### 7.6 Source and Evidence Formatting

每篇事实型页面：

- 关键声明附近放置来源，而非只在文末堆积链接。
- 优先一手来源：TikTok Developer、TikTok Help、Google Search Central、监管机构、TokLens 原始研究。
- 展示 `Last reviewed`。
- 平台 UI 步骤提供验证日期。
- 数据报告提供 dataset period。
- 推断内容标记为 inference。

### 7.7 Passage-Level Optimization

为了让答案引擎能正确抽取：

- 每个 H2 只解决一个问题。
- 小节开头先给直接答案，再解释。
- 使用语义明确的表头。
- 定义与公式可脱离上下文理解。
- 避免 “it”“this” 等指代不清。
- 图片必须有说明性 alt text 和可见 caption。
- 图表旁提供文字版关键数值。
- 页面结论不依赖 JavaScript 展开后才能读取。

### 7.8 Real Example Standard

每个 real example 必须包含：

| Field          | Requirement                                           |
| -------------- | ----------------------------------------------------- |
| Input          | 完整、可理解的输入值                                  |
| Formula/method | 实际使用的方法                                        |
| Output         | 明确结果                                              |
| Interpretation | 结果代表什么                                          |
| Limitation     | 结果不代表什么                                        |
| Provenance     | Sample / anonymized authorized / public licensed data |

例：

```text
Example input:
Likes 8,400; comments 320; shares 180; views 200,000.

Calculation:
(8,400 + 320 + 180) / 200,000 × 100 = 4.45%.

Interpretation:
The video generated 4.45 interactions per 100 views using this formula.

Limitation:
This does not measure watch time, conversions, audience authenticity,
or whether the video met a specific campaign goal.
```

### 7.9 GEO Measurement

没有单一可靠的“GEO 排名”。组合监控：

- ChatGPT、Perplexity、Copilot、Gemini 等 referral traffic；
- AI search landing pages；
- branded search growth；
- cited/mentioned pages through manual query panels；
- answer-engine citation accuracy；
- server log 中可识别的 AI crawlers；
- assisted conversions from AI referrals；
- original research backlinks and citations；
- zero-click query impressions alongside branded follow-up searches。

每月建立 20–30 个固定测试问题：

- “What is TikTok engagement rate?”
- “How do I calculate TikTok engagement rate by views?”
- “Can I watch a public TikTok video without an account?”
- “What are the limitations of third-party TikTok analytics?”
- “How should creators compare TikTok video performance?”

记录：

- 是否提及 TokLens；
- 是否引用正确页面；
- 答案是否准确；
- 是否错误描述产品能力；
- 竞争来源；
- 引用内容片段。

---

## 8. On-Page Template Requirements

### 8.1 Tool Page Template

| Element        | Requirement                                   |
| -------------- | --------------------------------------------- |
| Title          | Primary task + differentiator，约 50–60 chars |
| H1             | 与真实工具任务一致                            |
| Intro          | 回答 What / Who                               |
| Tool           | 首屏或首屏后立即可用                          |
| Steps          | 3–5 个真实步骤                                |
| Example        | 可复现输入和输出                              |
| Limitations    | 单独小节                                      |
| Methodology    | 公式、数据源、freshness                       |
| Related guides | 2–3 个                                        |
| CTA            | 下一合理任务，不强制注册                      |

### 8.2 Guide Template

- Direct answer。
- Table of contents，仅在长文需要时。
- 官方当前步骤。
- TokLens 的补充价值，不把文章变成销售页。
- 至少一个原创示例、表格或流程。
- Limitations。
- Sources。
- Author、reviewer、dates。
- Related tool。

### 8.3 Benchmark Template

- Dataset period。
- Sample size。
- Median、quartiles，不只展示 average。
- Methodology。
- Inclusion/exclusion。
- Segment definition。
- Comparison caveats。
- Download/export policy。
- Change log。

---

## 9. Technical SEO Requirements

### 9.1 Rendering

- 关键内容和 links 服务端渲染。
- 不要求搜索引擎执行复杂交互才能看到答案。
- Tool 的交互结果可以客户端生成，但公式、说明和 example 必须存在于初始 HTML。

### 9.2 Performance

目标：

- LCP ≤2.5s at P75。
- INP ≤200ms at P75。
- CLS ≤0.1 at P75。
- 移动端与桌面端内容、metadata、schema 等价。

### 9.3 Sitemap

拆分：

```text
/sitemap.xml
/sitemaps/tools.xml
/sitemaps/guides.xml
/sitemaps/features.xml
/sitemaps/benchmarks.xml      only after data gate
```

只包含：

- 200 status；
- canonical；
- indexable；
- 有价值且最新的页面。

`lastmod` 必须反映实质更新，不在每次构建时伪更新。

### 9.4 Robots and Meta Robots

- `/app/`、API、内部搜索结果不索引。
- 不用 `robots.txt` 替代敏感页面认证。
- `noindex` 页面仍需允许 crawler 读取 meta robots，除非有安全原因。
- Filter、sort 和 query 参数统一控制。

### 9.5 Status Codes

- 不存在或从未发布：404。
- 永久移除且无替代：410。
- 有明确替代：301。
- Provider 临时失败：工具页保持 200，结果组件展示降级；不得生成 soft 404。
- 无效用户查询：工具页 200 + noindex 查询状态。

### 9.6 International and Regional Strategy

首发只维护一个 English canonical，不按国家复制：

```text
https://tokprofile.com/tiktok-analytics
```

不创建：

```text
/us/tiktok-analytics
/uk/tiktok-analytics
/ca/tiktok-analytics
```

除非页面存在实质法律、货币、功能或内容差异。未来本地化时使用独立 locale 路径和 hreflang，例如 `/en-gb/`，不得只替换拼写。

---

## 10. Measurement Framework

### 10.1 Primary SEO KPIs

- Non-brand organic clicks。
- Organic WURS（Weekly Useful Research Sessions）。
- Valid tool completion from organic。
- Viewer → authorized analytics conversion。
- Organic connected creator CAC。
- Organic trial and paid conversion。

### 10.2 Supporting KPIs

- Indexed canonical pages。
- Query-to-page intent match。
- CTR by cluster。
- Tool task success rate。
- Guide → tool click rate。
- Guide → OAuth assisted conversion。
- Returning organic users。
- Links and citations to methodology/research。

### 10.3 Guardrail Metrics

- Thin/duplicate indexed pages。
- Dynamic query pages indexed。
- Copyright/privacy complaints from organic landings。
- Search traffic to unsupported features。
- Provider cost per organic task。
- Programmatic pages with zero engagement。
- Manual actions or structured data errors。

### 10.4 Reporting Cadence

| Cadence     | Review                                                              |
| ----------- | ------------------------------------------------------------------- |
| Weekly      | Indexing errors, top query changes, tool success, provider failures |
| Monthly     | Cluster performance, internal links, conversions, GEO query panel   |
| Quarterly   | Keyword map, content pruning, legal/platform changes, pSEO gate     |
| Per release | Canonicals, robots, sitemap, schema, redirect and metadata QA       |

---

## 11. Rollout Plan

### Stage 0 — Foundation

- Finalize canonical domain and brand entity.
- Publish About, Methodology, Privacy, Terms.
- Establish Search Console and analytics baselines.
- Define noindex rules for queries and dashboard.

### Stage 1 — P0 Task Pages

Publish only when each tool works:

1. `/tiktok-viewer`
2. `/tiktok-profile-viewer`
3. `/tiktok-video-viewer`
4. `/tiktok-analytics`
5. `/tiktok-engagement-calculator`

### Stage 2 — Trust and Education

1. `/guides/tiktok-engagement-rate`
2. `/guides/how-to-see-tiktok-analytics`
3. `/guides/tiktok-analytics-metrics`
4. `/guides/tiktok-analytics-accuracy`
5. `/guides/watch-tiktok-without-an-account`

### Stage 3 — Retention and Commercial Pages

- Creator solution。
- Content performance。
- Weekly reports。
- Video analytics。
- Account audit guide。

### Stage 4 — Data-Led SEO

只有数据 Gate 通过后：

- benchmark hub；
- 20-page pSEO pilot；
- original research；
- marketer and agency solution pages。

### Stage 5 — Downloader Decision

Product + Legal + Security 共同决定：

- **Approved narrow use case**：发布 own-content saver 及权利说明；
- **Not approved**：Downloader 页面继续不存在，不因流量机会降低标准。

---

## 12. Governance

### 12.1 Page Ownership

| Page type             | Accountable  | Required reviewers            |
| --------------------- | ------------ | ----------------------------- |
| Viewer/tool           | Product      | SEO, Engineering, Legal/Trust |
| Analytics             | Product      | Data, SEO, Security           |
| Guide                 | SEO/Content  | Subject owner, Product        |
| Benchmark             | Data         | SEO, Legal, Product           |
| Methodology           | Data/Product | Legal, SEO                    |
| Programmatic template | SEO          | Data, Engineering, Legal      |

### 12.2 Content Update Triggers

必须立即复核：

- TikTok API、UI 或政策变化；
- 数据字段或公式变化；
- 产品功能下线；
- 法律/版权边界变化；
- Search Console 出现 manual action 或结构化数据问题；
- 页面收到准确性投诉；
- benchmark 数据过期。

### 12.3 Definition of Done for an Indexable Page

- 搜索意图唯一。
- 对应功能真实存在。
- 五项 GEO 问题完整回答。
- 有真实 example。
- 有 limitations。
- Title、H1、canonical、description 已检查。
- Schema 与可见内容一致。
- Internal links 已加入。
- Mobile QA 和 Core Web Vitals 通过。
- Data/Legal review 按页面类型完成。
- Sitemap 和 `lastmod` 正确。
- 没有占位文案、虚构数字或 unsupported claims。

---

## 13. Source Notes

本策略参考：

- [Google Search Essentials — Spam Policies](https://developers.google.com/search/docs/essentials/spam-policies)：避免 doorway abuse、scaled content abuse 和近似页面。
- [Google Search — Structured Data Gallery](https://developers.google.com/search/docs/appearance/structured-data/search-gallery)：选择搜索引擎实际支持的结构化数据类型。
- [Google Search — General Structured Data Guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)：Schema 必须与可见内容一致，且不保证 rich results。
- [Google Search — Breadcrumb Structured Data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)：表达页面层级。
- [Google Search — Mobile-first Indexing](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing)：移动端和桌面端内容、metadata、structured data 保持等价。
- [TikTok Developer Guidelines](https://developers.tiktok.com/doc/our-guidelines-developer-guidelines)：应用审核、信任、隐私和不得误导用户。
- [TikTok Display API](https://developers.tiktok.com/doc/display-api-get-started/)：授权用户 profile/video 数据的官方路径。
- [TikTok Research Tools](https://developers.tiktok.com/products/research-api/)：研究工具资格和商业用途限制。

实施前需复核这些页面的最新版本。

---

## 14. Immediate Next Deliverables

下一 SEO 阶段应输出：

1. P0 五个页面的逐页 content brief。
2. Keyword Planner/Ahrefs/Semrush 的真实 volume、difficulty 和 SERP feature 数据。
3. Search intent validation screenshots。
4. Canonical/noindex/robots implementation specification。
5. Schema JSON-LD specification。
6. GEO 30-query benchmark panel。
7. Content QA checklist 和 owner matrix。

在真实产品能力和数据来源通过 Gate 前，不发布 Downloader 或批量 creator 页面。
