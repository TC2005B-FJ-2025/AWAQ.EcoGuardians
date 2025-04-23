import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import SingleQuestion from "./SingleQuestion";

export default function CategoryAccordion({ category, items }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`rounded-xl bg-white mb-4 transition-all duration-300 ${
        isOpen
          ? "shadow-md shadow-[#5F874E]"  // sombra verde al abrir
          : "shadow-md shadow-gray"       // sombra gris sutil al cerrar
      }`}
    >
      <button
        className="flex items-center justify-between w-full p-3 sm:p-4 md:p-6 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="font-heading text-lg sm:text-xl md:text-2xl text-[#5F874E] font-bold">
          {category}
        </h2>
        <span className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-md">
          {isOpen ? (
            <IoIosArrowUp size={24} className="sm:size-[30px] text-[#5F874E]" />
          ) : (
            <IoIosArrowDown size={24} className="sm:size-[30px] text-[#5F874E]" />
          )}
        </span>
      </button>

      <div className={`${isOpen ? "block" : "hidden"} px-3 sm:px-4 pb-4`}>
        {items.map((item, index) => (
          <SingleQuestion key={index} {...item} />
        ))}
      </div>
    </div>
  );
}
