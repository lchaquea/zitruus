'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Link from 'next/link';
import { Calendar, User, Tag, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import Image from 'next/image';
import CalendlyButton from './CalendlyButton';
import { BlogPost } from '../blog/types';
import { blogPosts } from '../blog/blogData';
import BlogCrossReferences from './BlogCrossReferences';
import InContentReference from './InContentReference';
import CompactCrossReferences from './CompactCrossReferences';
import InlineReference from './InlineReference';
import Breadcrumbs from './Breadcrumbs';
import TableOfContents from './TableOfContents';
import SocialShareButtons from './SocialShareButtons';
import RelatedPosts from './RelatedPosts';
import { getReadingTime } from '../utils/readingTime';
import { 
  calculateContentSimilarity, 
  findSeriesPosts, 
  findContextualRelatedPosts, 
  getBidirectionalReferences 
} from '../utils/contentSimilarity';
import { Twitter, Linkedin, Facebook, Link as LinkIcon, Mail, Phone } from 'lucide-react';
import { useCalendly } from '../hooks/useCalendly';

interface Author {
  name: string;
  image: string;
  role: string;
  bio: string;
}

interface BlogPostContentProps {
  post: BlogPost;
  author: Author;
}

export default function BlogPostContent({ post, author }: BlogPostContentProps) {
  const controls = useAnimation();
  const { openCalendly } = useCalendly();
  
  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Calculate reading time with a more realistic estimate for blog posts
  // Most blog posts take at least 3-5 minutes to read thoroughly
  const readingTime = post.readingTime || getReadingTime(
    `${post.title} ${post.excerpt} ${post.category} ${post.tags.join(' ')} 
     Introduction Why LATAM Talent Stands Out Unique Insights Actionable Strategies 
     How Zitruus Can Help Getting Started Conclusion`,
    // Use a slightly lower words per minute for more realistic estimates
    180
  );

  // Generate blog content based on the post title and category
  const generateBlogContent = () => {
    // Content variables
    let hookQuestion = "";
    let introduction = "";
    let mainContent = "";
    let uniqueInsights = "";
    let actionableSteps = "";
    let conclusion = "";
    let statistics: Array<{figure: string, description: string}> = [];
    let relatedServices: Array<{name: string, url: string, description: string}> = [];
    
    // Find related posts for in-content references
    const seriesPosts = findSeriesPosts(post, blogPosts);
    const hiringRelatedPosts = findContextualRelatedPosts(post, blogPosts, 'hiring');
    const complianceRelatedPosts = findContextualRelatedPosts(post, blogPosts, 'compliance');
    const managementRelatedPosts = findContextualRelatedPosts(post, blogPosts, 'management');
    const operationsRelatedPosts = findContextualRelatedPosts(post, blogPosts, 'operations');
    const remoteWorkRelatedPosts = findContextualRelatedPosts(post, blogPosts, 'remote-work');
    const bidirectionalPosts = getBidirectionalReferences(post, blogPosts);
    
    // Determine related services based on category
    if (post.category === "Remote Hiring & Talent Acquisition") {
      relatedServices = [
        { name: "Talent Matching", url: "/services/recruitment", description: "Find the perfect LATAM talent for your specific needs" },
        { name: "Employer of Record", url: "/services/eor", description: "Hire without establishing a legal entity" }
      ];
    } else if (post.category === "HR, Payroll, & Compliance") {
      relatedServices = [
        { name: "Payroll Management", url: "/services/payroll", description: "Hassle-free international payroll services" },
        { name: "HR Management", url: "/services/hr-management", description: "Comprehensive HR support for your LATAM team" }
      ];
    } else if (post.category === "Optimizing Operations & Scaling") {
      relatedServices = [
        { name: "Performance Management", url: "/services/performance", description: "Optimize your team's productivity and results" },
        { name: "Talent Matching", url: "/services/recruitment", description: "Scale your team with the right LATAM professionals" }
      ];
    } else if (post.category === "Remote Team Management") {
      relatedServices = [
        { name: "Performance Management", url: "/services/performance", description: "Tools and strategies for remote team success" },
        { name: "HR Management", url: "/services/hr-management", description: "Support your remote team with effective HR practices" }
      ];
    } else {
      relatedServices = [
        { name: "Talent Matching", url: "/services/recruitment", description: "Find the perfect LATAM talent for your specific needs" },
        { name: "Employer of Record", url: "/services/eor", description: "Hire without establishing a legal entity" }
      ];
    }
    
    // Generate statistics based on tags
    if (post.tags.some(tag => ["cost savings", "cost reduction", "financial planning"].includes(tag))) {
      statistics.push({ figure: "40-70%", description: "Average cost savings when hiring LATAM talent compared to US-based professionals" });
      statistics.push({ figure: "80%", description: "Reduction in back-office costs reported by companies leveraging LATAM talent" });
    }
    
    if (post.tags.some(tag => ["remote teams", "remote work", "distributed teams"].includes(tag))) {
      statistics.push({ figure: "85%", description: "Of LATAM professionals report high satisfaction working with US companies" });
      statistics.push({ figure: "4+ hours", description: "Daily overlap in working hours between US and LATAM time zones" });
    }
    
    if (post.tags.some(tag => ["talent acquisition", "hiring", "recruitment"].includes(tag))) {
      statistics.push({ figure: "2-3 weeks", description: "Average time to hire qualified LATAM professionals" });
      statistics.push({ figure: "94%", description: "Retention rate for LATAM professionals in their first year" });
    }
    
    // Generate content based on title and category
    if (post.title.includes("Game-Changer")) {
      hookQuestion = "What untapped competitive advantage are forward-thinking companies leveraging to outpace their rivals in today's global marketplace?";
      introduction = "The business landscape has evolved dramatically in recent years, with remote work transitioning from a temporary solution to a strategic advantage. As U.S. companies seek to optimize their operations while maintaining high-quality output, many are discovering a powerful resource that's revolutionizing how they build their teams.";
      mainContent = "Latin American professionals bring a unique combination of technical prowess and cultural alignment that creates an ideal environment for collaboration with U.S. companies. With excellent English proficiency, similar time zones, and a strong work ethic, LATAM talent integrates seamlessly into existing teams. The region's growing tech ecosystem and world-class educational institutions are producing exceptional professionals across various disciplines—from software development and design to marketing and customer support.";
      uniqueInsights = "The financial benefits of hiring LATAM talent represent a genuine game-changer for U.S. companies. With cost savings of 40-70% compared to domestic hiring, businesses can significantly extend their runway or reinvest in growth initiatives. Unlike outsourcing to regions with greater cultural and time zone differences, these savings don't compromise quality or communication efficiency. This cost-effectiveness allows companies to access specialized skills that might otherwise be unaffordable, creating a competitive edge in talent acquisition.";
      actionableSteps = "Despite the clear advantages, many companies hesitate to tap into LATAM talent due to concerns about compliance, payroll management, and the complexities of international hiring. Navigating different legal systems, tax regulations, and employment laws across multiple countries can seem daunting. However, specialized partners like Zitruus eliminate these obstacles by handling the legal, administrative, and operational aspects of international hiring, allowing companies to focus on what matters most—building high-performing teams that drive business results.";
      conclusion = "The game-changing potential of LATAM talent lies in its unique combination of quality, cost-effectiveness, and cultural alignment. By partnering with specialists who understand both the U.S. business environment and Latin American talent landscape, companies can transform their approach to team building and gain a significant competitive advantage. The question isn't whether hiring LATAM talent can be a game-changer—it already is for countless forward-thinking organizations that have embraced this strategic opportunity to build more diverse, skilled, and cost-effective teams.";
    } 
    else if (post.title.includes("Top 5 Roles")) {
      hookQuestion = "Which specific positions can truly thrive when filled by Latin American professionals, and why are U.S. companies increasingly shifting these roles to LATAM talent?";
      introduction = "As the global talent landscape evolves, U.S. companies are becoming increasingly strategic about which roles they source internationally. Latin America has emerged as a particularly valuable region for specific positions, offering a compelling blend of technical expertise, cultural compatibility, and cost efficiency.";
      mainContent = "Latin American professionals excel in roles requiring both technical skills and creative problem-solving. Their education systems emphasize adaptability and resourcefulness, producing versatile professionals who can navigate complex challenges. Additionally, LATAM's growing tech ecosystem has created a deep talent pool with experience in cutting-edge technologies and methodologies. The region's professionals often bring multilingual capabilities and cross-cultural understanding that enhances team dynamics and client interactions.";
      uniqueInsights = "Beyond the general cost savings of hiring in LATAM, certain roles offer particularly compelling value propositions. Technical positions that command premium salaries in the U.S. market can be filled with equally qualified professionals from Latin America at significantly lower rates. This cost advantage allows companies to build more robust teams without compromising quality, effectively expanding their capabilities while optimizing their budget allocation. The roles that deliver the greatest return on investment are those requiring specialized skills that are well-developed in the LATAM education system and professional environment.";
      actionableSteps = "Successfully integrating LATAM professionals into these key roles requires addressing specific challenges. Communication protocols must be established to ensure seamless collaboration across time zones. Clear documentation and knowledge-sharing systems help maintain consistency and quality. Cultural differences, while minimal compared to other regions, still require thoughtful management to create an inclusive environment. Companies must also navigate role-specific compliance considerations, such as data security regulations for technical positions or client confidentiality requirements for customer-facing roles.";
      conclusion = "The five roles where LATAM professionals consistently deliver exceptional value—software development, UX/UI design, digital marketing, customer support, and data analysis—represent areas where the region's talent pool offers a perfect storm of technical capability, cultural alignment, and cost efficiency. By strategically outsourcing these positions to Latin America, U.S. companies can enhance their operational capabilities while optimizing their resources. The key to success lies in understanding which roles benefit most from this approach and partnering with specialists who can facilitate seamless integration.";
    }
    else if (post.category === "Remote Hiring & Talent Acquisition") {
      hookQuestion = `How can companies optimize their ${post.tags[0] || "talent acquisition"} strategy by leveraging LATAM professionals?`;
      introduction = `In today's competitive business landscape, finding and retaining top talent is more challenging than ever. ${post.title.split(":")[0]} has become a critical consideration for forward-thinking companies looking to build resilient, cost-effective teams while maintaining high quality standards.`;
      
      // Add inline reference to the mainContent if we have related posts
      const hasManagementPosts = managementRelatedPosts.length > 0;
      mainContent = `When it comes to ${post.tags[0] || "remote hiring"}, Latin American professionals offer a unique value proposition. With strong technical education systems, cultural alignment with US business practices, and favorable time zone overlap, LATAM talent can seamlessly integrate with your existing teams. Companies that have implemented strategic ${post.tags[0] || "hiring"} approaches with LATAM professionals report not only cost savings but also increased innovation and productivity. ${hasManagementPosts ? `Effective team management is crucial for success. ` : ''}`;
      
      // Add the inline reference component JSX
      if (hasManagementPosts) {
        mainContent += `<span id="management-ref"></span>`;
      }
      
      uniqueInsights = `One often overlooked aspect of ${post.title.split(":")[0].toLowerCase()} is the importance of understanding regional differences within Latin America. Each country has its own specialties and strengths. For example, Brazil excels in software development and data science, while Colombia has a strong reputation for design and creative roles. Mexico's proximity to the US creates additional advantages for roles requiring occasional in-person collaboration. Understanding these nuances can significantly improve your talent acquisition outcomes.`;
      actionableSteps = `To successfully implement a ${post.tags[0] || "remote hiring"} strategy with LATAM talent, companies should focus on creating clear communication protocols, investing in proper onboarding, and working with partners who understand both US business needs and the Latin American talent landscape. Our <a href="/services/recruitment" class="text-brand-lime hover:underline">Talent Matching service</a> can help you navigate these complexities and find the perfect fit for your specific requirements.`;
      conclusion = `As global work continues to evolve, companies that strategically incorporate LATAM talent into their ${post.tags[0] || "hiring"} strategy gain a significant competitive advantage. By focusing on the right roles, understanding regional strengths, and implementing effective integration practices, your organization can build a more diverse, skilled, and cost-effective team that drives business results.`;
    }
    else if (post.category === "HR, Payroll, & Compliance") {
      hookQuestion = `What are the key considerations for managing ${post.tags[0] || "HR and compliance"} when working with LATAM professionals?`;
      introduction = `Navigating the complexities of ${post.title.split(":")[0]} can be challenging for US companies expanding their teams internationally. Understanding the legal, financial, and cultural aspects of employing Latin American professionals is essential for building successful cross-border working relationships.`;
      mainContent = `Each Latin American country has its own labor laws, tax regulations, and employment practices that US companies must navigate. From contractual requirements to mandatory benefits, the compliance landscape can vary significantly across the region. Companies that fail to address these considerations properly risk legal complications, financial penalties, and damaged relationships with their international team members.`;
      uniqueInsights = `While many companies focus on the initial hiring process, the long-term management of ${post.tags[0] || "HR and compliance"} matters requires ongoing attention and expertise. For example, countries like Brazil and Mexico have specific requirements for profit sharing, while Argentina and Colombia have unique regulations regarding termination and severance. Working with an Employer of Record (EoR) service like <a href="/services/eor" class="text-brand-lime hover:underline">Zitruus EoR</a> can eliminate these complexities by handling all legal and administrative aspects of employment.`;
      actionableSteps = `To effectively manage ${post.tags[0] || "HR and compliance"} with your LATAM team, establish clear policies that respect both local regulations and company standards, implement reliable payroll systems that account for local tax requirements, and create communication channels that bridge cultural differences. Our <a href="/services/hr-management" class="text-brand-lime hover:underline">HR Management service</a> provides comprehensive support for these critical functions.`;
      conclusion = `Successfully navigating ${post.title.split(":")[0].toLowerCase()} is not just about avoiding legal risks—it's about creating a foundation for productive, long-lasting relationships with your LATAM team members. By investing in proper compliance and HR management, companies can focus on what matters most: leveraging the exceptional talent Latin America has to offer to drive business growth and innovation.`;
    }
    else if (post.category === "Optimizing Operations & Scaling") {
      hookQuestion = `How can businesses leverage LATAM talent to optimize ${post.tags[0] || "operations"} and accelerate growth?`;
      introduction = `In an era where operational efficiency and scalability determine market leadership, companies are constantly seeking innovative approaches to ${post.title.split(":")[0].toLowerCase()}. Latin American talent offers a compelling solution for organizations looking to enhance their operational capabilities while managing costs effectively.`;
      mainContent = `The strategic integration of LATAM professionals into your operations can transform how your business scales and performs. With strong technical skills, cultural compatibility, and cost advantages, Latin American talent enables companies to build more robust operational frameworks without the premium costs associated with US-based hiring. This approach is particularly effective for functions that require both technical expertise and creative problem-solving.`;
      uniqueInsights = `Companies that successfully leverage LATAM talent for ${post.tags[0] || "operational optimization"} typically implement a hybrid approach—maintaining core strategic functions in-house while partnering with Latin American professionals for specialized roles and scaling needs. This model provides the flexibility to rapidly expand capabilities during growth phases without the long-term overhead of traditional hiring. Our <a href="/services/performance" class="text-brand-lime hover:underline">Performance Management service</a> helps ensure these distributed teams maintain high productivity and alignment with company objectives.`;
      actionableSteps = `To maximize the benefits of LATAM talent for ${post.tags[0] || "operational efficiency"}, focus on establishing clear workflows and expectations, invest in collaborative tools that bridge geographical distances, and create regular touchpoints for alignment and feedback. Working with a partner who understands both operational excellence and the LATAM talent landscape can significantly accelerate your results.`;
      conclusion = `As markets become increasingly competitive, the ability to efficiently scale operations while maintaining quality becomes a critical differentiator. By strategically incorporating LATAM talent into your ${post.tags[0] || "operational"} framework, your organization can achieve greater flexibility, cost-effectiveness, and innovation—creating a sustainable advantage in today's dynamic business environment.`;
    }
    else if (post.category === "Remote Team Management") {
      hookQuestion = `What strategies ensure successful ${post.tags[0] || "remote team management"} when working with LATAM professionals?`;
      introduction = `The rise of distributed teams has transformed how companies build and manage their workforce. ${post.title.split(":")[0]} presents both unique opportunities and challenges, particularly when collaborating with talent across different countries, cultures, and time zones.`;
      mainContent = `Effective ${post.tags[0] || "remote team management"} with Latin American professionals requires a thoughtful approach that addresses communication, culture, and collaboration. While LATAM offers significant advantages in terms of time zone alignment and cultural compatibility with US business practices, managers must still implement systems and practices that foster connection, clarity, and productivity across geographical boundaries.`;
      uniqueInsights = `The most successful distributed teams with LATAM professionals share several common practices: they establish clear communication protocols that respect time zone differences, create documentation systems that reduce dependency on synchronous interactions, and implement regular virtual team-building activities that strengthen relationships. Additionally, they recognize and celebrate cultural differences rather than trying to eliminate them, creating a more inclusive and innovative team environment. Our <a href="/services/hr-management" class="text-brand-lime hover:underline">HR Management service</a> includes specialized support for remote team engagement and development.`;
      actionableSteps = `To enhance your ${post.tags[0] || "remote team management"} practices, focus on creating structured onboarding processes that integrate new team members effectively, establish clear performance expectations and measurement systems, and invest in tools that facilitate both asynchronous and real-time collaboration. Regular one-on-one check-ins and team retrospectives help identify and address challenges before they impact productivity.`;
      conclusion = `As remote work continues to evolve from a temporary solution to a strategic advantage, mastering ${post.title.split(":")[0].toLowerCase()} becomes increasingly important for organizational success. By implementing thoughtful management practices that address the unique aspects of working with LATAM professionals, companies can build high-performing distributed teams that drive innovation, efficiency, and growth.`;
    }
    else if (post.category === "Remote Job Seeking") {
      hookQuestion = `How can LATAM professionals position themselves for success in ${post.tags[0] || "remote opportunities"} with US companies?`;
      introduction = `The global shift toward remote work has created unprecedented opportunities for Latin American professionals to collaborate with US companies. ${post.title.split(":")[0]} requires understanding both the technical and soft skills that make candidates stand out in an increasingly competitive international job market.`;
      mainContent = `US companies seeking LATAM talent typically look for a combination of technical expertise, English proficiency, cultural alignment, and remote work capabilities. Professionals who can demonstrate these qualities position themselves advantageously for rewarding remote career opportunities. Understanding the specific needs and expectations of US employers is essential for successful job seeking and long-term career development.`;
      uniqueInsights = `Beyond technical skills, successful LATAM professionals in remote US roles share several common characteristics: they proactively manage communication across time zones, demonstrate strong written communication skills for asynchronous collaboration, and show cultural intelligence when working with diverse teams. Additionally, they invest in creating professional online profiles and portfolios that showcase their work in formats familiar to US hiring managers. At Zitruus, we help connect qualified LATAM professionals with US companies through our <a href="/services/recruitment" class="text-brand-lime hover:underline">Talent Matching service</a>.`;
      actionableSteps = `To enhance your prospects for ${post.tags[0] || "remote opportunities"}, focus on building a strong online presence through platforms like LinkedIn and GitHub, develop your English communication skills with particular attention to written expression, and familiarize yourself with US business practices and expectations. Networking with professionals already working with US companies can provide valuable insights and potential referrals.`;
      conclusion = `As the demand for skilled LATAM professionals continues to grow among US companies, those who strategically prepare for ${post.title.split(":")[0].toLowerCase()} will find themselves with increasingly rewarding career opportunities. By focusing on the right skill development, understanding employer expectations, and effectively showcasing your capabilities, you can build a successful remote career with leading US organizations.`;
    }
    else {
      // Default content for other posts
      hookQuestion = "How can businesses leverage the untapped potential of Latin American talent to transform their operations while maintaining quality and controlling costs?";
      introduction = "In today's competitive business landscape, companies are constantly seeking ways to optimize their operations, reduce costs, and access top-tier talent. Latin America (LATAM) has emerged as a powerhouse for skilled professionals who can deliver exceptional results at competitive rates.";
      mainContent = "Latin American professionals bring a unique combination of technical expertise, cultural alignment with U.S. business practices, and favorable time zone overlap. This powerful combination creates an ideal environment for productive collaboration and seamless integration with your existing team. With a growing tech ecosystem and world-class universities producing highly skilled graduates, countries like Mexico, Colombia, Argentina, and Brazil offer deep talent pools across various disciplines—from software development and design to marketing and customer support.";
      uniqueInsights = "One of the most compelling reasons U.S. companies turn to LATAM is the significant cost savings—often 40-70% compared to hiring domestically. However, unlike outsourcing to regions with greater cultural and time zone differences, these savings don't come at the expense of quality or communication efficiency. LATAM professionals typically have strong English language skills, are familiar with U.S. business culture, and work in time zones that substantially overlap with U.S. business hours. This means real-time collaboration is not just possible but practical and productive.";
      actionableSteps = "Despite the clear advantages, many companies hesitate to tap into LATAM talent due to concerns about compliance, payroll management, and the complexities of international hiring. This is where specialized partners like Zitruus become invaluable. By handling the legal, administrative, and operational aspects of international hiring, Zitruus enables companies to focus on what matters most—building and managing high-performing teams that drive business results.";
      conclusion = "As global work continues to evolve, forward-thinking companies are gaining a competitive edge by embracing international talent. LATAM professionals offer a unique value proposition that combines quality, cost-effectiveness, and cultural alignment—making them an ideal solution for U.S. companies looking to scale efficiently without compromising on talent quality. By partnering with Zitruus, you can navigate the complexities of international hiring and focus on what matters most—building exceptional teams that drive your business forward.";
    }
    
    // Define sections for table of contents
    const sections = [
      { id: 'introduction', title: 'Introduction' },
      { id: 'why-latam-talent', title: 'Why LATAM Talent Stands Out' },
      { id: 'unique-insights', title: 'Unique Insights' },
      { id: 'actionable-strategies', title: 'Actionable Strategies' },
      { id: 'how-zitruus-helps', title: 'How Zitruus Can Help' },
      { id: 'getting-started', title: 'Getting Started' },
      { id: 'conclusion', title: 'Conclusion' }
    ];

    return (
      <>
        {/* Add Table of Contents */}
        <TableOfContents sections={sections} />
        
        <h2 id="introduction" className="text-2xl font-bold text-white mt-10 mb-4">{hookQuestion}</h2>
        
        <p className="text-gray-300 mb-6" dangerouslySetInnerHTML={{ __html: introduction }}></p>
        
        {/* Series Posts Section - If this post is part of a series */}
        {seriesPosts.length > 0 && (
          <CompactCrossReferences 
            title="This Article is Part of a Series" 
            posts={seriesPosts} 
            type="series" 
            currentPostId={post.id} 
          />
        )}
        
        <h2 id="why-latam-talent" className="text-2xl font-bold text-white mt-10 mb-4">Why LATAM Talent Stands Out</h2>
        {renderContentWithReferences(mainContent)}
        
        {/* Only show in-content reference if we don't have inline reference */}
        {post.category !== "Remote Hiring & Talent Acquisition" && hiringRelatedPosts.length > 0 && (
          <InContentReference 
            post={hiringRelatedPosts[0]} 
            context="Dive deeper into talent acquisition" 
          />
        )}
        
        {/* Statistics Section */}
        {statistics.length > 0 && (
          <div className="bg-dark-300 rounded-lg p-6 my-8 border-l-4 border-brand-lime">
            <h3 className="text-xl font-bold text-white mb-4">Key Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {statistics.map((stat, index) => (
                <div key={index} className="flex items-start">
                  <div className="text-2xl font-bold text-brand-lime mr-3">{stat.figure}</div>
                  <div className="text-gray-300">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <h2 id="unique-insights" className="text-2xl font-bold text-white mt-10 mb-4">Unique Insights</h2>
        <p className="text-gray-300 mb-6" dangerouslySetInnerHTML={{ __html: uniqueInsights }}></p>
        
        {/* Bidirectional References Section - only show if we have more than one */}
        {bidirectionalPosts.length > 1 && (
          <CompactCrossReferences 
            title="Articles with Similar Content" 
            posts={bidirectionalPosts} 
            type="bidirectional" 
            currentPostId={post.id} 
          />
        )}
        {/* For single bidirectional reference, use inline */}
        {bidirectionalPosts.length === 1 && (
          <div className="mb-6 text-right">
            <InlineReference 
              post={bidirectionalPosts[0]} 
              text="See also: Similar article on this topic" 
            />
          </div>
        )}
        
        {/* In-content reference for compliance-related posts */}
        {post.category !== "HR, Payroll, & Compliance" && complianceRelatedPosts.length > 0 && (
          <InContentReference 
            post={complianceRelatedPosts[0]} 
            context="Learn about compliance considerations" 
          />
        )}
        
        <h2 id="actionable-strategies" className="text-2xl font-bold text-white mt-10 mb-4">Actionable Strategies</h2>
        <p className="text-gray-300 mb-6" dangerouslySetInnerHTML={{ __html: actionableSteps }}></p>
        
        {/* Contextual Related Posts - use compact version */}
        {post.category === "Remote Hiring & Talent Acquisition" && managementRelatedPosts.length > 0 && (
          <CompactCrossReferences 
            title="Managing Your LATAM Team" 
            posts={managementRelatedPosts} 
            type="contextual" 
            currentPostId={post.id} 
          />
        )}
        
        {post.category === "HR, Payroll, & Compliance" && operationsRelatedPosts.length > 0 && (
          <CompactCrossReferences 
            title="Optimizing Operations with LATAM Talent" 
            posts={operationsRelatedPosts} 
            type="contextual" 
            currentPostId={post.id} 
          />
        )}
        
        {post.category === "Optimizing Operations & Scaling" && remoteWorkRelatedPosts.length > 0 && (
          <CompactCrossReferences 
            title="Remote Work Best Practices" 
            posts={remoteWorkRelatedPosts} 
            type="contextual" 
            currentPostId={post.id} 
          />
        )}
        
        {/* Related Services Section - Redesigned to be more subtle and elegant */}
        <div id="how-zitruus-helps" className="mt-8 mb-10">
          <h3 className="text-lg font-medium text-white mb-3 inline-flex items-center">
            <span className="w-1.5 h-1.5 bg-brand-lime rounded-full mr-2"></span>
            How Zitruus Can Help
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {relatedServices.map((service, index) => (
              <Link href={service.url} key={index} className="group">
                <div className="p-3 bg-dark-300 bg-opacity-50 hover:bg-opacity-80 rounded-lg transition-all duration-300 border border-gray-800 hover:border-brand-lime">
                  <h4 className="text-base font-medium text-white group-hover:text-brand-lime transition-colors">
                    {service.name}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">{service.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        <h2 id="getting-started" className="text-2xl font-bold text-white mt-10 mb-4">Getting Started with LATAM Talent</h2>
        <p className="text-gray-300 mb-3">
          If you're considering expanding your team with LATAM professionals, here are some key steps to ensure success:
        </p>
        <div className="pl-4 border-l border-gray-700 mb-6">
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start">
              <span className="w-1 h-1 bg-brand-lime rounded-full mt-2 mr-2 flex-shrink-0"></span>
              Define clear role requirements and expectations
            </li>
            <li className="flex items-start">
              <span className="w-1 h-1 bg-brand-lime rounded-full mt-2 mr-2 flex-shrink-0"></span>
              Partner with specialists who understand the LATAM talent landscape
            </li>
            <li className="flex items-start">
              <span className="w-1 h-1 bg-brand-lime rounded-full mt-2 mr-2 flex-shrink-0"></span>
              Establish effective communication channels and protocols
            </li>
            <li className="flex items-start">
              <span className="w-1 h-1 bg-brand-lime rounded-full mt-2 mr-2 flex-shrink-0"></span>
              Invest in proper onboarding and integration
            </li>
            <li className="flex items-start">
              <span className="w-1 h-1 bg-brand-lime rounded-full mt-2 mr-2 flex-shrink-0"></span>
              Create a culturally inclusive work environment
            </li>
          </ul>
        </div>
        
        {/* In-content reference for management-related posts */}
        {post.category !== "Remote Team Management" && managementRelatedPosts.length > 0 && (
          <InContentReference 
            post={managementRelatedPosts[0]} 
            context="Explore team management strategies" 
          />
        )}
        
        <h2 id="conclusion" className="text-2xl font-bold text-white mt-10 mb-4">Conclusion</h2>
        <p className="text-gray-300 mb-6" dangerouslySetInnerHTML={{ __html: conclusion }}></p>
      </>
    );
  };

  // Function to get related posts based on category and tags
  const getRelatedPosts = () => {
    try {
      // Filter posts that are in the same category or share at least one tag, but exclude the current post
      const relatedByCategory = blogPosts.filter(p => 
        p.id !== post.id && 
        p.category === post.category
      );
      
      const relatedByTags = blogPosts.filter(p => 
        p.id !== post.id && 
        p.category !== post.category && 
        p.tags.some(tag => post.tags.includes(tag))
      );
      
      // Get posts that might not share category or tags but have content similarity
      const otherPosts = blogPosts.filter(p => 
        p.id !== post.id && 
        !relatedByCategory.includes(p) && 
        !relatedByTags.includes(p)
      );
      
      // Calculate content similarity for all potential related posts
      const scoredRelatedByCategory = relatedByCategory.map(p => ({
        post: p,
        score: calculateContentSimilarity(post, p) + 0.2 // Boost for same category
      }));
      
      const scoredRelatedByTags = relatedByTags.map(p => ({
        post: p,
        score: calculateContentSimilarity(post, p) + 0.1 // Boost for shared tags
      }));
      
      const scoredOtherPosts = otherPosts.map(p => ({
        post: p,
        score: calculateContentSimilarity(post, p)
      }));
      
      // Combine all scored posts and sort by score (highest first)
      const allScoredPosts = [...scoredRelatedByCategory, ...scoredRelatedByTags, ...scoredOtherPosts]
        .sort((a, b) => b.score - a.score);
      
      // Take the top 3 posts with highest similarity scores
      return allScoredPosts.slice(0, 3).map(item => item.post);
    } catch (error) {
      console.error('Error in getRelatedPosts:', error);
      
      // Fallback to original implementation if there's an error
      const relatedByCategory = blogPosts.filter(p => 
        p.id !== post.id && 
        p.category === post.category
      );
      
      const relatedByTags = blogPosts.filter(p => 
        p.id !== post.id && 
        p.category !== post.category && 
        p.tags.some(tag => post.tags.includes(tag))
      );
      
      // Combine and take the first 3 posts
      const combined = [...relatedByCategory, ...relatedByTags];
      return combined.slice(0, 3);
    }
  };

  // Function to get next and previous posts
  const getAdjacentPosts = () => {
    try {
      // Find the current post index in the blogPosts array
      const currentIndex = blogPosts.findIndex(p => p.id === post.id);
      
      // If post not found in the array, return null for both
      if (currentIndex === -1) {
        console.error(`Post with ID ${post.id} not found in blogPosts array`);
        return { prevPost: null, nextPost: null };
      }
      
      // Get previous post (if current is not the first)
      const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
      
      // Get next post (if current is not the last)
      const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
      
      return { prevPost, nextPost };
    } catch (error) {
      console.error('Error in getAdjacentPosts:', error);
      return { prevPost: null, nextPost: null };
    }
  };

  const { prevPost, nextPost } = getAdjacentPosts();

  // Helper function to replace reference placeholders with actual components
  const renderContentWithReferences = (content: string) => {
    // Find related posts for management references
    const managementPosts = findContextualRelatedPosts(post, blogPosts, 'management');
    
    if (!content.includes('<span id="management-ref"></span>')) {
      return <p className="text-gray-300 mb-6" dangerouslySetInnerHTML={{ __html: content }}></p>;
    }

    // Split content at the reference placeholder
    const parts = content.split('<span id="management-ref"></span>');
    
    return (
      <p className="text-gray-300 mb-6">
        <span dangerouslySetInnerHTML={{ __html: parts[0] }}></span>
        {managementPosts.length > 0 && (
          <InlineReference 
            post={managementPosts[0]} 
            text="Learn more about managing LATAM teams" 
          />
        )}
        {parts.length > 1 && <span dangerouslySetInnerHTML={{ __html: parts[1] }}></span>}
      </p>
    );
  };

  // Find related posts based on tags and category
  const relatedPosts = blogPosts.filter(p => 
    p.id !== post.id && (
      p.category === post.category || 
      p.tags.some(tag => post.tags.includes(tag))
    )
  ).sort((a, b) => {
    // Count matching tags
    const aMatchCount = a.tags.filter(tag => post.tags.includes(tag)).length;
    const bMatchCount = b.tags.filter(tag => post.tags.includes(tag)).length;
    
    // Sort by number of matching tags (descending)
    return bMatchCount - aMatchCount;
  }).slice(0, 6); // Get top 6 related posts

  // Helper function to generate FAQs based on post category
  const generateFAQs = () => {
    const faqs = [];
    
    // Common FAQs for all categories
    faqs.push({
      question: "What makes LATAM talent unique?",
      answer: "Latin American professionals offer a unique combination of technical expertise, cultural alignment with US business practices, and favorable time zone overlap. They typically have strong English language skills, are familiar with US business culture, and work in time zones that substantially overlap with US business hours."
    });
    
    // Category-specific FAQs
    if (post.category === "Remote Hiring & Talent Acquisition") {
      faqs.push(
        {
          question: "How long does it take to hire LATAM talent?",
          answer: "The hiring process typically takes 2-3 weeks from initial search to onboarding. This includes candidate sourcing, interviews, technical assessments, and contract signing. Working with a specialized partner like Zitruus can significantly streamline this process."
        },
        {
          question: "What are the cost savings when hiring LATAM talent?",
          answer: "Companies typically save 40-70% on talent costs when hiring LATAM professionals compared to US-based hires, without compromising on quality. This includes not only salary savings but also reduced overhead and operational costs."
        }
      );
    } else if (post.category === "HR, Payroll, & Compliance") {
      faqs.push(
        {
          question: "How do you handle payroll and benefits for LATAM employees?",
          answer: "Through an Employer of Record (EoR) service like Zitruus, we handle all payroll, benefits, and compliance requirements in accordance with local labor laws. This includes managing tax withholdings, social security contributions, and mandatory benefits specific to each country."
        },
        {
          question: "What are the main compliance considerations?",
          answer: "Key compliance considerations include proper employment contracts, adherence to local labor laws, tax regulations, data protection requirements, and mandatory benefits. Each LATAM country has its own specific requirements that must be carefully managed."
        }
      );
    } else if (post.category === "Optimizing Operations & Scaling") {
      faqs.push(
        {
          question: "How can LATAM talent help scale operations?",
          answer: "LATAM professionals can help scale operations by providing cost-effective access to skilled talent, enabling 24/7 coverage through time zone advantages, and offering flexibility in team size and composition. This allows companies to grow efficiently while maintaining quality."
        },
        {
          question: "What roles are best suited for LATAM talent?",
          answer: "LATAM professionals excel in various roles including software development, design, digital marketing, customer support, and data analysis. The region's strong technical education and growing tech ecosystem produce highly skilled professionals across multiple disciplines."
        }
      );
    } else if (post.category === "Remote Team Management") {
      faqs.push(
        {
          question: "How do you maintain productivity with remote LATAM teams?",
          answer: "Successful remote team management with LATAM professionals involves clear communication protocols, well-defined expectations, regular check-ins, and the right collaboration tools. Cultural awareness and time zone management are also crucial factors."
        },
        {
          question: "What are the best practices for remote team collaboration?",
          answer: "Best practices include establishing clear communication channels, creating detailed documentation, scheduling regular team meetings at convenient times for all time zones, and using appropriate project management and collaboration tools."
        }
      );
    }
    
    // Add a final FAQ about getting started - without Calendly buttons in the answer
    faqs.push({
      question: "How can I get started with hiring LATAM talent?",
      answer: "The best way to get started is to schedule a consultation with our team. We'll help you understand the process, assess your needs, and create a tailored strategy for building your LATAM team."
    });
    
    return faqs;
  };

  // Separate function to render FAQ content
  const renderFAQ = (faq: { question: string; answer: string }, isLast: boolean) => {
    if (isLast) {
      return (
        <div className="text-sm sm:text-base text-gray-300">
          <span>{faq.answer} </span>
          <button onClick={() => openCalendly()} className="text-brand-lime hover:underline">Contact us</button>
          <span> or </span>
          <button onClick={() => openCalendly()} className="text-brand-lime hover:underline">schedule a call</button>
          <span> to learn more.</span>
        </div>
      );
    }
    return <p className="text-sm sm:text-base text-gray-300" dangerouslySetInnerHTML={{ __html: faq.answer }}></p>;
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="mb-12"
      >
        <div className="flex justify-between items-center mb-4">
          <Link href="/blog" className="inline-flex items-center text-brand-lime hover:underline">
          <ArrowLeft size={16} className="mr-2" />
          Back to Blog
        </Link>
          
          <div className="flex items-center space-x-4">
            {prevPost ? (
              <Link 
                href={`/blog/${prevPost.slug}`} 
                className="inline-flex items-center text-gray-400 hover:text-brand-lime transition-colors group relative"
                title={`Previous: ${prevPost.title}`}
              >
                <span className="absolute bottom-full right-0 mb-2 w-48 bg-dark-300 text-xs text-gray-300 p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none truncate hidden md:block z-10">
                  {prevPost.title}
                </span>
                <ChevronLeft size={20} />
                <span className="hidden sm:inline ml-1">Previous</span>
              </Link>
            ) : (
              <span className="inline-flex items-center text-gray-700 cursor-not-allowed opacity-50">
                <ChevronLeft size={20} />
                <span className="hidden sm:inline ml-1">Previous</span>
              </span>
            )}
            
            {nextPost ? (
              <Link 
                href={`/blog/${nextPost.slug}`} 
                className="inline-flex items-center text-gray-400 hover:text-brand-lime transition-colors group relative"
                title={`Next: ${nextPost.title}`}
              >
                <span className="absolute bottom-full left-0 mb-2 w-48 bg-dark-300 text-xs text-gray-300 p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none truncate hidden md:block z-10">
                  {nextPost.title}
                </span>
                <span className="hidden sm:inline mr-1">Next</span>
                <ChevronRight size={20} />
              </Link>
            ) : (
              <span className="inline-flex items-center text-gray-700 cursor-not-allowed opacity-50">
                <span className="hidden sm:inline mr-1">Next</span>
                <ChevronRight size={20} />
              </span>
            )}
          </div>
        </div>
        
        {/* Add Breadcrumbs for better navigation and SEO - hide the title but keep it for SEO */}
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: post.category, href: `/blog?category=${encodeURIComponent(post.category)}` },
            { label: post.title, href: `/blog/${post.slug}`, isCurrentPage: true, hideFromUI: true }
          ]}
        />
        
        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
        >
          {post.title}
        </motion.h1>
        
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Link href="/about">
                <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                  <Image
                    src={author.image}
                    alt={`${author.name} - ${author.role} at Zitruus`}
                    width={40}
                    height={40}
                    className="object-cover"
                    loading="eager"
                    priority
                    sizes="40px"
                    quality={90}
                  />
                </div>
              </Link>
              <div>
                <Link href="/about">
                  <div className="text-white font-medium cursor-pointer hover:text-brand-lime transition-colors">{post.author}</div>
                </Link>
                <div className="text-sm text-gray-400">{post.date}</div>
              </div>
            </div>
            <div className="hidden sm:block text-sm text-gray-400">•</div>
            <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start w-full sm:w-auto">
              <Link href={`/blog?category=${encodeURIComponent(post.category)}`}>
                <div className="flex items-center text-sm text-gray-400 hover:text-brand-lime transition-colors cursor-pointer">
                  <Tag size={16} className="mr-2" />
                  {post.category}
                </div>
              </Link>
              <div className="hidden sm:block text-sm text-gray-400">•</div>
              <div className="flex items-center text-sm text-gray-400">
                <Clock size={16} className="mr-2" />
                <span>{readingTime}</span>
              </div>
            </div>
          </div>
          
          {/* Early CTA - Mobile responsive */}
          <div className="mb-8 mt-6">
            <h3 className="text-lg font-medium text-white mb-3">
              Ready to transform your team with LATAM talent?
            </h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <CalendlyButton className="w-full sm:w-auto px-4 py-2 bg-brand-lime bg-opacity-90 text-black text-sm font-medium rounded-lg transition-all duration-300 hover:bg-opacity-100 hover:scale-[1.02] transform-gpu text-center">
                Schedule a Consultation
              </CalendlyButton>
              <Link
                href="/jobs"
                className="w-full sm:w-auto px-4 py-2 border border-brand-lime text-brand-lime text-sm font-medium rounded-lg transition-all duration-300 hover:bg-brand-lime/10 hover:scale-[1.02] transform-gpu text-center"
              >
                View Open Positions
              </Link>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          variants={itemVariants}
          className="prose prose-lg prose-invert max-w-none"
        >
          {generateBlogContent()}
        </motion.div>
        
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <h3 className="text-xl font-bold text-white mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link href={`/blog?tag=${encodeURIComponent(tag)}`} key={tag}>
                <span
                  className="px-3 py-1 bg-dark-300 text-brand-lime rounded-full text-sm hover:bg-dark-200 transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <h3 className="text-xl font-bold text-white mb-6">About the Author</h3>
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={author.image}
                alt={author.name}
                width={64}
                height={64}
                className="object-cover"
                loading="lazy"
                sizes="64px"
                quality={90}
              />
            </div>
            <div>
              <h4 className="text-lg font-medium text-white">{author.name}</h4>
              <p className="text-brand-lime mb-2">{author.role}</p>
              <p className="text-gray-400">{author.bio}</p>
            </div>
          </div>
        </motion.div>
        
        {/* Related Posts Section */}
        <RelatedPosts 
          posts={relatedPosts} 
          currentPostId={post.id} 
          title="You May Also Like" 
        />
        
        {/* Ready to transform section */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <h3 className="text-xl font-bold text-white mb-4">
            Ready to transform your team with LATAM talent?
          </h3>
          <div className="flex flex-wrap gap-3">
            <CalendlyButton className="px-4 py-2 bg-brand-lime bg-opacity-90 text-black text-sm font-medium rounded-lg transition-all duration-300 hover:bg-opacity-100 hover:scale-[1.02] transform-gpu">
              Schedule a Consultation
            </CalendlyButton>
            <Link
              href="/jobs"
              className="px-4 py-2 border border-brand-lime text-brand-lime text-sm font-medium rounded-lg transition-all duration-300 hover:bg-brand-lime/10 hover:scale-[1.02] transform-gpu"
            >
              View Open Positions
            </Link>
          </div>
        </motion.div>
        
        {/* FAQ Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h2 id="faq" className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4 sm:space-y-6">
            {generateFAQs().map((faq, index, array) => (
              <div key={index} className="bg-dark-300 bg-opacity-50 rounded-lg p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3">{faq.question}</h3>
                {renderFAQ(faq, index === array.length - 1)}
              </div>
            ))}
          </div>
        </div>

        {/* Social Share Section - Mobile responsive */}
        <div className="mt-10 border-t border-gray-800 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center sm:text-left">Did you find this article helpful? Share it with your network:</p>
            <SocialShareButtons 
              title={post.title} 
              url={`https://zitruus.com/blog/${post.slug}`} 
              description={post.excerpt}
              compact={true}
            />
          </div>
        </div>

        {/* Fixed Calendly Button */}
        <CalendlyButton variant="fixed" />
      </motion.div>
    </article>
  );
} 