# TokLens Product Requirements Document

> 文档状态：Draft v1.0  
> 文档日期：2026-07-25  
> 产品阶段：Pre-MVP  
> 目标市场：美国、英国、加拿大、澳大利亚及欧洲英语市场  
> 产品类型：Public TikTok Content Explorer + Creator Analytics + Utility Tools  
> 工作品牌：TokLens（上线前需完成商标、域名和应用商店名称审查）

---

## 0. Executive Summary

TokLens 是一个面向英语市场的 TikTok 公共内容研究与创作者分析平台，帮助用户在不被推荐流干扰的环境中查看允许展示的公共内容，并帮助创作者理解自己账号的增长、内容表现和发布节奏。

产品不以“绕过 TikTok”作为价值主张，也不把匿名性包装为规避访问控制。核心价值是：

1. **Focused viewing**：以更清晰、更少干扰的方式查看可合法展示的公共内容。
2. **Creator-owned analytics**：通过用户授权的数据分析创作者本人的账号。
3. **Decision-ready insights**：将零散的公开指标转化为趋势、对比和可执行洞察。
4. **Transparent utilities**：提供计算方法透明、边界清晰的轻量工具。

MVP 必须优先验证两个假设：

- 用户是否愿意使用一个独立、清爽的公共 TikTok 内容查看入口。
- 创作者是否愿意授权账号，以持续获得比 TikTok 原生界面更清晰的历史趋势和内容洞察。

竞争对手分析和媒体保存具有较高需求，但数据授权、版权及平台条款风险更高，不应成为 MVP 上线依赖。

---

## 1. 产品背景与问题定义

### 1.1 市场问题

TikTok 的内容消费、创作者运营和营销研究发生在同一个平台内，但三类任务的目标完全不同：

- 普通用户希望快速查看某个公开账号或视频，不希望登录、安装 App 或进入推荐流。
- 创作者希望理解增长原因，而不是只看到当前累计数值。
- 营销人员希望高效筛选和比较创作者，而不是依赖截图和手工表格。

目前市场中的 Viewer 和 Downloader 产品通常强调快速工具流量，但存在以下普遍机会：

- 工具之间缺乏统一身份和数据模型。
- 页面重广告、信任感弱，难以转向付费分析。
- 指标只展示快照，没有趋势、基准和解释。
- 数据来源、隐私、版权及更新频率不透明。
- 大量 SEO 页面内容薄弱，难以建立长期品牌。

### 1.2 要解决的核心问题

**How might we turn a public TikTok link into a trustworthy, focused research workspace?**

TokLens 应让用户从一个账号名或链接开始，逐步完成：

```text
Open → Understand → Compare → Track → Decide
```

### 1.3 产品原则

1. **Public does not mean unrestricted**：仅处理允许访问和展示的数据。
2. **Consent for owned analytics**：本人账号分析默认要求明确授权。
3. **Insights before dashboards**：优先回答问题，不堆砌图表。
4. **Transparent methodology**：所有衍生指标提供定义、时间窗和数据新鲜度。
5. **Useful without signup, better with signup**：公共工具可低摩擦使用，高价值能力需要账户。
6. **SEO pages must solve a task**：不创建只有关键词替换的薄页面。
7. **Mobile is the default context**：主要查看任务必须在单手移动端完成。
8. **Platform resilience**：任何单一数据供应商失效时，产品应可降级而非整体不可用。

### 1.4 非目标

TokLens 不计划：

- 绕过私密账号、年龄限制、地区限制、登录墙或其他访问控制。
- 获取或展示非公开数据。
- 提供批量抓取器或对外出售原始个人数据。
- 冒充 TikTok 官方产品或暗示与 TikTok 存在未获授权的合作关系。
- 在没有明确权利基础时托管、永久复制或商业化第三方视频。
- 为刷量、骚扰、身份识别或其他滥用行为提供工具。
- 在 MVP 阶段构建社交网络、内容发布器或完整 influencer CRM。

---

## 2. 产品定位

### 2.1 定位声明

**For creators, marketers, and curious viewers who need clarity beyond the feed, TokLens is a public TikTok discovery and creator intelligence workspace that turns authorized and publicly displayable signals into focused views, understandable trends, and better decisions.**

### 2.2 中文解释

TokLens 不是单一的匿名 Viewer，也不是只服务企业的昂贵分析平台。它以免费公共查看工具获得用户，以授权的创作者分析建立留存和付费价值，再逐步扩展到合规的竞品与 influencer research。

