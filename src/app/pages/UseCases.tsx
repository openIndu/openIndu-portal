import { Link } from "react-router";
import { ArrowRight, CheckCircle } from "lucide-react";
import { SEO } from "../components/SEO";

export function UseCases() {
  // Industries and stage names follow the community research baseline
  // (panel / semiconductor / new energy). The former "工程指标" figures
  // ("良率提升 15-20%", "键合成功率 99.8%" …) were not sourced from anything
  // and the research material is explicitly marked "公开资料整理；非量产配方",
  // so each case now states which stage of the chain openIndu touches
  // instead of quoting invented numbers.
  const useCases = [
    {
      industry: "面板显示",
      problem: "基板身份与载具绑定易断链、对位曝光与彩膜图形缺陷靠人工复判、Cell/Module 段异常难以逆推到具体工序",
      solution: {
        hardware: "国产工控芯片软 PLC 驱动上片搬送、清洗与贴合节拍，机械手防碰撞互锁",
        vision: "openIndu-vision 基于 OpenCV 做表面颗粒/划伤、图形断裂与针孔、点灯外观判定",
        data: "openIndu-cim + platform 绑定 Glass ID、载具 ID 与工艺路线，留存清洗与曝光程序版本",
        craftsmanship: "论坛面板专栏沉淀 TFT-LCD / OLED 主链的现场做法与缺陷逆推经验"
      },
      stages: ["基板来料与清洗", "Array TFT 阵列", "CF 彩膜", "Cell 贴合", "Module 与检测"],
      whyWorks: "一次设计跨品牌生成 PLC 程序；视觉判定直接回灌 PLC 闭环；工序身份贯穿全链路可追溯"
    },
    {
      industry: "半导体",
      problem: "wafer 身份与 route 准入判定分散在各设备、recipe 版本与 SPC 规则难统一、缺陷地图无法有效驱动后段分选",
      solution: {
        hardware: "国产工控芯片承担搬送与设备联动，按前置条件与 SPC 规则做准入互锁",
        vision: "openIndu-vision 参与外观与缺陷复判，输出坐标与层次信息",
        data: "openIndu-cim 在边缘完成快速判定，platform 汇总 wafer ID / FOUP / recipe 版本与量测值",
        craftsmanship: "论坛半导体专栏沉淀晶圆到封装主链的接口口径与追溯字段"
      },
      stages: ["晶圆与材料来料", "Fab 薄膜与图形化", "晶圆测试 CP", "后道封装组装", "成品测试与出货"],
      whyWorks: "放行/返工/报废处置有统一数据依据；边缘侧判定不依赖云端往返；量测与缺陷可回溯到具体腔体与批次"
    },
    {
      industry: "新能源",
      problem: "材料批次身份先于混合难保证、电芯身份与化成分容曲线容易脱钩、模组 PACK 段的 EOL 数据不完整",
      solution: {
        hardware: "国产工控芯片控制涂布、装配与化成柜节拍，多品牌设备协同",
        vision: "openIndu-vision 检测极片对齐、焊点与组件外观（含光伏 EL 图像）",
        data: "openIndu-cim + platform 绑定材料批次—电芯身份—测试曲线，贯通到 PACK 与 EOL",
        craftsmanship: "论坛新能源专栏沉淀锂电与光伏组件主链的工艺参数与异常处置"
      },
      stages: ["来料与制浆", "极片制造", "电芯装配", "化成老化分容", "模组 PACK / 组件封装"],
      whyWorks: "材料到成品的身份链不断裂；曲线数据与电芯一一对应；同一套栈覆盖锂电与光伏两条链路"
    }
  ];

  const whyEffective = [
    {
      title: "一套代码，跨品牌生成",
      description: "用openIndu-studio设计一次，自动生成Siemens/三菱/汇川等多PLC厂商的代码。减少重复开发，降低维护成本。"
    },
    {
      title: "视觉+控制原生一体化",
      description: "openIndu-vision直接集成在studio中，无需手工集成多个系统。检测结果实时反馈给PLC闭环控制。"
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
        description="Display panels, semiconductors and new energy: where openIndu's full stack plugs into each end-to-end process chain — PLC control, machine vision, edge computing and craftsmanship knowledge."
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
              面板、芯片、新能源三条工艺主链：openIndu 全栈在每个环节接入哪里
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
                className="bg-white border-l-4 border-sky-700 rounded-lg p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow"
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
                    <div className="bg-sky-50 border-l-4 border-sky-700 p-4 rounded">
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
                  <h3 className="font-semibold text-lg text-gray-900 mb-3">🔗 端到端主链</h3>
                  <div className="flex flex-wrap gap-3">
                    {useCase.stages.map((metric) => (
                      <div key={metric} className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 text-[#0B72B5] rounded-full text-sm font-medium">
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
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#0B72B5] text-white font-bold text-lg mb-4">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">了解你的行业</h3>
              <p className="text-gray-600 text-sm">从上面的案例找到最接近的行业场景</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sky-700 text-white font-bold text-lg mb-4">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">探索架构</h3>
              <p className="text-gray-600 text-sm">深入了解 openIndu 四层全栈如何解决问题</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sky-700 text-white font-bold text-lg mb-4">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">开始开发</h3>
              <p className="text-gray-600 text-sm">下载 Studio，设计你的第一个 PLC 程序</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <Link
              to="/architecture"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#0B72B5] text-white rounded-lg hover:bg-[#085A90] transition-colors font-medium"
            >
              理解全栈架构
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/craftsmanship"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-900 text-[#0B72B5] rounded-lg hover:bg-sky-50 transition-colors font-medium"
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
