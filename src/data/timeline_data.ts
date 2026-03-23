// timeline_data.ts
// 完整职业经历数据 · 供作品集网站时间线组件使用
//
// ⚠️ 渲染顺序：时间线从 2026（现在）开始，随用户向下滚动，逐步倒溯至 2000 年
// 页面从上到下 = 时间从新到旧
//
// 叙事节奏：
//  TOP    2026 ── AI时代：看山科技 · AI短剧 · 地图项目
//          ↓ 用户向下滚动
//         2024 ── 数字融合：师联时代 · 童趣童乐 · 锋尚圣博
//          ↓
//         2006 ── 出版印刷：Asia Weekly · 《设计》· 华木坊 · 鲁海
//          ↓
//  BOTTOM 2000 ── 职业原点：Metropolis · Metrozine · 中环装饰
//
// 数组顺序 = 渲染顺序（最新在前，最早在后，直接 .map() 即可，不需要 .reverse()）

export type Era = 'ai' | 'digital' | 'print' | 'origin';

export interface TimelineItem {
  id: string;
  year: string;
  period: string;
  company: string;
  role: string;
  era: Era;
  tags: string[];
  highlights: string[];
  accentColor: string;
}

export const timelineData: TimelineItem[] = [

  // ═══════════════════════════════════════════════
  // TOP OF PAGE · 最先展示 · 最震撼
  // ═══════════════════════════════════════════════

  // ── AI 时代 [2024-2026] ─────────────────────────
  {
    id: 'kanshan-2026',
    year: '2026',
    period: '2024.11 — 至今',
    company: '北京看山科技有限公司',
    role: '平面设计主管',
    era: 'ai',
    tags: ['Midjourney', 'Lovart', 'Nona Banana Pro', 'Grok', 'Gemini', 'Cesium.js', 'QGIS', 'Vibe Code', 'WSL2'],
    highlights: [
      '主导AI短剧全流程：分镜图、场景图、三视图 + Grok视频生成',
      '春雨期刊 & 各大出版社：MJ生成原型图 + Lovart批量生图，效率提升50%+',
      '上海地图社3D项目：Three.js 迁移至 QGIS/Cesium.js，开发周期缩短40%',
      '独立部署WSL2 + VMware本地AI环境，Vibe Code + Gemini完成网页/App交付',
    ],
    accentColor: '#6C63FF',
  },
  {
    id: 'shilian-2024',
    year: '2024',
    period: '2024.05 — 2024.10',
    company: '北京师联时代文化发展有限公司',
    role: '平面设计',
    era: 'ai',
    tags: ['排版设计', '电商设计', 'PS', 'AI工具', 'ID'],
    highlights: [
      'K12阅读类教辅书籍整体版式设计（暑假/寒假专项）',
      '品牌宣传物料设计制作',
    ],
    accentColor: '#6C63FF',
  },

  // ── 数字融合时代 [2019-2024] ────────────────────
  {
    id: 'tongle-2021',
    year: '2021',
    period: '2021.04 — 2024.04',
    company: '北京童趣童乐文化有限公司',
    role: '美术编辑',
    era: 'digital',
    tags: ['ID', 'PS', 'AI', 'AutoCAD', '电商设计', '视频剪辑'],
    highlights: [
      '多品类儿童书籍设计：翻翻书、折纸书、磁力贴书、机关书',
      '电商详情页、主图及全套宣传物料设计',
      '促销视频剪辑 + 展会物料制作',
    ],
    accentColor: '#00BFA5',
  },
  {
    id: 'fengshang-2019',
    year: '2019',
    period: '2019.09 — 2021.04',
    company: '北京锋尚圣博文化传媒有限公司',
    role: '平面设计',
    era: 'digital',
    tags: ['画册设计', '书籍设计', '杂志设计', 'H5', '年报'],
    highlights: [
      '服务轻工/建筑/科技/医学等头部出版社书籍封面与版式',
      '文旅部、国家电网画册年报设计',
      '多本行业杂志视觉 + H5微信长图 + PPT美化',
    ],
    accentColor: '#00BFA5',
  },

  // ── 出版印刷时代 [2006-2019] ────────────────────
  {
    id: 'luhai-2016',
    year: '2016',
    period: '2016.05 — 2019.05',
    company: '鲁海北京投资顾问有限公司',
    role: '美术编辑',
    era: 'print',
    tags: ['书籍设计', '杂志设计', '内刊'],
    highlights: [
      '主导《车道》杂志完整设计工作',
      '三一重工内刊设计与制作',
    ],
    accentColor: '#F59E0B',
  },
  {
    id: 'huamu-2014',
    year: '2014',
    period: '2014.03 — 2016.05',
    company: '华木坊文化传媒（北京）有限公司',
    role: '美术编辑/美术设计',
    era: 'print',
    tags: ['平面设计', '杂志排版', '画册', '展会物料'],
    highlights: [
      '《中国红木古典家具》主设计，协作《红木》《中式生活》《中华木作》',
      '画册、广告、展会物料及新媒体设计',
    ],
    accentColor: '#F59E0B',
  },
  {
    id: 'travel-2013',
    year: '2013',
    period: '2013.06 — 2013.12',
    company: '旅游休闲杂志',
    role: '美术编辑/美术设计',
    era: 'print',
    tags: ['杂志设计', '印刷管理', '团队管理'],
    highlights: [
      '带领设计团队完成杂志定期设计与印刷',
      '刊例、软文、广告及日常设计',
    ],
    accentColor: '#F59E0B',
  },
  {
    id: 'design-mag-2010',
    year: '2010',
    period: '2010.05 — 2013.04',
    company: '《设计》杂志社',
    role: '美术编辑/美术设计',
    era: 'print',
    tags: ['杂志制作', 'PS', 'ID'],
    highlights: [
      '负责《设计》杂志制作',
      '协助完成《家电电器》《家电科技》设计制作',
    ],
    accentColor: '#F59E0B',
  },
  {
    id: 'asia-weekly-2006',
    year: '2006',
    period: '2006.11 — 2009.11',
    company: 'Asia Weekly（英文周刊）',
    role: '美术编辑/美术设计',
    era: 'print',
    tags: ['InDesign', 'InCopy', 'CTP印刷', '英文排版', '网站维护'],
    highlights: [
      'InCopy + InDesign协同全流程，CTP印刷上传服务器确认',
      '负责公司网站定时更新及日常宣传物料制作',
    ],
    accentColor: '#F59E0B',
  },

  // ═══════════════════════════════════════════════
  // BOTTOM OF PAGE · 最后展示 · 追根溯源
  // ═══════════════════════════════════════════════

  // ── 职业原点 [2000-2006] ────────────────────────
  {
    id: 'metropolis-2003',
    year: '2003',
    period: '2003.05 — 2006.10',
    company: 'Metropolis 杂志社',
    role: '创意指导/总监',
    era: 'origin',
    tags: ['创意总监', '平面设计', '团队管理', '英文DM'],
    highlights: [
      '带领团队主导英文DM双周刊《Metropolis》设计、制作与印刷',
      '服务佳城广场、盈科中心、昆泰酒店等高端商业客户内刊',
      '参与标识、广告及内刊设计招标',
    ],
    accentColor: '#EC4899',
  },
  {
    id: 'metrozine-2002',
    year: '2002',
    period: '2002.10 — 2003.04',
    company: 'Metrozine 杂志社',
    role: '美术编辑/美术设计',
    era: 'origin',
    tags: ['杂志设计', '广告设计'],
    highlights: [
      '协助主任设计完成杂志版面设计',
      '公司办公设备及局域网维护',
    ],
    accentColor: '#EC4899',
  },
  {
    id: 'decoration-2000',
    year: '2000',
    period: '2000.08 — 2001.09',
    company: '北京中环装饰工程中心',
    role: '平面设计',
    era: 'origin',
    tags: ['CAD', '效果图', '工装家装'],
    highlights: [
      '协助设计师完成工装家装CAD图纸及效果图',
      '🌱 设计生涯的起点',
    ],
    accentColor: '#EC4899',
  },

];