### 2.3 价值主张

| 用户     | 现有痛点                     | TokLens 价值                         |
| -------- | ---------------------------- | ------------------------------------ |
| 普通用户 | 登录、安装、推荐流干扰       | 快速、清晰地打开允许展示的公共内容   |
| 创作者   | 数据分散，只能看到当前快照   | 形成历史趋势、增长解释和内容模式     |
| 营销人员 | 手工收集截图，比较口径不一致 | 统一指标、候选列表和可解释的比较框架 |

### 2.4 差异化

1. 从 Viewer 到 Analytics 使用同一个链接输入和数据语义。
2. 明确区分观测数据、衍生指标和模型推断。
3. 将数据新鲜度、来源和置信度放入产品界面。
4. 免费工具追求低摩擦，但不依赖侵入式广告。
5. SEO 内容与实际工具、方法论和用例互相连接。
6. 以合规、可持续的数据获取方式作为品牌信任资产。

### 2.5 品牌语气

- Clear, calm, evidence-led
- 不使用 “spy”“stalk”“secret access”“bypass”等表达
- 不承诺“完全匿名”或“100% 隐身”
- 不暗示能够访问私密、已删除或受限制内容
- 对估算数据明确使用 estimated、observed 或 based on available public signals

---

## 3. 用户画像

### Persona A：Casual Public Viewer

| 属性     | 描述                                       |
| -------- | ------------------------------------------ |
| 典型年龄 | 18–44                                      |
| 设备     | 80% 以上使用移动端                         |
| 触发场景 | 搜索引擎、朋友分享、查看某个公开视频或账号 |
| 目标     | 尽快看到目标内容，不登录、不进入推荐流     |
| 主要障碍 | 广告过多、链接失效、页面不可信、被要求注册 |
| 付费意愿 | 很低                                       |
| 留存特征 | 低频、任务型                               |
| 成功体验 | 10 秒内理解链接状态并完成查看              |

**Jobs to be Done**

- 当我收到一个 TikTok 链接时，我想直接查看允许展示的内容，以便不安装 App 也能判断它是否值得关注。
- 当我想查看公开账号时，我希望看到一个干净的内容列表，而不是被推荐流带走。

### Persona B：Independent Creator

| 属性     | 描述                                                 |
| -------- | ---------------------------------------------------- |
| 典型规模 | 5K–500K followers                                    |
| 角色     | 个人创作者、小型品牌创始人、freelance social creator |
| 目标     | 增长、提高内容命中率、建立稳定发布节奏               |
| 当前方法 | TikTok 原生数据、截图、Notion/Sheets                 |
| 主要障碍 | 历史趋势有限、难定位增长驱动、比较缺乏基准           |
| 付费意愿 | 中等，约 $9–29/月                                    |
| 留存驱动 | 周报、异常提醒、内容复盘                             |

**Jobs to be Done**

- 当我每周复盘账号时，我想知道哪些内容真正推动了增长，以便决定下周做什么。
- 当表现突然变化时，我想快速识别变化来自单条爆款、发布频率还是整体互动质量。
- 当我尝试新内容方向时，我想比较实验前后的表现，而不是只看播放量。

### Persona C：Influencer Marketer

| 属性     | 描述                                         |
| -------- | -------------------------------------------- |
| 组织     | 品牌、代理商、SMB marketing team             |
| 目标     | 发现、筛选和监测合作创作者                   |
| 当前方法 | 手工搜索、表格、昂贵企业数据库               |
| 主要障碍 | 候选池建立慢、数据时点不一致、虚高指标难判断 |
| 付费意愿 | 较高，约 $49–199/月                          |
| 留存驱动 | 项目列表、比较、导出、报告、团队协作         |

**Jobs to be Done**

- 当我收到 campaign brief 时，我想快速建立候选创作者列表，以便在一天内完成初筛。
- 当我比较候选人时，我希望指标口径一致，并能看到内容与目标品牌是否匹配。
- 当 campaign 进行中时，我想保留可审计的公开表现快照和变化记录。

### Persona D：Social Media Analyst

| 属性     | 描述                                       |
| -------- | ------------------------------------------ |
| 组织     | Agency、媒体、研究和策略团队               |
| 目标     | 识别内容模式、趋势和竞争动态               |
| 主要障碍 | 数据来源碎片化、批量研究成本高、方法难复现 |
| 付费意愿 | 中高                                       |
| 关键要求 | 导出、方法论、时间窗、数据置信度           |

