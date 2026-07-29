# TokLens Product Design System

> 文档状态：Draft v1.0  
> 文档日期：2026-07-25  
> 设计角色：Senior Product Designer  
> 产品范围：Public Viewer + Creator Analytics + Utility Tools  
> 依赖文档：[Product PRD](./product-spec.md) · [SEO Strategy](./seo-strategy.md)  
> 工作品牌：TokLens

---

## 0. Design Direction

### 0.1 Brand Idea

**TokLens turns a noisy social feed into a clear research surface.**

TokLens 的视觉语言来自三个概念：

1. **Lens**：聚焦目标，减少推荐流和无关刺激。
2. **Signal**：从公共或授权数据中识别变化与模式。
3. **Workbench**：工具优先，用户能够直接操作，而不是先阅读营销内容。

品牌不追求 TikTok 的娱乐感，也不采用常见 analytics 产品的蓝紫渐变。TokLens 使用深墨绿、暖中性色和高能见度的酸性绿色，建立“可信研究工具 + 快速实用工具”的独立识别。

### 0.2 Reference Principles

本设计只提取参考产品的交互原则，不复制其 UI、页面结构、文案或品牌：

- **Claptik principle**：首屏只要求一个明确输入，并给出一个直接动作。
- **Tikvib principle**：单次查询后可以逐步探索更深的内容和分析。
- **TokLens interpretation**：入口保持极简，结果通过 progressive disclosure 展开；每一层都标明数据来源、时效和限制。

### 0.3 Product Personality

| Trait        | Means                      | Does not mean                |
| ------------ | -------------------------- | ---------------------------- |
| Clear        | 短句、明确状态、一个主动作 | 过度简化风险和限制           |
| Focused      | 一屏一个任务               | 功能贫乏                     |
| Evidence-led | 指标有公式、时间窗、来源   | 使用复杂术语证明专业         |
| Energetic    | 酸性绿用于动作和增长信号   | 整页高饱和或霓虹渐变         |
| Independent  | 明确 TokLens 品牌和方法    | 模仿 TikTok 颜色、动效或标志 |

### 0.4 Non-Negotiable: The 3-Second Test

任何工具页面在用户进入 3 秒内必须让其知道：

| Question   | UI answer                                      |
| ---------- | ---------------------------------------------- |
| 输入什么？ | 输入框 label、placeholder 和 accepted examples |
| 点击哪里？ | 页面只有一个最高视觉权重的 primary action      |
| 得到什么？ | 按钮附近用一行 outcome promise 说明结果        |

首屏必须同时出现：

```text
Task title
Input label
Input control
Primary button
Expected result
Trust boundary
```

禁止：

- 工具位于两屏营销内容之后；
- 首屏同时出现两个同权重 CTA；
- 只写 “Get started” 而不说明动作；
- placeholder 代替永久 label；
- 用户提交后没有即时状态反馈；
- 为 SEO 在工具上方放置大段正文。

### 0.5 Core Interaction Model

```text
Recognize
  ↓  What can I paste or enter?
Act
  ↓  One primary control
Resolve
  ↓  Validate and identify content type
Inspect
  ↓  Focused result
Understand
  ↓  Metrics, meaning, limitations
Continue
     View source / analyze own account / related tool
```

---

## 1. Design Tokens

### 1.1 Color System

TokLens 采用 light-first 系统。公开工具使用暖色背景，Analytics Dashboard 使用相同 Token 的高密度版本。Dark mode 不进入 MVP，避免维护两个未经验证的视觉系统。

#### Brand Colors

| Token         | Hex       | Usage                                            |
| ------------- | --------- | ------------------------------------------------ |
| `brand.ink`   | `#10211B` | 主文字、primary button、深色背景                 |
| `brand.pine`  | `#173D30` | Secondary brand、analytics 区域、图表主线        |
| `brand.acid`  | `#B9FF66` | Primary accent、active state、positive highlight |
| `brand.cream` | `#FFFCF5` | 页面主背景                                       |
| `brand.sand`  | `#F5F0E5` | 次级区块、soft card、input group                 |

#### Neutral Colors

| Token         | Hex       | Usage                           |
| ------------- | --------- | ------------------------------- |
| `neutral.0`   | `#FFFFFF` | Elevated surface                |
| `neutral.50`  | `#FAF8F2` | Subtle surface                  |
| `neutral.100` | `#F1EFE8` | Hover background                |
| `neutral.200` | `#E2E0D7` | Default border                  |
| `neutral.300` | `#CAC8BE` | Strong border、disabled control |
| `neutral.500` | `#757C76` | Secondary text                  |
| `neutral.600` | `#58625C` | Body-muted                      |
| `neutral.800` | `#24332C` | Secondary heading               |
| `neutral.950` | `#10211B` | Primary text                    |

#### Semantic Colors

| Token         | Hex       | Soft background | Usage                    |
| ------------- | --------- | --------------- | ------------------------ |
| `success.600` | `#087A55` | `#E3F7ED`       | 成功、已连接、可靠增长   |
| `warning.600` | `#A35A00` | `#FFF1D6`       | 过期数据、估算、需要检查 |
| `danger.600`  | `#C63C35` | `#FCE9E7`       | 错误、删除、访问失败     |
| `info.600`    | `#256A8A` | `#E5F3F8`       | 方法、帮助、数据说明     |
| `unknown.600` | `#66716B` | `#EEF0ED`       | 缺失或不可用，不等于 0   |

#### Chart Colors

图表颜色用于区分系列，不用于装饰：

| Token             | Hex       | Meaning           |
| ----------------- | --------- | ----------------- |
| `chart.primary`   | `#173D30` | 当前账号/主要系列 |
| `chart.highlight` | `#8FE63F` | 选中点或正向区间  |
| `chart.blue`      | `#3C7F9C` | 对比系列 A        |
| `chart.amber`     | `#C98222` | 对比系列 B / 注意 |
| `chart.coral`     | `#C85A50` | 下降或风险        |
| `chart.violet`    | `#7869A6` | 对比系列 C        |
| `chart.grid`      | `#E2E0D7` | Grid line         |

#### Color Usage Rules

