import React from "react";
import HighlightText from "../../../components/core/HomePage/HighlightText";
import CTAButton from "../../../components/core/HomePage/Button";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "SkillNova partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "SkillNova partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "SkillNova partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "SkillNova partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "SkillNova partners with more than 275+ leading universities and companies to bring",
  },
];

const LearningGrid = () => {
  return (
    <div className="grid mx-auto w-[350px] xl:w-fit grid-cols-1 xl:grid-cols-4 mb-12 gap-4 transition-colors duration-300">
      {LearningGridArray.map((card, i) => {
        const isPrimaryCard = card.order < 0;
        const bgColor =
          card.order % 2 === 1
            ? "bg-richblack-700 dark:bg-slate-800"
            : card.order % 2 === 0
            ? "bg-richblack-800 dark:bg-slate-900"
            : "bg-transparent";

        const colSpanClass = i === 0 ? "xl:col-span-2 xl:h-[294px]" : "";
        const colStartClass = card.order === 3 ? "xl:col-start-2" : "";

        return (
          <div
            key={i}
            className={`rounded-md shadow-md ${bgColor} ${colSpanClass} ${colStartClass} transition-colors duration-300`}
          >
            {isPrimaryCard ? (
              <div className="xl:w-[90%] flex flex-col gap-3 p-6 pb-10 xl:pb-0">
                <div className="text-4xl font-semibold text-richblack-5 dark:text-white">
                  {card.heading} <HighlightText text={card.highlightText} />
                </div>
                <p className="text-richblack-300 dark:text-slate-400 font-medium">
                  {card.description}
                </p>

                <div className="w-fit mt-2">
                  <CTAButton active={true} linkto={card.BtnLink}>
                    {card.BtnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              <div className="p-8 flex flex-col gap-8">
                <h1 className="text-richblack-5 dark:text-white text-lg">
                  {card.heading}
                </h1>

                <p className="text-richblack-300 dark:text-slate-400 font-medium">
                  {card.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;
