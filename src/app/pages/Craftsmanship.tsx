import { ArrowRight, BookOpen, Users, Lightbulb } from "lucide-react";
import { SEO } from "../components/SEO";

export function Craftsmanship() {
  // Industries and process-chain wording follow the community research
  // baseline (panel / semiconductor / new energy). Stage names below are
  // public industry vocabulary; the detailed internal guides are not linked
  // because docs/ in the community repo is marked "内部资产，不对外发布".
  const industries = [
    {
      icon: BookOpen,
      name: "面板显示工艺",
      description: "TFT-LCD 与 OLED：基板 → Array → CF → Cell → Module",
      topics: ["基板清洗", "对位曝光", "彩膜 BM/RGB", "Cell 贴合", "点灯与外观检测"],
      href: "https://forum.openindu.com/t/topic/53"
    },
    {
      icon: Users,
      name: "半导体工艺",
      description: "晶圆制造 → 晶圆测试 → 封装组装 → 成品测试与追溯",
      topics: ["薄膜与图形化", "量测与 SPC", "缺陷地图", "键合与塑封", "可靠性与出货"],
      href: "https://forum.openindu.com/t/topic/56"
    },
    {
      icon: Lightbulb,
      name: "新能源工艺",
      description: "锂电极片 → 电芯装配 → 化成分容 → 模组/PACK；光伏电池片 → 组件",
      topics: ["制浆与涂布", "电芯装配", "化成老化分容", "模组 PACK", "EL/IV 检测"],
      href: "https://forum.openindu.com/t/topic/57"
    }
  ];

  const benefits = [
    {
      title: "真实案例分享",
      description: "来自一线的工艺工程师分享实际生产中遇到的问题和解决方案",
      icon: "📋"
    },
    {
      title: "参数库共享",
      description: "工艺参数、温度曲线、时间设定等关键参数的众包库",
      icon: "📊"
    },
    {
      title: "最佳实践",
      description: "跨企业、跨行业学习——电池企业的经验帮助面板企业优化",
      icon: "🎯"
    },
    {
      title: "问题解决",
      description: "遇到良率下降？论坛工艺讨论快速定位根本原因",
      icon: "🔧"
    },
    {
      title: "成本优化",
      description: "分享降低成本、提升效率的工艺创新",
      icon: "💰"
    },
    {
      title: "行业认可",
      description: "工艺实践获得同行认可，建立行业影响力",
      icon: "⭐"
    }
  ];

  const discussions = [
    {
      title: "面板工艺流程｜TFT-LCD：从玻璃基板到显示模组",
      industry: "面板显示",
      href: "https://forum.openindu.com/t/topic/53"
    },
    {
      title: "面板工艺流程｜OLED：从背板到封装、切割与显示模组",
      industry: "面板显示",
      href: "https://forum.openindu.com/t/topic/55"
    },
    {
      title: "半导体工艺流程｜从硅晶圆到封装测试成品",
      industry: "半导体",
      href: "https://forum.openindu.com/t/topic/56"
    },
    {
      title: "电池工艺流程｜锂离子电芯到模组与 PACK",
      industry: "新能源",
      href: "https://forum.openindu.com/t/topic/57"
    }
  ];

  return (
    <div>
      <SEO
        title="Craftsmanship Knowledge | openIndu Community Forum"
        description="Industrial craftsmanship knowledge base covering display panels, semiconductors and new energy: end-to-end process chains, shop-floor practice and defect reasoning, shared on the openIndu forum."
        canonicalPath="/craftsmanship"
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-amber-50 via-white to-orange-50 py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              工艺知识库
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              众包工业工艺：面板、芯片、新能源等行业的工艺主链、现场做法与参数共享
            </p>
            <p className="text-gray-500 mb-8">
              一线工程师分享真实经验 → 行业共同进步 → 良率提升、成本优化
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">行业工艺专栏</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industries.map((industry) => (
              <a
                key={industry.name}
                href={industry.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border-2 border-gray-200 p-6 sm:p-8 hover:border-orange-400 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <industry.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">{industry.name}</h3>
                </div>
                <p className="text-gray-600 mb-4">{industry.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {industry.topics.slice(0, 3).map((topic) => (
                    <span key={topic} className="inline-block px-3 py-1 bg-orange-50 text-orange-700 text-sm rounded-full">
                      {topic}
                    </span>
                  ))}
                  {industry.topics.length > 3 && (
                    <span className="inline-block px-3 py-1 bg-orange-50 text-orange-700 text-sm rounded-full">
                      +{industry.topics.length - 3}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-orange-600 font-medium group-hover:translate-x-1 transition-transform">
                  进入论坛 <ArrowRight className="w-4 h-4" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits of Participation */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">参与工艺知识库的价值</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Discussions */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">热议话题</h2>
          <div className="space-y-4">
            {discussions.map((discussion) => (
              <a
                key={discussion.title}
                href={discussion.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <h3 className="font-semibold text-gray-900">{discussion.title}</h3>
                  <span className="shrink-0 inline-flex items-center rounded-full bg-orange-50 px-3 py-1 text-sm text-orange-700">
                    {discussion.industry}
                  </span>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href="https://forum.openindu.com/c/process/7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-orange-700 text-white rounded-lg hover:bg-orange-800 transition-colors font-medium"
            >
              进入完整工艺知识库
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">如何贡献工艺知识</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { num: "1", title: "分享经验", desc: "写下你在生产中的真实案例和解决方案" },
              { num: "2", title: "讨论验证", desc: "与其他工程师讨论、优化方案的可行性" },
              { num: "3", title: "形成标准", desc: "最佳实践逐步形成行业标准" },
              { num: "4", title: "获得认可", desc: "贡献者获得社区认可和职业影响力" }
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-600 text-white font-bold text-xl mb-4">
                  {step.num}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-orange-700 to-amber-700 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">加入工艺知识库社区</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            分享你的工艺实践，学习行业最佳方案，与全球工程师一起推动工业进步
          </p>
          <a
            href="https://forum.openindu.com/c/process/7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-700 rounded-lg hover:bg-orange-50 transition-colors font-medium"
          >
            进入论坛
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>
    </div>
  );
}

export default Craftsmanship;
