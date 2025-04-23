import { useTranslation } from "react-i18next";

export const useQuestions = () => {
  const { t } = useTranslation();

  return [
    {
      category: t("faqs.categories.ecoguardian"),
      items: [
        {
          question: t("faqs.ecoguardian.q1.question"),
          answer: t("faqs.ecoguardian.q1.answer"),
        },
        {
          question: t("faqs.ecoguardian.q2.question"),
          answer: t("faqs.ecoguardian.q2.answer"),
        },
        {
          question: t("faqs.ecoguardian.q3.question"),
          answer: t("faqs.ecoguardian.q3.answer"),
        },
        {
          question: t("faqs.ecoguardian.q4.question"),
          answer: t("faqs.ecoguardian.q4.answer"),
        },
      ],
    },
    {
      category: t("faqs.categories.donations"),
      items: [
        {
          question: t("faqs.donations.q1.question"),
          answer: t("faqs.donations.q1.answer"),
        },
        {
          question: t("faqs.donations.q2.question"),
          answer: t("faqs.donations.q2.answer"),
        },
      ],
    },
    {
      category: t("faqs.categories.sponsors"),
      items: [
        {
          question: t("faqs.sponsors.q1.question"),
          answer: t("faqs.sponsors.q1.answer"),
        },
        {
          question: t("faqs.sponsors.q2.question"),
          answer: t("faqs.sponsors.q2.answer"),
        },
      ],
    },
    {
      category: t("faqs.categories.contacto"),
      items: [
        {
          question: t("faqs.contacto.q1.question"),
          answer: t("faqs.contacto.q1.answer"),
        },
      ],
    },
    {
      category: t("faqs.categories.opinion"),
      items: [
        {
          question: t("faqs.opinion.q1.question"),
          answer: t("faqs.opinion.q1.answer"),
        },
        {
          question: t("faqs.opinion.q2.question"),
          answer: t("faqs.opinion.q2.answer"),
        },
      ],
    },
    {
      category: t("faqs.categories.idioma"),
      items: [
        {
          question: t("faqs.idioma.q1.question"),
          answer: t("faqs.idioma.q1.answer"),
        },
      ],
    },
    {
      category: t("faqs.categories.mas"),
      items: [
        {
          question: t("faqs.mas.q1.question"),
          answer: t("faqs.mas.q1.answer"),
        },
      ],
    },
  ];
};
