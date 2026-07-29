# TokLens 用户优先产品与内容策略

**文档状态：** Product discovery  
**目标市场：** 美国、英国、加拿大、澳大利亚及欧洲英语市场  
**适用范围：** 产品定位、用户任务、功能优先级与内容策略  
**本阶段不包含：** 新功能开发、批量文章生成、未经验证的数据源接入

---

## 1. 执行结论

TokLens 当前不应该把“匿名浏览、下载、任意账号分析、创作者增长”作为四个同等成熟的承诺。

这些功能面向不同用户，依赖不同数据源，风险和商业价值也完全不同。当前最合理的产品结构是：

1. **主产品：面向独立创作者的自有账号分析**
   - 用户通过 TikTok 官方授权连接自己的账号。
   - 产品保存周期性快照，帮助用户理解增长、内容表现和发布节奏。
   - 这是最有机会形成重复使用、历史数据价值和付费意愿的核心产品。

2. **获客工具：无需登录的计算器与有限公共工具**
   - Engagement Rate Calculator 可以立即完成用户任务，应继续保留并重点优化。
   - Public Viewer、Video Viewer 和 Downloader 只有在能够返回真实结果时才能作为正式产品推广。
   - 在真实数据能力完成前，应标记为 Beta、Preview 或从主要导航降级，不能用“可用工具”的文案制造错误预期。

3. **后续产品：面向管理已授权创作者的营销人员和小型机构**
   - 支持创作者主动授权、团队查看、比较和导出。
   - 不把“无需授权分析任意竞争账号”作为默认商业承诺，除非未来获得合规、稳定、可商用的数据来源。

因此，推荐的产品定位是：

> **A creator analytics workspace for understanding your own TikTok performance, supported by transparent public utilities and calculators.**

对应的用户价值：

> Connect your account, capture reliable performance snapshots, understand what changed, and decide what to publish next.

---

## 2. 三条产品路线比较

### 路线 A：匿名浏览流量优先

**目标用户：** 想快速查看公开主页、视频或故事的普通访问者。

**优势：**

- 搜索需求广，进入门槛低。
- 用户无需注册，工具使用路径短。
- 容易通过 Viewer、Downloader、Privacy 等关键词获得自然流量。

**问题：**

- 用户大多完成一次任务后离开，留存和付费意愿较低。
- 产品价值高度依赖稳定的公共数据或媒体获取能力。
- “匿名”“不会留下记录”等绝对承诺很难被产品自身证明。
- 当前页面主要完成输入验证，尚不能稳定返回用户真正需要的结果。

**投入：** 高  
**数据与合规风险：** 高  
**近期商业确定性：** 低

### 路线 B：创作者自有账号分析优先

**目标用户：** 独立创作者、小型创作者团队和正在建立内容节奏的人。

**优势：**

- 官方授权路径清晰，数据来源和权限可以向用户解释。
- 历史快照会随时间积累价值，天然支持留存。
- 用户愿意为节省分析时间、发现趋势和改进内容决策付费。
- 可逐步扩展为周报、内容实验、提醒、导出和团队协作。

**问题：**

- OAuth 授权增加首次使用摩擦。
- 单次快照只能展示当前状态；趋势价值需要至少两个时间点。
- TikTok 应用审核、权限配置和数据同步必须先完成。

**投入：** 中高  
**数据与合规风险：** 中  
**近期商业确定性：** 高于其他路线

### 路线 C：营销人员研究优先

**目标用户：** Influencer marketer、agency strategist、品牌社媒团队。

**优势：**

- 研究、筛选、比较和汇报具有更高客单价。
- 团队席位、项目、导出和报告容易形成付费套餐。

**问题：**

- 用户通常希望分析任意创作者或竞争账号，但当前官方授权模型主要适合已授权账号。
- 缺少批量比较、工作区、报告和协作能力。
- 如果依赖非官方公共数据来源，稳定性、条款、准确性和商业使用权都需要单独验证。

**投入：** 高  
**数据与合规风险：** 高  
**近期商业确定性：** 中低

### 推荐

选择 **路线 B 作为主产品**，选择性保留路线 A 中真正可完成任务的工具作为获客入口，路线 C 延后到“创作者授权型工作区”阶段。

