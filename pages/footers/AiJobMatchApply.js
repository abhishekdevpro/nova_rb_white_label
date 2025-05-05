// import React from "react";
// import Footer from "../Footer/Footer";
// import Navbar from "../Navbar/Navbar";

// function AiJobMatchApply() {
//   return (
//     <div>
//       <Navbar/>
//       <div className="max-w-4xl mx-auto my-5 p-6 sm:p-10 shadow-lg bg-white rounded-lg">
//         <h2 className="text-4xl font-semibold my-4 underline ">
//           AI-Job Match & Apply
//         </h2>
//         <h2 className="text-xl font-bold my-5">
//           Simplifying Your Job Search with AI Technology
//         </h2>
//         At Nova Job , we aim to make your job search efficient and effective
//         with our AI Job Match & Apply tool. This innovative technology uses
//         advanced algorithms to match your skills and experiences with relevant
//         job opportunities, streamlining the application process and increasing
//         your chances of landing the perfect job.
//         <h2 className="text-xl font-bold my-5">
//           Key Features of Our AI Job Match & Apply Tool
//         </h2>
//         <h2 className="text-sm font-semibold my-2">
//           1. Personalized Job Matching
//         </h2>
//         Our AI analyzes your resume and profile to identify job opportunities
//         that align with your skills, experience, and career goals. This ensures
//         that you apply for positions where you are most likely to succeed.
//         <h2 className="text-sm font-semibold my-2">2. Real-Time Job Alerts</h2>
//         Receive real-time notifications about new job postings that match your
//         profile. Stay updated on the latest opportunities without having to
//         constantly search job boards.
//         <h2 className="text-sm font-semibold my-2">3. One-Click Application</h2>
//         Simplify the application process with one-click applications. Our AI
//         auto-fills your resume and other required details, allowing you to apply
//         to multiple jobs quickly and efficiently.
//         <h2 className="text-sm font-semibold my-2">4. ATS Optimization</h2>
//         Ensure that your resume passes through Applicant Tracking Systems (ATS)
//         with ease. Our AI optimizes your resume with relevant keywords and
//         formats it to meet ATS standards, increasing your chances of being
//         noticed by recruiters.
//         <h2 className="text-sm font-semibold my-2">
//           5. Comprehensive Job Search Filters
//         </h2>
//         Use advanced filters to narrow down job listings based on criteria such
//         as location, industry, salary range, and company size. This helps you
//         find the most relevant job opportunities faster.
//         <h2 className="text-sm font-semibold my-2">6. Skill Gap Analysis</h2>
//         Our AI identifies any skill gaps between your current profile and the
//         job requirements. It provides recommendations for courses or
//         certifications that can help you qualify for your desired positions.
//         <h2 className="text-sm font-semibold my-2">7. Application Tracking</h2>
//         Keep track of all your job applications in one place. Our tool provides
//         a dashboard where you can monitor the status of your applications,
//         upcoming interviews, and follow-up tasks.
//         <h2 className="text-sm font-semibold my-2">8. Company Insights</h2>
//         Gain insights into potential employers with detailed company profiles.
//         Learn about company culture, values, benefits, and recent news to make
//         informed decisions about where to apply.
//         <h2 className="text-lg font-bold my-4">How It Works</h2>
//         <h2 className="text-sm font-semibold my-2">
//           Step 1: Create Your Profile
//         </h2>
//         Sign up on the Nova Job platform and create your profile. Upload your
//         resume and provide details about your skills, experiences, and career
//         aspirations.
//         <h2 className="text-sm font-semibold my-2">Step 2: AI Analysis</h2>
//         The AI scans your profile and resume, analyzing your qualifications and
//         preferences. It matches you with suitable job opportunities from our
//         extensive database.
//         <h2 className="text-sm font-semibold my-2">
//           Step 3: Receive Job Matches
//         </h2>
//         Get a list of personalized job matches that align with your profile. The
//         AI continuously updates this list as new job openings become available.
//         <h2 className="text-sm font-semibold my-2">
//           Step 4: Apply with One Click
//         </h2>
//         Use the one-click application feature to apply for jobs directly through
//         the platform. The AI auto-fills your application details, making the
//         process quick and hassle-free.
//         <h2 className="text-sm font-semibold my-2">
//           Step 5: Track Your Applications
//         </h2>
//         Monitor the progress of your job applications through the dashboard.
//         Receive updates on application status, interview schedules, and
//         follow-up actions.
//         <h2 className="text-sm font-semibold my-2">
//           Step 6: Enhance Your Profile
//         </h2>
//         Follow the AI’s recommendations to bridge any skill gaps. Take suggested
//         courses or earn certifications to improve your qualifications and
//         increase your job match accuracy.
//         <h2 className="text-lg font-bold my-2">
//           Benefits of Using AI Job Match & Apply
//         </h2>
//         <h2 className="text-sm font-semibold my-2">Increased Efficiency</h2>
//         Save time and effort by receiving personalized job matches and applying
//         with just one click. The AI handles the heavy lifting, so you can focus
//         on preparing for interviews and advancing your career.
//         <h2 className="text-sm font-semibold my-2">Higher Success Rate</h2>
//         Optimize your job search with targeted matches and ATS-friendly
//         applications. This increases your chances of being shortlisted for
//         interviews and ultimately landing the job.
//         <h2 className="text-sm font-semibold my-2">Personalized Experience</h2>
//         Enjoy a tailored job search experience that aligns with your unique
//         skills, experiences, and career goals. The AI provides relevant
//         opportunities and actionable insights for continuous improvement.
//         <h2 className="text-sm font-semibold my-2">Comprehensive Support</h2>
//         Manage your entire job search process from one platform. Track
//         applications, receive real-time alerts, and gain valuable insights into
//         potential employers.
//         <h2 className="text-sm font-semibold my-2">
//           Start Using AI Job Match & Apply Today
//         </h2>
//         Transform your job search with Nova Job ’s AI Job Match & Apply tool.
//         Sign up now to discover job opportunities that perfectly match your
//         profile and streamline your path to career success.
//         <h2 className="text-lg font-bold my-2">Get Started</h2>
//         Ready to find your dream job? Visit our AI Job Match & Apply page and
//         start matching with top job opportunities today!
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default AiJobMatchApply;

