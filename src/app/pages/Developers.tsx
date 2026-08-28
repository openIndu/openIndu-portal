import { ArrowRight, BookOpen, Rocket, Code, Users, GitBranch } from "lucide-react";
import { SEO } from "../components/SEO";

export function Developers() {

  const quickStartSteps = [
    { num: 1, title: "Clone the Repository", desc: "Get the latest code from GitHub", link: "https://github.com/openIndu" },
    { num: 2, title: "Read the README", desc: "Understand the project structure and setup", link: "https://github.com/openIndu/openIndu-portal" },
    { num: 3, title: "Install Dependencies", desc: "npm ci && npm run dev", link: null },
    { num: 4, title: "Make Your First Contribution", desc: "Check CONTRIBUTING.md for guidelines", link: "https://github.com/openIndu/openIndu-portal/blob/main/CONTRIBUTING.md" }
  ];

  const resources = [
    { icon: BookOpen, title: "Architecture Overview", desc: "Understand the system design", href: "https://github.com/openIndu" },
    { icon: Code, title: "API Documentation", desc: "Backend API reference", href: "https://github.com/openIndu/openindu-backend" },
    { icon: GitBranch, title: "Development Setup", desc: "Local dev environment guide", href: "https://github.com/openIndu" },
    { icon: Users, title: "Contributing Guide", desc: "How to submit PRs and contribute", href: "https://github.com/openIndu/openIndu-portal/blob/main/CONTRIBUTING.md" }
  ];

  return (
    <div>
      <SEO
        title="Developers | openIndu Community"
        description="Get started with openIndu development. Setup guides, API documentation, contribution guidelines, and examples for building with openIndu."
        canonicalPath="/developers"
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16 sm:py-24 overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-800 rounded-full text-sm font-semibold mb-5">
              <Code className="w-4 h-4" />
              Developer Guide
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Build with openIndu
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Everything you need to develop with, integrate, and contribute to openIndu
            </p>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Quick Start (5 minutes)</h2>
          <div className="space-y-4">
            {quickStartSteps.map((step) => (
              <div key={step.num} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-sky-700 text-white font-bold">
                    {step.num}
                  </div>
                </div>
                <div className="flex-grow pt-1">
                  <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 mt-1">{step.desc}</p>
                  {step.link && (
                    <a href={step.link} target="_blank" rel="noopener noreferrer" className="text-sky-700 hover:text-sky-800 mt-2 inline-flex items-center gap-1">
                      Learn more <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Developer Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource) => (
              <a key={resource.title} href={resource.href} target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0">
                    <resource.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{resource.desc}</p>
                    <span className="text-sky-700 text-sm mt-2 inline-flex items-center gap-1">
                      View <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Three Core Projects */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Three Core Projects to Contribute To</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">openIndu-studio</h3>
              <p className="text-sm text-gray-600 mb-4">AI-assisted industrial control development tools. Java/Spring Boot backend, React frontend.</p>
              <a href="https://github.com/openIndu/openIndu-studio" target="_blank" rel="noopener noreferrer" className="text-sky-700 hover:text-sky-800 text-sm inline-flex items-center gap-1">
                Explore <ArrowRight className="w-3 h-3" />
              </a>
            </div>
            <div className="rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">openIndu-platform</h3>
              <p className="text-sm text-gray-600 mb-4">Industrial IoT platform for data collection, monitoring, and analysis. Python FastAPI.</p>
              <a href="https://github.com/openIndu/openIndu-platform" target="_blank" rel="noopener noreferrer" className="text-sky-700 hover:text-sky-800 text-sm inline-flex items-center gap-1">
                Explore <ArrowRight className="w-3 h-3" />
              </a>
            </div>
            <div className="rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">openindu-station</h3>
              <p className="text-sm text-gray-600 mb-4">C# station control application for motion, vision, and industrial automation.</p>
              <a href="https://github.com/openIndu/openindu-station" target="_blank" rel="noopener noreferrer" className="text-sky-700 hover:text-sky-800 text-sm inline-flex items-center gap-1">
                Explore <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contribution Path */}
      <section className="py-16 sm:py-20 bg-sky-700 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Rocket className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">Ready to Contribute?</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Contributions don't have to be code. Documentation, examples, brand mappings, and bug reports all help the community grow.
          </p>
          <a
            href="https://github.com/openIndu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-sky-700 rounded-lg hover:bg-sky-50 transition-colors font-medium"
          >
            View Repositories on GitHub
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}

export default Developers;
