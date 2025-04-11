// SalesforceForm.jsx
import React from 'react';
import { Helmet } from 'react-helmet';

const Prospecto = () => {
  return (
    <div>
      {/* Agregamos la metaetiqueta en el head (opcional si ya se encuentra en el HTML base) */}
      <Helmet>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
      </Helmet>

      <form
        action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00DgK0000000Wp8"
        method="POST"
      >
        <input type="hidden" name="oid" value="00DgK0000000Wp8" />
        <input type="hidden" name="retURL" value="http://www.hannah.lovestoblog.com" />
        <input type="hidden" name="assignmentRule" value="1" />

        {/* Campos opcionales de depuración (descomentar si se desea probar en modo depuración) */}
        {/*
        <input type="hidden" name="debug" value="1" />
        <input type="hidden" name="debugEmail" value="c3170600@gmail.com" />
        */}

        <div>
          <label htmlFor="00NgK00000vNcLV">Nombre:</label>
          <textarea id="00NgK00000vNcLV" name="00NgK00000vNcLV" wrap="soft" />
        </div>

        <div>
          <label htmlFor="00NgK00000vKmpM">Email:</label>
          <input
            id="00NgK00000vKmpM"
            name="00NgK00000vKmpM"
            type="text"
            size="20"
            maxLength="80"
          />
        </div>

        <div>
          <label htmlFor="00NgK00000vL4JG">Descripción:</label>
          <textarea id="00NgK00000vL4JG" name="00NgK00000vL4JG" wrap="soft" />
        </div>

        <div>
          <button type="submit">Enviar</button>
        </div>
      </form>
    </div>
  );
};

export default Prospecto;