### 3.1 反向用户画像

以下用户不是产品目标：

- 试图访问私密账号或绕过限制的用户。
- 需要大规模个人身份数据或敏感画像的数据经纪商。
- 需要自动刷量、自动互动或骚扰工具的操作者。
- 只需要盗版媒体库或批量下载版权内容的用户。

---

## 4. 用户需求地图

### 4.1 任务分层

| 阶段       | 用户问题             | 核心需求               | 产品响应                               | 成功指标                        |
| ---------- | -------------------- | ---------------------- | -------------------------------------- | ------------------------------- |
| Discover   | 这个链接是什么？     | 解析账号/视频链接      | Universal input + URL normalization    | Valid query success rate        |
| View       | 我能否快速查看？     | 清晰呈现允许展示的内容 | Focused public viewer / official embed | Time to first useful result     |
| Understand | 这些数字意味着什么？ | 指标解释、趋势和时间窗 | Metric definitions + trend views       | Insight interaction rate        |
| Compare    | 谁表现更好？         | 一致口径、可比较对象   | Creator comparison                     | Comparison completion           |
| Track      | 发生了什么变化？     | 历史记录、周报、提醒   | Tracking + digest                      | WAU / retained tracked profiles |
| Decide     | 下一步做什么？       | 可执行建议与证据       | Insight cards + exports                | Report/export/action rate       |

### 4.2 需求层级

#### 基础需求

- 输入用户名或 URL。
- 识别 profile、video、short link 和无效输入。
- 返回明确的成功、无结果、受限、暂不可用状态。
- 移动端快速加载。
- 不强制注册即可完成基础查看。
- 清楚说明数据来源和更新时间。

#### 绩效需求

- 越快返回结果越好。
- 越准确地区分真实值与估算值越好。
- 历史时间越长，创作者分析价值越高。
- 对比口径越一致，营销研究效率越高。
- 周报越能解释变化，创作者留存越高。

#### 兴奋需求

- 自动识别增长拐点及可能驱动内容。
- 将爆款影响与账号基础趋势分离。
- 提供内容主题、时长、发布时间等模式分析。
- 生成可分享的只读报告。
- 对指标变化给出置信度而非绝对判断。

### 4.3 关键用户旅程

#### Journey 1：公共查看

1. 用户从 Google 搜索进入 Viewer 落地页。
2. 输入 TikTok 账号名或公开链接。
3. 系统校验和标准化输入。
4. 系统返回允许展示的官方嵌入或公共元数据。
5. 用户打开原始来源、复制标准链接或继续分析。

**关键失败状态**

- 输入不是 TikTok URL 或用户名。
- 内容不存在、已删除或不可公开访问。
- 内容受到年龄、地区或登录限制。
- 数据供应商超时或达到额度。

#### Journey 2：创作者连接本人账号

1. 用户从 Viewer 或 Analytics 页面点击 “Connect my TikTok”。
2. 系统展示将读取的数据、用途和保留期限。
3. 用户通过 TikTok OAuth 授权。
4. 系统完成首次同步并显示数据新鲜度。
5. 用户查看 Overview、Content 和 Trends。
6. 七天后收到首份周报。

#### Journey 3：营销人员初筛

1. 用户创建 research list。
2. 添加允许研究的公开账号或已获授权账号。
3. 查看统一指标和内容样本。
4. 添加标签与备注。
5. 生成 CSV 或只读报告。

该旅程只有在数据来源、条款和隐私审查通过后才能开放。

---

## 5. 核心功能优先级

### 5.1 优先级方法

使用四项加权评分：

- User value：用户价值，40%
- Strategic fit：与 Viewer → Analytics 增长飞轮的匹配度，25%
- Compliance confidence：合规和数据来源确定性，20%
- Delivery confidence：交付可控性，15%

评分采用 1–5 分。任何功能即使总分较高，只要未通过合规 Gate，也不得上线。

### 5.2 优先级表