- `brand.acid` 只占可见页面面积的约 5–10%。
- Acid 上只能使用 Ink 文字和图标。
- 不用颜色作为状态的唯一表达；必须配合 icon、label 或 pattern。
- Success green 与 brand acid 必须在语义上区分：acid 是品牌/动作，success 是状态。
- Danger 只用于错误和破坏性操作，不用于增长下降的普通数据。
- 图表 tooltip 必须同时显示 series name 与数值。
- Muted text 在 Cream/White 上不能低于 `neutral.600` 用于正文。

### 1.2 Surface System

| Level        | Background | Border      | Shadow      | Example               |
| ------------ | ---------- | ----------- | ----------- | --------------------- |
| Page         | Cream      | None        | None        | Public page           |
| Section      | White/Sand | Optional    | None        | Content section       |
| Card         | White      | Neutral 200 | `shadow.sm` | Metric card           |
| Elevated     | White      | Neutral 200 | `shadow.md` | Dropdown, mobile menu |
| Focused dark | Ink/Pine   | White 12%   | `shadow.lg` | Analytics showcase    |

不使用透明玻璃拟态作为主要 surface。真实产品界面优先清晰边界和稳定对比。

### 1.3 Radius

| Token         | Value | Usage                  |
| ------------- | ----: | ---------------------- |
| `radius.xs`   |   6px | Tags、small status     |
| `radius.sm`   |  10px | Small controls         |
| `radius.md`   |  14px | Inputs、buttons        |
| `radius.lg`   |  20px | Cards                  |
| `radius.xl`   |  28px | Tool shell、hero panel |
| `radius.full` | 999px | Pills、avatar          |

规则：

- 一个组件内最多使用两个 radius 层级。
- Dashboard 的高密度 table 不使用大圆角包裹每一行。
- Input 与主按钮在同一个 tool shell 内时，外层 `xl`、内部 `md/full`。

### 1.4 Shadow

| Token       | Value                            | Usage               |
| ----------- | -------------------------------- | ------------------- |
| `shadow.xs` | `0 1px 2px rgba(16,33,27,.06)`   | Input focus base    |
| `shadow.sm` | `0 6px 20px rgba(16,33,27,.08)`  | Card hover          |
| `shadow.md` | `0 18px 50px rgba(16,33,27,.12)` | Dropdown/tool shell |
| `shadow.lg` | `0 28px 80px rgba(16,33,27,.16)` | Hero demo only      |

不使用阴影替代 border；移动端减少大阴影，避免画面浑浊。

---

## 2. Typography

### 2.1 Font Families

| Role    | Font               | Fallback                            | Usage                        |
| ------- | ------------------ | ----------------------------------- | ---------------------------- |
| Display | **Sora Variable**  | `Avenir Next, Segoe UI, sans-serif` | H1、H2、关键数字、品牌       |
| UI/Text | **Inter Variable** | `Segoe UI, Arial, sans-serif`       | Body、button、input、table   |
| Mono    | **IBM Plex Mono**  | `Consolas, monospace`               | Formula、data timestamp、IDs |

字体建议自托管 WOFF2，只加载 Variable Roman；不要为首屏加载不使用的 italic。

### 2.2 Type Scale

#### Display

| Token        | Desktop | Mobile | Line height | Weight | Usage                |
| ------------ | ------: | -----: | ----------: | -----: | -------------------- |
| `display.xl` |    88px |   52px |        0.94 |    750 | Homepage hero only   |
| `display.lg` |    64px |   42px |        1.00 |    720 | Major section        |
| `display.md` |    48px |   36px |        1.04 |    700 | Tool page H1         |
| `display.sm` |    36px |   30px |        1.10 |    700 | Dashboard page title |

#### Text/UI

| Token      | Size | Line height | Weight | Usage                |
| ---------- | ---: | ----------: | -----: | -------------------- |
| `title.lg` | 28px |        1.20 |    700 | Card/section title   |
| `title.md` | 22px |        1.25 |    650 | Subsection           |
| `title.sm` | 18px |        1.30 |    650 | Card title           |
| `body.lg`  | 18px |        1.65 |    400 | Hero supporting copy |
| `body.md`  | 16px |        1.60 |    400 | Default body         |
| `body.sm`  | 14px |        1.55 |    400 | Secondary text       |
| `label.md` | 14px |        1.25 |    600 | Input/button         |
| `label.sm` | 12px |        1.25 |    650 | Badge/table label    |
| `data.lg`  | 32px |        1.05 |    700 | Dashboard metric     |
| `data.md`  | 22px |        1.10 |    700 | Calculator result    |
| `caption`  | 12px |        1.45 |    450 | Timestamp, source    |

### 2.3 Typography Rules

- H1 每页只出现一次。
- 工具页 H1 最大 12 个英文单词。
- Public pages 每行正文控制在 60–75 characters。
- Dashboard table 使用 tabular numerals。
- 大数据必须配 metric label 和时间窗。
- 全大写只用于 12px eyebrow，letter-spacing `0.12em`。
- 不将长段正文设为中心对齐。
- Mobile H1 不使用强制 `<br>`，让文案自然换行。
- 链接不可只靠颜色识别；正文链接使用 underline。

### 2.4 Product Number Formatting

| Context            | Format                      |
| ------------------ | --------------------------- |
| Compact metric     | `842K`, `3.1M`              |
| Tooltip/export     | `842,314`, `3,104,821`      |
| Percentage         | `7.4%`                      |
| Change             | `+6.8%` / `−2.1%`           |
| Unknown            | `Unavailable`，不显示 `0`   |
| Estimated          | `Est. 7.4%`                 |
| Date               | `25 Jul 2026` 或用户 locale |
| Relative freshness | `Updated 12 min ago`        |

---

## 3. Spacing and Layout

### 3.1 Spacing Scale

4px base unit：

| Token      | Value | Typical usage             |
| ---------- | ----: | ------------------------- |
| `space.0`  |     0 | Reset                     |
| `space.1`  |   4px | Icon/text micro gap       |
| `space.2`  |   8px | Label/control gap         |
| `space.3`  |  12px | Compact rows              |
| `space.4`  |  16px | Card internal group       |
| `space.5`  |  20px | Mobile page gutter        |
| `space.6`  |  24px | Default card padding      |
| `space.8`  |  32px | Section group             |
| `space.10` |  40px | Tool result group         |
| `space.12` |  48px | Desktop section           |
| `space.16` |  64px | Mobile major section      |
| `space.20` |  80px | Desktop major section     |
| `space.24` |  96px | Marketing breathing room  |
| `space.32` | 128px | Homepage major separation |

