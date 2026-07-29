import React from 'react';
import Image from 'next/image';

const teamMembers = [
  {
    name: 'Injamamul Hoq',
    role: 'Lead Developer & Founder',
    university: 'Southeast University',
    image: '/member1.png',
    education: [
      'B.Sc. in Computer Science & Engineering',
      'MERN Stack Developer Professional Certification',
    ],
    skills: ['HTML', 'CSS', 'JavaScript', 'BetterAuth', 'React', 'Next.js', 'Node.js', 'Tailwind CSS','MongoDB','Express.js','DaisyUI','Git', 'GitHub','Digital Marketing', 'UI/UX'],
    experience: [
      {
        title: 'Digital Marketing Course',
        company: 'UY-lab (2 Months)',
        details: [
          'Facebook Ads campaign & Email marketing',
          'Facebook Page Create and Optimization',
        ],
      },
      {
        title: 'Full Stack Web Development',
        company: 'Programming Hero',
        details: [
          'Completed a comprehensive Full Stack Web Development course.',
          'Learned HTML, CSS, JavaScript, React.js, Node.js, Express.js, MongoDB, Firebase, JWT Authentication, and REST APIs.',
          'Developed 10+ real-world web applications as part of the course curriculum.',
        ],
      },
      {
        title: 'UI/UX Design Bootcamp',
        company: 'Southeast University (2 Months)',
        details: [
          'Successfully completed a UI/UX Design Bootcamp organized by Southeast University.',
          'Learned basic UI/UX design concepts.',
        ],
      },
      {
        title: 'IT & Billing Intern (Training)',
        company: 'Teletalk Bangladesh Ltd. (Present)',
        details: [
          'Gained practical knowledge of telecom network architecture, billing systems, and CRM operations.',
          'Learned telecom mediation process, CDR (Call Detail Record) flow, and telecom data processing.',
          'Studied billing, rating, charging, and customer lifecycle management concepts.',
          'Explored CBS (Convergent Billing System), CRM integration, and telecom database (RDBMS) fundamentals.',
          'Developed understanding of IP networking, routing, switching, and network troubleshooting techniques.',
          'Learned OSI & TCP/IP models, IPv4/IPv6 addressing, and basic subnetting.',
          'Acquired knowledge of server virtualization, Linux fundamentals, storage systems, and data center infrastructure.',
          'Studied 4G LTE and 5G network architecture, including EPC, 5G Core, network slicing, and MEC concepts.',
        ],
      },
      {
        title: 'AI Driven Cyber Security & Ethical Hacking Career Track Program (Ongoing)',
        company: 'Ostad Institute (2026 – Present)',
        details: [
          'Learning Cyber Security Fundamentals.',
          'Ethical Hacking & Penetration Testing',
          'Web Application Security (OWASP)',
          'Vulnerability Assessment',
          'Linux for Security',
          'AI Applications in Cyber Security',
          'Password Security & Authentication',
          'Security Tools (Nmap, Wireshark, Burp Suite, Metasploit, etc.)',
        ],
      },
    ],
  },
  {
    name: 'Sazid Hassan Rahat',
    role: 'UI/UX Designer & Strategist',
    university: 'Southeast University',
    image: '/member2.jpg',
    education: [
      'B.Sc. in Computer Science & Engineering',
      'UI/UX Design Professional Certification',
    ],
    skills: ['Figma', 'Adobe XD', 'Digital Marketing', 'Web Development', 'Cyber Security'],
    experience: [
      {
        title: 'Digital Marketing',
        company: 'UY-lab (2 Months Full Course)',
        details: [
          'Facebook Ads campaign',
          'Email marketing',
          'Facebook Page Create and Optimization',
        ],
      },
      {
        title: 'Full Stack Web Development',
        company: 'Learning & Project Experience',
        details: [
          'Learned web development by doing small projects.',
          'Made a Movie Website using HTML, CSS, and JavaScript.',
          'Built a Travel & Hotel Booking Website using PHP.',
          'Worked on simple frontend tasks during the Programming Hero course.',
          'Used HTML, CSS, JavaScript, and Tailwind CSS for basic designs.',
        ],
      },
      {
        title: 'UI/UX Design',
        company: 'Southeast University (2 Months Bootcamp)',
        details: [
          'Learned basic UI/UX design concepts.',
          'Designed a 3-page Fitness App UI.',
          'Used simple colors, fonts, and layouts.',
          'Created designs using Figma.',
        ],
      },
      {
        title: 'Cyber Security Intern',
        company: 'Shahjalal Islami Bank PLC (3 Months Internship)',
        details: [
          'Assisted in Vulnerability Assessment (VA) activities to identify security weaknesses in systems and applications.',
          'Gained practical exposure to Penetration Testing methodologies and security testing tools.',
          'Conducted basic security assessments and analyzed vulnerabilities under professional supervision.',
          'Prepared vulnerability assessment and penetration testing (VAPT) reports with findings, risk ratings, and remediation recommendations.',
          'Learned industry-standard cybersecurity practices, risk assessment techniques, and information security controls.',
          'Collaborated with security professionals to understand threat detection, incident response, and secure system management.',
        ],
      },
    ],
  },
];

