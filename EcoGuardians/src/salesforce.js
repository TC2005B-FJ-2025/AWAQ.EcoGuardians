import { useState } from "react";

export default function SalesforceForm() {
  const [formData, setFormData] = useState({
    email: "",
    "00NgK00000HPZla": "",
    "00NgK00000HPYcb": "",
    "00NgK00000HPMej": ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form
      action="https://webto.salesforce.com/servlet/servlet.WebToCase?encoding=UTF-8&orgId=00DgK0000000Wp8"
      method="POST"
    >
      
    <input type="hidden" name="orgid" value="00DgK0000000Wp8" />
    <input type="hidden" name="retURL" value="http://www.hannah.lovestoblog.com" />
    {/* Cambien lo de "http://www.hannah.lovestoblog.com" */}


    <h1> Formulario de queja </h1>

    <label htmlFor="email">Email</label>
    <input
        id="email"
        name="email"
        type="text"
        maxLength="80"
        size="20"
        value={formData.email}
        onChange={handleChange}
    />

    <br />

    <label htmlFor="00NgK00000HPZla">Nombre de usuario</label>
      
    <textarea
        id="00NgK00000HPZla"
        name="00NgK00000HPZla"
        wrap="soft"
        value={formData["00NgK00000HPZla"]}
        onChange={handleChange}
    >
    </textarea>
      
    <br />

    <label htmlFor="00NgK00000HPYcb">Tipo de Opinión</label>
    <select
        id="00NgK00000HPYcb"
        name="00NgK00000HPYcb"
        value={formData["00NgK00000HPYcb"]}
        onChange={handleChange}
    >

    <option value="">--Ninguno--</option>
    <option value="Queja">Queja</option>
    <option value="Sugerencia">Sugerencia</option>
    <option value="Reportar error">Reportar error</option>
    </select>
    
    <br />

    <label htmlFor="00NgK00000HPMej">Opiniones o Sugerencias</label>
    <textarea
        id="00NgK00000HPMej"
        name="00NgK00000HPMej"
        rows="3"
        wrap="soft"
        value={formData["00NgK00000HPMej"]}
        onChange={handleChange}
    >
    </textarea>
    <br />

    <input type="submit" name="submit" />
    </form>
  );
}