### 3.2 Page Containers

| Container           | Max width | Use                    |
| ------------------- | --------: | ---------------------- |
| `container.page`    |    1200px | Marketing/public pages |
| `container.wide`    |    1440px | Dashboard              |
| `container.tool`    |     760px | Input-first tool       |
| `container.reading` |     720px | Guides/methodology     |
| `container.result`  |    1040px | Viewer results         |

Horizontal gutters：

- 360–479px：20px
- 480–767px：24px
- 768–1023px：32px
- 1024px+：40px

### 3.3 Grid

- Public desktop：12 columns，24px gutter。
- Dashboard desktop：12 columns，16px gutter。
- Tablet：8 columns，20px gutter。
- Mobile：4 columns，16px gutter。

Metric card：

- Desktop：4-up 或 3-up。
- Tablet：2-up。
- Mobile：2-up；长 label 时 1-up。

### 3.4 Breakpoints

| Name  |  Width | Behavior                            |
| ----- | -----: | ----------------------------------- |
| `xs`  |  360px | Small mobile baseline               |
| `sm`  |  480px | Large mobile                        |
| `md`  |  768px | Tablet                              |
| `lg`  | 1024px | Desktop navigation/sidebar          |
| `xl`  | 1280px | Full dashboard                      |
| `2xl` | 1536px | Max canvas, content remains bounded |

不要按设备品牌设计。断点根据内容开始拥挤的时间设置。

---

## 4. Iconography and Illustration

### 4.1 Icons

- 使用 Lucide。
- Default stroke：1.75px。
- Inline icon：16px。
- Button icon：16–18px。
- Card icon：20px。
- Empty state icon：28–32px。
- 同一界面不混用 filled 和 outline icon。
- 常用动作必须同时有文字；只在熟悉动作使用 icon-only。

### 4.2 Brand Mark

TokLens mark：

- Rounded square lens housing。
- 中心圆环代表 lens。
- 小圆点代表 signal。
- Light surface 使用 Ink housing + Acid lens。
- Dark surface 使用 Acid housing + Ink lens。

保护区：Logo mark 高度的 0.5 倍。最小数字尺寸：24px。

### 4.3 Illustration Style

不使用通用 3D 人物或 AI 生成的创作者肖像。产品视觉以：

- abstract metric cards；
- simplified charts；
- anonymized creator initials；
- content frame silhouettes；
- dot grid / measurement marks；
- data annotations；

为主。

所有演示数据必须标注 `Sample data`。

---

## 5. Button

### 5.1 Variants

| Variant   | Background  | Text                  | Use                         |
| --------- | ----------- | --------------------- | --------------------------- |
| Primary   | Ink         | White                 | 页面唯一主动作              |
| Accent    | Acid        | Ink                   | Dark surface 主动作、强转化 |
| Secondary | White       | Ink                   | 次级动作                    |
| Outline   | Transparent | Ink                   | Neutral action              |
| Ghost     | Transparent | Ink/Muted             | Navigation、low emphasis    |
| Danger    | Danger 600  | White                 | 删除/撤销                   |
| Link      | None        | Ink + underline/arrow | Inline navigation           |

### 5.2 Sizes

| Size     |  Height | Padding | Text |
| -------- | ------: | ------: | ---: |
| Small    |    36px |    14px | 13px |
| Medium   |    44px |    20px | 14px |
| Large    |    52px |    24px | 15px |
| Tool CTA |    56px |    28px | 16px |
| Icon     | 44×44px |       — |    — |

Mobile tool CTA 在 480px 以下默认 full width。

### 5.3 States

#### Default

清楚表达动作：

- `View profile`
- `Open video`
- `Calculate engagement`
- `Connect TikTok`

避免：

- `Submit`
- `Go`
- `Continue`
- `Get started`（除非 onboarding 的真实下一步）

#### Hover

- Primary：Ink → Pine。
- Accent：Acid → lighter Acid，不变成 white。
- 位移最多 1px，不使用明显弹跳。

#### Focus

- 2px Acid focus ring。
- 外部 2px Cream/White offset。
- Dark surface 使用 White + Acid 双环。

#### Loading

- 保持原宽度。
- 左侧 16px spinner。
- 文案变为明确状态：`Checking link…`、`Calculating…`。
- 超过 2 秒显示辅助状态。

#### Disabled

- 只在动作确实不可用时使用。
- 必须在附近解释原因。
- 不用 disabled button 替代表单验证。

### 5.4 Button Hierarchy Rule

一个 viewport 内最多：

- 1 个 Primary/Accent；
- 1–2 个 Secondary；
- 其余使用 Ghost/Link。

Modal 内主动作由 modal 自己拥有，不与背景页面竞争。

---

## 6. Card

### 6.1 Card Types

#### Tool Card

- Icon
- Tool name
- One-sentence outcome
- Status badge：Free / Beta / Coming later
- Action link

Minimum desktop height：240px。Mobile 不强制等高。

#### Metric Card

```text
Label                  Status/source
Value
Change · Time window
```

必须回答：

- What metric?
- What value?
- Compared with when?
- Observed or estimated?

#### Insight Card

```text
Signal icon + category
One-sentence finding
Evidence line
Suggested review action
Confidence / limitation
```

禁止写成确定因果：

> Bad: “Tutorial videos caused your follower growth.”

> Good: “Three tutorial videos coincided with 62% of observed follower growth this week.”

#### Content Card

- 9:16 thumbnail or neutral placeholder。
- Duration。
- Published date。
- Caption maximum 2 lines。
- Primary metric。
- Optional status。

#### Trust Card

- Data source。
- Last updated。
- Public / authorized boundary。
- Methodology link。

#### Empty State Card

- Compact icon。
- Specific title。
- Why empty。
- One recovery action。

### 6.2 Card Interaction

- 整卡可点击时，内部不要再放多个不同 destination。
- Hover card 仅提升 `shadow.sm` 和 border，不移动超过 2px。
- Selected card 使用 Ink border + soft Acid background。
- Dashboard metric cards 不默认 clickable；只有有 drill-down 时显示 affordance。

