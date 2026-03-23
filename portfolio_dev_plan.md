# 个人作品集网站开发规划
> **风格基准：** Google Search Through Time · 滚动叙事 · 进化史时间线  
> **核心体验：** 用户随滚动"播放"设计师25年进化史，从AI前沿倒溯至视觉原点  
> **部署环境：** 腾讯云服务器 · Nginx · React + Vite 构建后上传 dist 目录

---

## 一、设计语言定义

### 色彩系统
```
背景主色：    #FAFAFA（米白，温润不压抑）
卡片底色：    #FFFFFF（纯白，轻微阴影）
强调色A：     #6C63FF（紫罗兰，AI/科技感）
强调色B：     #00BFA5（亮青，创意/生命力）
时间线描边：  渐变 #6C63FF → #00BFA5
深色区块：    #111111（仅Tech篇章使用）
文字主色：    #1A1A2E
文字副色：    #6B7280
```

### 字体搭配
```
标题字体：    Playfair Display（衬线，有历史感和品质感）
正文字体：    DM Sans（现代无衬线，清晰易读）
代码字体：    JetBrains Mono（Terminal篇章专用）
中文字体：    Noto Serif SC（标题）/ Noto Sans SC（正文）
```

### 动效原则
- 滚动驱动一切，鼠标不滚动页面不动
- 元素从两侧滑入，不做弹跳/抖动
- 背景色过渡平滑，时长 800ms ease
- SVG 时间线随滚动进度实时描边
- 视频/图片自动循环播放，无声

---

## 二、技术栈

```bash
# 初始化项目
npm create vite@latest portfolio -- --template react-ts

# 安装依赖
npm install gsap @studio-freight/lenis tailwindcss
npm install lucide-react
npm install -D @types/gsap
```

### 核心库职责
| 库 | 职责 |
|---|---|
| React 18 + Vite | 组件化开发，快速构建 |
| Tailwind CSS | 排版、间距、亮色主题 |
| GSAP + ScrollTrigger | 滚动驱动动画、SVG描边、粘滞分屏 |
| Lenis | 全局阻尼平滑滚动（必装，否则动画生硬） |

---

## 三、页面结构与剧情篇章

### 篇章 0：导航栏 `<Nav>`
- 顶部固定，滚动后背景从透明变为毛玻璃效果（`backdrop-blur`）
- 左侧：姓名 Logo（中文+英文）
- 右侧：首页 · 作品集 · 关于我 · 联系方式
- 移动端：汉堡菜单

---

### 篇章 1：降落点 Hero `<HeroSection>`

**视觉：**
- 全屏高度，背景为动态渐变色晕（Gradient Mesh），随鼠标轻微位移
- 中央大字：`视觉设计师的灵魂 × 极客工程师的底座`
- 副标题：`25年平面设计 · AIGC实战先锋 · 持续进化中`
- 底部跳动小圆点 + 文字提示：`Scroll to explore my evolution ↓`

**动效：**
- 页面加载后，标题从下方淡入（staggered，每行间隔 150ms）
- 渐变背景跟随鼠标做 3-5° 的柔和位移（mousemove 事件）

**Gemini提示词：**
```
创建 HeroSection 组件，全屏高度，背景使用 CSS Gradient Mesh 
（紫罗兰 #6C63FF 和亮青 #00BFA5 双色晕染，opacity 0.15，底色 #FAFAFA）。
中央放置两行大标题，使用 Playfair Display 字体，
页面加载时每行依次从 translateY(30px) opacity(0) 
动画到 translateY(0) opacity(1)，使用 GSAP stagger 150ms。
底部加一个跳动的向下箭头提示，CSS animation infinite bounce。
```

---

### 篇章 2：时间线脊梁 `<TimelinePath>`

**视觉：**
- 贯穿全页面中心的一条 SVG 竖线
- 随着用户向下滚动，线条从上到下被"实时描绘"出来
- 线条颜色为渐变：紫罗兰 → 亮青

