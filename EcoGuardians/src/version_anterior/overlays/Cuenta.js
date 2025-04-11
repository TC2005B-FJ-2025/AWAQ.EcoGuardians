import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Cuenta() {
  return (
    <div className="bg-white border-2 w-[500px] relative p-4 rounded-xl border-verde-claro mx-auto">
      <FontAwesomeIcon
        icon={faXmark}
        className="absolute right-[10px] fa-xl text-gray-400 top-[10px] cursor-pointer"
      ></FontAwesomeIcon>
      <h2 className="text-center font-semibold text-lg mb-4">Cuenta</h2>
      <div className="flex justify-center mb-4 relative">
        <div className="w-24 h-24 bg-gray-200 rounded-full relative">
          <div className="absolute bottom-0 right-0 bg-verde-claro rounded-full p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
          </div>
        </div>
      </div>

      <form className="flex flex-col">
        <div className="flex w-full gap-4">
          <div className="flex flex-col w-full">
            <label htmlFor="cuenta-nombre-id" className="mb-2">
              Nombre
            </label>
            <input
              id="cuenta-nombre-id"
              className="border-2 border-black p-[2px] px-2 rounded-2xl mb-5 w-full"
              placeholder="Ingresa tu nombre"
              type="text"
              required
            ></input>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="cuenta-edad-id" className="mb-2">
              Edad
            </label>
            <input
              id="cuenta-edad-id"
              className="border-2 border-black p-[2px] px-2 rounded-2xl mb-5 w-full"
              placeholder="Ingresa tu edad"
              type="number"
              required
            ></input>
          </div>
        </div>
        <label htmlFor="cuenta-id-email" className="mb-2">
          Email
        </label>
        <input
          id="cuenta-id-email"
          type="email"
          name="email"
          placeholder="Ingresa tu email"
          required
          className="border-2 border-black p-[2px] px-2 rounded-2xl mb-5"
        />
        <div className="flex justify-between gap-4">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="cuenta-country-id">Pais</label>
            <input
              id="cuenta-country-id"
              type="text"
              name="country"
              placeholder="País"
              required
              className="border-2 border-black p-[2px] px-2 rounded-2xl mb-5"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="cuenta-ciudad-id">Ciudad</label>
            <input
              id="cuenta-ciudad-id"
              type="text"
              name="ciudad"
              placeholder="Ciudad"
              required
              className="border-2 border-black p-[2px] px-2 rounded-2xl mb-5"
            />
          </div>
        </div>

        <button
          type="submit"
          className=" bg-verde-claro rounded-3xl p-2 text-white"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
}

export default Cuenta;
