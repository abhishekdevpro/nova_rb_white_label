// export const pricingData = {
//   planId: 1,
//   title: "Pricing Plans",
//   subtitle: "Choose the plan that works best for you",
//   intro:
//     "Our pricing plans are designed to accommodate all your resume building needs.",
//   bestValueLabel: "Best Value",
//   freeLabel: "Free",
//   freePlan: {
//     title: "Free Plan",
//     billingCycle: "Free Plan",
//     subtitle: "For basic resume needs with AI support and ATS compatibility",
//     price: 0,
//     bestValue: false,
//     buttonText: "Get Started",

//     feature1: "Access to 2 professional, ATS-friendly templates",
//     feature2: "Unlimited edits — update anytime",
//     feature3: "Download as PDF",
//     feature4: "100 AI credits for resume and summary suggestions",
//     feature5: "Cover letter included",
//     feature6: "Built-in ATS-compliant formatting for better job match",
//     feature7: "Best for entry-level job seekers or quick applications.",
//   },
//   singlePass: {
//     planId: 2,
//     price: 9.85,
//     title: "Single Pass",
//     subtitle: "Professional templates, custom styling, and AI-powered support",
//     price: 9.85,
//     billingCycle: "Resume",
//     bestValue: false,
//     buttonText: "Get Started",

//     feature1: "Unlock 20 premium ATS-friendly resume templates",
//     feature2: "Choose from 20+ color options",
//     feature3: "Pick from 15+ modern fonts",
//     feature4: "250 AI credits for writing support and optimization",
//     feature5: "Cover letter included",
//     feature6: "Download in PDF and DOC formats",
//     feature7: "All formats are optimized for ATS (Applicant Tracking Systems)",
//     feature8: "Perfect for job seekers who want strong first impressions.",
//   },
// };
import { FaInfoCircle } from "react-icons/fa";

export const pricingData = [
  {
    planId: 2,
    id: "freemium",
    name: "Explore",
    price: "18.95",
    isPopular: true,
    isDark: false,
    features: [
      // "Discover your potential",
      "AI Resume + Cover Letter Builder",
      "Profile Listing",
      "Search & Apply to Jobs",
      "All-in-One Career Dashboard",
      "AI Skill Tests",

      "Community Access",

      // "Access to all courses",
      // "Access to Free C "Profile Listing",
      <span key="freemium" className="flex items-center gap-1">
        Access to Edtech{" "}
        <a
          href="https://ultraaura.education/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://ultraaura.education/static/media/Ultra_Aura.cabb61de498b919d72f4.png"
            alt="UltraAura"
            className="h-2 w-5 inline-block"
            style={{
              height: "2rem",
              width: "auto",
              display: "inline-block",
              color: "white",
            }}
          />
        </a>
      </span>,
    ],
  },
  {
    planId: 3,
    id: "elevate",
    name: "Elevate",
    price: "38.95",
    isPopular: false,
    isDark: false,
    features: [
      // "Rise with purpose and power",
      "Everything in Explore, plus",
      "Job Suggestions",
      // "Resume Score",
      "ATS & Resume Score",
      "Priority Job alerts",
      // "Access to UltraAura+",
      // "Resume writeup By Experts",
      // "Connect to Career Coach",
      // "Profile Analytics*",
      "Certifications by UltraAura",
      // "Unlimited Access to UltraAura",
      // "Access to all courses",
      <span key="elevate" className="d-inline-flex align-items-center gap-11">
        Unlimited Access to Edtech{" "}
        <a
          href="https://ultraaura.education/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://ultraaura.education/static/media/Ultra_Aura.cabb61de498b919d72f4.png"
            alt="UltraAura"
            className="h-2 w-5 inline-block"
            style={{
              height: "2rem",
              width: "auto",
              display: "inline-block",
            }}
          />
        </a>
      </span>,
    ],
  },
  {
    planId: 4,
    id: "promax",
    name: "Excel",
    price: "78.95",
    isPopular: false,
    isDark: false,
    features: [
      // "Master your skills. Dominate your field",
      "Everything in Elevate, plus",
      "Connect to Trainer",
      "Connect to Career Coach / Trainer",
      "Manage Documents",
      "More AI Credits",
      "Chat with HR's*",
      "Verified Certifications by UltraAura",
      // "Unlimited Access to UltraAura",

      <span key="excel" className="flex items-center gap-1">
        Unlimited Access to Edtech{" "}
        <a
          href="https://ultraaura.education/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://ultraaura.education/static/media/Ultra_Aura.cabb61de498b919d72f4.png"
            alt="UltraAura"
            className="h-2 w-5 inline-block"
            style={{
              height: "2rem",
              width: "auto",
              display: "inline-block",
            }}
          />
        </a>
      </span>,
    ],
  },
  {
    planId: 5,
    id: "ultraelite",
    name: "Elite ",
    price: "148.95",
    isPopular: false,
    isDark: true,
    features: [
      "Excel Plus Unlimited",
      <span
        key="elite"
        style={{ display: "flex", alignItems: "center", gap: "4px" }}
      >
        Centralized HyperVSolutions ID
        <FaInfoCircle
          style={{
            fontSize: "0.875rem",
            color: "yellow",
            cursor: "pointer",
            marginLeft: "4px",
          }}
          title="Single Sign-On for all services"
        />
      </span>,
      "Expert Resume & Cover Letter Creation",
      "AI Credits",
      "Physical & Verified Certification Copies",
      "Job Placement Assistance",
      "Personalized Career Guidance",
      "Priority Job Applies",
      // "Community & Analytics",
      // "Unlimited UltraAura Access",
      // "Career Coaching & Trainer Monitoring",
      // "Dedicated Personal Career Mentor",
      // "AI Branding & Executive Resume Enhancement",
      // "Unlimited Access UltraAura",
      // "Verified & physical Certifications",
      // "Priority Job Matching + Employer Alerts",
      // "Beta Access to Exclusive Tools & Pilots",
      // "Enterprise-Grade Career Dashboard",
      <span key="elite" className="flex items-center gap-1">
        Unlimited Access to Edtech{" "}
        <a
          href="https://ultraaura.education/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://ultraaura.education/static/media/Ultra_Aura.cabb61de498b919d72f4.png"
            alt="UltraAura"
            className="h-2 w-5 inline-block"
            style={{
              height: "2rem",
              width: "auto",
              display: "inline-block",
              color: "white",
            }}
          />
        </a>
      </span>,
    ],
  },
];
