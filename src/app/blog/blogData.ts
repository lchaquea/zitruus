// Import the BlogPost interface from types.ts
import { BlogPost } from './types';

export const authors = {
  sebastian: {
    name: 'Sebastian Chaquea',
    role: 'Founder & Head of Talent Strategy',
    image: '/assets/images/JuanChaqueaProfile.svg',
    bio: 'With 15+ years in the U.S. and deep expertise in HR, performance, and career strategy, Sebastian ensures seamless cultural fit between LATAM talent and U.S. companies, optimizing workforce success. He is your go-to-person for your strategy challenges.',
    website: 'https://zitruus.com/team/sebastian'
  },
  lucas: {
    name: 'Lucas Chaquea',
    role: 'Founder',
    image: '/assets/images/LucasChaqueaProfile.svg',
    bio: 'A visionary leader, serial entrepreneur, with extensive experience in talent acquisition accross its ventures for the tech industry. Lucas founded Zitruus with a mission to bridge the gap between US companies and Latin American talent.',
    website: 'https://zitruus.com/team/lucas'
  },
  maria: {
    name: 'Maria Escobar',
    role: 'HR Manager',
    image: '/assets/images/MariaEscobarProfile.svg',
    bio: 'Maria is a seasoned HR professional with expertise in workforce management. In her 5+ years at 3M she developed skills and knowledge which ensures our talent receives exceptional support throughout their journey with Zitruus.',
    website: 'https://zitruus.com/team/maria'
  },
  santiago: {
    name: 'Santiago Cruz',
    role: 'Colombia Hub Managing Partner',
    image: '/assets/images/SantiagoCruzProfile.svg',
    bio: 'Santiago brings over a decade of experience in managing international teams with hubs of +400 employees. His expertise in nearshore talent management ensures successful partnerships between US companies and LATAM professionals.',
    website: 'https://zitruus.com/team/santiago'
  },
  gabriela: {
    name: 'Gabriela Barrera',
    role: 'Payroll & HR Specialist',
    image: '/assets/images/GabrielaBarreraProfile.svg',
    bio: 'Gabriela expertly manages our international payroll operations and HR compliance. Her attention to detail ensures smooth operations for both our clients and talent pool.',
    website: 'https://zitruus.com/team/gabriela'
  }
};

// Function to generate random dates between Dec 2023 and March 12, 2025
const generateRandomDates = (count: number) => {
  const startDate = new Date('2023-12-01');
  const endDate = new Date('2025-03-12');
  const dateRange = endDate.getTime() - startDate.getTime();
  
  // Calculate number of months in the range
  const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                 (endDate.getMonth() - startDate.getMonth()) + 1;
  
  // Calculate how many posts per month (minimum)
  const postsPerMonth = Math.floor(count / months);
  
  // Calculate remaining posts to distribute randomly
  const remainingPosts = count - (postsPerMonth * months);
  
  // Create an array to track posts per month
  const monthlyDistribution = Array(months).fill(postsPerMonth);
  
  // Distribute remaining posts randomly
  for (let i = 0; i < remainingPosts; i++) {
    const randomMonthIndex = Math.floor(Math.random() * months);
    monthlyDistribution[randomMonthIndex]++;
  }
  
  // Generate dates based on the distribution
  const dates: Date[] = [];
  
  for (let i = 0; i < months; i++) {
    const year = startDate.getFullYear() + Math.floor((startDate.getMonth() + i) / 12);
    const month = (startDate.getMonth() + i) % 12;
    
    for (let j = 0; j < monthlyDistribution[i]; j++) {
      // Generate a random day in the month (1-28 to avoid month boundary issues)
      const day = Math.floor(Math.random() * 28) + 1;
      const date = new Date(year, month, day);
      dates.push(date);
    }
  }
  
  // Shuffle the dates
  for (let i = dates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [dates[i], dates[j]] = [dates[j], dates[i]];
  }
  
  return dates.map(date => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  });
};

// Generate random dates for all blog posts
const randomDates = generateRandomDates(70); // Total number of blog posts

