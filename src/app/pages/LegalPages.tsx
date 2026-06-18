import { Link } from "react-router";
import { SEO } from "../components/SEO";

interface LegalSection {
  title: string;
  paragraphs?: string[];
  items?: string[];
}

function LegalPage({
  title,
  description,
  canonicalPath,
  updatedAt,
  sections,
}: {
  title: string;
  description: string;
  canonicalPath: string;
  updatedAt: string;
  sections: LegalSection[];
}) {
  return (
    <section className="bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <SEO title={`${title}｜openIndu社区`} description={description} canonicalPath={canonicalPath} />
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm sm:p-10">
        <div className="mb-8 border-b border-gray-100 pb-6">
          <p className="mb-3 text-sm font-semibold text-blue-600">openIndu社区</p>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="mt-3 text-gray-600">{description}</p>
          <p className="mt-2 text-sm text-gray-500">最后更新：{updatedAt}</p>
        </div>

        <div className="space-y-8 text-gray-700">
          {sections.map((section) => (
            <section key={section.title} className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="leading-7">{paragraph}</p>
              ))}
              {section.items && (
                <ul className="list-disc space-y-2 pl-6 leading-7">
                  {section.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="mt-10 rounded-xl bg-blue-50 p-4 text-sm text-blue-800">
          如你对本声明有疑问，或希望行使访问、更正、删除个人信息等权利，请通过
          <a href="mailto:contact@openindu.com" className="font-medium underline"> contact@openindu.com </a>
          与 openIndu社区联系。
        </div>
      </div>
    </section>
  );
}

export function PrivacyPolicy() {
  return (
    <LegalPage
      title="隐私声明"
      description="本声明说明 openIndu社区如何收集、使用、存储和保护你在使用社区门户、资源中心及相关服务时提交或产生的信息。"
      canonicalPath="/privacy"
      updatedAt="2026-06-18"
      sections={[
        {
          title: "一、适用范围",
          paragraphs: ["本隐私声明适用于 openIndu社区网站、资源中心、登录注册、下载服务以及与这些服务相关的页面和接口。第三方网站或服务的隐私实践不适用本声明。"],
        },
        {
          title: "二、我们收集的信息",
          items: [
            "账号信息：手机号、短信验证码校验结果、昵称、角色等账号资料。手机号属于敏感信息，页面仅做脱敏展示。",
            "使用记录：登录时间、最后活跃时间、下载记录、下载次数、资源筛选和访问日志。",
            "设备与网络信息：IP 地址、浏览器 User-Agent、错误日志等用于安全审计和故障排查的信息。",
            "你主动提交的信息：通过反馈、邮件或表单提交给 openIndu社区的联系信息和问题描述。",
          ],
        },
        {
          title: "三、信息使用目的",
          items: [
            "完成手机号登录/注册、登录态保持、账号安全校验和会员权限判断。",
            "提供资源浏览、下载链接签发、每日下载限额统计和下载安全审计。",
            "改进页面体验、定位服务故障、发现异常访问并保护平台安全。",
            "在你主动联系我们时，用于回复问题、处理反馈和提供必要支持。",
          ],
        },
        {
          title: "四、共享、转让与公开披露",
          paragraphs: ["除法律法规要求、获得你的明确同意、履行安全合规义务或为提供必要服务所需外，openIndu社区不会向无关第三方出售或出租你的个人信息。若使用短信、对象存储、监控等基础服务，相关服务商仅在必要范围内处理信息。"],
        },
        {
          title: "五、存储与保护",
          items: [
            "我们采取访问控制、Token 失效、黑名单、日志审计等措施保护账号和下载行为安全。",
            "我们仅在实现服务目的所需期限内保留个人信息和操作日志；超过必要期限后会删除或匿名化处理。",
            "互联网传输无法保证绝对安全。如发现账号或信息异常，请及时联系 openIndu社区。",
          ],
        },
        {
          title: "六、你的权利",
          paragraphs: ["你可以请求访问、更正、删除你的个人信息，或撤回部分授权。为保障账号安全，我们可能需要验证你的身份后再处理请求。"],
        },
        {
          title: "七、声明更新",
          paragraphs: ["openIndu社区可能根据服务变化或合规要求更新本声明。重大变更会在页面显著位置提示；继续使用服务表示你已了解更新后的内容。"],
        },
      ]}
    />
  );
}

export function LegalNotice() {
  return (
    <LegalPage
      title="法律声明"
      description="本声明说明 openIndu社区内容、知识产权、链接、免责声明和用户行为规范。"
      canonicalPath="/legal"
      updatedAt="2026-06-18"
      sections={[
        {
          title: "一、网站内容",
          paragraphs: ["openIndu社区用于展示开源工业自动化生态、技术方案、资源中心和社区服务。页面内容会随项目发展持续更新，具体功能和可用性以实际服务为准。"],
        },
        {
          title: "二、知识产权与开源许可",
          paragraphs: ["网站文字、图片、页面设计、标识及未明确开源的材料受相关法律保护。openIndu社区项目中明确标注开源许可的代码、文档或资源，按对应许可证使用；未标注许可的内容不得擅自复制、改编或商业使用。"],
        },
        {
          title: "三、商标与标识",
          paragraphs: ["openIndu社区名称、Logo 及相关标识用于识别 openIndu社区。未经授权，不得以可能造成混淆的方式使用这些标识。页面中出现的第三方品牌或商标归其权利人所有，仅用于说明兼容性或技术场景。"],
        },
        {
          title: "四、外部链接",
          paragraphs: ["网站可能包含 GitHub、Gitee、监控平台或其他第三方网站链接。openIndu社区不控制第三方网站内容，也不对第三方网站的可用性、准确性或安全性承担责任。访问第三方网站时，请遵守其条款和隐私政策。"],
        },
        {
          title: "五、免责声明",
          items: [
            "网站内容按现状提供，仅供学习、研究和参考，不构成特定项目的工程承诺或专业意见。",
            "因网络、浏览器、第三方服务、不可抗力或用户自身操作造成的服务中断或损失，openIndu社区将在合理范围内协助处理，但不承担超出法律规定的责任。",
            "用户下载和使用资源时，应自行确认适用性、授权边界和安全性。",
          ],
        },
        {
          title: "六、用户行为",
          paragraphs: ["你不得利用 openIndu社区服务从事违法违规、侵权、破坏系统安全、绕过权限限制、批量抓取或干扰服务稳定性的行为。openIndu社区有权对异常账号采取限制、拉黑或强制登出等措施。"],
        },
      ]}
    />
  );
}

export function CookiesPolicy() {
  return (
    <LegalPage
      title="关于 Cookies"
      description="本说明解释 openIndu社区如何使用 Cookies、本地存储和类似技术，以支持登录态、账号安全和基础体验。"
      canonicalPath="/cookies"
      updatedAt="2026-06-18"
      sections={[
        {
          title: "一、什么是 Cookies 和本地存储",
          paragraphs: ["Cookies、本地存储和类似技术是浏览器保存少量数据的机制，可帮助网站记住登录状态、偏好设置或安全校验信息。openIndu社区当前主要通过浏览器本地存储保存登录 Token 和用户基本信息。"],
        },
        {
          title: "二、我们如何使用这些技术",
          items: [
            "必要用途：保存访问令牌、刷新令牌和登录状态，支持你在页面刷新后继续使用账号。",
            "安全用途：配合后端 Token 黑名单、刷新令牌轮换和强制登出机制，降低账号滥用风险。",
            "体验用途：保存少量页面状态或用户资料，减少重复输入。",
          ],
        },
        {
          title: "三、第三方 Cookies",
          paragraphs: ["当你访问外部链接、嵌入内容或第三方服务时，相关第三方可能按照其规则使用 Cookies。openIndu社区不控制第三方 Cookies，请查阅对应第三方的说明。"],
        },
        {
          title: "四、如何管理",
          paragraphs: ["你可以通过浏览器设置清除 Cookies 或本地存储。清除后，你可能需要重新登录；若完全禁用必要存储，登录、下载等功能可能无法正常使用。"],
        },
        {
          title: "五、更新",
          paragraphs: ["随着功能演进，openIndu社区可能调整 Cookies 或本地存储的使用方式，并在本页面更新说明。"],
        },
      ]}
    />
  );
}

export function LegalIndex() {
  return (
    <section className="bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <SEO title="法律与隐私｜openIndu社区" description="openIndu社区法律与隐私相关声明。" canonicalPath="/legal-center" />
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">法律与隐私</h1>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Link to="/privacy" className="rounded-xl border border-gray-100 p-5 hover:border-blue-200 hover:bg-blue-50">隐私声明</Link>
          <Link to="/legal" className="rounded-xl border border-gray-100 p-5 hover:border-blue-200 hover:bg-blue-50">法律声明</Link>
          <Link to="/cookies" className="rounded-xl border border-gray-100 p-5 hover:border-blue-200 hover:bg-blue-50">关于 Cookies</Link>
        </div>
      </div>
    </section>
  );
}