**技术实现：**
```javascript
// ScrollPath 组件核心逻辑
gsap.registerPlugin(ScrollTrigger);

gsap.to(pathElement, {
  strokeDashoffset: 0,
  ease: "none",
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: 1  // 跟随滚动进度
  }
});
```

---

### 篇章 2.5：个人简介 · 能力亮点 `<AboutSection>`

**位置：** Hero 之后、时间线开始之前  
**作用：** 让访客在进入漫长时间线之前，先用30秒读懂你是谁、能做什么  
**背景色：** #FAFAFA，与Hero无缝衔接，干净不跳跃

---

#### 内容结构（三段式，对应简历个人简介）

**第一段 · 我是谁**
> 拥有 25年平面与出版设计经验，覆盖教辅、绘本、杂志、物料及短视频全品类。

**第二段 · 我能做什么（4个能力卡片）**

| 卡片 | 图标 | 标题 | 描述 |
|---|---|---|---|
| 1 | 🎬 | AIGC内容制作 | AI短剧分镜·场景图·Grok视频生成 |
| 2 | 🎨 | AI设计提效 | MJ+Lovart批量生图·效率提升50%+ |
| 3 | 🗺️ | 3D地图交互 | Cesium.js·QGIS·上海地图社项目 |
| 4 | 📚 | 出版装帧设计 | 书籍·杂志·绘本·教辅全品类 |

**第三段 · 工具栈标签云**
```
Midjourney  Lovart  Nona Banana Pro  Grok  即梦
Gemini  Google AI Studio  Vibe Code
Photoshop  Illustrator  InDesign  AutoCAD
Cesium.js  QGIS  WSL2  Ubuntu
```

---

#### 动效设计

- 页面滚动到此区域，4张能力卡片从下方依次弹入（stagger 150ms）
- 工具标签云各标签有轻微上下浮动动画（不同 delay，形成波浪感）
- 英语能力 + 持续学习 用一行小字在底部淡入

---

#### Gemini 提示词

```
创建 AboutSection 组件，背景 #FAFAFA，分三个区块：

1. 顶部：两段简介文字，左对齐，
   第一段大字：「25年设计经验 × AIGC实战先锋」
   第二段正文：「熟练运用 Midjourney、Lovart、Grok、Gemini 等主流AI工具，
   具备从工具选型到商业落地的完整实战能力。主导AI短剧全流程制作，
   服务春雨期刊、各大出版社，设计效率提升50%以上。」

2. 中部：4张横排能力卡片（移动端2×2网格），
   卡片包含图标、标题、2行描述，
   卡片边框使用对应强调色（紫/青/橙/粉），
   使用 GSAP ScrollTrigger，进入视口时从 translateY(40px) opacity(0)
   动画到正常位置，stagger 0.15s。

3. 底部：工具标签云，每个标签是圆角胶囊样式，
   背景为对应时代强调色的10%透明度，
   标签随机分配轻微上下浮动的 CSS animation（duration 2-4s，各不同）。
   
整体左右留足 padding，移动端友好。
```

---

### 篇章 3：倒序卷章一 · 此时此刻 [2026] `<TechInfraSection>`

**主题：** AI基础设施与工程化实践  
**背景色过渡：** #FAFAFA → #111111（进入时变深色，离开时恢复亮色）

**内容区块（左右分屏粘滞）：**
- 左侧固定（Sticky）：终端Terminal样式的代码窗口，黑底绿字
  - 随滚动自动"打字"输出部署命令
  - 显示：WSL2 + Ubuntu · VMware · OpenClaw 部署过程
- 右侧滚动：依次出现3个卡片
  1. 本地AI环境部署（WSL2/VMware + Ubuntu）
  2. QGIS地图可视化（上海地图社项目）
  3. Vibe Code + Gemini 前端原型交付

