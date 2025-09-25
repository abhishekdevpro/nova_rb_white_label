import { MessageCircle } from "lucide-react";
import Link from "next/link";
import Button from "../ui/Button";

const InterviewSection = () => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        {/* Left content */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
          <div className="p-3 bg-purple-100 rounded-lg flex-shrink-0">
            <MessageCircle className="w-6 h-6 text-purple-700" />
          </div>
          <div className="text-left sm:text-left">
            <h3 className="text-lg md:text-xl font-semibold">
              Advance Your Career with UltraAura
            </h3>
            <p className="text-gray-600 mt-1 text-sm md:text-base max-w-2xl">
              Enhance your resume with expert-built tools on NovaJobs and
              sharpen your skills with UltraAura’s top-tier learning resources.
              Stay ahead with weekly insights delivered straight to your inbox.
            </p>
          </div>
        </div>

        {/* Right button */}
        <div className="w-full sm:w-auto">
          <Link href="https://ultraaura.education/" target="_blank">
            <Button
              variant="outline"
              className="w-full md:w-auto"
              // className="w-full sm:w-auto px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 whitespace-nowrap"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InterviewSection;