### 6.3 Card Density

| Context     | Padding |     Gap |  Radius |
| ----------- | ------: | ------: | ------: |
| Marketing   | 28–32px |    20px | 20–24px |
| Tool result |    24px |    16px |    20px |
| Dashboard   | 18–20px |    12px | 14–16px |
| Mobile      |    20px | 12–16px | 18–20px |

---

## 7. Input

### 7.1 Universal TikTok Input

这是 TokLens 最重要的组件。

Anatomy：

```text
Label
┌────────────────────────────────────────────────────┐
│ Link icon  @username or public TikTok URL  [Paste] │
└────────────────────────────────────────────────────┘
Accepted examples / validation / privacy note
```

Desktop 可将 CTA 放在同一 tool shell；Mobile 输入和 CTA 垂直堆叠。

### 7.2 Labels and Placeholder

Label：

> TikTok username or public link

Placeholder：

> @username or https://www.tiktok.com/…

Helper：

> Supports public profile and video links.

不使用：

> Enter URL

因为用户无法判断接受何种 URL。

### 7.3 Input Types

| Input        | Use                          |
| ------------ | ---------------------------- |
| URL/username | Viewer、Downloader           |
| Number       | Calculator                   |
| Search       | Dashboard content/filter     |
| Select       | Time range、formula、account |
| Date range   | Analytics                    |
| Token/tag    | Research lists P2            |

### 7.4 States

#### Default

- Visible label。
- Neutral 200 border。
- 48–56px height。

#### Focus

- Ink border。
- 2px Acid ring。
- Paste button remains visible。

#### Valid

- 不使用绿色边框制造噪音。
- 只在系统已识别内容类型后显示：
  - `Profile link recognized`
  - `Video link recognized`

#### Error

- Danger border、icon、具体错误。
- 保留输入值。
- 提供恢复方法。

例：

> This link is not a supported TikTok profile or video URL. Paste the full public link or enter @username.

#### Restricted

不当作普通 validation error：

> This content cannot be displayed because it is private, restricted, unavailable, or no longer public.

不提供绕过 CTA。

#### Loading

- 输入保持可读但暂时 locked。
- 组件内显示 progress。
- 800ms 内不闪现 skeleton。

### 7.5 Calculator Number Input

- Label 永久可见。
- 使用 thousand separators。
- 允许 paste。
- 禁止负数。
- Empty 与 zero 分开处理。
- 输入后即时计算，但 Primary CTA 仍用于 mobile/keyboard 清晰性。
- 公式切换使用 segmented control：
  - By views
  - By followers

---

## 8. Navigation

### 8.1 Public Navigation

Desktop：

```text
[TokLens]     Viewer   Analytics   Tools   Resources      Log in  [Analyze free]
```

原则：

- 高度 72px。
- 左侧品牌，中心产品导航，右侧账户动作。
- Primary CTA 始终指向当前最重要的下一步。
- 不把所有 SEO 页面放进顶栏。

Dropdown：

- Viewer：Profile Viewer、Video Viewer。
- Tools：Engagement Calculator、available utilities。
- Resources：Guides、Methodology。
- 未上线功能不得显示为可点击。

### 8.2 Mobile Public Navigation

```text
[TokLens]                                     [Menu]
```

展开：

- 右侧或全宽 overlay card。
- 每行 48px 以上。
- Viewer / Analytics / Tools / Resources。
- 底部 full-width `Analyze free`。
- Escape、outside click、link click 后关闭。
- 打开后 focus 移入菜单；关闭后返回触发按钮。

### 8.3 App Navigation

Desktop：

```text
┌──────────────┬───────────────────────────────────────┐
│ TokLens      │ Account switcher · Search · Help     │
│ Overview     ├───────────────────────────────────────┤
│ Content      │                                       │
│ Trends       │ Main workspace                        │
│ Reports      │                                       │
│              │                                       │
│ Settings     │                                       │
└──────────────┴───────────────────────────────────────┘
```

- Sidebar：240px。
- 可折叠到 72px，仅在 ≥1280px。
- 当前项 Acid soft highlight + Ink text。
- Account status 位于 sidebar 底部。

Mobile app navigation：

- Top bar：account name + date range。
- Bottom nav：Overview、Content、Trends、More。
- 每项 icon + label。
- Reports、Settings 放入 More sheet。
- Bottom bar 尊重 safe area。

### 8.4 Breadcrumbs

公开二级页使用视觉轻量 breadcrumb：

```text
Home / Tools / Engagement Calculator
```

工具执行区域不需要 breadcrumb 重复占据首屏；可放在 H1 上方并保持一行。

---

## 9. Feedback and States

### 9.1 Loading

| Duration | Pattern                       |
| -------- | ----------------------------- |
| <800ms   | Button spinner only           |
| 800ms–3s | Result skeleton + status copy |
| >3s      | Step status + retry/cancel    |

Viewer status examples：

- `Checking the link…`
- `Identifying public content…`
- `Preparing the profile view…`

不要使用虚假的百分比进度。

### 9.2 Empty

Empty state 必须说明：

1. 为什么为空；
2. 是否正常；
3. 用户能做什么。

例：

> No videos are available in this view. The profile may not have public posts, or the current data source may not expose them.

### 9.3 Error

错误层级：

- Inline：单个 field。
- Section：单个 data panel。
- Page：核心 provider 或 permission failure。
- Toast：非关键确认，不承载必须阅读的错误。

错误文案结构：

```text
What happened
What this means
What the user can do
Reference ID when useful
```

### 9.4 Freshness and Confidence

数据组件统一显示：

- `Updated 12 min ago`
- `Observed`
- `Calculated`
- `Estimated`
- `Unavailable`

Tooltip 解释数据类型。不能使用无法验证的 `Live data`。

---

## 10. Mobile Layout

### 10.1 Mobile Priorities

移动端顺序：

```text
Task
Input
Primary action
Result
Interpretation
Secondary actions
Education
Footer
```

不能将桌面双栏简单缩小。移动端必须重新排序：

- Input 在 visual demo 之前。
- 结果身份信息在 metrics 之前。
- Analytics insight 在 chart 之前。
- 表格变为 prioritized rows/cards，不做水平滚动作为默认方案。