**终端打字效果提示词：**
```
创建 TerminalWindow 组件，黑色背景，JetBrains Mono 字体，
绿色文字 #00FF41。使用 GSAP ScrollTrigger，
当组件进入视口时，按数组顺序逐行打印命令，
每行间隔 400ms，模拟真实终端输入效果。
命令内容：
$ ssh root@server
$ apt install nginx
$ docker run openclaw
$ python3 deploy.py --env production
✓ All services running
```

---

### 篇章 4：倒序卷章二 · 近期突破 [2024-2025] `<AICreativeSection>`

**主题：** AIGC创作与短剧制作  
**背景色：** 回归亮色 #FAFAFA，卡片使用彩色渐变边框

**内容布局：**
- 顶部：大标题动画入场
- 中部：散落卡片堆叠效果（3张卡片有轻微旋转角度）
  - 卡片1：AI短剧 · 分镜/场景图/三视图（放示例图）
  - 卡片2：教辅插图 · 春雨期刊 · 各大出版社（放示例图）
  - 卡片3：书籍封面设计 · K12教育出版（放示例图）
- 底部：工具标签云
  - Midjourney · Lovart · Nona Banana Pro · Grok · 即梦 · Gemini · Google AI Studio

**散落卡片提示词：**
```
创建 ScatteredCards 组件，包含3张卡片。
初始状态：分别有 -3deg、1.5deg、-1deg 的旋转，
轻微偏移模拟随意散落效果。
使用 GSAP ScrollTrigger，当进入视口时，
卡片从屏幕两侧（translateX ±200px）滑入到正常位置，
stagger 间隔 200ms，ease: "power2.out"。
Hover时卡片上浮 -8px 并旋转归零，有阻尼感。
```

---

### 篇章 5：倒序卷章三 · 完整进化史 [2000-2023] `<FullTimelineSection>`

**主题：** 25年完整职业进化史，4个时代依次呈现  
**背景色：** 随时代切换，每个时代有独立背景色

---

#### 5.1 四个时代的划分

| 时代 | 时间段 | 背景色 | 强调色 | 代表经历 |
|---|---|---|---|---|
| 数字融合 | 2019-2024 | #F0F4FF | #00BFA5 | 童趣童乐·锋尚圣博 |
| 出版印刷 | 2006-2019 | #FFFBF0 | #F59E0B | Asia Weekly·《设计》杂志 |
| 职业原点 | 2000-2006 | #FFF0F6 | #EC4899 | Metropolis创意总监 |

---

#### 5.2 完整经历卡片列表

每段经历用卡片展示，随滚动依次从两侧交替滑入：

**数字融合时代（2019-2024）**
- 🟢 北京童趣童乐文化有限公司 · 美术编辑 · 2021-2024
  - 多品类儿童书籍：翻翻书、折纸书、磁力贴书、机关书
  - 电商详情页、主图、宣传物料 + 促销视频剪辑

- 🟢 北京锋尚圣博文化传媒 · 平面设计 · 2019-2021
  - 服务轻工/建筑/科技/医学等头部出版社
  - 文旅部、国家电网画册年报 + 多本行业杂志视觉设计

**出版印刷时代（2006-2019）**
- 🟡 鲁海北京投资顾问 · 美术编辑 · 2016-2019
  - 《车道》杂志 + 三一重工内刊

- 🟡 华木坊文化传媒 · 美术编辑 · 2014-2016
  - 《中国红木古典家具》《红木》《中式生活》《中华木作》

- 🟡 旅游休闲杂志 · 美术编辑 · 2013
  - 带队完成杂志定期设计与印刷

- 🟡 《设计》杂志社 · 美术编辑 · 2010-2013
  - 《设计》《家电电器》《家电科技》

- 🟡 Asia Weekly 英文周刊 · 美术编辑 · 2006-2009
  - InCopy + InDesign协同 · CTP印刷 · 网站维护

**职业原点（2000-2006）**
- 🩷 Metropolis 杂志社 · 创意总监 · 2003-2006
  - 英文DM双周刊主导 · 服务盈科中心等高端商业客户

