import { ArrowRight, Zap, Shield, Network, TrendingUp } from "lucide-react";
import { Link } from "react-router";
import { SEO } from "../components/SEO";

export function EdgeComputing() {
  const features = [
    {
      icon: Zap,
      title: "Real-time Control",
      description: "Instant response to equipment signals without cloud latency"
    },
    {
      icon: Shield,
      title: "Data Security",
      description: "On-premise data processing keeps sensitive manufacturing data local"
    },
    {
      icon: Network,
      title: "Connectivity",
      description: "Multi-protocol support: Modbus, EtherCAT, OPC-UA, CANopen"
    },
    {
      icon: TrendingUp,
      title: "Performance",
      description: "Low-latency edge computation for mission-critical automation"
    }
  ];

  return (
    <div>
      <SEO
        title="openIndu-cim | Edge Computing | openIndu"
        description="Edge computing platform for industrial automation. Real-time control, data security, and multi-protocol connectivity for distributed systems."
        canonicalPath="/edge-computing"
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              openIndu-cim
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Industrial edge computing platform for real-time control, data processing, and distributed automation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/openIndu/openIndu-cim"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                View on GitHub
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <Link
                to="/iiot-platform"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors font-medium"
              >
                Industrial IoT Platform
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Core Capabilities</h2>
            <p className="text-gray-600">Everything you need for edge-based industrial automation</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 text-blue-600">
                    <feature.icon className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 mt-2">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Use Cases</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Distributed PLC Networks</h3>
              <p className="text-gray-600">Connect multiple edge nodes across production facilities with centralized management</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Real-time Data Processing</h3>
              <p className="text-gray-600">Process sensor data at the edge, aggregate to cloud for analytics and historical analysis</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Industrial Protocol Gateway</h3>
              <p className="text-gray-600">Unified interface for multi-protocol devices: Modbus, EtherCAT, CANopen, OPC-UA</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Offline-First Resilience</h3>
              <p className="text-gray-600">Continue operating during connectivity loss, sync data when connection restored</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-blue-600 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Deploy openIndu-cim Today</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Start building edge-powered automation. Open source, Apache 2.0, no vendor lock-in.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/openIndu/openIndu-cim"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              Get Started on GitHub
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <Link
              to="/about"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-medium"
            >
              Learn About openIndu
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EdgeComputing;