| 功能                                    | 用户价值 | 战略匹配 | 合规确定性 | 交付确定性 | 优先级 | 决策                           |
| --------------------------------------- | -------: | -------: | ---------: | ---------: | ------ | ------------------------------ |
| Universal URL/username input            |        5 |        5 |          5 |          5 | P0     | MVP                            |
| Input validation and result states      |        5 |        5 |          5 |          5 | P0     | MVP                            |
| Official public video embed             |        4 |        5 |          4 |          4 | P0     | MVP，需验证具体展示条款        |
| TikTok OAuth / account connection       |        5 |        5 |          5 |          3 | P0     | MVP                            |
| Own-account overview                    |        5 |        5 |          5 |          4 | P0     | MVP                            |
| Own-content performance table           |        5 |        5 |          5 |          4 | P0     | MVP                            |
| Historical snapshots after connection   |        5 |        5 |          5 |          3 | P0     | MVP                            |
| Metric definitions and data freshness   |        4 |        5 |          5 |          5 | P0     | MVP                            |
| Account deletion and consent revocation |        5 |        5 |          5 |          4 | P0     | MVP                            |
| Weekly creator digest                   |        4 |        5 |          5 |          3 | P1     | MVP if capacity allows         |
| Engagement calculator                   |        3 |        3 |          5 |          5 | P1     | MVP acquisition tool           |
| Watchlist                               |        4 |        4 |          3 |          3 | P1     | Post-MVP compliance gate       |
| Creator comparison                      |        5 |        5 |          2 |          3 | P1     | Post-MVP data gate             |
| CSV export                              |        4 |        4 |          4 |          4 | P1     | Paid beta                      |
| Shareable report                        |        4 |        4 |          4 |          3 | P1     | Paid beta                      |
| Content pattern classification          |        4 |        5 |          3 |          2 | P2     | Later                          |
| Influencer discovery search             |        5 |        4 |          2 |          2 | P2     | Later                          |
| Media saving/download                   |        4 |        2 |          1 |          3 | P3     | Excluded until rights solution |
| Bulk creator scraping                   |        3 |        1 |          1 |          2 | P3     | Excluded                       |

### 5.3 P0 质量标准

- 任何数据字段都必须有来源、最后更新时间和错误状态。
- 用户授权失败时不得创建半完成账户。
- 删除账户后，用户数据必须按政策在规定时间内清除。
- Viewer 的受限状态不得提供绕过指引。
- 关键任务移动端可单手完成。
- 不得用示例数据冒充真实实时数据。

---

## 6. MVP 范围

### 6.1 MVP 目标

在 8–12 周产品周期内验证：

1. SEO 和直接访问能否为 Public Viewer 带来有效任务流量。
2. Viewer 用户是否愿意进入本人账号分析。
3. 授权创作者是否每周返回查看趋势。
4. 用户是否愿意为历史数据、周报和导出付费。

### 6.2 MVP 用户

主要服务：

- Casual Public Viewer
- Independent Creator

暂不以企业营销团队作为 MVP 核心客户。

### 6.3 MVP 功能清单

#### A. Public Viewer

- 支持 username、profile URL、video URL 和受支持 short URL。
- 客户端和服务端双重输入校验。
- 明确的 loading、success、invalid、not found、restricted、rate limited、provider unavailable 状态。
- 使用经允许的嵌入或数据接口展示公共内容。
- 跳转至 TikTok 原始来源。
- 不要求 TokLens 注册即可使用基础查询。
- 查询日志最小化；不将原始查询默认用于广告画像。

#### B. Creator Account Connection

- TokLens email 登录或安全的 magic link。
- TikTok OAuth 授权。
- 授权前权限和用途说明。
- Token 安全保存、刷新和撤销。
- Disconnect TikTok。
- Delete TokLens account。

#### C. Creator Analytics

- Account overview：
  - 当前 follower/following/likes/video count（以授权范围为准）。
  - 连接后的历史快照。
  - 7 天和 30 天变化。
- Content table：
  - 视频、发布时间、描述摘要。
  - 可用的播放、点赞、评论、分享指标。
  - engagement rate，并显示公式。
- Basic insights：
  - top-performing content。
  - posting frequency。
  - median views，避免只使用平均值。
  - 变化异常提示，但不做因果承诺。
- 数据更新时间和同步状态。

#### D. Acquisition Utility

- Engagement Rate Calculator：
  - 支持手工输入。
  - 公式和限制说明。
  - 不声称能够检测 fake followers。

#### E. Trust and Compliance

- Privacy Policy。
- Terms of Service。
- Data Methodology。
- Copyright/reporting contact。
- Data deletion workflow。
- Abuse rate limit。
- Provider status and graceful degradation。

