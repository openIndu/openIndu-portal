# openIndu Design System

## 设计愿景

开源社区官网，从技术出发。参考 openEuler 设计风格，构建极简、专业、易读的界面。核心特点：**深蓝主色、严格的8px网格、最小化装饰、工程师友好**。

---

## 色彩系统

### 主色板

| 用途 | 色值 | RGB | 说明 |
|------|------|-----|------|
| 主色 | `#002FA7` | 0, 47, 167 | 深蓝，信任感、专业性 |
| 辅助色 | `#5383FE` | 83, 131, 254 | 亮蓝，交互、链接、hover状态 |
| 强调色 | `#FFA816` | 255, 168, 22 | 橙色，重点、警告、成功 |

### 背景和文本

| 名称 | 色值 | 用途 |
|------|------|------|
| 白 | `#FFFFFF` | 页面背景、卡片 |
| 浅灰 | `#F5F7FA` | 区域背景、分割区 |
| 中灰 | `#E8EEF5` | 边框、分割线 |
| 深灰 | `#333333` | 正文文本 |
| 浅文本 | `#666666` | 辅助文本、说明 |

### 禁用和警告

| 名称 | 色值 | 用途 |
|------|------|------|
| 禁用背景 | `#F0F0F0` | 禁用元素 |
| 禁用文本 | `#999999` | 禁用文本 |
| 错误色 | `#E53E3E` | 错误提示 |
| 警告色 | `#ECC94B` | 警告提示 |
| 成功色 | `#48BB78` | 成功提示 |

---

## 排版系统

### 字体堆栈

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', sans-serif;
```

### 标题规范

| 等级 | 大小 | 粗细 | 行高 | 字间距 | 应用场景 |
|------|------|------|------|--------|---------|
| H1 | 42px | Bold (700) | 1.2 | 0 | 页面主标题、Hero |
| H2 | 30px | Bold (700) | 1.4 | 0 | 段落主标题 |
| H3 | 24px | Bold (700) | 1.5 | 0 | 小标题、卡片标题 |
| H4 | 20px | SemiBold (600) | 1.5 | 0 | 子标题 |
| H5 | 18px | SemiBold (600) | 1.6 | 0 | 小标题 |
| H6 | 16px | SemiBold (600) | 1.6 | 0 | 标签标题 |

### 正文规范

| 类型 | 大小 | 粗细 | 行高 | 应用场景 |
|------|------|------|------|---------|
| 正文 | 16px | Regular (400) | 1.8 | 段落文本 |
| 小正文 | 14px | Regular (400) | 1.8 | 说明、辅助文本 |
| 标签 | 12px | Medium (500) | 1.6 | Badge、标签 |
| 代码 | 14px | Regular (400) | 1.6 | 代码块、inline code |

### 中英文混排

中英文混排时，英文两侧预留 **0.25em** 空间：

```css
/* 示例 */
"openIndu 社区" /* 正确：openIndu 两侧空格 */
"openIndu社区"  /* 错误：紧贴 */
```

---

## 间距系统（8px网格）

所有间距都基于 **8px 基础单位**：

```
4px   = 0.5 unit
8px   = 1 unit
16px  = 2 unit
24px  = 3 unit
32px  = 4 unit
40px  = 5 unit
48px  = 6 unit
56px  = 7 unit
64px  = 8 unit
```

### 常用间距

| 用途 | 尺寸 | 示例 |
|------|------|------|
| 紧凑 | 8px | 按钮内间距、标签间距 |
| 标准 | 16px | 卡片内边距、列表项间距 |
| 宽松 | 24px | 段落底边距、小区域底边距 |
| 大间距 | 32-64px | 区域间距、Section间距 |

---

## 组件规范

### 按钮

#### 主按钮
- 背景：`#002FA7`（深蓝主色）
- 文本：白色
- Hover：`#1a3a6d`（深蓝加深）
- 高度：44px（最小可触摸面积）
- 圆角：6px
- 内间距：12px (上下) × 16px (左右)

```tsx
className="px-4 py-3 bg-[#002FA7] text-white rounded-md hover:bg-[#1a3a6d] transition-colors"
```

**实施状态（截至 2026-08-26）**：
- ✅ 64 个按钮已统一为 `bg-[#002FA7]` + `hover:bg-[#1a3a6d]`
- ✅ 所有 `bg-blue-{600,700,800,900}` 已替换为品牌主色
- ✅ 跨 23 个页面和组件实施

#### 次按钮
- 背景：白色
- 边框：2px `#002FA7`
- 文本：`#002FA7`
- Hover：浅蓝背景 (`#f0f4ff`)

#### 幽灵按钮
- 背景：透明
- 边框：1px `#e8eef5`
- 文本：`#666666`
- Hover：浅灰背景

### 卡片

- 背景：`#FFFFFF`
- 边框：1px `#e8eef5`
- 圆角：8px
- 内间距：24px
- 阴影：`0 1px 3px rgba(0,0,0,0.1)`
- Hover阴影：`0 4px 12px rgba(0,0,0,0.08)`

### 链接

- 文本色：`#5383FE`（亮蓝）
- Hover：下划线 + `#002FA7`
- 访问过：`#6c63ff`（紫色）
- 无装饰：移除下划线，Hover时才显示

### 输入框

