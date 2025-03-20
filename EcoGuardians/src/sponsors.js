import React from "react";

const sponsors = [
  { id: 1, name: "Sponsor 1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", image: "#" },
  { id: 2, name: "Sponsor 2", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", image: "#" },
  { id: 3, name: "Sponsor 3", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", image: "#" },
  { id: 4, name: "Sponsor 4", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", image: "#" },
  { id: 5, name: "Sponsor 5", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", image: "#" },
  { id: 6, name: "Sponsor 6", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", image: "#" },
  { id: 7, name: "Sponsor 7", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", image: "#" },
  { id: 8, name: "Sponsor 8", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", image: "#" }
];

const SponsorsSection = () => {
  return (
    <div className="text-center py-12 bg-gray-100">
      <h2 className="text-5xl font-bold text-green-700 mb-3">Nuestros Sponsors</h2>
      <p className="text-lg text-gray-600 max-w-xl mx-auto mb-10">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tincidunt vel turpis lobortis pretium. Fusce pharetra bibendum elit sit amet cursus.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
        {sponsors.map((sponsor) => (
          <div key={sponsor.id} className="bg-gray-100 p-6 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:-translate-y-1">
            <div className="w-full h-36 rounded-lg bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600">Imagen</span>
            </div>
            <h3 className="text-xl font-semibold mt-4">{sponsor.name}</h3>
            <p className="text-gray-600 text-sm mt-2">{sponsor.description}</p>
            <a href="#" className="block mt-3 text-green-700 font-bold hover:underline">Saber más...</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SponsorsSection;
