// export default function ExperienceStep({ onNext, onChange, value }) {
//   const experiences = [
//     { id: "none", label: "No Experience" },
//     { id: "less-3", label: "Less Than 3 Years" },
//     { id: "3-5", label: "3-5 Years" },
//     { id: "5-10", label: "5-10 Years" },
//     { id: "10-plus", label: "10+ Years" },
//   ];

//   return (
//     <div className="space-y-6">
//       <div className="text-center">
//         <h2 className="text-2xl font-bold text-gray-900">
//           How long have you been working?
//         </h2>
//         <p className="mt-2 text-gray-600">
//           We will find the best templates for your experience level.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {experiences.map((exp) => (
//           <button
//             key={exp.id}
//             onClick={() => {
//               onChange(exp.id);
//               onNext();
//             }}
//             className={`p-4 rounded-lg border-2 transition-all ${
//               value === exp.id
//                 ? "border-[#1C2957] bg-blue-50"
//                 : "border-gray-200 hover:border-blue-400"
//             }`}
//           >
//             {exp.label}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useTranslation } from "react-i18next";

export default function ExperienceStep({ onNext, onChange, value, onBack }) {
  const { t } = useTranslation();

  const experiences = [
    { id: "none", label: t("experienceStep.options.none") },
    { id: "less-3", label: t("experienceStep.options.less-3") },
    { id: "3-5", label: t("experienceStep.options.3-5") },
    { id: "5-10", label: t("experienceStep.options.5-10") },
    { id: "10-plus", label: t("experienceStep.options.10-plus") },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-200 flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
            {t("experienceStep.title")}
          </h1>
          <p className="text-md md:text-lg text-[#4b5563] mb-10">
            {t("experienceStep.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl w-full">
          {experiences.map((exp) => (
            <button
              key={exp.id}
              onClick={() => {
                onChange(exp.id);
                onNext();
              }}
              className={`w-full p-6 text-left rounded-xl border-2 flex items-center justify-between text-blue-700 font-semibold transition-all${
                value === exp.id
                  ? "border-blue-700 bg-[#e6f0f5]"
                  : "border-[#e5e7eb] hover:border-blue-700"
              }`}
            >
              {exp.label}
            </button>
          ))}
        </div>
        <div className="mt-10 flex justify-center gap-4">
          <button
            onClick={onBack}
            className="px-8 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-700 
         font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
          >
            {t("experienceStep.back")}
          </button>
        </div>
      </main>
    </div>
  );
}