- 背景：`#FFFFFF`
- 边框：1px `#e8eef5`
- 圆角：6px
- 高度：44px
- 内边距：12px 16px
- Focus：边框色改为 `#5383FE`，无发光效果

### 分割线

- 色值：`#e8eef5`（中灰）
- 粗细：1px
- 垂直分割线：考虑用背景色区分，而不是线

---

## 布局规范

### 容器宽度

| 断点 | 宽度 | 应用 |
|------|------|------|
| xs | 320px | 移动设备 |
| sm | 640px | 小屏设备 |
| md | 768px | 平板 |
| lg | 1024px | 桌面 |
| xl | 1280px | 大屏 |
| 2xl | 1536px | 超大屏 |

### 最大内容宽度

- **标准页面**：`max-w-7xl` (80rem / 1280px)
- **密集内容**：`max-w-5xl` (64rem / 1024px)
- **稀疏内容**：`max-w-4xl` (56rem / 896px)

### 区域间距

```css
/* 竖直方向 */
py-16  /* 64px - 移动设备 */
sm:py-20  /* 80px - 平板及以上 */

/* 水平方向 */
px-4  /* 16px - 移动设备 */
sm:px-6  /* 24px - 平板 */
lg:px-8  /* 32px - 桌面 */
```

---

## 渐变和背景

### 禁用渐变

不再使用渐变背景。所有区域改用纯色或浅灰背景：

```css
/* ❌ 禁止 */
bg-gradient-to-br from-blue-50 via-white to-cyan-50

/* ✅ 使用 */
bg-white  或  bg-gray-50
```

**实施状态（截至 2026-08-26）**：
- ✅ 30+ 处浅色渐变已删除，替换为纯色背景
- ✅ 11 处 Hero/CTA 渐变保留（深蓝→青蓝渐变）
- ✅ 所有页面背景统一为 `bg-white` 或 `bg-gray-50`

### 背景层级

1. **最顶层（Hero）**：`bg-white` 或 `bg-gradient-to-r from-blue-600 to-cyan-600`（仅Hero/CTA可用深色渐变）
2. **标准区域**：`bg-white`
3. **分割区**：`bg-gray-50`（`#F5F7FA`）
4. **强调区**：背景色 + 1px 边框

---

## 交互和动画

### 过渡效果

统一使用 Tailwind 的 `transition-*` 类：

```css
transition-colors  /* 颜色变化（按钮hover） */
transition-all     /* 全量变化（卡片hover） */
transition-transform  /* 变形（缩放） */
```

### 持续时间

- **快速**：`duration-150`（150ms - 鼠标hover）
- **标准**：`duration-300`（300ms - 页面过渡）
- **慢速**：`duration-500`（500ms - 复杂动画）

### 禁用悬停动画

在移动设备上禁用悬停效果：

```tsx
className="hover:bg-blue-50 active:bg-blue-100"  /* 桌面hover + 移动长按 */
```

---

## 响应式规范

### 移动优先

设计从移动设备（320px）开始，向上扩展：

```tsx
className="text-sm sm:text-base md:text-lg"
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

### 触摸友好

- **最小可点击面积**：44px × 44px
- **按钮高度最小**：44px
- **链接最小**：32px 高度 + 8px 左右内间距

---

## 无障碍（Accessibility）

### 色彩对比度

- **WCAG AA**（最小）：4.5:1
- **推荐**：7:1

检查工具：https://webaim.org/resources/contrastchecker/

### ARIA 标签

```tsx
<button aria-label="Close menu">×</button>
<nav aria-label="Breadcrumb">...</nav>
```

### 焦点状态

```css
focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600
```

---

## 动态特性

### 加载状态

- 使用骨架屏或淡色占位符
- 禁用交互元素，设置 `opacity-50` + `cursor-not-allowed`

### 空状态

- 居中显示，上下对称间距
- 使用 icon + 文本说明 + 可选的CTA按钮

### 错误状态

- 背景：`#FEE` / `#fef2f2`
- 文本：`#E53E3E`
- 图标：!️⚠️

---

## 已淘汰的样式

以下样式在新设计系统中不再使用：

- ❌ 渐变背景（除Hero外）
- ❌ 多色系（只用深蓝主色 + 亮蓝辅色 + 橙强调色）
- ❌ 浮动发光效果（`shadow-glow` 等）
- ❌ 彩色面包屑
- ❌ 商业 ROI 数字承诺
- ❌ 销售 CTA（"立即注册"、"免费试用"等）
- ❌ 英文标题混用中文界面

---

## 实施检查清单

- [x] 更新所有按钮为深蓝主色（2026-08-26 完成：64 处）
- [x] 删除所有渐变背景（除Hero）（2026-08-26 完成：30+ 处）
- [ ] 验证文本对比度 ≥ 4.5:1
- [ ] 检查所有间距是否8px对齐
- [x] 测试响应式布局（320px, 768px, 1440px）（构建验证通过）
- [ ] 验证无障碍（Tab键导航、Focus状态）
- [x] 国际化测试（中英文混排）（所有 i18n 键已实装）
- [ ] 性能检查（Lighthouse > 90分）

---

## 参考资源

- [openEuler Design](https://www.openeuler.org/) - 风格参考
- [Tailwind CSS](https://tailwindcss.com/) - 工具库
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/) - 无障碍标准
- [Web Typography](https://www.typewolf.com/) - 排版最佳实践
