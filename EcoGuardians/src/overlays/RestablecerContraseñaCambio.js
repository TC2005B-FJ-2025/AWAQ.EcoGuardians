import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function ContraseñaCambio() {
  return (
    <div className="w-[500px] border-2 border-verde-claro relative p-4 rounded-xl mx-auto flex flex-col">
      <FontAwesomeIcon
        icon={faXmark}
        className="absolute right-[10px] fa-xl text-gray-400 top-[10px] cursor-pointer"
      ></FontAwesomeIcon>
      <h1 className="mx-auto w-fit font-semibold text-[22px] mb-6">
        Restablecer contraseña
      </h1>
      <p className="text-gray-500 mb-7">Elige una contraseña nueva</p>
      <label htmlFor="id-password-cambio" className="mb-2">
        Contraseña Nueva
      </label>
      <input
        id="id-password-cambio"
        type="password"
        name="password"
        placeholder="********"
        required
        className="border-2 border-black p-[2px] px-2 rounded-2xl mb-7"
      />
      <label htmlFor="id-confirmar-cambio" className="mb-2">
        Confirmar Contraseña nueva
      </label>
      <input
        id="id-confirmar-cambio"
        type="password"
        name="confirmarContrasena"
        placeholder="********"
        required
        className="border-2 border-black p-[2px] px-2 rounded-2xl mb-5"
      />
      <button
        type="submit"
        className=" bg-verde-claro rounded-3xl p-2 text-white"
      >
        Restablecer contraseña
      </button>
    </div>
  );
}

export default ContraseñaCambio;