---

## 3. 用户层级

### 3.1 主用户：独立 TikTok 创作者

**典型状态：**

- 已经持续发布内容，但分析习惯不稳定。
- 知道播放量、点赞数等表面指标，却不确定哪些变化值得关注。
- 可能使用 TikTok 原生分析、电子表格或凭感觉做决定。
- 希望了解自己的增长、内容表现和发布频率，而不是学习复杂的数据分析。

**触发场景：**

- 最近播放量下降或波动。
- 某条视频突然表现很好，想知道为什么。
- 准备调整内容方向或发布时间。
- 想向品牌展示稳定的账号表现。
- 每周复盘时不想手工复制数据。

**核心结果：**

- 快速知道账号近期发生了什么变化。
- 找出表现最好和最差的内容。
- 判断下一周应该继续、停止或测试什么。
- 保留可追踪的历史，而不只是看到当前累计数字。

### 3.2 次级获客用户：指标计算用户

**典型状态：**

- 手中已有粉丝数、平均点赞、评论和分享等数据。
- 需要快速计算 engagement rate。
- 可能是创作者、经纪人、品牌助理或学生。

**核心结果：**

- 看见明确公式。
- 得到可复核的估算结果。
- 理解结果不等于 TikTok 官方指标。
- 在有进一步需求时连接账号获得持续分析。

这是当前最完整、风险最低、最适合自然搜索获客的工具用户。

### 3.3 次级工具用户：公开内容查看者

**典型状态：**

- 有一个 username、profile URL 或 video URL。
- 不想在 TikTok 应用中完成当前查看任务。
- 只想确认公开内容是否存在、查看基础信息或打开公开内容。

**核心结果：**

- 三秒内知道应该粘贴什么。
- 一次点击后看到真实的公开结果。
- 如果无法获取，得到明确且可行动的原因。

在产品能够返回真实结果前，这类用户是“目标用户”，但还不是“已被满足的用户”。

### 3.4 后续付费用户：管理已授权创作者的营销人员

**典型状态：**

- 同时管理多个合作创作者。
- 需要用一致口径比较表现、准备报告和追踪活动。
- 可以邀请创作者授权数据访问。

**核心结果：**

- 在同一工作区管理多个已授权账号。
- 使用相同时间窗口和公式进行比较。
- 导出带来源、时间和限制说明的报告。

### 3.5 明确不服务的用户

- 想绕过私人账号权限的人。
- 想批量抓取或长期保存第三方媒体的人。
- 想购买、操纵或伪造互动数据的人。
- 无权下载或重新发布他人内容的人。
- 要求产品保证“100% 匿名、绝不留痕”的用户。

明确不服务对象能减少错误流量、支持成本和品牌风险。

---

## 4. 用户需要做什么

产品必须把“用户输入什么、点击哪里、得到什么”落实到每类任务，而不只是提供一个通用输入框。

### 4.1 创作者分析任务

**用户需要准备：**

- 一个由本人控制的 TikTok 账号。
- 愿意授予所需的只读权限。

**用户操作：**

1. 点击 `Connect TikTok account`。
2. 在 TikTok 官方授权页面查看并同意所需权限。
3. 返回 TokLens。
4. 创建首次数据快照，或由系统在连接后自动创建。
5. 查看账号概览和近期内容表现。
6. 在后续日期再次同步，以建立可比较的历史。
7. 根据变化采取下一步行动，例如继续某种内容、调整发布频率或复查异常视频。

**产品必须返回：**

- 数据来源、授权账号和最近同步时间。
- 当前账号与内容指标。
- 首次快照也有价值的内容表现摘要。
- 两次及以上快照后的增长和变化趋势。
- 所有估算指标的公式、样本范围和限制。

**主要失败点：**

- 用户不知道为什么需要授权。
- 授权后没有立即看见任何有价值的结果。
- 没有第二次快照，页面一直无法显示趋势。
- 指标没有时间范围或数据来源。
- Token 失效后只显示通用错误，没有重新连接路径。

### 4.2 Engagement Calculator 任务

**用户需要准备：**

- Followers。
- Average likes。
- Average comments。
- Average shares；如果没有，应明确是否允许填 0。

