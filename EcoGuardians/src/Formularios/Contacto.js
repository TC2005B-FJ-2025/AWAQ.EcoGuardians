import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import fondoFormularios from "../componentes/fondoFormularios.png";
import { useTranslation } from "react-i18next";

function Contacto({ mostrarFondo = true, onHandleClose }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmarContrasena: "",
    ageRange: "18-25",
    country: "",
    region: ""
  });

  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const navigate = useNavigate();
  const sitekey = "6Le0DgYrAAAAABtLCrKvM3IT865eADESGdxLgFod";
  const [aceptaPrivacidad, setAceptaPrivacidad] = useState(false);
  const [aceptaMarketing, setAceptaMarketing] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!aceptaPrivacidad) {
      setMensaje({ texto: t("contact.privacy_error") || "Debes aceptar la política de privacidad.", tipo: "error" });
      return;
    }
  
    if (!captchaVerified) {
      setMensaje({ texto: t("contact.captcha_error"), tipo: "error" });
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/contacto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          username: formData.username,
          password: formData.password,
          ageRange: formData.ageRange,
          country: formData.country,
          region: formData.region,
          role: "user",
          marketing: aceptaMarketing
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) throw new Error(data.error || "Error en el registro");
  
      setMensaje({ texto: t("contact.success"), tipo: "success" });
      setFormData({
        name: "",
        username: "",
        password: "",
        confirmarContrasena: "",
        ageRange: "18-25",
        country: "",
        region: ""
      });
      setAceptaPrivacidad(false);
      setAceptaMarketing(false);
  
      setTimeout(() => {
        setMensaje({ texto: "", tipo: "" });
        handleClose();
      }, 2000);
  
    } catch (error) {
      setMensaje({ texto: error.message, tipo: "error" });
    }
  };
  

  const handleClose = () => {
    if (onHandleClose) {
      onHandleClose();
    } else {
      navigate(-1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-0 z-[100] flex items-center justify-center px-4 ${mostrarFondo ? "bg-black/50" : "bg-transparent"}`}
      style={
        mostrarFondo
          ? {
              backgroundImage: `url(${fondoFormularios})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }
          : {}
      }
    >
      <div className="w-full max-w-[550px] relative px-6 py-4 bg-white rounded-xl shadow-lg backdrop-blur-sm">
        <FontAwesomeIcon
          icon={faXmark}
          className="absolute right-4 top-4 fa-xl text-gray-400 cursor-pointer"
          onClick={handleClose}
        />

        <h2 className="text-center font-semibold text-[22px] mb-4">{t("contact.title")}</h2>

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="name">{t("contact.name")}</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder={t("contact.name_placeholder")} 
                required
                value={formData.name}
                onChange={handleChange}
                className="border-2 border-black p-[6px] px-3 rounded-xl"
                aria-label={t("contact.name")}
              />
            </div>

            <div className="flex flex-col w-full gap-2">
              <label htmlFor="ageRange">{t("contact.age_range")}</label>
              <select
                id="ageRange"
                name="ageRange"
                required
                value={formData.ageRange}
                onChange={handleChange}
                className="border-2 border-black p-[6px] px-3 rounded-xl"
                aria-label={t("contact.age_range")}
              >
                <option value="0-12">{t("contact.age.0_12")}</option>
                <option value="13-17">{t("contact.age.13_17")}</option>
                <option value="18-25">{t("contact.age.18_25")}</option>
                <option value="26-35">{t("contact.age.26_35")}</option>
                <option value="36-50">{t("contact.age.36_50")}</option>
                <option value="51+">{t("contact.age.51_plus")}</option>
              </select>
            </div>
          </div>

          <label htmlFor="username" className="mt-4 mb-1">{t("contact.email")}</label>
          <input
            id="username"
            type="email"
            name="username"
            placeholder={t("contact.email_placeholder")}
            required
            value={formData.username}
            onChange={handleChange}
            className="border-2 border-black p-[6px] px-3 rounded-xl mb-4"
            aria-label={t("contact.email")}
          />

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="country">{t("contact.country")}</label>
            {/* 
            <input
              id="country"
              type="text"
              name="country"
              placeholder={t("contact.country_placeholder")} 
              required
              value={formData.country}
              onChange={handleChange}
              className="w-full border-2 border-black p-[6px] px-3 rounded-xl"
              aria-label={t("contact.country")}
            /> 
            */}

            <select
              id="country"
              name="country"
              required
              value={formData.country}
              onChange={handleChange}
              className="w-full border-2 border-black p-[6px] px-3 rounded-xl"
              aria-label={t("contact.country")}
              style={{ position: 'relative', zIndex: 10 }}
            >
              <option value="">{t("contact.country_placeholder")}</option>
              <option value="Afghanistan">{t("countries.afghanistan")}</option>
              <option value="Albania">{t("countries.albania")}</option>
              <option value="Algeria">{t("countries.algeria")}</option>
              <option value="Andorra">{t("countries.andorra")}</option>
              <option value="Angola">{t("countries.angola")}</option>
              <option value="Antigua and Barbuda">{t("countries.antigua and barbuda")}</option>
              <option value="Argentina">{t("countries.argentina")}</option>
              <option value="Armenia">{t("countries.armenia")}</option>
              <option value="Australia">{t("countries.australia")}</option>
              <option value="Austria">{t("countries.austria")}</option>
              <option value="Azerbaijan">{t("countries.azerbaijan")}</option>
              <option value="Bahamas">{t("countries.bahamas")}</option>
              <option value="Bahrain">{t("countries.bahrain")}</option>
              <option value="Bangladesh">{t("countries.bangladesh")}</option>
              <option value="Barbados">{t("countries.barbados")}</option>
              <option value="Belarus">{t("countries.belarus")}</option>
              <option value="Belgium">{t("countries.belgium")}</option>
              <option value="Belize">{t("countries.belize")}</option>
              <option value="Benin">{t("countries.benin")}</option>
              <option value="Bhutan">{t("countries.bhutan")}</option>
              <option value="Bolivia">{t("countries.bolivia")}</option>
              <option value="Bosnia and Herzegovina">{t("countries.bosnia and herzegovina")}</option>
              <option value="Botswana">{t("countries.botswana")}</option>
              <option value="Brazil">{t("countries.brazil")}</option>
              <option value="Brunei">{t("countries.brunei")}</option>
              <option value="Bulgaria">{t("countries.bulgaria")}</option>
              <option value="Burkina Faso">{t("countries.burkina faso")}</option>
              <option value="Burundi">{t("countries.burundi")}</option>
              <option value="Cabo Verde">{t("countries.cabo verde")}</option>
              <option value="Cambodia">{t("countries.cambodia")}</option>
              <option value="Cameroon">{t("countries.cameroon")}</option>
              <option value="Canada">{t("countries.canada")}</option>
              <option value="Central African Republic">{t("countries.central african republic")}</option>
              <option value="Chad">{t("countries.chad")}</option>
              <option value="Chile">{t("countries.chile")}</option>
              <option value="China">{t("countries.china")}</option>
              <option value="Colombia">{t("countries.colombia")}</option>
              <option value="Comoros">{t("countries.comoros")}</option>
              <option value="Congo (Congo-Brazzaville)">{t("countries.congo (congo-brazzaville)")}</option>
              <option value="Costa Rica">{t("countries.costa rica")}</option>
              <option value="Croatia">{t("countries.croatia")}</option>
              <option value="Cuba">{t("countries.cuba")}</option>
              <option value="Cyprus">{t("countries.cyprus")}</option>
              <option value="Czechia (Czech Republic)">{t("countries.czechia (czech republic)")}</option>
              <option value="Denmark">{t("countries.denmark")}</option>
              <option value="Djibouti">{t("countries.djibouti")}</option>
              <option value="Dominica">{t("countries.dominica")}</option>
              <option value="Dominican Republic">{t("countries.dominican republic")}</option>
              <option value="Ecuador">{t("countries.ecuador")}</option>
              <option value="Egypt">{t("countries.egypt")}</option>
              <option value="El Salvador">{t("countries.el salvador")}</option>
              <option value="Equatorial Guinea">{t("countries.equatorial guinea")}</option>
              <option value="Eritrea">{t("countries.eritrea")}</option>
              <option value="Estonia">{t("countries.estonia")}</option>
              <option value="Eswatini (fmr. 'Swaziland')">{t("countries.eswatini (fmr. \"swaziland\")")}</option>
              <option value="Ethiopia">{t("countries.ethiopia")}</option>
              <option value="Fiji">{t("countries.fiji")}</option>
              <option value="Finland">{t("countries.finland")}</option>
              <option value="France">{t("countries.france")}</option>
              <option value="Gabon">{t("countries.gabon")}</option>
              <option value="Gambia">{t("countries.gambia")}</option>
              <option value="Georgia">{t("countries.georgia")}</option>
              <option value="Germany">{t("countries.germany")}</option>
              <option value="Ghana">{t("countries.ghana")}</option>
              <option value="Greece">{t("countries.greece")}</option>
              <option value="Grenada">{t("countries.grenada")}</option>
              <option value="Guatemala">{t("countries.guatemala")}</option>
              <option value="Guinea">{t("countries.guinea")}</option>
              <option value="Guinea-Bissau">{t("countries.guinea-bissau")}</option>
              <option value="Guyana">{t("countries.guyana")}</option>
              <option value="Haiti">{t("countries.haiti")}</option>
              <option value="Honduras">{t("countries.honduras")}</option>
              <option value="Hungary">{t("countries.hungary")}</option>
              <option value="Iceland">{t("countries.iceland")}</option>
              <option value="India">{t("countries.india")}</option>
              <option value="Indonesia">{t("countries.indonesia")}</option>
              <option value="Iran">{t("countries.iran")}</option>
              <option value="Iraq">{t("countries.iraq")}</option>
              <option value="Ireland">{t("countries.ireland")}</option>
              <option value="Israel">{t("countries.israel")}</option>
              <option value="Italy">{t("countries.italy")}</option>
              <option value="Ivory Coast (Côte d'Ivoire)">{t("countries.ivory coast (côte d'ivoire)")}</option>
              <option value="Jamaica">{t("countries.jamaica")}</option>
              <option value="Japan">{t("countries.japan")}</option>
              <option value="Jordan">{t("countries.jordan")}</option>
              <option value="Kazakhstan">{t("countries.kazakhstan")}</option>
              <option value="Kenya">{t("countries.kenya")}</option>
              <option value="Kiribati">{t("countries.kiribati")}</option>
              <option value="Korea, North (North Korea)">{t("countries.korea, north (north korea)")}</option>
              <option value="Korea, South (South Korea)">{t("countries.korea, south (south korea)")}</option>
              <option value="Kosovo">{t("countries.kosovo")}</option>
              <option value="Kuwait">{t("countries.kuwait")}</option>
              <option value="Kyrgyzstan">{t("countries.kyrgyzstan")}</option>
              <option value="Laos">{t("countries.laos")}</option>
              <option value="Latvia">{t("countries.latvia")}</option>
              <option value="Lebanon">{t("countries.lebanon")}</option>
              <option value="Lesotho">{t("countries.lesotho")}</option>
              <option value="Liberia">{t("countries.liberia")}</option>
              <option value="Libya">{t("countries.libya")}</option>
              <option value="Liechtenstein">{t("countries.liechtenstein")}</option>
              <option value="Lithuania">{t("countries.lithuania")}</option>
              <option value="Luxembourg">{t("countries.luxembourg")}</option>
              <option value="Madagascar">{t("countries.madagascar")}</option>
              <option value="Malawi">{t("countries.malawi")}</option>
              <option value="Malaysia">{t("countries.malaysia")}</option>
              <option value="Maldives">{t("countries.maldives")}</option>
              <option value="Mali">{t("countries.mali")}</option>
              <option value="Malta">{t("countries.malta")}</option>
              <option value="Marshall Islands">{t("countries.marshall islands")}</option>
              <option value="Mauritania">{t("countries.mauritania")}</option>
              <option value="Mauritius">{t("countries.mauritius")}</option>
              <option value="Mexico">{t("countries.mexico")}</option>
              <option value="Micronesia">{t("countries.micronesia")}</option>
              <option value="Moldova">{t("countries.moldova")}</option>
              <option value="Monaco">{t("countries.monaco")}</option>
              <option value="Mongolia">{t("countries.mongolia")}</option>
              <option value="Montenegro">{t("countries.montenegro")}</option>
              <option value="Morocco">{t("countries.morocco")}</option>
              <option value="Mozambique">{t("countries.mozambique")}</option>
              <option value="Myanmar (Burma)">{t("countries.myanmar (burma)")}</option>
              <option value="Namibia">{t("countries.namibia")}</option>
              <option value="Nauru">{t("countries.nauru")}</option>
              <option value="Nepal">{t("countries.nepal")}</option>
              <option value="Netherlands">{t("countries.netherlands")}</option>
              <option value="New Zealand">{t("countries.new zealand")}</option>
              <option value="Nicaragua">{t("countries.nicaragua")}</option>
              <option value="Niger">{t("countries.niger")}</option>
              <option value="Nigeria">{t("countries.nigeria")}</option>
              <option value="North Macedonia">{t("countries.north macedonia")}</option>
              <option value="Norway">{t("countries.norway")}</option>
              <option value="Oman">{t("countries.oman")}</option>
              <option value="Pakistan">{t("countries.pakistan")}</option>
              <option value="Palau">{t("countries.palau")}</option>
              <option value="Panama">{t("countries.panama")}</option>
              <option value="Papua New Guinea">{t("countries.papua new guinea")}</option>
              <option value="Paraguay">{t("countries.paraguay")}</option>
              <option value="Peru">{t("countries.peru")}</option>
              <option value="Philippines">{t("countries.philippines")}</option>
              <option value="Poland">{t("countries.poland")}</option>
              <option value="Portugal">{t("countries.portugal")}</option>
              <option value="Qatar">{t("countries.qatar")}</option>
              <option value="Romania">{t("countries.romania")}</option>
              <option value="Russia">{t("countries.russia")}</option>
              <option value="Rwanda">{t("countries.rwanda")}</option>
              <option value="Saint Kitts and Nevis">{t("countries.saint kitts and nevis")}</option>
              <option value="Saint Lucia">{t("countries.saint lucia")}</option>
              <option value="Saint Vincent and the Grenadines">{t("countries.saint vincent and the grenadines")}</option>
              <option value="Samoa">{t("countries.samoa")}</option>
              <option value="San Marino">{t("countries.san marino")}</option>
              <option value="Sao Tome and Principe">{t("countries.sao tome and principe")}</option>
              <option value="Saudi Arabia">{t("countries.saudi arabia")}</option>
              <option value="Senegal">{t("countries.senegal")}</option>
              <option value="Serbia">{t("countries.serbia")}</option>
              <option value="Seychelles">{t("countries.seychelles")}</option>
              <option value="Sierra Leone">{t("countries.sierra leone")}</option>
              <option value="Singapore">{t("countries.singapore")}</option>
              <option value="Slovakia">{t("countries.slovakia")}</option>
              <option value="Slovenia">{t("countries.slovenia")}</option>
              <option value="Solomon Islands">{t("countries.solomon islands")}</option>
              <option value="Somalia">{t("countries.somalia")}</option>
              <option value="South Africa">{t("countries.south africa")}</option>
              <option value="South Sudan">{t("countries.south sudan")}</option>
              <option value="Spain">{t("countries.spain")}</option>
              <option value="Sri Lanka">{t("countries.sri lanka")}</option>
              <option value="Sudan">{t("countries.sudan")}</option>
              <option value="Suriname">{t("countries.suriname")}</option>
              <option value="Sweden">{t("countries.sweden")}</option>
              <option value="Switzerland">{t("countries.switzerland")}</option>
              <option value="Syria">{t("countries.syria")}</option>
              <option value="Taiwan">{t("countries.taiwan")}</option>
              <option value="Tajikistan">{t("countries.tajikistan")}</option>
              <option value="Tanzania">{t("countries.tanzania")}</option>
              <option value="Thailand">{t("countries.thailand")}</option>
              <option value="Timor-Leste (East Timor)">{t("countries.timor-leste (east timor)")}</option>
              <option value="Togo">{t("countries.togo")}</option>
              <option value="Tonga">{t("countries.tonga")}</option>
              <option value="Trinidad and Tobago">{t("countries.trinidad and tobago")}</option>
              <option value="Tunisia">{t("countries.tunisia")}</option>
              <option value="Turkey">{t("countries.turkey")}</option>
              <option value="Turkmenistan">{t("countries.turkmenistan")}</option>
              <option value="Tuvalu">{t("countries.tuvalu")}</option>
              <option value="Uganda">{t("countries.uganda")}</option>
              <option value="Ukraine">{t("countries.ukraine")}</option>
              <option value="United Arab Emirates">{t("countries.united arab emirates")}</option>
              <option value="United Kingdom">{t("countries.united kingdom")}</option>
              <option value="United States">{t("countries.united states")}</option>
              <option value="Uruguay">{t("countries.uruguay")}</option>
              <option value="Uzbekistan">{t("countries.uzbekistan")}</option>
              <option value="Vanuatu">{t("countries.vanuatu")}</option>
              <option value="Vatican City">{t("countries.vatican city")}</option>
              <option value="Venezuela">{t("countries.venezuela")}</option>
              <option value="Vietnam">{t("countries.vietnam")}</option>
              <option value="Yemen">{t("countries.yemen")}</option>
              <option value="Zambia">{t("countries.zambia")}</option>
              <option value="Zimbabwe">{t("countries.zimbabwe")}</option>
            </select>

            </div>
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="region">{t("contact.region")}</label>
              <input
                id="region"
                type="text"
                name="region"
                placeholder={t("contact.region_placeholder")}
                required
                value={formData.region}
                onChange={handleChange}
                className="border-2 border-black p-[6px] px-3 rounded-xl"
                aria-label={t("contact.region")}
              />
            </div>
          </div>

          <div className="mt-4 mb-4 space-y-2">
          <label className="flex items-start gap-2 text-xs">
            <input
              type="checkbox"
              checked={aceptaPrivacidad}
              onChange={(e) => setAceptaPrivacidad(e.target.checked)}
              className="mt-1"
              required
            />
            <span>
            {t("contact.leido")}{" "}
              <a
                href="https://www.somosawaq.org/politica-de-privacidad"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline"
              >
                {t("contact.politica")}
              </a>{" "}
              ({t("contact.Requerido")})
            </span>
          </label>

          <label className="flex items-start gap-2 text-xs">
            <input
              type="checkbox"
              checked={aceptaMarketing}
              onChange={(e) => setAceptaMarketing(e.target.checked)}
              className="mt-1"
            />
            <span>{t("contact.acepto")}</span>
          </label>
        </div>

        <div style={{ transform: "scale(0.85)", transformOrigin: "0 0" }}>
          <ReCAPTCHA
            sitekey={sitekey}
            onChange={(value) => setCaptchaVerified(!!value)}
          />
        </div>

          {mensaje.texto && (
            <div className={`mt-4 p-2 rounded text-center text-sm ${
              mensaje.tipo === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}>
              {mensaje.texto}
            </div>
          )}

          <button
            type="submit"
            className="bg-verde-claro hover:bg-verde-fuerte mt-4 transition-colors rounded-3xl p-2 text-white font-medium"
            aria-label={t("contact.submit")}
          >
            {t("contact.submit")} 
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default Contacto;
