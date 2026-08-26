import { Link } from "react-router";
import { ArrowRight, CheckCircle, Zap } from "lucide-react";
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
      benefits: ["良率提升15-20%", "焊接一致性>98%", "成本降低12%"],
      roi: "投入10万，年收益50万"
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
      benefits: ["贴片精度±0.1mm", "焊接合格率99.5%", "检测效率提升5倍"],
      roi: "投入15万，年收益80万"
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
      benefits: ["键合成功率99.8%", "塑封缺陷<0.5%", "良率提升8-12%"],
      roi: "投入20万，年收益120万"
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
      benefits: ["冲压精度±0.2mm", "焊接强度一致性>95%", "质量溯源100%覆盖"],
      roi: "投入25万，年收益150万"
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
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              行业应用案例
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              openIndu全链路在不同行业的实际应用：从工艺问题到完整解决方案
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
                className="border-l-4 border-blue-600 p-6 sm:p-8 bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg"
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  {idx + 1}. {useCase.industry}
                </h2>

                {/* Problem */}
                <div className="mb-8">
                  <h3 className="font-semibold text-lg text-gray-900 mb-3">❌ 核心问题</h3>
                  <p className="text-gray-700 leading-relaxed">{useCase.problem}</p>
                </div>

                {/* Solution */}
                <div className="mb-8">
                  <h3 className="font-semibold text-lg text-gray-900 mb-4">✅ openIndu全栈解决方案</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded border-l-4 border-purple-500">
                      <p className="font-medium text-gray-900 mb-2">🖥️ 硬件执行层</p>
                      <p className="text-gray-700 text-sm">{useCase.solution.hardware}</p>
                    </div>
                    <div className="bg-white p-4 rounded border-l-4 border-green-500">
                      <p className="font-medium text-gray-900 mb-2">👁️ 工业视觉检测</p>
                      <p className="text-gray-700 text-sm">{useCase.solution.vision}</p>
                    </div>
                    <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                      <p className="font-medium text-gray-900 mb-2">📊 数据采集分析</p>
                      <p className="text-gray-700 text-sm">{useCase.solution.data}</p>
                    </div>
                    <div className="bg-white p-4 rounded border-l-4 border-orange-500">
                      <p className="font-medium text-gray-900 mb-2">📚 工艺知识库</p>
                      <p className="text-gray-700 text-sm">{useCase.solution.craftsmanship}</p>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="mb-8">
                  <h3 className="font-semibold text-lg text-gray-900 mb-3">📈 预期收益</h3>
                  <div className="flex flex-wrap gap-3">
                    {useCase.benefits.map((benefit) => (
                      <div key={benefit} className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium">
                        <CheckCircle className="w-4 h-4" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>

                {/* ROI */}
                <div className="bg-white p-4 rounded border-2 border-blue-300">
                  <div className="flex items-start gap-3">
                    <Zap className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">💰 ROI估算</p>
                      <p className="text-blue-600 font-bold text-lg mt-1">{useCase.roi}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Works */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">为什么openIndu全栈最有效</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-lg text-gray-900 mb-3">🔗 端到端连接</h3>
              <p className="text-gray-700">
                传统方案：视觉系统单独、PLC单独、数据系统单独 → 信息孤岛
              </p>
              <p className="text-blue-600 font-medium mt-3">
                openIndu：一个栈连接从硬件到工艺的所有环节 → 数据驱动优化
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-lg text-gray-900 mb-3">⚡ 工程效率</h3>
              <p className="text-gray-700">
                传统方案：每个PLC品牌一套代码 → 重复工作、风险高
              </p>
              <p className="text-blue-600 font-medium mt-3">
                openIndu：设计一次、跨品牌生成 → 成本低50%、实施快3倍
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-lg text-gray-900 mb-3">🎓 工艺赋能</h3>
              <p className="text-gray-700">
                传统方案：工艺知识各企业各自积累 → 重复探索、低效
              </p>
              <p className="text-blue-600 font-medium mt-3">
                openIndu：论坛工艺库众包共享 → 行业共同进步、加速创新
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-lg text-gray-900 mb-3">📊 数据驱动</h3>
              <p className="text-gray-700">
                传统方案：数据散落在各个系统 → 难以追踪、难以优化
              </p>
              <p className="text-blue-600 font-medium mt-3">
                openIndu：全流程数据汇聚 → 快速发现问题、持续改进
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">下一步</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-bold text-lg mb-4">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">了解你的行业</h3>
              <p className="text-gray-600 text-sm">从上面的案例找到最接近的行业场景</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-bold text-lg mb-4">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">探索架构</h3>
              <p className="text-gray-600 text-sm">深入了解openIndu四层全栈如何解决问题</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-bold text-lg mb-4">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">开始开发</h3>
              <p className="text-gray-600 text-sm">下载Studio，设计你的第一个PLC程序</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link
              to="/architecture"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              理解全栈架构
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a
              href="https://github.com/openIndu/openIndu-studio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              开始使用Studio
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UseCases;
