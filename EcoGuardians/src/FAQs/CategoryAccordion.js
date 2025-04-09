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
          : "shadow-md shadow-gray"   // sombra gris sutil al cerrar
      }`}
    >
      <button
        className="flex items-center justify-between w-full p-4 lg:p-6 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="font-heading text-[24px] text-[#5F874E] font-bold">
          {category}
        </h2>
        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md">
          {isOpen ? (
            <IoIosArrowUp size={30} className="text-[#5F874E]" />
          ) : (
            <IoIosArrowDown size={30} className="text-[#5F874E]" />
          )}
        </span>
      </button>

      <div className={`${isOpen ? "block" : "hidden"} px-4 pb-4`}>
        {items.map((item, index) => (
          <SingleQuestion key={index} {...item} />
        ))}
      </div>
    </div>
  );
}