- 🩷 Metrozine 杂志社 · 美术编辑 · 2002-2003
  - 协助完成版面设计

- 🩷 北京中环装饰工程中心 · 平面设计 · 2000-2001
  - 工装家装CAD图纸及效果图 · **设计生涯的起点**

---

#### 5.3 左侧固定展示（Sticky）

```
左侧固定区域随时代切换内容：
- 数字融合时代：展示儿童书籍/电商设计作品图
- 出版印刷时代：展示杂志封面/书籍版式作品图  
- 职业原点：展示 Metropolis 英文刊设计图
每次切换时左侧图片做淡入淡出过渡（opacity 0→1，600ms）
```

---

#### 5.4 底部技能全景

所有技能分两组展示：

**传统设计技能（进度条样式）**
```
Photoshop      ████████████████████  98%
InDesign       ████████████████████  98%  
Illustrator    ███████████████████   95%
书籍版式设计    ███████████████████   95%
AutoCAD        ███████████████       75%
视频剪辑        ██████████████        72%
```

**AI工具技能（标签云样式，带发光效果）**
```
Midjourney · Lovart · Nona Banana Pro · Grok
即梦 · Gemini · Google AI Studio · Vibe Code
GSAP · Cesium.js · QGIS · WSL2
```

**Gemini 提示词：**
```
创建 FullTimelineSection 组件，包含4个时代的经历卡片。
卡片交替从左右两侧滑入（奇数从左 translateX(-150px)，偶数从右 translateX(150px)）。
使用 GSAP ScrollTrigger，每张卡片进入视口时触发，stagger 0.2s。
时代切换时背景色平滑过渡（gsap.to body backgroundColor，duration 0.8s）。
左侧 sticky 区域图片随时代切换做淡入淡出。
底部技能进度条进入视口时从 width:0 动画到目标宽度。
AI工具标签云做轻微浮动动画（CSS animation，各标签不同 delay）。
完整经历数据从 timeline_data.ts 导入，不要硬编码。
```

---

### 篇章 6：联络锚点 `<ContactSection>`

**视觉：**
- SVG时间线在此收束，汇聚成一个发光圆点
- 居中大字：`Say Hello`（Playfair Display，超大号）
- 副文字：`开放新机会 · 项目合作 · 技术交流`
- 邮箱按钮：hover时有弹跳阻尼动画（GSAP elastic ease）
- 底部：© 2026 · 用腾讯云托管

**Gemini提示词：**
```
创建 ContactSection 组件，居中布局，
"Say Hello" 使用 Playfair Display 超大号（clamp(4rem, 10vw, 8rem)）。
邮箱/微信按钮 hover 时使用 GSAP：
gsap.to(button, { scale: 1.05, duration: 0.3, ease: "elastic.out(1, 0.3)" })
mouseleave 时 scale 归 1。
背景加入超浅的渐变色晕，呼应 Hero 区域，形成首尾闭环。
```

---

## 四、组件文件结构

```
portfolio/
├── src/
│   ├── components/
│   │   ├── Nav.tsx                  # 顶部导航
│   │   ├── HeroSection.tsx          # 篇章1：降落点
│   │   ├── AboutSection.tsx         # 篇章2.5：个人简介+能力卡片
│   │   ├── TimelinePath.tsx         # SVG时间线脊梁
│   │   ├── TechInfraSection.tsx     # 篇章3：AI基础设施[2024-至今]
│   │   ├── AICreativeSection.tsx    # 篇章4：AIGC创作[2024-2025]
│   │   ├── FullTimelineSection.tsx  # 篇章5：完整进化史[2000-2023]
│   │   ├── TimelineCard.tsx         # 单条经历卡片组件（复用）
│   │   └── ContactSection.tsx       # 篇章6：联络
│   ├── data/
│   │   └── timeline_data.ts         # ⭐ 全部25年经历数据（已生成）
│   ├── hooks/
│   │   └── useLenis.ts              # 全局平滑滚动初始化
│   ├── assets/
│   │   └── works/                   # 作品图片放这里
│   ├── App.tsx
│   └── main.tsx
├── public/
├── index.html
└── vite.config.ts
```

