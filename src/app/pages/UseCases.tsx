import { Link } from "react-router";
import { ArrowRight, CheckCircle } from "lucide-react";
import { SEO } from "../components/SEO";

export function UseCases() {
  const useCases = [
    {
      industry: "电池制造",
      problem: "卷绕精度不稳定、焊接强度波动大、良率目标难达成",
      solution: {
        hardware: "RK3588软PLC控制卷绕马达和焊接参数",
        vision: "openindu-vision基于OpenCV检测极片对齐度、焊接焊点",
        data: "openindu-cim + platform采集工艺参数、检测数据、良率指标",
        craftsmanship: "论坛电池工艺专栏分享最佳卷绕速度、焊接温度曲线、测试方案"
      },
      metrics: ["良率提升15-20%", "焊接一致性>98%", "参数调试周期缩短70%"],
      whyWorks: "一套程序跨品牌生成，无需重复开发；视觉+PLC一体化集成；参数改动实时生效"
    },
    {
      industry: "电子面板(PCB)",
      problem: "贴片精度不够、回流焊接温度控制困难、缺陷检测低效",
      solution: {
        hardware: "RK3588控制贴片机、回流炉温度曲线",
        vision: "openindu-vision实时检测贴片位置偏差、焊接缺陷(冷焊/过焊/无焊)",
        data: "openindu-platform汇总不良品数据、追踪失败根因",
        craftsmanship: "论坛面板工艺专栏共享最优温度曲线、贴片参数、不良对策"
      },
      metrics: ["贴片精度±0.1mm", "焊接合格率99.5%", "检测效率提升5倍"],
      whyWorks: "温度曲线参数化管理；缺陷数据自动追踪；参数库快速复用"
    },
    {
      industry: "芯片封装",
      problem: "键合工艺参数复杂、塑封质量难控、可靠性测试耗时",
      solution: {
        hardware: "RK3588实时控制键合机、塑封炉温度和压力",
        vision: "openindu-vision检测键合线、塑封外观、裂纹缺陷",
        data: "openindu-cim边缘计算快速判决失败，platform汇总分析",
        craftsmanship: "论坛芯片工艺专栏分享键合最优参数、应力分析、可靠性指标"
      },
      metrics: ["键合成功率99.8%", "塑封缺陷<0.5%", "设计验证周期快60%"],
      whyWorks: "工艺参数标准化：复用行业最佳实践；边缘计算秒级决策；完整的参数库"
    },
    {
      industry: "汽车部件",
      problem: "冲压精度变异、焊接强度不稳定、质量溯源困难",
      solution: {
        hardware: "RK3588控制冲床、焊接机参数，支持多品牌设备协同",
        vision: "openindu-vision检测冲件尺寸、焊缝质量、装配对位",
        data: "openindu-platform全流程质量数据、缺陷溯源、客户可视化",
        craftsmanship: "论坛汽车工艺专栏分享冲压、焊接、装配的行业标准做法"
      },
      metrics: ["冲压精度±0.2mm", "焊接强度一致性>95%", "质量溯源100%覆盖"],
      whyWorks: "多品牌设备统一管理；完整的数据链路溯源；工艺知识共享加速标准化"
    }
  ];

  const whyEffective = [
    {
      title: "一套代码，跨品牌生成",
      description: "用openindu-studio设计一次，自动生成Siemens/三菱/汇川等多PLC厂商的代码。减少重复开发，降低维护成本。"
    },
    {
      title: "视觉+控制原生一体化",
      description: "openindu-vision直接集成在studio中，无需手工集成多个系统。检测结果实时反馈给PLC闭环控制。"
    },
    {
      title: "参数改动实时生效",
      description: "改变工艺参数无需重新编译、无需下载固件。通过platform直观修改，秒级生效到生产线。"
    },
    {
      title: "全栈数据驱动优化",
      description: "硬件→视觉→参数→工艺的完整数据链路。问题诊断从'现场调试'变为'远程数据分析'。"
    },
    {
      title: "工艺参数众包库",
      description: "论坛工艺库汇聚行业最佳实践。新项目可直接复用验证过的参数，而不是从零开始探索。"
    },
    {
      title: "工程师友好的平台",
      description: "没有商业SaaS的复杂定价。完全开源，企业可在本地部署、完全掌控、自由扩展。"
    }
  ];

  return (
    <div>
      <SEO
        title="Industry Solutions | openIndu Full-Stack Platform"
        description="Battery, PCB, chip packaging, automotive: how openIndu's full stack solves manufacturing challenges with PLC, vision, edge computing, and craftsmanship knowledge."
        canonicalPath="/use-cases"
      />

      {/* Hero */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              工业场景应用
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              电池、PCB、芯片、汽车等行业的完整解决方案：从工艺问题到工程实践
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {useCases.map((useCase, idx) => (
              <div
                key={useCase.industry}
                className="bg-white border-l-4 border-blue-600 rounded-lg p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    {idx + 1}. {useCase.industry}
                  </h2>
                  <p className="text-gray-600">场景化解决方案</p>
                </div>

                {/* Problem */}
                <div className="mb-8">
                  <h3 className="font-semibold text-lg text-gray-900 mb-3">❌ 核心挑战</h3>
                  <p className="text-gray-700 leading-relaxed">{useCase.problem}</p>
                </div>

                {/* Solution */}
                <div className="mb-8">
                  <h3 className="font-semibold text-lg text-gray-900 mb-4">✅ openIndu 全栈解决方案</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                      <p className="font-medium text-gray-900 mb-2">🖥️ 硬件执行层</p>
                      <p className="text-gray-700 text-sm">{useCase.solution.hardware}</p>
                    </div>
                    <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
                      <p className="font-medium text-gray-900 mb-2">👁️ 工业视觉检测</p>
                      <p className="text-gray-700 text-sm">{useCase.solution.vision}</p>
                    </div>
                    <div className="bg-cyan-50 border-l-4 border-cyan-600 p-4 rounded">
                      <p className="font-medium text-gray-900 mb-2">📊 数据采集分析</p>
                      <p className="text-gray-700 text-sm">{useCase.solution.data}</p>
                    </div>
                    <div className="bg-amber-50 border-l-4 border-amber-600 p-4 rounded">
                      <p className="font-medium text-gray-900 mb-2">📚 工艺知识库</p>
                      <p className="text-gray-700 text-sm">{useCase.solution.craftsmanship}</p>
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="mb-8">
                  <h3 className="font-semibold text-lg text-gray-900 mb-3">📊 工程指标</h3>
                  <div className="flex flex-wrap gap-3">
                    {useCase.metrics.map((metric) => (
                      <div key={metric} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-900 rounded-full text-sm font-medium">
                        <CheckCircle className="w-4 h-4" />
                        {metric}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Why It Works */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    <strong>为什么有效：</strong> {useCase.whyWorks}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Effective */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">为什么 openIndu 全栈最有效</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              传统方案的问题是碎片化：视觉系统独立、PLC独立、数据系统独立。openIndu 用四层一体化设计解决这个问题。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyEffective.map((item) => (
              <div key={item.title} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-lg text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">下一步</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-900 text-white font-bold text-lg mb-4">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">了解你的行业</h3>
              <p className="text-gray-600 text-sm">从上面的案例找到最接近的行业场景</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-lg mb-4">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">探索架构</h3>
              <p className="text-gray-600 text-sm">深入了解 openIndu 四层全栈如何解决问题</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-lg mb-4">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">开始开发</h3>
              <p className="text-gray-600 text-sm">下载 Studio，设计你的第一个 PLC 程序</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <Link
              to="/architecture"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium"
            >
              理解全栈架构
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/craftsmanship"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-900 text-blue-900 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              查看工艺知识库
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a
              href="https://github.com/openIndu/openIndu-studio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              开始使用 Studio
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UseCases;
