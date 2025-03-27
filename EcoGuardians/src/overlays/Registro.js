import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Registro() {
  return (
    <div className="w-[500px] border-2 border-verde-claro relative p-4 rounded-xl mx-auto">
      <FontAwesomeIcon
        icon={faXmark}
        className="absolute right-[10px] fa-xl text-gray-400 top-[10px] cursor-pointer"
      ></FontAwesomeIcon>
      <div className="">
        <h2 className="mx-auto w-fit font-semibold text-[22px]">Registro</h2>
        <form className="flex flex-col mt-4">
          <div className="flex justify-between gap-4">
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="username-id">Nombre</label>
              <input
                id="username-id"
                type="text"
                name="username"
                placeholder="Nombre de usuario"
                required
                className="border-2 border-black p-[2px] px-2 rounded-2xl mb-5"
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="edad-id">Edad</label>
              <input
                id="edad-id"
                type="number"
                name="minAge"
                placeholder="Edad"
                required
                className="border-2 border-black p-[2px] px-2 rounded-2xl mb-5"
              />
            </div>
          </div>
          <label htmlFor="id-email" className="mb-2">Email</label>
          <input
            id="id-email"
            type="email"
            name="email"
            placeholder="example123@email.com"
            required
            className="border-2 border-black p-[2px] px-2 rounded-2xl mb-5"
          />
          <label htmlFor="id-password" className="mb-2">Contraseña</label>
          <input
            id="id-password"
            type="password"
            name="password"
            placeholder="Contraseña"
            required
            className="border-2 border-black p-[2px] px-2 rounded-2xl mb-5"
          />
          <label htmlFor="id-confirmar" className="mb-2">Confirmar Contraseña</label>
          <input
            id="id-confirmar"
            type="password"
            name="confirmarContrasena"
            placeholder="Confirmar contraseña"
            required
            className="border-2 border-black p-[2px] px-2 rounded-2xl mb-5"
          />
          <div className="flex justify-between gap-4">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="country-id" >Pais</label>
              <input
                id="country-id"
                type="text"
                name="country"
                placeholder="País"
                required
                className="border-2 border-black p-[2px] px-2 rounded-2xl mb-5"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="ciudad-id">Ciudad</label>
              <input
                id="ciudad-id"
                type="text"
                name="ciudad"
                placeholder="Ciudad"
                required
                className="border-2 border-black p-[2px] px-2 rounded-2xl mb-5"
              />
            </div>
          </div>
          <p className="mt-4">
            ¿Ya tienes una cuenta?{" "}
            <span className="text-verde-fuerte font-semibold">
              Inicia sesión
            </span>
          </p>
          <button
            type="submit"
            className=" bg-verde-claro rounded-3xl p-2 text-white"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registro;