### 10.2 Touch Targets

- Minimum 44×44px。
- Primary CTA 52–56px。
- Bottom nav item width 均分。
- Icon-only control 需要 accessible label。
- 相邻破坏性和安全动作至少间隔 12px。

### 10.3 Sticky Behavior

允许：

- Viewer result 的 compact search bar 在滚动后 sticky。
- Calculator 的 `Calculate` CTA 在键盘关闭后 sticky bottom。
- Dashboard bottom navigation。

避免：

- 多个 sticky bars 堆叠。
- Sticky CTA 遮挡结果或 footer。
- Mobile browser keyboard 打开时强制 sticky CTA。

### 10.4 Mobile Tool Shell

```text
┌──────────────────────────────┐
│ Label                        │
│ [icon  input              ]  │
│ [Primary action           ]  │
│ Helper · Public only         │
└──────────────────────────────┘
```

360px 宽度下：

- 20px page gutters。
- Input 不小于 52px。
- Button full width。
- Placeholder 可截断，但 label 和 helper 不能消失。

### 10.5 Mobile Tables and Charts

- Metric summary 先于 chart。
- Chart 默认 7/30 日，支持 segmented time range。
- Tooltip 可点击固定，不只依赖 hover。
- Content table 改为 list row：
  - thumbnail；
  - caption；
  - views；
  - engagement；
  - date；
  - overflow action。
- Export 和高级 columns 移至 desktop 或 detail sheet。

---

## 11. Page Design 1 — Homepage

### 11.1 Page Goal

在 3 秒内让用户理解：

- 输入 `@username` 或 public TikTok link；
- 点击 `Explore now`；
- 获得 focused public view，之后可连接本人账号分析。

### 11.2 Primary Audience

- 首次访问的 Viewer。
- 从 Guide/搜索进入后回到产品主页的 Creator。

### 11.3 Above-the-Fold

```text
┌──────────────────────────────────────────────────────────┐
│ Navigation                                               │
├────────────────────────────┬─────────────────────────────┤
│ Public data, made useful   │ Sample analytics lens       │
│                            │                             │
│ See what's moving.         │ Creator card                │
│ One-sentence value         │ 3 metrics + trend           │
│                            │ Sample data label            │
│ [@username or public URL]  │                             │
│ [Explore now →]            │                             │
│ No account · Public only   │                             │
└────────────────────────────┴─────────────────────────────┘
```

Mobile：

```text
Navigation
Eyebrow
H1
Value sentence
Input
CTA
Trust line
Sample analytics preview
```

### 11.4 Homepage Sections

1. **Hero / universal input**
2. **Audience strip**：Viewers、Creators、Marketing teams
3. **Three jobs**：
   - Watch without noise
   - Understand growth
   - Use focused tools
4. **Creator analytics depth preview**
5. **Available tools**
6. **How TokLens handles data**
7. **Methodology / limitations**
8. **Final input CTA**
9. **Footer**

### 11.5 Homepage Interaction

- 输入识别 profile/video 类型后，可以将 CTA 文案变为 `View profile` 或 `Open video`。
- 输入无效时原地提示，不跳转错误页。
- Hero demo 使用 sample data，不能暗示实时。
- Tools 卡只显示已上线能力；未来功能可以出现在 roadmap 页面，不出现在主工具区。

### 11.6 Homepage Content Rules

H1：

> See what’s moving.

Support：

> Explore public TikTok content and understand your own creator growth from one focused workspace.

Helper：

> No TokLens account needed for public viewing. Public content only.

### 11.7 Homepage Success Metrics

- 3-second task comprehension test ≥80%。
- Hero input start rate。
- Valid query completion。
- Viewer → Analytics CTA rate。
- Mobile bounce and LCP。

---

## 12. Page Design 2 — Profile Viewer

### 12.1 Page Goal

输入 public username/profile URL，查看允许展示的 profile identity、public content 和可见指标。

### 12.2 Three-Second Header

```text
H1: View a public TikTok profile
Label: TikTok username or profile link
Input: @username or https://www.tiktok.com/@username
CTA: View profile
Outcome: Public profile details and recent available content
Boundary: Public profiles only · No TikTok login required
```

### 12.3 Pre-Result Layout

```text
Breadcrumb
H1 + direct definition
Tool shell
Accepted examples
3-step explanation
Limitations
Real sample result
FAQ / related guide
```

工具必须在 H1 后立即出现，Guide 内容不得置于工具之前。

### 12.4 Result Layout

Desktop：

```text
┌──────────────────────────────────────────────────────────┐
│ Compact search / new query                               │
├───────────────────────────────────┬──────────────────────┤
│ Avatar  @creator  verified        │ Data status          │
│ Bio · source link                 │ Updated · Observed    │
│ [Followers] [Likes] [Videos]      │ Methodology           │
├───────────────────────────────────┴──────────────────────┤
│ Tabs: Videos · Overview · About                          │
├───────────────────────────────────┬──────────────────────┤
│ Public content grid/list          │ Analyze your account │
│                                   │ trust card            │
└───────────────────────────────────┴──────────────────────┘
```

Mobile：

```text
Compact search
Identity
3 compact metrics
Data status
Tabs (scrollable, 3 max)
Video list
Own-account analytics CTA
Limitations
```

### 12.5 Result Components

#### Identity

- Avatar / neutral fallback。
- Display name。
- `@handle`。
- Verified state only if source exposes it。
- Bio maximum 3 lines + expand。
- Source link。

#### Metrics

- Followers。
- Total likes。
- Available public videos。
- Each metric shows freshness。
- Missing fields show `Unavailable`。

#### Tabs

- `Videos` default。
- `Overview` only if sufficient legitimate data。
- `About` for public metadata and methodology。
- 不展示 empty Stories/Reposts tabs。

### 12.6 Viewer States

- Default。
- Recognized profile。
- Loading。
- Public result。
- Not found。
- Private/restricted。
- No public posts。
- Provider unavailable。
- Rate limited。

Restricted page 不显示“try another anonymous method”。

### 12.7 Profile Viewer Conversion

Sidebar/mobile card：

> Is this your account? Connect TikTok to track your own growth over time.

CTA：

> Analyze my account

