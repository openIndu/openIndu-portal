import { useState } from "react";
import { ArrowRight, Bot, Cpu, FileSpreadsheet, ListChecks, MonitorCog, Workflow as WorkflowIcon, Zap, ChevronDown, ChevronUp } from "lucide-react";
import { SEO } from "../components/SEO";
import { Card, CardContent } from "../components/ui/card";

const steps = [
  {
    icon: Zap,
    title: "电气模组梳理",
    description: "根据设备清单与工艺需求拆分电气模组，明确每个模组的功能边界、执行元件和传感器需求。",
    deliverables: ["模组边界清单", "动作/信号初表", "安全与互锁约束"],
  },
  {
    icon: WorkflowIcon,
    title: "电路图设计",
    description: "围绕电源、控制、驱动、安全与通信回路生成电路图设计建议，并输出初步 IO 需求。",
    deliverables: ["电源/控制回路草图", "驱动与通信拓扑", "DXF/DWG 渲染输入"],
  },
  {
    icon: FileSpreadsheet,
    title: "BOM 清单",
    description: "依据电路图和品牌选型规则汇总 PLC、HMI、驱动器、低压电器、线缆端子等物料清单。",
    deliverables: ["BOM 明细表", "品牌型号映射", "采购备注与替代料"],
  },
  {
    icon: ListChecks,
    title: "IO 地址规划",
    description: "结合设备动作、信号类型和品牌地址规范生成 IO 地址表，为 PLC 变量定义提供依据。",
    deliverables: ["IO 地址表", "变量命名规范", "端子/模块占用校验"],
  },
  {
    icon: Cpu,
    title: "PLC 编程",
    description: "基于 IO 表与工艺流程设计程序结构，生成顺控、报警、手自动、通信等核心逻辑草案。",
    deliverables: ["ST 代码草案", "设备注释 CSV", "导入与调试指引"],
  },
  {
    icon: MonitorCog,
    title: "HMI 编程",
    description: "围绕设备操作、状态监控、报警诊断和参数维护设计 HMI 画面与变量绑定方案。",
    deliverables: ["HMI 标签 CSV", "画面规格说明", "报警/参数交互宏"],
  },
];

export function Workflow() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  function toggleStep(index: number) {
    setExpandedStep((current) => (current === index ? null : index));
  }

  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-12 sm:px-6 lg:px-8">
      <SEO
        title="openIndu-studio 介绍｜openIndu"
        description="openIndu-studio 将电气模组、电路图、BOM、IO 地址、PLC 编程与 HMI 编程串联为可追溯的 AI Agent 工作流。"
        keywords="openIndu-studio,PLC工作流,电气设计,BOM,IO地址表,PLC编程,HMI编程,AI Agent"
        canonicalPath="/motion-control/studio"
      />
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            <Bot className="h-4 w-4" />
            AI Agent 工作流
          </div>
          <h1 className="text-4xl font-bold text-gray-900">openIndu-studio 介绍</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600">
            openIndu-studio 将工业自动化项目从需求梳理到 PLC/HMI 编程拆解为可协作、可追溯的标准流程（PLC 开发六步工作流），并逐步接入 Claude Code 与 MCP 知识检索能力。
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {steps.map((step, index) => {
            const isExpanded = expandedStep === index;
            return (
              <Card
                key={step.title}
                className="cursor-pointer border-blue-100 bg-white/90 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                onClick={() => toggleStep(index)}
              >
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-md">
                      <step.icon className="h-7 w-7" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">步骤 {index + 1}</span>
                        {index < steps.length - 1 && <ArrowRight className="hidden h-4 w-4 text-gray-400 sm:block" />}
                        <div className="ml-auto shrink-0">
                          {isExpanded ? (
                            <ChevronUp className="h-5 w-5 text-blue-600" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                      <h2 className="mb-2 text-xl font-semibold text-gray-900">{step.title}</h2>
                      {isExpanded ? (
                        <div className="space-y-4">
                          <p className="leading-relaxed text-gray-600">{step.description}</p>
                          <div>
                            <p className="mb-2 text-sm font-semibold text-gray-900">阶段产物</p>
                            <div className="flex flex-wrap gap-2">
                              {step.deliverables.map((item) => (
                                <span key={item} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p className="leading-relaxed text-gray-500 text-sm">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">端到端产物链路</h2>
            <p className="mb-4 text-gray-600">
              工作流输出统一汇聚到结构化 IR，再由 converters 渲染为真实工程文件，支持 BOM、IO 表、电路图、PLC/HMI 中间件与项目报告。
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "结构化 project.json",
                "BOM / IO Excel",
                "DXF 电路图",
                "ST + CSV 程序草案",
              ].map((item) => (
                <div key={item} className="rounded-xl bg-blue-50 px-4 py-3 text-sm font-medium text-blue-800">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">后续规划</h2>
            <p className="text-gray-600">
              P2 阶段将接入品牌手册 RAG 检索、Agent 编排、文件模板生成与项目级工作流记录，实现从设计输入到代码草案的端到端辅助开发。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
