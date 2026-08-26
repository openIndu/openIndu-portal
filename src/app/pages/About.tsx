import { Link } from "react-router";
import { ArrowRight, CheckCircle, Users, Zap, Globe, Code } from "lucide-react";
import { SEO } from "../components/SEO";

export function About() {

  const domainProducts = [
    {
      icon: Code,
      domain: "工控 (PLC Hardware/Software)",
      description: "PLC硬件、软件、EtherCAT总线、通信协议",
      product: "基础设施"
    },
    {
      icon: Zap,
      domain: "自动化 (Automation Programming)",
      description: "PLC编程、HMI编程、工业视觉、运动控制",
      product: "openIndu-studio + openindu-station"
    },
    {
      icon: Globe,
      domain: "工艺 (Process Optimization)",
      description: "流程优化、参数调优、良率分析、知识库",
      product: "openIndu-platform (IIoT)"
    }
  ];

  return (
    <div>
      <SEO
        title="About openIndu | openIndu Community"
        description="Understand openIndu's mission, three core domains (工控/自动化/工艺), and how our products solve industrial automation challenges end-to-end."
        canonicalPath="/about"
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              About openIndu
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              The end-to-end open-source OS for industrial automation — solving fragmentation across工控, 自动化, and工艺 domains
            </p>
          </div>
        </div>
      </section>

      {/* Problem & Mission */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Problem</h2>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                Industrial automation today is fragmented. Engineers work in silos across three domains:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700"><strong>工控:</strong> Struggling with multi-brand PLC compatibility</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700"><strong>自动化:</strong> Recoding for each platform, no cross-brand generation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700"><strong>工艺:</strong> No data-driven insight into process performance</span>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Solution</h2>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                openIndu bridges all three domains with one stack:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Process knowledge → Code generation → Cross-brand execution</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">End-to-end traceability from electrical design to production data</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Apache-2.0 open source, no vendor lock-in</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Domain to Product Mapping */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Three Domains, Three Products</h2>
            <p className="text-gray-600">How openIndu addresses each area of industrial automation</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {domainProducts.map((item) => (
              <div key={item.domain} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{item.domain}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                <div className="bg-blue-50 p-3 rounded border border-blue-200">
                  <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Product</p>
                  <p className="text-sm font-medium text-blue-900 mt-1">{item.product}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Code className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Open Source</h3>
              <p className="text-gray-600">All code under Apache-2.0. No vendor lock-in. Full transparency.</p>
            </div>
            <div className="text-center">
              <Globe className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">End-to-End</h3>
              <p className="text-gray-600">From process parameters to production insight. One stack, complete value chain.</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Community-Driven</h3>
              <p className="text-gray-600">Contributions don't require code. Data, insights, and ideas all count.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-blue-600 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/motion-control/studio"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              Explore openIndu-studio
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <a
              href="https://github.com/openIndu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-medium"
            >
              View on GitHub
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