不得将第三方公开 profile 的数据暗示为完整 analytics。

---

## 13. Page Design 3 — Video Viewer

### 13.1 Page Goal

输入 public TikTok video URL，获得可观看的官方/允许展示 video、公开元数据和来源链接。

### 13.2 Three-Second Header

```text
H1: Watch a public TikTok video
Label: Public TikTok video link
Input: https://www.tiktok.com/@creator/video/…
CTA: Open video
Outcome: Focused playback with available public details
Boundary: Public videos only · Availability depends on the source
```

### 13.3 Result Layout

Desktop：

```text
┌──────────────────────────────────────────────────────────┐
│ Compact link input                                       │
├──────────────────────────────┬───────────────────────────┤
│                              │ Creator identity          │
│ 9:16 official/allowed player │ Caption                   │
│                              │ Published date            │
│                              │ Views · Likes · Comments  │
│                              │ [View original]           │
├──────────────────────────────┴───────────────────────────┤
│ What these public metrics show · limitations             │
│ Related authorized analytics CTA                         │
└──────────────────────────────────────────────────────────┘
```

Mobile：

- Player full content width。
- Creator identity below player。
- Caption collapsed at 3 lines。
- Metrics in horizontal 3-cell row。
- `View original` full width secondary。
- Methodology and limitations below。

### 13.4 Player Rules

- 9:16 default aspect ratio。
- Poster/thumbnail with explicit play button。
- No autoplay with sound。
- Respect reduced motion and data saver。
- Player error explains source restriction。
- Do not overlay misleading TokLens controls over official embed。
- Preserve creator attribution and source link。

### 13.5 Available Actions

MVP：

- Play/pause via allowed player。
- View original on TikTok。
- Copy source link。
- Analyze own connected content if owner。

Not MVP：

- Download without watermark。
- Extract audio。
- Remove attribution。
- Access private/deleted video。

### 13.6 Metadata

- Creator。
- Caption。
- Publish date。
- Available engagement metrics。
- Data source and updated time。

不显示 earnings estimate、profile value 或 audience demographic inference，除非后续具有可靠合法数据和明确方法。

---

## 14. Page Design 4 — Downloader

### 14.1 Product Status

**Design-ready, publish-blocked.**

Downloader 页面仅作为未来条件通过后的设计规范。当前 PRD 与 SEO Strategy 将下载功能标记为 Hold；不得上线空工具、伪下载按钮或将 Viewer 结果冒充下载结果。

### 14.2 Allowed Future Positioning

如果 Product + Legal + Security Gate 通过，定位只能是：

> Save TikTok media you own or have permission to use.

不采用：

- Any TikTok video
- No watermark
- Unlimited
- Completely anonymous
- Private video downloader

### 14.3 Three-Second Header

```text
H1: Save a TikTok video you have rights to use
Label: TikTok video link
Input: Paste a public video link
Rights check: I own this content or have permission to save it
CTA: Check available files
Outcome: See permitted formats and available quality
```

### 14.4 Flow

```text
Paste link
  ↓
Validate URL
  ↓
Rights acknowledgement
  ↓
Check allowed media options
  ↓
Preview attribution and source
  ↓
Choose available format
  ↓
Save / explain why unavailable
```

### 14.5 Result Layout

```text
Video preview + creator attribution
Rights reminder
Available formats
┌─────────────────────────────────────┐
│ MP4 · 1080×1920 · 12.8 MB [Save]   │
│ MP4 · 720×1280  · 6.2 MB  [Save]   │
└─────────────────────────────────────┘
Source · retention policy · limitations
```

只显示真实可用格式。不能用多个假按钮制造广告点击。

### 14.6 Downloader States

- Link recognized。
- Permission not confirmed。
- Saving not permitted。
- Creator disabled downloads。
- Content restricted/private。
- File expired。
- Processing unavailable。
- Rate limited。

### 14.7 Safety and Trust

- Rights checkbox 不预选。
- 明确文件是否经过 TokLens server。
- 说明临时文件保留时间。
- 不默认将链接或文件保存到用户 library。
- 提供版权投诉入口。
- 结果保留 creator attribution。

---

## 15. Page Design 5 — Analytics Dashboard

### 15.1 Page Goal

帮助已授权 Creator 在 10 秒内回答：

1. What changed?
2. Why might it have changed?
3. What should I review next?

### 15.2 Three-Second Orientation

Dashboard 不要求用户粘贴链接，但首屏仍必须在 3 秒内回答：

| Question       | Dashboard answer                                    |
| -------------- | --------------------------------------------------- |
| 当前分析什么？ | 顶栏显示 connected account 和 time range            |
| 点击哪里？     | 最重要 insight 或 metric 提供一个明确 drill-down    |
| 得到什么？     | Period summary 直接说明 what changed 和 next review |

首屏 orientation：

```text
Account: @atlas.moves
Period: Last 30 days
Status: Updated 12 min ago
Summary: Follower growth increased, concentrated around three tutorial posts.
Primary action: Review those posts
```

如果没有 connected account，页面只显示连接任务、权限说明和预期结果，不展示空 dashboard。

### 15.3 Information Architecture

```text
Overview
Content
Trends
Reports
Settings
```

Overview 是 insight summary，不是所有图表的集合。

### 15.4 Desktop Dashboard

```text
┌──────────────┬──────────────────────────────────────────────────┐
│ TokLens      │ @account        Last 30 days      Updated 12m   │
│              ├──────────────────────────────────────────────────┤
│ Overview     │ Good morning, Alex                               │
│ Content      │ Your audience growth increased this period.      │
│ Trends       │                                                  │
│ Reports      │ [Followers] [Views] [Engagement] [Posts]         │
│              │                                                  │
│              │ Growth trend (8 cols)  │ Insight feed (4 cols)  │
│              │                        │                         │
│              │ Top content table                                │
│              │                                                  │
│ Settings     │ Methodology · Sync status                        │
└──────────────┴──────────────────────────────────────────────────┘
```

### 15.5 Overview Hierarchy

1. Account + time range + sync status。
2. One-sentence period summary。
3. Four core metrics。
4. Main trend chart。
5. 2–4 insight cards。
6. Top content。
7. Data quality and methodology。

### 15.6 Metric Cards

