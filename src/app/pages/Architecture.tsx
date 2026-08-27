import { Link } from "react-router";
import { ArrowRight, Layers, Cpu, Code, TrendingUp } from "lucide-react";
import { SEO } from "../components/SEO";

export function Architecture() {
  const layers = [
    {
      icon: TrendingUp,
      title: "工艺知识层",
      titleEn: "Craftsmanship Layer",
      description: "论坛工艺专栏：面板、芯片、新能源等行业的工艺主链、现场做法与缺陷逆推",
      benefits: ["行业最佳实践", "众包知识库", "工艺参数共享"],
      color: "from-orange-50 to-amber-50",
      border: "border-orange-200"
    },
    {
      icon: Layers,
      title: "应用层",
      titleEn: "Application Layer",
      description: "三个方向协同：工业视觉检测、数据采集边缘计算、IIoT平台分析",
      benefits: ["工业视觉定位检测", "边缘实时决策", "数据驱动洞察"],
      color: "from-blue-50 to-cyan-50",
      border: "border-sky-200"
    },
    {
      icon: Code,
      title: "编程与组态层",
      titleEn: "Programming & Configuration",
      description: "openindu-studio：PLC编程、HMI组态、PLC选型、BOM清单、电路图绘制、跨品牌代码生成",
      benefits: ["多品牌支持", "工程自动化", "成本降低"],
      color: "from-green-50 to-emerald-50",
      border: "border-green-200"
    },
    {
      icon: Cpu,
      title: "硬件与OS层",
      titleEn: "Hardware & OS Layer",
      description: "国产工控芯片 + openEuler国产操作系统：实时控制、工业协议、边缘本地决策",
      benefits: ["国产可控", "成本优势", "实时可靠"],
      color: "from-purple-50 to-pink-50",
      border: "border-purple-200"
    }
  ];

  const comparisons = [
    {
      aspect: "硬件成本",
      traditional: "昂贵的工业PC + 专有系统",
      openindu: "国产工控芯片 + 开源openEuler"
    },
    {
      aspect: "编程周期",
      traditional: "每个品牌专属编程 → 代码重写",
      openindu: "设计一次 → 跨品牌代码自动生成"
    },
    {
      aspect: "应用集成",
      traditional: "视觉/IIoT 各自为政 → 数据孤岛",
      openindu: "三层应用协同 → 数据驱动闭环"
    },
    {
      aspect: "工艺知识",
      traditional: "各企业各自探索",
      openindu: "论坛众包工艺库 → 行业共同进步"
    },
    {
      aspect: "厂商锁定",
      traditional: "依赖专有平台 → 升级昂贵",
      openindu: "Apache 2.0开源 → 完全自主"
    }
  ];

  return (
    <div>
      <SEO
        title="Architecture | openIndu Full-Stack Platform"
        description="Understand openIndu's complete industrial automation stack: from domestic industrial SoCs to craftsmanship knowledge. End-to-end solution for manufacturing."
        canonicalPath="/architecture"
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-b from-sky-50 via-white to-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-pattern"></div>
        </div>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-gray-900 [word-break:keep-all]">
              openIndu 全链路架构
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              从工控芯片到工艺知识，打通工业制造全流程
            </p>
            <p className="text-gray-500 mb-8">
              国产工控芯片 + openEuler + openindu-studio + 三层应用 + 工艺知识 = 完整工业自动化操作系统
            </p>
          </div>
        </div>
      </section>

      {/* Four Layers */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 sm:space-y-8">
            {layers.map((layer) => (
              <div key={layer.title} className={`border-l-4 ${layer.border} rounded-lg p-6 sm:p-8 bg-gradient-to-br ${layer.color}`}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-white/80 flex items-center justify-center flex-shrink-0">
                    <layer.icon className="w-6 h-6 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                      {layer.title}
                      <span className="text-sm text-gray-600 ml-2">({layer.titleEn})</span>
                    </h3>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">{layer.description}</p>
                <div className="flex flex-wrap gap-2">
                  {layer.benefits.map((benefit) => (
                    <span key={benefit} className="inline-block px-3 py-1 bg-white/70 text-gray-900 text-sm rounded-full font-medium">
                      ✓ {benefit}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Layer Interaction */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">层级如何协同工作</h2>
          <div className="space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">📐 工程流程</h3>
              <div className="text-gray-700 space-y-2">
                <p>1️⃣ <strong>设计阶段</strong>：在openindu-studio中一次性设计PLC逻辑、HMI界面、选择PLC型号</p>
                <p>2️⃣ <strong>生成阶段</strong>：自动生成Siemens S7、三菱、欧姆龙等跨品牌代码 + BOM清单 + 电路图</p>
                <p>3️⃣ <strong>部署阶段</strong>：代码部署到国产芯片软PLC或目标硬件PLC</p>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">👁️ 应用协同</h3>
              <div className="text-gray-700 space-y-2">
                <p><strong>左翼 - openIndu-vision</strong>（工业视觉）：基于OpenCV的检测定位，反馈给PLC</p>
                <p><strong>核心 - openindu-studio</strong>（编程控制）：PLC逻辑执行，接收视觉信息，驱动执行机构</p>
                <p><strong>右翼 - openindu-cim + platform</strong>（数据采集）：采集所有数据上报到IIoT平台进行分析</p>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">📊 数据闭环</h3>
              <div className="text-gray-700 space-y-2">
                <p>实时数据 → Platform分析 → 发现工艺瓶颈 → 论坛工艺专栏分享解决方案 → 优化生产参数 → 良率提升</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison vs Traditional */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">与传统方案对标</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 min-w-[150px]">维度</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 min-w-[250px]">传统方案</th>
                  <th className="px-4 py-3 text-left font-semibold text-sky-800 min-w-[250px]">openIndu全栈</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, idx) => (
                  <tr key={row.aspect} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-4 font-semibold text-gray-900 border-b border-gray-200">{row.aspect}</td>
                    <td className="px-4 py-4 text-gray-600 border-b border-gray-200">{row.traditional}</td>
                    <td className="px-4 py-4 text-sky-700 border-b border-gray-200 font-medium">{row.openindu}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-700 to-cyan-700 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">准备好探索全链路了吗？</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/use-cases"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-sky-700 rounded-lg hover:bg-sky-50 transition-colors font-medium"
            >
              查看行业场景方案
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a
              href="https://github.com/openIndu/openIndu-studio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-medium"
            >
              查看openindu-studio
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Architecture;
