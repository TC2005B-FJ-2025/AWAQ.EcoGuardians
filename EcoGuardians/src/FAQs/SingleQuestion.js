import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"; // Flechas

export default function SingleQuestion({ question, answer }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
      <div
        className={`border border-gray-400 rounded-lg bg-white mb-4 transition-all duration-300 ${
          showAnswer
            ? "shadow-md shadow-[#5F874E]"  // sombra verde al abrir
            : "shadow-sm shadow-gray-400"   // sombra gris al cerrar
        }`}
      >
      <article className="flex items-center justify-between p-4 lg:p-6">
        <h2
          className="cursor-pointer text-black font-semibold text-[18px] font-heading"
          onClick={() => setShowAnswer(!showAnswer)}
        >
          {question}
        </h2>
        <button onClick={() => setShowAnswer(!showAnswer)}>
          {showAnswer ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
        </button>
      </article>

      {showAnswer && (
        <article className="border-t border-gray-400 p-4 lg:p-6 text-[#484848] text-justify text-[16px] font-subheading">
          <p>{answer}</p>
        </article>
      )}
    </div>
  );
}
