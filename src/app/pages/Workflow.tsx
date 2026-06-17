import { useState } from "react";
import { ArrowRight, Bot, Cpu, FileSpreadsheet, ListChecks, MonitorCog, Workflow as WorkflowIcon, Zap, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";

const steps = [
  {
    icon: Zap,
    title: "电气模组梳理",
    description: "根据设备清单与工艺需求拆分电气模组，明确每个模组的功能边界、执行元件和传感器需求。",
  },
  {
    icon: WorkflowIcon,
    title: "电路图设计",
    description: "围绕电源、控制、驱动、安全与通信回路生成电路图设计建议，并输出初步 IO 需求。",
  },
  {
    icon: FileSpreadsheet,
    title: "BOM 清单",
    description: "依据电路图和品牌选型规则汇总 PLC、HMI、驱动器、低压电器、线缆端子等物料清单。",
  },
  {
    icon: ListChecks,
    title: "IO 地址规划",
    description: "结合设备动作、信号类型和品牌地址规范生成 IO 地址表，为 PLC 变量定义提供依据。",
  },
  {
    icon: Cpu,
    title: "PLC 编程",
    description: "基于 IO 表与工艺流程设计程序结构，生成顺控、报警、手自动、通信等核心逻辑草案。",
  },
  {
    icon: MonitorCog,
    title: "HMI 编程",
    description: "围绕设备操作、状态监控、报警诊断和参数维护设计 HMI 画面与变量绑定方案。",
  },
];

export function Workflow() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  function toggleStep(index: number) {
    setExpandedStep((current) => (current === index ? null : index));
  }

  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            <Bot className="h-4 w-4" />
            AI Agent 工作流 P1 展示版
          </div>
          <h1 className="text-4xl font-bold text-gray-900">PLC 开发六步工作流</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600">
            openIndu 将工业自动化项目从需求梳理到 PLC/HMI 编程拆解为可协作、可追溯的标准流程。当前阶段提供静态流程展示，后续将接入 Claude Code 与 MCP 知识检索能力。
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
                        <p className="leading-relaxed text-gray-600">{step.description}</p>
                      ) : (
                        <p className="line-clamp-1 leading-relaxed text-gray-500 text-sm">
                          {step.description.slice(0, 60)}...
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-10 rounded-2xl border border-blue-100 bg-white p-6 text-center shadow-sm">
          <h2 className="mb-2 text-2xl font-semibold text-gray-900">后续规划</h2>
          <p className="text-gray-600">
            P2 阶段将接入品牌手册 RAG 检索、Agent 编排、文件模板生成与项目级工作流记录，实现从设计输入到代码草案的端到端辅助开发。
          </p>
        </div>
      </div>
    </section>
  );
}