**用户操作：**

1. 输入数字。
2. 查看输入校验。
3. 点击计算。
4. 查看公式、结果和估算说明。
5. 可选择连接账号，减少以后手工输入。

**产品必须返回：**

- 使用的公式。
- 代入后的计算过程。
- 百分比结果。
- `Estimated — not official TikTok data`。
- 对结果的谨慎解释，不能把单一比例直接等同于账号质量。

### 4.3 Public Profile Viewer 任务

**用户需要准备：**

- `@username`、username 或公开 profile URL。

**用户操作：**

1. 粘贴或输入账号。
2. 点击 `View profile`。
3. 查看真实公开资料。
4. 进入 Videos 或 Analytics 时，理解哪些信息可用、哪些需要授权。

**产品必须返回：**

- Avatar、username、bio 和可验证的公开计数。
- 数据获取时间。
- 公开、私密、不存在、限流和暂时不可用等不同状态。
- 不声称能够访问私人内容。

当前实现只完成了解析和界面状态，尚未完整完成这项用户任务。

### 4.4 Video Viewer 任务

**用户需要准备：**

- TikTok 官方域名下的公开 video URL。

**用户操作：**

1. 粘贴 URL。
2. 系统验证域名和 URL 类型。
3. 点击 `View`。
4. 查看可播放内容或明确的官方跳转。

**产品必须返回：**

- 视频预览或经过验证的可用打开路径。
- 作者、描述及可验证的公开信息。
- 不可用原因和安全提示。

### 4.5 Downloader 任务

**用户需要准备：**

- 公开的直接 video URL。
- 对媒体拥有所有权、许可或合法使用依据。

**用户操作：**

1. 粘贴 URL。
2. 通过域名白名单和 URL 校验。
3. 查看预览及文件信息。
4. 选择可用的下载选项。
5. 下载后，临时文件按策略自动清理。

**产品必须返回：**

- 可验证的媒体类型和大小。
- 安全的临时下载链接。
- 文件有效期和清理说明。
- 版权及许可提示。

当前产品只完成了输入和安全验证设计，没有完成真实下载，因此不能将其宣传为已完成的下载器。

### 4.6 Marketer 任务

**用户需要准备：**

- Campaign brief。
- 获得授权的创作者账号，或创作者提供的可信数据。
- 比较目标和统一时间窗口。

**用户操作：**

1. 创建 campaign 或 workspace。
2. 邀请创作者授权，或导入允许的数据。
3. 选择统一的日期范围和指标定义。
4. 比较创作者及内容表现。
5. 添加判断和备注。
6. 导出报告。

该流程属于后续产品，不应由当前公共 Analytics 输入框暗示已经支持。

---

## 5. Jobs To Be Done

### 独立创作者

> 当我的账号表现发生波动时，我想快速知道哪些内容和行为可能与变化有关，从而决定下一周继续什么、停止什么、测试什么。

### 指标计算用户

> 当我手上只有公开计数或手工汇总数据时，我想用透明公式快速得到一个可复核的互动率估算，从而进行初步判断。

### 公开内容查看者

> 当我拿到一个 TikTok 用户名或链接时，我想无需复杂设置就确认公开内容和基础信息，从而完成一次快速查看。

### 创作者营销人员

> 当我管理多个已同意合作的创作者时，我想用统一口径追踪和比较表现，从而筛选合作对象并解释活动结果。

### 自有媒体下载用户

> 当我需要备份自己拥有或获准使用的 TikTok 视频时，我想安全地验证并下载文件，从而保存素材，而不让平台永久存储媒体。

---

## 6. 用户任务地图