#### F. Product Analytics

- GA4：流量、渠道和 SEO landing page。
- PostHog：产品漏斗、功能使用、留存和实验。
- Google Search Console：查询、页面、索引和 Core Web Vitals。
- Consent 管理符合目标地区要求。
- 不在敏感查询、OAuth token 或个人数据中记录 analytics payload。

### 6.4 MVP 明确排除

- 未授权竞争对手的持续历史跟踪。
- 大规模 influencer 数据库。
- 视频、音频或无水印文件下载。
- R2 长期托管第三方媒体。
- AI 自动生成营销结论。
- 团队成员、角色权限和审批。
- 自动化 campaign management。
- 支付以外的复杂 billing operations。
- Native mobile app。
- 多语言本地化。

### 6.5 MVP 验收标准

#### Viewer

- ≥95% 的受支持格式可被正确分类。
- 非 TikTok 输入不会触发外部数据请求。
- P75 可用结果时间低于 2.5 秒，不含外部平台不可控延迟。
- 所有受限内容返回明确、非绕过式说明。

#### Creator Connection

- OAuth 成功率 ≥90%，排除用户主动取消。
- 100% 授权数据字段可追溯到 scope。
- 用户可在产品内撤销连接和请求删除数据。

#### Analytics

- 所有指标显示时间窗。
- 所有衍生指标可查看公式。
- 缺失数据以 unknown/unavailable 呈现，不显示为 0。
- 首次同步有进度、失败和重试状态。

#### SEO

- 每个可索引页面具有独立搜索意图。
- 无查询参数结果页进入索引。
- 不索引用户输入、个人 dashboard 或低质量动态 profile 页面。
- Sitemap 仅包含稳定、可维护页面。

### 6.6 MVP 关键指标

#### North Star Metric

**Weekly Useful Research Sessions（WURS）**

定义：用户在一个会话中完成至少一项高价值任务：

- 成功查看允许展示的公共内容；
- 查看本人账号趋势；
- 阅读一个洞察；
- 完成一项计算或导出。

#### Acquisition

- Organic non-brand clicks
- Viewer landing page CTR
- Valid query rate
- Cost per connected creator

#### Activation

- Viewer query success rate
- Viewer → Connect TikTok conversion
- OAuth completion rate
- First analytics view completion

#### Retention

- Connected creator W1/W4 retention
- Weekly digest open rate
- Returning analytics sessions

#### Revenue

- Free → Pro conversion
- Trial → paid conversion
- MRR and net revenue retention
- Payment failure/churn

#### Trust and Reliability

- Provider success rate
- Data freshness SLA attainment
- Deletion request completion time
- Copyright/privacy complaint rate
- Abuse-block rate

### 6.7 MVP Go/No-Go 门槛

产品只有同时满足以下条件才能公开上线：

- 已确认每个数据源的授权基础和允许用途。
- TikTok 应用审核和所需 scope 获批，或相应功能保持关闭。
- Privacy、Terms、Methodology 和版权投诉渠道上线。
- 删除、撤销授权和数据保留流程通过测试。
- 安全评审无 Critical/High 未解决问题。
- 受限内容、provider failure 和 rate limit 均可安全降级。
- 不依赖未经批准的大规模抓取作为核心体验。

---

## 7. 后续扩展路线

### Phase 0：Validation and Compliance

**目标**：确认数据可行性和核心需求。

- 10–15 名创作者访谈。
- 5–8 名营销人员访谈。
- Viewer 搜索意图和 landing page 测试。
- TikTok Developer app、scope 和审核流程。
- 数据保护影响评估。
- 商标、域名和品牌审查。

**退出条件**

- 至少 60% 目标创作者愿意连接账号查看历史趋势。
- 明确一条可持续、可审核的数据来源路径。

### Phase 1：MVP

**目标**：上线 Viewer + Own-account Analytics。

- Public Viewer。
- OAuth 和本人数据。
- 连接后的历史快照。
- 基础周报。
- Engagement Calculator。
- Free/Pro billing。

**退出条件**

- W4 creator retention ≥20%。
- Viewer → creator connect ≥2%。
- 至少 20 个有效付费用户或明确的付费访谈证据。

### Phase 2：Creator Growth Workspace

**目标**：提升留存和付费价值。

- 90 天历史趋势。
- 自定义时间窗。
- 内容标签与 collection。
- Growth spike detection。
- 周报和异常提醒。
- CSV/PDF/shareable report。
- Benchmarks based on consented or licensed aggregate data。