// ── 时代配置（控制背景色、标签、描述）────────────────
export const eraConfig = {
  ai: {
    label: 'AI 时代',
    period: '2024 — 2026',
    bg: '#111111',
    accent: '#6C63FF',
    description: 'AIGC实战 · 本地AI部署 · 短剧制作 · 3D地图',
  },
  digital: {
    label: '数字融合',
    period: '2019 — 2024',
    bg: '#F0F4FF',
    accent: '#00BFA5',
    description: '出版设计 · 电商视觉 · 视频剪辑 · 展会物料',
  },
  print: {
    label: '出版印刷',
    period: '2006 — 2019',
    bg: '#FFFBF0',
    accent: '#F59E0B',
    description: '杂志设计 · 书籍装帧 · 画册年报 · 印刷工艺',
  },
  origin: {
    label: '职业原点',
    period: '2000 — 2006',
    bg: '#FFF0F6',
    accent: '#EC4899',
    description: '创意总监 · 英文媒体 · 商业设计 · 从零出发',
  },
};

// ── 给 Gemini 的渲染说明 ─────────────────────────────
//
// 1. 直接 timelineData.map() 渲染，数组顺序就是展示顺序，不需要排序
//
// 2. 年份大字标注规则：
//    每个时代第一条记录左侧显示大号年份（如「2026」「2024」「2019」「2000」）
//    同一时代内后续记录不重复显示年份
//
// 3. 背景色切换规则：
//    检测当前滚动到的 era，与上一条不同时触发：
//    gsap.to('body', { backgroundColor: eraConfig[currentEra].bg, duration: 0.8 })
//
// 4. 卡片入场方向：
//    奇数索引从左滑入 translateX(-150px → 0)
//    偶数索引从右滑入 translateX(150px → 0)
//
// 5. SVG时间线描边方向：从上往下（strokeDashoffset 从满到0）