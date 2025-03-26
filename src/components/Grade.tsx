"use client";
import React, { useState } from "react";

interface GradeButtonProps {
  text?: string;
  isActive: boolean;
  onClick: () => void;
}

const GradeButton: React.FC<GradeButtonProps> = ({ text, isActive, onClick }) => {
  const activeClass = "bg-[#3198F5] border-none";
  const activeText = "text-white";

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer flex justify-center items-center rounded-[20px] w-[200px] h-[48px] py-2 px-4 border-[#9193A5] relative border-[2px] ${isActive ? activeClass : ""} hover:bg-[#3198F5]`}
    >
      {/* Pseudo-element for gradient border and blur */}
      {/* <div className="absolute top-0 left-0 right-0 bottom-0 rounded-[20px] border-[1px] border-black blur-[1px]" /> */}
      <p className={`whitespace-nowrap text-center text-[14px] sm:text-[16px] md:text-[18px] font-bold ${isActive ? activeText : ""}`}>{text}</p>
    </div>
  );
};

const Grade = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0); // Tracks the index of the active button

  const handleClick = (index: number) => {
    setActiveIndex(index); // Set the active button based on index
  };

  return (
    <div className="w-full h-[96px] bg-[#F1F1F9] flex flex-row justify-around items-center py-2 px-4">
      <GradeButton
        text={"Pre-K to Grade 3"}
        isActive={activeIndex === 0}
        onClick={() => handleClick(0)}
      />
      <GradeButton
        text={"Grades 4 - 8"}
        isActive={activeIndex === 1}
        onClick={() => handleClick(1)}
      />
      <GradeButton
        text={"Grades 9 - 12"}
        isActive={activeIndex === 2}
        onClick={() => handleClick(2)}
      />
      <GradeButton
        text={"Specialized"}
        isActive={activeIndex === 3}
        onClick={() => handleClick(3)}
      />
    </div>
  );
};

export default Grade;
