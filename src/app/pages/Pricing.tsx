import { Link } from "react-router";
import { ArrowRight, CheckCircle, Github, Cloud, Server } from "lucide-react";
import { SEO } from "../components/SEO";

export function Pricing() {
  return (
    <div>
      <SEO
        title="Deployment Options | openIndu Full-Stack Platform"
        description="Deploy openIndu on-premises, edge, or cloud. Flexible licensing for development, production, and enterprise. Self-hosted and managed options available."
        canonicalPath="/pricing"
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 to-blue-900 text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-pattern"></div>
        </div>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              部署与许可方案
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              灵活的部署选项，满足从开发到企业生产的所有需求
            </p>
          </div>
        </div>
      </section>

      {/* Deployment Options */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* On-Premises */}
            <div className="border-2 border-gray-200 rounded-xl p-8 hover:border-blue-500 transition-all">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <Server className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">自建部署</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                完全自主控制，适合对数据安全有严格要求的制造企业
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">本地部署，数据完全自主</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">openEuler + RK3588基础</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">支持多品牌PLC</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Apache-2.0 开源</span>
                </li>
              </ul>
              <p className="text-sm font-semibold text-gray-900 mb-4">起价：免费（开源）+ 部署咨询</p>
              <a href="mailto:info@openindu.com" className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-[#1a3a6d] text-center transition-colors">
                咨询部署
              </a>
            </div>

            {/* Edge Computing */}
            <div className="border-2 border-blue-500 rounded-xl p-8 relative">
              <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                推荐
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <Cloud className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">边缘端侧</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                RK3588 + openEuler 软PLC 一体化方案，开箱即用
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">RK3588国产芯片预装</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">openindu-cim + 工业协议</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">实时决策、本地告警</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">云边协同支持</span>
                </li>
              </ul>
              <p className="text-sm font-semibold text-gray-900 mb-4">价格：8-15万元（设备 + 软件）</p>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-[#1a3a6d] text-center transition-colors">
                获取报价
              </button>
            </div>

            {/* SaaS Platform */}
            <div className="border-2 border-gray-200 rounded-xl p-8 hover:border-blue-500 transition-all">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <Github className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">云平台服务</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                托管版 openIndu-platform，专注业务不关心基础设施
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">全托管 IIoT 平台</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">实时数据分析仪表板</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">工业视觉集成</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">99.9% SLA 保障</span>
                </li>
              </ul>
              <p className="text-sm font-semibold text-gray-900 mb-4">起价：按使用量计费</p>
              <a href="mailto:info@openindu.com" className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-[#1a3a6d] text-center transition-colors">
                了解详情
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* License & Support */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">许可与支持</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Open Source */}
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">开源版本</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Apache-2.0 许可证</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>GitHub / Gitee 完全开源</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>社区支持</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>适合：研发、创业、学习</span>
                </li>
              </ul>
            </div>

            {/* Enterprise */}
            <div className="bg-white rounded-lg p-8 border-2 border-blue-500">
              <h3 className="text-lg font-bold text-gray-900 mb-4">企业版本</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>自定义许可模式</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>专业技术支持（电话/邮件）</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>部署与集成咨询</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>适合：生产制造、关键应用</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">准备好开始了吗？</h2>
          <p className="text-lg text-blue-100 mb-8">
            无论选择哪种部署方式，openIndu 都能帮助你快速实现工业自动化升级
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@openindu.com"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              联系销售
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <Link
              to="/use-cases"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-medium"
            >
              查看行业案例
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Pricing;
