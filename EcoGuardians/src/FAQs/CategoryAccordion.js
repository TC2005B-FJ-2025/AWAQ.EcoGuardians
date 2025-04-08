import React, { useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import SingleQuestion from "./SingleQuestion";

export default function CategoryAccordion({ category, items }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-400 rounded-lg bg-white mb-4">
      {}
      <button
        className="flex items-center justify-between w-full p-4 lg:p-6 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="font-bold">{category}</h2>
        {isOpen ? <BiMinus size={20} /> : <BiPlus size={20} />}
      </button>

      {}
      <div className={`${isOpen ? "block" : "hidden"} px-4 pb-4`}>
        {items.map((item, index) => (
          <SingleQuestion key={index} {...item} />
        ))}
      </div>
    </div>
  );
}