// import React from "react";
// import Footer from "../Footer/Footer";
// import Navbar from "../Navbar/Navbar";

// function AiResumeEnhancer() {
//   return (
//     <div>
//       <Navbar/>
//       <div className="m-10  shadow-2xl max-w-4xl mx-auto my-5 p-6 sm:p-10 bg-white rounded-lg">
//         <h2 className="my-4 text-3xl sm:text-4xl font-semibold text-center underline ">
//           AI Resume Enhancer
//         </h2>
//         <h2 className="text-xl font-bold my-5">
//           Elevate Your Job Applications with AI-Driven Enhancements
//         </h2>
//         At Nova Job , we believe that every job seeker deserves a standout
//         resume that effectively showcases their skills and experiences. Our AI
//         Resume Enhancer is designed to elevate your resume, ensuring it meets
//         industry standards and captures the attention of recruiters. Using
//         advanced AI technology, we transform your resume into a powerful tool
//         for career success
//         <h2 className="text-xl font-bold my-5">
//           Key Features of Our AI Resume Enhancer
//         </h2>
//         <h2 className="text-sm font-semibold my-2">1. Content Optimization</h2>
//         Our AI analyzes your resume content to ensure it is concise, relevant,
//         and impactful. It helps you highlight key achievements, skills, and
//         experiences that align with the job you re applying for.
//         <h2 className="text-sm font-semibold my-2">
//           2. Tailored Recommendations
//         </h2>
//         Receive personalized suggestions on how to improve your resume. The AI
//         provides specific advice on language, tone, and structure, helping you
//         create a compelling narrative that resonates with hiring managers.
//         <h2 className="text-sm font-semibold my-2">
//           3. Industry-Specific Enhancements
//         </h2>
//         Our AI Resume Enhancer tailors your resume to fit the standards and
//         expectations of your target industry. Whether you re in tech, finance,
//         healthcare, or any other field, our AI ensures your resume speaks the
//         industry language.
//         <h2 className="text-sm font-semibold my-2">4. Keyword Optimization</h2>
//         The AI scans job descriptions to identify critical keywords and phrases.
//         It then suggests incorporating these keywords into your resume to
//         increase your chances of passing through Applicant Tracking Systems
//         (ATS).
//         <h2 className="text-sm font-semibold my-2">5. Skill Highlighting</h2>
//         Our AI emphasizes your most relevant skills based on the job
//         description. It ensures that your resume showcases your strengths in a
//         way that aligns with employer expectations.
//         <h2 className="text-sm font-semibold my-2">
//           6. Achievement Quantification
//         </h2>
//         The AI prompts you to quantify your achievements, such as including
//         specific numbers and metrics. This adds credibility to your resume and
//         provides tangible evidence of your accomplishments.
//         <h2 className="text-sm font-semibold my-2">7. Visual Appeal </h2>
//         Receive recommendations on improving the visual layout of your resume.
//         The AI ensures that your resume is not only informative but also
//         aesthetically pleasing, making it easier for recruiters to read.
//         <h2 className="text-sm font-semibold my-2">7. Error Correction </h2>
//         The AI checks for and corrects grammatical, spelling, and punctuation
//         errors. This ensures your resume is polished and professional, free of
//         any distracting mistakes.
//         <h2 className="text-lg font-bold my-4">How It Works</h2>
//         <h2 className="text-sm font-semibold my-2">
//           Step 1: Upload Your Resume
//         </h2>
//         Upload your existing resume to the Nova Job platform. Our AI will start
//         analyzing your document immediately.
//         <h2 className="text-sm font-semibold my-2">Step 2: AI Analysis</h2>
//         The AI evaluates your resume, examining content, structure, keywords,
//         and overall presentation. It identifies areas that need improvement and
//         generates a comprehensive enhancement plan.
//         <h2 className="text-sm font-semibold my-2">
//           Step 3: Receive Recommendations
//         </h2>
//         Within minutes, you’ll receive detailed recommendations on how to
//         enhance your resume. The AI provides actionable insights and specific
//         suggestions for improvement.
//         <h2 className="text-sm font-semibold my-2">
//           Step 4: Implement Enhancements
//         </h2>
//         Make the suggested changes to your resume. Use the AI’s feedback to
//         refine content, optimize keywords, and improve the visual layout.
//         <h2 className="text-lg font-bold my-2">
//           Benefits of Using AI Resume Enhancer
//         </h2>
//         <h2 className="text-sm font-semibold my-2">Professional Quality</h2>
//         Create a high-quality, polished resume that meets industry standards and
//         captures the attention of hiring managers.
//         <h2 className="text-sm font-semibold my-2">Increased Visibility</h2>
//         Optimize your resume for ATS and keyword searches, increasing your
//         chances of being shortlisted for interviews.
//         <h2 className="text-sm font-semibold my-2">Personalized Insights</h2>
//         Receive tailored recommendations that address your unique career goals
//         and the specific requirements of your target job.
//         <h2 className="text-sm font-semibold my-2">
//           Efficiency and Convenience
//         </h2>
//         Save time and effort with automated enhancements that ensure your resume
//         is comprehensive and impactful.
//         <h2 className="text-sm font-semibold my-2">
//           Start Enhancing Your Resume Today
//         </h2>
//         Transform your resume with Nova Job ’s AI Resume Enhancer. Sign up now
//         to create a resume that stands out and opens doors to new career
//         opportunities.
//         <h2 className="text-lg font-bold my-2">Get Started</h2>
//         Ready to elevate your resume? Visit our AI Resume Enhancer page and
//         start refining your resume today!
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default AiResumeEnhancer;