| 阶段   | 用户问题                 | 用户行为                         | 产品责任                       | 成功信号           |
| ------ | ------------------------ | -------------------------------- | ------------------------------ | ------------------ |
| 进入前 | 这个工具适合我的任务吗？ | 搜索、阅读摘要                   | 页面准确描述可完成的任务和限制 | 用户进入正确工具页 |
| 准备   | 我需要提供什么？         | 找 username、URL、账号权限或指标 | 给出输入示例与权限说明         | 首次输入有效       |
| 执行   | 我要点击哪里？           | 输入、授权、计算或同步           | 主操作唯一、清晰、移动端可用   | 任务启动率高       |
| 等待   | 工具正在做什么？         | 等待结果                         | 显示具体进度，不伪造成功       | 用户不重复提交     |
| 结果   | 我得到了什么？           | 阅读数据或预览                   | 显示来源、时间、公式和限制     | 结果可理解         |
| 决策   | 接下来做什么？           | 保存、比较、再次同步             | 提供与当前结果相关的下一步     | 用户完成真实决策   |
| 返回   | 为什么还要回来？         | 查看新快照或周报                 | 展示历史变化而非重复当前值     | 7 日、30 日留存    |

---

## 7. 当前产品与用户任务匹配审计

| 模块                  | 页面承诺                                  | 当前实际能力                                               | 用户任务是否完成 | 产品决定                                          |
| --------------------- | ----------------------------------------- | ---------------------------------------------------------- | ---------------- | ------------------------------------------------- |
| Homepage              | Public Viewer + Creator Analytics         | 可分发至多个工具，但整体承诺宽于能力                       | 部分             | 改为以 creator analytics 为核心，工具按可用性标记 |
| Unified Tool Input    | 自动识别 username/profile/video           | 解析、检测、校验和路由基础完整                             | 只完成输入阶段   | 保留为共享基础设施                                |
| Profile Viewer        | 查看公开资料、视频、分析                  | 可展示状态和占位结构，缺少稳定真实结果                     | 否               | 接入真实能力前标记 Beta 或降低曝光                |
| Video Viewer          | 查看公开视频                              | 输入识别能力存在，真实查看结果不足                         | 否               | 不作为主要 SEO 承诺                               |
| Downloader            | 预览并下载视频                            | 已有安全边界和验证，下载不可用                             | 否               | 页面明确 Preview；完成安全链路后再推广            |
| Creator Analytics     | 账号指标和内容表现                        | 已授权账号快照可以形成可信基础；依赖 OAuth、凭据和多次同步 | 部分             | 作为 P0 主产品完成                                |
| Engagement Calculator | 输入指标并计算互动率                      | 公式、输入、估算结果可独立完成                             | 是               | 作为主要获客工具                                  |
| Blog CMS              | 发布分类内容                              | Markdown、分类、标签、作者和更新时间基础存在               | 是               | 内容发布必须受用户任务和产品可用性约束            |
| 30 篇内容计划         | 覆盖 Privacy、Download、Analytics、Growth | 关键词覆盖较完整，但部分 CTA 指向未完成工具                | 部分             | 下一阶段按用户任务重新排序和删减                  |

### 核心问题

产品当前最大的风险不是页面数量不足，而是：

> 用户从搜索结果进入页面后，页面承诺的结果与工具实际可交付结果不一致。

这会同时伤害信任、转化、留存和 SEO。下一阶段应优先缩小承诺与交付之间的差距。

---

## 8. 产品信息架构建议

### 一级导航

1. **Analytics**
   - Creator Analytics
   - Connect TikTok
   - Engagement Calculator

2. **Public Tools**
   - 只展示真实可用工具。
   - Beta 工具必须有状态标识。

3. **Resources**
   - Creator Analytics
   - Content Decisions
   - Privacy & Public Viewing
   - Responsible Creator Research
   - Owned Media & Rights

4. **Methodology**
   - Data sources
   - Metric formulas
   - Limitations
   - Privacy and retention

### 首页主路径

首页不应让所有访客默认进入同一个输入框。建议将用户分成两条明确路径：

- `Analyze my TikTok account` — 主 CTA
- `Use a free calculator or public tool` — 次 CTA

如果通用输入框继续保留，应明确告诉用户：

- Username/profile/video URL 可以触发哪些已可用结果。
- 连接账号才能获得哪些分析结果。
- 不支持私人账号或未经授权的数据。

---

## 9. 功能优先级

### P0：完成创作者的最小闭环

