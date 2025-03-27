import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Login({onJugar}) {
  const [visibility, setVisibility] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="bg-white border-2 w-[500px] relative p-4 rounded-xl border-verde-claro">
        <FontAwesomeIcon
          icon={faXmark}
          className="absolute right-[10px] fa-xl text-gray-400 top-[10px] cursor-pointer"
        ></FontAwesomeIcon>
        <h2 className="mx-auto w-fit font-semibold text-[22px]">
          Iniciar sesión
        </h2>
        <form className="flex flex-col mt-4">
          <label htmlFor="input-email">Correo electrónico</label>
          <input
            type="email"
            placeholder="Ingresa tu email"
            id="input-email"
            className="border-2 border-black p-[2px] px-2 rounded-2xl peer"
          />
          <div className="text-red-500 hidden peer-invalid:block">Correo Invalido!</div>
          <label htmlFor="input-contraseña" className="mt-5">
            <div className="flex justify-between">
              <span>Contraseña</span> <button>He olvidado mi contraseña</button>
            </div>
          </label>
          <div className="relative border-2 border-black rounded-2xl px-2">
            <input
              className="focus:outline-none peer"
              type={visibility ? "text" : "password"}
              id="input-contraseña"
              placeholder="********"
            />
            <button
              className="absolute right-2 cursor-pointer "
              onClick={(event) => {
                event.preventDefault();
                setVisibility(!visibility);
              }}
            >
              <FontAwesomeIcon
                icon={visibility ? faEyeSlash : faEye}
              ></FontAwesomeIcon>
            </button>
          <div className="text-red-500 hidden peer-invalid:block absolute left-0">Contraseña Invalida!</div>
          </div>
          <div className="mt-6">
            {" "}
            <input type="checkbox" id="recuerdame-checkBox" />{" "}
            <label htmlFor="recuerdame-checkBox">Recuerdame</label>
          </div>
          <p className="">
            ¿No tienes cuenta?{" "}
            <button className="text-verde-fuerte font-semibold">
              Registrate
            </button>
          </p>
          <button
            onClick={(event) => {
              event.preventDefault();
              onJugar();
            }}
            className="bg-verde-claro rounded-3xl p-2 text-white"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