首批：

- Followers。
- Video views。
- Engagement rate。
- Posts published。

每张卡：

```text
Followers                     Observed
842,314
+6.8% vs previous 30 days
Updated 12 min ago
```

点击卡片进入对应 trend，不打开 modal。

### 15.7 Main Chart

- Default：Followers over time。
- Time range：7D / 30D / 90D / Custom。
- Previous period optional comparison。
- Event markers：published top-performing content。
- Tooltip：date、exact value、change。
- Chart 下提供 textual summary，方便移动端和 accessibility。

### 15.8 Insight Feed

优先级：

1. Data issue / sync。
2. Significant change。
3. Content pattern。
4. Habit/review prompt。

Example：

> **Tutorial posts concentrated this week’s growth**  
> Three tutorial posts accounted for 62% of observed views and coincided with the largest follower gains.  
> Based on 8 posts · Observed correlation, not proven causation.

### 15.9 Content Table

Columns：

- Video。
- Published。
- Views。
- Engagement。
- Shares。
- View velocity（有多次快照才显示）。
- Status。

Functions：

- Sort。
- Search captions。
- Filter date/content label。
- Open detail。
- Export（paid）。

不默认显示 10+ columns。Secondary metrics 在 detail drawer。

### 15.10 First-Time Onboarding

```text
Step 1 Connect TikTok
Step 2 Review permissions
Step 3 First sync
Step 4 Understand available history
Step 5 View first insight
```

首次同步必须解释：

- 哪些数据来自授权；
- 哪些历史从连接后开始；
- 何时完成；
- 可以如何断开和删除。

### 15.11 Dashboard Empty States

#### No account

> Connect your TikTok account to build a private history of your own performance.

#### Syncing

> Your first sync is in progress. You can leave this page; we’ll show the available data when it is ready.

#### Insufficient history

> Growth trends need at least two snapshots. Your current metrics are available now; trends will appear after the next sync.

### 15.12 Mobile Dashboard

Order：

```text
Top bar
Period summary
2×2 metrics
Primary insight
Trend chart
Top content list
More insights
Bottom navigation
```

- Sidebar → bottom navigation。
- Table → content rows。
- Date range → bottom sheet。
- Chart height 220–260px。
- Insight cards不横向 carousel，避免隐藏重要内容。

---

## 16. Page Design 6 — Engagement Calculator

### 16.1 Page Goal

让用户快速计算一个明确公式下的 TikTok engagement rate，并理解结果能说明什么、不能说明什么。

### 16.2 Three-Second Header

```text
H1: TikTok engagement rate calculator
Formula toggle: By views | By followers
Inputs: Likes · Comments · Shares · Views/Followers
CTA: Calculate engagement
Outcome: Engagement rate, formula, and interpretation
```

### 16.3 Desktop Layout

```text
┌──────────────────────────────┬───────────────────────────┐
│ Calculate                    │ Result                    │
│ [By views | By followers]    │ 4.45%                     │
│ Likes       [8,400]          │ Engagement by views       │
│ Comments    [320]            │                           │
│ Shares      [180]            │ Formula                   │
│ Views       [200,000]        │ (8,400+320+180)/200,000   │
│ [Calculate engagement]       │ What it means             │
└──────────────────────────────┴───────────────────────────┘
```

Mobile：

```text
H1
Direct definition
Formula toggle
Inputs
Sticky/normal CTA
Result card
Formula
Interpretation
Limitations
Real example
Related analytics CTA
```

### 16.4 Input Behavior

- Auto-format thousands。
- Keyboard type numeric。
- Reject negatives。
- Empty field 不当作 zero。
- Shares 可以为 0。
- Denominator 必须 >0。
- Formula toggle 保留共同输入。
- 结果变化时使用 subtle number transition，不使用 celebration confetti。

### 16.5 Result Card

```text
Engagement rate by views
4.45%

(Likes 8,400 + Comments 320 + Shares 180)
÷ Views 200,000 × 100

This means the video generated about 4.45 recorded
interactions for every 100 views using this formula.
```

### 16.6 Interpretation

不立即显示：

> Great / Bad

除非 benchmark 来源、样本、行业、时间段和 follower tier 全部可用。

MVP 使用中性解释：

- Formula result。
- Denominator。
- Missing factors：watch time、conversions、audience authenticity、campaign goal。

### 16.7 Calculator Conversion

Result 后：

> Want to track this automatically? Connect your own TikTok account to compare performance over time.

CTA：

> Analyze my account

### 16.8 Real Example

页面必须包含一个可复现示例，与 SEO/GEO Strategy 中的 example standard 一致。

---

## 17. Accessibility

### 17.1 Target

WCAG 2.2 AA。

### 17.2 Requirements

- Keyboard 完成全部核心流程。
- Focus ring 始终可见。
- Skip link。
- Form error 使用 `aria-describedby`。
- Dynamic result 使用 appropriate live region，但避免重复朗读整个页面。
- Chart 有文字摘要和可访问数据表。
- Icon-only control 有 accessible name。
- Modal focus trap、Escape close、focus return。
- 44px touch target。
- Text zoom 200% 不丢失功能。
- Reduced motion。
- 视频支持字幕和平台提供的 accessibility controls。
- 颜色不是唯一状态表达。

### 17.3 Contrast Policy

- 正文至少 4.5:1。
- Large text 至少 3:1。
- Controls / focus indicator 至少 3:1。
- Acid 只搭配 Ink。
- Pine/Ink 背景使用 White 或 Acid，不使用 muted gray 正文。
- 每次新增 Token 使用自动化 contrast test。

---

## 18. Motion

### 18.1 Principles

- Motion 用于解释状态变化，不用于制造娱乐感。
- Default duration：160–220ms。
- Page/large panel：240–320ms。
- Easing：`cubic-bezier(.2,.8,.2,1)`。
- 不使用持续漂浮的关键操作组件。

### 18.2 Allowed

- Input recognition icon fade。
- Result card reveal。
- Chart line draw only on first load and reduced-motion safe。
- Accordion height/opacity。
- Menu open/close。

### 18.3 Avoid

- Confetti。
- Auto-moving carousels。
- Bouncing CTA。
- Count-up numbers on every navigation。
- Skeleton shimmer 超过必要时间。

