import { useState, useEffect } from "react";
import { Network, Cpu, GitBranch, Package, Users, Activity, Settings, Server, Code, Lock, BarChart3, ArrowRight, CheckCircle, ExternalLink, Layers, Database, Workflow } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

type TabType = "overview" | "features" | "quickstart" | "docs";

export function IIoTPlatform() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  // 监听URL hash变化，自动切换标签
  useEffect(() => {
    const hash = location.hash.replace("#", "") as TabType;
    if (hash && ["overview", "features", "quickstart", "docs"].includes(hash)) {
      setActiveTab(hash);
    }
  }, [location.hash]);

  // 切换标签时更新URL hash
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    navigate(`#${tab}`, { replace: true });
  };

  const tabs = [
    { id: "overview" as TabType, name: "平台介绍", icon: Network },
    { id: "features" as TabType, name: "核心功能", icon: Cpu },
    { id: "quickstart" as TabType, name: "快速开始", icon: Code },
    { id: "docs" as TabType, name: "文档", icon: BarChart3 },
  ];

  const modules = [
    {
      id: "device",
      icon: Cpu,
      title: "设备管理模块",
      color: "blue",
      features: [
        "设备注册和生命周期管理",
        "设备状态实时监控",
        "设备关键参数管理",
        "设备参数历史追踪",
        "设备告警管理",
        "设备-流程关联",
      ],
    },
    {
      id: "process",
      icon: GitBranch,
      title: "工艺管理模块",
      color: "cyan",
      features: [
        "工业流程工作流定义",
        "流程线管理",
        "设备-流程映射",
        "流程监控",
      ],
    },
    {
      id: "product",
      icon: Package,
      title: "产品追溯模块",
      color: "green",
      features: [
        "产品生命周期追踪",
        "追溯链管理",
        "质量控制集成",
      ],
    },
    {
      id: "system",
      icon: Users,
      title: "系统管理模块",
      color: "purple",
      features: [
        "用户 CRUD 操作",
        "基于角色的访问控制 (RBAC)",
        "权限管理",
        "部门层级管理",
        "系统配置",
        "数据字典",
      ],
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      blue: { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-600" },
      cyan: { bg: "bg-cyan-100", text: "text-cyan-600", border: "border-cyan-600" },
      green: { bg: "bg-green-100", text: "text-green-600", border: "border-green-600" },
      purple: { bg: "bg-purple-100", text: "text-purple-600", border: "border-purple-600" },
      orange: { bg: "bg-orange-100", text: "text-orange-600", border: "border-orange-600" },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="py-12">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 to-cyan-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-lg">
              <Network className="w-7 h-7" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">AI+工业互联网平台</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mb-6">
            openIndu Platform 是一个企业级工业物联网（Industrial IoT）全栈平台，
            提供完整的设备管理、流程管理、产品追溯和用户管理解决方案。
            融合AI能力，实现智能化的工业数据采集、分析与决策。
          </p>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700 font-medium">版本: 0.0.1-SNAPSHOT</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700 font-medium">最后更新: 2026-02-10</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-16">
            {/* Online Platform Section */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">在线演示平台</h2>

              {/* Platform Access Card */}
              <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 p-8 rounded-2xl border-2 border-blue-200 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-xl">
                    <ExternalLink className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">体验完整功能</h3>
                    <p className="text-sm text-gray-600">无需本地部署，点击即可访问演示系统</p>
                  </div>
                </div>

                {/* Platform URL */}
                <div className="bg-white p-6 rounded-xl mb-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-2">平台地址</p>
                      <a
                        href="https://website.openindu.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-2"
                      >
                        https://website.openindu.com/
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                    <a
                      href="https://website.openindu.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
                    >
                      访问平台
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Login Credentials */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl border border-blue-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-lg">
                        <Users className="w-5 h-5" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900">登录凭据</h4>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">用户名</p>
                        <div className="flex items-center gap-2">
                          <code className="px-3 py-2 bg-gray-100 rounded text-gray-900 font-mono text-sm flex-1">admin</code>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">密码</p>
                        <div className="flex items-center gap-2">
                          <code className="px-3 py-2 bg-gray-100 rounded text-gray-900 font-mono text-sm flex-1">abc@123456</code>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-green-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-green-100 text-green-600 rounded-lg">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900">功能权限</h4>
                    </div>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">完整系统管理权限</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">设备、流程、产品管理</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">数据大屏查看权限</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Warning Notice */}
                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1">演示系统说明</h5>
                      <p className="text-sm text-gray-700">
                        这是一个演示环境，数据会定期重置。请勿存储重要信息。如需生产环境部署，请参考"快速开始"标签页。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Modules */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">核心模块</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-lg mb-4">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">设备管理</h3>
                  <p className="text-sm text-gray-600">
                    设备注册、生命周期管理、实时监控、关键参数管理、设备告警
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-600 text-white rounded-lg mb-4">
                    <GitBranch className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">流程管理</h3>
                  <p className="text-sm text-gray-600">
                    工业流程工作流定义、流程线管理、设备-流程映射、流程监控
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl border border-green-100">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-600 text-white rounded-lg mb-4">
                    <Package className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">产品追溯</h3>
                  <p className="text-sm text-gray-600">
                    产品生命周期追踪、追溯链管理、质量控制集成
                  </p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-100">
                  <div className="flex items-center justify-center w-12 h-12 bg-orange-600 text-white rounded-lg mb-4">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">系统管理</h3>
                  <p className="text-sm text-gray-600">
                    用户管理、角色权限、部门层级、系统配置、数据字典
                  </p>
                </div>
              </div>
            </div>

            {/* Platform Architecture */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">平台架构</h2>
              <p className="text-lg text-gray-600 mb-8">
                openIndu Platform 采用分层微服务架构，包含 8 个核心层级，从边缘设备到用户界面全栈覆盖
              </p>

              {/* Architecture Layers */}
              <div className="space-y-6">
                {/* Layer 1: Edge Layer */}
                <div className="bg-white p-6 rounded-xl border-2 border-orange-200 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex-shrink-0">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">边缘层 (Edge Layer)</h3>
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">Layer 8</span>
                      </div>
                      <p className="text-gray-600 mb-3">工业现场设备和PLC控制器</p>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">西门子 S7</span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">三菱 MC</span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">欧姆龙 FINS</span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">基恩士 KV</span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">汇川 Modbus</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Layer 2: Edge Gateway Layer */}
                <div className="bg-white p-6 rounded-xl border-2 border-red-200 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-red-100 text-red-600 rounded-lg flex-shrink-0">
                      <Workflow className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">边缘网关层 (Edge Gateway Layer)</h3>
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">Layer 7</span>
                      </div>
                      <p className="text-gray-600 mb-3">openIndu-agent：PLC协议转换、数据采集、边缘计算</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">协议转换</span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">数据采集</span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">Kafka上报</span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">边缘计算</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Layer 3: Message Layer */}
                <div className="bg-white p-6 rounded-xl border-2 border-purple-200 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex-shrink-0">
                      <Network className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">消息层 (Message Layer)</h3>
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">Layer 6</span>
                      </div>
                      <p className="text-gray-600 mb-3">高性能消息队列和IoT消息代理</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">Kafka Cluster</span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">Mosquitto MQTT</span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">HTTP API</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Layer 4: Data Collection Layer */}
                <div className="bg-white p-6 rounded-xl border-2 border-indigo-200 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex-shrink-0">
                      <Database className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">数据采集层 (Data Collection Layer)</h3>
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">Layer 5</span>
                      </div>
                      <p className="text-gray-600 mb-3">openIndu-collector：消息消费、设备认证、数据入库</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">Kafka消费</span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">MQTT订阅</span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">UUID认证</span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">数据入库</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Layer 5: Persistence Layer */}
                <div className="bg-white p-6 rounded-xl border-2 border-green-200 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-lg flex-shrink-0">
                      <Database className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">持久层 (Persistence Layer)</h3>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Layer 4</span>
                      </div>
                      <p className="text-gray-600 mb-3">多数据库架构：业务数据、缓存、时序数据</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">PostgreSQL 15.7</span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">Redis 7.2</span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">TDengine 3.0</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Layer 6: Service Layer */}
                <div className="bg-white p-6 rounded-xl border-2 border-cyan-200 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-cyan-100 text-cyan-600 rounded-lg flex-shrink-0">
                      <Server className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">服务层 (Service Layer)</h3>
                        <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-semibold">Layer 3</span>
                      </div>
                      <p className="text-gray-600 mb-3">openIndu-backend：Spring Boot 3.5.6 + Java 21 企业级后端</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">REST API</span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">Spring Security</span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">MyBatis Plus</span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">JWT认证</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Layer 7: Gateway Layer */}
                <div className="bg-white p-6 rounded-xl border-2 border-blue-200 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex-shrink-0">
                      <Layers className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">网关层 (Gateway Layer)</h3>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">Layer 2</span>
                      </div>
                      <p className="text-gray-600 mb-3">Nginx反向代理 + Vue 3前端应用</p>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-sm font-semibold text-gray-900 mb-2">Nginx</p>
                          <div className="flex flex-wrap gap-1">
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">反向代理</span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">SSL终止</span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">负载均衡</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 mb-2">openIndu-website</p>
                          <div className="flex flex-wrap gap-1">
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">Vue 3</span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">Element Plus</span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">Pinia</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Layer 8: User Layer */}
                <div className="bg-white p-6 rounded-xl border-2 border-gray-300 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-200 text-gray-700 rounded-lg flex-shrink-0">
                      <Users className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">用户层 (User Layer)</h3>
                        <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-semibold">Layer 1</span>
                      </div>
                      <p className="text-gray-600 mb-3">多终端访问支持</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">浏览器</span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">移动端</span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">第三方系统</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Flow */}
              <div className="mt-8 bg-gradient-to-r from-orange-50 via-purple-50 to-blue-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">数据流向</h3>
                <div className="flex items-center gap-2 text-sm text-gray-700 overflow-x-auto pb-2">
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded whitespace-nowrap font-medium">PLC设备</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded whitespace-nowrap font-medium">边缘网关</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded whitespace-nowrap font-medium">消息队列</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded whitespace-nowrap font-medium">数据采集</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded whitespace-nowrap font-medium">持久层</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded whitespace-nowrap font-medium">后端服务</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded whitespace-nowrap font-medium">前端应用</span>
                </div>
              </div>

              {/* Frontend-Backend Separation Architecture */}
              <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">前后端分离架构</h3>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-lg">
                          <Code className="w-6 h-6" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">前端 (openIndu-website)</h4>
                        <p className="text-gray-600">
                          基于 Vue 3 + Vite + Element Plus 的现代化 Web 应用，
                          提供直观的用户界面和流畅的用户体验。
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-12 h-12 bg-cyan-100 text-cyan-600 rounded-lg">
                          <Server className="w-6 h-6" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">后端 (openIndu-backend)</h4>
                        <p className="text-gray-600">
                          基于 Spring Boot 3.5.6 + Java 21 的企业级后端服务，
                          集成MyBatis Plus ORM框架和PostgreSQL数据库。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1766855841547-b4ffef4b98e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY2lyY3VpdCUyMG5ldHdvcmt8ZW58MXx8fHwxNzczNTY3MDkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Platform Architecture"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">安全特性</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-lg mb-4">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">认证与授权</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• JWT 令牌认证</li>
                    <li>• 访问令牌 + 刷新令牌</li>
                    <li>• RBAC 权限控制</li>
                    <li>• 细粒度权限管理</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-lg mb-4">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">数据安全</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• PBKDF2 密码加密</li>
                    <li>• AES 敏感数据加密</li>
                    <li>• 逻辑删除</li>
                    <li>• SQL 注入防护</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-lg mb-4">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">审计与日志</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• AOP 操作日志</li>
                    <li>• 审计追踪</li>
                    <li>• 结构化日志</li>
                    <li>• 用户活动追踪</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Tab */}
        {activeTab === "features" && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">功能模块详情</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {modules.map((module, index) => {
                const colors = getColorClasses(module.color);
                return (
                  <div
                    id={module.id}
                    key={index}
                    className={`bg-white border-2 ${colors.border} rounded-xl p-8 hover:shadow-xl transition-all`}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`flex items-center justify-center w-14 h-14 ${colors.bg} ${colors.text} rounded-xl`}>
                        <module.icon className="w-7 h-7" />
                      </div>
                      <h2 className="text-2xl font-semibold text-gray-900">{module.title}</h2>
                    </div>
                    <ul className="space-y-3">
                      {module.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className={`mt-1 w-1.5 h-1.5 ${colors.bg} rounded-full flex-shrink-0`}></div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            <div className="mt-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">技术亮点</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-2xl mx-auto mb-4">
                    <Settings className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">模块化设计</h3>
                  <p className="text-gray-600">
                    各功能模块独立开发和部署，易于扩展和维护
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-2xl mx-auto mb-4">
                    <Activity className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">实时数据处理</h3>
                  <p className="text-gray-600">
                    高效的数据采集和处理能力，支持大规模设备接入
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-2xl mx-auto mb-4">
                    <Users className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">权限精细控制</h3>
                  <p className="text-gray-600">
                    基于 RBAC 的权限管理，确保数据和操作安全
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Start Tab */}
        {activeTab === "quickstart" && (
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">快速开始</h2>
              <p className="text-lg text-gray-600 mb-8">
                通过以下步骤，快速部署和运行 openIndu Platform
              </p>
            </div>

            {/* Prerequisites */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">前置要求</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-3">前端开发环境</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Node.js 18+</li>
                    <li>• pnpm 包管理器</li>
                  </ul>
                </div>
                <div className="bg-cyan-50 p-6 rounded-xl border border-cyan-200">
                  <h4 className="font-semibold text-gray-900 mb-3">后端开发环境</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Java 21 (LTS)</li>
                    <li>• Maven 3.9+</li>
                    <li>• PostgreSQL 15.7</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Docker Compose */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Docker Compose 一键部署（推荐）</h3>
              <div className="bg-gray-900 rounded-xl p-6">
                <pre className="text-sm text-gray-100 overflow-x-auto">
{`# 进入部署目录
cd openIndu-backend/deploy/docker-compose

# 复制环境变量配置
cp .env.example .env

# 编辑 .env 文件，配置数据库密码和密钥
vim .env

# 启动所有服务
./deploy.sh

# 访问应用
# 前端: http://localhost
# 后端: http://localhost:8000
# API 文档: http://localhost:8000/swagger-ui/index.html`}
                </pre>
              </div>
            </div>

            {/* Backend Setup */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">后端启动</h3>
              <div className="bg-gray-900 rounded-xl p-6">
                <pre className="text-sm text-gray-100 overflow-x-auto">
{`# 1. 进入后端目录
cd openIndu-backend

# 2. 启动 PostgreSQL (使用 Docker)
cd deploy/docker-compose
docker-compose up -d postgres-15

# 3. 设置环境变量
export DB_URL=jdbc:postgresql://localhost:5432/openindu
export DB_USERNAME=openindu
export DB_PASSWORD=your_password
export ENCRYPT_JWT=your_jwt_secret

# 4. 构建并运行
cd ../
mvn clean package -Dmaven.test.skip
mvn spring-boot:run

# 5. 访问 API 文档
# http://localhost:8000/swagger-ui/index.html`}
                </pre>
              </div>
            </div>

            {/* Frontend Setup */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">前端启动</h3>
              <div className="bg-gray-900 rounded-xl p-6">
                <pre className="text-sm text-gray-100 overflow-x-auto">
{`# 1. 进入前端目录
cd openIndu-website

# 2. 安装依赖
pnpm install

# 3. 启动开发服务器
pnpm run dev

# 4. 访问应用
# http://localhost:8001`}
                </pre>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-xl border border-blue-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">下一步</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <ArrowRight className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">查看 API 文档了解接口详情</span>
                </div>
                <div className="flex items-center gap-3">
                  <ArrowRight className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">访问前端应用体验完整功能</span>
                </div>
                <div className="flex items-center gap-3">
                  <ArrowRight className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">参考文档了解更多配置选项</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Docs Tab */}
        {activeTab === "docs" && (
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">技术文档</h2>
              <p className="text-lg text-gray-600">
                完整的开发文档、API参考和部署指南
              </p>
            </div>

            {/* Documentation Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a
                href="http://localhost:8000/swagger-ui/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-600 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Code className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">API 文档</h3>
                </div>
                <p className="text-gray-600">
                  交互式 API 文档，基于 Swagger/Knife4j，可在线测试接口
                </p>
              </a>
              <div className="block p-6 bg-white border-2 border-gray-200 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-lg">
                    <Server className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">架构设计</h3>
                </div>
                <p className="text-gray-600">
                  详细的系统架构、模块设计和技术选型说明
                </p>
              </div>
              <div className="block p-6 bg-white border-2 border-gray-200 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-lg">
                    <Settings className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">部署指南</h3>
                </div>
                <p className="text-gray-600">
                  Docker Compose 和 Kubernetes 部署详细步骤
                </p>
              </div>
              <div className="block p-6 bg-white border-2 border-gray-200 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-orange-100 text-orange-600 rounded-lg">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">安全最佳实践</h3>
                </div>
                <p className="text-gray-600">
                  认证授权、数据加密、审计日志等安全配置说明
                </p>
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">技术栈详情</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                  <h4 className="text-xl font-semibold text-gray-900 mb-6">前端技术</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <span className="text-gray-700 font-medium">Vue</span>
                      <span className="text-sm text-gray-500">3.5.16</span>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <span className="text-gray-700 font-medium">Vite</span>
                      <span className="text-sm text-gray-500">6.3.5</span>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <span className="text-gray-700 font-medium">Element Plus</span>
                      <span className="text-sm text-gray-500">2.10.7</span>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <span className="text-gray-700 font-medium">Pinia</span>
                      <span className="text-sm text-gray-500">3.0.2</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium">ECharts</span>
                      <span className="text-sm text-gray-500">5.6.0</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                  <h4 className="text-xl font-semibold text-gray-900 mb-6">后端技术</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <span className="text-gray-700 font-medium">Java</span>
                      <span className="text-sm text-gray-500">21 LTS</span>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <span className="text-gray-700 font-medium">Spring Boot</span>
                      <span className="text-sm text-gray-500">3.5.6</span>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <span className="text-gray-700 font-medium">Spring Security</span>
                      <span className="text-sm text-gray-500">6.4.4</span>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <span className="text-gray-700 font-medium">MyBatis Plus</span>
                      <span className="text-sm text-gray-500">3.5.6</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium">PostgreSQL</span>
                      <span className="text-sm text-gray-500">15.7</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Version Info */}
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">版本信息</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">当前版本</p>
                  <p className="text-lg font-semibold text-gray-900">0.0.1-SNAPSHOT</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">最后更新</p>
                  <p className="text-lg font-semibold text-gray-900">2026-02-10</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">开发分支</p>
                  <p className="text-lg font-semibold text-gray-900">feature_dev</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