// Assign specific authors to blog posts based on their expertise
// Blog post data
export const blogPosts: BlogPost[] = [
  // Remote Hiring & Talent Acquisition
  {
    id: 1,
    title: "Why Hiring LATAM Talent Is a Game-Changer for U.S. Companies",
    excerpt: "Discover how tapping into Latin America's talent pool can transform your business with high-quality professionals at competitive rates.",
    category: "Remote Hiring & Talent Acquisition",
    date: randomDates[0],
    author: authors.sebastian.name,
    slug: "why-hiring-latam-talent-is-a-game-changer",
    tags: ["LATAM talent", "remote hiring", "cost savings", "global workforce", "business transformation"]
  },
  {
    id: 2,
    title: "The Top 5 Roles U.S. Companies Are Successfully Outsourcing to LATAM",
    excerpt: "Learn which positions are most effectively filled by Latin American professionals and why they excel in these roles.",
    category: "Remote Hiring & Talent Acquisition",
    date: randomDates[1],
    author: authors.lucas.name,
    slug: "top-5-roles-outsourced-to-latam",
    tags: ["outsourcing", "tech roles", "remote teams", "talent specialization", "strategic hiring"]
  },
  {
    id: 3,
    title: "How to Identify and Hire the Best Remote Talent in Latin America",
    excerpt: "A comprehensive guide to finding, vetting, and onboarding top-tier professionals from the LATAM region.",
    category: "Remote Hiring & Talent Acquisition",
    date: randomDates[2],
    author: authors.maria.name,
    slug: "identify-hire-best-remote-talent-latam",
    tags: ["talent acquisition", "hiring process", "remote work", "candidate screening", "talent assessment"]
  },
  {
    id: 4,
    title: "The Cost Breakdown: Hiring in LATAM vs. Hiring in the U.S.",
    excerpt: "A detailed analysis of the financial benefits of building your team with Latin American professionals.",
    category: "Remote Hiring & Talent Acquisition",
    date: randomDates[3],
    author: authors.sebastian.name,
    slug: "cost-breakdown-latam-vs-us-hiring",
    tags: ["cost analysis", "hiring costs", "budget optimization", "financial planning", "operational efficiency"]
  },
  {
    id: 5,
    title: "5 Key Traits of Top-Performing Remote Employees",
    excerpt: "Identify the characteristics that make remote workers successful and how to spot them during the hiring process.",
    category: "Remote Hiring & Talent Acquisition",
    date: randomDates[4],
    author: authors.sebastian.name,
    slug: "key-traits-top-performing-remote-employees",
    tags: ["remote work", "employee performance", "hiring tips", "talent evaluation", "team building"]
  },
  {
    id: 6,
    title: "How to Attract and Retain the Best LATAM Talent for Your Team",
    excerpt: "Strategies for creating an appealing work environment that keeps your Latin American team members engaged and loyal.",
    category: "Remote Hiring & Talent Acquisition",
    date: randomDates[5],
    author: authors.sebastian.name,
    slug: "attract-retain-latam-talent",
    tags: ["employee retention", "workplace culture", "talent management", "engagement strategies", "competitive benefits"]
  },
  {
    id: 7,
    title: "Freelancers vs. Full-Time LATAM Hires: Which One is Right for You?",
    excerpt: "Compare the benefits and drawbacks of different employment models when working with Latin American professionals.",
    category: "Remote Hiring & Talent Acquisition",
    date: randomDates[6],
    author: authors.sebastian.name,
    slug: "freelancers-vs-full-time-latam-hires",
    tags: ["freelancing", "full-time employment", "hiring models", "workforce planning", "employment options"]
  },
  {
    id: 8,
    title: "The Biggest Hiring Challenges U.S. Companies Face & How Zitruus Solves Them",
    excerpt: "Explore common obstacles in the international hiring process and learn how our comprehensive solutions address them.",
    category: "Remote Hiring & Talent Acquisition",
    date: randomDates[7],
    author: authors.sebastian.name,
    slug: "hiring-challenges-zitruus-solutions",
    tags: ["hiring challenges", "solutions", "international recruitment", "talent acquisition", "global hiring"]
  },
  {
    id: 9,
    title: "LATAM Talent Pools: Which Country Is Best for Your Hiring Needs?",
    excerpt: "A country-by-country analysis of Latin America's tech ecosystems to help you target your recruitment efforts effectively.",
    category: "Remote Hiring & Talent Acquisition",
    date: randomDates[8],
    author: authors.sebastian.name,
    slug: "latam-talent-pools-country-comparison",
    tags: ["country comparison", "talent pools", "regional expertise", "market analysis", "strategic recruitment"]
  },
  {
    id: 10,
    title: "Top 10 Questions to Ask Before Hiring a Remote Employee in LATAM",
    excerpt: "Essential interview questions that will help you identify the perfect candidates for your remote positions.",
    category: "Remote Hiring & Talent Acquisition",
    date: randomDates[9],
    author: authors.sebastian.name,
    slug: "questions-before-hiring-remote-latam-employee",
    tags: ["interview questions", "remote hiring", "candidate assessment", "recruitment strategy", "talent evaluation"]
  },
  
  // HR, Payroll, & Compliance for LATAM Hiring
  {
    id: 11,
    title: "How Employer of Record (EoR) Services Simplify LATAM Hiring",
    excerpt: "Understand how EoR services eliminate compliance headaches and streamline the process of building your international team.",
    category: "HR, Payroll, & Compliance",
    date: randomDates[10],
    author: authors.gabriela.name,
    slug: "employer-of-record-services-simplify-hiring",
    tags: ["EoR", "compliance", "international hiring", "legal solutions", "global employment"]
  },
  {
    id: 12,
    title: "Understanding Payroll and Benefits in LATAM: What U.S. Employers Need to Know",
    excerpt: "Navigate the complexities of compensation packages and employee benefits across different Latin American countries.",
    category: "HR, Payroll, & Compliance",
    date: randomDates[11],
    author: authors.gabriela.name,
    slug: "payroll-benefits-latam-guide",
    tags: ["payroll", "benefits", "compensation", "international HR", "employee packages"]
  },
  {
    id: 13,
    title: "Hiring Legally in LATAM: Avoiding Compliance Pitfalls",
    excerpt: "Learn about the legal requirements for hiring in Latin America and how to ensure your company remains compliant.",
    category: "HR, Payroll, & Compliance",
    date: randomDates[12],
    author: authors.gabriela.name,
    slug: "hiring-legally-latam-compliance",
    tags: ["legal compliance", "regulations", "risk management", "employment law", "international hiring"]
  },
  {
    id: 14,
    title: "How Zitruus Ensures a Smooth Onboarding & Payroll Process for Your LATAM Employees",
    excerpt: "Discover our comprehensive approach to employee onboarding and ongoing payroll management for international teams.",
    category: "HR, Payroll, & Compliance",
    date: randomDates[13],
    author: authors.gabriela.name,
    slug: "smooth-onboarding-payroll-process",
    tags: ["onboarding", "payroll management", "employee experience", "HR processes", "international teams"]
  },
  {
    id: 15,
    title: "Essential Labor Laws in LATAM Countries That U.S. Employers Should Know",
    excerpt: "A practical overview of key employment regulations across Latin America to help you navigate the legal landscape.",
    category: "HR, Payroll, & Compliance",
    date: randomDates[14],
    author: authors.gabriela.name,
    slug: "essential-labor-laws-latam",
    tags: ["labor laws", "employment regulations", "legal requirements", "compliance", "international HR"]
  },
  {
    id: 16,
    title: "How to Handle Terminations and Severance Pay for Remote LATAM Employees",
    excerpt: "Guidelines for managing employment separations in compliance with local regulations and best practices.",
    category: "HR, Payroll, & Compliance",
    date: randomDates[15],
    author: authors.gabriela.name,
    slug: "terminations-severance-pay-latam",
    tags: ["termination", "severance", "employment law", "HR compliance", "international workforce"]
  },
  {
    id: 17,
    title: "Do You Need an International Entity to Hire in LATAM? (Spoiler: You Don't!)",
    excerpt: "Explore alternative solutions to establishing a legal entity when building your team in Latin America.",
    category: "HR, Payroll, & Compliance",
    date: randomDates[16],
    author: authors.gabriela.name,
    slug: "international-entity-alternatives-latam",
    tags: ["legal entities", "international expansion", "hiring solutions"]
  },
  {
    id: 18,
    title: "Tax Implications of Hiring LATAM Contractors vs. Employees",
    excerpt: "A guide to understanding the tax considerations for different employment arrangements with Latin American professionals.",
    category: "HR, Payroll, & Compliance",
    date: randomDates[17],
    author: authors.gabriela.name,
    slug: "tax-implications-latam-contractors-employees",
    tags: ["tax considerations", "contractors", "employees", "financial planning", "international taxation"]
  },
  {
    id: 19,
    title: "Creating Compliant Employment Contracts for Your LATAM Team",
    excerpt: "Best practices for developing employment agreements that protect your company and comply with local regulations.",
    category: "HR, Payroll, & Compliance",
    date: randomDates[18],
    author: authors.gabriela.name,
    slug: "compliant-employment-contracts-latam",
    tags: ["employment contracts", "legal documents", "compliance", "risk management", "international hiring"]
  },
  {
    id: 20,
    title: "How to Navigate Work Visas and Immigration for LATAM Talent",
    excerpt: "A comprehensive guide to understanding visa requirements and immigration processes for Latin American professionals.",
    category: "HR, Payroll, & Compliance",
    date: randomDates[19],
    author: authors.gabriela.name,
    slug: "work-visas-immigration-latam-talent",
    tags: ["work visas", "immigration", "international mobility", "legal requirements", "talent relocation"]
  },
  {
    id: 21,
    title: "The Complete Guide to LATAM Holidays and PTO Policies",
    excerpt: "Understanding cultural differences in time off expectations and creating appropriate policies for your international team.",
    category: "HR, Payroll, & Compliance",
    date: randomDates[20],
    author: authors.gabriela.name,
    slug: "latam-holidays-pto-policies",
    tags: ["holidays", "PTO", "time off", "cultural differences", "employee benefits"]
  },
  
  // Optimizing Operations & Scaling Efficiently
  {
    id: 21,
    title: "How Remote LATAM Teams Can Reduce Your Back-Office Costs by 80%",
    excerpt: "Discover the significant cost savings potential of leveraging Latin American talent for your operational functions.",
    category: "Optimizing Operations & Scaling",
    date: randomDates[20],
    author: authors.sebastian.name,
    slug: "remote-teams-reduce-back-office-costs",
    tags: ["cost reduction", "back-office operations", "efficiency"]
  },
  {
    id: 22,
    title: "Why U.S. Startups Are Turning to LATAM for Scalable Growth",
    excerpt: "Learn how emerging companies are leveraging Latin American talent to accelerate their expansion while managing costs.",
    category: "Optimizing Operations & Scaling",
    date: randomDates[21],
    author: authors.lucas.name,
    slug: "startups-latam-scalable-growth",
    tags: ["startups", "scaling", "growth strategies"]
  },
  {
    id: 23,
    title: "How to Build a High-Performing Remote Team Across Different Time Zones",
    excerpt: "Strategies for effective collaboration and productivity when managing a geographically distributed workforce.",
    category: "Optimizing Operations & Scaling",
    date: randomDates[22],
    author: authors.sebastian.name,
    slug: "high-performing-remote-team-time-zones",
    tags: ["remote teams", "collaboration", "productivity"]
  },
  {
    id: 24,
    title: "How Outsourcing Back-Office Operations Can Help Your Business Scale Faster",
    excerpt: "Explore how delegating administrative functions to Latin American professionals can accelerate your company's growth.",
    category: "Optimizing Operations & Scaling",
    date: randomDates[23],
    author: authors.lucas.name,
    slug: "outsourcing-back-office-scale-faster",
    tags: ["outsourcing", "scaling", "business growth"]
  },
  {
    id: 25,
    title: "The Role of Remote Executive Assistants in Streamlining Business Operations",
    excerpt: "How strategic support from Latin American EAs can enhance productivity and focus for leadership teams.",
    category: "Optimizing Operations & Scaling",
    date: randomDates[24],
    author: authors.sebastian.name,
    slug: "remote-executive-assistants-streamlining-operations",
    tags: ["executive assistants", "productivity", "leadership support"]
  },
  {
    id: 26,
    title: "The Future of Remote Work: Why Companies That Hire Internationally Win",
    excerpt: "Insights into emerging trends and the competitive advantages of building globally distributed teams.",
    category: "Optimizing Operations & Scaling",
    date: randomDates[25],
    author: authors.lucas.name,
    slug: "future-remote-work-international-hiring",
    tags: ["future of work", "global teams", "competitive advantage"]
  },
  {
    id: 27,
    title: "How to Set Up the Right Tech Stack for Managing Remote LATAM Teams",
    excerpt: "Essential tools and platforms to ensure seamless collaboration and productivity with your Latin American team members.",
    category: "Optimizing Operations & Scaling",
    date: randomDates[26],
    author: authors.sebastian.name,
    slug: "tech-stack-managing-remote-latam-teams",
    tags: ["tech stack", "remote tools", "team management"]
  },
  {
    id: 28,
    title: "How to Foster a Strong Company Culture with a Distributed Team",
    excerpt: "Strategies for building cohesion, engagement, and shared values across geographical boundaries.",
    category: "Optimizing Operations & Scaling",
    date: randomDates[27],
    author: authors.lucas.name,
    slug: "foster-company-culture-distributed-team",
    tags: ["company culture", "team building", "remote engagement"]
  },
  {
    id: 29,
    title: "Real Stories: How Companies Are Succeeding with LATAM Talent",
    excerpt: "Case studies of businesses that have transformed their operations and growth trajectory with Latin American professionals.",
    category: "Optimizing Operations & Scaling",
    date: randomDates[28],
    author: authors.sebastian.name,
    slug: "success-stories-companies-latam-talent",
    tags: ["case studies", "success stories", "business transformation"]
  },
  {
    id: 30,
    title: "Top HR Tools & Platforms for Managing International Remote Employees",
    excerpt: "A curated selection of software solutions to streamline the administration of your global workforce.",
    category: "Optimizing Operations & Scaling",
    date: randomDates[29],
    author: authors.gabriela.name,
    slug: "hr-tools-platforms-international-remote-employees",
    tags: ["HR tools", "software solutions", "remote management"]
  },

  // Remote Job Seeking - New Category for Job Seekers
  {
    id: 101,
    title: "How to Create a Standout Resume for US Remote Jobs: A Complete Guide",
    excerpt: "Learn how to craft a resume that catches the attention of US employers looking for remote LATAM talent, with templates and real examples that worked.",
    category: "Remote Job Seeking",
    date: randomDates[30],
    author: authors.sebastian.name,
    slug: "standout-resume-us-remote-jobs-guide",
    tags: ["resume writing", "remote jobs", "job application", "career development"]
  },
  {
    id: 102,
    title: "10 In-Demand Skills That US Companies Are Hiring For in 2024",
    excerpt: "Discover the most sought-after technical and soft skills that will make you attractive to US employers hiring remote talent from Latin America.",
    category: "Remote Job Seeking",
    date: randomDates[31],
    author: authors.lucas.name,
    slug: "in-demand-skills-us-companies-hiring-2024",
    tags: ["in-demand skills", "tech skills", "career skills", "remote work"]
  },
  {
    id: 103,
    title: "Mastering the Remote Job Interview: Tips from LATAM Professionals Who Got Hired",
    excerpt: "Real strategies and preparation techniques from Latin American professionals who successfully landed remote positions with US companies.",
    category: "Remote Job Seeking",
    date: randomDates[32],
    author: authors.maria.name,
    slug: "mastering-remote-job-interview-tips",
    tags: ["job interview", "remote interview", "interview preparation", "career advice"]
  },
  {
    id: 104,
    title: "Understanding US Work Culture: What LATAM Professionals Need to Know",
    excerpt: "Navigate cultural differences and workplace expectations to thrive in a US-based remote team as a Latin American professional.",
    category: "Remote Job Seeking",
    date: randomDates[33],
    author: authors.sebastian.name,
    slug: "understanding-us-work-culture-latam-professionals",
    tags: ["work culture", "cultural differences", "workplace expectations", "remote teams"]
  },
  {
    id: 105,
    title: "The Complete Guide to Remote Job Platforms for LATAM Talent",
    excerpt: "A comprehensive review of the best job boards, platforms, and communities where Latin American professionals can find legitimate remote opportunities with US companies.",
    category: "Remote Job Seeking",
    date: randomDates[34],
    author: authors.lucas.name,
    slug: "complete-guide-remote-job-platforms-latam",
    tags: ["job platforms", "job boards", "remote opportunities", "job search"]
  },
  {
    id: 106,
    title: "Setting Your Salary Expectations: How to Price Your Skills for the US Market",
    excerpt: "Learn how to research, calculate, and negotiate competitive compensation for remote roles with US companies while based in Latin America.",
    category: "Remote Job Seeking",
    date: randomDates[35],
    author: authors.sebastian.name,
    slug: "salary-expectations-pricing-skills-us-market",
    tags: ["salary negotiation", "compensation", "remote salary", "career advice"]
  },
  {
    id: 107,
    title: "Building a Professional Online Presence That Attracts US Employers",
    excerpt: "Step-by-step strategies to optimize your LinkedIn profile, portfolio, and digital footprint to get discovered by US companies hiring remote talent.",
    category: "Remote Job Seeking",
    date: randomDates[36],
    author: authors.lucas.name,
    slug: "professional-online-presence-attracts-us-employers",
    tags: ["personal branding", "LinkedIn optimization", "online portfolio", "professional networking"]
  },
  {
    id: 108,
    title: "The Legal Side of Remote Work: Contracts, Taxes, and Compliance for LATAM Professionals",
    excerpt: "Navigate the complexities of international remote work arrangements, including contract types, tax obligations, and legal considerations when working for US companies.",
    category: "Remote Job Seeking",
    date: randomDates[37],
    author: authors.gabriela.name,
    slug: "legal-side-remote-work-contracts-taxes-compliance",
    tags: ["remote work legalities", "contracts", "taxes", "compliance", "legal advice"]
  },
  {
    id: 109,
    title: "From Local to Global: Transitioning Your Career to Remote Work with US Companies",
    excerpt: "A practical roadmap for professionals currently working in local companies who want to pivot to remote opportunities with US employers.",
    category: "Remote Job Seeking",
    date: randomDates[38],
    author: authors.sebastian.name,
    slug: "local-to-global-transitioning-career-remote-work",
    tags: ["career transition", "remote work", "career development", "professional growth"]
  },
  {
    id: 110,
    title: "English Proficiency: How to Improve Your Language Skills for Remote US Jobs",
    excerpt: "Effective strategies and resources to enhance your English communication skills specifically for professional contexts and remote work environments.",
    category: "Remote Job Seeking",
    date: randomDates[39],
    author: authors.maria.name,
    slug: "english-proficiency-improve-language-skills-remote-jobs",
    tags: ["English skills", "language learning", "professional communication", "remote work"]
  },
  {
    id: 111,
    title: "Time Zone Management: Strategies for LATAM Professionals Working with US Teams",
    excerpt: "Practical tips for handling time zone differences, setting boundaries, and maintaining work-life balance when collaborating with US-based colleagues.",
    category: "Remote Job Seeking",
    date: randomDates[40],
    author: authors.sebastian.name,
    slug: "time-zone-management-strategies-latam-professionals",
    tags: ["time zone differences", "work-life balance", "remote collaboration", "productivity"]
  },
  {
    id: 112,
    title: "Remote Work Tools Mastery: The Software Stack You Need to Know",
    excerpt: "An overview of the essential tools and platforms used by US companies for remote collaboration, project management, and communication.",
    category: "Remote Job Seeking",
    date: randomDates[41],
    author: authors.lucas.name,
    slug: "remote-work-tools-mastery-software-stack",
    tags: ["remote tools", "productivity software", "collaboration tools", "tech skills"]
  },
  {
    id: 113,
    title: "Networking Strategies for LATAM Professionals Seeking US Remote Opportunities",
    excerpt: "How to build meaningful professional connections with US-based employers and decision-makers, even when geographically distant.",
    category: "Remote Job Seeking",
    date: randomDates[42],
    author: authors.sebastian.name,
    slug: "networking-strategies-latam-professionals-us-remote",
    tags: ["professional networking", "remote connections", "career development", "job search"]
  },
  {
    id: 114,
    title: "Overcoming Imposter Syndrome: Building Confidence as a LATAM Professional in Global Teams",
    excerpt: "Practical strategies to recognize and overcome feelings of inadequacy and build professional confidence when working with international teams.",
    category: "Remote Job Seeking",
    date: randomDates[43],
    author: authors.lucas.name,
    slug: "overcoming-imposter-syndrome-latam-professional-global-teams",
    tags: ["imposter syndrome", "professional confidence", "remote work", "career psychology"]
  },
  {
    id: 115,
    title: "Remote Work Portfolios: Showcasing Your Projects to Stand Out to US Employers",
    excerpt: "How to create an impressive portfolio that demonstrates your skills and experience in a way that resonates with US hiring managers.",
    category: "Remote Job Seeking",
    date: randomDates[44],
    author: authors.maria.name,
    slug: "remote-work-portfolios-showcasing-projects-us-employers",
    tags: ["portfolio development", "project showcase", "career branding", "job applications"]
  },
  {
    id: 116,
    title: "The Remote Job Application Timeline: What to Expect When Applying to US Companies",
    excerpt: "A detailed breakdown of the typical hiring process timeline when applying for remote positions with US companies, from application to onboarding.",
    category: "Remote Job Seeking",
    date: randomDates[45],
    author: authors.sebastian.name,
    slug: "remote-job-application-timeline-us-companies",
    tags: ["job application", "hiring process", "remote hiring", "career planning"]
  },
  {
    id: 117,
    title: "Remote Work Benefits and Perks: What LATAM Professionals Should Negotiate For",
    excerpt: "Beyond salary: understanding the additional benefits, perks, and allowances that remote workers should consider when evaluating job offers from US companies.",
    category: "Remote Job Seeking",
    date: randomDates[46],
    author: authors.lucas.name,
    slug: "remote-work-benefits-perks-latam-professionals-negotiate",
    tags: ["job benefits", "compensation negotiation", "remote work perks", "job offers"]
  },
  {
    id: 118,
    title: "Building a Remote Career Path: Long-term Growth Working with US Companies",
    excerpt: "Strategies for career advancement, skill development, and professional growth when working remotely for US employers from Latin America.",
    category: "Remote Job Seeking",
    date: randomDates[47],
    author: authors.sebastian.name,
    slug: "building-remote-career-path-long-term-growth",
    tags: ["career development", "professional growth", "remote career", "skill advancement"]
  },
  {
    id: 119,
    title: "Remote Job Red Flags: How to Identify and Avoid Scams Targeting LATAM Talent",
    excerpt: "Learn to recognize warning signs of fraudulent job postings and protect yourself from common scams targeting Latin American professionals seeking remote work.",
    category: "Remote Job Seeking",
    date: randomDates[48],
    author: authors.lucas.name,
    slug: "remote-job-red-flags-identify-avoid-scams",
    tags: ["job scams", "online safety", "remote work", "job search"]
  },
  {
    id: 120,
    title: "Specialized Remote Roles: Niche Opportunities for LATAM Professionals in US Companies",
    excerpt: "Explore lesser-known but high-demand specialized roles where Latin American professionals can find unique remote opportunities with US employers.",
    category: "Remote Job Seeking",
    date: randomDates[49],
    author: authors.maria.name,
    slug: "specialized-remote-roles-niche-opportunities-latam",
    tags: ["specialized careers", "niche roles", "remote opportunities", "career exploration"]
  },
  {
    id: 121,
    title: "Remote Work Productivity: Proven Strategies for LATAM Professionals",
    excerpt: "Effective techniques to maintain high productivity, focus, and work quality when working remotely for US companies from Latin America.",
    category: "Remote Job Seeking",
    date: randomDates[50],
    author: authors.sebastian.name,
    slug: "remote-work-productivity-strategies-latam-professionals",
    tags: ["productivity", "remote work habits", "focus techniques", "work efficiency"]
  },
  {
    id: 122,
    title: "The Role of Certifications: Which Credentials Actually Help LATAM Professionals Get Remote US Jobs",
    excerpt: "An analysis of which certifications and credentials are truly valued by US employers and worth the investment for Latin American professionals seeking remote work.",
    category: "Remote Job Seeking",
    date: randomDates[51],
    author: authors.lucas.name,
    slug: "role-certifications-credentials-latam-remote-us-jobs",
    tags: ["professional certifications", "credentials", "career development", "skill validation"]
  },
  {
    id: 123,
    title: "Remote Work Communication: Mastering Async Collaboration with US Teams",
    excerpt: "Strategies for effective asynchronous communication and collaboration when working across time zones with US-based teams.",
    category: "Remote Job Seeking",
    date: randomDates[52],
    author: authors.sebastian.name,
    slug: "remote-work-communication-async-collaboration-us-teams",
    tags: ["asynchronous communication", "remote collaboration", "team communication", "remote work"]
  },
  {
    id: 124,
    title: "Industry-Specific Remote Opportunities: Where LATAM Talent Is Most In Demand",
    excerpt: "A sector-by-sector analysis of which industries are most actively recruiting Latin American professionals for remote roles and why.",
    category: "Remote Job Seeking",
    date: randomDates[53],
    author: authors.lucas.name,
    slug: "industry-specific-remote-opportunities-latam-talent",
    tags: ["industry trends", "job market", "remote opportunities", "career sectors"]
  },
  {
    id: 125,
    title: "Remote Job Search Strategy: Creating a Systematic Approach to Finding US Opportunities",
    excerpt: "A methodical framework for organizing your remote job search to maximize efficiency and results when targeting US companies.",
    category: "Remote Job Seeking",
    date: randomDates[54],
    author: authors.sebastian.name,
    slug: "remote-job-search-strategy-systematic-approach",
    tags: ["job search strategy", "career planning", "remote opportunities", "job hunting"]
  },
  {
    id: 126,
    title: "Remote Work Setup: Creating an Optimal Home Office for Success with US Employers",
    excerpt: "Practical guidance on creating a productive, professional home office environment that meets the expectations of US remote employers.",
    category: "Remote Job Seeking",
    date: randomDates[55],
    author: authors.lucas.name,
    slug: "remote-work-setup-optimal-home-office-success",
    tags: ["home office", "remote workspace", "productivity environment", "remote work"]
  },
  {
    id: 127,
    title: "Freelance vs. Full-Time: Choosing the Right Remote Work Model with US Companies",
    excerpt: "Compare the pros and cons of different remote work arrangements to determine which model best fits your career goals and lifestyle.",
    category: "Remote Job Seeking",
    date: randomDates[56],
    author: authors.sebastian.name,
    slug: "freelance-vs-full-time-remote-work-model-us-companies",
    tags: ["freelancing", "full-time employment", "remote work models", "career decisions"]
  },
  {
    id: 128,
    title: "Remote Work Success Stories: LATAM Professionals Thriving in US Companies",
    excerpt: "Inspiring case studies of Latin American professionals who have built successful remote careers with US employers, with actionable lessons from their journeys.",
    category: "Remote Job Seeking",
    date: randomDates[57],
    author: authors.lucas.name,
    slug: "remote-work-success-stories-latam-professionals-us-companies",
    tags: ["success stories", "career inspiration", "remote work", "professional journeys"]
  },
  {
    id: 129,
    title: "The Future of Remote Work for LATAM Professionals: Trends and Opportunities",
    excerpt: "An analysis of emerging trends, technologies, and opportunities that will shape the future of remote work for Latin American professionals in US companies.",
    category: "Remote Job Seeking",
    date: randomDates[58],
    author: authors.sebastian.name,
    slug: "future-remote-work-latam-professionals-trends-opportunities",
    tags: ["future of work", "remote trends", "career forecasting", "work evolution"]
  },
  {
    id: 130,
    title: "Remote Work-Life Balance: Sustainable Practices for LATAM Professionals",
    excerpt: "Strategies for maintaining healthy boundaries, preventing burnout, and creating sustainable work-life integration when working remotely for US companies.",
    category: "Remote Job Seeking",
    date: randomDates[59],
    author: authors.lucas.name,
    slug: "remote-work-life-balance-sustainable-practices-latam",
    tags: ["work-life balance", "burnout prevention", "remote work wellness", "professional sustainability"]
  },

  // Remote Team Management
  {
    id: 21,
    title: "Building a Strong Company Culture with Distributed LATAM Teams",
    excerpt: "Strategies for fostering connection, collaboration, and shared values across borders and time zones.",
    category: "Remote Team Management",
    date: randomDates[20],
    author: authors.sebastian.name,
    slug: "building-company-culture-distributed-teams",
    tags: ["company culture", "distributed teams", "team building", "remote collaboration", "organizational values"]
  },
  {
    id: 22,
    title: "Effective Communication Strategies for Managing Remote LATAM Teams",
    excerpt: "Best practices for clear, efficient communication that bridges cultural and geographical distances.",
    category: "Remote Team Management",
    date: randomDates[21],
    author: authors.lucas.name,
    slug: "communication-strategies-remote-teams",
    tags: ["communication", "remote management", "team collaboration", "cultural awareness", "productivity tools"]
  },
  {
    id: 23,
    title: "Time Zone Management: Maximizing Productivity with LATAM Teams",
    excerpt: "Practical approaches to scheduling, collaboration, and workflow optimization across different time zones.",
    category: "Remote Team Management",
    date: randomDates[22],
    author: authors.sebastian.name,
    slug: "time-zone-management-latam-teams",
    tags: ["time zones", "productivity", "workflow optimization", "scheduling", "global collaboration"]
  },
  {
    id: 24,
    title: "Performance Management for Remote LATAM Employees",
    excerpt: "Frameworks for setting expectations, providing feedback, and evaluating performance in a remote context.",
    category: "Remote Team Management",
    date: randomDates[23],
    author: authors.lucas.name,
    slug: "performance-management-remote-employees",
    tags: ["performance management", "employee evaluation", "feedback", "remote leadership", "team development"]
  },
  {
    id: 25,
    title: "Tools and Technologies for Seamless Remote Collaboration",
    excerpt: "A curated selection of software and platforms that facilitate productive teamwork across borders.",
    category: "Remote Team Management",
    date: randomDates[24],
    author: authors.sebastian.name,
    slug: "tools-technologies-remote-collaboration",
    tags: ["collaboration tools", "remote work technology", "productivity software", "digital workplace", "team communication"]
  },
  {
    id: 26,
    title: "Creating Effective Onboarding Processes for Remote LATAM Hires",
    excerpt: "A step-by-step guide to welcoming and integrating new team members in a virtual environment.",
    category: "Remote Team Management",
    date: randomDates[25],
    author: authors.lucas.name,
    slug: "onboarding-processes-remote-hires",
    tags: ["onboarding", "remote integration", "employee experience", "team culture", "new hire success"]
  },
  {
    id: 27,
    title: "Managing Cross-Cultural Teams: Bridging the Gap Between U.S. and LATAM Work Styles",
    excerpt: "Insights into cultural differences and strategies for creating a harmonious, productive multicultural team.",
    category: "Remote Team Management",
    date: randomDates[26],
    author: authors.sebastian.name,
    slug: "managing-cross-cultural-teams",
    tags: ["cross-cultural management", "cultural intelligence", "diverse teams", "global leadership", "workplace harmony"]
  },
  {
    id: 28,
    title: "Remote Team Building Activities That Actually Work",
    excerpt: "Creative ideas for fostering connection, trust, and camaraderie among team members who never meet in person.",
    category: "Remote Team Management",
    date: randomDates[27],
    author: authors.lucas.name,
    slug: "remote-team-building-activities",
    tags: ["team building", "remote engagement", "virtual activities", "team morale", "workplace connection"]
  },
  {
    id: 29,
    title: "Conflict Resolution in Remote LATAM Teams",
    excerpt: "Approaches to identifying, addressing, and resolving conflicts in a distributed work environment.",
    category: "Remote Team Management",
    date: randomDates[28],
    author: authors.lucas.name,
    slug: "conflict-resolution-remote-teams",
    tags: ["conflict resolution", "team dynamics", "remote management", "communication skills", "workplace harmony"]
  },
  {
    id: 30,
    title: "How to Conduct Effective Virtual Meetings with Your LATAM Team",
    excerpt: "Best practices for planning, facilitating, and following up on remote meetings that drive results.",
    category: "Remote Team Management",
    date: randomDates[29],
    author: authors.sebastian.name,
    slug: "effective-virtual-meetings",
    tags: ["virtual meetings", "remote facilitation", "meeting productivity", "team communication", "collaboration techniques"]
  },
  {
    id: 70,
    title: "Remote Work Wellness: Mental Health Strategies for LATAM Professionals",
    excerpt: "Discover effective mental health practices for remote workers and how to maintain wellbeing while working from home.",
    category: "Remote Job Seeking",
    date: randomDates[69],
    author: authors.maria.name,
    slug: "remote-work-wellness-mental-health-strategies",
    tags: ["mental health", "remote wellness", "work-life balance", "self-care", "professional wellbeing"]
  }
];

// Helper function to get author by name
export const getAuthorByName = (name: string) => {
  const authorKey = Object.keys(authors).find(key => authors[key as keyof typeof authors].name === name);
  return authorKey ? authors[authorKey as keyof typeof authors] : authors.sebastian;
}; 