---

## 五、App.tsx 根组件初始化（必须最先做）

```typescript
// App.tsx
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // 初始化平滑滚动
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // 将 Lenis 与 GSAP ScrollTrigger 同步
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => lenis.destroy();
  }, []);

  return (
    <main>
      <Nav />
      <HeroSection />
      <AboutSection />         {/* 个人简介·能力亮点 */}
      <TimelinePath />
      <TechInfraSection />
      <AICreativeSection />
      <FullTimelineSection />
      <ContactSection />
    </main>
  );
}
```

---

## 六、StickySection 通用组件（左固右滚）

```typescript
// 左侧媒体固定，右侧内容滚动的标准模板
// 用于 TechInfraSection 和 VisualDesignSection

<div className="flex min-h-screen">
  {/* 左侧：sticky 固定 */}
  <div className="sticky top-0 h-screen w-1/2 flex items-center justify-center">
    {leftContent}
  </div>
  
  {/* 右侧：正常滚动 */}
  <div className="w-1/2 py-32 space-y-32">
    {rightItems.map(item => (
      <div className="scroll-card">{item}</div>
    ))}
  </div>
</div>
```

---

## 七、腾讯云部署步骤

```bash
# 1. 本地构建
npm run build
# 生成 dist/ 目录

# 2. 上传到服务器
scp -r dist/ root@你的服务器IP:/var/www/portfolio/

# 3. Nginx 配置
# 编辑 /etc/nginx/sites-available/portfolio
server {
    listen 80;
    root /var/www/portfolio/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # 静态资源缓存
    location ~* \.(js|css|png|jpg|gif|svg|ico)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}

# 4. 启用配置
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# 5. 访问测试
# 浏览器打开 http://你的服务器IP
```

---

## 八、作品图片准备清单

在开始开发前，建议先准备以下素材占位：

| 篇章 | 需要的图片/视频 | 尺寸建议 |
|---|---|---|
| AI短剧 | 分镜图×3、场景图×2 | 1200×800px |
| 3D地图 | QGIS截图×2、Cesium演示截图×1 | 1200×800px |
| 教辅插图 | AI生图作品×4 | 800×800px |
| 书籍封面 | 封面设计×6 | 800×1000px |
| 网页/App UI | UI设计稿×3 | 1440×900px |

> 💡 **开发阶段用占位图：** 可用 `https://picsum.photos/1200/800` 临时替代，上线前再换真实作品图。

---

## 九、给 Gemini 的一键启动提示词

```
请按照以下规划，帮我用 React 18 + Vite + TypeScript + GSAP + Lenis + Tailwind CSS 
搭建一个个人设计师作品集网站。

核心体验：Google Search Through Time 风格，滚动驱动叙事，
从 2026 年AI工程实践倒溯至 2000 年视觉设计原点。

请先完成以下基础设置：
1. 初始化项目结构（所有组件文件创建好，内容可先为空）
2. App.tsx 中完整配置 Lenis 平滑滚动 + GSAP ScrollTrigger 全局注册
3. 配置 Tailwind CSS，在 tailwind.config.js 中扩展颜色变量：
   primary: #6C63FF，secondary: #00BFA5，bg: #FAFAFA，dark: #111111
4. 先实现 HeroSection（全屏渐变背景 + 标题入场动画 + 底部滚动提示）
5. 再实现 TimelinePath（SVG 竖线随滚动描边）

字体使用 Google Fonts：Playfair Display + DM Sans + JetBrains Mono。
所有图片先用 https://picsum.photos 占位。
代码写完后给我完整的文件结构和每个文件的完整代码。
```

---

*规划版本：v1.0 · 2026年3月*  
*作者：个人作品集项目*
