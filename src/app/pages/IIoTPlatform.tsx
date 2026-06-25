import {
  ArrowRight, Cpu, Shield, LayoutDashboard, Monitor,
  Database, Smartphone, Users, Layers, Server, CheckCircle,
  Code, Network, Zap, BarChart3, ExternalLink
} from "lucide-react";
import { SEO } from "../components/SEO";

const features = [
  {
    icon: Shield,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
    title: "智能登录 · 安全便捷",
    subtitle: "Account & Password Login · Secure & Convenient",
    description: "支持账号密码登录与注册，JWT Token 认证机制保障安全。",
    screenshotSrc: "/assets/iiot/login.png",
    screenshotAlt: "智能登录界面",
    details: [
      "账号密码登录与注册，支持记住密码",
      "JWT Token 双令牌认证（Access + Refresh）",
      "快速进入工作空间，一键直达核心功能",
      "细粒度权限控制，不同角色看到不同界面",
    ],
  },
  {
    icon: LayoutDashboard,
    iconColor: "text-cyan-600",
    iconBg: "bg-cyan-100",
    title: "工作台 · 全局一目了然",
    subtitle: "Workbench · Global Overview at a Glance",
    description: "多维度数据聚合，设备状态、产线运行、告警信息一目了然。",
    screenshotSrc: "/assets/iiot/workbench.png",
    screenshotAlt: "工作台总览",
    details: [
      "设备总览：总数、在线/离线统计",
      "产线状态：实时运行状态与利用率",
      "设备类型分布：上料机、AOI 检测、固化炉等",
      "最新告警：未恢复告警实时展示",
      "最近操作：审计日志追溯",
      "快捷入口：用户管理、角色管理、设备列表、数据大屏",
    ],
  },
  {
    icon: Monitor,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100",
    title: "数据大屏 · 生产态势一屏掌控",
    subtitle: "Data Dashboard · Production Status on One Screen",
    description: "暗色科技风格数据大屏，适合车间看板与管理指挥中心。",
    screenshotSrc: "/assets/iiot/dashboard.png",
    screenshotAlt: "数据大屏",
    details: [
      "关键指标卡片：在线设备、日产量、合格率、设备效率、告警数量",
      "产线设备统计：按产线维度实时展示",
      "生产数据概览：产量趋势、效率、品质、产线状态",
      "实时告警日志：异常事件即时推送",
      "工位不良率统计：各工位质量数据对比",
      "原料消耗监控：实时物料使用跟踪",
    ],
  },
  {
    icon: Database,
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
    title: "设备管理 · 全生命周期管控",
    subtitle: "Equipment Management · Full Lifecycle Control",
    description: "从设备注册到报废的全生命周期管理，实时监控与预警。",
    screenshotSrc: "/assets/iiot/device-mgmt.png",
    screenshotAlt: "设备管理",
    details: [
      "设备搜索：按名称、UUID、类型、产线筛选",
      "设备状态监控：实时运行状态追踪",
      "设备告警：查询与处理闭环管理",
      "关键参数：实时参数监控与历史追踪",
      "设备维护：维护计划与记录管理",
      "设备类型管理：自定义设备类型配置",
    ],
  },
  {
    icon: BarChart3,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100",
    title: "产品追溯 · 从原料到成品全链路",
    subtitle: "Product Traceability · From Raw Material to Finished Product",
    description: "完整的产品追溯链条，从原材料到成品全程可追溯。",
    screenshotSrc: "/assets/iiot/traceability.png",
    screenshotAlt: "产品追溯",
    details: [
      "追溯查询：支持追溯号、产品编号、批次号查询",
      "全链路追溯：所有工位、原材料、工艺参数完整记录",
      "工艺记录：进出站时间、操作员、设备、参数快照",
      "原料追溯：按批次追溯受影响的产品",
    ],
  },
  {
    icon: Smartphone,
    iconColor: "text-pink-600",
    iconBg: "bg-pink-100",
    title: "支持微信小程序",
    subtitle: "WeChat Mini Program Support",
    description: "移动端便捷操作，随时随地掌握生产动态。",
    screenshotSrc: "/assets/iiot/mini-program.png",
    screenshotAlt: "微信小程序",
    isTall: true,
    details: [
      "微信小程序端查看设备状态与生产数据",
      "移动端告警推送与处理",
      "与 Web 端数据实时同步",
    ],
  },
];

