import { Eye, Camera, Scan, Target, Clock } from "lucide-react";

export function Vision() {
  const features = [
    {
      icon: Camera,
      title: "缺陷检测",
      description: "深度学习算法自动识别产品表面缺陷，准确率达99%以上",
    },
    {
      icon: Scan,
      title: "尺寸测量",
      description: "亚像素级精度测量，实现微米级尺寸检测",
    },
    {
      icon: Target,
      title: "目标识别",
      description: "实时识别和定位工件，支持复杂场景下的多目标检测",
    },
  ];

  return (
    <div className="py-12">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-green-600 text-white rounded-lg">
              <Eye className="w-7 h-7" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">AI+视觉</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mb-6">
            基于深度学习的工业视觉检测系统，实现产品质量自动化检测。
            融合计算机视觉和AI技术，为智能制造提供"智能之眼"。
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg">
              <Clock className="w-5 h-5" />
              <span className="font-medium">敬请期待</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">核心能力</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 border border-gray-200 rounded-xl hover:border-green-600 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-lg mb-4">
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
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">应用场景</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-teal-600 text-white rounded-lg flex items-center justify-center mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">表面缺陷检测</h3>
              <p className="text-gray-600 mb-4">
                检测产品表面的划痕、凹坑、污渍等缺陷，替代人工质检，提高效率和准确性。
              </p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">应用行业</p>
                <p className="text-sm text-gray-700 font-medium">3C电子、汽车零部件、纺织品</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-teal-600 text-white rounded-lg flex items-center justify-center mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">尺寸精密测量</h3>
              <p className="text-gray-600 mb-4">
                非接触式高精度尺寸测量，实时监控产品尺寸是否符合规格要求。
              </p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">应用行业</p>
                <p className="text-sm text-gray-700 font-medium">精密制造、PCB、半导体</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-teal-600 text-white rounded-lg flex items-center justify-center mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">字符识别（OCR）</h3>
              <p className="text-gray-600 mb-4">
                识别产品上的序列号、生产日期、二维码等信息，实现产品追溯。
              </p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">应用行业</p>
                <p className="text-sm text-gray-700 font-medium">包装、物流、食品饮料</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-teal-600 text-white rounded-lg flex items-center justify-center mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">装配验证</h3>
              <p className="text-gray-600 mb-4">
                检测零部件是否正确装配，是否缺件、错装，确保装配质量。
              </p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">应用行业</p>
                <p className="text-sm text-gray-700 font-medium">汽车制造、家电组装</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-teal-600 text-white rounded-lg flex items-center justify-center mb-4 text-xl font-bold">
                5
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">颜色分类</h3>
              <p className="text-gray-600 mb-4">
                精确识别和分类产品颜色，确保产品外观一致性。
              </p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">应用行业</p>
                <p className="text-sm text-gray-700 font-medium">服装、印刷、化妆品</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-teal-600 text-white rounded-lg flex items-center justify-center mb-4 text-xl font-bold">
                6
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">机器人视觉引导</h3>
              <p className="text-gray-600 mb-4">
                为机器人提供视觉定位能力，引导机器人精确抓取和放置工件。
              </p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">应用行业</p>
                <p className="text-sm text-gray-700 font-medium">智能仓储、自动化产线</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">技术体系</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-xl border border-green-200">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-lg flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">图像采集</h4>
                    <p className="text-sm text-gray-600">
                      工业相机、光源系统、镜头组件构成高质量图像采集系统
                    </p>
                  </div>
                </div>
                <div className="border-l-2 border-green-300 ml-6 pl-6">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-teal-600 text-white rounded-lg flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">图像预处理</h4>
                      <p className="text-sm text-gray-600">
                        降噪、增强、校正等预处理算法提升图像质量
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border-l-2 border-green-300 ml-6 pl-6">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-cyan-600 text-white rounded-lg flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">AI检测算法</h4>
                      <p className="text-sm text-gray-600">
                        CNN、YOLO、Transformer等深度学习模型实现智能检测
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border-l-2 border-green-300 ml-6 pl-6">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-500 text-white rounded-lg flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">结果输出</h4>
                      <p className="text-sm text-gray-600">
                        检测结果可视化、数据统计分析、与MES/ERP系统集成
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">技术优势</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                ✓
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">高准确率</h4>
                <p className="text-gray-600 text-sm">
                  深度学习模型经过大量数据训练，检测准确率达99%以上，远超人工质检
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                ✓
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">高速检测</h4>
                <p className="text-gray-600 text-sm">
                  毫秒级检测速度，满足高速产线需求，不影响生产节拍
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                ✓
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">持续学习</h4>
                <p className="text-gray-600 text-sm">
                  支持在线学习和模型更新，随着数据积累不断提升检测性能
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                ✓
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">易于部署</h4>
                <p className="text-gray-600 text-sm">
                  模块化设计，支持边缘计算，可快速部署到生产现场
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Clock className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold mb-4">即将推出</h2>
          <p className="text-xl mb-8 text-green-100">
            AI+视觉解决方案正在紧张开发中，敬请期待
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@openindu.com"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium"
            >
              联系我们了解更多
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
