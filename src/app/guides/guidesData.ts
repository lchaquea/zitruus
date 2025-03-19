// Guide data structure
export interface Guide {
  id: number;
  title: string;
  country: string;
  slug: string;
  excerpt: string;
  sections: GuideSection[];
  metaTitle: string;
  metaDescription: string;
  lastUpdated: string;
}

export interface GuideSection {
  title: string;
  content: string;
  subsections?: GuideSubsection[];
}

export interface GuideSubsection {
  title: string;
  content: string;
}

// Guides data
export const guides: Guide[] = [
  // Colombia Hiring Guide
  {
    id: 1,
    title: "Complete Guide to Hiring in Colombia",
    country: "Colombia",
    slug: "hiring-in-colombia",
    excerpt: "Everything US companies need to know about hiring remote talent in Colombia, including legal requirements, costs, benefits, and best practices.",
    metaTitle: "How to Hire in Colombia: Complete Guide for US Companies [2024]",
    metaDescription: "Learn how to hire remote talent in Colombia with our comprehensive guide covering legal requirements, costs, benefits, and best practices for US companies.",
    lastUpdated: "May 1, 2024",
    sections: [
      {
        title: "Colombia Overview",
        content: "Colombia has emerged as a leading destination for US companies seeking remote talent in Latin America. With a growing tech ecosystem, high English proficiency, and timezone alignment with the US, Colombian professionals offer exceptional value for companies looking to build distributed teams.",
        subsections: [
          {
            title: "Key Facts",
            content: "• Population: 51.5 million\n• Language: Spanish (official), English literacy ranked 17th in Latin America\n• Currency: Colombian Peso (COP), 1 USD = 4,153.54 COP (May 2024)\n• Time Zone: UTC -5 (same as US Eastern Time)\n• Hub Cities: Bogotá, Medellín, Cali, Barranquilla, Cartagena\n• Public Holidays: 18 days per year"
          },
          {
            title: "Top Sectors",
            content: "• Technology (IT) & Software Development\n• Digital Marketing & Marketing Services\n• Healthcare & Telemedicine\n• Logistics & Supply Chain Management"
          }
        ]
      },
      {
        title: "What Does a Company Need to Hire Employees in Colombia?",
        content: "To hire in Colombia, you need a legal entity or an Employer of Record (EOR). Employers must comply with employment laws, register for social security contributions, and contribute to family compensation funds as required by law.",
        subsections: [
          {
            title: "What Is an Employer of Record (EOR)?",
            content: "An EOR hires employees on your behalf, handling payroll taxes, onboarding, and compliance. This lets you hire in Colombia without setting up a local entity—fast, risk-free expansion."
          },
          {
            title: "How to Use an Employer of Record (EOR) in Colombia?",
            content: "An EOR takes care of legal contracts, payroll, and benefits, so you can hire talent without dealing with time-consuming bureaucracy. Perfect for short-term needs or testing the market."
          }
        ]
      },
      {
        title: "Labor Costs in Colombia vs. USA",
        content: "When hiring remote workers or contractors in Colombia, U.S. companies can enjoy significant savings and greater workforce flexibility, improving operations and stimulating business growth.",
        subsections: [
          {
            title: "Salary Comparison",
            content: "• Technology and Data: $20-45K in Colombia vs. $80-120K in USA (Up to 63% savings)\n• Marketing and Sales: $15-35K in Colombia vs. $50-100K in USA (Up to 65% savings)\n• Finance and Accounting: $18-40K in Colombia vs. $70-110K in USA (Up to 64% savings)\n• Human Resources: $10-25K in Colombia vs. $40-80K in USA (Up to 69% savings)"
          },
          {
            title: "Minimum Wage Requirements",
            content: "Yes. The minimum wage is COP 1,300,000 (~$330 USD) per month, plus a mandatory transportation allowance. This applies to full-time employees under indefinite contracts."
          }
        ]
      },
      {
        title: "Remote Roles to Hire in Colombia",
        content: "When considering remote hiring in Colombia, certain roles are particularly suitable for remote work, such as:",
        subsections: [
          {
            title: "Popular Remote Roles",
            content: "• Software Developers and Engineers\n• Business Development Representatives\n• Product Managers\n• Customer Success Managers\n• Product Designers\n• Marketing Managers\n• Accounting Managers\n• Technical Recruiters\n• Data Scientists\n• Content Writers"
          }
        ]
      },
      {
        title: "How to Pay Talent in Colombia",
        content: "Paying remote Colombian employees as a U.S. company involves navigating fluctuating exchange rates (between 3,822 and 3,975 COP in 2024), Colombia's banking system, and adhering to the regulations of both countries:",
        subsections: [
          {
            title: "Payment Methods",
            content: "• Bank transfers: A direct and simple payment method to any personal bank account, but they may involve high fees and longer processing times.\n• PayPal: Offers fast and secure international transactions, but it may have relatively high fees and unfavorable exchange rates.\n• Payoneer: This platform provides online money transfer and digital payment services. Payoneer is often used for freelancer and contractor payments.\n• Global payroll providers: Deel, Ontop, and Oyster offer competitive exchange rates, lower fees, faster processing times, and transparent fee structures.\n• Cryptocurrencies: Cryptocurrencies such as Bitcoin or Ethereum offer decentralization and potentially lower fees, but they come with volatility risks and may have regulatory uncertainties."
          }
        ]
      },
      {
        title: "Holidays in Colombia 2024",
        content: "To ensure respect for the culture and diversity of your Colombian team, it is important to consider providing days off on the following 18 national holidays:",
        subsections: [
          {
            title: "Official Holidays",
            content: "• January 1: New Year\n• January 8: Epiphany Holiday\n• March 25: Saint Joseph's Day\n• March 28: Maundy Thursday\n• March 29: Good Friday\n• May 1: Labor Day\n• May 13: Ascension Day\n• June 3: Corpus Christi\n• June 10: Sacred Heart\n• July 1: Saints Peter and Paul's Day\n• July 20: Declaration of Independence\n• August 7: Battle of Boyacá\n• August 19: Assumption Day\n• October 14: Day of Races\n• November 4: All Saints Day\n• November 11: Independence of Cartagena\n• December 8: Immaculate Conception Day\n• December 25: Christmas"
          }
        ]
      },
      {
        title: "Colombian Labor Laws and Employee Benefits",
        content: "Understanding Colombian labor laws is essential for compliant hiring. Here are the key regulations and benefits you need to know:",
        subsections: [
          {
            title: "Working Hours",
            content: "• Standard work week: 48 hours (8 hours per day, 6 days per week)\n• Overtime: Must be paid at 125% of regular rate on weekdays and 175% on Sundays/holidays\n• Night work (10 PM to 6 AM): Paid at 135% of regular rate"
          },
          {
            title: "Mandatory Benefits",
            content: "• Vacation: 15 working days per year after 1 year of service\n• Bonus (Prima): 30 days of salary paid in two installments (June and December)\n• Severance pay (Cesantías): 1 month's salary per year, deposited to a fund by February 14\n• Interest on severance: 12% annual interest on severance, paid directly to employee\n• Health insurance: Employer contributes 8.5% of salary, employee 4%\n• Pension: Employer contributes 12% of salary, employee 4%\n• Professional risk insurance: 0.348% to 8.7% of salary (depending on risk level)\n• Family compensation fund: 4% of payroll"
          },
          {
            title: "Termination and Notice Periods",
            content: "• Fixed-term contracts: No notice required if terminated at end of term\n• Indefinite contracts: Notice period varies based on tenure (15-30 days)\n• Severance for unjustified dismissal: Varies from 20 to 30 days' salary per year of service, depending on salary level\n• Justified dismissal: No severance required but must follow proper procedures"
          }
        ]
      },
      {
        title: "How to Hire Remote Talent in Colombia",
        content: "When considering recruiting talent in Colombia, it is crucial to understand the different options available and the legal implications involved. Here are three effective ways to hire employees in Colombia:",
        subsections: [
          {
            title: "1. Contractor",
            content: "Choose contractors for flexibility and potential savings, but be aware of legal complexities in Colombia. Our tailored approach ensures compliance and seamless contractor hiring."
          },
          {
            title: "2. Staffing Model",
            content: "Partner with us to streamline recruitment and HR tasks, offering an efficient and scalable solution for global expansion. We help you hire top LatAm talent—fast and risk-free. Our staffing service includes recruiting to find the best candidates, while we handle employment, payroll, and compliance, so you get the talent without the admin."
          },
          {
            title: "3. EOR (Employer of Record)",
            content: "Delegate formal employment management, including payroll, tax obligations, benefits, and compliance, to us. This allows you to focus on your core business while we handle all the administrative and legal aspects of employment in Colombia."
          }
        ]
      }
    ]
  },
  
  // Mexico Hiring Guide
  {
    id: 2,
    title: "Complete Guide to Hiring in Mexico",
    country: "Mexico",
    slug: "hiring-in-mexico",
    excerpt: "Everything US companies need to know about hiring remote talent in Mexico, including legal requirements, costs, benefits, and best practices.",
    metaTitle: "How to Hire in Mexico: Complete Guide for US Companies [2024]",
    metaDescription: "Learn how to hire remote talent in Mexico with our comprehensive guide covering legal requirements, costs, benefits, and best practices for US companies.",
    lastUpdated: "May 1, 2024",
    sections: [
      {
        title: "Mexico Overview",
        content: "Mexico offers US companies a unique combination of proximity, cultural alignment, and a robust talent pool. With strong technical education and improving English proficiency, Mexican professionals provide excellent value for companies building remote teams.",
        subsections: [
          {
            title: "Key Facts",
            content: "• Population: 130 million\n• Language: Spanish (official), English proficiency improving rapidly\n• Currency: Mexican Peso (MXN), 1 USD = 16.85 MXN (May 2024)\n• Time Zone: UTC -6 (Central) and UTC -7 (Pacific)\n• Hub Cities: Mexico City, Guadalajara, Monterrey, Tijuana, Querétaro\n• Public Holidays: 7 mandatory holidays plus 5 civic holidays"
          },
          {
            title: "Top Sectors",
            content: "• Technology & Software Development\n• Manufacturing & Engineering\n• Financial Services & Fintech\n• Customer Support & BPO\n• Creative Industries & Design"
          }
        ]
      },
      {
        title: "What Does a Company Need to Hire Employees in Mexico?",
        content: "To hire employees in Mexico, companies typically need a legal entity or an Employer of Record (EOR) service. Direct employment requires compliance with Mexico's Federal Labor Law (Ley Federal del Trabajo) and registration with various government agencies.",
        subsections: [
          {
            title: "What Is an Employer of Record (EOR)?",
            content: "An EOR acts as the legal employer for your workers in Mexico, handling all compliance, payroll, and HR responsibilities while you maintain day-to-day management. This allows you to hire without establishing a legal entity in Mexico."
          },
          {
            title: "How to Use an Employer of Record (EOR) in Mexico?",
            content: "An EOR solution enables quick market entry and compliant hiring in Mexico without the complexity of entity setup. The EOR handles all employment contracts, payroll processing, tax withholding, and mandatory benefits administration."
          }
        ]
      },
      {
        title: "Labor Costs in Mexico vs. USA",
        content: "Mexico offers significant cost advantages for US companies, with total employment costs typically 40-70% lower than equivalent positions in the United States.",
        subsections: [
          {
            title: "Salary Comparison",
            content: "• Software Development: $18-40K in Mexico vs. $70-120K in USA (Up to 67% savings)\n• Customer Service: $10-20K in Mexico vs. $35-55K in USA (Up to 64% savings)\n• Marketing: $15-35K in Mexico vs. $50-90K in USA (Up to 61% savings)\n• Finance & Accounting: $15-35K in Mexico vs. $60-100K in USA (Up to 65% savings)"
          },
          {
            title: "Minimum Wage Requirements",
            content: "Yes. Mexico has a daily minimum wage that varies by region. As of 2024, the general minimum wage is 248.93 pesos per day (approximately $15 USD) and 375.17 pesos per day (approximately $22 USD) in the Northern Border Free Zone."
          }
        ]
      },
      {
        title: "Remote Roles to Hire in Mexico",
        content: "Mexico's talent pool is particularly strong in certain areas that align well with remote work arrangements:",
        subsections: [
          {
            title: "Popular Remote Roles",
            content: "• Software Engineers & Developers\n• QA & Testing Specialists\n• Customer Support Representatives\n• Graphic Designers & UI/UX Professionals\n• Digital Marketers\n• Financial Analysts\n• Project Managers\n• Technical Support Specialists\n• Content Creators & Translators\n• Sales Representatives"
          }
        ]
      },
      {
        title: "How to Pay Talent in Mexico",
        content: "When paying Mexican employees or contractors, US companies need to navigate local banking systems, currency exchange, and compliance requirements:",
        subsections: [
          {
            title: "Payment Methods",
            content: "• Direct bank transfers: Standard method for employees, using SPEI (Mexico's electronic transfer system)\n• International wire transfers: Common for contractor payments but may involve high fees\n• Digital payment platforms: Services like Wise, PayPal, or Payoneer offer alternatives with varying fee structures\n• Global payroll providers: Comprehensive solutions handling currency conversion, compliance, and payments\n• Cryptocurrency: Emerging option with growing adoption in Mexico's tech sector"
          }
        ]
      },
      {
        title: "Holidays in Mexico 2024",
        content: "Mexican labor law establishes mandatory paid holidays that employers must observe:",
        subsections: [
          {
            title: "Official Holidays",
            content: "• January 1: New Year's Day\n• February 5: Constitution Day (observed on first Monday in February)\n• March 18: Benito Juárez's Birthday (observed on third Monday in March)\n• May 1: Labor Day\n• September 16: Independence Day\n• November 20: Revolution Day (observed on third Monday in November)\n• December 25: Christmas Day\n\nAdditional important dates (not mandatory but commonly observed):\n• February 24: Flag Day\n• May 5: Battle of Puebla (Cinco de Mayo)\n• May 10: Mother's Day\n• November 1-2: Day of the Dead\n• December 12: Day of the Virgin of Guadalupe"
          }
        ]
      },
      {
        title: "Mexican Labor Laws and Employee Benefits",
        content: "Mexico has comprehensive labor laws that provide significant protections and benefits to employees:",
        subsections: [
          {
            title: "Working Hours",
            content: "• Standard work week: 48 hours (day shift), 42 hours (night shift), or 45 hours (mixed shift)\n• Overtime: First 9 hours paid at 200% of regular rate, additional hours at 300%\n• Rest days: At least one full day per week (typically Sunday)\n• Meal breaks: Minimum 30 minutes (not counted as work time)"
          },
          {
            title: "Mandatory Benefits",
            content: "• Vacation: 12 days minimum after 1 year, increasing by 2 days per additional year up to 5 years\n• Vacation premium: 25% additional payment on vacation days\n• Aguinaldo (Christmas bonus): Minimum 15 days' salary, paid by December 20\n• Profit sharing: 10% of company's taxable income distributed among employees\n• Social security (IMSS): Covers healthcare, disability, retirement\n• Housing fund (INFONAVIT): 5% of salary contributed by employer\n• Retirement savings (SAR): Employer contributions to individual retirement accounts"
          },
          {
            title: "Termination and Notice Periods",
            content: "• Justified termination: No severance required but must be for causes specified in law\n• Unjustified termination: Requires payment of 3 months' salary plus 20 days per year of service\n• Seniority premium: 12 days' salary per year of service (capped at twice the minimum wage)\n• Notice period: Not legally required but 30 days is common practice\n• Resignation: Employees can resign at any time without notice"
          }
        ]
      },
      {
        title: "How to Hire Remote Talent in Mexico",
        content: "There are several approaches to hiring in Mexico, each with different implications for compliance, cost, and operational control:",
        subsections: [
          {
            title: "1. Contractor Arrangement",
            content: "Engaging independent contractors offers flexibility but carries misclassification risks under Mexican law. Proper contracts and documentation are essential to establish genuine contractor relationships."
          },
          {
            title: "2. Staffing Services",
            content: "Our staffing solution provides end-to-end talent acquisition and employment management. We handle recruiting, screening, hiring, and ongoing HR administration while you focus on managing your team's work."
          },
          {
            title: "3. Employer of Record (EOR)",
            content: "Our EOR service provides full employment compliance without entity setup. We become the legal employer in Mexico, handling all payroll, benefits, and tax obligations while you maintain day-to-day management of your team members."
          }
        ]
      }
    ]
  },
  
  // Argentina Hiring Guide
  {
    id: 3,
    title: "Complete Guide to Hiring in Argentina",
    country: "Argentina",
    slug: "hiring-in-argentina",
    excerpt: "Everything US companies need to know about hiring remote talent in Argentina, including legal requirements, costs, benefits, and best practices.",
    metaTitle: "How to Hire in Argentina: Complete Guide for US Companies [2024]",
    metaDescription: "Learn how to hire remote talent in Argentina with our comprehensive guide covering legal requirements, costs, benefits, and best practices for US companies.",
    lastUpdated: "May 1, 2024",
    sections: [
      {
        title: "Argentina Overview",
        content: "Argentina boasts one of Latin America's most educated workforces, with strong technical skills and high English proficiency. Despite economic challenges, the country offers exceptional talent at competitive rates for US companies.",
        subsections: [
          {
            title: "Key Facts",
            content: "• Population: 45.8 million\n• Language: Spanish (official), English proficiency ranked 1st in Latin America\n• Currency: Argentine Peso (ARS), highly volatile exchange rate\n• Time Zone: UTC -3 (2 hours ahead of US Eastern Time)\n• Hub Cities: Buenos Aires, Córdoba, Mendoza, Rosario\n• Public Holidays: 19 days per year"
          },
          {
            title: "Top Sectors",
            content: "• Technology & Software Development\n• Creative Industries & Design\n• Digital Marketing & Content Creation\n• Financial Services & Fintech\n• Education & E-learning"
          }
        ]
      },
      {
        title: "What Does a Company Need to Hire Employees in Argentina?",
        content: "Hiring employees in Argentina typically requires a legal entity or an Employer of Record (EOR) service. Direct employment involves complex labor regulations, mandatory benefits, and registration with multiple government agencies.",
        subsections: [
          {
            title: "What Is an Employer of Record (EOR)?",
            content: "An EOR serves as the legal employer for your workers in Argentina, managing all compliance, payroll, and HR responsibilities. This allows you to hire without establishing a local entity, avoiding the complexity of Argentina's labor system."
          },
          {
            title: "How to Use an Employer of Record (EOR) in Argentina?",
            content: "An EOR solution enables compliant hiring in Argentina without entity setup. The EOR handles employment contracts, payroll processing, tax withholding, and mandatory benefits, while you maintain operational control of your team members."
          }
        ]
      },
      {
        title: "Labor Costs in Argentina vs. USA",
        content: "Argentina offers significant cost advantages for US companies, particularly given the country's economic situation and currency devaluation. However, mandatory benefits and contributions add approximately 40-50% to base salaries.",
        subsections: [
          {
            title: "Salary Comparison",
            content: "• Software Development: $15-35K in Argentina vs. $70-120K in USA (Up to 71% savings)\n• Design & Creative: $12-25K in Argentina vs. $50-90K in USA (Up to 72% savings)\n• Marketing & Content: $10-30K in Argentina vs. $50-90K in USA (Up to 67% savings)\n• Finance & Accounting: $15-30K in Argentina vs. $60-100K in USA (Up to 70% savings)"
          },
          {
            title: "Minimum Wage Requirements",
            content: "Yes. Argentina has a monthly minimum wage (Salario Mínimo, Vital y Móvil) that is frequently adjusted due to inflation. As of May 2024, it stands at approximately $350 USD equivalent, though this value fluctuates with exchange rates."
          }
        ]
      },
      {
        title: "Remote Roles to Hire in Argentina",
        content: "Argentina's talent pool is particularly strong in creative and technical fields that are well-suited to remote work:",
        subsections: [
          {
            title: "Popular Remote Roles",
            content: "• Software Engineers & Developers\n• UX/UI Designers\n• Digital Marketing Specialists\n• Content Writers & Translators\n• Data Scientists & Analysts\n• Financial Analysts\n• Project Managers\n• Creative Directors\n• E-learning Specialists\n• Customer Success Managers"
          }
        ]
      },
      {
        title: "How to Pay Talent in Argentina",
        content: "Paying Argentine employees or contractors presents unique challenges due to currency restrictions, high inflation, and complex banking regulations:",
        subsections: [
          {
            title: "Payment Methods",
            content: "• Local bank transfers: Standard for employees but subject to currency controls\n• International wire transfers: Subject to restrictions and unfavorable exchange rates\n• Digital payment platforms: Services like Wise, PayPal, or Payoneer offer alternatives but may have limitations\n• Cryptocurrency: Increasingly popular due to currency restrictions and inflation concerns\n• Global payroll providers: Comprehensive solutions navigating Argentina's complex financial landscape"
          }
        ]
      },
      {
        title: "Holidays in Argentina 2024",
        content: "Argentina has numerous public holidays that employers must observe:",
        subsections: [
          {
            title: "Official Holidays",
            content: "• January 1: New Year's Day\n• February 12-13: Carnival\n• March 24: Day of Remembrance\n• April 2: Malvinas Day\n• April 18-19: Easter Thursday and Good Friday\n• May 1: Labor Day\n• May 25: May Revolution Day\n• June 17: Martin Miguel de Güemes Day\n• June 20: Flag Day\n• July 9: Independence Day\n• August 17: Death of General José de San Martín\n• October 12: Day of Respect for Cultural Diversity\n• November 20: National Sovereignty Day\n• December 8: Immaculate Conception Day\n• December 25: Christmas Day"
          }
        ]
      },
      {
        title: "Argentine Labor Laws and Employee Benefits",
        content: "Argentina has some of Latin America's most protective labor laws, with significant mandatory benefits and strong worker protections:",
        subsections: [
          {
            title: "Working Hours",
            content: "• Standard work week: 48 hours maximum\n• Overtime: First hour at 150% of regular rate, additional hours and weekends/holidays at 200%\n• Rest periods: Minimum 12 hours between workdays\n• Meal breaks: Typically 30-60 minutes (not counted as work time)"
          },
          {
            title: "Mandatory Benefits",
            content: "• Vacation: 14 calendar days (1-5 years of service), 21 days (5-10 years), 28 days (10-20 years), 35 days (20+ years)\n• Aguinaldo (13th month): Paid in two installments (June and December)\n• Social security: Approximately 27% of salary contributed by employer\n• Health insurance (Obra Social): Employer and employee contributions\n• Family allowances: Various subsidies for employees with children\n• Sick leave: Paid leave for up to 3-12 months depending on seniority and family status\n• Maternity leave: 90 days fully paid\n• Paternity leave: 2-15 days depending on collective bargaining agreements"
          },
          {
            title: "Termination and Notice Periods",
            content: "• Notice period: 15 days during probation, 1 month (< 5 years service), 2 months (5+ years service)\n• Severance: 1 month's salary per year of service (minimum 1 month)\n• Unused vacation: Compensation for accrued, unused vacation days\n• Proportional 13th month: Prorated portion of the biannual bonus\n• Integration month: Salary for the month in which termination occurs"
          }
        ]
      },
      {
        title: "How to Hire Remote Talent in Argentina",
        content: "There are several approaches to hiring in Argentina, each with different implications for compliance, cost, and operational control:",
        subsections: [
          {
            title: "1. Contractor Arrangement",
            content: "Engaging independent contractors offers flexibility but carries significant misclassification risks under Argentine law. Proper documentation and genuine independence are essential to establish valid contractor relationships."
          },
          {
            title: "2. Staffing Services",
            content: "Our staffing solution provides end-to-end talent acquisition and employment management. We handle recruiting, screening, hiring, and ongoing HR administration while you focus on managing your team's work."
          },
          {
            title: "3. Employer of Record (EOR)",
            content: "Our EOR service provides full employment compliance without entity setup. We become the legal employer in Argentina, handling all payroll, benefits, and tax obligations while you maintain day-to-day management of your team members."
          }
        ]
      }
    ]
  }
]; 