### Phase 3：Compliant Competitor and Influencer Research

**目标**：服务 marketer。

- Watchlists。
- Side-by-side creator comparison。
- Campaign research lists。
- 备注、标签、筛选和导出。
- 团队 workspace。
- 只使用获授权、获许可或经法律审查允许的公开数据。

**前置门槛**

- 数据来源协议和允许用途书面确认。
- 隐私、删除、异议和数据时效流程成熟。
- 不以 Research API 的非商业资格作为商业产品依赖。

### Phase 4：Content Intelligence

**目标**：从指标展示升级为决策支持。

- Content theme clustering。
- Hook、duration、posting-time pattern analysis。
- Brand-safety review assistance。
- Comparable cohort benchmarks。
- 可解释的 insight confidence。

所有 AI 输出必须：

- 标记为推断。
- 展示所用数据范围。
- 避免推断敏感属性。
- 支持用户纠正和反馈。

### Phase 5：Platform and Ecosystem

- API access for approved customers。
- Webhooks and scheduled exports。
- Agency dashboards。
- Data warehouse integrations。
- Additional short-form platforms，前提是品牌和数据模型不过度依赖 TikTok。

---

## 8. 商业模式

### 8.1 收入策略

采用 **Freemium SaaS + usage-based limits**，免费 Viewer 负责获客，Creator Analytics 负责首次付费，团队和研究能力提高 ARPU。

不建议 MVP 依赖展示广告：

- 会损害 Viewer 信任和性能。
- 容易将产品锁定在低价值工具流量。
- 与后续 creator/marketer 付费定位冲突。

### 8.2 建议套餐

| 套餐         |         建议价格 | 目标用户            | 主要能力                                      |
| ------------ | ---------------: | ------------------- | --------------------------------------------- |
| Free         |               $0 | Viewer、新创作者    | 有限 Viewer 查询、1 个连接账号、基础 7 天概览 |
| Creator Pro  | $15/月或 $144/年 | 独立创作者          | 90 天历史、周报、内容分析、导出               |
| Research Pro |           $59/月 | Freelancer/marketer | 合规前提下的 lists、比较、更多导出            |
| Team         |        $149/月起 | Agency/brand team   | 多席位、共享 workspace、报告和审计记录        |

价格是假设，必须通过访谈和 pricing test 验证。

### 8.3 免费限制原则

- 限制查询频率，而不是制造虚假加载。
- 对游客使用 IP/device-level abuse limits，但避免形成侵入式指纹。
- 免费用户仍能理解方法和数据来源。
- 不将隐私保护作为付费功能。

### 8.4 付费墙位置

适合付费：

- 更长历史数据。
- 自动周报和提醒。
- 高级对比。
- 导出和分享报告。
- 多 workspace 和团队功能。

不适合付费：

- 隐私政策。
- 删除账户。
- 断开授权。
- 数据来源和方法说明。
- 基础错误状态。

### 8.5 单位经济模型

重点监控：

- Organic CAC。
- OAuth connected creator CAC。
- Provider/API cost per WURS。
- Storage cost per connected creator。
- Support cost per paid account。
- Gross margin by plan。
- Monthly logo churn。

商业模式成立的基础假设：

- Viewer 的 SEO 获客成本显著低于付费投放。
- Creator Pro 的月均第三方数据成本低于收入的 15%。
- Research 产品的数据许可成本不会破坏 70% 以上目标毛利。

---

## 9. 风险分析

### 9.1 风险矩阵

