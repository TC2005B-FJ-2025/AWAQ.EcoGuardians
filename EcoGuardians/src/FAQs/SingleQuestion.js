import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"; // Flechas

export default function SingleQuestion({ question, answer }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div
      className={`border border-gray-300 rounded-lg bg-white mb-4 transition-all duration-300 ${
        showAnswer
          ? "shadow-md shadow-[#5F874E]" // sombra verde al abrir
          : "shadow-sm shadow-gray-300"  // sombra gris al cerrar
      }`}
    >
      <article
        className="flex items-center justify-between p-3 sm:p-4 md:p-5 lg:p-6"
        role="region"
        aria-labelledby={`question-${question}`}
      >
        <h2
          className="cursor-pointer text-black font-semibold text-base sm:text-lg md:text-xl font-heading"
          onClick={() => setShowAnswer(!showAnswer)}
        >
          {question}
        </h2>
        <button onClick={() => setShowAnswer(!showAnswer)} className="ml-4">
          {showAnswer ? (
            <IoIosArrowUp size={20} className="text-[#5F874E]" />
          ) : (
            <IoIosArrowDown size={20} className="text-[#5F874E]" />
          )}
        </button>
      </article>

      {showAnswer && (
        <article className="border-t border-gray-300 px-3 py-4 sm:px-4 sm:py-5 text-[#484848] text-justify text-sm sm:text-base font-subheading">
          <p>{answer}</p>
        </article>
      )}
    </div>
  );
}