1. 完成 TikTok OAuth 生产配置、回调和权限解释。
2. 连接成功后自动或一键创建首次快照。
3. 首次快照立即提供账号概览、近期内容排序和数据时间。
4. 第二次快照后展示 followers、likes、views、posting frequency 等变化。
5. 显示数据来源、样本范围、同步时间和公式。
6. 支持 refresh、reconnect、disconnect 和删除数据。
7. 对空数据、权限不足、Token 过期和 API 限制提供不同恢复路径。
8. 保持 Engagement Calculator 完整可用。

### P1：让创作者形成每周使用习惯

1. Weekly performance review。
2. Top-performing posts 与基准比较。
3. 发布频率和内容表现的时间关系。
4. 内容标签、手工备注和实验记录。
5. CSV/PDF 自有数据导出。
6. 周报邮件或站内摘要。

### P2：授权型营销工作区

1. 多创作者授权邀请。
2. Campaign 和 workspace。
3. 统一时间范围与指标定义。
4. 比较视图。
5. 客户报告和团队权限。

### 暂缓

- 任意竞争账号的持续追踪。
- 私密内容访问。
- 批量媒体抓取。
- 未完成真实结果的 Viewer/Downloader 大规模 SEO 页面。
- 依赖未经验证数据源的 programmatic SEO 页面。

---

## 10. 信任与安全要求

每个结果页面至少回答：

1. 数据来自哪里？
2. 数据属于哪个账号或 URL？
3. 数据是什么时间获取的？
4. 使用了多少条视频或哪个时间范围？
5. 哪些是原始数据，哪些是计算值？
6. 公式是什么？
7. 哪些结果是 Estimated？
8. 用户可以如何撤销授权或删除数据？

### 文案边界

可以说：

- `View available public information`
- `Estimated engagement rate`
- `Data shown from your authorized TikTok account`
- `Availability depends on the source and account privacy settings`

不要说：

- `100% anonymous`
- `Leaves no trace`
- `View any private account`
- `Official analytics`，除非确实是官方定义和官方返回
- `Real-time`，除非延迟和刷新机制能够证明

---

## 11. 围绕用户任务的内容架构

内容不应从“我们还缺哪些关键词”开始，而应从以下问题开始：

1. 谁在什么场景下遇到问题？
2. 他需要准备什么数据或权限？
3. 他要完成什么步骤？
4. 哪个产品功能能真正完成任务？
5. 用户如何判断结果可靠？
6. 得到结果后应采取什么行动？

### 内容集群 A：Understand your own performance

**用户：** 独立创作者  
**任务：** 连接账号、理解指标、建立复盘习惯  
**可支持的内容：**

- How to connect your TikTok account to TokLens
- What a TikTok analytics snapshot contains
- How to compare two TikTok performance snapshots
- Average views vs total views: what creators should track
- How posting frequency is calculated
- How to read top-performing posts without chasing one viral video

**主要 CTA：** Connect your TikTok account / View your analytics  
**发布条件：** OAuth、首次快照和结果说明必须真实可用。

### 内容集群 B：Make better content decisions

**用户：** 已有内容历史的创作者  
**任务：** 从数据形成下一步行动  
**可支持的内容：**

- A weekly TikTok performance review for solo creators
- How to choose a useful baseline for TikTok videos
- Three content experiments you can measure without overreacting
- How to separate a one-off viral post from repeatable performance
- What to do when average views fall
- How to document content tests and outcomes

**主要 CTA：** Review your latest snapshot / Compare recent posts  
**内容原则：** 不承诺因果，只提供可验证的观察和实验方法。

### 内容集群 C：Calculate and interpret engagement

**用户：** 创作者、经纪人、品牌助理  
**任务：** 使用已有数据得到透明估算  
**可支持的内容：**

- TikTok engagement rate formula explained
- Engagement rate by followers vs by views
- What counts should be included in a TikTok engagement calculation
- Why two engagement calculators can show different results
- How sample size changes an engagement-rate estimate
- When engagement rate is not enough to evaluate a creator

**主要 CTA：** Calculate engagement rate  
**发布条件：** 每篇内容采用与工具一致的公式和限制说明。

### 内容集群 D：View public content and understand privacy

**用户：** 公开内容查看者、创作者  
**任务：** 理解公开可见性、查看历史和限制  
**可支持的内容：**