| 风险                              | 概率 | 影响 | 等级     | 缓解措施                                                  | Owner               |
| --------------------------------- | ---- | ---- | -------- | --------------------------------------------------------- | ------------------- |
| 平台条款禁止或限制自动化访问      | 高   | 致命 | Critical | 官方 API/Embed 优先；上线前法律审查；provider kill switch | Product + Legal     |
| API 应用审核被拒或耗时不可控      | 中高 | 高   | High     | Sandbox 验证；功能开关；不将发布日期绑定未获批 scope      | Product             |
| Research API 不允许商业用途       | 高   | 高   | High     | 不作为商业 MVP 数据源；使用授权数据或许可供应商           | Product + Legal     |
| 第三方数据供应商失效              | 高   | 高   | High     | Adapter 架构、多供应商评估、缓存和降级状态                | Engineering         |
| 版权投诉和媒体保存责任            | 高   | 高   | High     | MVP 排除下载；不长期托管第三方媒体；投诉渠道              | Legal + Trust       |
| 展示私密、受限或未成年人内容      | 中   | 致命 | Critical | 严格状态检查、年龄/地区限制尊重、快速下架机制             | Trust + Engineering |
| 用户误以为 TokLens 是 TikTok 官方 | 中   | 中高 | High     | 清晰独立品牌、免责声明、不使用官方品牌视觉                | Marketing + Legal   |
| 数据不准确导致商业决策错误        | 高   | 中高 | High     | 数据来源、更新时间、置信度和估算标识                      | Product + Data      |
| OAuth token 或个人数据泄漏        | 低中 | 致命 | Critical | 加密、最小权限、密钥轮换、审计日志和事件响应              | Security            |
| 大量爬虫滥用 Viewer               | 高   | 中   | High     | Upstash rate limit、WAF、行为阈值和成本保护               | Engineering         |
| Programmatic SEO 形成薄内容       | 中高 | 高   | High     | 质量门槛、noindex 动态查询页、模板人工审查                | SEO                 |
| 美国或其他地区监管变化            | 中高 | 高   | High     | 地区功能开关、数据区域隔离、季度法律复核                  | Legal               |
| 指标被用于骚扰或敏感画像          | 中   | 高   | High     | 禁止敏感属性推断、滥用检测、导出限制                      | Trust               |
| 免费流量成本超过转化价值          | 中   | 高   | High     | 查询额度、缓存、漏斗监控、成本预算                        | Product + Finance   |
| TikTok 品牌依赖导致长期脆弱       | 高   | 中   | High     | TokLens 品牌聚焦 creator intelligence；保留多平台扩展能力 | Strategy            |

### 9.2 合规策略

#### 数据来源分层

| 层级   | 数据类型                           | 默认状态                    |
| ------ | ---------------------------------- | --------------------------- |
| Tier 1 | 用户通过 OAuth 明确授权的本人数据  | 允许，遵守 scope 和保留政策 |
| Tier 2 | TikTok 官方允许嵌入的公共内容      | 允许，遵守展示要求          |
| Tier 3 | 经过合同许可的第三方公共数据       | 法律和供应商用途审查后允许  |
| Tier 4 | 未经许可的自动化抓取数据           | 默认禁止，不得成为生产依赖  |
| Tier 5 | 私密、受限或通过绕过措施获得的数据 | 绝对禁止                    |

#### 隐私要求

- Data minimization。
- Purpose limitation。
- 明确保留期限。
- 用户访问、删除和撤销流程。
- 对 EEA/UK 用户完成适当的 lawful basis 和 consent 设计。
- Analytics 工具不得接收 OAuth token 或完整敏感 payload。
- 出现数据泄漏时有事件响应和通知流程。

#### 内容与版权

- Viewer 优先使用来源平台允许的嵌入。
- 不移除 watermark 或作者标识。
- 不提供默认永久下载或第三方媒体托管。
- 建立 copyright/report abuse 渠道和响应 SLA。
- 用户导出的报告应保留来源链接和采集时间。

### 9.3 产品诚信风险

- 不将相关性写成因果关系。
- 不使用 follower 数量单独判断 creator quality。
- 不将缺失数据等同于 0。
- 不声称能够可靠识别 fake followers，除非有可验证方法。
- 不通过暗黑模式诱导 OAuth 授权。
- 不把无法验证的实时性写成 “live data”。

### 9.4 SEO 风险

- 动态 `?q=` 查询页必须 noindex。
- 未达到独立价值阈值的 programmatic 页面不得进入 sitemap。
- Creator profile 页面上线前需要确认个人数据、删除和异议机制。
- 不通过复制用户 caption 创建低价值页面。
- 不使用 “anonymous” 误导用户认为网络、设备或平台层面完全不可识别。

---

## 10. 数据与指标定义

### 10.1 数据分类

- **Observed**：从授权或获许可来源直接获得的值。
- **Calculated**：基于 observed 数据按公开公式计算。
- **Estimated**：使用不完整数据估计，必须展示范围或置信度。
- **Inferred**：模型或规则推断，必须允许用户查看依据。

### 10.2 首批指标

