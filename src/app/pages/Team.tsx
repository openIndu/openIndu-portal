import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { SEO } from "../components/SEO";

export function Team() {

  const teamMembers = [
    {
      name: "Chen Wei",
      role: "Founder & Lead Architect",
      bio: "15+ years in industrial automation, led the openIndu vision from concept to open-source release",
      github: "https://github.com/openIndu",
      social: { linkedin: "#", twitter: "#" }
    },
    {
      name: "Zhang Li",
      role: "Core Maintainer (Backend)",
      bio: "Python FastAPI specialist, owns the openIndu-platform (IIoT) codebase",
      github: "https://github.com/openIndu",
      social: { linkedin: "#", twitter: "#" }
    },
    {
      name: "Wang Jun",
      role: "Core Maintainer (Frontend)",
      bio: "React expert, maintains openIndu-portal and the web ecosystem",
      github: "https://github.com/openIndu",
      social: { linkedin: "#", twitter: "#" }
    },
    {
      name: "Liu Yang",
      role: "Core Maintainer (Station Control)",
      bio: "C# .NET specialist, leads openindu-station development for motion and vision",
      github: "https://github.com/openIndu",
      social: { linkedin: "#", twitter: "#" }
    }
  ];

  const contributors = [
    "Community contributors on GitHub",
    "Forum moderators and expert advisors",
    "Open-source contributors world-wide"
  ];

  return (
    <div>
      <SEO
        title="Team | openIndu Community"
        description="Meet the openIndu team — founders, core maintainers, and the global community of contributors."
        canonicalPath="/team"
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Meet the Team
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              A global team of industrial automation experts building the future of open-source IIoT
            </p>
          </div>
        </div>
      </section>

      {/* Core Team */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Core Maintainers</h2>
            <p className="text-gray-600">Leading openIndu across all three domains</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 mb-4"></div>
                  <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-sky-700 font-medium mt-1">{member.role}</p>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{member.bio}</p>
                <div className="flex gap-3">
                  <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                    <Github className="w-5 h-5" />
                  </a>
                  {member.social.linkedin !== "#" && (
                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.twitter !== "#" && (
                    <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contributors */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Community</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              openIndu is powered by a global community of contributors, maintainers, and advisors
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contributors.map((item) => (
              <div key={item} className="bg-white p-6 rounded-xl border border-gray-200 text-center">
                <p className="text-gray-700 font-medium">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Want to join the team?</p>
            <a href="https://github.com/openIndu" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-sky-700 text-white rounded-lg hover:bg-[#085A90] transition-colors">
              <Github className="w-5 h-5" />
              Contribute on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Have questions or want to collaborate? Reach out to the community through any of these channels.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://forum.openindu.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-200 rounded-lg hover:border-sky-700 hover:text-sky-700 transition-colors">
              论坛
            </a>
            <a href="https://github.com/openIndu/openIndu-portal/discussions" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-200 rounded-lg hover:border-sky-700 hover:text-sky-700 transition-colors">
              GitHub Discussions
            </a>
            <a href="mailto:contact@openindu.com" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-200 rounded-lg hover:border-sky-700 hover:text-sky-700 transition-colors">
              <Mail className="w-5 h-5" />
              Email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Team;