export default function Team() {
  return (
    <section id="team" className="py-16 sm:py-24 bg-zinc-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <span className="inline-block px-3.5 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full mb-3">
            Our Experts
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Team CV & Info</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-zinc-400 text-sm sm:text-lg max-w-2xl px-2">
            Get to know the brilliant minds behind Zyntrix Lab and their academic & professional backgrounds.
          </p>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-zinc-900/80 border border-zinc-800/80 p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl flex flex-col justify-between hover:border-zinc-700 transition-all duration-300"
            >
              <div>
                {/* Header Profile */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6 text-center sm:text-left">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-blue-500/40 shrink-0 bg-zinc-800">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">{member.name}</h3>
                    <p className="text-blue-400 font-medium text-xs sm:text-sm mb-1">{member.role}</p>
                    <p className="text-zinc-400 text-xs sm:text-sm flex items-center justify-center sm:justify-start gap-1">
                      🎓 {member.university}
                    </p>
                  </div>
                </div>

                <hr className="border-zinc-800 mb-6" />

                {/* CV Information */}
                <div className="space-y-6 text-left">
                  <div>
                    <h4 className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                      Education & Degree
                    </h4>
                    <ul className="space-y-1">
                      {member.education.map((edu, idx) => (
                        <li key={idx} className="text-xs sm:text-sm text-zinc-300 flex items-start gap-2">
                          <span className="text-blue-500 flex-shrink-0">•</span> <span>{edu}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
                      Professional Experience & Training
                    </h4>
                    <div className="space-y-3 sm:space-y-4">
                      {Array.isArray(member.experience) ? (
                        member.experience.map((exp, idx) => (
                          <div key={idx} className="bg-zinc-950/50 p-3.5 sm:p-4 rounded-xl border border-zinc-800/60">
                            <h5 className="text-xs sm:text-sm font-bold text-blue-400 leading-snug">{exp.title}</h5>
                            <p className="text-[11px] sm:text-xs font-medium text-zinc-400 mb-2">{exp.company}</p>
                            <ul className="space-y-1">
                              {exp.details.map((detail, dIdx) => (
                                <li key={dIdx} className="text-[11px] sm:text-xs text-zinc-300 flex items-start gap-2">
                                  <span className="text-blue-500 mt-0.5 flex-shrink-0">▪</span> <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs sm:text-sm text-zinc-300">💼 {member.experience}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                      Core Skills
                    </h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {member.skills.map((skill, idx) => (
                        <span key={idx} className="px-2.5 sm:px-3 py-1 bg-zinc-800 text-blue-300 text-[11px] sm:text-xs font-medium rounded-lg border border-zinc-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}