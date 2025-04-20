import React from "react";
import { questions } from "./questions";
import CategoryAccordion from "./CategoryAccordion.js";
import EncabezadoFAQS from "./encabezadoFAQS.js"; 
import Footer from "../InHome/footer.js";

export default function App() {
  return (
    <>
      <EncabezadoFAQS />

      {/* Contenedor de preguntas frecuentes con fondo gris claro */}
      <div className="bg-gray-50 sm:pt-[100px] px-4 sm:px-8 md:px-16">
        <div className="text-center mb-4 py-10 px-2 sm:px-4">
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#5F874E] font-title">
            Ecoguardianes 2.0
          </h2>
        </div>

        <section className="max-w-3xl mx-auto">
          <h1 className="text-center tracking-wide sm:tracking-widest font-bold text-2xl sm:text-3xl md:text-[30px] mb-6 sm:mb-8">
            Preguntas Frecuentes
          </h1>

          <div className="grid grid-cols-1 gap-4 px-2 sm:px-0">
            {questions.map((categoryData, index) => (
              <CategoryAccordion 
                key={index} 
                category={categoryData.category} 
                items={categoryData.items} 
              />
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