const advantages = [
  {
    icon: Cpu,
    title: "行业聚焦",
    description: "专注 3C 电子制造行业，深度理解行业痛点与需求",
  },
  {
    icon: Network,
    title: "完整追溯链",
    description: "从原材料到成品的全链路产品追溯，确保品质可控",
  },
  {
    icon: LayoutDashboard,
    title: "优秀前端体验",
    description: "Vue 3 + Element Plus 构建的现代化 Web 应用",
  },
  {
    icon: Server,
    title: "设备兼容广泛",
    description: "支持西门子、三菱、欧姆龙、基恩士、汇川等主流 PLC 协议",
  },
  {
    icon: Layers,
    title: "云边协同",
    description: "边缘网关 + 云端平台的协同架构，灵活部署",
  },
  {
    icon: Users,
    title: "社区驱动",
    description: "开源社区共建，持续迭代优化，代码公开透明",
  },
];

const techLayers = [
  {
    layer: 8, name: "Web 前端",
    tech: "Vue 3.5 + Element Plus + ECharts + Pinia",
    desc: "现代化 SPA，RBAC 权限，数据可视化，多角色适配",
    color: "blue", badgeBg: "bg-blue-100", badgeText: "text-blue-700", iconBg: "bg-blue-600",
  },
  {
    layer: 7, name: "后端服务",
    tech: "Spring Boot 3.5 + Java 21 + Spring Security",
    desc: "RESTful API，JWT 双令牌，微服务架构",
    color: "cyan", badgeBg: "bg-cyan-100", badgeText: "text-cyan-700", iconBg: "bg-cyan-600",
  },
  {
    layer: 6, name: "边缘网关",
    tech: "S7 / Modbus / FINS / MC 协议",
    desc: "西门子 / 三菱 / 基恩士 / 欧姆龙 / 汇川 PLC 接入",
    color: "green", badgeBg: "bg-green-100", badgeText: "text-green-700", iconBg: "bg-green-600",
  },
  {
    layer: 5, name: "数据采集",
    tech: "FastAPI + Kafka + MQTT",
    desc: "高吞吐量采集，UUID 认证，时序数据库",
    color: "purple", badgeBg: "bg-purple-100", badgeText: "text-purple-700", iconBg: "bg-purple-600",
  },
  {
    layer: 4, name: "业务数据库",
    tech: "PostgreSQL 15.7",
    desc: "用户、权限、工艺、追溯等业务数据",
    color: "orange", badgeBg: "bg-orange-100", badgeText: "text-orange-700", iconBg: "bg-orange-600",
  },
  {
    layer: 3, name: "时序数据库",
    tech: "TDengine 3.0",
    desc: "设备状态与工艺历史时序数据存储",
    color: "red", badgeBg: "bg-red-100", badgeText: "text-red-700", iconBg: "bg-red-600",
  },
  {
    layer: 2, name: "缓存层",
    tech: "Redis 7.2",
    desc: "会话管理、权限缓存、实时数据",
    color: "yellow", badgeBg: "bg-yellow-100", badgeText: "text-yellow-700", iconBg: "bg-yellow-600",
  },
  {
    layer: 1, name: "消息代理",
    tech: "Mosquitto MQTT 5.0",
    desc: "IoT 设备消息路由与分发",
    color: "indigo", badgeBg: "bg-indigo-100", badgeText: "text-indigo-700", iconBg: "bg-indigo-600",
  },
];