import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useTranslation } from "react-i18next";

function AiResumeEnhancer() {
  const { t } = useTranslation();

  return (
    <div>
      <Navbar />
      <div className="m-4 sm:mx-10 lg:mx-40 p-4 sm:p-6 shadow-2xl">
        <h2 className="my-4 text-3xl sm:text-4xl font-semibold text-center underline">
          {t("aiResumeEnhancer.title")}
        </h2>
        <h2 className="text-xl font-bold my-5">
          {t("aiResumeEnhancer.subtitle")}
        </h2>
        <p className="text-base sm:text-lg"> {t("aiResumeEnhancer.intro")} </p>

        <h2 className="text-xl font-bold my-5">
          {t("aiResumeEnhancer.featuresTitle")}
        </h2>
        <h2 className="text-sm font-semibold my-2">
          {t("aiResumeEnhancer.feature1Title")}
        </h2>
        {t("aiResumeEnhancer.feature1Desc")}

        <h2 className="text-sm font-semibold my-2">
          {t("aiResumeEnhancer.feature2Title")}
        </h2>
        {t("aiResumeEnhancer.feature2Desc")}

        <h2 className="text-sm font-semibold my-2">
          {t("aiResumeEnhancer.feature3Title")}
        </h2>
        {t("aiResumeEnhancer.feature3Desc")}

        <h2 className="text-sm font-semibold my-2">
          {t("aiResumeEnhancer.feature4Title")}
        </h2>
        {t("aiResumeEnhancer.feature4Desc")}

        <h2 className="text-sm font-semibold my-2">
          {t("aiResumeEnhancer.feature5Title")}
        </h2>
        {t("aiResumeEnhancer.feature5Desc")}

        <h2 className="text-sm font-semibold my-2">
          {t("aiResumeEnhancer.feature6Title")}
        </h2>
        {t("aiResumeEnhancer.feature6Desc")}

        <h2 className="text-sm font-semibold my-2">
          {t("aiResumeEnhancer.feature7Title")}
        </h2>
        {t("aiResumeEnhancer.feature7Desc")}

        <h2 className="text-sm font-semibold my-2">
          {t("aiResumeEnhancer.feature8Title")}
        </h2>
        {t("aiResumeEnhancer.feature8Desc")}

        <h2 className="text-lg font-bold my-4">
          {t("aiResumeEnhancer.howItWorksTitle")}
        </h2>
        <h2 className="text-sm font-semibold my-2">
          {t("aiResumeEnhancer.step1Title")}
        </h2>
        {t("aiResumeEnhancer.step1Desc")}

        <h2 className="text-sm font-semibold my-2">
          {t("aiResumeEnhancer.step2Title")}
        </h2>
        {t("aiResumeEnhancer.step2Desc")}

        <h2 className="text-sm font-semibold my-2">
          {t("aiResumeEnhancer.step3Title")}
        </h2>
        {t("aiResumeEnhancer.step3Desc")}

        <h2 className="text-sm font-semibold my-2">
          {t("aiResumeEnhancer.step4Title")}
        </h2>
        {t("aiResumeEnhancer.step4Desc")}


        <h2 className="text-lg font-bold my-2">
          {t("aiResumeEnhancer.benefitsTitle")}
        </h2>

        <h2 className="text-sm font-semibold my-2">
          {t("aiResumeEnhancer.benefit1Title")}
        </h2>
        {t("aiResumeEnhancer.benefit1Desc")}

        <h2 className="text-sm font-semibold my-2">
          {t("aiResumeEnhancer.benefit2Title")}
        </h2>
        {t("aiResumeEnhancer.benefit2Desc")}

        <h2 className="text-sm font-semibold my-2">
          {t("aiResumeEnhancer.benefit3Title")}
        </h2>
        {t("aiResumeEnhancer.benefit3Desc")}

        <h2 className="text-sm font-semibold my-2">
          {t("aiResumeEnhancer.benefit4Title")}
        </h2>
        {t("aiResumeEnhancer.benefit4Desc")}

        <h2 className="text-sm font-semibold my-2">
          {t("aiResumeEnhancer.startEnhancingTitle")}
        </h2>
        {t("aiResumeEnhancer.startEnhancingDesc")}

        <h2 className="text-lg font-bold my-2">
          {t("aiResumeEnhancer.getStartedTitle")}
        </h2>
        {t("aiResumeEnhancer.getStartedDesc")}

      </div>
      <Footer />
    </div>
  );
}

export default AiResumeEnhancer;