| 指标                         | 建议定义                                                      |
| ---------------------------- | ------------------------------------------------------------- |
| Engagement rate by views     | `(likes + comments + shares) / views`                         |
| Engagement rate by followers | `(likes + comments + shares) / followers at observation time` |
| Median video views           | 选定时间窗内视频播放量中位数                                  |
| Posting frequency            | 时间窗内公开内容数量 / 周数                                   |
| Follower growth              | 当前 follower snapshot - 时间窗起始 snapshot                  |
| View velocity                | 观测时间窗内 view 增量 / 小时；仅在有多个快照时显示           |

指标不得混用不同采集时点的数据而不做说明。

---

## 11. 信息架构

### Public

```text
/
├── /viewer
├── /tools
│   └── /engagement-rate-calculator
├── /analytics
├── /methodology
├── /privacy
├── /terms
└── /contact
```

### Authenticated

```text
/app
├── /overview
├── /content
├── /trends
├── /reports
├── /settings/connections
├── /settings/privacy
└── /settings/billing
```

动态查询结果不应成为 programmatic SEO 页面。

---

## 12. 依赖与开放决策

### 12.1 外部依赖

- TikTok Developer application review。
- Login Kit / Display API scope approval。
- 官方 Embed 可用性和展示政策。
- 数据供应商商业许可。
- Stripe 或其他支付平台。
- Privacy、Terms 和版权政策法律审查。

### 12.2 必须在开发下一阶段前回答

1. TokLens Public Viewer 最终使用哪一种获准数据路径？
2. Viewer 是否只支持 video embed，还是可合规展示 profile-level 内容？
3. TikTok OAuth 可获得哪些字段、历史范围和刷新频率？
4. 是否存在允许商业 competitor analytics 的许可供应商？
5. 媒体保存是否应永久取消，还是只支持用户拥有/授权的内容？
6. 数据保留期分别是多少：游客查询、授权账号、账单和审计日志？
7. 首发地区是否排除存在额外监管不确定性的市场？
8. 定价测试采用免费试用、freemium 还是 waitlist pre-order？

这些问题未回答前，不应进入真实数据连接器或媒体存储开发。

---

## 13. 官方政策依据

本 PRD 的数据边界参考以下 TikTok 官方资料；实施前必须再次核对最新版本：

- [TikTok Developer Guidelines](https://developers.tiktok.com/doc/our-guidelines-developer-guidelines)
- [TikTok Display API — Getting Started](https://developers.tiktok.com/doc/display-api-get-started/)
- [TikTok Research Tools Eligibility](https://developers.tiktok.com/products/research-api/)
- [TikTok Research API FAQ](https://developers.tiktok.com/doc/research-api-faq)
- [TikTok for Developers Products](https://developers.tiktok.com/)

关键结论：

- 正式 API 集成需要应用审核，审核时间没有保证。
- Display API 依赖用户授权及相应 scopes，适合本人账号分析。
- Research Tools 需要申请和批准，资格重点面向公共利益、非商业研究，不应被假定为商业产品数据源。
- TikTok 要求集成应用提供真实附加价值、清晰隐私说明并避免误导用户认为产品属于 TikTok。

---

## 14. Product Decision Log

| 日期       | 决策                                               | 原因                             |
| ---------- | -------------------------------------------------- | -------------------------------- |
| 2026-07-25 | MVP 聚焦 Viewer + authorized own-account analytics | 兼顾获客、留存与数据合规确定性   |
| 2026-07-25 | Competitor tracking 移至 Post-MVP                  | 数据来源和允许用途尚未确认       |
| 2026-07-25 | Media saving 排除在 MVP 外                         | 版权、平台条款和存储责任风险高   |
| 2026-07-25 | 动态查询页默认不索引                               | 避免隐私泄漏、薄内容和索引污染   |
| 2026-07-25 | Research API 不作为商业产品依赖                    | 官方资格主要面向获批的非商业研究 |

---

## 15. 下一阶段建议

下一阶段应是 **Product Validation & Data Feasibility**，而不是直接开发功能：

1. 完成 10–15 个 creator interviews。
2. 完成 5–8 个 marketer interviews。
3. 验证 Viewer 的合规数据路径。
4. 提交或准备 TikTok Developer app review。
5. 完成数据字段和 OAuth scope mapping。
6. 对第三方数据供应商进行法律、稳定性和成本评估。
7. 输出 MVP user flows、data contract 和 compliance checklist。

在上述输出通过 Product、Legal、Security 三方 Gate 后，再进入技术实施。
