# openIndu Full-Stack Architecture

## Overview

openIndu is a **vertically-integrated, end-to-end industrial automation operating system** with four distinct layers:

```
┌─────────────────────────────────────────────────────────────┐
│ 4️⃣ Craftsmanship Layer (工艺知识层)                          │
│   Forum + Knowledge Base: industry best practices            │
└────────────────────────────────────────────────────────────┘
         ↑ Share insights, optimize processes ↑
         ↓ Learn from others' experiences ↓
┌────────────────┬─────────────────┬──────────────────────────┐
│ 3️⃣ Application │ 3️⃣ Application  │ 3️⃣ Application Layer   │
│ Layer: Vision  │ Layer: Data     │                          │
│ (openindu-     │ (openIndu-cim   │ All three work together │
│ vision)        │ + platform)     │ to form complete loop  │
└────────────────┴─────────────────┴──────────────────────────┘
              ↑ Data ↑  Commands ↓  Results ↓
┌─────────────────────────────────────────────────────────────┐
│ 2️⃣ Programming & Configuration Layer (openindu-studio)     │
│                                                              │
│  • PLC Programming (Ladder Logic, Function Blocks)         │
│  • HMI Configuration (Touchscreen, Dashboard)              │
│  • Multi-brand PLC Selection (Siemens, Mitsubishi, etc.)  │
│  • BOM List Generation (Bill of Materials)                 │
│  • Circuit Diagram Drawing                                  │
│  • Cross-brand Code Generation (Key differentiator)        │
└─────────────────────────────────────────────────────────────┘
              ↑ Program execution, real-time control ↓
┌─────────────────────────────────────────────────────────────┐
│ 1️⃣ Hardware & OS Layer (RK3588 + openEuler)               │
│                                                              │
│  • RK3588: ARM-based industrial edge SoC                   │
│  • openEuler: Open-source industrial OS                    │
│  • Software PLC execution (real-time capable)              │
│  • Industrial protocol support (EtherCAT, Modbus, etc.)   │
│  • Edge-local decision making (no cloud dependency)        │
└─────────────────────────────────────────────────────────────┘
```

---

## Four Layers Explained

### Layer 1: Hardware & OS (工控芯片 + 操作系统)

**Foundation**: RK3588-powered software PLC running openEuler

- **RK3588**: Domestic (国产) ARM high-performance industrial SoC
- **openEuler**: Domestic open-source operating system
- **Cost advantage**: 50-70% cheaper than proprietary industrial PCs
- **Control capability**: Real-time PLC-level execution
- **Protocol support**: EtherCAT, Modbus, CANopen, OPC-UA

**Key value**: Low cost + domestic + open source + production-ready

---

### Layer 2: Programming & Configuration (openindu-studio)

**Core**: Design once, deploy to any brand

- **PLC Programming**: Support multiple IEC 61131-3 languages
- **HMI Configuration**: Drag-and-drop touchscreen design
- **Multi-brand Support**: Single design → auto-generate code for:
  - Siemens S7 (1200/1500)
  - Mitsubishi (iQ-R series)
  - Omron (NJ/NX series)
  - KEYENCE (KV-8000)
- **BOM Automation**: Automatically generate parts list and sourcing info
- **Circuit Diagram**: Draw electrical schematics with live updates
- **Cross-brand Generation**: 🎯 **The competitive moat**

**Key value**: 50% less engineering time, no vendor lock-in, one design for all brands

---

### Layer 3: Application Layer (Left + Right Wings)

#### 👁️ **Left Wing: openindu-vision** (工业视觉)

OpenCV-based industrial inspection and positioning

- Quality defect detection (cracks, misalignments, corrosion)
- Position/alignment verification (±0.1mm precision)
- Dimension measurement (in-process QA)
- Feedback to PLC for adaptive control

**Industries**: Battery assembly, PCB placement, chip packaging, automotive

#### 📊 **Right Wing: openIndu-cim + Platform** (数据采集和分析)

Edge computing + IIoT data platform

- **CIM** (Edge): Realtime data collection, local ML inference, edge-side warnings
- **Platform** (Cloud): Time-series database, analytics dashboard, traceability
- **Data loop**: Capture → Analyze → Alert → Optimize

#### 🔗 **Center: openindu-studio** (PLC编程)

Orchestrates vision feedback and data sending

- PLC logic responds to vision input
- Triggers data collection on CIM
- Sends results to Platform for analysis

---

### Layer 4: Craftsmanship Knowledge (工艺知识)

**Forum-based knowledge commons**

Industry-specific craftsmanship columns:

| Domain | Content | Example Topics |
|--------|---------|-----------------|
| **Battery Craftsmanship** | Cell manufacturing best practices | Winding speed vs quality trade-offs, solder joint design, capacity testing protocol |
| **PCB Craftsmanship** | Semiconductor assembly | Reflow temperature curves, solder paste recipes, defect classification |
| **Chip Packaging** | Semiconductor packaging | Wirebond parameters, mold pressures, reliability testing |
| **Automotive Craftsmanship** | Automotive parts | Stamping precision, welding strength requirements, traceability standards |

