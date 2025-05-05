import Link from "next/link";
import blog3 from "./Images/blog3.jpg";
import Home_five from "./Home_five";
import { useTranslation } from "react-i18next";
import Home_six from "./Home_six";
const Home_fourth = () => {
  const { t } = useTranslation();
  const course = [
    {
      img: "https://blog.novajob.fr/wp-content/uploads/2025/01/novajob-blog-How-AI-is-Revolutionizing-Resume-Building-A-Beginners-Guide-1.png",
      title: "card_title1",
      link: "https://blog.novajob.fr/?p=1",
    },
    {
      img: "https://blog.novajob.fr/wp-content/uploads/2025/01/Blog-2-novajob-AI-Powered-Resume-Builders-vs-Traditional-Methods-Whats-Better.png",
      title: "card_title2",
      link: "https://blog.novajob.fr/?p=23",
    },

    {
      img: "https://blog.novajob.fr/wp-content/uploads/2025/01/Blog-3-novajob-Top-5-Benefits-of-Using-an-AI-Resume-Builder.png",
      title: "card_title3",
      link: "https://blog.novajob.fr/?p=27",
    },

    {
      img: "https://blog.novajob.fr/wp-content/uploads/2025/01/Blog-4-Step-by-Step-Guide-to-Creating-a-Job-Winning-Resume-with-AI-Tools.png",
      title: "card_title4",
      link: "https://blog.novajob.fr/?p=30",
    },
  ];
  return (
    <>
      <div id="course" className="bg-gray-100 py-10 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold px-4 lg:px-0 py-5 text-center text-[#1C2957]">
            {t("neweststratigies")}
          </h2>
          <p className="mx-auto px-4 lg:px-0 text-lg lg:text-base text-gray-700 max-w-4xl text-center mb-8">
            {t("paragraphhome_fourth")}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {course.map((card, index) => (
              <a
                key={index}
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-between h-full bg-white rounded-xl shadow-md overflow-hidden transition duration-300 transform hover:scale-105"
              >
                <img
                  src={card.img}
                  alt="Course"
                  className="w-full h-auto border-2 rounded-t-md"
                />
                <div className="p-4">
                  <h2 className="text-lg lg:text-lg font-bold mb-2">
                    {t(card.title)}
                  </h2>
                  {/* <p className="text-sm text-gray-600">{card.name}</p> */}
                </div>
              </a>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Link href={"https://blog.novajob.fr/"}>
              <button className="px-6 py-3 text-lg font-semibold text-white bg-[#1C2957] hover:bg-[#1C2957] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1C2957]">
                {t("get_moreadvice")}
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Home_six />
      {/* <Home_five /> */}
    </>
  );
};

export default Home_fourth;