- What information is public on a TikTok profile?
- Does TikTok show who viewed your profile?
- Public vs private TikTok accounts
- Why a public TikTok profile may be unavailable
- What a third-party viewer can and cannot access

**主要 CTA：** View public profile，仅在真实查看能力可用后启用。  
**替代 CTA：** Read the privacy methodology / Open the public TikTok URL。

### 内容集群 E：Evaluate creators responsibly

**用户：** 营销人员和创作者经理  
**任务：** 使用一致口径做初步评估  
**可支持的内容：**

- A responsible checklist for evaluating TikTok creators
- How to compare creators using the same time window
- Why follower count alone is not a campaign metric
- Questions to ask creators before requesting analytics access
- How to label estimated and creator-provided data in reports

**主要 CTA：** Calculate an estimate；未来切换为 Invite a creator。  
**边界：** 不暗示当前可持续抓取任意账号数据。

### 内容集群 F：Back up media you own

**用户：** 需要备份自有或获许可媒体的创作者  
**任务：** 安全保存内容并理解权利边界  
**可支持的内容：**

- How to back up TikTok videos you own
- What to check before downloading or reusing a TikTok video
- Why a TikTok video may not be downloadable
- Temporary media processing and file retention explained

**主要 CTA：** Use downloader，仅在完整下载流程上线后启用。  
**发布前：** 先完成文件验证、临时存储、下载链接和清理验证。

---

## 12. 内容发布门槛

每个选题进入写作前必须填写：

| 字段           | 必填问题                               |
| -------------- | -------------------------------------- |
| Target user    | 这篇内容具体服务谁？                   |
| Trigger        | 他为什么现在搜索？                     |
| Task           | 阅读后要完成什么？                     |
| Required input | 他需要准备什么？                       |
| Evidence       | 使用哪些官方来源、产品数据或授权示例？ |
| Product match  | 哪个已可用功能能完成 CTA？             |
| Limitation     | 哪些情况不适用？                       |
| Next action    | 用户得到答案后做什么？                 |
| Success metric | 如何判断内容帮助用户完成了任务？       |

### 不发布的内容

- CTA 指向不能返回真实结果的工具。
- 只是更换关键词、结构高度重复的文章。
- 没有来源、公式或可验证步骤的“最佳实践”。
- 使用虚构账号或虚构增长结果包装成真实案例。
- 为了覆盖长尾关键词而批量生成的低信息页面。
- 把相关性描述成因果关系的增长建议。

---

## 13. 第一批内容优先级

以下是内容路线，不是直接批量生成文章。每篇应经过事实研究、产品验证和独立编辑。

| 顺序 | 用户         | 用户任务     | 建议内容                                                       | CTA             | 上线条件               |
| ---- | ------------ | ------------ | -------------------------------------------------------------- | --------------- | ---------------------- |
| 1    | 指标计算用户 | 选择正确公式 | TikTok Engagement Rate Formula: Followers vs Views             | Calculator      | 已满足                 |
| 2    | 指标计算用户 | 复核结果     | Why TikTok Engagement Calculators Show Different Results       | Calculator      | 已满足                 |
| 3    | 指标计算用户 | 理解限制     | When Engagement Rate Is Not Enough to Evaluate a Creator       | Calculator      | 已满足                 |
| 4    | 创作者       | 理解数据     | What a TikTok Analytics Snapshot Contains                      | Analytics       | 首次快照可用           |
| 5    | 创作者       | 完成授权     | How to Connect TikTok to TokLens and What Permissions Are Used | Connect         | 生产 OAuth 可用        |
| 6    | 创作者       | 比较变化     | How to Compare Two TikTok Performance Snapshots                | Analytics       | 历史趋势可用           |
| 7    | 创作者       | 每周复盘     | A 15-Minute Weekly TikTok Performance Review                   | Weekly review   | P1 页面可用            |
| 8    | 创作者       | 判断爆款     | Viral Post or Repeatable Pattern? A Practical Comparison       | Post comparison | P1 页面可用            |
| 9    | 公开查看者   | 理解边界     | What Information Is Public on a TikTok Profile?                | Methodology     | 可先发布               |
| 10   | 公开查看者   | 理解浏览记录 | Does TikTok Show Who Viewed Your Profile?                      | Methodology     | 需引用 TikTok 官方说明 |
| 11   | 营销人员     | 统一评估     | A Responsible TikTok Creator Evaluation Checklist              | Calculator      | 已满足                 |
| 12   | 营销人员     | 请求授权     | What to Ask Before Requesting Creator Analytics Access         | Future invite   | 工作区规划确认         |

