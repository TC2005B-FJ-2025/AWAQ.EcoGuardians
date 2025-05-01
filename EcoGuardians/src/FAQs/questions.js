import { useTranslation } from "react-i18next";

export const useQuestions = () => {
  const { t, i18n } = useTranslation();
  
  // Obtenemos todas las traducciones del namespace actual
  const translations = i18n.getResourceBundle(i18n.language, i18n.options.defaultNS || 'translation');
  
  // Accedemos a la sección de FAQs
  const faqsTranslations = translations.faqs?.categories;
  
  if (!faqsTranslations) return [];
  
  // Construimos las categorías dinámicamente
  return Object.keys(faqsTranslations).map(categoryKey => {
    const category = faqsTranslations[categoryKey];
    
    // Obtenemos todas las preguntas de esta categoría
    const questions = Object.keys(category)
      .filter(key => key.startsWith('q')) // Filtramos solo las preguntas (q1, q2, etc.)
      .map(questionKey => ({
        question: t(`faqs.categories.${categoryKey}.${questionKey}.question`),
        answer: t(`faqs.categories.${categoryKey}.${questionKey}.answer`)
      }));
    
    return {
      category: t(`faqs.categories.${categoryKey}.label`),
      items: questions
    };
  });
};