import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function RestablecerContraseña() {
  return (
    <div className="w-[500px] border-2 border-verde-claro relative p-4 rounded-xl mx-auto flex flex-col">
      <FontAwesomeIcon
        icon={faXmark}
        className="absolute right-[10px] fa-xl text-gray-400 top-[10px] cursor-pointer"
      ></FontAwesomeIcon>
      <h1 className="mx-auto w-fit font-semibold text-[22px] mb-4">Restablecer contraseña</h1>
      <p className="text-gray-500 mb-4">
        Te enviaremos un correo electrónico con un código para que puedas elegir
        una contraseña nueva
      </p>
      <label htmlFor="Restablecer-email-id" className="mb-1">
        Correo electrónico
      </label>
      <input
        id="Restablecer-email-id"
        type="email"
        name="email"
        placeholder="Ingresa tu email"
        required
        className="border-2 border-black p-[2px] px-2 rounded-2xl mb-5"
      />
      <button
        type="submit"
        className=" bg-verde-claro rounded-3xl p-2 text-white"
      >
        Enviar Correo
      </button>
    </div>
  );
}

export default RestablecerContraseña;
