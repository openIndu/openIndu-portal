import { Cpu, Clock, Layers, Code2 } from "lucide-react";

export function MotionControl() {
  const features = [
    {
      icon: Cpu,
      title: "PLC运动控制",
      description: "支持主流PLC品牌运动控制指令开发，实现高精度多轴联动",
    },
    {
      icon: Code2,
      title: "上位机开发",
      description: "C#/C++开发运动控制上位机软件，实现人机交互与运动规划",
    },
    {
      icon: Layers,
      title: "运动控制卡",
      description: "集成主流运动控制卡，支持复杂轨迹规划与多轴同步",
    },
  ];

  const plcBrands = [
    { name: "三菱PLC", desc: "FX/Q系列运动控制，定位模块应用" },
    { name: "西门子PLC", desc: "S7-1200/1500运动控制，TIA Portal编程" },
    { name: "欧姆龙PLC", desc: "NJ/NX系列运动控制，EtherCAT总线" },
    { name: "基恩士PLC", desc: "KV系列高速定位，视觉联动" },
    { name: "汇川PLC", desc: "H5U系列运动控制，国产替代方案" },
  ];

  const motionCardBrands = [
    { name: "雷赛", desc: "DMC系列运动控制卡，高性价比方案" },
    { name: "固高", desc: "GT系列运动控制器，多轴插补" },
    { name: "研华", desc: "PCI/PCIe运动控制卡，工控机集成" },
    { name: "凌华", desc: "PCIE-81xx系列，高速数据采集" },
    { name: "正运动", desc: "ZMC系列控制器，脚本编程" },
  ];

  const industries = [
    {
      name: "面板行业",
      applications: [
        "LCD/OLED贴合设备运动控制",
        "玻璃基板搬运与定位系统",
        "AOI检测设备运动平台",
        "激光切割/钻孔设备控制",
      ],
      tech: "多轴联动、高精度定位、EtherCAT总线",
    },
    {
      name: "新能源行业",
      applications: [
        "锂电池涂布机张力控制",
        "电池模组组装线运动控制",
        "光伏组件焊接设备",
        "充电桩测试设备自动化",
      ],
      tech: "速度同步、张力控制、CAN总线",
    },
    {
      name: "医疗行业",
      applications: [
        "医疗影像设备运动平台",
        "体外诊断设备样本分拣",
        "手术机器人运动控制",
        "药品包装设备定位系统",
      ],
      tech: "高精度定位、平滑运动、安全防护",
    },
  ];

  return (
    <div className="py-12">
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-600 text-white rounded-lg">
              <Cpu className="w-7 h-7" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">AI+运动控制</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mb-6">
            基于PLC和上位机的工业运动控制解决方案，支持主流品牌PLC（三菱、西门子、欧姆龙、基恩士、汇川）
            以及运动控制卡（雷赛、固高、研华、凌华、正运动）。提供C#/C++上位机软件开发，
            广泛应用于面板、新能源、医疗等行业的自动化设备。
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg">
              <Clock className="w-5 h-5" />
              <span className="font-medium">敬请期待</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">核心特性</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 border border-gray-200 rounded-xl hover:border-orange-600 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-orange-100 text-orange-600 rounded-lg mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">支持的PLC品牌</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            丰富的PLC运动控制开发经验，支持主流品牌运动控制指令编程
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
            {plcBrands.map((brand, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-orange-600 transition-all">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 text-white rounded-lg mb-3 font-bold text-lg">
                  {brand.name.charAt(0)}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{brand.name}</h3>
                <p className="text-sm text-gray-600">{brand.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">运动控制卡/控制器</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            集成主流运动控制卡品牌，配合C#/C++上位机开发，实现复杂运动控制
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {motionCardBrands.map((brand, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-orange-600 transition-all">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-pink-600 to-red-600 text-white rounded-lg mb-3 font-bold text-lg">
                  {brand.name.charAt(0)}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{brand.name}</h3>
                <p className="text-sm text-gray-600">{brand.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">行业应用</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            深耕面板、新能源、医疗等行业，提供定制化运动控制解决方案
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {industries.map((industry, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl border border-gray-200 hover:border-orange-600 hover:shadow-xl transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 text-white rounded-lg font-bold text-xl">
                    {index + 1}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">{industry.name}</h3>
                </div>
                <ul className="space-y-3 mb-4">
                  {industry.applications.map((app, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <span className="text-orange-600 mt-1">•</span>
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500 mb-1">核心技术</p>
                  <p className="text-sm text-gray-700 font-medium">{industry.tech}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">上位机开发技术</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-xl border border-blue-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-lg">
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">C# + WinForm</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>快速开发Windows桌面应用</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>丰富的UI控件库</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>便捷的串口、TCP/IP通信</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>运动控制卡SDK集成</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl border border-purple-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-600 text-white rounded-lg">
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">C++ + Qt</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">✓</span>
                  <span>跨平台支持（Windows/Linux）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">✓</span>
                  <span>高性能实时数据处理</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">✓</span>
                  <span>现代化的UI设计</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">✓</span>
                  <span>底层硬件直接访问</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Clock className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold mb-4">即将推出</h2>
          <p className="text-xl mb-8 text-orange-100">
            AI+运动控制解决方案正在紧张开发中，敬请期待
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@openindu.com"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-600 rounded-lg hover:bg-orange-50 transition-colors font-medium"
            >
              联系我们了解更多
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