### 内容发布顺序原则

1. 先发布 Calculator 和 Methodology 能真实承接的内容。
2. OAuth 与快照上线后，再发布 creator analytics 操作内容。
3. 历史趋势上线后，再发布增长分析和周复盘内容。
4. Downloader 和 Viewer 完成真实任务后，再扩大对应搜索集群。
5. Programmatic SEO 必须在模板能提供独特、可验证结果后才启动。

---

## 14. 衡量标准

### 创作者

- OAuth 开始率。
- OAuth 完成率。
- 首次快照成功率。
- 从连接到账户首个有效结果的时间。
- 第二次快照创建率。
- 7 日和 30 日返回率。
- 用户查看 top posts、trend 或 weekly review 的比例。

### Calculator

- 有效输入率。
- 计算完成率。
- 结果解释展开率。
- 从计算器进入账号连接的转化率。
- 相同用户的再次计算率。

### Public Tools

- 有效 URL/username 输入率。
- 返回真实结果的成功率。
- 首个结果时间。
- Private、not found、rate limited 和 provider unavailable 的分布。
- 失败后完成替代操作的比例。

### 内容

不以流量作为唯一目标，优先衡量：

- 文章到对应工具的启动率。
- 工具任务完成率。
- 来自内容的账号连接和第二次快照率。
- 用户是否继续阅读与当前任务直接相关的下一篇内容。
- 页面内容更新后，失败输入和支持问题是否减少。

---

## 15. 需要验证的关键假设

### 假设 1

创作者愿意连接账号，以换取比手工记录更清晰的历史趋势。

**验证方法：** 对 5–8 位目标创作者进行任务访谈和可用性测试，观察授权解释、首次价值和第二次返回意愿。

### 假设 2

首次快照中的“近期内容排序 + 清晰口径”足以在没有历史趋势时提供价值。

**验证方法：** 使用授权测试账号，让用户在首次结果中完成“选择下一条要复盘的视频”任务。

### 假设 3

Calculator 用户中有一部分会转化为持续分析用户。

**验证方法：** 在结果后提供与任务相关的连接 CTA，衡量点击、授权开始和完成，不用弹窗强迫注册。

### 假设 4

营销人员愿意要求合作创作者主动授权，而不是只依赖任意公共账号抓取。

**验证方法：** 访谈小型 agency 和 influencer manager，验证邀请、权限、报告和撤销流程。

### 假设 5

Public Viewer 的搜索流量能够带来核心用户，而不只是一次性访问。

**验证方法：** 只有在真实结果能力上线后测试，观察成功查看后的相关任务和账号连接，而不是只看页面访问量。

---

## 16. 下一阶段建议

### 下一阶段 A：确认产品主用户

确认以下产品决策：

- 主用户是否正式设为 **Independent Creator**。
- 主 CTA 是否改为 **Analyze my TikTok account**。
- Marketer 是否限定为管理“已授权创作者”。
- 未完成的 Viewer 和 Downloader 是否标记为 Beta/Preview 并降低主要导航权重。

### 下一阶段 B：重构内容计划

确认主用户后，再修改 `docs/content-plan.md`：

1. 将 30 个主题逐一映射到 user、trigger、task、evidence、CTA 和上线条件。
2. 删除或暂缓无法由当前产品承接的主题。
3. 合并搜索意图重复、用户价值相近的内容。
4. 先形成 8–12 篇高质量内容 brief，不直接生成 30 篇文章。
5. 每篇 brief 在写作前完成官方来源验证和产品可用性检查。

### 下一阶段 C：产品闭环设计

围绕创作者完成一条可测试路径：

> Landing page → Permission explanation → TikTok OAuth → First snapshot → First useful insight → Return for comparison

只有这条路径通过真实账号测试后，才进入下一轮功能扩展和内容放大。
