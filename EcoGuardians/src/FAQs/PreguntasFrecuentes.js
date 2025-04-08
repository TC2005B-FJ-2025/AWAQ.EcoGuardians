import React, { useState } from "react";
import { questions } from "./questions";
import CategoryAccordion from "./CategoryAccordion";
/*import Footer from "./InHome/footer.js";*/

export default function App() {
  return (
    <section className="max-w-xl mx-auto py-20 px-4">
      <h1 className="text-center uppercase tracking-widest font-bold mb-8">
        Preguntas Frecuentes sobre EcoGuardians
      </h1>

      <div className="grid grid-cols-1 gap-4">
        {questions.map((categoryData, index) => (
          <CategoryAccordion 
            key={index} 
            category={categoryData.category} 
            items={categoryData.items} 
          />
        ))}
      </div>
    </section>
  );
}