function FeatureRow({ feature, reversed }: { feature: (typeof features)[0]; reversed: boolean }) {
  const Icon = feature.icon;
  return (
    <div className={`flex flex-col items-center gap-8 lg:gap-12 lg:flex-row ${reversed ? "lg:flex-row-reverse" : ""}`}>
      {/* Screenshot */}
      <div className={`w-full lg:w-3/5 ${feature.isTall ? "flex justify-center" : ""}`}>
        <div className={`rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white ${feature.isTall ? "max-w-[220px]" : ""}`}>
          <img
            src={feature.screenshotSrc}
            alt={feature.screenshotAlt}
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
      </div>
      {/* Content */}
      <div className="w-full lg:w-2/5">
        <div className="flex items-center gap-3 mb-3">
          <div className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 ${feature.iconBg} rounded-xl flex-shrink-0`}>
            <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${feature.iconColor}`} />
          </div>
          <div className="min-w-0">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">{feature.title}</h3>
            <p className="text-xs sm:text-sm text-gray-500 truncate">{feature.subtitle}</p>
          </div>
        </div>
        <p className="text-sm sm:text-base text-gray-600 mb-4">{feature.description}</p>
        <ul className="space-y-2">
          {feature.details.map((detail, i) => (
            <li key={`${feature.title}-${i}`} className="flex items-start gap-2 text-gray-700">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function IIoTPlatform() {
  return (
    <div>
      <SEO
        title="工业互联网平台 IIoT｜openIndu"
        description="openIndu 工业互联网平台：面向 3C 电子制造的企业级 IIoT，设备管理、数据采集、可视化看板与追溯一体化。"
        keywords="工业互联网,IIoT,设备管理,数据采集,3C 制造,openIndu"
        canonicalPath="/iiot-platform"
      />
      {/* ===== Hero Section ===== */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full text-sm mb-4 sm:mb-6">
            <Zap className="w-4 h-4" />
            openIndu Platform
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
            面向 3C 电子制造行业的<br />企业级工业互联网平台
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-6 sm:mb-8 font-light">
            让工业数据说话，让智能制造更简单
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-10">
            <a
              href="https://website.openindu.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium text-base sm:text-lg"
            >
              体验平台
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </a>
            <a
              href="#architecture"
              className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 border-2 border-white/60 text-white rounded-lg hover:bg-white/10 transition-colors font-medium text-base sm:text-lg"
            >
              了解架构
            </a>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 sm:inline-flex bg-white/10 backdrop-blur rounded-xl px-4 py-4 sm:px-6 sm:py-4 w-full sm:w-auto">
            <div className="text-center">
              <p className="text-xs text-blue-200 mb-1">演示地址</p>
              <p className="text-sm font-mono">website.openindu.com</p>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/30" />
            <div className="flex gap-6 sm:hidden">
              <div className="text-center">
                <p className="text-xs text-blue-200 mb-1">用户名</p>
                <p className="text-sm font-mono">admin</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-blue-200 mb-1">密码</p>
                <p className="text-sm font-mono">abc@123456</p>
              </div>
            </div>
            <div className="hidden sm:block text-center">
              <p className="text-xs text-blue-200 mb-1">用户名</p>
              <p className="text-sm font-mono">admin</p>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/30" />
            <div className="hidden sm:block text-center">
              <p className="text-xs text-blue-200 mb-1">密码</p>
              <p className="text-sm font-mono">abc@123456</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Platform Intro ===== */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">平台简介</h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6">
              openIndu 是一个社区级工业互联网平台，专注于 3C 电子制造行业，
              覆盖从<span className="font-semibold text-blue-600">边缘数据采集</span>
              →<span className="font-semibold text-blue-600">实时监控</span>
              →<span className="font-semibold text-blue-600">工艺管理</span>
              →<span className="font-semibold text-blue-600">产品追溯</span>
              →<span className="font-semibold text-blue-600">数据大屏</span>
              的完整链路。
            </p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              平台由两部分组成：<strong className="text-gray-900">页面端</strong>基于 Vue 3 的现代化 Web 应用，
              为不同角色提供个性化工作台与数据看板；
              <strong className="text-gray-900">设备端</strong>通过多协议边缘网关连接 PLC 设备，
              实现工业现场数据的实时采集与上报。
            </p>
          </div>
        </div>
      </section>

      {/* ===== Core Features ===== */}
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">核心功能</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              六大核心功能模块，覆盖智能制造全场景
            </p>
          </div>

          <div className="space-y-12 sm:space-y-24">
            {features.map((feature, index) => (
              <FeatureRow key={index} feature={feature} reversed={index % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Architecture ===== */}
      <section id="architecture" className="py-12 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">技术架构</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              8 层微服务架构，从边缘设备到用户界面全栈覆盖
            </p>
          </div>

          {/* Architecture Diagram */}
          <div className="mb-10 sm:mb-16 max-w-4xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white p-3 sm:p-4">
              <img
                src="/assets/iiot/architecture.svg"
                alt="openIndu 平台架构图"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Tech Layers */}
          <div className="space-y-3 sm:space-y-4 max-w-4xl mx-auto">
            {techLayers.map((layer) => (
              <div
                key={layer.layer}
                className="bg-white p-4 sm:p-5 rounded-xl border-2 border-gray-200 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex-shrink-0 text-white text-xs sm:text-sm font-bold ${layer.iconBg}`}>
                    L{layer.layer}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">{layer.name}</h3>
                      <span className={`px-2 py-0.5 ${layer.badgeBg} ${layer.badgeText} rounded text-xs font-medium`}>
                        Layer {layer.layer}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 font-mono mb-1 break-all">{layer.tech}</p>
                    <p className="text-xs sm:text-sm text-gray-600">{layer.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Data Flow */}
          <div className="mt-8 sm:mt-12 max-w-4xl mx-auto bg-gradient-to-r from-blue-50 via-purple-50 to-cyan-50 p-4 sm:p-6 rounded-xl border border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">数据流向</h3>
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-700">
              <span className="px-2 sm:px-3 py-1 bg-orange-100 text-orange-700 rounded whitespace-nowrap font-medium">PLC设备</span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
              <span className="px-2 sm:px-3 py-1 bg-red-100 text-red-700 rounded whitespace-nowrap font-medium">边缘网关</span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
              <span className="px-2 sm:px-3 py-1 bg-purple-100 text-purple-700 rounded whitespace-nowrap font-medium">消息队列</span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
              <span className="px-2 sm:px-3 py-1 bg-indigo-100 text-indigo-700 rounded whitespace-nowrap font-medium">数据采集</span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
              <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-700 rounded whitespace-nowrap font-medium">持久层</span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
              <span className="px-2 sm:px-3 py-1 bg-cyan-100 text-cyan-700 rounded whitespace-nowrap font-medium">后端服务</span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
              <span className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-700 rounded whitespace-nowrap font-medium">前端应用</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Advantages ===== */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">核心优势</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              为什么选择 openIndu 平台
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {advantages.map((adv, index) => {
              const Icon = adv.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all">
                  <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-lg mb-3 sm:mb-4">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">{adv.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">{adv.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA Section ===== */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">加入 openIndu社区</h2>
              <p className="text-base sm:text-xl mb-6 sm:mb-8 text-blue-100">
                立即体验企业级工业互联网平台，与全球开发者共同构建智能制造生态
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <a
                  href="https://website.openindu.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium text-base sm:text-lg"
                >
                  访问平台
                  <ExternalLink className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </a>
                <a
                  href="https://gitee.com/openIndu/openIndu-platform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-medium text-base sm:text-lg"
                >
                  查看代码
                  <Code className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl max-w-[380px] sm:max-w-none mx-auto">
                <p className="text-center text-gray-700 font-semibold mb-3 sm:mb-4 text-sm sm:text-base">关注微信公众号</p>
                <img
                  src="/assets/iiot/qr-code.jpg"
                  alt="openIndu 微信公众号二维码"
                  className="w-full sm:w-96 h-auto mx-auto"
                />
                <p className="text-center text-gray-500 text-xs sm:text-sm mt-2 sm:mt-3">获取更多最新动态</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
