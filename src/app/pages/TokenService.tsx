import { Server, Zap, CheckCircle, Cpu, ExternalLink, MessageSquare, Image, Mic, Code } from "lucide-react";

export function TokenService() {
  const features = [
    {
      icon: Zap,
      title: "统一接入",
      description: "The Unified LLM API Gateway - 更优价格、更稳定、无需订阅",
      items: ["支持 30+ LLM 提供商", "统一接口标准", "无缝切换模型", "即开即用"],
    },
    {
      icon: MessageSquare,
      title: "对话与补全",
      description: "支持多种对话和文本补全 API 接口",
      items: ["/v1/chat/completions", "/v1/responses", "/v1/messages", "/v1beta/models"],
    },
    {
      icon: Image,
      title: "图像与嵌入",
      description: "提供图像生成、编辑和向量嵌入服务",
      items: ["/v1/embeddings", "/v1/rerank", "/v1/images/generations", "/v1/images/edits"],
    },
    {
      icon: Mic,
      title: "语音服务",
      description: "支持语音合成、转录和翻译功能",
      items: ["/v1/audio/speech", "/v1/audio/transcriptions", "/v1/audio/translations", "多语言支持"],
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
            The Unified LLM API Gateway - 统一的大模型 API 网关。
            更优价格、更稳定、无需订阅，只需替换 BASE URL 即可使用。
            支持 30+ LLM 提供商，提供安全、稳定、高效的 API 转发和管理能力。
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div>
              <span className="font-semibold text-gray-900">状态:</span> 已上线
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
              更优价格、更稳定、无需订阅 - 只需替换 BASE URL 即可开始使用
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://model.openindu.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium text-lg"
              >
                访问模型平台
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
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
openai.api_base = "https://model.openindu.com/v1"
openai.api_key = "your-api-key"

# 调用大模型API
response = openai.ChatCompletion.create(
  model="gpt-4",
  messages=[
    { "role": "user", "content": "分析这批产品的质量数据" }
  ]
)
print(response.choices[0].message.content)`}
              </pre>
            </div>
            <div className="bg-purple-50 p-8 rounded-2xl border border-purple-200">
              <h4 className="font-semibold text-gray-900 mb-4">💡 支持的 API 端点</h4>
              <div className="grid grid-cols-1 gap-2 text-sm text-gray-700">
                <div className="font-medium text-gray-900 mb-2">对话与补全</div>
                <ul className="space-y-1 ml-4 text-gray-600">
                  <li>• /v1/chat/completions</li>
                  <li>• /v1/responses</li>
                  <li>• /v1/responses/compact</li>
                  <li>• /v1/messages</li>
                </ul>
                <div className="font-medium text-gray-900 mb-2 mt-4">嵌入与重排</div>
                <ul className="space-y-1 ml-4 text-gray-600">
                  <li>• /v1beta/models</li>
                  <li>• /v1/embeddings</li>
                  <li>• /v1/rerank</li>
                </ul>
                <div className="font-medium text-gray-900 mb-2 mt-4">图像服务</div>
                <ul className="space-y-1 ml-4 text-gray-600">
                  <li>• /v1/images/generations</li>
                  <li>• /v1/images/edits</li>
                  <li>• /v1/images/variations</li>
                </ul>
                <div className="font-medium text-gray-900 mb-2 mt-4">语音服务</div>
                <ul className="space-y-1 ml-4 text-gray-600">
                  <li>• /v1/audio/speech</li>
                  <li>• /v1/audio/transcriptions</li>
                  <li>• /v1/audio/translations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
