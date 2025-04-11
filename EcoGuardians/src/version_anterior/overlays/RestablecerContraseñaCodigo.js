import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function RestablecerContraseñaCodigo() {
  return (
    <div className="w-[500px] border-2 border-verde-claro relative p-4 rounded-xl mx-auto flex flex-col">
      <FontAwesomeIcon
        icon={faXmark}
        className="absolute right-[10px] fa-xl text-gray-400 top-[10px] cursor-pointer"
      ></FontAwesomeIcon>
      <h1 className="mx-auto w-fit font-semibold text-[22px] mb-4">
        Restablecer contraseña
      </h1>
      <p className="text-gray-500 mb-4">
        Te hemos enviado el código, revisa tu correo electrónico. Este email
        puede tardar unos minutos.
      </p>
      <label htmlFor="Restablecer-codigo-id" className="mb-1">
        Código de verificación
      </label>
      <input
        id="Restablecer-codigo-id"
        type="text"
        name="codigo"
        placeholder="Ingresa el código"
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

export default RestablecerContraseñaCodigo;
