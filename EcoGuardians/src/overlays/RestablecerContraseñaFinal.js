import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function ContraseñaFinal() {
  return (
    <div className="w-[500px] border-2 border-verde-claro relative p-4 rounded-xl mx-auto">
      <FontAwesomeIcon
        icon={faXmark}
        className="absolute right-[10px] fa-xl text-gray-400 top-[10px] cursor-pointer"
      ></FontAwesomeIcon>
      <h1 className="mx-auto w-fit font-semibold text-[22px] mb-8">
        Restablecer contraseña
      </h1>
      <p className="text-gray-500 mb-7">La contraseña se ha cambiado con éxito, inicia sesión para continuar.</p>
      <button
        type="submit"
        className=" bg-verde-claro rounded-3xl p-2 text-white w-full"
      >
        Iniciar Sesion
      </button>
    </div>
  );
}

export default ContraseñaFinal;
