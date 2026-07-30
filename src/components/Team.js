import React from 'react';
import Image from 'next/image';

const teamData = {
  en: {
    badge: "Our Experts",
    titlePart1: "Meet Our",
    titleHighlight: "Team CV & Info",
    description: "Get to know the brilliant minds behind Zyntrix Lab and their academic & professional backgrounds.",
    eduTitle: "Education & Degree",
    expTitle: "Professional Experience & Training",
    skillsTitle: "Core Skills",
    members: [
      {
        name: 'Injamamul Hoq',
        role: 'Lead Developer & Founder',
        university: 'Southeast University',
        image: '/member1.png',
        education: [
          'B.Sc. in Computer Science & Engineering',
          'MERN Stack Developer Professional Certification',
        ],
        skills: ['HTML', 'CSS', 'JavaScript', 'BetterAuth', 'React', 'Next.js', 'Node.js', 'Tailwind CSS', 'MongoDB', 'Express.js', 'DaisyUI', 'Git', 'GitHub', 'Digital Marketing', 'UI/UX'],
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
    ],
  },
  bn: {
    badge: "আমাদের এক্সপার্টগণ",
    titlePart1: "আমাদের টিম",
    titleHighlight: "সিভি ও তথ্য",
    description: "জাইন্ট্রিক্স ল্যাবের পেছনের দক্ষ মস্তিষ্ক এবং তাদের একাডেমিক ও পেশাদার ব্যাকগ্রাউন্ড সম্পর্কে জেনে নিন।",
    eduTitle: "শিক্ষা ও ডিগ্রি",
    expTitle: "পেশাদার অভিজ্ঞতা ও প্রশিক্ষণ",
    skillsTitle: "মূল দক্ষতা (Core Skills)",
    members: [
      {
        name: 'ইনজামামুল হক',
        role: 'লিড ডেভেলপার ও প্রতিষ্ঠাতা',
        university: 'সাউথইস্ট ইউনিভার্সিটি',
        image: '/member1.png',
        education: [
          'বিএসসি ইন কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং',
          'মার্ন স্ট্যাক ডেভেলপার প্রফেশনাল সার্টিফিকেশন',
        ],
        skills: ['HTML', 'CSS', 'JavaScript', 'BetterAuth', 'React', 'Next.js', 'Node.js', 'Tailwind CSS', 'MongoDB', 'Express.js', 'DaisyUI', 'Git', 'GitHub', 'Digital Marketing', 'UI/UX'],
        experience: [
          {
            title: 'ডিজিটাল মার্কেটিং কোর্স',
            company: 'ইউওয়াই-ল্যাব (২ মাস)',
            details: [
              'ফেসবুক অ্যাডস ক্যাম্পেইন ও ইমেল মার্কেটিং',
              'ফেসবুক পেজ তৈরি এবং অপ্টিমাইজেশন',
            ],
          },
          {
            title: 'ফুল স্ট্যাক ওয়েব ডেভেলপমেন্ট',
            company: 'প্রোগ্রামিং হিরো',
            details: [
              'একটি সম্পূর্ণ ফুল স্ট্যাক ওয়েব ডেভেলপমেন্ট কোর্স সম্পন্ন করেছি।',
              'HTML, CSS, JavaScript, React.js, Node.js, Express.js, MongoDB, Firebase, JWT Authentication এবং REST API শিখেছি।',
              'কোর্সের অংশ হিসেবে ১০টির বেশি রিয়েল-ওয়ার্ল্ড ওয়েব অ্যাপ্লিকেশন তৈরি করেছি।',
            ],
          },
          {
            title: 'ইউআই/ইউএক্স ডিজাইন বুট ক্যাম্প',
            company: 'সাউথইস্ট ইউনিভার্সিটি (২ মাস)',
            details: [
              'সাউথইস্ট ইউনিভার্সিটি কর্তৃক আয়োজিত ইউআই/ইউএক্স ডিজাইন বুট ক্যাম্প সফলভাবে সম্পন্ন করেছি।',
              'বেসিক ইউআই/ইউএক্স ডিজাইন কনসেপ্ট শিখেছি।',
            ],
          },
          {
            title: 'আইটি অ্যান্ড বিলিং ইন্টার্ন (প্রশিক্ষণ)',
            company: 'টেলেটক বাংলাদেশ লিমিটেড (বর্তমান)',
            details: [
              'টেলিকম নেটওয়ার্ক আর্কিটেকচার, বিলিং সিস্টেম এবং সিআরএম অপারেশন সম্পর্কে ব্যবহারিক জ্ঞান অর্জন করেছি।',
              'টেলিকম মিডিয়েশন প্রসেস, সিডিআর (Call Detail Record) ফ্লো এবং টেলিকম ডাটা প্রসেসিং শিখেছি।',
              'বিলিং, রেটিং, চার্জিং এবং কাস্টমার লাইফসাইকেল ম্যানেজমেন্ট কনসেপ্ট অধ্যয়ন করেছি।',
              'সিবিএস (Convergent Billing System), সিআরএম ইন্টিগ্রেশন এবং টেলিকম ডেটাবেস (RDBMS) এর মৌলিক বিষয়সমূহ জেনেছি।',
              'আইপি নেটওয়ার্কিং, রাউটিং, সুইচিং এবং নেটওয়ার্ক ট্রাবলশুটিং কৌশল সম্পর্কে ধারণা অর্জন করেছি।',
              'ওএসআই ও টিসিপি/আইপি মডেল, IPv4/IPv6 অ্যাড্রেসিং এবং বেসিক সাবনেটিং শিখেছি।',
              'সার্ভার ভার্চুয়ালাইজেশন, লিনাক্স ফান্ডামেন্টালস, স্টোরেজ সিস্টেম এবং ডাটা সেন্টার ইনফ্রাস্ট্রাকচার সম্পর্কে জেনেছি।',
              'ইপিসি, ৫জি কোর, নেটওয়ার্ক স্লাইসিং এবং এমইসি কনসেপ্ট সহ ৪জি এলটিই এবং ৫জি নেটওয়ার্ক আর্কিটেকচার অধ্যয়ন করেছি।',
            ],
          },
          {
            title: 'এআই ড্রাইভেন সাইবার সিকিউরিটি অ্যান্ড এথিক্যাল হ্যাকিং ক্যারিয়ার ট্র্যাক প্রোগ্রাম (চলমান)',
            company: 'ওস্তাদ ইনস্টিটিউট (২০২৬ – বর্তমান)',
            details: [
              'সাইবার সিকিউরিটি ফান্ডামেন্টালস শিখছি।',
              'এথিক্যাল হ্যাকিং এবং পেনিট্রেশন টেস্টিং',
              'ওয়েব অ্যাপ্লিকেশন সিকিউরিটি (OWASP)',
              'ভালনারেবিলিটি অ্যাসেসমেন্ট',
              'সিকিউরিটির জন্য লিনাক্স',
              'সাইবার সিকিউরিটিতে এআই-এর ব্যবহার',
              'পাসওয়ার্ড সিকিউরিটি এবং অথেন্টিকেশন',
              'সিকিউরিটি টুলস (Nmap, Wireshark, Burp Suite, Metasploit ইত্যাদি)',
            ],
          },
        ],
      },
      {
        name: 'সাজিদ হাসান রাহাত',
        role: 'ইউআই/ইউএক্স ডিজাইনার ও স্ট্র্যাটেজিস্ট',
        university: 'সাউথইস্ট ইউনিভার্সিটি',
        image: '/member2.jpg',
        education: [
          'বিএসসি ইন কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং',
          'ইউআই/ইউএক্স ডিজাইন প্রফেশনাল সার্টিফিকেশন',
        ],
        skills: ['Figma', 'Adobe XD', 'Digital Marketing', 'Web Development', 'Cyber Security'],
        experience: [
          {
            title: 'ডিজিটাল মার্কেটিং',
            company: 'ইউওয়াই-ল্যাব (২ মাসের ফুল কোর্স)',
            details: [
              'ফেসবুক অ্যাডস ক্যাম্পেইন',
              'ইমেল মার্কেটিং',
              'ফেসবুক পেজ তৈরি এবং অপ্টিমাইজেশন',
            ],
          },
          {
            title: 'ফুল স্ট্যাক ওয়েব ডেভেলপমেন্ট',
            company: 'লার্নিং অ্যান্ড প্রজেক্ট এক্সপেরিয়েন্স',
            details: [
              'ছোট ছোট প্রজেক্ট তৈরির মাধ্যমে ওয়েব ডেভেলপমেন্ট শিখেছি।',
              'HTML, CSS এবং JavaScript ব্যবহার করে একটি মুভি ওয়েবসাইট তৈরি করেছি।',
              'PHP ব্যবহার করে একটি ট্রাভেল ও হোটেল বুকিং ওয়েবসাইট তৈরি করেছি।',
              'প্রোগ্রামিং হিরো কোর্সের সময় সাধারণ ফ্রন্টএন্ড টাস্কে কাজ করেছি।',
              'বেসিক ডিজাইনের জন্য HTML, CSS, JavaScript এবং Tailwind CSS ব্যবহার করেছি।',
            ],
          },
          {
            title: 'ইউআই/ইউএক্স ডিজাইন',
            company: 'সাউথইস্ট ইউনিভার্সিটি (২ মাসের বুট ক্যাম্প)',
            details: [
              'বেসিক ইউআই/ইউএক্স ডিজাইন কনসেপ্ট শিখেছি।',
              '৩ পাতার একটি ফিটনেস অ্যাপ ইউআই ডিজাইন করেছি।',
              'সহজ রঙ, ফন্ট এবং লেআউট ব্যবহার করেছি।',
              'Figma ব্যবহার করে ডিজাইন তৈরি করেছি।',
            ],
          },
          {
            title: 'সাইবার সিকিউরিটি ইন্টার্ন',
            company: 'শাহ্জালাল ইসলামী ব্যাংক পিএলসি (৩ মাসের ইন্টার্নশিপ)',
            details: [
              'সিস্টেম ও অ্যাপ্লিকেশনের সিকিউরিটি দুর্বলতা চিহ্নিত করতে ভালনারেবিলিটি অ্যাসেসমেন্ট (VA) কার্যক্রমে সহায়তা করেছি।',
              'পেনিট্রেশন টেস্টিং পদ্ধতি এবং সিকিউরিটি টেস্টিং টুলস সম্পর্কে ব্যবহারিক অভিজ্ঞতা অর্জন করেছি।',
              'পেশাদার তত্ত্বাবধানে বেসিক সিকিউরিটি অ্যাসেসমেন্ট পরিচালনা করেছি এবং দুর্বলতাগুলো বিশ্লেষণ করেছি।',
              'ফলাদিন, রিস্ক রেটিং এবং প্রতিকারের সুপারিশসহ ভালনারেবিলিটি অ্যাসেসমেন্ট অ্যান্ড পেনিট্রেশন টেস্টিং (VAPT) রিপোর্ট প্রস্তুত করেছি।',
              'ইন্ডাস্ট্রি-স্ট্যান্ডার্ড সাইবার সিকিউরিটি প্র্যাকটিস, রিস্ক অ্যাসেসমেন্ট কৌশল এবং ইনফরমেশন সিকিউরিটি কন্ট্রোল শিখেছি।',
              'থ্রেট ডিটেকশন, ইন্সিডেন্ট রেসপন্স এবং সিকিউর সিস্টেম ম্যানেজমেন্ট বুঝতে সিকিউরিটি প্রফেশনালদের সাথে কাজ করেছি।',
            ],
          },
        ],
      },
    ],
  },
};

export default function Team({ lang = "en" }) {
  const t = teamData[lang] || teamData.en;

  return (
    <section id="team" className="py-16 sm:py-24 bg-zinc-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <span className="inline-block px-3.5 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full mb-3">
            {t.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            {t.titlePart1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">{t.titleHighlight}</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-zinc-400 text-sm sm:text-lg max-w-2xl px-2">
            {t.description}
          </p>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 max-w-6xl mx-auto">
          {t.members.map((member, index) => (
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
                      {t.eduTitle}
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
                      {t.expTitle}
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
                      {t.skillsTitle}
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