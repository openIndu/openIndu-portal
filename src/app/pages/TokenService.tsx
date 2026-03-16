import { Server, Zap, Shield, TrendingUp, Code, CheckCircle, Cpu } from "lucide-react";

export function TokenService() {
  const features = [
    {
      icon: Zap,
      title: "统一接入",
      description: "提供统一的API接口，支持多种大模型服务的无缝切换",
      items: ["支持 OpenAI", "支持 Claude", "支持国内大模型", "统一接口标准"],
    },
    {
      icon: Shield,
      title: "安全可靠",
      description: "企业级安全保障，API密钥加密存储，访问权限细粒度控制",
      items: ["API密钥加密存储", "访问控制", "审计日志", "流量监控"],
    },
    {
      icon: TrendingUp,
      title: "成本优化",
      description: "智能路由和负载均衡，优化API调用成本，提高资源利用率",
      items: ["流量配额管理", "费用统计分析", "使用预警", "智能路由"],
    },
    {
      icon: Code,
      title: "简单易用",
      description: "兼容OpenAI API格式，零学习成本，快速集成到现有系统",
      items: ["RESTful API", "详细文档", "示例代码", "SDK支持"],
    },
  ];

  const useCases = [
    { name: "AI+运动控制", description: "为运动控制算法提供大模型推理能力，优化运动轨迹规划", example: "实时路径规划、参数自适应调整" },
    { name: "AI+视觉检测", description: "支持视觉模型的推理服务，实现智能缺陷检测和分类", example: "产品质量检测、异常识别" },
    { name: "AI+数据分析", description: "为工业互联网平台提供智能数据分析和预测服务", example: "设备故障预测、生产优化建议" },
  ];

  return (
    <div className="py-12">
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-600 text-white rounded-lg">
              <Server className="w-7 h-7" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">AI+基础设施</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mb-8">
            大模型API中转服务，为智能制造场景提供统一的AI能力接入平台。
            支持多种大模型服务，提供安全、稳定、高效的API转发和管理能力。
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div>
              <span className="font-semibold text-gray-900">版本:</span> 0.0.1-SNAPSHOT
            </div>
            <div>
              <span className="font-semibold text-gray-900">状态:</span> 已上线
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">核心特性</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              提供完整的大模型API中转服务功能
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-xl mb-6">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">应用场景</h2>
            <p className="text-lg text-gray-600">为各种AI应用提供基础设施支持</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm p-8 hover:shadow-xl transition-all">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-xl mx-auto mb-6">
                  <Cpu className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3 text-center">{useCase.name}</h3>
                <p className="text-gray-600 text-center mb-4">{useCase.description}</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-2">应用示例</p>
                  <p className="text-sm text-gray-700 font-medium">{useCase.example}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Architecture */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">服务架构</h2>
            <p className="text-lg text-gray-600">分层设计，易于扩展和维护</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl border border-purple-200">
              <div className="space-y-4">
                {[
                  { title: "应用层", subtitle: "业务应用和客户端", description: "接收客户端请求，进行身份验证、权限校验和流量控制" },
                  { title: "API 网关层", subtitle: "请求路由和鉴权", description: "智能路由和负载均衡，将请求转发到对应的大模型服务" },
                  { title: "转发服务层", subtitle: "核心业务逻辑", description: "请求处理、响应转换、错误处理" },
                  { title: "大模型服务层", subtitle: "大模型API对接", description: "对接多种大模型API（OpenAI、Claude、国产大模型等）" },
                  { title: "监控与日志", subtitle: "安全与审计", description: "实时监控API调用状态，记录详细的访问日志和使用统计" },
                ].map((layer, index) => (
                  <div key={index} className="border-l-2 border-purple-300 ml-6 pl-6">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-lg flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{layer.title}</h4>
                        <p className="text-sm text-gray-600">{layer.subtitle}</p>
                        <p className="text-sm text-gray-700">{layer.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Example */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">快速集成</h2>
            <p className="text-lg text-gray-600">简单的API调用，快速接入</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900 rounded-2xl p-8 overflow-x-auto">
              <pre className="text-green-400 text-sm">
{`# 使用示例 - Python
import openai

# 配置API端点和密钥
openai.api_base = "https://api.openindu.com/v1"
openai.api_key = "your-api-key"

# 调用大模型API
response = openai.ChatCompletion.create(
  model="gpt-4",
  messages=[
    { "role": "user", "content": "分析这批产品的质量数据" }
  ],
  config
)
print(response.choices[0].message.content)`}
              </pre>
            </div>
            <div className="bg-purple-50 p-8 rounded-2xl border border-purple-200">
              <h4 className="font-semibold text-gray-900 mb-2">💡 兼容性说明</h4>
              <p className="text-sm text-gray-700">
                API完全兼容OpenAI格式，无需修改现有代码，只需更改api_base和api_key即可使用。
                支持流式响应、函数调用等高级功能。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-12 text-center">
            <Server className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-4xl font-bold mb-4 text-white">开始使用</h2>
            <p className="text-xl mb-8 text-purple-100">
              获取API密钥，立即开始使用大模型API中转服务
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="http://localhost:8000/swagger-ui/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium text-lg"
              >
                查看API文档
                <Code className="ml-2 h-5 w-5" />
              </a>
              <a
                href="https://github.com/openindu/openindu-portal"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-medium text-lg"
              >
                查看源码
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