**Workflow**: Real issue → Forum discussion → Validated solution → Community adoption

---

## Why Four Layers?

### ✅ Completeness

A manufacturer doesn't just need code—they need:
1. **Reliable hardware** (cannot fail mid-production)
2. **Flexible programming** (must support different brands)
3. **Real-time intelligence** (vision + data driven decisions)
4. **Industry knowledge** (how others solved this same problem)

### ✅ Integration

Each layer feeds the next:

- **Chip → Studio**: Hardware availability drives what we can run
- **Studio → Apps**: Programmed logic controls what vision checks and when data is logged
- **Apps → Craftsmanship**: Production data reveals bottlenecks, forum helps optimize them
- **Craftsmanship → Chip**: Community-validated best practices guide next hardware needs

### ✅ Differentiation

Competitors typically own only 1-2 layers:

| Competitor | Has | Missing |
|-----------|------|---------|
| Siemens TIA Portal | Studio + Hardware | Cross-brand, Edge, Knowledge |
| AWS IoT | Platform + Edge | Studio, Hardware, Knowledge |
| GitHub Discussions | Knowledge | Nothing (free/community) |
| **openIndu** | **All 4** | **—** |

---

## Data Flow: From Parameter to Insight

```
Manufacturer defines process parameters (工艺参数)
         ↓
openindu-studio converts to PLC code (跨品牌生成)
         ↓
RK3588 SoftPLC executes in real-time (硬件执行)
         ↓
openindu-vision checks quality (工业检测)
         ↓
openindu-cim collects data at edge (边缘采集)
         ↓
openIndu-platform analyzes trends (数据分析)
         ↓
Insights reveal process issues (发现瓶颈)
         ↓
Forum craftsmanship column shares solution (工艺优化)
         ↓
Manufacturer updates parameters (持续改进)
```

**Result**: Data-driven closed loop for continuous improvement

---

## Business Model Alignment

### For Engineers

- "Build PLC programs 50% faster with cross-brand code generation"
- "Use the same tools for Siemens, Mitsubishi, Keyence—no re-learning"

### For Integrators

- "Reduce project costs by 30% with unified openIndu platform"
- "Resell to customers without vendor fear: Apache 2.0 open source"
- "Get certified integrator status and co-market with openIndu"

### For Manufacturers

- "Lower hardware TCO with domestic RK3588 + openEuler"
- "Gain production insight through IIoT platform—optimize yield"
- "Tap forum knowledge from peer manufacturers—avoid costly mistakes"

---

## Integration Points

### External Integrations

- **GitHub**: All code repos public (community contributions)
- **Forum**: Knowledge sharing, industry discussions
- **Gitee**: For domestic mirror (China region)
- **Alibaba Cloud**: For SaaS platform hosting

### Future Integrations

- **ERP Systems**: Planned BOM auto-sync to SAP, Oracle
- **Quality Management**: Defect traceability to MES
- **Compliance**: Audit trail for automotive (IATF, ISO26262)

---

## Technology Stack Across Layers

| Layer | Component | Tech |
|-------|-----------|------|
| **1 (Hardware)** | SoC | ARM RK3588 (Domestic) |
| **1 (OS)** | OS | openEuler (Domestic) |
| **1 (Runtime)** | PLC VM | Open-source soft-PLC engine |
| **2 (IDE)** | Studio UI | React/TypeScript |
| **2 (Generator)** | Code Gen | Java/Spring Boot (multi-target) |
| **3 (Vision)** | Detection | OpenCV 4.8+ |
| **3 (Edge)** | Gateway | openIndu-cim (Python FastAPI) |
| **3 (Cloud)** | Platform | openIndu-platform (FastAPI + PostgreSQL + TDengine) |
| **4 (Forum)** | Knowledge | Discourse (or custom forum) |

---

## Architecture vs. Product Roadmap

### Current (Stable)

- ✅ openindu-studio (IDE + code generation)
- ✅ openindu-station (C# station control app)
- ✅ openIndu-platform (IIoT data + dashboards)
- ✅ openIndu-cim (Edge gateway)
- ✅ Community forum (basic)

### Q3-Q4 2026 (In Progress)

- 🔄 RK3588 soft-PLC reference (edge-native execution)
- 🔄 Vision integration module (openindu-vision plug-in)
- 🔄 Craftsmanship knowledge columns (battery, PCB, chip, auto)
- 🔄 Domestic cert path (CCC, 工控安全认证)

### Beyond 2026 (Planned)

- 📅 ML model zoo (TinyML for edge inference)
- 📅 Integrator certification program
- 📅 Industry-specific solution templates

---

## How This Document Stays Current

This architecture doc should evolve with the product. Update it when:

- New layers are added (unlikely—four layers are comprehensive)
- A layer gains major new capability (e.g., vision module launches)
- Business strategy shifts focus (e.g., SaaS launch)
- Competitive differentiation changes

**Last updated**: 2026-08-26