import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useTranslation } from "react-i18next";

function AiJobMatchApply() {
  const { t } = useTranslation();

  return (
    <div>
      <Navbar />
      <div className="m-4 sm:mx-10 lg:mx-40 p-4 sm:p-6 shadow-2xl">
        {/* Language Toggle Button */}

        <h2 className="text-4xl font-semibold my-4 underline text-center">
          {t("aiJobMatchApply.title")}
        </h2>
        <h2 className="text-xl font-bold my-5">
          {t("aiJobMatchApply.subtitle")}
        </h2>
        {t("aiJobMatchApply.intro")}

        <h2 className="text-xl font-bold my-5">
          {t("aiJobMatchApply.featuresTitle")}
        </h2>

        <h2 className="text-sm font-semibold my-2">
          {t("aiJobMatchApply.feature1Title")}
        </h2>
        {t("aiJobMatchApply.feature1Desc")}

        <h2 className="text-sm font-semibold my-2">
          {t("aiJobMatchApply.feature2Title")}
        </h2>
        {t("aiJobMatchApply.feature2Desc")}

        <h2 className="text-sm font-semibold my-2">
          {t("aiJobMatchApply.feature3Title")}
        </h2>
        {t("aiJobMatchApply.feature3Desc")}

        <h2 className="text-sm font-semibold my-2">
          {t("aiJobMatchApply.feature4Title")}
        </h2>
        {t("aiJobMatchApply.feature4Desc")}

        <h2 className="text-sm font-semibold my-2">
          {t("aiJobMatchApply.feature5Title")}
        </h2>
        {t("aiJobMatchApply.feature5Desc")}

        <h2 className="text-sm font-semibold my-2">
          {t("aiJobMatchApply.feature6Title")}
        </h2>
        {t("aiJobMatchApply.feature6Desc")}

        <h2 className="text-sm font-semibold my-2">
          {t("aiJobMatchApply.feature7Title")}
        </h2>
        {t("aiJobMatchApply.feature7Desc")}

        <h2 className="text-sm font-semibold my-2">
          {t("aiJobMatchApply.feature8Title")}
        </h2>
        {t("aiJobMatchApply.feature8Desc")}

        <h2 className="text-lg font-bold my-4">
          {t("aiJobMatchApply.howItWorksTitle")}
        </h2>

        <h2 className="text-sm font-semibold my-2">
          {t("aiJobMatchApply.step1Title")}
        </h2>
        {t("aiJobMatchApply.step1Desc")}

        <h2 className="text-sm font-semibold my-2">
          {t("aiJobMatchApply.step2Title")}
        </h2>
        {t("aiJobMatchApply.step2Desc")}

        <h2 className="text-sm font-semibold my-2">
          {t("aiJobMatchApply.step3Title")}
        </h2>
        {t("aiJobMatchApply.step3Desc")}

        <h2 className="text-sm font-semibold my-2">
          {t("aiJobMatchApply.step4Title")}
        </h2>
        {t("aiJobMatchApply.step4Desc")}

        <h2 className="text-sm font-semibold my-2">
          {t("aiJobMatchApply.step5Title")}
        </h2>
        {t("aiJobMatchApply.step5Desc")}

        <h2 className="text-sm font-semibold my-2">
          {t("aiJobMatchApply.step6Title")}
        </h2>
        {t("aiJobMatchApply.step6Desc")}

        <h2 className="text-lg font-bold my-2">
          {t("aiJobMatchApply.benefitsTitle")}
        </h2>

        <h2 className="text-sm font-semibold my-2">
          {t("aiJobMatchApply.benefit1Title")}
        </h2>
        {t("aiJobMatchApply.benefit1Desc")}

        <h2 className="text-sm font-semibold my-2">
          {t("aiJobMatchApply.benefit2Title")}
        </h2>
        {t("aiJobMatchApply.benefit2Desc")}

        <h2 className="text-sm font-semibold my-2">
          {t("aiJobMatchApply.benefit3Title")}
        </h2>
        {t("aiJobMatchApply.benefit3Desc")}

        <h2 className="text-sm font-semibold my-2">
          {t("aiJobMatchApply.benefit4Title")}
        </h2>
        {t("aiJobMatchApply.benefit4Desc")}

        <h2 className="text-sm font-semibold my-2">
          {t("aiJobMatchApply.startUsingTitle")}
        </h2>
        {t("aiJobMatchApply.startUsingDesc")}

        <h2 className="text-lg font-bold my-2">
          {t("aiJobMatchApply.getStartedTitle")}
        </h2>
        {t("aiJobMatchApply.getStartedDesc")}
      </div>
      <Footer />
    </div>
  );
}

export default AiJobMatchApply;