---

## 19. Content Design

### 19.1 Voice

- Direct。
- Calm。
- Specific。
- Transparent。
- Non-judgmental。

### 19.2 Microcopy Patterns

| Need          | Preferred                                         | Avoid                     |
| ------------- | ------------------------------------------------- | ------------------------- |
| Input         | `TikTok username or public link`                  | `Enter something`         |
| Action        | `View profile`                                    | `Submit`                  |
| Loading       | `Checking the public link…`                       | `Please wait`             |
| Missing       | `Follower count is unavailable from this source.` | `0 followers`             |
| Restricted    | `This content cannot be displayed.`               | `We failed`               |
| Estimate      | `Estimated from available public signals`         | `Accurate estimate`       |
| Own analytics | `Connect your TikTok account`                     | `Unlock secret analytics` |

### 19.3 Disclaimer Placement

重要限制放在相关功能附近：

- Public-only：input helper。
- Estimate：metric label。
- Formula：result card。
- Data freshness：card header/footer。
- Copyright：Downloader flow。

不能把所有限制只放在 Terms。

---

## 20. Responsive Component Matrix

| Component       | Desktop            | Tablet            | Mobile               |
| --------------- | ------------------ | ----------------- | -------------------- |
| Public nav      | Inline links       | Reduced links     | Menu                 |
| Tool shell      | Input + CTA inline | Inline if ≥640px  | Stacked              |
| Hero            | 2 columns          | 1 column          | 1 column             |
| Metric cards    | 4/3 columns        | 2 columns         | 2/1 columns          |
| Profile result  | Main + sidebar     | Main + below card | Single column        |
| Video result    | Player + metadata  | Player + below    | Single column        |
| Dashboard nav   | Sidebar            | Compact sidebar   | Bottom nav           |
| Dashboard table | Table              | Reduced columns   | List rows            |
| Calculator      | Inputs + result    | 2/1 columns       | Stacked              |
| Footer          | 4 columns          | 2 columns         | 2 columns then legal |

---

## 21. Design QA Checklist

### 21.1 Three-Second Task Test

- Can a new user identify the accepted input?
- Is there exactly one obvious primary action?
- Is the expected result stated beside the action?
- Is the public/authorized boundary visible?

### 21.2 Component QA

- Labels remain visible after typing。
- Focus order matches visual order。
- Loading does not change layout width。
- Empty, error, restricted, stale and success states exist。
- Missing metric is not shown as zero。
- Sample data is labelled。
- Buttons use action-specific copy。
- Cards do not hide multiple unrelated destinations。

### 21.3 Mobile QA

- Test at 360×800、390×844、430×932。
- No horizontal overflow。
- Input and CTA visible without pinch zoom。
- Keyboard does not cover required action。
- Sticky UI does not overlap content。
- Bottom navigation respects safe areas。
- Charts work with tap, not hover only。

### 21.4 Trust QA

- No unsupported “anonymous”“live”“unlimited” claims。
- No TikTok affiliation implication。
- Data source and freshness visible。
- Estimated/inferred data labelled。
- Downloader remains unpublished until Gate passes。
- Restricted/private content has no bypass path。

---

## 22. Design Delivery Order

### Stage 1 — Foundations

- Finalize color contrast。
- License/self-host typography。
- Token naming。
- Button、Input、Card、Badge、Navigation。
- Loading/error/empty state primitives。

### Stage 2 — Public Tool Shell

- Universal input。
- Pre-result template。
- Result template。
- Profile Viewer。
- Video Viewer。
- Calculator。

### Stage 3 — Homepage

- Homepage built from validated tool shell。
- Analytics preview。
- Trust and methodology sections。

### Stage 4 — Authenticated Product

- OAuth onboarding。
- App navigation。
- Overview dashboard。
- Content table/list。
- Trends and insights。

### Stage 5 — Gated Concepts

- Downloader only after Product/Legal/Security approval。
- Competitor analytics only after licensed-data approval。

---

## 23. Design Decision Log

| Date       | Decision                                                  | Reason                                                               |
| ---------- | --------------------------------------------------------- | -------------------------------------------------------------------- |
| 2026-07-25 | Retain Ink/Pine/Acid/Cream brand system                   | Existing TokLens identity is distinctive and supports trust + energy |
| 2026-07-25 | Use Sora + Inter                                          | Distinctive display voice with highly legible product UI             |
| 2026-07-25 | Universal input is the primary public interaction         | Supports 3-second comprehension and cross-tool consistency           |
| 2026-07-25 | Progressive disclosure after result                       | Combines simple entry with deeper functionality                      |
| 2026-07-25 | Dashboard overview prioritizes insights over chart volume | Helps creators answer what changed and what to review                |
| 2026-07-25 | Downloader design remains publish-blocked                 | Product and legal requirements are not met                           |
| 2026-07-25 | No dark mode in MVP                                       | Focus resources on one accessible, high-quality system               |
| 2026-07-25 | Missing values display Unavailable, never zero            | Protects data integrity                                              |

---

## 24. Reference Notes

Interaction principles were reviewed from:

- [Claptik public profile viewer](https://claptik.com/) — direct username/link input and immediate profile-view action.
- [Tikvib viewer and analytics](https://www.tikvib.com/) — multiple viewer, content and analytics capabilities exposed from a shared query.

TokLens must not reuse their:

- UI composition；
- copy；
- icons or illustrations；
- brand colors；
- information hierarchy；
- feature claims。

The design also respects the product constraints documented in:

- [TokLens Product PRD](./product-spec.md)
- [TokLens SEO & GEO Strategy](./seo-strategy.md)
- [TikTok Developer Guidelines](https://developers.tiktok.com/doc/our-guidelines-developer-guidelines)
- [TikTok Display API](https://developers.tiktok.com/doc/display-api-get-started/)

---

## 25. Next Design Deliverables

下一设计阶段应在明确要求后输出：

1. Low-fidelity user flows。
2. Responsive wireframes。
3. Figma token library。
4. Component variants and interactive prototypes。
5. Profile/Video Viewer usability test script。
6. Dashboard first-time-use prototype。
7. Accessibility annotation。
8. Design-to-engineering acceptance checklist。

本阶段只定义设计系统与页面蓝图，不进行代码实现。
